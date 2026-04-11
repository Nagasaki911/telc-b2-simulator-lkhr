// =============================================================================
//  /api/evaluate.js  —  Vercel Serverless Function
//  telc B2 Writing Evaluation via Google Gemini 2.0 Flash (free tier)
//
//  ✅ FIXES vs previous version:
//     - Updated model: gemini-1.5-flash → gemini-2.0-flash (free, faster, 2025)
//     - Changed export syntax: ES modules → CommonJS (safer on Vercel Hobby)
//     - Added fallback to gemini-1.5-flash if 2.0 returns 404
//     - Better error messages pointing to GEMINI_API_KEY (not Anthropic)
//
//  SETUP:
//    1. Get free key: https://aistudio.google.com/app/apikey
//    2. Vercel Dashboard → Project → Settings → Environment Variables
//       Key: GEMINI_API_KEY   Value: your-key-here
//    3. Push to GitHub → Vercel auto-deploys
//
//  FREE TIER (Gemini 2.0 Flash):
//    • 1,500 requests / day  |  No credit card needed
// =============================================================================

// ── Vercel config: max 30s execution time ────────────────────────────────────
module.exports.config = {
  maxDuration: 30,
};

// ── Model priority list: try 2.0 first, fall back to 1.5 ────────────────────
const GEMINI_MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
];

const GEMINI_BASE =
  'https://generativelanguage.googleapis.com/v1beta/models/';

// ── Main handler ─────────────────────────────────────────────────────────────
module.exports.default = async function handler(req, res) {

  // CORS — allow any origin (needed for browser fetch)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST-Anfragen erlaubt.' });
  }

  // ── Read + validate body ──────────────────────────────────────────────────
  const {
    studentText = '',
    promptTitle = 'Schriftlicher Ausdruck B2',
    promptTask  = 'Schreiben Sie einen formellen Brief auf Deutsch.',
    minWords    = 150,
    maxWords    = 220,
  } = req.body || {};

  const trimmed = studentText.trim();

  if (!trimmed || trimmed.length < 20) {
    return res.status(400).json({
      error: 'studentText fehlt oder ist zu kurz (min. 20 Zeichen).',
    });
  }

  // ── Check API key ─────────────────────────────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error:
        'GEMINI_API_KEY ist nicht gesetzt. ' +
        'Vercel Dashboard → Project → Settings → Environment Variables → GEMINI_API_KEY hinzufügen.',
    });
  }

  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  const prompt    = buildPrompt({ studentText: trimmed, wordCount, promptTitle, promptTask, minWords, maxWords });

  // ── Try each model in priority order ─────────────────────────────────────
  let lastError = null;

  for (const model of GEMINI_MODELS) {
    const url = `${GEMINI_BASE}${model}:generateContent?key=${apiKey}`;

    let geminiRes;
    try {
      geminiRes = await fetch(url, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature:     0.2,
            maxOutputTokens: 2048,
            topP:            0.8,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
          ],
        }),
      });
    } catch (netErr) {
      lastError = 'Netzwerkfehler: ' + netErr.message;
      continue; // try next model
    }

    // 404 = model not found, try next
    if (geminiRes.status === 404) {
      lastError = `Modell ${model} nicht gefunden (HTTP 404). Versuche nächstes Modell…`;
      continue;
    }

    // 400 = bad request / invalid API key
    if (geminiRes.status === 400) {
      const body = await geminiRes.text();
      return res.status(502).json({
        error: `Ungültige Anfrage an Gemini API (HTTP 400). Prüfe deinen GEMINI_API_KEY.`,
        detail: body.substring(0, 300),
      });
    }

    // 403 = key invalid or quota exceeded
    if (geminiRes.status === 403) {
      return res.status(502).json({
        error: 'Zugriff verweigert (HTTP 403). GEMINI_API_KEY ist ungültig oder das Tageslimit wurde erreicht.',
      });
    }

    // 429 = rate limit
    if (geminiRes.status === 429) {
      return res.status(429).json({
        error: 'Rate Limit erreicht (HTTP 429). Das kostenlose Kontingent (1.500 Anfragen/Tag) ist erschöpft. Versuche es morgen erneut.',
      });
    }

    if (!geminiRes.ok) {
      const body = await geminiRes.text();
      lastError = `Gemini HTTP ${geminiRes.status}: ${body.substring(0, 200)}`;
      continue;
    }

    // ── Parse response ──────────────────────────────────────────────────────
    const geminiData = await geminiRes.json();

    const rawText =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!rawText) {
      // Check for content filter block
      const finishReason = geminiData?.candidates?.[0]?.finishReason;
      if (finishReason === 'SAFETY') {
        return res.status(200).json(makeFallbackResult(wordCount, 'Der Text wurde vom Sicherheitsfilter blockiert.'));
      }
      lastError = 'Gemini returned empty response';
      continue;
    }

    // Strip markdown fences if model wraps JSON in ```json ... ```
    const cleaned = rawText
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```\s*$/, '')
      .trim();

    // Extract JSON object
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      lastError = 'Kein JSON in der Antwort gefunden';
      continue;
    }

    let result;
    try {
      result = JSON.parse(jsonMatch[0]);
    } catch (parseErr) {
      lastError = 'JSON parse error: ' + parseErr.message;
      continue;
    }

    // ── Sanitise all fields ─────────────────────────────────────────────────
    result.score    = Math.min(45, Math.max(0, Math.round(Number(result.score) || 0)));
    result.passed   = result.score >= 27;
    result.wordCount = wordCount;
    result.model    = model;

    result.summary                   = String(result.summary || '');
    result.vocabulary_feedback       = String(result.vocabulary_feedback || '');
    result.structure_feedback        = String(result.structure_feedback || '');
    result.task_fulfillment_feedback = String(result.task_fulfillment_feedback || '');
    result.corrected_text            = String(result.corrected_text || '');

    result.grammar_errors = Array.isArray(result.grammar_errors)
      ? result.grammar_errors.slice(0, 15).map(e => ({
          error:       String(e.error       || ''),
          correction:  String(e.correction  || ''),
          explanation: String(e.explanation || ''),
          type:        String(e.type        || 'Sonstiges'),
        }))
      : [];

    result.strengths    = Array.isArray(result.strengths)    ? result.strengths    : [];
    result.improvements = Array.isArray(result.improvements) ? result.improvements : [];

    // Validate subscores
    const ss = result.subscores || {};
    result.subscores = {
      task_fulfillment: Math.min(15, Math.max(0, Math.round(Number(ss.task_fulfillment) || 0))),
      correctness:      Math.min(15, Math.max(0, Math.round(Number(ss.correctness)      || 0))),
      coherence:        Math.min(10, Math.max(0, Math.round(Number(ss.coherence)        || 0))),
      vocabulary:       Math.min(5,  Math.max(0, Math.round(Number(ss.vocabulary)       || 0))),
    };

    return res.status(200).json(result);
  }

  // All models failed
  return res.status(502).json({
    error: `Alle Gemini-Modelle haben versagt. Letzter Fehler: ${lastError}`,
    hint:  'Stelle sicher, dass GEMINI_API_KEY in den Vercel Environment Variables gesetzt ist.',
  });
};

// =============================================================================
//  GRADING PROMPT — official telc B2 criteria
// =============================================================================
function buildPrompt({ studentText, wordCount, promptTitle, promptTask, minWords, maxWords }) {
  return `You are a certified German language examiner for the official telc Deutsch B2 examination.

