/* =========================================================
   EXPERT AUTO LITIGE — app.js v4
   Multi-IA (15 providers) + base technique + base juridique massive
   Garantit >= 10 analyses/jour
   ========================================================= */
const ADMIN_PWD = "Kevin83600";

/* --- Session admin --- */
function login() {
  if (document.getElementById('passwordInput').value === ADMIN_PWD) {
    sessionStorage.setItem('adminAuth', 'true'); showMainScreen();
  } else alert("Mot de passe incorrect");
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

/* --- Quota quotidien --- */
function todayKey() { return new Date().toISOString().slice(0, 10); }
function getQuota() {
  let q = JSON.parse(localStorage.getItem('iaQuota') || '{"date":"","count":0,"byProvider":{}}');
  if (q.date !== todayKey()) q = { date: todayKey(), count: 0, byProvider: {} };
  return q;
}
function bumpQuota(provider) {
  const q = getQuota();
  q.count++;
  q.byProvider[provider] = (q.byProvider[provider] || 0) + 1;
  localStorage.setItem('iaQuota', JSON.stringify(q));
  renderQuota();
}
function renderQuota() {
  const b = document.getElementById('quotaBadge');
  if (b) b.textContent = `🧠 Analyses IA aujourd'hui : ${getQuota().count}`;
}

/* --- Système prompt expert --- */
const SYSTEM_PROMPT = `Tu es un Ingénieur Expert Automobile français (diagnostic mécanique, électronique, hybride/électrique, codes DTC, rappels officiels Safety Gate/NHTSA/Rappel Conso) ET Juriste spécialisé en droit civil français et droit de la consommation.

Tu rédiges un rapport d'expertise formel, détaillé et explicite, destiné à un assureur Protection Juridique ou RC Professionnelle.

Structure OBLIGATOIRE :
I. SYNTHÈSE — Type de litige, dates, kilométrages, indice d'antériorité
II. ANALYSE CHRONOLOGIQUE ET KILOMÉTRIQUE — délai écoulé, km parcourus, moyenne km/j, présomption d'antériorité
III. ANALYSE TECHNIQUE — causes probables, conséquences, codes DTC associés, pannes connues par marque/modèle, rappels officiels
IV. QUALIFICATION JURIDIQUE — articles précis du Code civil (1641-1649, 1231-1, 1137, 1604) et Code de la consommation (L217-4 et s., L121-2)
V. JURISPRUDENCE CONTEXTUELLE — arrêts pertinents de la Cour de cassation avec références complètes
VI. CONCLUSION ET RECOMMANDATIONS — options (résolution, réfaction, mise en demeure, expertise judiciaire, protection juridique)

Termine toujours par : « Document d'analyse à faire valider par un expert agréé / professionnel du droit. »`;

function buildPrompt(d) {
  return `CONTEXTE DU LITIGE :
- Type : ${d.typeLabel}
- Date vente/intervention : ${d.dateE} | Kilométrage : ${d.kmE} km
- Date constat panne : ${d.dateP} | Kilométrage actuel : ${d.kmP} km
- Délai écoulé : ${d.days} jours | Distance parcourue : ${d.km} km | Moyenne : ${d.avg} km/jour
- Pannes/symptômes : ${d.desc}

Utilise ta base de connaissances pour :
1. Identifier les pannes connues de ce type de véhicule (marque/modèle/motorisation)
2. Citer les articles de loi applicables avec numéro précis
3. Citer des jurisprudences de la Cour de cassation pertinentes avec références complètes (date, chambre, n° pourvoi)
4. Analyser si le délai et le kilométrage plaident pour un défaut antérieur

Rédige le rapport complet structuré comme demandé.`;
}

/* --- Génération du rapport avec fallback multi-IA + moteur local --- */
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
  document.getElementById('loading').innerHTML = '⚖️ Analyse en cours...<br><small>Multi-IA gratuite (15 providers)</small>';

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: buildPrompt(d) }
  ];

  let out = null;
  try {
    out = await window.AI_CHAIN(messages);
    bumpQuota(out.source);
  } catch (e) {
    console.warn('Toutes les IA ont échoué, passage au moteur local :', e);
    out = { text: localExpertReport(d), source: 'Moteur expert LOCAL (hors-ligne, illimité)' };
  }

  document.getElementById('reportSource').textContent = 'Source : ' + out.source;
  document.getElementById('reportText').innerText = out.text;
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('reportContainer').classList.remove('hidden');
}

