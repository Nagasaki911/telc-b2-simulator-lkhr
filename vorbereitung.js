// =============================================================================
//  vorbereitung.js  v3  —  Red/Black brand · Bento · Holographic locks
// =============================================================================

const firebaseConfig = {
  apiKey:            "AIzaSyA7ydcdEtErpsKGfEHIbUOukPhbCK1hDhc",
  authDomain:        "telc-de37a.firebaseapp.com",
  projectId:         "telc-de37a",
  storageBucket:     "telc-de37a.firebasestorage.app",
  messagingSenderId: "494317274470",
  appId:             "1:494317274470:web:1fe629baf7bb65f5aa74a7"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();

// ── State ─────────────────────────────────────────────────────────────────────
let currentUser      = null;
let currentUserData  = null;
let activeTab        = 'lesen';
let activeLesenTeil  = 'teil1';
let activeHoerenTeil = 'teil1';
let currentSchreibenItem = null;
let sortAscending    = true;
let searchQuery      = '';

// ── Sub-tab metadata (drives dynamic headers) ─────────────────────────────────
const LESEN_META = {
  teil1: { label:'Teil 1',           title:'Leseverstehen',     subtitle:'Überschriften zuordnen — 5 Texte, 10 Köpfe', icon:'📰' },
  teil2: { label:'Teil 2',           title:'Leseverstehen',     subtitle:'Multiple Choice — 1 langer Text, 5 Fragen',   icon:'📄' },
  teil3: { label:'Teil 3',           title:'Leseverstehen',     subtitle:'Situationen zuordnen — 10 Fälle, 12 Anzeigen',icon:'🔗' },
  sb1:   { label:'Sprachbausteine 1',title:'Sprachbausteine',   subtitle:'Lückentext (Cloze) — 10 Lücken',             icon:'✏️' },
  sb2:   { label:'Sprachbausteine 2',title:'Sprachbausteine',   subtitle:'Wortpool-Lücken — 10 Lücken',                icon:'📝' },
};
const HOEREN_META = {
  teil1: { label:'Teil 1', title:'Hörverstehen', subtitle:'Nachrichten — 5 Richtig/Falsch-Aussagen',   icon:'📻' },
  teil2: { label:'Teil 2', title:'Hörverstehen', subtitle:'Interview — 10 Richtig/Falsch-Aussagen',    icon:'🎙' },
  teil3: { label:'Teil 3', title:'Hörverstehen', subtitle:'Kurztexte — 5 Richtig/Falsch-Aussagen',     icon:'🔊' },
};

// ── Firebase auth ─────────────────────────────────────────────────────────────
auth.onAuthStateChanged(async user => {
  currentUser = user;
  if (user) {
    try {
      // Force server read so isPremium:true reflects immediately after admin change
      const doc = await db.collection('users').doc(user.uid).get({ source: 'server' });
      if (doc.exists) {
        currentUserData = doc.data();
      } else {
        const name = user.displayName || user.email.split('@')[0];
        await db.collection('users').doc(user.uid).set({
          displayName:name, email:user.email,
          isPremium:false, evaluationsUsed:0,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        currentUserData = { displayName:name, isPremium:false, evaluationsUsed:0 };
      }
    } catch(e) {
      // Fall back to cache on network error
      try {
        const cached = await db.collection('users').doc(user.uid).get();
        currentUserData = cached.exists ? cached.data() : { isPremium:false, evaluationsUsed:0 };
      } catch(e2) {
        currentUserData = { isPremium:false, evaluationsUsed:0 };
      }
    }
    const chip = document.getElementById('user-chip');
    const name = (currentUserData&&currentUserData.displayName)||user.email.split('@')[0];
    if (chip) {
      chip.style.display = 'flex';
      const av = document.getElementById('user-avatar');
      const nl = document.getElementById('user-name-label');
      const bd = document.getElementById('user-plan-badge');
      if (av) av.textContent = name.charAt(0).toUpperCase();
      if (nl) nl.textContent = name;
      if (bd) {
        const isPrem = currentUserData && currentUserData.isPremium;
        bd.textContent = isPrem ? '⭐ Premium' : 'Free';
        bd.className = isPrem ? 'vb-badge vb-badge-pro' : 'vb-badge vb-badge-free';
      }
    }
  } else {
    const chip = document.getElementById('user-chip');
    if (chip) chip.style.display = 'none';
  }
  renderCurrentTab();
});

// ── Premium helpers ───────────────────────────────────────────────────────────
function isPremiumUser() { return !!(currentUserData&&currentUserData.isPremium===true); }
function canAccess(item) { return !item.isPremium || isPremiumUser(); }

function openPremiumModal()  { document.getElementById('premium-modal')?.classList.add('open'); }
function closePremiumModal() { document.getElementById('premium-modal')?.classList.remove('open'); }
function handleModalBackdropClick(e) { if (e.target===document.getElementById('premium-modal')) closePremiumModal(); }
function handleUpgradeClick() { closePremiumModal(); window.location.href='index.html#upgrade'; }

// ── Tab switching with fade+slide transition ──────────────────────────────────
function switchTab(tab) {
  if (activeTab === tab) return;
  activeTab = tab;

  document.querySelectorAll('.vb-tab').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.tab === tab));

  const panels = ['lesen','hoeren','schreiben'];
  panels.forEach(t => {
    const el = document.getElementById('panel-'+t);
    if (!el) return;
    if (t === tab) {
      el.style.display = '';
      // Force reflow then animate in
      el.classList.remove('panel-in','panel-out');
      void el.offsetWidth;
      el.classList.add('panel-in');
    } else {
      el.classList.remove('panel-in');
      el.style.display = 'none';
    }
  });

  renderCurrentTab();
}

function renderCurrentTab() {
  if      (activeTab==='lesen')      { renderLesen(activeLesenTeil); updateSectionHeader('lesen', activeLesenTeil); }
  else if (activeTab==='hoeren')     { renderHoeren(activeHoerenTeil); updateSectionHeader('hoeren', activeHoerenTeil); }
  else if (activeTab==='schreiben')  { renderSchreiben(); updateSectionHeader('schreiben', null); }
}

// ── Dynamic section header ────────────────────────────────────────────────────
function updateSectionHeader(tab, subtab) {
  const el = document.getElementById('section-header');
  if (!el) return;
  let title='', subtitle='', icon='';
  if (tab==='lesen' && subtab && LESEN_META[subtab]) {
    const m = LESEN_META[subtab];
    title = m.title; subtitle = m.subtitle; icon = m.icon;
  } else if (tab==='hoeren' && subtab && HOEREN_META[subtab]) {
    const m = HOEREN_META[subtab];
    title = m.title; subtitle = m.subtitle; icon = m.icon;
  } else if (tab==='schreiben') {
    title='Schreiben'; subtitle='22 Aufsatz-Themen · KI-Bewertung via Gemini'; icon='✍️';
  }
  el.innerHTML = `
    <div class="sh-icon">${icon}</div>
    <div>
      <h2 class="sh-title"><span class="sh-title-red">${escHtml(title)}</span> Training</h2>
      <p class="sh-sub">${escHtml(subtitle)}</p>
    </div>`;
}

// ── Search & sort ─────────────────────────────────────────────────────────────
function handleSearch(val) { searchQuery=val.toLowerCase().trim(); renderCurrentTab(); }
function toggleSort()      { sortAscending=!sortAscending; renderCurrentTab(); }

function filterAndSort(arr) {
  let r = arr;
  if (searchQuery) r = r.filter(i =>
    (i.title||'').toLowerCase().includes(searchQuery)||(i.titleAr||'').includes(searchQuery));
  return [...r].sort((a,b)=>{
    const c=(a.title||'').localeCompare(b.title||'','de');
    return sortAscending?c:-c;
  });
}

// ── Locked-card frosted overlay ───────────────────────────────────────────────
function lockedOverlayHTML() {
  return `<div class="vb-locked-overlay" onclick="event.stopPropagation();openPremiumModal();">
    <div class="vb-locked-inner">
      <svg class="vb-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
      <button class="vb-unlock-btn">Unlock Now</button>
    </div>
  </div>`;
}

// Legacy alias (still used by _buildListItem for list rows)
function lockIconSVG() {
  return `<span class="vb-lock">
    <svg class="vb-lock-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  </span>`;
}

function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── LESEN (now includes SB1, SB2) ────────────────────────────────────────────
function switchLesenTeil(teil) {
  activeLesenTeil = teil;
  document.querySelectorAll('#lesen-subtabs .vb-subtab').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.teil===teil));
  renderLesen(teil);
  updateSectionHeader('lesen', teil);
}