## WRITING TASK
Title: "${promptTitle}"
Instruction: ${promptTask}
Required word count: ${minWords}–${maxWords} words
Student's actual word count: ${wordCount} words

## STUDENT TEXT
---
${studentText}
---

## GRADING CRITERIA (official telc B2)

1. Aufgabenerfüllung / Task Fulfillment (0–15 points)
   - All required content points addressed? Formal register correct?
   - Deduct up to 5 pts if text is more than 20% below minimum (${minWords} words)

2. Sprachliche Korrektheit / Correctness (0–15 points)
   - Grammar: Kasus, Verbform, Präposition, Artikel, Wortstellung, Satzbau
   - Spelling and punctuation

3. Textkohärenz / Coherence (0–10 points)
   - Logical structure: opening, body, closing
   - Connectors and paragraph transitions

4. Wortschatz / Vocabulary (0–5 points)
   - B2-level range and appropriateness
   - Avoidance of repetition

## OUTPUT: Respond ONLY with this exact JSON — no markdown, no backticks, nothing else:

{"score":<int 0-45 = exact sum of subscores>,"subscores":{"task_fulfillment":<int 0-15>,"correctness":<int 0-15>,"coherence":<int 0-10>,"vocabulary":<int 0-5>},"summary":"<2-3 sentences in German>","task_fulfillment_feedback":"<German>","grammar_errors":[{"error":"<phrase from text>","correction":"<fixed>","explanation":"<German rule>","type":"<Kasus|Verbform|Präposition|Rechtschreibung|Wortstellung|Satzbau|Artikel|Sonstiges>"}],"vocabulary_feedback":"<German>","structure_feedback":"<German>","corrected_text":"<full corrected text>","strengths":["<German>","<German>"],"improvements":["<German>","<German>","<German>"]}`;
}

// =============================================================================
//  FALLBACK — returns a safe default when something goes wrong
// =============================================================================
function makeFallbackResult(wordCount, reason) {
  return {
    score: 0, passed: false, wordCount, model: 'fallback',
    summary: reason || 'Automatische Auswertung nicht möglich.',
    subscores: { task_fulfillment: 0, correctness: 0, coherence: 0, vocabulary: 0 },
    grammar_errors: [], strengths: [], improvements: [],
    vocabulary_feedback: '', structure_feedback: '',
    task_fulfillment_feedback: '', corrected_text: '',
  };
}