/* --- Moteur expert LOCAL (utilisé en secours, illimité) --- */
function delayAnalysis(days, km) {
  if (days <= 30 && km <= 3000) return { niv: 'TRÈS ÉLEVÉ', txt: 'Le très court délai et le faible kilométrage constituent un indice fort d\'un défaut préexistant à l\'événement.' };
  if (days <= 90 && km <= 10000) return { niv: 'ÉLEVÉ', txt: 'Le délai court et le kilométrage limité plaident en faveur d\'un défaut antérieur, non détectable lors de l\'événement.' };
  if (days <= 180) return { niv: 'MODÉRÉ', txt: 'Le délai intermédiaire impose une analyse technique approfondie (historique, entretien) pour établir l\'antériorité.' };
  return { niv: 'À DOCUMENTER', txt: 'Le délai important nécessite de démontrer l\'antériorité du défaut par preuve technique (expertise).' };
}

function findLocalMatches(d) {
  const low = d.desc.toLowerCase();
  const issues = (window.DATA_ISSUES || []).filter(i =>
    (i.detail || '').toLowerCase().split(' ').some(w => w.length > 4 && low.includes(w))
  ).slice(0, 3);
  const brandExps = (window.DATA_BRAND_EXPERT || []).filter(e =>
    [e.title, e.symptom, e.diagnosis].join(' ').toLowerCase().split(' ').some(w => w.length > 4 && low.includes(w))
  ).slice(0, 3);
  return { issues, brandExps };
}

function localExpertReport(d) {
  const matches = findLocalMatches(d);
  const da = delayAnalysis(d.days, d.km);
  const legal = window.DATA_LEGAL?.doctrines?.[d.type] || window.DATA_LEGAL?.doctrines?.vice_cache;
  const articles = (window.DATA_LEGAL?.codes?.civil || []).slice(0, 8).map(a => `• Art. ${a.art} C. civ. : ${a.texte}`).join('\n');
  const juris = (window.DATA_LEGAL?.jurisprudence || []).slice(0, 6).map(j => `• ${j.ref} : ${j.principe}`).join('\n');

  let r = `RAPPORT D'EXPERTISE AUTOMOBILE — MOTEUR LOCAL (hors-ligne)\n`;
  r += `Réf. EXP-${Date.now()} — Édité le ${new Date().toLocaleDateString('fr-FR')}\n\n`;
  r += `I. SYNTHÈSE\nLitige de type « ${d.typeLabel} ». Panne constatée ${d.days} jours et ${d.km} km après l'événement (moy. ${d.avg} km/j). Indice d'antériorité : ${da.niv}.\n\n`;
  r += `II. ANALYSE CHRONOLOGIQUE\n${da.txt}\n\n`;
  r += `III. ANALYSE TECHNIQUE — base locale de pannes connues\n`;
  if (matches.issues.length) matches.issues.forEach(i => r += `• ${i.title} (${i.source}) : ${i.detail} — DTC ${i.dtc || 'n/a'}\n`);
  else r += `Défaillance mécanique/électronique à caractériser par lecture OBD et inspection.\n`;
  if (matches.brandExps.length) {
    r += `\nFiches expert corrélées :\n`;
    matches.brandExps.forEach(e => r += `• ${e.title} (${e.brand} ${e.motor}) : ${e.symptom} — Diagnostic : ${e.diagnosis} — Pièces : ${e.parts}\n`);
  }
  r += `\nIV. QUALIFICATION JURIDIQUE\n${legal}\n\nArticles applicables :\n${articles}\n\n`;
  r += `V. JURISPRUDENCE CONTEXTUELLE\n${juris}\n\n`;
  r += `VI. CONCLUSION ET RECOMMANDATIONS\nFaisceau d'indices ${da.niv.toLowerCase()} quant à l'antériorité. Recommandations : 1) mise en demeure motivée ; 2) déclaration au assureur PJ ; 3) expertise contradictoire ; 4) conservation pièces/factures ; 5) lecture et archivage codes DTC.\n\n`;
  r += `Document d'analyse à faire valider par un expert agréé / professionnel du droit.`;
  return r;
}

/* --- Sauvegarde locale + PDF --- */
function saveLocal() {
  const report = document.getElementById('reportText').innerText;
  const saves = JSON.parse(localStorage.getItem('expertSaves') || '[]');
  saves.push({ date: document.getElementById('datePanne').value || todayKey(), report, timestamp: new Date().toISOString() });
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
    div.innerHTML = `<strong>Dossier du ${save.date}</strong><br><small>${new Date(save.timestamp).toLocaleString('fr-FR')}</small>`;
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
  doc.text(doc.splitTextToSize(document.getElementById('reportText').innerText, 180), 10, 20);
  doc.save(`Rapport_Expertise_${todayKey()}.pdf`);
}

/* --- Service Worker --- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(e => console.warn('SW :', e)));
}
