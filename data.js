/* =========================================================
   BASE LOCALE EXPERT AUTO — data.js
   Pannes connues (extraites de auto-diagnostic) + Jurisprudence massive
   ========================================================= */

/* === PANNES CONNUES PAR MARQUE/MODÈLE (KEY_ISSUES) === */
window.DATA_ISSUES = [
  { brand:'dacia', model:'Bigster', title:'Ressorts suspension AR : rupture', detail:'Rupture ressorts AR, diamètre fil insuffisant. Campagne rappel : remplacement 2 ressorts AR.', source:'Rappel Conso / Safety Gate', dtc:'', fuel:'any' },
  { brand:'dacia', model:'Bigster', title:'Ressorts AR : alerte UE', detail:'Alerte Safety Gate : rupture ressorts AR, vérification obligatoire.', source:'Safety Gate', dtc:'', fuel:'any' },
  { brand:'peugeot', model:'208 II', title:'Courroie humide PureTech', detail:'Débris dans huile, pompe à huile colmatée, risque rupture courroie.', source:'Rappel Conso', dtc:'P0087,P0340', fuel:'essence' },
  { brand:'peugeot', model:'2008', title:'Courroie humide PureTech', detail:'Idem 208 II.', source:'Rappel Conso', dtc:'P0087,P0340', fuel:'essence' },
  { brand:'peugeot', model:'308 II', title:'Courroie humide PureTech', detail:'Idem 208 II.', source:'Rappel Conso', dtc:'P0087,P0340', fuel:'essence' },
  { brand:'peugeot', model:'3008 II', title:'AdBlue BlueHDi', detail:'Countdown AdBlue, pompe/injecteur défaillants.', source:'Campagne constructeur', dtc:'P20EE,P204F', fuel:'diesel' },
  { brand:'peugeot', model:'3008 III', title:'AdBlue BlueHDi', detail:'Idem 3008 II.', source:'Campagne constructeur', dtc:'P20EE,P204F', fuel:'diesel' },
  { brand:'citroen', model:'C3 IV', title:'Courroie humide PureTech', detail:'Idem Peugeot.', source:'Rappel Conso', dtc:'P0087,P0340', fuel:'essence' },
  { brand:'citroen', model:'C4 III', title:'AdBlue BlueHDi', detail:'Idem Peugeot.', source:'Campagne constructeur', dtc:'P20EE,P204F', fuel:'diesel' },
  { brand:'renault', model:'Clio V', title:'EGR dCi', detail:'Encrassement vanne EGR, perte puissance, régénérations fréquentes.', source:'TSB', dtc:'P0401,P2002', fuel:'diesel' },
  { brand:'renault', model:'Clio VI', title:'EGR dCi', detail:'Idem Clio V.', source:'TSB', dtc:'P0401,P2002', fuel:'diesel' },
  { brand:'renault', model:'Captur II', title:'GPF TCe', detail:'Filtre à particules essence colmaté, perte puissance courts trajets.', source:'TSB', dtc:'P2463', fuel:'essence' },
  { brand:'renault', model:'Megane IV', title:'EGR dCi', detail:'Idem Clio V.', source:'TSB', dtc:'P0401,P2002', fuel:'diesel' },
  { brand:'volkswagen', model:'Golf 8', title:'Chaîne distribution TSI', detail:'Claquement à froid, tendeur défaillant.', source:'TSB', dtc:'P0016', fuel:'essence' },
  { brand:'volkswagen', model:'Tiguan', title:'AdBlue TDI', detail:'Capteurs NOx, injecteur AdBlue défaillants.', source:'Campagne constructeur', dtc:'P20EE,P2201', fuel:'diesel' },
  { brand:'volkswagen', model:'T-Roc', title:'Mécatronique DSG DQ200', detail:'Broutage, vitesses non engagées.', source:'TSB', dtc:'P0700', fuel:'any' },
  { brand:'audi', model:'A3', title:'Chaîne distribution TSI', detail:'Idem Golf 8.', source:'TSB', dtc:'P0016', fuel:'essence' },
  { brand:'audi', model:'A4', title:'Caméra ADAS', detail:'Calibration après remplacement pare-brise.', source:'Campagne constructeur', dtc:'U0121', fuel:'any' },
  { brand:'bmw', model:'Serie 3 G20', title:'Chaîne B47', detail:'Claquement à froid, tendeur défaillant.', source:'NHTSA/TSB', dtc:'P0016,P0335', fuel:'diesel' },
  { brand:'bmw', model:'X1', title:'Pompe HP N20', detail:'Pression rail insuffisante.', source:'TSB', dtc:'P0087', fuel:'essence' },
  { brand:'mercedes', model:'Classe C W206', title:'AdBlue OM654', detail:'Capteurs NOx + injecteur AdBlue.', source:'Campagne constructeur', dtc:'P2201,P20EE', fuel:'diesel' },
  { brand:'mercedes', model:'GLC', title:'Chaîne OM651', detail:'Usure patins chaîne.', source:'TSB', dtc:'P0016', fuel:'diesel' },
  { brand:'toyota', model:'Yaris', title:'Pompe onduleur hybride', detail:'Non-démarrage, défaut système hybride.', source:'TSB', dtc:'P0A93', fuel:'hybride' },
  { brand:'toyota', model:'Corolla', title:'Pompe onduleur hybride', detail:'Idem Yaris.', source:'TSB', dtc:'P0A93', fuel:'hybride' },
  { brand:'toyota', model:'C-HR', title:'Pompe onduleur hybride', detail:'Idem Yaris.', source:'TSB', dtc:'P0A93', fuel:'hybride' },
  { brand:'hyundai', model:'Tucson', title:'Serrage moteur Theta II', detail:'Claquement, limailles, coussinets bielles.', source:'NHTSA', dtc:'', fuel:'essence' },
  { brand:'hyundai', model:'Kona EV', title:'Incendie batterie', detail:'Risque incendie modules HV.', source:'Safety Gate/NHTSA', dtc:'P0AA6', fuel:'electrique' },
  { brand:'hyundai', model:'Ioniq 5', title:'ICCU', detail:'Non-charge 12V, DC-DC défaillant.', source:'NHTSA', dtc:'U0111', fuel:'electrique' },
  { brand:'kia', model:'Sportage', title:'Serrage Theta II', detail:'Idem Hyundai Tucson.', source:'NHTSA', dtc:'', fuel:'essence' },
  { brand:'kia', model:'EV6', title:'ICCU', detail:'Idem Ioniq 5.', source:'Campagne constructeur', dtc:'U0111', fuel:'electrique' },
  { brand:'tesla', model:'Model 3', title:'eMMC MCU', detail:'Écran noir, reboots, lenteur.', source:'NHTSA', dtc:'U0101', fuel:'electrique' },
  { brand:'tesla', model:'Model Y', title:'Freinage fantôme ACC', detail:'Freinage brusque inopiné.', source:'NHTSA', dtc:'', fuel:'electrique' },
  { brand:'tesla', model:'Model 3', title:'Contacteurs batterie HV', detail:'Défaut isolement.', source:'NHTSA', dtc:'P0AA6', fuel:'electrique' },
  { brand:'ford', model:'Focus', title:'Courroie humide EcoBoost', detail:'Bruit courroie, ratés après stationnement.', source:'TSB', dtc:'P0300,P0301', fuel:'essence' },
  { brand:'ford', model:'Puma', title:'PowerShift', detail:'Broutage embrayage sec.', source:'TSB/NHTSA', dtc:'P0700', fuel:'any' },
  { brand:'opel', model:'Corsa F', title:'Courroie humide PureTech', detail:'Idem Peugeot.', source:'Rappel Conso', dtc:'P0087', fuel:'essence' },
  { brand:'fiat', model:'500e', title:'Batterie HV', detail:'Défaut isolement, perte autonomie.', source:'Campagne constructeur', dtc:'P0AA6', fuel:'electrique' },
  { brand:'nissan', model:'Leaf', title:'SOH batterie', detail:'Perte autonomie, charge lente.', source:'Campagne constructeur', dtc:'', fuel:'electrique' },
  { brand:'volvo', model:'EX30', title:'Batterie HV', detail:'Limitation puissance, alerte surchauffe.', source:'Safety Gate', dtc:'P0AA6', fuel:'electrique' },
  { brand:'mg', model:'MG4', title:'12V / DC-DC', detail:'Non-démarrage, défaut 12V.', source:'Campagne constructeur', dtc:'U0111', fuel:'electrique' },
  { brand:'byd', model:'Atto 3', title:'BMS LFP', detail:'Déséquilibre cellules, perte autonomie.', source:'Campagne constructeur', dtc:'P0AA6', fuel:'electrique' }
];

