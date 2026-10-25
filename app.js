const ADMIN_PWD = "Kevin83600";

function login() {
    const pwd = document.getElementById('passwordInput').value;
    if (pwd === ADMIN_PWD) {
        sessionStorage.setItem('adminAuth', 'true');
        showMainScreen();
    } else {
        alert("Mot de passe incorrect");
    }
}

function logout() {
    sessionStorage.removeItem('adminAuth');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('mainScreen').classList.add('hidden');
}

function showMainScreen() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainScreen').classList.remove('hidden');
    loadSavedReports();
}

if (sessionStorage.getItem('adminAuth') === 'true') showMainScreen();

async function generateReport() {
    const type = document.getElementById('typeLitige').value;
    const dateE = document.getElementById('dateEvent').value;
    const kmE = parseInt(document.getElementById('kmEvent').value);
    const dateP = document.getElementById('datePanne').value;
    const kmP = parseInt(document.getElementById('kmPanne').value);
    const desc = document.getElementById('descPanne').value;

    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('reportContainer').classList.add('hidden');

    const daysDiff = Math.floor((new Date(dateP) - new Date(dateE)) / (1000 * 60 * 60 * 24));
    const kmDiff = kmP - kmE;

    // Prompt Expert ultra-détaillé pour l'IA
    const prompt = `
        Tu es un Ingénieur Expert Automobile et Juriste français. Rédige un rapport d'expertise détaillé, explicite et formel pour un assureur (Protection Juridique / RC Pro).
        
        DONNÉES DU LITIGE :
        - Type: ${type}
        - Date événement: ${dateE} | Km: ${kmE}
        - Date panne: ${dateP} | Km actuel: ${kmP}
        - Délai écoulé: ${daysDiff} jours | Distance parcourue: ${kmDiff} km
        - Symptômes: ${desc}
        
        STRUCTURE DU RAPPORT :
        1. Analyse Technique : Causes probables de la panne, usure anormale vs kilométrage/délai.
        2. Analyse Juridique : Cite les lois applicables (Vices cachés art 1641-1649 Code Civil, Garantie légale de conformité L217-4 Code Conso, Obligation de délivrance, Obligation de résultat, malfaçons, dol).
        3. Jurisprudence : Appuie-toi sur des principes de jurisprudence contextuelle (Cour de Cassation, antériorité du défaut, présomption de vice caché).
        4. Conclusion : Conséquences pour le vendeur/garagiste et recommandations pour l'assureur.
        Format le tout avec des titres clairs. Sois très précis et professionnel.
    `;

    try {
        // Appel à l'API Gratuite sans clé (Pollinations OpenAI Proxy)
        const response = await fetch('https://text.pollinations.ai/openai/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: "system", content: "Tu es un expert automobile et juriste en droit français." },
                    { role: "user", content: prompt }
                ],
                model: "openai",
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        const report = data.choices[0].message.content;
        
        document.getElementById('reportText').innerText = report;
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('reportContainer').classList.remove('hidden');
        
    } catch (error) {
        alert("Erreur IA. Vérifiez votre connexion 4G/WiFi.");
        document.getElementById('loading').classList.add('hidden');
    }
}

function saveLocal() {
    const report = document.getElementById('reportText').innerText;
    const dateP = document.getElementById('datePanne').value;
    const saves = JSON.parse(localStorage.getItem('expertSaves') || '[]');
    saves.push({ date: dateP, report: report, timestamp: new Date().toISOString() });
    localStorage.setItem('expertSaves', JSON.stringify(saves));
    loadSavedReports();
    alert("Rapport sauvegardé hors ligne !");
}

function loadSavedReports() {
    const saves = JSON.parse(localStorage.getItem('expertSaves') || '[]');
    const list = document.getElementById('savedList');
    list.innerHTML = '';
    if(saves.length === 0) { list.innerHTML = "<p>Aucune sauvegarde locale.</p>"; return; }
    saves.reverse().forEach((save) => {
        const div = document.createElement('div');
        div.style.cssText = "background: rgba(255,255,255,0.1); padding: 15px; margin: 10px 0; border-radius: 8px; border: 1px solid #555;";
        div.innerHTML = `<strong>Dossier du ${save.date}</strong><br><small>${new Date(save.timestamp).toLocaleString()}</small>`;
        div.onclick = () => {
            document.getElementById('reportText').innerText = save.report;
            document.getElementById('reportContainer').classList.remove('hidden');
            window.scrollTo(0, document.body.scrollHeight);
        };
        list.appendChild(div);
    });
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const text = document.getElementById('reportText').innerText;
    doc.setFontSize(10);
    doc.text("RAPPORT D'EXPERTISE AUTOMOBILE ET JURIDIQUE", 10, 10);
    const splitText = doc.splitTextToSize(text, 180);
    doc.text(splitText, 10, 20);
    doc.save("Rapport_Expertise_Auto.pdf");
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js');
    });
}
