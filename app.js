/* =========================================================
   EXPERT AUTO LITIGE — app.js v3
   IA gratuite sans clé : Puter.js -> Pollinations gen -> Moteur local
   Garantit >= 5 analyses/jour + mode hors-ligne illimité
   ========================================================= */
const ADMIN_PWD = "Kevin83600";

/* ---------- Session admin ---------- */
function login() {
  const pwd = document.getElementById('passwordInput').value;
  if (pwd === ADMIN_PWD) { sessionStorage.setItem('adminAuth', 'true'); showMainScreen(); }
  else alert("Mot de passe incorrect");
}
function logout() {
  sessionStorage.removeItem('adminAuth');
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('mainScreen').classList.add('hidden');
}
function showMainScreen() {
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('mainScreen').classList.remove('hidden');
  renderQuota(); loadSavedReports();
}
if (sessionStorage.getItem('adminAuth') === 'true') showMainScreen();

/* ---------- Compteur quotidien d'analyses IA ---------- */
function todayKey() { return new Date().toISOString().slice(0, 10); }
function getQuota() {
  let q = JSON.parse(localStorage.getItem('iaQuota') || '{"date":"","count":0}');
  if (q.date !== todayKey()) { q = { date: todayKey(), count: 0 }; }
  return q;
}
function bumpQuota() { const q = getQuota(); q.count++; localStorage.setItem('iaQuota', JSON.stringify(q)); renderQuota(); return q.count; }
function renderQuota() {
  const b = document.getElementById('quotaBadge');
  if (b) b.textContent = '🧠 Analyses IA aujourd\u2019hui : ' + getQuota().count;
}

/* ---------- Prompt système expert ---------- */
const SYSTEM_PROMPT =
  "Tu es un Ingénieur Expert Automobile (diagnostic, mécanique, électronique, hybride/électrique) ET Juriste spécialisé en droit civil et droit de la consommation français. " +
  "Tu rédiges un rapport d'expertise formel, détaillé et explicite, destiné à un assureur Protection Juridique ou RC Professionnelle. " +
  "Structure obligatoire : I. Synthèse ; II. Analyse chronologique et kilométrique ; III. Analyse technique (causes probables, conséquences, codes DTC éventuels) ; " +
  "IV. Qualification juridique (garantie des vices cachés art. 1641 à 1649 Code civil, garantie légale de conformité art. L217-4 et s. Code conso, obligation de délivrance art. 1604 Code civil, obligation de résultat art. 1231-1 Code civil, malfaçons, dol art. 1137 Code civil) ; " +
  "V. Jurisprudence contextuelle (principes et arrêts pertinents de la Cour de cassation, avec références à vérifier) ; VI. Conclusion et recommandations (options : résolution, réfaction, mise en demeure, expertise judiciaire). " +
  "Ton : professionnel, précis, argumenté. Termine par : « Document d'analyse à faire valider par un expert agréé / professionnel du droit. »";

function buildPrompt(d) {
  return "CONTEXTE DU LITIGE :\n" +
    "- Type de litige : " + d.typeLabel + "\n" +
    "- Date de vente/intervention : " + d.dateE + " | Kilométrage : " + d.kmE + " km\n" +
    "- Date du constat de panne : " + d.dateP + " | Kilométrage actuel : " + d.kmP + " km\n" +
    "- Délai écoulé : " + d.days + " jours | Distance parcourue depuis l'événement : " + d.km + " km | Moyenne : " + d.avg + " km/jour\n" +
    "- Pannes et symptômes constatés : " + d.desc + "\n\n" +
    "Rédige le rapport d'expertise complet selon la structure demandée, en analysant si le délai et le kilométrage plaident pour un défaut antérieur à la vente/intervention.";
}

/* ---------- Utilitaire timeout ---------- */
function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
}