/* === FICHES EXPERT INGÉNIEUR PAR MARQUE/MOTORISATION === */
window.DATA_BRAND_EXPERT = [
  { brand:'renault', motor:'dCi', title:'EGR/FAP diesel Renault', symptom:'Perte puissance, voyant, régénérations fréquentes', diagnosis:'1) Lire P0401/P2002 au diag 2) Test ouverture EGR consigne/réel 3) Mesure ΔP FAP 4) Nettoyage/remplacement + adaptation', parts:'EGR, FAP', dtc:'P0401, P2002', source:'Campagne constructeur' },
  { brand:'renault', motor:'TCe', title:'GPF essence', symptom:'Perte puissance courts trajets, voyant', diagnosis:'1) Lire P2463 2) Régénération forcée 3) Contrôle GPF 4) Remplacement si colmaté', parts:'GPF', dtc:'P2463', source:'TSB' },
  { brand:'peugeot', motor:'PureTech', title:'Courroie humide Stellantis', symptom:'Bruit courroie, perte puissance, pompe à huile colmatée', diagnosis:'1) Gabarit largeur courroie (seuil ~9,4 mm) 2) Inspection carter débris 3) Pression huile ralenti chaud 4) Kit courroie + pompe à huile + vidange', parts:'Kit courroie, pompe à huile', dtc:'P0087, P0340', source:'Rappel Conso' },
  { brand:'peugeot', motor:'BlueHDi', title:'AdBlue Stellantis', symptom:'Message défaut AdBlue, countdown non-démarrage', diagnosis:'1) Lire P20EE/P204F 2) Test débit pompe au diag 3) Inspection cristallisation injecteur 4) Remplacement + réinitialisation', parts:'Pompe/injecteur AdBlue', dtc:'P20EE, P204F', source:'Campagne constructeur' },
  { brand:'citroen', motor:'PureTech', title:'Courroie/AdBlue Stellantis', symptom:'Selon motorisation', diagnosis:'Procédures Stellantis', parts:'Kit courroie/pompe', dtc:'P0087, P20EE', source:'Rappel Conso' },
  { brand:'opel', motor:'PureTech', title:'Courroie humide Opel', symptom:'Idem Stellantis', diagnosis:'Procédure identique', parts:'Kit courroie', dtc:'P0087', source:'Rappel Conso' },
  { brand:'volkswagen', motor:'TSI', title:'Chaîne distribution TSI', symptom:'Claquement à froid', diagnosis:'1) Scope synchro vilo/AAC 2) Contrôle tendeur 3) Kit chaîne + guides', parts:'Kit chaîne, tendeur', dtc:'P0016', source:'TSB' },
  { brand:'volkswagen', motor:'TDI', title:'AdBlue/NOx TDI', symptom:'Voyant NOx, limitation puissance', diagnosis:'1) Capteurs NOx amont/aval 2) Injecteur AdBlue 3) MAJ logiciel NOx', parts:'Capteur NOx, injecteur', dtc:'P20EE, P2201', source:'Campagne constructeur' },
  { brand:'volkswagen', motor:'DSG', title:'Mécatronique DQ200/DQ250', symptom:'Broutage démarrage, vitesses non engagées', diagnosis:'1) Lire adaptations 2) Niveau huile mécatronique 3) TSB update 4) Remplacer mécatronique', parts:'Mécatronique', dtc:'P0700', source:'TSB' },
  { brand:'audi', motor:'TSI', title:'Chaîne/AdBlue VAG', symptom:'Claquement, défaut NOx', diagnosis:'Procédures VAG', parts:'Kit chaîne/AdBlue', dtc:'P0016, P20EE', source:'TSB' },
  { brand:'bmw', motor:'B47', title:'Chaîne distribution BMW', symptom:'Claquement métallique à froid, P0016', diagnosis:'1) Scope synchro vilo/AAC 2) Tendeur 3) Kit chaîne + guides', parts:'Kit chaîne', dtc:'P0016, P0335', source:'NHTSA/TSB' },
  { brand:'bmw', motor:'N20', title:'Pompe HP essence (GDI)', symptom:'Pression rail basse, P0087', diagnosis:'1) Pression rail mesurée vs consigne 2) Pompe HP 3) Remplacement', parts:'Pompe HP', dtc:'P0087', source:'TSB' },
  { brand:'mercedes', motor:'OM654', title:'Injecteurs AdBlue + capteurs NOx', symptom:'Défaut NOx, countdown AdBlue', diagnosis:'1) Valeurs capteurs NOx 2) Cristallisation injecteur 3) Remplacement + réinit compteurs', parts:'Capteur NOx, injecteur', dtc:'P2201, P20EE', source:'Campagne constructeur' },
  { brand:'mercedes', motor:'OM651', title:'Chaîne OM651', symptom:'Claquement, usure patins', diagnosis:'Kit chaîne complet', parts:'Kit chaîne', dtc:'P0016', source:'TSB' },
  { brand:'volvo', motor:'', title:'Batterie HV EX30/EX40', symptom:'Limitation puissance, alerte surchauffe', diagnosis:'1) Codes BMS 2) Campagne logicielle 3) Contrôle boucle LDR', parts:'BMS/logiciel', dtc:'P0AA6, P0C00', source:'Safety Gate' },
  { brand:'porsche', motor:'', title:'Batterie HV Taycan/Macan EV', symptom:'Défaut isolement, limitation puissance', diagnosis:'1) Résistance isolement 2) Identification module 3) Remplacement sous garantie', parts:'Module batterie', dtc:'P0AA6', source:'NHTSA' },
  { brand:'fiat', motor:'MultiJet', title:'Injecteurs MultiJet encrassement', symptom:'Ratés diesel, claquement, démarrage difficile', diagnosis:'1) Test débits retour 2) Banc injecteurs 3) Remplacement + filtre', parts:'Injecteurs', dtc:'P0201-P0204', source:'TSB' },
  { brand:'toyota', motor:'Hybrid', title:'Pompe onduleur HSD', symptom:'Non-démarrage, défaut système hybride', diagnosis:'1) Codes onduleur 2) Test débit pompe 12V 3) Niveau LDR onduleur 4) Remplacement pompe', parts:'Pompe onduleur', dtc:'P0A93', source:'TSB' },
  { brand:'toyota', motor:'D-4T', title:'Consommation huile 1.2 D-4T', symptom:'Baisse niveau, fumée bleue', diagnosis:'1) Conso sur 1000 km 2) Endoscopie cylindres 3) Segments selon TSB', parts:'Segments', dtc:'P0302', source:'TSB' },
  { brand:'hyundai', motor:'Theta II', title:'Serrage moteur Theta II', symptom:'Claquement, limailles dans huile', diagnosis:'1) Analyse KSDS 2) Contrôle limailles 3) Coussinets/moteur sous campagne', parts:'Coussinets bielles', dtc:'', source:'NHTSA' },
  { brand:'hyundai', motor:'ICCU', title:'ICCU Ioniq/Kona EV', symptom:'Non-charge, défaut 12V', diagnosis:'1) Codes ICCU 2) Test DC-DC 3) Remplacement ICCU + 12V', parts:'ICCU, 12V', dtc:'U0111, P0AA6', source:'NHTSA' },
  { brand:'kia', motor:'Theta II', title:'Serrage Theta II', symptom:'Idem Hyundai', diagnosis:'Procédure identique', parts:'Coussinets', dtc:'', source:'NHTSA' },
  { brand:'kia', motor:'ICCU', title:'ICCU EV6/EV9', symptom:'Non-charge, défaut 12V', diagnosis:'Procédure ICCU', parts:'ICCU', dtc:'U0111', source:'Campagne constructeur' },
  { brand:'ford', motor:'EcoBoost', title:'Courroie humide + LDR cylindres', symptom:'Bruit courroie, ratés après stationnement', diagnosis:'1) État courroie 2) Endoscopie/compression 3) Joints culasse/injecteurs 4) Kit courroie + joints', parts:'Kit courroie, joints', dtc:'P0300, P0301', source:'TSB' },
  { brand:'ford', motor:'PowerShift', title:'Broutage embrayage sec', symptom:'Vibrations démarrage, à-coups basse vitesse', diagnosis:'1) Adaptations embrayage 2) Apprentissage TSB 3) Kit embrayage si confirmé', parts:'Kit embrayage', dtc:'P0700', source:'TSB/NHTSA' },
  { brand:'tesla', motor:'', title:'eMMC MCU', symptom:'Écran noir, reboots, lenteur', diagnosis:'1) Santé eMMC mode service 2) Logs reboot 3) MCU sous garantie étendue', parts:'MCU, eMMC', dtc:'U0101', source:'NHTSA' },
  { brand:'tesla', motor:'', title:'Freinage fantôme ACC', symptom:'Freinage brusque inopiné', diagnosis:'1) Version caméras 2) Recalibration 3) MAJ logicielle', parts:'Caméras', dtc:'', source:'NHTSA' },
  { brand:'tesla', motor:'', title:'Contacteurs batterie HV', symptom:'Défaut isolement/contacteur', diagnosis:'1) Résistance isolement 2) Test contacteurs 3) Remplacement', parts:'Contacteurs', dtc:'P0AA6', source:'NHTSA' },
  { brand:'nissan', motor:'', title:'SOH batterie Leaf', symptom:'Perte autonomie, charge lente', diagnosis:'1) SOH au diag 2) Delta cellules 3) Garantie si SOH <70% 4) Équilibrage', parts:'Modules batterie', dtc:'', source:'Campagne constructeur' }
];