function renderLesen(teil) {
  const list  = document.getElementById('lesen-list');
  if (!list) return;
  // SB1/SB2 are under CONTENT_CONFIG.lesen.sb1/.sb2
  const key   = (teil==='sb1'||teil==='sb2') ? teil : teil;
  const items = filterAndSort(CONTENT_CONFIG.lesen[key]||[]);
  const animClass = 'list-entering';
  list.classList.add(animClass);
  list.innerHTML = items.length
    ? items.map((item,i)=>_buildListItem(item,i,'lesen')).join('')
    : _emptyState('Keine Aufgaben gefunden');
  requestAnimationFrame(()=>list.classList.remove(animClass));
}

// ── HÖREN ─────────────────────────────────────────────────────────────────────
function switchHoerenTeil(teil) {
  activeHoerenTeil = teil;
  document.querySelectorAll('#hoeren-subtabs .vb-subtab').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.teil===teil));
  renderHoeren(teil);
  updateSectionHeader('hoeren', teil);
}

function renderHoeren(teil) {
  const list  = document.getElementById('hoeren-list');
  if (!list) return;
  const items = filterAndSort(CONTENT_CONFIG.hoeren[teil]||[]);
  list.innerHTML = items.length
    ? items.map((item,i)=>_buildListItem(item,i,'hoeren')).join('')
    : _emptyState('Keine Aufgaben gefunden');
}

