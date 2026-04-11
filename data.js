// =============================================================================
//  data.js — Single Source of Truth for all telc B2 exam content
//  To add a new theme: copy THEME_TEMPLATE at the bottom and add to THEMES[]
//
//  Imported by:  exam.html  (simulator)
//  Structure:    Each theme has .lesen, .hoeren, .schreiben
//
//  SCORING REFERENCE:
//    LV1 (5 texts × 5 pts)   = 25  ┐
//    LV2 (5 MCQ  × 5 pts)   = 25  ├ 75 pts (Leseverstehen)
//    LV3 (10 sit × 2.5 pts) = 25  ┘
//    SB1 (10 gaps × 1.5 pts) = 15  ┐ 30 pts (Sprachbausteine)
//    SB2 (10 gaps × 1.5 pts) = 15  ┘
//    HV1 (5 × 5 pts)         = 25  ┐
//    HV2 (10 × 2.5 pts)      = 25  ├ 75 pts (Hörverstehen)
//    HV3 (5 × 5 pts)         = 25  ┘
//    Schreiben (KI)           = 45 pts
//    ─────────────────────────────────
//    Grand Total              = 225 pts  (pass ≥ 135 = 60%)
// =============================================================================

const THEMES = [

// ─────────────────────────────────────────────────────────────────────────────
// THEME 1 — Freizeit & Natur
// ─────────────────────────────────────────────────────────────────────────────
{
  name: "Freizeit & Natur",
  lesen: {
    lv1: {
      instruction: "Lesen Sie die Überschriften a–j und die Texte 1–5. Entscheiden Sie, welche Überschrift am besten zu welchem Text passt. Fünf Überschriften passen zu keinem Text.",
      headings: [
        { id:"A", text:"Am Strand im Dienst – mehr Sicherheit für Urlauber" },
        { id:"B", text:"Bäder, Seen und Natur – im hessischen Paradies" },
        { id:"C", text:"Freiheit und Natur – nach sechs Wochen harter Arbeit" },
        { id:"D", text:"Jugendliche arbeiten für Jugendliche" },
        { id:"E", text:"Kinderarbeit in Deutschland: Jugendliche werden zur Arbeit gezwungen" },
        { id:"F", text:"Nach harter Arbeit durch nordische Gewässer" },
        { id:"G", text:"Schaden an Kreuzfahrtschiff verhindert Weiterfahrt" },
        { id:"H", text:"Urlaub an deutschen Seen immer gefährlicher" },
        { id:"I", text:"Wegen Niedrigwasser: vom Fluss auf die Straße" },
        { id:"J", text:"Zu Gast bei den Fürsten" },
      ],
      texts: [
        { id:1, body:"Waldeck-Frankenberg. Wer nicht gerade in Hessen wohnt, wird kaum wissen, wo diese Region eigentlich liegt. Es ist ein herrliches Stück Deutschland ohne besonders große Städte, eine Gegend, die Natur pur bietet. Der Landkreis Waldeck-Frankenberg ist Hessens attraktivstes Umland. Majestätisch erhebt sich über dem Edersee das Schloss Waldeck.", answer:"B" },
        { id:2, body:"Pferde waren schon immer Melanie Schilles Leidenschaft. Und jetzt kann ich Hobby und Beruf miteinander verbinden, freut sich die Beamtin aus Hannover. In diesem Jahr verstärkt sie die Strandwache an der Nordseeküste. Wir sorgen für mehr Sicherheit am Strand, erklären Melanie Schille und Rüdiger Teichmann (42).", answer:"A" },
        { id:3, body:"Sechs Wochen hat Philipp Neubert (17) aus Hamburg gearbeitet, jeden Tag von acht bis siebzehn Uhr. Doch jetzt ist er frei. Mit seiner Familie macht er eine Kreuzfahrt durch die Ostsee. Gotland, Stockholm, Helsinki und Tallinn – die Städte wechseln täglich.", answer:"C" },
        { id:4, body:"Kiel. Das Kreuzfahrtschiff musste gestern früher als geplant den Hafen anlaufen. Grund dafür war ein technischer Schaden am Steuerruder. Die 2.300 Passagiere wurden vorübergehend in Kieler Hotels untergebracht. Die Reederei erklärte, dass die Reparaturarbeiten mindestens drei Tage dauern würden.", answer:"G" },
        { id:5, body:"Elbe, Juli. Der Fluss führt seit Wochen extrem wenig Wasser. Viele Flussabschnitte sind für die Binnenschifffahrt nicht mehr passierbar. Frachter müssen auf Lkw umgelagert werden. Die Transportkosten steigen dadurch enorm.", answer:"I" },
      ],
      correctAnswers: { 1:"B", 2:"A", 3:"C", 4:"G", 5:"I" }
    },
    lv2: {
      instruction: "Lesen Sie den Text und die Aufgaben. Entscheiden Sie anhand des Textes, welche Lösung richtig ist.",
      text: `<h3 style="font-weight:700;margin-bottom:10px;font-size:15px;">Freizeitbegriff</h3>
<p style="margin-bottom:10px;">Das Freizeitverständnis hat sich grundlegend gewandelt. So vertreten 70 % der Bevölkerung die Auffassung, dass Freizeit in erster Linie eine Zeit ist, in der man tun und lassen kann, was einem Spaß macht.</p>
<h3 style="font-weight:700;margin:10px 0 6px;font-size:14px;">Freizeitrituiale</h3>
<p>Die Deutschen haben ihre Freizeit bestens organisiert: samstags auf die Piste und sonntags mit der Familie. Fast jeder dritte Bundesbürger reserviert regelmäßig einen Wochentag für Familie oder Ausgehen.</p>`,
      questions: [
        { num:1, text:"Siebzig Prozent der Bevölkerung meinen, dass Freizeit", options:["nach den eigenen Vorlieben gestaltet werden soll.", "nicht unbedingt positiv besetzt ist.", "nur dem Ausruhen dienen sollte."], answer:0 },
        { num:2, text:"Die Mehrheit der Leute nutzt ihre Freizeit", options:["für die eigenen Interessen", "zur Aufbesserung des Einkommens", "zur Regeneration für den nächsten Arbeitstag"], answer:0 },
        { num:3, text:"Die Deutschen", options:["gehen nur an Wochenenden ihren Hobbys nach", "organisieren ihre Freizeit gar nicht.", "reservieren für ihre Aktivitäten bestimmte Wochentage."], answer:2 },
        { num:4, text:"Der Sonntag ist bei vielen reserviert für", options:["das Ausgehen", "die Freizeitgestaltung mit Freunden.", "Familie und Entspannung"], answer:2 },
        { num:5, text:"Freizeitrituiale", options:["schwächen den Gruppenzusammenhalt", "sind für die moderne Familie unwichtig", "waren bislang kaum wissenschaftlich untersucht worden"], answer:2 },
      ]
    },
    lv3: {
      instruction: "Lesen Sie die zehn Situationen (1–10) und die zwölf Texte (a–l). Welcher Text passt zu welcher Situation? Manchmal passt kein Text — wählen Sie dann x.",
      situations: [
        { id:1, text:"Ein Bekannter möchte Schweden per Schiff kennenlernen." },
        { id:2, text:"Ein Freund möchte sich im Inline-Skaten perfektionieren." },
        { id:3, text:"Ein Kollege möchte sich über Gesundheitsrisiken in Ägypten informieren." },
        { id:4, text:"Eine Bekannte möchte einen Kurs über Naturkosmetik besuchen." },
        { id:5, text:"Eine 17-jährige Freundin würde gerne armen Menschen in anderen Ländern helfen." },
        { id:6, text:"Ihr Nachbar möchte sich im Sommerurlaub sportlich betätigen." },
        { id:7, text:"Ihre Freundin möchte bei der Organisation einer Inline-Skate-Veranstaltung mitwirken." },
        { id:8, text:"Sie möchten das Inline-Skaten erlernen und suchen Informationen." },
        { id:9, text:"Sie möchten herausfinden, wo es in Deutschland Skate-Veranstaltungen gibt." },
        { id:10, text:"Sie müssen kurzfristig für Ihren Chef Reisepapiere für Ägypten besorgen." },
      ],
      ads: [
        { id:"a", title:"Göta-Kanal-Kreuzfahrt", body:"Entdecken Sie Schwedens schönste Sehenswürdigkeiten auf einer unvergesslichen Kreuzfahrt. Reisetermine: Mai–September. Tel. 040/32 55 13 55." },
        { id:"b", title:"Inline-Skating Reiseführer", body:"Strecken für Skater in verschiedenen Großstädten und Regionen Deutschlands. (Klartext Verlag Essen, ab ca. 7 Euro)" },
        { id:"c", title:"Laufen für die Forschung", body:"Straßenlauf in Frankfurt am Main für Aufklärung und Forschung. 13. August, Frankfurter Römer." },
        { id:"d", title:"Naturkosmetik-Workshop", body:"Lernen Sie, natürliche Kosmetikprodukte herzustellen. Kurs jeden ersten Samstag, Volkshochschule Münster." },
        { id:"e", title:"Sportreisen Mediterran", body:"Aktiv-Urlaub am Mittelmeer: Segeln, Tauchen, Klettern, Tennis. All-Inclusive-Pakete ab 799 Euro." },
        { id:"f", title:"Inline-Skating Grundkurs", body:"Anfänger lernen die Grundtechniken. Kurs jeden Samstag, Sportpark Berlin." },
        { id:"g", title:"Jugend hilft Jugend", body:"Du bist zwischen 16 und 25 Jahren? Mindestalter für Auslandsprojekte: 18 Jahre. www.jugend-hilft.de" },
        { id:"h", title:"Gesundheitshinweise Ägypten", body:"Vor Reisen nach Ägypten: Typhus-Impfung, Hepatitis A+B empfohlen. www.auswaertiges-amt.de" },
        { id:"i", title:"Inline Skating Events Deutschland", body:"Die komplette Liste aller Inline-Skate-Veranstaltungen in Deutschland. www.inline-events.de" },
        { id:"j", title:"Skating-Orga-Team gesucht", body:"Für den Inline-Marathon Frankfurt suchen wir ehrenamtliche Helfer. orga@inline-frankfurt.de" },
        { id:"k", title:"Visum & Reisedokumente Express", body:"Visaservice für alle Länder – auch kurzfristig. Ägypten-Visum in 24 Stunden." },
        { id:"l", title:"Natürlich Schön – Kosmetikstudio", body:"Behandlungen mit natürlichen Produkten. Keine Kurse, nur individuelle Behandlungen." },
      ],
      correctAnswers: { 1:"a", 2:"f", 3:"h", 4:"d", 5:null, 6:"e", 7:"j", 8:"f", 9:"i", 10:"k" }
    },
    sb1: {
      instruction: "Lesen Sie den Text und entscheiden Sie, welches Wort in die jeweilige Lücke passt.",
      intro: "Liebe Daniela,",
      segments: [
        { text:"ich habe schon ein ganz schlechtes Gewissen, denn " }, { gap:1 },
        { text:" wollte ich dir schon vor zwei Monaten schreiben. Wenn man sich auf eine Prüfung vorbereitet, hat " }, { gap:2 },
        { text:" überhaupt keine Zeit. Nun habe ich es aber geschafft! Mein Freund, mit " }, { gap:3 },
        { text:" Hilfe es mir möglich war, diese ganze Zeit zu " }, { gap:4 },
        { text:", hat mich für heute Abend eingeladen. Du hast mich gefragt, " }, { gap:5 },
        { text:" ich Lust hätte, mit dir ein Wochenende in London zu verbringen. Natürlich habe ich Lust! Ich würde mich " }, { gap:6 },
        { text:" besonders " }, { gap:7 },
        { text:" die Tate Gallery interessieren. Mach " }, { gap:8 },
        { text:" einfach ein paar Vorschläge. Ich bin sicher, dass wir " }, { gap:9 },
        { text:" auf ein Wochenende einigen können. Ich drucke schon mal Angebote aus: preiswerte Flüge " }, { gap:10 },
        { text:" ein günstiges Hotel.\n\nHerzliche Grüße" },
      ],
      options: [
        { num:1,  choices:[{id:"a1a",text:"außerdem"},{id:"a1b",text:"eigentlich"},{id:"a1c",text:"überhaupt"}], answer:"a1a" },
        { num:2,  choices:[{id:"a2a",text:"er"},{id:"a2b",text:"es"},{id:"a2c",text:"man"}], answer:"a2b" },
        { num:3,  choices:[{id:"a3a",text:"der"},{id:"a3b",text:"dessen"},{id:"a3c",text:"seiner"}], answer:"a3a" },
        { num:4,  choices:[{id:"a4a",text:"übersetzen"},{id:"a4b",text:"überstehen"},{id:"a4c",text:"übertragen"}], answer:"a4b" },
        { num:5,  choices:[{id:"a5a",text:"dass"},{id:"a5b",text:"falls"},{id:"a5c",text:"ob"}], answer:"a5c" },
        { num:6,  choices:[{id:"a6a",text:"ganz"},{id:"a6b",text:"recht"},{id:"a6c",text:"zwar"}], answer:"a6a" },
        { num:7,  choices:[{id:"a7a",text:"auf"},{id:"a7b",text:"für"},{id:"a7c",text:"in"}], answer:"a7b" },
        { num:8,  choices:[{id:"a8a",text:"bestimmt"},{id:"a8b",text:"doch"},{id:"a8c",text:"sicher"}], answer:"a8b" },
        { num:9,  choices:[{id:"a9a",text:"euch"},{id:"a9b",text:"sich"},{id:"a9c",text:"uns"}], answer:"a9c" },
        { num:10, choices:[{id:"a10a",text:"und"},{id:"a10b",text:"oder"},{id:"a10c",text:"aber"}], answer:"a10a" },
      ]
    },
    sb2: {
      instruction: "Lesen Sie den Text und entscheiden Sie, welches Wort in welche Lücke passt. Nicht alle Wörter passen.",
      title: "Es gibt immer weniger Deutsche",
      wordPool: ["AN","AUF","AUFGRUND","BEHEBEN","BESCHEIDEN","DRASTISCH","ERHÖHEN","FÜR","IM","NACH","RECHNEN","STATT","STEIGEN","ÜBERHEBLICH","UNSCHWER"],
      segments: [
        { gap:1 }, { text:" Angaben des Statistischen Bundesamtes wird die Bevölkerungszahl in Deutschland " },
        { gap:2 }, { text:" sinken. Die Statistiker " },
        { gap:3 }, { text:" damit, dass die Zahl der Deutschen bis 2050 von 82 auf 65 Millionen zurückgeht. Das Gesundheitssystem wird " },
        { gap:4 }, { text:" dieser Entwicklung vor großen Problemen stehen. Die Deutschen werden immer älter: das Lebensalter für Frauen wird auf 84 Jahre " },
        { gap:5 }, { text:". Die Auswirkungen lassen sich " },
        { gap:6 }, { text:" erahnen. Politik und Wirtschaft müssen sich " },
        { gap:7 }, { text:" Senioren einstellen. Diese Probleme könne man nur " },
        { gap:8 }, { text:", wenn junge Arbeitskräfte aus dem Ausland zuwandern. Arbeitnehmer müssen den größten Teil ihres Einkommens " },
        { gap:9 }, { text:" Krankenversicherungen " },
        { gap:10 }, { text:" Konsum stecken." },
      ],
      correctAnswers: { 1:"AN", 2:"AUFGRUND", 3:"RECHNEN", 4:"DRASTISCH", 5:"STEIGEN", 6:"UNSCHWER", 7:"AUF", 8:"BEHEBEN", 9:"IN", 10:"STATT" }
    }
  },
  hoeren: {
    // Set audioUrl to a hosted MP3 URL, or null to let students upload their file
    audioUrl: null,
    hv1: {
      instruction: "Sie hören die Nachrichten. Entscheiden Sie beim Hören, ob die Aussagen richtig oder falsch sind.",
      audioUrl: null,
      items: [
        { id:1, text:"Laut BILD AM SONNTAG können in Zukunft nur Mieter, aber nicht Vermieter bestimmte Mietverträge schneller kündigen.", answer:true },
        { id:2, text:"In bestimmten Bundesländern sollen Wohnhäuser abgerissen werden, weil sie unbewohnt sind.", answer:true },
        { id:3, text:"Sowohl die Waldbrände als auch die Hitzewelle in Griechenland sind zu Ende.", answer:false },
        { id:4, text:"In Kanada mussten die Bergungsarbeiten nach einem Tornado wegen erneuter Unwetterwarnungen eingestellt werden.", answer:true },
        { id:5, text:"Bei einem Fährunglück in der Nähe von Gibraltar gab es nur Sachschaden.", answer:false },
      ]
    },
    hv2: {
      instruction: "Sie hören ein Interview. Entscheiden Sie, ob die Aussagen richtig oder falsch sind.",
      audioUrl: null,
      items: [
        { id:1,  text:"Auf dem Gipfel der Zugspitze liegt ungefähr ein Meter Schnee.", answer:true },
        { id:2,  text:"Man kann derzeit auf der Zugspitze Ski fahren.", answer:false },
        { id:3,  text:"Auch in Garmisch-Partenkirchen selbst hat es geschneit.", answer:true },
        { id:4,  text:"In der kommenden Woche erwartet man freundliches Wetter.", answer:false },
        { id:5,  text:"Am Sonntag wird ein Gottesdienst auf einer Bergstation abgehalten.", answer:true },
        { id:6,  text:"Die Zugspitze kann man momentan wegen des Nebels nicht erkennen.", answer:false },
        { id:7,  text:"Die Urlauber haben bei jedem Wetter genügend Möglichkeiten zur Freizeitgestaltung.", answer:true },
        { id:8,  text:"Herr Werner erwartet keine Wetterbesserung.", answer:false },
        { id:9,  text:"Auch in früheren Jahren hat es im Juni und August geschneit.", answer:true },
        { id:10, text:"Herr Werner ist mit seinem Arbeitsplatz zufrieden.", answer:true },
      ]
    },
    hv3: {
      instruction: "Sie hören fünf kurze Texte. Entscheiden Sie, ob die Aussagen richtig oder falsch sind.",
      audioUrl: null,
      items: [
        { id:1, text:"Der Software-Service steht rund um die Uhr zur Verfügung.", answer:true },
        { id:2, text:"Für das Konzert gibt es noch Karten ab 200 Euro.", answer:false },
        { id:3, text:"Über den neuen Tarif können Sie sich im Internet informieren.", answer:true },
        { id:4, text:"In diesem Jahr treten im Museum nur japanische Musiker auf.", answer:false },
        { id:5, text:"Bei dem Festival gibt es auch kulinarische Spezialitäten aus dem In- und Ausland.", answer:true },
      ]
    }
  },
  schreiben: {
    title: "Beschwerde: Lärm in der Nachbarschaft",
    promptA: "Aufgabe A: Bitte um Informationen",
    promptB: "Aufgabe B: Beschwerde",
    intro: "Sie wohnen seit drei Jahren in einer ruhigen Wohngegend. Seit zwei Monaten verursacht eine Baustelle täglich starken Lärm – auch am Wochenende.",
    task: "Schreiben Sie einen formellen Brief an das Bauamt Ihrer Stadt.",
    bullets: [
      "Erklären Sie Ihre Situation und den Lärm.",
      "Fordern Sie Informationen über die Bauzeit an.",
      "Verlangen Sie, dass der Lärm am Wochenende eingestellt wird.",
      "Drohen Sie mit weiteren Maßnahmen."
    ],
    recipient: "An das Stadtbauamt",
    subject: "Beschwerde über Baulärm in der Musterstraße",
    minWords: 150, maxWords: 220
  }
},

// ─────────────────────────────────────────────────────────────────────────────
// THEME 2 — Arbeit & Karriere
// ─────────────────────────────────────────────────────────────────────────────
{
  name: "Arbeit & Karriere",
  lesen: {
    lv1: {
      instruction: "Lesen Sie die Überschriften a–j und die Texte 1–5 und entscheiden Sie, welche Überschrift am besten zu welchem Text passt.",
      headings: [
        { id:"A", text:"Arbeitslosigkeit in Deutschland auf Rekordtief" },
        { id:"B", text:"Burnout – wenn die Arbeit krank macht" },
        { id:"C", text:"Das Vorstellungsgespräch: Tipps für den Erfolg" },
        { id:"D", text:"Elternzeit: Väter nehmen häufiger Auszeit" },
        { id:"E", text:"Frauen in Führungspositionen: Noch immer eine Seltenheit" },
        { id:"F", text:"Homeoffice: Vor- und Nachteile der Arbeit von zu Hause" },
        { id:"G", text:"Mindestlohn erhöht – Auswirkungen auf kleine Betriebe" },
        { id:"H", text:"Praktikum im Ausland – ein Schritt zur Weltoffenheit" },
        { id:"I", text:"Rente mit 67: Debatte um Rentenalter geht weiter" },
        { id:"J", text:"Weiterbildung als Schlüssel zum beruflichen Erfolg" },
      ],
      texts: [
        { id:1, body:"Viele Berufstätige kennen das Gefühl: Man ist ständig erschöpft, kann nicht mehr abschalten, und selbst das Wochenende bringt keine Erholung. Das Burnout-Syndrom ist heute als ernstzunehmende Erkrankung anerkannt. Betriebe sind gesetzlich verpflichtet, Maßnahmen zur Gesundheitsförderung anzubieten.", answer:"B" },
        { id:2, body:"Lange war es in Deutschland undenkbar, dass Väter nach der Geburt eines Kindes eine Auszeit nehmen. Doch die Zeiten ändern sich: Inzwischen nutzen fast 35 Prozent der Väter die Möglichkeit der Elternzeit – ein neuer Rekord.", answer:"D" },
        { id:3, body:"Ein gutes Arbeitszeugnis ist das eine, aber ein erfolgreiches Vorstellungsgespräch das andere. Experten empfehlen: gründliche Vorbereitung auf das Unternehmen, klare Formulierung der eigenen Stärken und Pünktlichkeit.", answer:"C" },
        { id:4, body:"Obwohl Frauen in Deutschland genauso gut ausgebildet sind wie Männer, sind sie in Vorstandsetagen stark unterrepräsentiert. Nur etwa 15 Prozent der Vorstände großer Unternehmen sind weiblich.", answer:"E" },
        { id:5, body:"Seit Einführung des Mindestlohns gibt es Debatten über seine Auswirkungen. Er wurde erneut auf 13,50 Euro angehoben. Besonders kleine Unternehmen spüren die Folgen: Manche müssen Stellen abbauen.", answer:"G" },
      ],
      correctAnswers: { 1:"B", 2:"D", 3:"C", 4:"E", 5:"G" }
    },
    lv2: {
      instruction: "Lesen Sie den Text und die Aufgaben. Entscheiden Sie anhand des Textes, welche Lösung richtig ist.",
      text: `<h3 style="font-weight:700;margin-bottom:10px;font-size:15px;">Homeoffice: Fluch oder Segen?</h3>
<p style="margin-bottom:10px;">Seit der Pandemie hat sich das Homeoffice etabliert. Rund 30 Prozent aller Beschäftigten arbeiten teilweise von zu Hause. Akademiker profitieren am meisten, während Beschäftigte in Pflege und Produktion kaum diese Möglichkeit haben.</p>
<p>Viele schätzen die eingesparte Pendelzeit, beklagen aber fehlende soziale Kontakte. Studien zeigen, dass hybride Modelle die Zufriedenheit am stärksten steigern.</p>`,
      questions: [
        { num:1, text:"Wie viele Beschäftigte arbeiten teilweise im Homeoffice?", options:["Fast alle", "Etwa ein Drittel", "Weniger als 10 Prozent"], answer:1 },
        { num:2, text:"Wer profitiert am meisten vom Homeoffice?", options:["Beschäftigte in der Pflege", "Produktionsarbeiter", "Akademiker und Büroberufe"], answer:2 },
        { num:3, text:"Was beklagen viele Arbeitnehmer im Homeoffice?", options:["Zu viel Freizeit", "Fehlende soziale Kontakte", "Zu lange Pendelzeiten"], answer:1 },
        { num:4, text:"Was zeigen Studien über hybride Modelle?", options:["Sie führen zu Produktivitätsverlust", "Sie steigern die Zufriedenheit am stärksten", "Sie sind nicht praktikabel"], answer:1 },
        { num:5, text:"Gibt es ein gesetzliches Recht auf Homeoffice in Deutschland?", options:["Ja, seit der Pandemie", "Nein, bislang nicht", "Ja, für alle Büroberufe"], answer:1 },
      ]
    },
    lv3: {
      instruction: "Lesen Sie die Situationen und die Texte. Welcher Text passt zu welcher Situation?",
      situations: [
        { id:1, text:"Ein Freund sucht einen Englisch-Sprachkurs für Anfänger." },
        { id:2, text:"Ihre Kollegin sucht IT-Weiterbildung." },
        { id:3, text:"Ein Bekannter möchte ein Praktikum im Ausland." },
        { id:4, text:"Ihre Schwester sucht einen Babysitter." },
        { id:5, text:"Ein Freund möchte ein Unternehmen gründen." },
        { id:6, text:"Eine Kollegin sucht Infos über gesunde Ernährung am Arbeitsplatz." },
        { id:7, text:"Sie suchen ein günstiges Fitnessstudio." },
        { id:8, text:"Ihr Chef benötigt Infos über Datenschutz im Unternehmen." },
        { id:9, text:"Sie möchten Ihr Fahrrad reparieren lassen." },
        { id:10, text:"Ein Freund möchte ehrenamtlich bei einer Umweltorganisation helfen." },
      ],
      ads: [
        { id:"a", title:"Englisch für Einsteiger", body:"Sprachkurs für Anfänger. Dienstag und Donnerstag, 18–20 Uhr. VHS Frankfurt." },
        { id:"b", title:"IT-Weiterbildung Online", body:"Kurse in Java, Python, Data Science. Flexibel lernen. www.it-weiterbildung.de" },
        { id:"c", title:"Praktika weltweit", body:"Praktikumsplätze in Europa, Amerika und Asien. www.praktika-weltweit.de" },
        { id:"d", title:"Kinderbetreuung Sonnenschein", body:"Zuverlässige Babysitter für Kinder ab 6 Monaten. Tel. 030/44556677" },
        { id:"e", title:"Existenzgründer-Beratung IHK", body:"Kostenlose Erstberatung. Businessplan, Finanzierung. IHK Frankfurt, Mo–Fr 9–17 Uhr." },
        { id:"f", title:"Gesund am Arbeitsplatz", body:"Tipps zur Ernährung im Büro. www.gesund-arbeiten.de" },
        { id:"g", title:"FitnessCentrum Stadtmitte", body:"Monatsbeitrag ab 19,90 Euro. Probetraining kostenlos!" },
        { id:"h", title:"Datenschutz-Seminar", body:"Seminar zu DSGVO und Mitarbeiterschulung. datenschutz@akademie.de" },
        { id:"i", title:"Fahrrad-Werkstatt Pedal", body:"Reparaturen aller Art. Mo–Sa 9–18 Uhr." },
        { id:"j", title:"Greenpeace Volunteers", body:"Freiwillige für Umweltschutzprojekte gesucht. www.greenpeace.de/mitmachen" },
        { id:"k", title:"Nachhilfelehrer gesucht", body:"Suchen Lehrer für Mathematik, Englisch, Deutsch. 15 Euro/Stunde." },
        { id:"l", title:"Ernährungsberatung Vital", body:"Individuelle Ernährungspläne, nur Einzelpersonen. Tel. 040/1234567" },
      ],
      correctAnswers: { 1:"a", 2:"b", 3:"c", 4:"d", 5:"e", 6:"f", 7:"g", 8:"h", 9:"i", 10:"j" }
    },
    sb1: {
      instruction: "Lesen Sie den Text und entscheiden Sie, welches Wort in die jeweilige Lücke passt.",
      intro: "Lieber Jonas,",
      segments: [
        { text:"ich schreibe dir, weil ich endlich Zeit habe – mein neuer Job lässt mir " }, { gap:1 },
        { text:" mehr Freizeit. Du fragst dich " }, { gap:2 },
        { text:", warum ich gewechselt habe? Das Klima im alten Betrieb war " }, { gap:3 },
        { text:" geworden. Jetzt bin ich bei einer kleinen Firma, " }, { gap:4 },
        { text:" alle sehr freundlich sind. Das Gehalt ist niedriger, aber ich kann " }, { gap:5 },
        { text:" damit leben. Der Chef ist " }, { gap:6 },
        { text:" verständnisvoll. Ich bin " }, { gap:7 },
        { text:" froh, diesen Schritt gemacht zu haben. Du solltest " }, { gap:8 },
        { text:" auch darüber nachdenken, ob dein Job " }, { gap:9 },
        { text:" für dich passt. Viele Grüße " }, { gap:10 },
        { text:" Klaus" },
      ],
      options: [
        { num:1,  choices:[{id:"b1a",text:"deutlich"},{id:"b1b",text:"kaum"},{id:"b1c",text:"wenig"}], answer:"b1a" },
        { num:2,  choices:[{id:"b2a",text:"bestimmt"},{id:"b2b",text:"doch"},{id:"b2c",text:"sicher"}], answer:"b2b" },
        { num:3,  choices:[{id:"b3a",text:"besser"},{id:"b3b",text:"schlechter"},{id:"b3c",text:"gleich"}], answer:"b3b" },
        { num:4,  choices:[{id:"b4a",text:"wo"},{id:"b4b",text:"weil"},{id:"b4c",text:"wenn"}], answer:"b4a" },
        { num:5,  choices:[{id:"b5a",text:"gut"},{id:"b5b",text:"schlecht"},{id:"b5c",text:"kaum"}], answer:"b5a" },
        { num:6,  choices:[{id:"b6a",text:"sehr"},{id:"b6b",text:"gar nicht"},{id:"b6c",text:"wenig"}], answer:"b6a" },
        { num:7,  choices:[{id:"b7a",text:"wirklich"},{id:"b7b",text:"kaum"},{id:"b7c",text:"selten"}], answer:"b7a" },
        { num:8,  choices:[{id:"b8a",text:"auch"},{id:"b8b",text:"schon"},{id:"b8c",text:"noch"}], answer:"b8a" },
        { num:9,  choices:[{id:"b9a",text:"wirklich"},{id:"b9b",text:"eigentlich"},{id:"b9c",text:"bereits"}], answer:"b9b" },
        { num:10, choices:[{id:"b10a",text:"von"},{id:"b10b",text:"aus"},{id:"b10c",text:"mit"}], answer:"b10c" },
      ]
    },
    sb2: {
      instruction: "Lesen Sie den Text und entscheiden Sie, welches Wort in welche Lücke passt.",
      title: "Stress im Beruf",
      wordPool: ["AB","ALLERDINGS","AUFGRUND","DAHER","ERHOLSAM","FÜR","GEBEN","JEDOCH","KAUM","LAUT","NEHMEN","OBWOHL","ÜBER","ZUR","ZUDEM"],
      segments: [
        { gap:1 }, { text:" Studien leidet fast jeder dritte Arbeitnehmer unter beruflichem Stress. " },
        { gap:2 }, { text:" ist das Problem in den letzten Jahren stark gewachsen. Viele Beschäftigte " },
        { gap:3 }, { text:" sich kaum Zeit " },
        { gap:4 }, { text:" Erholung. Regelmäßige Pausen wären wichtig. Experten empfehlen, mindestens " },
        { gap:5 }, { text:" Wochen Urlaub pro Jahr " },
        { gap:6 }, { text:". " },
        { gap:7 }, { text:" viele Arbeitnehmer diesen Rat kennen, setzen ihn " },
        { gap:8 }, { text:" wenige in die Tat um. " },
        { gap:9 }, { text:" von Überstunden sollten Beschäftigte Nein sagen lernen. Stress lässt sich " },
        { gap:10 }, { text:" bekämpfen, wenn man früh Grenzen setzt." },
      ],
      correctAnswers: { 1:"LAUT", 2:"DAHER", 3:"NEHMEN", 4:"ZUR", 5:"ÜBER", 6:"GEBEN", 7:"OBWOHL", 8:"KAUM", 9:"AUFGRUND", 10:"ALLERDINGS" }
    }
  },
  hoeren: {
    audioUrl: null,
    hv1: {
      instruction: "Sie hören die Nachrichten. Entscheiden Sie, ob die Aussagen richtig oder falsch sind.",
      audioUrl: null,
      items: [
        { id:1, text:"Ein neues Medikament gegen Alzheimer ist bereits zugelassen.", answer:false },
        { id:2, text:"Das neue Elektroauto-Modell kann laut Hersteller über 700 km ohne Laden fahren.", answer:true },
        { id:3, text:"Die ISS soll noch mindestens zehn Jahre in Betrieb bleiben.", answer:false },
        { id:4, text:"Ein deutsches Start-up hat eine Echtzeit-Übersetzungs-App entwickelt.", answer:true },
        { id:5, text:"Der neue Supercomputer in München ist der schnellste weltweit.", answer:false },
      ]
    },
    hv2: {
      instruction: "Sie hören ein Interview über Homeoffice.",
      audioUrl: null,
      items: [
        { id:1,  text:"Mehr als die Hälfte der Deutschen arbeitet vollständig im Homeoffice.", answer:false },
        { id:2,  text:"Die Interviewte ist Expertin für Arbeitspsychologie.", answer:true },
        { id:3,  text:"Hybride Modelle führen laut Studie zur höchsten Zufriedenheit.", answer:true },
        { id:4,  text:"Fehlende soziale Kontakte ist der häufigste Kritikpunkt.", answer:true },
        { id:5,  text:"Es gibt ein gesetzliches Recht auf Homeoffice in Deutschland.", answer:false },
        { id:6,  text:"Frauen nutzen Homeoffice-Angebote häufiger als Männer.", answer:true },
        { id:7,  text:"Die Expertin empfiehlt mindestens zwei Bürotage pro Woche.", answer:true },
        { id:8,  text:"Produktivität ist im Homeoffice immer höher als im Büro.", answer:false },
        { id:9,  text:"Datenschutz ist eine besondere Herausforderung im Homeoffice.", answer:true },
        { id:10, text:"Kleine Unternehmen bieten seltener Homeoffice an als große.", answer:true },
      ]
    },
    hv3: {
      instruction: "Sie hören fünf kurze Texte.",
      audioUrl: null,
      items: [
        { id:1, text:"Das Bewerbungstraining findet nur für Studenten statt.", answer:false },
        { id:2, text:"Der Kurs zur Stressbewältigung ist kostenlos.", answer:true },
        { id:3, text:"Die neue App hilft bei der Jobsuche.", answer:true },
        { id:4, text:"Das Seminar über Gehaltsverhandlung findet online statt.", answer:false },
        { id:5, text:"Für die Weiterbildungsmaßnahme ist eine Anmeldung erforderlich.", answer:true },
      ]
    }
  },
  schreiben: {
    title: "Anfrage: Informationen über eine Stellenanzeige",
    promptA: "Aufgabe A: Bitte um Details",
    promptB: "Aufgabe B: Anfrage",
    intro: "Sie haben eine interessante Stellenanzeige für eine Position als Projektmanager gefunden. Bevor Sie sich bewerben, möchten Sie einige Fragen stellen.",
    task: "Schreiben Sie eine formelle Anfrage an die Personalabteilung.",
    bullets: [
      "Erklären Sie, warum Sie sich für die Stelle interessieren.",
      "Fragen Sie nach den genauen Aufgaben und Anforderungen.",
      "Erkundigen Sie sich nach Weiterbildungsmöglichkeiten.",
      "Fragen Sie nach dem Bewerbungsverfahren."
    ],
    recipient: "An die Personalabteilung",
    subject: "Anfrage zur Stellenanzeige: Projektmanager",
    minWords: 150, maxWords: 220
  }
},

// ─────────────────────────────────────────────────────────────────────────────
// THEME 3 — Umwelt & Gesellschaft
// ─────────────────────────────────────────────────────────────────────────────
{
  name: "Umwelt & Gesellschaft",
  lesen: {
    lv1: {
      instruction: "Lesen Sie die Überschriften a–j und die Texte 1–5 und entscheiden Sie, welche Überschrift am besten zu welchem Text passt.",
      headings: [
        { id:"A", text:"Recycling: Deutschland an der Spitze Europas" },
        { id:"B", text:"Klimawandel bedroht deutsche Wälder" },
        { id:"C", text:"Elektroautos: Chancen und Probleme der Mobilitätswende" },
        { id:"D", text:"Bienen retten – Bauern in der Pflicht" },
        { id:"E", text:"Solarenergie – der Boom geht weiter" },
        { id:"F", text:"Plastikverbot: Was sich wirklich ändert" },
        { id:"G", text:"Stadtbegrünung gegen Hitzewellen" },
        { id:"H", text:"Trinkwasser wird knapper" },
        { id:"I", text:"Windräder in der Kritik" },
        { id:"J", text:"Zwanzig Jahre Dosenpfand" },
      ],
      texts: [
        { id:1, body:"Die deutschen Wälder sind in einem schlechten Zustand. Dürre, Borkenkäferbefall und Stürme haben Millionen Bäume vernichtet. Der Klimawandel verschärft die Situation: Wärmere Temperaturen schwächen die Bäume und machen sie anfälliger für Schädlinge.", answer:"B" },
        { id:2, body:"Deutschland hat ambitionierte Ziele bei der Elektromobilität: Bis 2030 sollen 15 Millionen E-Autos auf deutschen Straßen fahren. Doch fehlende Ladeinfrastruktur und hohe Preise halten viele Käufer ab.", answer:"C" },
        { id:3, body:"EU-Richtlinien verbieten Einwegbesteck aus Plastik, Trinkhalme und Wattestäbchen. Doch in der Praxis gibt es viele Ausnahmen. Umweltverbände kritisieren, dass das Verbot nicht weit genug geht.", answer:"F" },
        { id:4, body:"Städte setzen auf Begrünungsmaßnahmen: Dachgärten und bepflanzte Fassaden sollen Temperaturen in überhitzten Stadtvierteln senken. Begrünte Areale können bis zu vier Grad kühler sein.", answer:"G" },
        { id:5, body:"Die Installation neuer Windkraftanlagen ist trotz Energiewendezielen ins Stocken geraten. Naturschutzorganisationen klagen gegen neue Standorte. Genehmigungsverfahren dauern oft Jahre.", answer:"I" },
      ],
      correctAnswers: { 1:"B", 2:"C", 3:"F", 4:"G", 5:"I" }
    },
    lv2: {
      instruction: "Lesen Sie den Text und die Aufgaben.",
      text: `<h3 style="font-weight:700;margin-bottom:10px;font-size:15px;">Recycling in Deutschland</h3>
<p style="margin-bottom:10px;">Deutschland gilt weltweit als Vorbild beim Recycling. Rund 67 Prozent aller Haushaltsabfälle werden wiederverwertet. Das duale System hat seit den 1990er-Jahren die Müllvermeidung revolutioniert.</p>
<p>Ein besonderes Problem stellt Elektroschrott dar. Millionen Altgeräte landen im Müll, obwohl wertvolle Rohstoffe rückgewonnen werden könnten. Neue EU-Gesetze sollen Hersteller verpflichten, Produkte langlebiger zu gestalten.</p>`,
      questions: [
        { num:1, text:"Welchen Anteil der Haushaltsabfälle recycelt Deutschland?", options:["Etwa die Hälfte", "Fast zwei Drittel", "Fast alle"], answer:1 },
        { num:2, text:"Wann wurde das duale System eingeführt?", options:["In den 1980er-Jahren", "In den 1990er-Jahren", "Nach 2000"], answer:1 },
        { num:3, text:"Was kritisieren Experten beim Recycling?", options:["Zu wenig Mülltrennung", "Zu viel schwer recycelbares Plastik", "Das duale System funktioniert nicht"], answer:1 },
        { num:4, text:"Was enthält Elektroschrott Wertvolles?", options:["Holz und Papier", "Gold, Seltene Erden und Kupfer", "Plastik und Glas"], answer:1 },
        { num:5, text:"Was soll das Recht auf Reparatur bewirken?", options:["Produkte billiger machen", "Produkte langlebiger machen", "Recycling verbieten"], answer:1 },
      ]
    },
    lv3: {
      instruction: "Lesen Sie die Situationen und die Texte.",
      situations: [
        { id:1, text:"Eine Freundin möchte ihren alten Laptop umweltfreundlich entsorgen." },
        { id:2, text:"Ihr Bruder interessiert sich für ein Elektroauto." },
        { id:3, text:"Eine Kollegin sucht einen Fahrradstellplatz in der Nähe." },
        { id:4, text:"Ein Bekannter möchte Bienen in seinem Garten fördern." },
        { id:5, text:"Sie suchen Informationen über Solaranlagen." },
        { id:6, text:"Ihr Nachbar möchte an einem Umweltprojekt teilnehmen." },
        { id:7, text:"Eine Freundin möchte Lebensmittelabfälle vermeiden." },
        { id:8, text:"Sie möchten eine Ladestation in Ihrer Garage installieren." },
        { id:9, text:"Ein Freund möchte ohne Pestizide gärtnern." },
        { id:10, text:"Ihre Schwester sucht Rezepte für selbstgemachte Reinigungsmittel." },
      ],
      ads: [
        { id:"a", title:"Elektroschrott-Recycling", body:"Alte Elektrogeräte kostenlos abgeben. Fachgerechte Entsorgung. www.elektroschrott-recycling.de" },
        { id:"b", title:"E-Auto Beratung", body:"Kostenlose Beratung: Welches E-Auto passt zu Ihnen? Tel. 0800/1234567" },
        { id:"c", title:"Fahrradgarage am Bahnhof", body:"Sichere Stellplätze direkt am Hauptbahnhof. Monatskarte ab 5 Euro." },
        { id:"d", title:"Bienenfreundlicher Garten", body:"Pflanzen, Nisthilfen und Wildblumenwiesen. www.bienenretten.de" },
        { id:"e", title:"Solar-Konfigurator", body:"Berechnen Sie den Ertrag Ihrer Solaranlage. www.solar-konfigurator.de" },
        { id:"f", title:"Stadtentwicklung – Mitmachen!", body:"Bürgerinitiative für ein grüneres Stadtbild. www.gruenesstadt.de" },
        { id:"g", title:"Lebensmittel retten", body:"Tipps gegen Lebensmittelverschwendung. www.lebensmittel-retten.de" },
        { id:"h", title:"Wallbox-Installation", body:"Ladestationen für Elektroautos. Förderung beantragen. Tel. 030/9876543" },
        { id:"i", title:"Naturgarten ohne Chemie", body:"Pestizidfreies Gärtnern. www.naturgarten.de" },
        { id:"j", title:"Sauber ohne Chemie", body:"Rezepte mit Essig, Natron und Zitrone. Im Buchhandel erhältlich." },
        { id:"k", title:"Gartencenter Grünwelt", body:"Pflanzen, Erde, Dünger. Mo–Sa 9–18 Uhr." },
        { id:"l", title:"Klimaanlage für den Sommer", body:"Klimaanlagen für Wohnung und Büro. Tel. 040/5556677" },
      ],
      correctAnswers: { 1:"a", 2:"b", 3:"c", 4:"d", 5:"e", 6:"f", 7:"g", 8:"h", 9:"i", 10:"j" }
    },
    sb1: {
      instruction: "Lesen Sie den Text und entscheiden Sie, welches Wort in die jeweilige Lücke passt.",
      intro: "Liebe Umweltfreunde,",
      segments: [
        { text:"ich möchte über unser neues Projekt berichten. " }, { gap:1 },
        { text:" langer Planung haben wir begonnen, unsere Nachbarschaft " }, { gap:2 },
        { text:" zu begrünen. Wir pflanzen Bäume und Blumen, " }, { gap:3 },
        { text:" die Umgebung schöner zu machen. Die Reaktionen sind " }, { gap:4 },
        { text:" positiv. Viele melden sich " }, { gap:5 },
        { text:" und wollen mithelfen. Unser Ziel ist " }, { gap:6 },
        { text:" Aufbau eines Gemeinschaftsgartens, " }, { gap:7 },
        { text:" jeder Gemüse anbauen kann. Wir suchen Unterstützer, die uns " }, { gap:8 },
        { text:" finanziell als " }, { gap:9 },
        { text:" auch praktisch helfen. Schreibt uns " }, { gap:10 },
        { text:", und wir melden uns!" },
      ],
      options: [
        { num:1,  choices:[{id:"c1a",text:"Nach"},{id:"c1b",text:"Seit"},{id:"c1c",text:"Vor"}], answer:"c1a" },
        { num:2,  choices:[{id:"c2a",text:"gemeinsam"},{id:"c2b",text:"alleine"},{id:"c2c",text:"schnell"}], answer:"c2a" },
        { num:3,  choices:[{id:"c3a",text:"damit"},{id:"c3b",text:"um"},{id:"c3c",text:"weil"}], answer:"c3b" },
        { num:4,  choices:[{id:"c4a",text:"kaum"},{id:"c4b",text:"überwiegend"},{id:"c4c",text:"selten"}], answer:"c4b" },
        { num:5,  choices:[{id:"c5a",text:"freiwillig"},{id:"c5b",text:"spontan"},{id:"c5c",text:"gezwungen"}], answer:"c5b" },
        { num:6,  choices:[{id:"c6a",text:"der"},{id:"c6b",text:"dem"},{id:"c6c",text:"den"}], answer:"c6a" },
        { num:7,  choices:[{id:"c7a",text:"wo"},{id:"c7b",text:"weil"},{id:"c7c",text:"dass"}], answer:"c7a" },
        { num:8,  choices:[{id:"c8a",text:"sowohl"},{id:"c8b",text:"entweder"},{id:"c8c",text:"weder"}], answer:"c8a" },
        { num:9,  choices:[{id:"c9a",text:"noch"},{id:"c9b",text:"auch"},{id:"c9c",text:"oder"}], answer:"c9a" },
        { num:10, choices:[{id:"c10a",text:"einfach"},{id:"c10b",text:"schnell"},{id:"c10c",text:"gerne"}], answer:"c10c" },
      ]
    },
    sb2: {
      instruction: "Lesen Sie den Text und entscheiden Sie, welches Wort in welche Lücke passt.",
      title: "Die Energiewende in Deutschland",
      wordPool: ["AB","BEREITS","DAFÜR","DOCH","FOSSILE","GERADE","JEDOCH","MEHR","NOCH","OB","RUND","SEIT","TROTZ","ZIEL","ZUDEM"],
      segments: [
        { gap:1 }, { text:" vielen Jahren arbeitet Deutschland an der Energiewende. Das " },
        { gap:2 }, { text:" ist es, erneuerbare Energien zu stärken und " },
        { gap:3 }, { text:" Brennstoffe wie Kohle " },
        { gap:4 }, { text:" zu schaffen. " },
        { gap:5 }, { text:" decken erneuerbare Energien " },
        { gap:6 }, { text:" 45 Prozent des Strombedarfs. " },
        { gap:7 }, { text:" der Fortschritte gibt es noch Herausforderungen. Experten diskutieren, " },
        { gap:8 }, { text:" Deutschland seine Ziele bis 2030 erreichen kann. Viele bezweifeln das, weil " },
        { gap:9 }, { text:" immer zu viel Strom aus Kohle produziert wird. Die Regierung will " },
        { gap:10 }, { text:" in Solar- und Windenergie investieren." },
      ],
      correctAnswers: { 1:"SEIT", 2:"ZIEL", 3:"FOSSILE", 4:"AB", 5:"BEREITS", 6:"RUND", 7:"TROTZ", 8:"OB", 9:"NOCH", 10:"MEHR" }
    }
  },
  hoeren: {
    audioUrl: null,
    hv1: {
      instruction: "Sie hören die Nachrichten.",
      audioUrl: null,
      items: [
        { id:1, text:"Das neue Museum öffnet seine Türen bereits nächste Woche.", answer:false },
        { id:2, text:"Der bekannte Regisseur hat seinen neuen Film persönlich vorgestellt.", answer:true },
        { id:3, text:"Die Ausstellung wird aufgrund großen Interesses verlängert.", answer:true },
        { id:4, text:"Das Theaterstück basiert auf einem Roman aus dem 19. Jahrhundert.", answer:false },
        { id:5, text:"Die Kartenpreise für das Konzert wurden gesenkt.", answer:true },
      ]
    },
    hv2: {
      instruction: "Sie hören ein Interview über Lesen und Literatur.",
      audioUrl: null,
      items: [
        { id:1,  text:"Deutsche lesen im Durchschnitt weniger als früher.", answer:true },
        { id:2,  text:"E-Books sind in Deutschland beliebter als gedruckte Bücher.", answer:false },
        { id:3,  text:"Der Interviewte ist selbst Schriftsteller.", answer:true },
        { id:4,  text:"Kinder lesen hauptsächlich Abenteuerromane.", answer:false },
        { id:5,  text:"Das Lesen fördert die Empathiefähigkeit.", answer:true },
        { id:6,  text:"Öffentliche Bibliotheken werden immer weniger genutzt.", answer:false },
        { id:7,  text:"Der Interviewte empfiehlt täglich mindestens 30 Minuten zu lesen.", answer:true },
        { id:8,  text:"Hörbücher gelten nicht als richtiges Lesen.", answer:false },
        { id:9,  text:"Soziale Medien haben das Leseverhalten der Jugendlichen negativ beeinflusst.", answer:true },
        { id:10, text:"Der Buchmarkt in Deutschland wächst seit Jahren kontinuierlich.", answer:false },
      ]
    },
    hv3: {
      instruction: "Sie hören fünf kurze Texte.",
      audioUrl: null,
      items: [
        { id:1, text:"Das Stadtfest findet dieses Jahr zum ersten Mal statt.", answer:false },
        { id:2, text:"Der Kalligrafie-Kurs ist für Anfänger geeignet.", answer:true },
        { id:3, text:"Die Ausstellung ist auch am Sonntag geöffnet.", answer:true },
        { id:4, text:"Für die Filmvorführung ist eine Anmeldung erforderlich.", answer:false },
        { id:5, text:"Das Konzert beginnt um 20 Uhr.", answer:true },
      ]
    }
  },
  schreiben: {
    title: "Beschwerde: Enttäuschender Urlaub",
    promptA: "Aufgabe A: Urlaub schildern",
    promptB: "Aufgabe B: Beschwerde",
    intro: "Sie haben über ein Reisebüro einen Pauschalurlaub gebucht, der nicht dem entsprach, was versprochen wurde. Das Hotel war renovierungsbedürftig und der Pool war gesperrt.",
    task: "Schreiben Sie einen Beschwerdebrief an das Reisebüro.",
    bullets: [
      "Beschreiben Sie die Diskrepanz zwischen Versprechen und Realität.",
      "Nennen Sie konkrete Mängel des Hotels.",
      "Fordern Sie eine teilweise Rückerstattung.",
      "Bitten Sie um eine schriftliche Stellungnahme."
    ],
    recipient: "An das Reisebüro SunTours",
    subject: "Beschwerde über Pauschalreise, Buchungsnr. 77890",
    minWords: 150, maxWords: 220
  }
},
{
  name: "Digital Nomads & Future Work",
  lesen: {
    lv1: {
      instruction: "Lesen Sie die Überschriften a–j und die Texte 1–5. Finden Sie die passende Schlagzeile für jeden Blog-Post.",
      headings: [
        { id:"A", text:"Coworking am Strand: Die neue Realität" },
        { id:"B", text:"Burnout trotz Freiheit? Die Schattenseiten" },
        { id:"C", text:"Bali oder Berlin? Wo Nomaden am liebsten arbeiten" },
        { id:"D", text:"Programmieren unter Palmen: Ein Erfahrungsbericht" },
        { id:"E", text:"Steuern sparen als Weltreisender – geht das?" },
        { id:"F", text:"Starlink: Internet überall, auch im Dschungel" },
        { id:"G", text:"Einsamkeit im Paradies: Wenn Zoom nicht reicht" },
        { id:"H", text:"Die besten Apps für Remote-Teams 2026" },
        { id:"I", text:"Visum-Chaos: Wenn das Home-Office im Ausland endet" },
        { id:"J", text:"Künstliche Intelligenz ersetzt Reisebüros" },
      ],
      texts: [
        { id:1, body: "Immer mehr junge Profis tauschen das graue Büro gegen weiße Strände. Auf Bali oder in Lissabon entstehen riesige Communities. Das wichtigste Kriterium ist dabei nicht das Wetter, sondern eine stabile Glasfaserleitung und ergonomische Stühle direkt am Meer.", answer:"C" },
        { id:2, body: "Wer denkt, dass digitales Nomadentum nur Urlaub ist, irrt sich. Viele leiden unter der ständigen Erreichbarkeit. Ohne klare Grenzen zwischen Laptop und Freizeit riskieren selbst Reisende in der Karibik eine totale emotionale Erschöpfung.", answer:"B" },
        { id:3, body: "Dank neuer Satellitentechnologie ist es nun möglich, von den entlegensten Orten der Erde aus zu arbeiten. Ob mitten in der Sahara oder auf einem Segelboot im Pazifik – die Verbindung bleibt stabil genug für Video-Calls in 4K-Qualität.", answer:"F" },
        { id:4, body: "Viele Länder haben den Trend erkannt und bieten spezielle Aufenthaltsgenehmigungen an. Doch Vorsicht: Oft sind die bürokratischen Hürden hoch und man muss ein Mindesteinkommen nachweisen, um legal vom Laptop aus im Gastland zu operieren.", answer:"I" },
        { id:5, body: "KI-Tools übernehmen mittlerweile die komplette Planung von Workations. Sie finden nicht nur den günstigsten Flug, sondern buchen automatisch Unterkünfte mit verifiziertem High-Speed-WLAN und reservieren Plätze in lokalen Coworking-Spaces.", answer:"J" },
      ],
      correctAnswers: { 1:"C", 2:"B", 3:"F", 4:"I", 5:"J" }
    },
    lv2: {
      instruction: "Lesen Sie den Text über 'Deep Work' und beantworten Sie die Fragen.",
      text: `<h3 style="font-weight:700;margin-bottom:10px;font-size:15px;">Die Ära der Konzentration</h3>
<p style="margin-bottom:10px;">In einer Welt voller Benachrichtigungen wird die Fähigkeit zur tiefen Konzentration (Deep Work) zum wertvollsten Gut. Studien zeigen, dass 65 % der Wissensarbeiter ihre besten Ergebnisse erzielen, wenn sie das Smartphone für mindestens vier Stunden komplett ausschalten.</p>
<h3 style="font-weight:700;margin:10px 0 6px;font-size:14px;">Asynchrone Kommunikation</h3>
<p>Moderne Tech-Firmen verzichten immer mehr auf Meetings. Stattdessen nutzen sie schriftliche Dokumente. Das spart Zeit und ermöglicht es den Mitarbeitern, in ihrem eigenen Rhythmus zu arbeiten, egal in welcher Zeitzone sie sich befinden.</p>`,
      questions: [
        { num:1, text: "Was ist laut Text die wichtigste Kompetenz heutzutage?", options:["Ständige Erreichbarkeit", "Tiefe Konzentrationsfähigkeit", "Schnelles Tippen am Smartphone"], answer:1 },
        { num:2, text: "Wie erreichen 65 % der Arbeiter Top-Ergebnisse?", options:["Durch Multitasking", "Indem sie digitale Ablenkungen eliminieren", "Durch mehr Meetings"], answer:1 },
        { num:3, text: "Warum nutzen Tech-Firmen weniger Meetings?", options:["Um Kosten für Büros zu sparen", "Weil niemand mehr reden möchte", "Um zeitzonenunabhängiges Arbeiten zu fördern"], answer:2 },
        { num:4, text: "Asynchrone Kommunikation bedeutet:", options:["Dass alle gleichzeitig online sein müssen", "Dass man auf Nachrichten antwortet, wenn es passt", "Dass man nur noch telefoniert"], answer:1 },
        { num:5, text: "Schriftliche Dokumentation im Team...", options:["ist veraltet", "erhöht die Effizienz", "wird im Text nicht erwähnt"], answer:1 },
      ]
    },
    // ... باقي الأقسام (SB1, SB2, Writing) غيتم تعديلها بنفس الروح العصرية
  },
  schreiben: {
    title: "Bewerbung: Remote Work Policy",
    promptA: "Aufgabe A: Antrag auf Home-Office",
    promptB: "Aufgabe B: Beschwerde über Internetqualität",
    intro: "Ihr Unternehmen hat vor kurzem die Entscheidung getroffen, alle Mitarbeiter zurück ins Büro zu rufen. Sie möchten jedoch weiterhin als Digital Nomad arbeiten.",
    task: "Schreiben Sie eine überzeugende E-Mail an die Geschäftsleitung.",
    bullets: [
      "Begründen Sie, warum Ihre Produktivität auf Reisen höher ist.",
      "Schlagen Sie ein Modell für asynchrone Zusammenarbeit vor.",
      "Erklären Sie, wie Sie die Datensicherheit gewährleisten.",
      "Bitten Sie um ein persönliches Gespräch via Video-Call."
    ],
    recipient: "An die Geschäftsführung",
    subject: "Vorschlag für ein flexibles Remote-Work-Modell",
    minWords: 150, maxWords: 220
  }
}

]; // ← end of THEMES array

// =============================================================================
//  EXPORT (works in both browser <script> and Node.js module)
// =============================================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { THEMES };
}