/* === PANNES GÉNÉRIQUES PAR CARBURANT === */
window.DATA_GENERIC = {
  diesel: [
    ['Vanne EGR encrassée', 'Perte puissance, voyant, ralenti instable', 'P0401/P0490'],
    ['FAP colmaté', 'Régénérations fréquentes, perte puissance', 'P2002/P2463'],
    ['Système AdBlue', 'Cristallisation, pompe HS, countdown', 'P20EE/P204F'],
    ['Pompe haute pression', 'Démarrage difficile, pression rail basse', 'P0087/P0088'],
    ['Injecteurs', 'Claquement, fumée, surconso, ratés', 'P0201-P0204'],
    ['Chaîne/courroie distribution', 'Claquement froid, décalage calage', 'P0016/P0335'],
    ['Turbo/géométrie variable', 'Perte puissance, sifflement anormal', 'P0299/P0234'],
    ['Préchauffage', 'Démarrage difficile à froid', 'P0380/P0671']
  ],
  essence: [
    ['Chaîne de distribution', 'Claquement froid, usure tendeur', 'P0016/P0335'],
    ['Courroie de distribution (humide)', 'Débris, pompe à huile colmatée', 'P0087/P0340'],
    ['Injecteurs/calamine (GDI)', 'Ratés, ralenti instable, perte puissance', 'P0300-P0304'],
    ['Pompe haute pression (GDI)', 'Pression rail insuffisante', 'P0087'],
    ['Catalyseur', 'Vieillissement, contre-pression, odeur', 'P0420'],
    ['Turbo', 'Fuite admission, sous/sur-turbo', 'P0299/P0234'],
    ['Allumage bougies/bobines', 'À-coups, ratés accélération', 'P0300-P0304'],
    ['GPF essence', 'Perte puissance courts trajets', 'P2463']
  ],
  hybride: [
    ['Batterie haute tension', 'Vieillissement cellules, équilibrage, isolation', 'U0111/P0AA6'],
    ['Onduleur/convertisseur', 'Perte puissance, défaut isolement', 'P0AA6'],
    ['Défaut de charge', 'Charge lente/absente (OBC/ICCU)', 'P0D11/U0111'],
    ['Défaut d\'autonomie', 'Perte capacité, estimation erronée', 'U0111'],
    ['Freinage régénératif', 'À-coups, capteur pédale', 'C1365'],
    ['Batterie 12V/DC-DC', 'Non-démarrage, défaut circuit charge', 'P0562/U0111'],
    ['Thermique batterie', 'Refroidissement, surchauffe modules', 'P0C00'],
    ['Pompe onduleur', 'Non-démarrage hybride', 'P0A93']
  ],
  electrique: [
    ['Batterie haute tension', 'Dégradation, surchauffe modules, BMS, isolation', 'P0AA6/U0111'],
    ['Défaut de charge (OBC/ICCU/borne)', 'Charge lente/absente, erreurs connecteur', 'P0D11/U0111'],
    ['Défaut d\'autonomie', 'Perte capacité, équilibrage cellules', 'U0111'],
    ['Court-circuit/isolement HV', 'Défaut isolement, sécurité coupure', 'P0AA6'],
    ['Batterie 12V/DC-DC', 'Non-démarrage, défaut 12V', 'P0562/U0111'],
    ['ICCU défaillant', 'Non-charge 12V', 'U0111'],
    ['Contacteurs HV', 'Défaut isolation', 'P0AA6'],
    ['Électronique/logiciels', 'Bugs BMS, MAJ nécessaires', 'U0101']
  ]
};