// ── Shared list-item builder ──────────────────────────────────────────────────
function _buildListItem(item, index, category) {
  const locked  = !canAccess(item);
  const onClick = locked ? 'openPremiumModal()' : `startExercise('${category}','${item.id}')`;
  return `
  <div class="vb-list-item${locked?' locked':''}" onclick="${onClick}" role="button" tabindex="0">
    <div class="vb-list-num">${index+1}</div>
    <div class="vb-list-info">
      <div class="vb-list-title">${escHtml(item.title)}</div>
      <div class="vb-list-desc">${escHtml(item.desc)} · ${item.duration} min</div>
    </div>
    <div class="vb-list-end">
      <span class="vb-badge vb-badge-b2">B2</span>
      ${locked ? lockIconSVG() : '<span class="vb-list-arrow">›</span>'}
    </div>
  </div>`;
}
// startExercise: links into exam.html
// For Lesen/Hören items the link carries the catalog item id.
// exam.html's startExam(id) maps that id → the correct THEMES entry.
function startExercise(cat, id) {
  window.location.href = `exam.html?category=${cat}&item=${id}`;
}

// ── SCHREIBEN ─────────────────────────────────────────────────────────────────
function renderSchreiben() {
  const grid = document.getElementById('schreiben-grid');
  if (!grid) return;
  const items = filterAndSort(CONTENT_CONFIG.schreiben);
  if (!items.length) { grid.innerHTML=_emptyState('Keine Themen gefunden'); return; }

  grid.innerHTML = items.map((item,i) => {
    const locked  = !canAccess(item);
    const onClick = locked ? 'openPremiumModal()' : `openSchreiben('${item.id}')`;
    const typeLabel = {beschwerde:'📝 Beschwerde',anfrage:'📨 Anfrage',bericht:'📰 Bericht'}[item.type]||item.type;
    return `
    <div class="vb-schreiben-card${locked?' locked':''}" onclick="${onClick}" role="button" tabindex="0">
      ${locked ? lockedOverlayHTML() : ''}
      <div class="vb-schreiben-topic-num">Thema ${i+1}</div>
      <div class="vb-schreiben-title">${escHtml(item.title)}</div>
      <div class="sc-footer">
        <span class="vb-schreiben-type vb-type-${item.type}">${typeLabel}</span>
        ${locked?'':'<span class="vb-list-arrow">›</span>'}
      </div>
    </div>`;
  }).join('');
}

