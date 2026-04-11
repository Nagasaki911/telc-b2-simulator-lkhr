// =============================================================================
//  content-config.js  —  Single Source of Truth for Vorbereitung content
//
//  FREEMIUM RULES:
//    isPremium: false  →  Free — accessible to everyone
//    isPremium: true   →  Locked — requires user.isPremium === true in Firestore
//
//  TO ADD A THEME: copy any object, give it a unique id, push to the array.
//  TO GRANT PREMIUM: Firebase Console → Firestore → users → [uid] → isPremium: true
// =============================================================================

const CONTENT_CONFIG = {

  // ─────────────────────────────────────────────────────────────────────────
  // PRÜFUNGEN  (full mock exams)
  //   parts[].isPremium controls each Teil individually
  // ─────────────────────────────────────────────────────────────────────────
  pruefungen: [

    // FREE 1 ─────────────────────────────────────────────────────────────
    {
      id: "p-sport", title: "Sport ist gesund", titleAr: "الرياضة مفيدة للصحة",
      level: "B2", duration: 90, isPremium: false, extras: 2, progress: null,
      parts: [
        { id:"lesen",     label:"Lesen",     icon:"💬", color:"blue",   subLabel:"Globalverstehen",    totalQ:30, isPremium:false },
        { id:"hoeren",    label:"Hören",     icon:"🎧", color:"amber",  subLabel:"Detailverstehen",    totalQ:20, isPremium:false },
        { id:"schreiben", label:"Schreiben", icon:"✍️", color:"purple", subLabel:"Schriftl. Ausdruck", totalQ:1,  isPremium:false },
        { id:"sb1",       label:"SB 1",      icon:"📝", color:"green",  subLabel:"Sprachbausteine 1",  totalQ:10, isPremium:false },
        { id:"sb2",       label:"SB 2",      icon:"📝", color:"green",  subLabel:"Sprachbausteine 2",  totalQ:10, isPremium:false },
      ]
    },

    // FREE 2 ─────────────────────────────────────────────────────────────
    {
      id: "p-insel", title: "Insel", titleAr: "الجزيرة",
      level: "B2", duration: 90, isPremium: false, extras: 2, progress: 75,
      parts: [
        { id:"lesen",     label:"Lesen",     icon:"💬", color:"blue",   subLabel:"Globalverstehen",    totalQ:30, isPremium:false },
        { id:"hoeren",    label:"Hören",     icon:"🎧", color:"amber",  subLabel:"Detailverstehen",    totalQ:20, isPremium:false },
        { id:"schreiben", label:"Schreiben", icon:"✍️", color:"purple", subLabel:"Schriftl. Ausdruck", totalQ:1,  isPremium:false },
        { id:"sb1",       label:"SB 1",      icon:"📝", color:"green",  subLabel:"Sprachbausteine 1",  totalQ:10, isPremium:false },
        { id:"sb2",       label:"SB 2",      icon:"📝", color:"green",  subLabel:"Sprachbausteine 2",  totalQ:10, isPremium:false },
      ]
    },

    // PREMIUM — copy this block to add more exams ─────────────────────────
    {
      id: "p-bilder", title: "Bilder", titleAr: "الصور",
      level: "B2", duration: 90, isPremium: true, extras: 0, progress: null,
      parts: [
        { id:"lesen",     label:"Lesen",     icon:"💬", color:"blue",   subLabel:"Globalverstehen",    totalQ:30, isPremium:true },
        { id:"hoeren",    label:"Hören",     icon:"🎧", color:"amber",  subLabel:"Detailverstehen",    totalQ:20, isPremium:true },
        { id:"schreiben", label:"Schreiben", icon:"✍️", color:"purple", subLabel:"Schriftl. Ausdruck", totalQ:1,  isPremium:true },
        { id:"sb1",       label:"SB 1",      icon:"📝", color:"green",  subLabel:"Sprachbausteine 1",  totalQ:10, isPremium:true },
        { id:"sb2",       label:"SB 2",      icon:"📝", color:"green",  subLabel:"Sprachbausteine 2",  totalQ:10, isPremium:true },
      ]
    },
    // → Add more exams here

  ],


  // ─────────────────────────────────────────────────────────────────────────
  // LESEN  (sub-tabs: teil1, teil2, teil3)
  // ─────────────────────────────────────────────────────────────────────────
  lesen: {

    // Teil 1 — Überschriften zuordnen ─────────────────────────────────────
    teil1: [
      { id:"lt1-freizeit", title:"Freizeit & Natur",      desc:"5 Texte, 10 Überschriften", isPremium:false, duration:25, totalQ:5 },
      { id:"lt1-arbeit",   title:"Arbeit & Karriere",      desc:"5 Texte, 10 Überschriften", isPremium:false, duration:25, totalQ:5 },
      { id:"lt1-umwelt",   title:"Umwelt & Gesellschaft",  desc:"5 Texte, 10 Überschriften", isPremium:true,  duration:25, totalQ:5 },
      // → Add more Teil 1 sets here
    ],

    // Teil 2 — Multiple Choice ────────────────────────────────────────────
    teil2: [
      { id:"lt2-freizeit", title:"Freizeitverhalten",          desc:"1 Text, 5 Multiple-Choice", isPremium:false, duration:25, totalQ:5 },
      { id:"lt2-arbeit",   title:"Homeoffice & Arbeitsmarkt",  desc:"1 Text, 5 Multiple-Choice", isPremium:false, duration:25, totalQ:5 },
      { id:"lt2-umwelt",   title:"Klimawandel & Recycling",    desc:"1 Text, 5 Multiple-Choice", isPremium:true,  duration:25, totalQ:5 },
      // → Add more Teil 2 sets here
    ],

    // Teil 3 — Situationen zuordnen ───────────────────────────────────────
    teil3: [
      { id:"lt3-freizeit", title:"Freizeitangebote",   desc:"10 Situationen, 12 Anzeigen", isPremium:false, duration:25, totalQ:10 },
      { id:"lt3-arbeit",   title:"Berufsangebote",     desc:"10 Situationen, 12 Anzeigen", isPremium:false, duration:25, totalQ:10 },
      { id:"lt3-service",  title:"Serviceleistungen",  desc:"10 Situationen, 12 Anzeigen", isPremium:true,  duration:25, totalQ:10 },
      // → Add more Teil 3 sets here
    ],

    // SB 1 — Sprachbausteine (Lückentext) ────────────────────────────────
    sb1: [
      { id:"sb1-freizeit",  title:"Sprachbausteine 1: Freizeit",   desc:"10 Lücken – Cloze-Text",     isPremium:false, duration:15, totalQ:10 },
      { id:"sb1-arbeit",    title:"Sprachbausteine 1: Arbeit",     desc:"10 Lücken – Cloze-Text",     isPremium:false, duration:15, totalQ:10 },
      { id:"sb1-umwelt",    title:"Sprachbausteine 1: Umwelt",     desc:"10 Lücken – Cloze-Text",     isPremium:true,  duration:15, totalQ:10 },
      { id:"sb1-gesundheit",title:"Sprachbausteine 1: Gesundheit", desc:"10 Lücken – Cloze-Text",     isPremium:true,  duration:15, totalQ:10 },
      // → Add more SB1 sets here
    ],

    // SB 2 — Sprachbausteine (Wortpool) ──────────────────────────────────
    sb2: [
      { id:"sb2-freizeit",  title:"Sprachbausteine 2: Freizeit",   desc:"10 Lücken – Wortpool",       isPremium:false, duration:15, totalQ:10 },
      { id:"sb2-arbeit",    title:"Sprachbausteine 2: Arbeit",     desc:"10 Lücken – Wortpool",       isPremium:false, duration:15, totalQ:10 },
      { id:"sb2-umwelt",    title:"Sprachbausteine 2: Umwelt",     desc:"10 Lücken – Wortpool",       isPremium:true,  duration:15, totalQ:10 },
      { id:"sb2-gesellschaft",title:"Sprachbausteine 2: Gesellschaft",desc:"10 Lücken – Wortpool",    isPremium:true,  duration:15, totalQ:10 },
      // → Add more SB2 sets here
    ],
  },


  // ─────────────────────────────────────────────────────────────────────────
  // HÖREN  (sub-tabs: teil1, teil2, teil3)
  // ─────────────────────────────────────────────────────────────────────────
  hoeren: {

    // Teil 1 — Nachrichten ────────────────────────────────────────────────
    teil1: [
      { id:"ht1-nachrichten", title:"Nachrichten & Alltag",   desc:"5 Aussagen – Richtig/Falsch", isPremium:false, duration:15, totalQ:5 },
      { id:"ht1-technik",     title:"Technik & Wissenschaft", desc:"5 Aussagen – Richtig/Falsch", isPremium:false, duration:15, totalQ:5 },
      { id:"ht1-kultur",      title:"Kultur & Gesellschaft",  desc:"5 Aussagen – Richtig/Falsch", isPremium:true,  duration:15, totalQ:5 },
      // → Add more Teil 1 sets here
    ],

    // Teil 2 — Interview ──────────────────────────────────────────────────
    teil2: [
      { id:"ht2-zugspitze",  title:"Interview: Zugspitze",   desc:"10 Aussagen – Richtig/Falsch", isPremium:false, duration:20, totalQ:10 },
      { id:"ht2-homeoffice", title:"Interview: Homeoffice",  desc:"10 Aussagen – Richtig/Falsch", isPremium:false, duration:20, totalQ:10 },
      { id:"ht2-ernaehrung", title:"Interview: Ernährung",   desc:"10 Aussagen – Richtig/Falsch", isPremium:true,  duration:20, totalQ:10 },
      // → Add more Teil 2 sets here
    ],

    // Teil 3 — Kurztexte ──────────────────────────────────────────────────
    teil3: [
      { id:"ht3-werbung",   title:"Kurztexte: Werbung",    desc:"5 Aussagen – Richtig/Falsch", isPremium:false, duration:10, totalQ:5 },
      { id:"ht3-ansagen",   title:"Kurztexte: Ansagen",    desc:"5 Aussagen – Richtig/Falsch", isPremium:false, duration:10, totalQ:5 },
      { id:"ht3-sendungen", title:"Kurztexte: Sendungen",  desc:"5 Aussagen – Richtig/Falsch", isPremium:true,  duration:10, totalQ:5 },
      // → Add more Teil 3 sets here
    ],
  },


  // ─────────────────────────────────────────────────────────────────────────
  // SCHREIBEN  (aim for 22 topics total)
  //   type: "beschwerde" | "anfrage" | "bericht"
  //   bullets: task points shown as chips in the editor
  // ─────────────────────────────────────────────────────────────────────────
  schreiben: [

    // FREE 1 ─────────────────────────────────────────────────────────────
    {
      id: "sw-laerm", title: "Beschwerde: Lärm in der Nachbarschaft",
      type: "beschwerde", isPremium: false,
      task: "Schreiben Sie einen formellen Brief an das Bauamt Ihrer Stadt.",
      bullets: [
        "Situation und Lärm beschreiben",
        "Informationen über Bauzeit anfragen",
        "Lärm am Wochenende stoppen",
        "Weitere Maßnahmen androhen"
      ]
    },

    // FREE 2 ─────────────────────────────────────────────────────────────
    {
      id: "sw-urlaub", title: "Beschwerde: Enttäuschender Urlaub",
      type: "beschwerde", isPremium: false,
      task: "Schreiben Sie einen Beschwerdebrief an das Reisebüro.",
      bullets: [
        "Diskrepanz zwischen Katalog und Realität",
        "Konkrete Mängel des Hotels nennen",
        "Teilweise Rückerstattung fordern",
        "Um schriftliche Stellungnahme bitten"
      ]
    },

    // PREMIUM — copy this block and fill in the details ───────────────────
    {
      id: "sw-laptop", title: "Beschwerde: Defektes Produkt",
      type: "beschwerde", isPremium: true,
      task: "Schreiben Sie eine Beschwerde an den Online-Händler.",
      bullets: []
    },

    // → Add topics 4–22 here. Suggested titles:
    //
    //   Beschwerde: Schlechter Restaurantservice         (beschwerde)
    //   Beschwerde: Mängel in der Wohnung                (beschwerde)
    //   Beschwerde: Fehlerhafte Rechnung                 (beschwerde)
    //   Beschwerde: Paket nicht angekommen               (beschwerde)
    //   Beschwerde: Fitnessstudio / Mitgliedschaft       (beschwerde)
    //   Beschwerde: Öffentlicher Nahverkehr              (beschwerde)
    //   Anfrage: Informationen zur Stellenanzeige        (anfrage)
    //   Anfrage: Sprachkurs im Ausland                   (anfrage)
    //   Anfrage: Praktikum im Ausland                    (anfrage)
    //   Anfrage: Vereinsmitgliedschaft                   (anfrage)
    //   Anfrage: Stornierung einer Reise                 (anfrage)
    //   Anfrage: Weiterbildungskurs                      (anfrage)
    //   Anfrage: Volunteer-Arbeit                        (anfrage)
    //   Anfrage: Kulturprogramm in einer deutschen Stadt (anfrage)
    //   Bericht: Erfahrungsbericht                       (bericht)
    //   Bericht: Veranstaltung beschreiben               (bericht)
    //   Bericht: Stadtfest                               (bericht)
    //   Bericht: Leserbeitrag für eine Zeitung           (bericht)
    //   Bericht: Schulprojekt vorstellen                 (bericht)

  ],

};

// Node.js compatibility — not used in the browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONTENT_CONFIG };
}