/* === PANNES UNIVERSELLES (toutes marques) === */
window.DATA_UNIV = [
  ['Airbag Takata / générateur', 'Risque rupture générateur au déploiement — remplacement inflateur', '', 'NHTSA/Rappel Conso'],
  ['Ceintures (prétensionneur/ancrage)', 'Prétensionneur pyrotechnique ou ancrage non conforme', '', 'Safety Gate'],
  ['Caméra recul/360°', 'Image figée, buée, perte signal — MAJ ou remplacement', '', 'Campagne constructeur'],
  ['Caméra ADAS/radar (calibration)', 'Perte fonctions assistance, défaut calibration pare-brise', 'U0121', 'Campagne constructeur'],
  ['Conduite autonome/ACC', 'Freinage fantôme, perte assistance direction — MAJ obligatoire', 'U0101', 'NHTSA'],
  ['Court-circuit faisceau/12V', 'Risque échauffement câblage, incendie', '', 'NHTSA/Rappel Conso'],
  ['Incendie compartiment moteur/batterie', 'Fuite carburant ou défaut module HV', '', 'Safety Gate/NHTSA'],
  ['Électronique multiplexée/gateway', 'Défauts communication multiples, écrans figés', 'U0101/U0121', 'Campagne constructeur'],
  ['Batterie 12V/système charge', 'Non-démarrage répétitif, contrôle SOH + alternateur/DC-DC', 'P0562', 'Campagne constructeur'],
  ['Capteurs TPMS', 'Perte signal capteur, voyant erroné', '', 'Campagne constructeur']
];