function openSchreiben(id) {
  const item = CONTENT_CONFIG.schreiben.find(s=>s.id===id);
  if (!item) return;
  currentSchreibenItem = item;
  document.getElementById('schreiben-list-view').style.display   = 'none';
  document.getElementById('schreiben-editor-view').style.display = '';
  document.getElementById('schreiben-topic-title').textContent   = item.title;
  document.getElementById('editor-task-label').textContent       = item.task;
  const bl = document.getElementById('editor-bullets');
  if (bl) bl.innerHTML = (item.bullets||[])
    .map(b=>`<span class="vb-badge vb-badge-new" style="font-size:11px;">${escHtml(b)}</span>`).join('');
  const ta = document.getElementById('essay-textarea');
  if (ta) ta.value = '';
  const sc = document.getElementById('ai-score'); if(sc){ sc.textContent='–'; sc.style.color=''; }
  const fb = document.getElementById('ai-feedback'); if(fb) fb.textContent='Tippe deinen Text und klicke auf KI-Auswertung.';
  const wc = document.getElementById('word-count-display'); if(wc){ wc.textContent='0 / 150–220 Wörter'; wc.style.color=''; }
}

function showSchreibenList() {
  document.getElementById('schreiben-list-view').style.display   = '';
  document.getElementById('schreiben-editor-view').style.display = 'none';
  currentSchreibenItem = null;
}

// ── Word count ────────────────────────────────────────────────────────────────
function updateWordCount() {
  const ta = document.getElementById('essay-textarea');
  const el = document.getElementById('word-count-display');
  if (!ta||!el) return;
  const words = ta.value.trim() ? ta.value.trim().split(/\s+/).filter(Boolean).length : 0;
  el.textContent = `${words} / 150–220 Wörter`;
  el.style.color = words===0?'':'#4ade80'?(words>=150&&words<=220):'#fb923c';
  if (words===0) el.style.color = '';
  else if (words<150) el.style.color = '#fb923c';
  else if (words<=220) el.style.color = '#4ade80';
  else el.style.color = '#f87171';
}

// ── AI Evaluation ─────────────────────────────────────────────────────────────
async function runEvaluation() {
  const ta    = document.getElementById('essay-textarea');
  const text  = ta ? ta.value.trim() : '';
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  if (words < 20) { _showToast('Bitte schreibe mindestens 20 Wörter.'); return; }

  if (currentUser && !isPremiumUser()) {
    const used = (currentUserData&&currentUserData.evaluationsUsed)||0;
    if (used >= 1) { openPremiumModal(); return; }
  }

  const btn     = document.getElementById('eval-btn');
  const btnText = document.getElementById('eval-btn-text');
  const spinner = document.getElementById('eval-spinner');
  const feedEl  = document.getElementById('ai-feedback');
  if (btn)     btn.disabled        = true;
  if (btnText) btnText.textContent  = 'Auswertung läuft…';
  if (spinner) spinner.style.display = 'inline-block';
  if (feedEl)  feedEl.textContent   = '⏳ KI analysiert deinen Text…';

  const st = currentSchreibenItem||{};
  try {
    const res = await fetch('/api/evaluate', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ studentText:text, promptTitle:st.title||'Schriftlicher Ausdruck B2',
        promptTask:st.task||'Schreiben Sie einen formellen Brief.', minWords:150, maxWords:220 })
    });
    if (!res.ok) { const e=await res.json().catch(()=>({})); throw new Error(e.error||'HTTP '+res.status); }
    const result = await res.json();
    _displayAIResult(result);
    if (currentUser && !isPremiumUser()) {
      try {
        await db.collection('users').doc(currentUser.uid)
          .update({ evaluationsUsed: firebase.firestore.FieldValue.increment(1) });
        if (currentUserData) currentUserData.evaluationsUsed=(currentUserData.evaluationsUsed||0)+1;
      } catch(e) {}
    }
  } catch(err) {
    if (feedEl) feedEl.innerHTML=`<span style="color:#f87171;">Fehler: ${escHtml(err.message)}</span>`;
  } finally {
    if (btn)     btn.disabled        = false;
    if (btnText) btnText.textContent  = '✨ KI-Auswertung starten';
    if (spinner) spinner.style.display = 'none';
  }
}