/* ---------- IA n°1 : Puter.js (gratuit, sans clé) ---------- */
const PUTER_MODELS = ['gpt-4o-mini', 'gemini-2.0-flash', 'deepseek-v3', 'llama-3.3-70b-instruct'];
async function aiPuter(prompt) {
  if (!window.puter || !puter.ai) throw new Error('Puter indisponible');
  let lastErr;
  for (const model of PUTER_MODELS) {
    try {
      const r = await withTimeout(puter.ai.chat(
        [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: prompt }],
        { model: model }
      ), 60000);
      const txt = typeof r === 'string' ? r : (r && r.message && r.message.content) || (r && r.text) || '';
      if (txt && txt.length > 200) return { text: txt, source: 'IA Puter.js — modèle ' + model + ' (gratuit, sans clé)' };
    } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error('Puter KO');
}

/* ---------- IA n°2 : Pollinations gen gateway (anonyme, sans clé) ---------- */
const POLL_URLS = ['https://gen.pollinations.ai/v1/chat/completions', 'https://text.pollinations.ai/openai/chat/completions'];
const POLL_MODELS = ['openai', 'mistral'];
async function aiPollinations(prompt) {
  for (const url of POLL_URLS) {
    for (const model of POLL_MODELS) {
      try {
        const res = await withTimeout(fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: model,
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: prompt }],
            temperature: 0.7
          })
        }), 60000);
        if (!res.ok) continue;
        const d = await res.json();
        const txt = d && d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content;
        if (txt && txt.length > 200) return { text: txt, source: 'IA Pollinations gen gateway (gratuit, sans clé)' };
      } catch (e) { /* endpoint suivant */ }
    }
  }
  throw new Error('Pollinations KO');
}