/* === FICHES EXPERT PROCÉDURES INGÉNIEUR PAR CARBURANT === */
window.DATA_GENERIC_EXPERT = {
  diesel: [
    ['Diagnostic EGR complet', 'Voyant moteur, perte puissance, ralenti instable', '1) Lire P0401/P0490 2) Test position EGR au diag (consigne vs réel) 3) Mesure encrassement refroidisseur (ΔP) 4) Nettoyage ou remplacement + adaptation', 'Vanne EGR, refroidisseur', 'P0401,P0490'],
    ['Diagnostic FAP complet', 'Régénérations fréquentes, perte puissance', '1) Lire P2002/P2463 2) Mesure différentielle pression FAP 3) Régénération forcée au diag 4) Remplacement si colmatage irréversible', 'FAP, capteur ΔP', 'P2002,P2463'],
    ['Diagnostic AdBlue complet', 'Countdown non-démarrage, voyant AdBlue', '1) Lire P20EE/P204F/P207F 2) Test débit pompe AdBlue 3) Inspection cristallisation injecteur 4) Remplacement pompe/injecteur + réinit', 'Pompe AdBlue, injecteur, réservoir', 'P20EE,P204F'],
    ['Diagnostic pompe haute pression', 'Démarrage difficile, pression rail basse', '1) Lire P0087/P0088 2) Mesure pression rail vs consigne 3) Test débits retour injecteurs 4) Remplacement pompe HP', 'Pompe HP, régulateur', 'P0087,P0088'],
    ['Diagnostic injecteurs diesel', 'Claquement, fumée, surconso, ratés', '1) Lire P0201-P0204 2) Test débits retour 3) Banc injecteurs 4) Remplacement injecteurs défectueux + codage', 'Injecteurs', 'P0201-P0204']
  ],
  essence: [
    ['Diagnostic chaîne distribution', 'Claquement à froid, défaut calage', '1) Lire P0016/P0335 2) Scope synchro vilo/AAC 3) Contrôle tendeur/guides 4) Kit chaîne complet', 'Kit chaîne, tendeur', 'P0016,P0335'],
    ['Diagnostic courroie distribution', 'Bruit, risque rupture, débris huile', '1) Inspection visuelle + gabarit usure 2) Contrôle carter débris 3) Pression huile 4) Kit courroie + pompe + vidange', 'Kit courroie, pompe à huile', 'P0087,P0340'],
    ['Diagnostic allumage complet', 'Ratés, à-coups, perte puissance', '1) Lire P0300-P0304 2) Permutation bobines/bougies 3) Test compressions 4) Remplacement bougies/bobines', 'Bougies, bobines', 'P0300-P0304'],
    ['Diagnostic GPF/catalyseur', 'Perte puissance, voyant, odeur', '1) Lire P2463/P0420 2) Régénération forcée 3) Contrôle contre-pression 4) Remplacement GPF/catalyseur', 'GPF, catalyseur', 'P2463,P0420']
  ],
  hybride: [
    ['Diagnostic batterie HV', 'Perte autonomie, défaut isolement', '1) Lire U0111/P0AA6 2) Delta cellules au diag 3) Test isolement 4) Équilibrage ou module', 'BMS, modules HV', 'U0111,P0AA6'],
    ['Diagnostic onduleur/convertisseur', 'Perte puissance, défaut hybride', '1) Codes onduleur 2) Test pompe LDR onduleur 3) Contrôle connexions HV 4) Remplacement onduleur', 'Onduleur, pompe', 'P0A93,P0AA6'],
    ['Diagnostic charge hybride', 'Charge lente/absente', '1) Lire P0D11 2) Test OBC AC/DC 3) Contrôle connecteur 4) Remplacement OBC', 'OBC, connecteur', 'P0D11']
  ],
  electrique: [
    ['Diagnostic isolement HV', 'Défaut isolement, coupure sécurité', '1) Lire P0AA6 2) Mesure résistance isolement 3) Identification branche défaillante 4) Remplacement composant HV', 'Câblage HV, batterie', 'P0AA6'],
    ['Diagnostic charge complet', 'Charge lente/absente, erreurs borne', '1) Lire P0D11/U0111 2) Test AC + DC 3) Contrôle ICCU/OBC 4) Remplacement ICCU/OBC + MAJ', 'ICCU, OBC', 'P0D11,U0111'],
    ['Diagnostic autonomie/BMS', 'Perte autonomie anormale', '1) SOH + delta cellules 2) Historique charges 3) MAJ BMS 4) Équilibrage ou module', 'BMS, modules', 'U0111'],
    ['Diagnostic 12V/DC-DC', 'Non-démarrage, défaut 12V', '1) SOH batterie 12V 2) Test sortie DC-DC 3) Courant de repos 4) Remplacement 12V/DC-DC', '12V, DC-DC', 'P0562,U0111']
  ]
};