function _displayAIResult(r) {
  const score   = Math.min(45,Math.max(0,r.score||0));
  const scoreEl = document.getElementById('ai-score');
  const feedEl  = document.getElementById('ai-feedback');
  if (scoreEl) {
    scoreEl.textContent = score;
    scoreEl.style.color = score>=27?'#4ade80':score>=18?'#fb923c':'#f87171';
  }
  if (!feedEl) return;
  let html='';
  if (r.summary) html+=`<p style="margin-bottom:12px;color:#e2e8f0;font-size:14px;line-height:1.65;">${escHtml(r.summary)}</p>`;
  if (r.subscores) {
    const ss=r.subscores;
    html+=`<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px;">
      ${_subscoreChip('Aufgabe',ss.task_fulfillment,15)}
      ${_subscoreChip('Korrektheit',ss.correctness,15)}
      ${_subscoreChip('Kohärenz',ss.coherence,10)}
      ${_subscoreChip('Wortschatz',ss.vocabulary,5)}</div>`;
  }
  if (r.grammar_errors&&r.grammar_errors.length) {
    html+=`<p style="font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#64748b;margin-bottom:6px;">Fehler (${r.grammar_errors.length})</p>`;
    html+=r.grammar_errors.slice(0,5).map(e=>`
      <div style="padding:8px 10px;margin-bottom:6px;background:rgba(248,113,113,0.07);border-left:2px solid #f87171;border-radius:4px;font-size:12px;">
        <span style="color:#f87171;text-decoration:line-through;">${escHtml(e.error)}</span>
        &nbsp;→&nbsp;<strong style="color:#e2e8f0;">${escHtml(e.correction)}</strong>
        <div style="color:#64748b;margin-top:3px;font-size:11px;">${escHtml(e.explanation)}</div>
      </div>`).join('');
  }
  if (r.corrected_text) {
    html+=`<p style="font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#4ade80;margin:12px 0 6px;">Korrigierter Text</p>
    <div style="padding:12px;background:rgba(74,222,128,0.05);border:1px solid rgba(74,222,128,0.15);border-radius:6px;font-size:12.5px;line-height:1.75;color:#94a3b8;white-space:pre-wrap;">${escHtml(r.corrected_text)}</div>`;
  }
  feedEl.innerHTML = html||'Auswertung abgeschlossen.';
}

function _subscoreChip(label,score,max) {
  const pct=max>0?Math.round((score||0)/max*100):0;
  const col=pct>=60?'#4ade80':pct>=40?'#fb923c':'#f87171';
  return `<div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:6px;padding:8px 6px;text-align:center;">
    <div style="font-size:9px;color:#64748b;margin-bottom:4px;">${label}</div>
    <div style="font-size:17px;font-weight:800;color:${col};">${score||0}</div>
    <div style="font-size:9px;color:#475569;">/ ${max}</div></div>`;
}

function _emptyState(title,desc='') {
  return `<div class="vb-empty"><div class="vb-empty-icon">🔍</div>
    <div class="vb-empty-title">${escHtml(title)}</div>
    ${desc?`<div class="vb-empty-desc">${escHtml(desc)}</div>`:''}</div>`;
}

function _showToast(msg) {
  let t = document.getElementById('vb-toast');
  if (!t) {
    t = document.createElement('div'); t.id='vb-toast';
    t.style.cssText='position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#1e293b;border:1px solid rgba(255,255,255,0.12);color:#e2e8f0;padding:12px 22px;border-radius:100px;font-size:13px;font-weight:500;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,0.5);opacity:0;transition:opacity .2s;pointer-events:none;white-space:nowrap;';
    document.body.appendChild(t);
  }
  t.textContent=msg; t.style.opacity='1';
  clearTimeout(t._t); t._t=setTimeout(()=>{t.style.opacity='0';},3000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Default to Lesen tab — triggers renderCurrentTab + updateSectionHeader
  switchTab('lesen');
});