/* ---------- IA n°3 : Moteur expert LOCAL (hors-ligne, illimité) ---------- */
const TECH_MAP = [
  { kw: ['adblue'], cause: 'Système de dépollution AdBlue : pompe, injecteur ou cristallisation d\u2019urée (défaut récurrent diesel récents)', cons: 'Countdown anti-démarrage, immobilisation du véhicule, perte d\u2019usage', dtc: 'P20EE / P204F' },
  { kw: ['fap', 'filtre a particules', 'régénération', 'regeneration'], cause: 'Colmatage du filtre à particules (usage urbain / défaut de régénération)', cons: 'Perte de puissance, surconsommation, risque casse moteur', dtc: 'P2002 / P2463' },
  { kw: ['egr'], cause: 'Vanne EGR encrassée ou bloquée', cons: 'Ralenti instable, perte puissance, voyant moteur', dtc: 'P0401 / P0490' },
  { kw: ['courroie', 'humide'], cause: 'Courroie de distribution humide (défaut connu motorisations PureTech/essence)', cons: 'Débris dans l\u2019huile, pompe à huile colmatée, risque rupture courroie et destruction moteur', dtc: 'P0087 / P0340' },
  { kw: ['chaîne', 'chaine', 'distribution'], cause: 'Usure prématurée chaîne de distribution / tendeur', cons: 'Décalage de calage, risque casse moteur', dtc: 'P0016 / P0335' },
  { kw: ['turbo'], cause: 'Turbo-compresseur : géométrie variable grippée ou fuite', cons: 'Perte puissance, sifflement, fumées', dtc: 'P0299 / P0234' },
  { kw: ['raté', 'rate', 'bougies', 'bobines', 'allumage'], cause: 'Défaut d\u2019allumage (bougies/bobines) ou injection', cons: 'Ratés moteur, à-cous, catalyseur endommagé', dtc: 'P0300 à P0304' },
  { kw: ['injecteur'], cause: 'Injecteurs encrassés / défaillants', cons: 'Claquement, fumées, surconsommation, ratés', dtc: 'P0201 à P0204' },
  { kw: ['catalyseur', 'gpf'], cause: 'Catalyseur / GPF dégradé', cons: 'Contre-pression, odeurs, perte puissance', dtc: 'P0420 / P2463' },
  { kw: ['batterie hv', 'batterie haute tension', 'autonomie', 'bms'], cause: 'Dégradation modules batterie HV / déséquilibre cellules / BMS', cons: 'Perte d\u2019autonomie, limitation puissance, immobilisation', dtc: 'P0AA6 / U0111' },
  { kw: ['icc u', 'iccu', '12v', 'dc-dc'], cause: 'Convertisseur DC-DC / ICCU défaillant (véhicules électrifiés)', cons: 'Non-charge batterie 12V, non-démarrage', dtc: 'U0111 / P0562' },
  { kw: ['charge', 'obc', 'borne'], cause: 'Chargeur embarqué (OBC) ou circuit de charge défaillant', cons: 'Charge lente/absente, indisponibilité du véhicule', dtc: 'P0D11' },
  { kw: ['boîte', 'boite', 'dsg', 'embrayage', 'mécatronique', 'mecatronique', 'vitesses'], cause: 'Boîte de vitesses / mécatronique / embrayage défaillant', cons: 'Broutages, vitesses non engagées, immobilisation', dtc: 'P0700' },
  { kw: ['surchauffe', 'ldr', 'lcr', 'fuite', 'joint de culasse'], cause: 'Circuit de refroidissement / joint de culasse', cons: 'Surchauffe, risque casse moteur', dtc: 'P0217' },
  { kw: ['écran', 'ecran', 'multimédia', 'multimedia', 'reboot', 'gps'], cause: 'Système multimédia / calculateur habitacle défaillant', cons: 'Perte de fonctions, écrans noirs, reboots', dtc: 'U0101' }
];
const LEGAL_MAP = {
  vente_particulier:
    "Vente entre particuliers : la garantie légale de conformité (Code conso) ne s'applique pas. Fondements mobilisables :\n" +
    "- Garantie des vices cachés : art. 1641 à 1649 Code civil (défaut caché, antérieur à la vente, rendant le bien impropre à sa destination) ; action rédhibitoire ou estimatoire (art. 1644) ; bref délai de l'art. 1648 (2 ans de la découverte).\n" +
    "- Dol / réticence dolosive : art. 1137 Code civil si dissimulation volontaire (km trafiqué, panne tue).\n" +
    "- Obligation de délivrance conforme : art. 1603-1604 Code civil.\n" +
    "La jurisprudence constante (Cour de cassation, 3e ch. civ.) exige la preuve de l'antériorité du défaut : un délai court et un faible kilométrage entre vente et panne constituent un faisceau d'indices fort.",
  vente_pro_part:
    "Vendeur professionnel / acheteur particulier : cumul de garanties :\n" +
    "- Garantie légale de conformité : art. L217-4, L217-5, L217-9 Code conso ; présomption d'antériorité du défaut (art. L217-7) : 24 mois véhicule neuf, 12 mois véhicule d'occasion — le vendeur pro doit prouver que le défaut n'existait pas à la vente.\n" +
    "- Garantie des vices cachés : art. 1641 s. Code civil ; le vendeur professionnel est réputé connaître les vices (art. 1643) : jurisprudence constante « présomption de mauvaise foi » du vendeur professionnel.\n" +
    "- Obligation de délivrance et de conseil ; pratique commerciale trompeuse : art. L121-2 s. Code conso le cas échéant.",
  vente_pro_pro:
    "Vente entre professionnels : la garantie légale de conformité (protectrice du consommateur) est écartée. Fondements :\n" +
    "- Vices cachés : art. 1641 s. Code civil, sauf clause d'exclusion valable entre professionnels (inopérante en cas de dol ou de mauvaise foi caractérisée, art. 1643).\n" +
    "- Bref délai de l'art. 1648 et bonne foi contractuelle (art. 1104 Code civil).\n" +
    "- L'acheteur professionnel est présumé compétent pour détecter les vices apparents : seul un défaut réellement caché et antérieur engage le vendeur.",
  intervention:
    "Litige après intervention d'un professionnel de l'automobile :\n" +
    "- Obligation de résultat du réparateur pour les travaux confiés : jurisprudence constante (Cour de cassation, 1re ch. civ.) — le garagiste doit restituer un véhicule exempt du défaut traité ; art. 1231-1 Code civil (responsabilité contractuelle).\n" +
    "- Malfaçon / non-façon : travaux mal exécutés ou non exécutés = manquement à l'obligation de résultat ; reprise gratuite ou remboursement.\n" +
    "- Obligation d'information et de conseil (devis, nécessité des pièces) ; garantie des pièces et de la main-d'œuvre.\n" +
    "- Une panne survenant peu de temps et peu de kilomètres après l'intervention crée une présomption factuelle de lien de causalité."
};
function delayAnalysis(days, km) {
  let niv, txt;
  if (days <= 30 && km <= 3000) { niv = 'TRÈS ÉLEVÉ'; txt = 'Le très court délai et le faible kilométrage parcouru constituent un indice fort d\u2019un défaut préexistant à l\u2019événement (vente ou intervention).'; }
  else if (days <= 90 && km <= 10000) { niv = 'ÉLEVÉ'; txt = 'Le délai court et le kilométrage limité plaident en faveur d\u2019un défaut antérieur, non détectable lors de l\u2019événement.'; }
  else if (days <= 180) { niv = 'MODÉRÉ'; txt = 'Le délai intermédiaire impose une analyse technique approfondie (historique, entretien) pour établir l\u2019antériorité.'; }
  else { niv = 'À DOCUMENTER'; txt = 'Le délai important nécessite de démontrer l\u2019antériorité du défaut par preuve technique (historique constructeur, expertise).'; }
  return { niv: niv, txt: txt };
}
function localExpertReport(d) {
  const low = d.desc.toLowerCase();
  const hits = TECH_MAP.filter(t => t.kw.some(k => low.includes(k)));
  const tech = hits.length ? hits : [{ cause: 'Défaillance mécanique/électronique à caractériser par lecture des codes défaut et inspection physique', cons: 'Perte d\u2019usage du véhicule, risque d\u2019aggravation', dtc: 'Lecture OBD recommandée' }];
  const da = delayAnalysis(d.days, d.km);
  let r = '';
  r += 'RAPPORT D\u2019EXPERTISE AUTOMOBILE — MOTEUR EXPERT LOCAL (HORS-LIGNE)\n';
  r += 'Réf. : EXP-' + Date.now() + ' — Édité le ' + new Date().toLocaleDateString('fr-FR') + '\n\n';
  r += 'I. SYNTHÈSE\nLitige de type « ' + d.typeLabel + ' ». Panne constatée ' + d.days + ' jours et ' + d.km + ' km après l\u2019événement (moyenne ' + d.avg + ' km/j). Indice d\u2019antériorité du défaut : ' + da.niv + '.\n\n';
  r += 'II. ANALYSE CHRONOLOGIQUE ET KILOMÉTRIQUE\n' + da.txt + ' Un kilométrage parcouru faible (' + d.km + ' km) écarte l\u2019hypothèse d\u2019une usure normale liée à l\u2019usage post-événement.\n\n';
  r += 'III. ANALYSE TECHNIQUE — CAUSES ET CONSÉQUENCES\n';
  tech.forEach((t, i) => {
    r += (i + 1) + ') Cause probable : ' + t.cause + '\n   Conséquences : ' + t.cons + '\n   Codes DTC associés : ' + t.dtc + '\n';
  });
  r += '\nSymptômes déclarés : ' + d.desc + '\n\n';
  r += 'IV. QUALIFICATION JURIDIQUE\n' + LEGAL_MAP[d.type] + '\n\n';
  r += 'V. JURISPRUDENCE CONTEXTUELLE\nPrincipes constants de la Cour de cassation : (a) le vice caché doit être antérieur à la vente et rendre le bien impropre à sa destination (3e ch. civ.) ; (b) le vendeur professionnel est présumé connaître les vices (art. 1643) ; (c) le réparateur est tenu d\u2019une obligation de résultat (1re ch. civ.) ; (d) la présomption d\u2019antériorité de la garantie de conformité dispense l\u2019acheteur consommateur de la preuve du défaut préexistant.\n\n';
  r += 'VI. CONCLUSION ET RECOMMANDATIONS\nAu regard du délai (' + d.days + ' j), du kilométrage (' + d.km + ' km) et de la nature technique de la panne, le faisceau d\u2019indices est ' + da.niv.toLowerCase() + ' quant à l\u2019antériorité du défaut. Recommandations : 1) mise en demeure motivée ; 2) déclaration au assureur Protection Juridique ; 3) expertise contradictoire ou judiciaire ; 4) conservation des pièces et factures ; 5) lecture et archivage des codes DTC.\n\n';
  r += 'Document d\u2019analyse à faire valider par un expert agréé / professionnel du droit.';
  return r;
}