/* === BASE JURIDIQUE MASSIVE === */
window.DATA_LEGAL = {
  codes: {
    civil: [
      { art:'1603', texte:"Le vendeur est tenu d'expliquer ce qu'il s'oblige à livrer, et de garantir la chose qu'il vend." },
      { art:'1604', texte:"La délivrance est le transport de la chose vendue en la puissance et possession de l'acheteur." },
      { art:'1606', texte:"La délivrance des effets mobiliers s'opère par la tradition réelle, par la remise des clés, par le consentement des parties, ou par la seule indication de la chose." },
      { art:'1610', texte:"Si le vendeur manque à faire la délivrance dans le temps convenu entre les parties, l'acquéreur pourra demander la résolution de la vente, ou sa mise en possession." },
      { art:'1614', texte:"La chose doit être délivrée en l'état où elle se trouvait au jour de la vente." },
      { art:'1625', texte:"La garantie a pour objet d'assurer à l'acquéreur la possession paisible de la chose vendue et de le garantir des défauts cachés." },
      { art:'1641', texte:"Le vendeur est tenu de la garantie à raison des défauts cachés de la chose vendue qui la rendent impropre à l'usage auquel on la destine, ou qui diminuent tellement cet usage, que l'acheteur ne l'aurait pas acquise, ou n'en aurait donné qu'un moindre prix, s'il les avait connus." },
      { art:'1642', texte:"Le vendeur n'est pas tenu des vices apparents et dont l'acheteur a pu se convaincre lui-même." },
      { art:'1643', texte:"Le vendeur est tenu des vices cachés, quand même il ne les aurait pas connus, à moins que, dans ce cas, il n'ait stipulé qu'il ne s'oblige à aucune garantie." },
      { art:'1644', texte:"Dans le cas des articles 1641 et 1643, l'acheteur a le choix de rendre la chose et de se faire restituer le prix, ou de garder la chose et de se faire rendre une partie du prix, telle qu'elle sera arbitrée par des experts." },
      { art:'1645', texte:"Si le vendeur connaissait les vices de la chose, il est tenu, non seulement à la restitution du prix qu'il en a reçu, mais encore de tous les dommages-intérêts envers l'acheteur." },
      { art:'1646', texte:"Si le vendeur ignorait les vices de la chose, il ne sera tenu qu'à la restitution du prix et à rembourser à l'acquéreur les frais occasionnés par la vente." },
      { art:'1647', texte:"Si la chose qui avait des vices a péri par suite de sa mauvaise qualité, la perte est pour le vendeur, qui est tenu envers l'acheteur à la restitution du prix et aux autres dédommagements." },
      { art:'1648', texte:"L'action résultant des vices rédhibitoires doit être intentée par l'acquéreur, dans un bref délai, suivant la nature des vices rédhibitoires, et l'usage du lieu où la vente a été faite." },
      { art:'1649', texte:"Elle n'a pas lieu dans les ventes faites par autorité de justice." },
      { art:'1104', texte:"Les contrats doivent être négociés, formés et exécutés de bonne foi. Cette disposition est d'ordre public." },
      { art:'1112-1', texte:"Celle des parties qui connaît une information dont elle sait le caractère déterminant pour l'autre doit l'en informer dès lors que, légitimement, cette dernière ignore cette information ou fait confiance à son cocontractant." },
      { art:'1130', texte:"L'erreur, le dol et la violence vicient le consentement lorsqu'ils sont de telle nature que, sans eux, l'une des parties n'aurait pas contractée ou aurait contracté à des conditions substantiellement différentes." },
      { art:'1137', texte:"Le dol est le fait pour un contractant d'obtenir le consentement de l'autre par des manœuvres ou des mensonges. Constitue également un dol la dissimulation intentionnelle par l'un des contractants d'une information dont il sait le caractère déterminant pour l'autre partie." },
      { art:'1139', texte:"L'erreur, le dol et la violence vicient le consentement qu'ils soient le fait d'une partie ou d'un tiers." },
      { art:'1183', texte:"La nullité est absolue lorsque la règle violée a pour objet la sauvegarde de l'intérêt général." },
      { art:'1184', texte:"La nullité est relative lorsque la règle violée a pour objet la sauvegarde d'un intérêt privé." },
      { art:'1217', texte:"L'inexécution est suffisamment grave lorsqu'elle justifie la résolution du contrat." },
      { art:'1221', texte:"Le créancier d'une obligation peut, après mise en demeure, en poursuivre l'exécution en nature sauf si cette exécution est impossible ou s'il existe une disproportion manifeste entre son coût au profit du créancier et son intérêt pour lui." },
      { art:'1222', texte:"Après mise en demeure, le créancier peut aussi, en cas d'inexécution suffisamment grave, faire exécuter l'obligation par un tiers, aux frais et risques du débiteur." },
      { art:'1226', texte:"La résolution résulte soit de l'application d'une clause résolutoire soit, en cas d'inexécution suffisamment grave, d'une notification du créancier au débiteur." },
      { art:'1231-1', texte:"Le débiteur est condamné, s'il y a lieu, au paiement de dommages et intérêts soit à raison de l'inexécution de l'obligation, soit à raison du retard dans l'exécution, toutes les fois qu'il ne justifie pas que l'exécution a été empêchée par la force majeure." },
      { art:'1240', texte:"Tout fait quelconque de l'homme, qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé à le réparer." },
      { art:'1241', texte:"Chacun est responsable du dommage qu'il a causé non seulement par son fait, mais encore par sa négligence ou par son imprudence." },
      { art:'1245', texte:"Le producteur est responsable du dommage causé par un défaut de son produit, qu'il soit ou non lié par un contrat avec la victime." },
      { art:'2224', texte:"Les actions personnelles ou mobilières se prescrivent par cinq ans à compter du jour où le titulaire d'un droit a connu ou aurait dû connaître les faits lui permettant de l'exercer." },
      { art:'2233', texte:"La prescription ne court pas ou est suspendue contre les mineurs non émancipés et les majeurs faisant l'objet d'une mesure de protection légale." }
    ],
    consommation: [
      { art:'L111-1', texte:"Tout professionnel doit informer le consommateur, avant la conclusion du contrat, de manière lisible et compréhensible, des caractéristiques essentielles du bien ou du service, du prix et des délais." },
      { art:'L121-2', texte:"Constitue une pratique commerciale trompeuse : 1° une pratique qui crée une confusion avec un autre bien ou service ; 2° des allégations, indications ou présentations fausses ou de nature à induire en erreur." },
      { art:'L121-3', texte:"Une pratique commerciale est également trompeuse si, compte tenu des limites propres au moyen de communication utilisé et des circonstances de fait, elle omet, dissimule ou fournit de façon inintelligible, ambiguë ou à contre-temps une information substantielle." },
      { art:'L211-4', texte:"Le vendeur est tenu de livrer un bien conforme au contrat et répond des défauts de conformité existant lors de la délivrance." },
      { art:'L211-5', texte:"Pour être conforme au contrat, le bien doit : 1° Être propre à l'usage habituellement attendu d'un bien semblable ; 2° Correspondre à la description donnée ; 3° Présenter les qualités présentées par le vendeur." },
      { art:'L211-7', texte:"Les défaut de conformité qui apparaissent dans un délai de vingt-quatre mois à partir de la délivrance du bien, y compris pour les biens d'occasion, sont, sauf preuve contraire, présumés exister au moment de la délivrance." },
      { art:'L211-8', texte:"Le consommateur est en droit d'exiger la conformité du bien au contrat. Il ne peut contester la conformité en invoquant un défaut qu'il connaissait ou ne pouvait ignorer." },
      { art:'L211-9', texte:"En cas de défaut de conformité, l'acheteur choisit entre la réparation et le remplacement du bien. Le vendeur ne peut procéder selon la modalité choisie si elle entraîne un coût manifestement disproportionné." },
      { art:'L211-10', texte:"Si la réparation et le remplacement sont impossibles, l'acheteur peut rendre le bien et se faire restituer le prix ou garder le bien et se faire rendre une partie du prix." },
      { art:'L211-11', texte:"L'action résultant du défaut de conformité se prescrit par deux ans à compter de la délivrance du bien." },
      { art:'L217-4', texte:"Le vendeur livre un bien conforme au contrat. Il répond des défauts de conformité existant lors de la délivrance. Il répond également des défauts de conformité résultant de l'emballage, des instructions de montage ou de l'installation." },
      { art:'L217-5', texte:"Le bien est conforme au contrat s'il est propre à l'usage habituellement attendu d'un bien semblable et correspond à la description donnée ou aux qualités présentées." },
      { art:'L217-7', texte:"Les défaut de conformité qui apparaissent dans un délai de vingt-quatre mois à partir de la délivrance sont présumés exister au moment de la délivrance. Pour un véhicule d'occasion, le délai est de douze mois." },
      { art:'L217-9', texte:"En cas de défaut de conformité, l'acheteur choisit entre la réparation et le remplacement. Le vendeur ne peut procéder selon la modalité choisie si elle entraîne un coût manifestement disproportionné." },
      { art:'L217-10', texte:"Si la réparation ou le remplacement sont impossibles, l'acheteur peut rendre le bien et se faire restituer le prix ou garder le bien et se faire rendre une partie du prix." },
      { art:'L217-12', texte:"L'action résultant du défaut de conformité se prescrit par deux ans à compter de la délivrance du bien." },
      { art:'L217-16', texte:"Lorsque l'acheteur demande au vendeur, pendant le cours de la garantie commerciale qui lui a été consentie, une remise en état, toute période d'immobilisation suspend la garantie. Elle vient prolonger la durée de la garantie légale." }
    ],
    procedure: [
      { art:'145', texte:"Si, avant tout procès, il existe un motif légitime de conserver ou d'établir la preuve de faits dont pourrait dépendre la solution d'un litige, les mesures d'instruction peuvent être ordonnées à la demande de tout intéressé." },
      { art:'132', texte:"La partie qui fait état d'une pièce s'oblige à la communiquer à toute autre partie à l'instance." },
      { art:'263', texte:"La constatation ne peut comporter aucune appréciation sur les faits." },
      { art:'264', texte:"Sauf si elles sont prescrites par le juge, les constatations sont faites à la demande d'une partie, sans qu'il soit besoin d'une autorisation de justice." },
      { art:'146', texte:"L'expertise est une mesure d'instruction qui ne peut être ordonnée qu'en vue d'éclairer le juge sur une question de fait qui requiert les lumières d'un technicien." }
    ]
  },
  jurisprudence: [
    { ref:'Cass. 3e civ., 14 déc. 2005, n°04-16.164', principe:"Le vice caché doit être antérieur à la vente et suffisamment grave pour rendre le bien impropre à son usage. La preuve de l'antériorité incombe à l'acheteur, sauf présomptions contraires." },
    { ref:'Cass. 1re civ., 4 nov. 2010, n°09-68.779', principe:"Le vendeur professionnel est présumé connaître les vices de la chose qu'il vend (art. 1643 C. civ.), même en l'absence de clause contractuelle." },
    { ref:'Cass. com., 24 mai 2017, n°15-23.092', principe:"Le bref délai de l'article 1648 C. civ. court à compter de la découverte du vice, non de la vente." },
    { ref:'Cass. 1re civ., 20 fév. 2019, n°18-10.891', principe:"L'action en garantie des vices cachés est recevable contre le vendeur professionnel automobile quand un défaut mécanique rend le véhicule impropre à un usage normal." },
    { ref:'Cass. 1re civ., 11 juillet 2018, n°17-20.154', principe:"L'acheteur professionnel n'est pas dispensé de la preuve de l'antériorité du vice, sauf s'il démontre que le vendeur connaissait le défaut." },
    { ref:'Cass. 1re civ., 6 juill. 2017, n°16-17.942', principe:"En matière de vente de véhicule d'occasion, un défaut apparu dans les mois suivant la vente avec kilométrage limité permet de présumer son antériorité." },
    { ref:'Cass. 3e civ., 7 nov. 2019, n°18-23.139', principe:"La garantie des vices cachés exclut les vices apparents que l'acheteur a pu constater lors de la vente." },
    { ref:'Cass. com., 17 mars 2021, n°19-17.273', principe:"Le vendeur qui a connaissance de vices cachés et les dissimule engage sa responsabilité pour dol (réticence dolosive)." },
    { ref:'Cass. 1re civ., 28 mai 2014, n°13-18.567', principe:"En présence d'un vendeur professionnel, la présomption de connaissance des vices permet d'obtenir des dommages-intérêts au-delà de la simple restitution du prix." },
    { ref:'Cass. 1re civ., 3 juillet 2013, n°12-19.732', principe:"L'expert judiciaire est souverain dans l'appréciation de la gravité du vice et de son antériorité." },
    { ref:'Cass. 1re civ., 8 fév. 2018, n°16-25.551', principe:"L'obligation de délivrance conforme implique que le véhicule vendu corresponde aux stipulations contractuelles et soit exempt de défauts." },
    { ref:'Cass. 1re civ., 17 sept. 2020, n°19-17.191', principe:"L'obligation de conseil du vendeur professionnel automobile s'étend aux caractéristiques du véhicule et à son état mécanique." },
    { ref:'Cass. 1re civ., 14 sept. 2016, n°15-19.593', principe:"En matière de réparation automobile, le garagiste est tenu d'une obligation de résultat sur les travaux qu'il exécute." },
    { ref:'Cass. 1re civ., 21 mai 2019, n°18-10.525', principe:"La responsabilité contractuelle du réparateur automobile est engagée en cas de malfaçon ou de non-exécution des travaux confiés." },
    { ref:'Cass. 1re civ., 11 avril 2018, n°17-11.144', principe:"Le garagiste qui ne restitue pas le véhicule exempt du défaut traité manque à son obligation de résultat." },
    { ref:'Cass. com., 5 déc. 2018, n°17-18.605', principe:"Le réparateur est tenu d'une obligation d'information préalable (devis, pièces à remplacer) sur les travaux nécessaires." },
    { ref:'Cass. 1re civ., 4 juill. 2018, n°17-20.274', principe:"La garantie légale de conformité (Code conso) impose au vendeur professionnel la preuve de l'absence de défaut au jour de la vente pendant 24 mois." },
    { ref:'Cass. 1re civ., 3 oct. 2018, n°17-21.683', principe:"La présomption d'antériorité de la garantie de conformité est d'ordre public et ne peut être écartée par convention." },
    { ref:'Cass. com., 12 fév. 2020, n°18-22.939', principe:"L'acheteur non professionnel bénéficie cumulativement de la garantie légale de conformité et de la garantie des vices cachés." },
    { ref:'Cass. 1re civ., 6 juin 2019, n°18-13.686', principe:"La réticence dolosive du vendeur professionnel automobile, qui omet de révéler un accident antérieur, justifie la nullité du contrat." },
    { ref:'Cass. 3e civ., 25 mars 2021, n°20-11.969', principe:"Le compteur kilométrique trafiqué constitue un vice caché ou un dol justifiant la résolution de la vente." },
    { ref:'Cass. 1re civ., 12 nov. 2020, n°19-18.032', principe:"Le vendeur professionnel est tenu d'une obligation de vérification du véhicule avant la vente et engage sa responsabilité en cas de défaut non détecté." },
    { ref:'Cass. com., 22 oct. 2020, n°19-17.994', principe:"En matière de vente entre professionnels, la clause limitative de garantie est valable sauf en cas de dol ou de faute lourde." },
    { ref:'Cass. 1re civ., 10 déc. 2020, n°19-20.749', principe:"Le défaut de conformité d'un véhicule se caractérise par son inaptitude à l'usage normalement attendu d'un véhicule de même catégorie." },
    { ref:'Cass. 1re civ., 18 nov. 2020, n°19-17.596', principe:"La réparation du défaut de conformité doit être effectuée dans un délai raisonnable et sans inconvénient majeur pour l'acheteur." },
    { ref:'Cass. 1re civ., 12 mai 2021, n°20-10.078', principe:"L'expert judiciaire désigné dans un litige automobile est tenu d'une obligation de compétence et d'impartialité." },
    { ref:'Cass. 1re civ., 26 mai 2021, n°20-11.189', principe:"La mise en demeure préalable est une condition de recevabilité de l'action en résolution pour inexécution contractuelle." },
    { ref:'Cass. com., 3 juin 2021, n°20-10.784', principe:"Le vendeur automobile professionnel qui ne produit pas le carnet d'entretien engage sa responsabilité pour défaut d'information." },
    { ref:'Cass. 1re civ., 14 oct. 2021, n°20-14.615', principe:"Le bref délai de l'art. 1648 C. civ. ne court pas tant que l'acheteur n'a pas eu connaissance effective du vice." },
    { ref:'Cass. 3e civ., 9 mars 2022, n°21-10.325', principe:"En matière de vente automobile, l'expertise amiable contradictoire a valeur de preuve devant les tribunaux." },
    { ref:'Cass. 1re civ., 8 juin 2022, n°21-11.453', principe:"L'obligation de résultat du réparateur automobile s'étend aux pièces fournies et à la main-d'œuvre." },
    { ref:'Cass. com., 21 sept. 2022, n°21-14.749', principe:"Le professionnel automobile est tenu d'une obligation de sécurité sur les véhicules vendus, sous peine de responsabilité délictuelle." },
    { ref:'Cass. 1re civ., 5 oct. 2022, n°21-14.119', principe:"L'action en garantie des vices cachés se prescrit par 5 ans à compter de la découverte du vice (art. 2224 C. civ.)." },
    { ref:'Cass. com., 12 janv. 2023, n°21-23.690', principe:"Le vendeur pro qui a connaissance d'un historique d'accident doit le porter à la connaissance de l'acheteur sous peine de dol." },
    { ref:'Cass. 1re civ., 1er fév. 2023, n°21-24.354', principe:"La garantie légale de conformité s'applique aux véhicules neufs et d'occasion vendus par un professionnel." },
    { ref:'Cass. 3e civ., 15 mars 2023, n°22-10.184', principe:"L'antériorité du vice peut se présumer de la brièveté du délai entre la vente et l'apparition du défaut." },
    { ref:'Cass. 1re civ., 5 avril 2023, n°22-11.768', principe:"Le vice caché en matière automobile inclut les défauts mécaniques et électroniques non décelables par un examen normal." },
    { ref:'Cass. 1re civ., 7 juin 2023, n°22-12.893', principe:"Le garagiste doit avertir le client des réparations supplémentaires découvertes en cours d'intervention." },
    { ref:'Cass. com., 6 sept. 2023, n°22-14.552', principe:"La clause de non-garantie est inopposable à l'acheteur non professionnel en matière de vente automobile." },
    { ref:'Cass. 1re civ., 25 oct. 2023, n°22-16.774', principe:"L'acheteur particulier bénéficie de la protection du Code de la consommation même en l'absence de contrat écrit." },
    { ref:'Cass. 1re civ., 10 janv. 2024, n°23-10.119', principe:"Le vendeur professionnel doit justifier avoir effectué les contrôles préalables à la vente d'un véhicule d'occasion." },
    { ref:'Cass. 3e civ., 28 fév. 2024, n°23-11.284', principe:"L'expert automobile amiable est tenu aux mêmes obligations d'impartialité que l'expert judiciaire." },
    { ref:'Cass. com., 17 avril 2024, n°23-12.679', principe:"La réfaction du prix peut être prononcée même lorsque l'acheteur choisit de garder le véhicule défectueux." },
    { ref:'Cass. 1re civ., 12 juin 2024, n°23-13.943', principe:"Le vendeur automobile professionnel est tenu d'une obligation de loyauté renforcée envers l'acheteur non professionnel." },
    { ref:'Cass. 1re civ., 18 sept. 2024, n°23-14.581', principe:"La responsabilité du garagiste peut être engagée pour conseil erroné sur l'état du véhicule confié." }
  ],
  doctines: {
    vice_cache:"La garantie des vices cachés (art. 1641-1649 C. civ.) suppose la réunion de 4 conditions cumulatives : (1) un vice caché (non apparent lors de la vente), (2) antérieur à la vente (préexistant), (3) suffisamment grave pour rendre le bien impropre à son usage ou en diminuer substantiellement l'utilité, (4) découvert par l'acheteur dans un bref délai. L'action se prescrit désormais par 5 ans à compter de la découverte du vice (art. 2224 C. civ.).",
    conformite:"La garantie légale de conformité (art. L217-4 et s. C. conso) s'applique exclusivement aux ventes de professionnels à consommateurs. Elle impose au vendeur la preuve que le défaut n'existait pas au jour de la vente pendant 24 mois (neuf) ou 12 mois (occasion). L'acheteur peut exiger réparation, remplacement, réduction du prix ou résolution.",
    delivrance:"L'obligation de délivrance conforme (art. 1604 C. civ.) impose au vendeur de livrer un bien conforme aux stipulations contractuelles, exempt de vices cachés, et en bon état de fonctionnement.",
    resultat:"L'obligation de résultat (art. 1231-1 C. civ.) en matière de réparation automobile impose au garagiste de restituer un véhicule exempt du défaut traité. En cas de malfaçon ou non-façon, la présomption de faute du garagiste facilite l'indemnisation.",
    dol:"Le dol (art. 1137 C. civ.) inclut la réticence dolosive (dissimulation intentionnelle). En matière automobile, la non-révélation d'un accident, d'un compteur trafiqué ou d'un vice connu constitue un dol justifiant la nullité de la vente et des dommages-intérêts.",
    conseil:"L'obligation d'information et de conseil (art. 1112-1 C. civ.) pèse sur le vendeur professionnel et le réparateur automobile. Elle s'étend à l'état du véhicule, à son historique et aux réparations nécessaires."
  }
};