/* ---------- Génération du rapport ---------- */
async function generateReport() {
  const type = document.getElementById('typeLitige').value;
  const typeLabel = document.getElementById('typeLitige').selectedOptions[0].text;
  const dateE = document.getElementById('dateEvent').value;
  const kmE = parseInt(document.getElementById('kmEvent').value, 10) || 0;
  const dateP = document.getElementById('datePanne').value;
  const kmP = parseInt(document.getElementById('kmPanne').value, 10) || 0;
  const desc = document.getElementById('descPanne').value.trim();
  if (!dateE || !dateP || !desc) { alert('Complétez le formulaire'); return; }

  const days = Math.max(0, Math.floor((new Date(dateP) - new Date(dateE)) / 86400000));
  const km = Math.max(0, kmP - kmE);
  const avg = days > 0 ? (km / days).toFixed(1) : km;
  const d = { type, typeLabel, dateE, kmE, dateP, kmP, desc, days, km, avg };

  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('reportContainer').classList.add('hidden');

  let out = null;
  try { out = await aiPuter(buildPrompt(d)); }
  catch (e1) {
    try { out = await aiPollinations(buildPrompt(d)); }
    catch (e2) {
      out = { text: localExpertReport(d), source: 'Moteur expert LOCAL (hors-ligne, illimité)' };
    }
  }
  if (out.source.indexOf('LOCAL') === -1) bumpQuota();

  document.getElementById('reportSource').textContent = 'Source : ' + out.source;
  document.getElementById('reportText').innerText = out.text;
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('reportContainer').classList.remove('hidden');
  window._lastReport = out.text;
}

/* ---------- Sauvegarde locale & PDF ---------- */
function saveLocal() {
  const report = document.getElementById('reportText').innerText;
  const saves = JSON.parse(localStorage.getItem('expertSaves') || '[]');
  saves.push({ date: document.getElementById('datePanne').value || todayKey(), report: report, timestamp: new Date().toISOString() });
  localStorage.setItem('expertSaves', JSON.stringify(saves));
  loadSavedReports();
  alert('Rapport sauvegardé hors-ligne !');
}
function loadSavedReports() {
  const saves = JSON.parse(localStorage.getItem('expertSaves') || '[]');
  const list = document.getElementById('savedList');
  list.innerHTML = '';
  if (!saves.length) { list.innerHTML = '<p style="color:#4a5065">Aucune sauvegarde locale.</p>'; return; }
  saves.slice().reverse().forEach(save => {
    const div = document.createElement('div');
    div.innerHTML = '<strong>Dossier du ' + save.date + '</strong><br><small>' + new Date(save.timestamp).toLocaleString('fr-FR') + '</small>';
    div.onclick = () => {
      document.getElementById('reportText').innerText = save.report;
      document.getElementById('reportSource').textContent = 'Source : sauvegarde locale';
      document.getElementById('reportContainer').classList.remove('hidden');
      window.scrollTo(0, document.body.scrollHeight);
    };
    list.appendChild(div);
  });
}
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(11); doc.setFont('helvetica', 'bold');
  doc.text("RAPPORT D'EXPERTISE AUTOMOBILE ET JURIDIQUE", 10, 12);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
  const pages = doc.splitTextToSize(document.getElementById('reportText').innerText, 180);
  doc.text(pages, 10, 20);
  doc.save('Rapport_Expertise_Auto_' + todayKey() + '.pdf');
}

/* ---------- Service Worker ---------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(e => console.warn('SW :', e)));
}
