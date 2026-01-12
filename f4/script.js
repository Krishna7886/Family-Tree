/* ==================== GLOBAL CONFIGURATION ==================== */
let currentLang = 'en'; // Defaults to English
let scale = 1;          
let nextId = 9000;      
let editTarget = { mode: '', id: null };
let treeOffsets = {};   

/* ==================== 1. DATABASE (Fully Translated) ==================== */
/* 
   Structure: { id, name, name_te, gender, spouseIds, fatherId, motherId, bio, bio_te }
   Missing Telugu names have been added below.
*/

let db = [
    // --- GEN 1: CREATION ---
    { id: 1, name: "Adam", name_te: "ఆదాము", gender: "male", spouseIds: [2], fatherId: null, bio: "First Man.", bio_te: "దేవుడు సృష్టించిన మొదటి మానవుడు." },
    { id: 2, name: "Eve", name_te: "హవ్వ", gender: "female", spouseIds: [1], fatherId: null, bio: "Mother of all living.", bio_te: "జీవం గల ప్రతిదానికి తల్లి." },

    // --- GEN 2 ---
    { id: 3, name: "Seth", name_te: "షేతు", gender: "male", spouseIds: [], fatherId: 1, motherId: 2, bio: "Ancestor of Noah.", bio_te: "నోవహు పూర్వీకుడు." },
    { id: 4, name: "Cain", name_te: "కయీను", gender: "male", fatherId: 1, motherId: 2 },
    { id: 5, name: "Abel", name_te: "హేబెలు", gender: "male", fatherId: 1, motherId: 2 },

    // --- GEN 3-10 (Line to Noah) ---
    { id: 6, name: "Enos", name_te: "ఎనోషు", gender: "male", fatherId: 3 },
    { id: 7, name: "Cainan", name_te: "కేనాన", gender: "male", fatherId: 6 },
    { id: 8, name: "Mahalaleel", name_te: "మహలలేలు", gender: "male", fatherId: 7 },
    { id: 9, name: "Jared", name_te: "యెరెదు", gender: "male", fatherId: 8 },
    { id: 10, name: "Enoch", name_te: "హనోకు", gender: "male", fatherId: 9, bio: "Walked with God.", bio_te: "దేవునితో నడిచాడు." },
    { id: 11, name: "Methuselah", name_te: "మెతూషెలా", gender: "male", fatherId: 10 },
    { id: 12, name: "Lamech", name_te: "లెమెకు", gender: "male", fatherId: 11 },
    { id: 13, name: "Noah", name_te: "నోవహు", gender: "male", fatherId: 12, bio: "Built the Ark.", bio_te: "ఓడను నిర్మించాడు." },

    // --- FAMILY OF CAIN (Gen 4) ---
    { id: 150, name: "Cain's Wife", name_te: "కయీను భార్య", gender: "female", spouseIds: [4] },
    { id: 151, name: "Enoch (Cain)", name_te: "హనోకు (కయీను)", gender: "male", fatherId: 4, motherId: 150 },
    { id: 152, name: "Irad", name_te: "ఈరాదు", gender: "male", fatherId: 151 },
    { id: 153, name: "Mehujael", name_te: "మెహూయయేలు", gender: "male", fatherId: 152 },
    { id: 154, name: "Methushael", name_te: "మెతూషాయేలు", gender: "male", fatherId: 153 },
    { id: 155, name: "Lamech (Cain)", name_te: "లెమెకు (కయీను)", gender: "male", spouseIds: [156, 157], fatherId: 154 },
    { id: 156, name: "Adah", name_te: "ఆదా", gender: "female", spouseIds: [155] },
    { id: 157, name: "Zillah", name_te: "జిల్లా", gender: "female", spouseIds: [155] },
    { id: 158, name: "Jabal", name_te: "యాబాలు", gender: "male", fatherId: 155, motherId: 156 },
    { id: 159, name: "Jubal", name_te: "యూబాలు", gender: "male", fatherId: 155, motherId: 156 },
    { id: 160, name: "Tubal-Cain", name_te: "తుబల్కయీను", gender: "male", fatherId: 155, motherId: 157 },
    { id: 161, name: "Naamah", name_te: "నయమా", gender: "female", fatherId: 155, motherId: 157 },

    // --- SONS OF NOAH ---
    { id: 14, name: "Shem", name_te: "షేము", gender: "male", fatherId: 13 },
    { id: 15, name: "Ham", name_te: "హాము", gender: "male", fatherId: 13 },
    { id: 16, name: "Japheth", name_te: "యెపెతు", gender: "male", fatherId: 13 },

    // --- FAMILY OF HAM (Genesis 10) ---
    { id: 201, name: "Cush", name_te: "కూషు", gender: "male", fatherId: 15 },
    { id: 202, name: "Mizraim", name_te: "మిజ్రాయిము", gender: "male", fatherId: 15 },
    { id: 203, name: "Put", name_te: "పూతు", gender: "male", fatherId: 15 },
    { id: 204, name: "Canaan", name_te: "కనాను", gender: "male", fatherId: 15 },
    // Cush's Line
    { id: 205, name: "Nimrod", name_te: "నిమ్రోదు", gender: "male", fatherId: 201 },
    { id: 401, name: "Seba", name_te: "సెబా", gender: "male", fatherId: 201 },
    { id: 402, name: "Havilah", name_te: "హవీలా", gender: "male", fatherId: 201 },
    { id: 403, name: "Sabtah", name_te: "సబ్తా", gender: "male", fatherId: 201 },
    { id: 404, name: "Raamah", name_te: "రయమా", gender: "male", fatherId: 201 },
    { id: 405, name: "Sabteca", name_te: "సబ్తెకా", gender: "male", fatherId: 201 },
    { id: 406, name: "Sheba", name_te: "షెబ", gender: "male", fatherId: 404 },
    { id: 407, name: "Dedan", name_te: "దెదాను", gender: "male", fatherId: 404 },
    // Canaan's Tribes (Simplified List)
    { id: 420, name: "Sidon", name_te: "సీదోను", gender: "male", fatherId: 204 },
    { id: 421, name: "Heth", name_te: "హేతు", gender: "male", fatherId: 204 },
    { id: 422, name: "Jebusite", name_te: "యెబూసీయుడు", gender: "male", fatherId: 204 },
    { id: 423, name: "Amorite", name_te: "అమోరీయుడు", gender: "male", fatherId: 204 },

    // --- FAMILY OF JAPHETH (Genesis 10) ---
    { id: 501, name: "Gomer", name_te: "గోమెరు", gender: "male", fatherId: 16 },
    { id: 502, name: "Magog", name_te: "మాగోగు", gender: "male", fatherId: 16 },
    { id: 503, name: "Madai", name_te: "మాదై", gender: "male", fatherId: 16 },
    { id: 504, name: "Javan", name_te: "యావాను", gender: "male", fatherId: 16 },
    { id: 505, name: "Tubal", name_te: "తూబాలు", gender: "male", fatherId: 16 },
    { id: 506, name: "Meshech", name_te: "మెషెకు", gender: "male", fatherId: 16 },
    { id: 507, name: "Tiras", name_te: "తీరాసు", gender: "male", fatherId: 16 },

    // --- LINE OF SHEM (To Abraham) ---
    { id: 17, name: "Arphaxad", name_te: "అర్సక్షదు", gender: "male", fatherId: 14 },
    { id: 18, name: "Shelah", name_te: "షాలహు", gender: "male", fatherId: 17 },
    { id: 19, name: "Eber", name_te: "ఏబెరు", gender: "male", fatherId: 18 },
    
    // Eber's Sons
    { id: 20, name: "Peleg", name_te: "పెలెగు", gender: "male", fatherId: 19 },
    { id: 310, name: "Joktan", name_te: "యొక్తాను", gender: "male", fatherId: 19 },
    // Joktan's Sons
    { id: 311, name: "Almodad", name_te: "అల్మోదాదు", gender: "male", fatherId: 310 },
    { id: 312, name: "Sheleph", name_te: "షెలెపు", gender: "male", fatherId: 310 },
    { id: 313, name: "Hazarmaveth", name_te: "హజర్మావెతు", gender: "male", fatherId: 310 },
    { id: 314, name: "Jerah", name_te: "యెరహు", gender: "male", fatherId: 310 },
    { id: 315, name: "Hadoram", name_te: "హదోరము", gender: "male", fatherId: 310 },
    { id: 316, name: "Uzal", name_te: "ఊజాలు", gender: "male", fatherId: 310 },
    { id: 317, name: "Diklah", name_te: "దిక్లా", gender: "male", fatherId: 310 },
    { id: 318, name: "Obal", name_te: "ఓబాలు", gender: "male", fatherId: 310 },
    { id: 319, name: "Abimael", name_te: "అబీమాయేలు", gender: "male", fatherId: 310 },
    { id: 320, name: "Sheba", name_te: "షెబ", gender: "male", fatherId: 310 },
    { id: 321, name: "Ophir", name_te: "ఓపీరు", gender: "male", fatherId: 310 },
    { id: 322, name: "Havilah", name_te: "హవీలా", gender: "male", fatherId: 310 },
    { id: 323, name: "Jobab", name_te: "యోబాబు", gender: "male", fatherId: 310 },

    // Peleg's Line Continuation
    { id: 21, name: "Reu", name_te: "రెలూ", gender: "male", fatherId: 20 },
    { id: 22, name: "Serug", name_te: "సెరూగు", gender: "male", fatherId: 21 },
    { id: 23, name: "Nahor", name_te: "నాహోరు", gender: "male", fatherId: 22 },
    { id: 24, name: "Terah", name_te: "తేరాహు", gender: "male", fatherId: 23 },

    // --- PATRIARCHS ---
    { id: 25, name: "Abraham", name_te: "అబ్రాహాము", gender: "male", spouseIds: [26, 27], fatherId: 24 },
    { id: 26, name: "Sarah", name_te: "శారా", gender: "female", spouseIds: [25] },
    { id: 27, name: "Hagar", name_te: "హాగరు", gender: "female", spouseIds: [25] },

    { id: 28, name: "Isaac", name_te: "ఇస్సాకు", gender: "male", spouseIds: [29], fatherId: 25, motherId: 26 },
    { id: 29, name: "Rebekah", name_te: "రిబ్కా", gender: "female", spouseIds: [28] },
    { id: 30, name: "Ishmael", name_te: "ఇష్మాయేలు", gender: "male", fatherId: 25, motherId: 27 },

    { id: 31, name: "Jacob", name_te: "యాకోబు", gender: "male", spouseIds: [32, 33, 34, 35], fatherId: 28, motherId: 29, bio: "Israel.", bio_te: "ఇశ్రాయేలు." },
    { id: 32, name: "Leah", name_te: "లేయా", gender: "female", spouseIds: [31] },
    { id: 33, name: "Rachel", name_te: "రాహేలు", gender: "female", spouseIds: [31] },
    { id: 34, name: "Bilhah", name_te: "బిల్హా", gender: "female", spouseIds: [31] },
    { id: 35, name: "Zilpah", name_te: "జిల్పా", gender: "female", spouseIds: [31] },

    // --- 12 TRIBES & DESCENDANTS ---
    // Leah's Children
    { id: 40, name: "Reuben", name_te: "రూబేను", gender: "male", fatherId: 31, motherId: 32 },
    { id: 1001, name: "Hanoch", name_te: "హనోకు", gender: "male", fatherId: 40 },
    { id: 1002, name: "Pallu", name_te: "పల్లూ", gender: "male", fatherId: 40 },
    { id: 1003, name: "Hezron (Reuben)", name_te: "హెస్రోను", gender: "male", fatherId: 40 },
    { id: 1004, name: "Carmi", name_te: "కర్మీ", gender: "male", fatherId: 40 },

    { id: 41, name: "Simeon", name_te: "షిమ్యోను", gender: "male", fatherId: 31, motherId: 32 },
    { id: 1005, name: "Jemuel", name_te: "యెమూయేలు", gender: "male", fatherId: 41 },
    { id: 1006, name: "Jamin", name_te: "యామీను", gender: "male", fatherId: 41 },
    { id: 1007, name: "Ohad", name_te: "ఓహదు", gender: "male", fatherId: 41 },
    { id: 1008, name: "Jachin", name_te: "యాకీను", gender: "male", fatherId: 41 },
    { id: 1009, name: "Zohar", name_te: "జోహరు", gender: "male", fatherId: 41 },
    { id: 1010, name: "Shaul", name_te: "షావూలు", gender: "male", fatherId: 41 },

    { id: 42, name: "Levi", name_te: "లేవి", gender: "male", fatherId: 31, motherId: 32 },
    { id: 1011, name: "Gershon", name_te: "గెర్షోను", gender: "male", fatherId: 42 },
    { id: 1012, name: "Kohath", name_te: "కహాతీ", gender: "male", fatherId: 42 },
    { id: 1013, name: "Merari", name_te: "మెరారి", gender: "male", fatherId: 42 },

    { id: 43, name: "Judah", name_te: "యూదా", gender: "male", spouseIds:[400], fatherId: 31, motherId: 32 },
    { id: 44, name: "Issachar", name_te: "ఇస్సాఖారు", gender: "male", fatherId: 31, motherId: 32 },
    { id: 1014, name: "Tola", name_te: "తోలా", gender: "male", fatherId: 44 },
    { id: 1015, name: "Phuvah", name_te: "పూవ", gender: "male", fatherId: 44 },
    { id: 1016, name: "Job", name_te: "యోబు", gender: "male", fatherId: 44 },
    { id: 1017, name: "Shimron", name_te: "షోమ్రోను", gender: "male", fatherId: 44 },

    { id: 45, name: "Zebulun", name_te: "జెబూలూను", gender: "male", fatherId: 31, motherId: 32 },
    { id: 1018, name: "Sered", name_te: "సెరెదు", gender: "male", fatherId: 45 },
    { id: 1019, name: "Elon", name_te: "ఏలోను", gender: "male", fatherId: 45 },
    { id: 1020, name: "Jahleel", name_te: "యహలేలు", gender: "male", fatherId: 45 },

    { id: 46, name: "Dinah", name_te: "దీనా", gender: "female", fatherId: 31, motherId: 32 },

    // Rachel's Children
    { id: 47, name: "Joseph", name_te: "యోసేపు", gender: "male", fatherId: 31, motherId: 33 },
    { id: 1021, name: "Manasseh", name_te: "మనష్షే", gender: "male", fatherId: 47 },
    { id: 1022, name: "Ephraim", name_te: "ఎఫ్రాయిము", gender: "male", fatherId: 47 },

    { id: 48, name: "Benjamin", name_te: "బెన్యామీను", gender: "male", fatherId: 31, motherId: 33 },
    { id: 1023, name: "Belah", name_te: "బెల", gender: "male", fatherId: 48 },
    { id: 1024, name: "Becher", name_te: "బెకెరు", gender: "male", fatherId: 48 },
    { id: 1025, name: "Ashbel", name_te: "అష్బేలు", gender: "male", fatherId: 48 },
    { id: 1026, name: "Gera", name_te: "గేరా", gender: "male", fatherId: 48 },
    { id: 1027, name: "Naaman", name_te: "నయమాను", gender: "male", fatherId: 48 },
    { id: 1028, name: "Ehi", name_te: "ఏహీ", gender: "male", fatherId: 48 },
    { id: 1029, name: "Rosh", name_te: "రోష్", gender: "male", fatherId: 48 },
    { id: 1030, name: "Muppim", name_te: "ముప్పీము", gender: "male", fatherId: 48 },
    { id: 1031, name: "Huppim", name_te: "హుప్పీము", gender: "male", fatherId: 48 },
    { id: 1032, name: "Ard", name_te: "అర్దు", gender: "male", fatherId: 48 },

    // Bilhah's Children
    { id: 49, name: "Dan", name_te: "దాను", gender: "male", fatherId: 31, motherId: 34 },
    { id: 1033, name: "Hushim", name_te: "హుషీము", gender: "male", fatherId: 49 },

    { id: 50, name: "Naphtali", name_te: "నఫ్తాలి", gender: "male", fatherId: 31, motherId: 34 },
    { id: 1034, name: "Jahzeel", name_te: "యహసైలు", gender: "male", fatherId: 50 },
    { id: 1035, name: "Guni", name_te: "గూనీ", gender: "male", fatherId: 50 },
    { id: 1036, name: "Jezer", name_te: "యెసెరు", gender: "male", fatherId: 50 },
    { id: 1037, name: "Shillem", name_te: "షిల్లేము", gender: "male", fatherId: 50 },

    // Zilpah's Children
    { id: 51, name: "Gad", name_te: "గాదు", gender: "male", fatherId: 31, motherId: 35 },
    { id: 1038, name: "Ziphion", name_te: "జిప్యోను", gender: "male", fatherId: 51 },
    { id: 1039, name: "Haggi", name_te: "హగ్గీ", gender: "male", fatherId: 51 },
    { id: 1040, name: "Shuni", name_te: "షూనీ", gender: "male", fatherId: 51 },
    { id: 1041, name: "Ezbon", name_te: "ఎబ్సోను", gender: "male", fatherId: 51 },
    { id: 1042, name: "Eri", name_te: "ఏరీ", gender: "male", fatherId: 51 },
    { id: 1043, name: "Arodi", name_te: "అరోదీ", gender: "male", fatherId: 51 },
    { id: 1044, name: "Areli", name_te: "అరేలీ", gender: "male", fatherId: 51 },

    { id: 52, name: "Asher", name_te: "ఆషేరు", gender: "male", fatherId: 31, motherId: 35 },
    { id: 1045, name: "Jimnah", name_te: "యిమ్నా", gender: "male", fatherId: 52 },
    { id: 1046, name: "Ishuah", name_te: "యిష్వా", gender: "male", fatherId: 52 },
    { id: 1047, name: "Isui", name_te: "యిష్వీ", gender: "male", fatherId: 52 },
    { id: 1048, name: "Beriah", name_te: "బెరీయా", gender: "male", fatherId: 52 },
    { id: 1049, name: "Serah", name_te: "శెరహు", gender: "female", fatherId: 52 },

    // --- ROYAL LINE (Judah to Jesus) ---
    { id: 400, name: "Tamar", name_te: "తామారు", gender: "female", spouseIds: [43] },
    { id: 60, name: "Perez", name_te: "పెరెసు", gender: "male", fatherId: 43, motherId: 400 },
    { id: 61, name: "Hezron", name_te: "హెస్రోను", gender: "male", fatherId: 60 },
    { id: 62, name: "Ram", name_te: "రాము", gender: "male", fatherId: 61 },
    { id: 63, name: "Amminadab", name_te: "అమ్మీనాదాబు", gender: "male", fatherId: 62 },
    { id: 64, name: "Nahshon", name_te: "నయస్సోను", gender: "male", fatherId: 63 },
    { id: 65, name: "Salmon", name_te: "సల్మాను", gender: "male", spouseIds:[650], fatherId: 64 },
    { id: 650, name: "Rahab", name_te: "రాహాబు", gender: "female", spouseIds: [65] },
    { id: 66, name: "Boaz", name_te: "బోయజు", gender: "male", spouseIds: [67], fatherId: 65, motherId: 650 },
    { id: 67, name: "Ruth", name_te: "రూతు", gender: "female", spouseIds: [66] },
    { id: 68, name: "Obed", name_te: "ఓబేదు", gender: "male", fatherId: 66, motherId: 67 },
    { id: 69, name: "Jesse", name_te: "యెష్షయి", gender: "male", fatherId: 68 },
    { id: 70, name: "King David", name_te: "దావీదు రాజు", gender: "male", spouseIds: [71], fatherId: 69 },
    { id: 71, name: "Bathsheba", name_te: "బత్షెబ", gender: "female", spouseIds: [70] },
    { id: 72, name: "Solomon", name_te: "సొలొమోను", gender: "male", fatherId: 70, motherId: 71 },
    { id: 73, name: "Rehoboam", name_te: "రెహబాము", gender: "male", fatherId: 72 },
    // Short path to NT
    { id: 490, name: "Jacob (NT)", name_te: "యాకోబు (మత్తయి 1)", gender: "male", fatherId: 73 }, 
    { id: 499, name: "Joseph", name_te: "యోసేపు", gender: "male", spouseIds: [498], fatherId: 490 },
    { id: 498, name: "Mary", name_te: "మరియ", gender: "female", spouseIds: [499] },
    { id: 500, name: "Jesus Christ", name_te: "యేసు క్రీస్తు", gender: "male", fatherId: 499, motherId: 498, bio: "The Messiah.", bio_te: "లోక రక్షకుడు." }
];

/* ==================== 2. INITIALIZATION & TRANSLATIONS ==================== */

window.onload = function() {
    renderTree();
    setTimeout(() => goToId(1), 300);
}

// Global Text Helpers
const TXT = {
    searchPlaceholder: { en: "Search (Adam, Jesus)...", te: "శోధించండి (ఆదాము, యేసు)..." },
    add: { en: "+ Add Root", te: "+ మూలాన్ని జోడించు" },
    reset: { en: "Reset", te: "రీసెట్" },
    title: { en: "Biblical Family Tree", te: "బైబిల్ వంశవృక్షం" },
    subtitle: { en: "Adam to Jesus", te: "ఆదాము నుండి యేసు వరకు" },
    child: { en: "+ Child", te: "+ పిల్లలు" },
    spouse: { en: "+ Spouse", te: "+ జత" },
    details: { en: "Details", te: "వివరాలు" },
    with: { en: "With ", te: "తల్లి: " },
    parents: { en: "PARENTS", te: "తల్లిదండ్రులు" },
    grandparents: { en: "GRANDPARENTS", te: "తాతయ్య/నాయనమ్మ" },
    bio: { en: "No details available.", te: "సమాచారం లేదు." },
    father: { en: "Father", te: "తండ్రి" },
    mother: { en: "Mother", te: "తల్లి" },
    pat: { en: "Pat", te: "తండ్రి వైపు" },
    mat: { en: "Mat", te: "తల్లి వైపు" }
};

function getText(key) {
    return TXT[key][currentLang] || TXT[key]['en'];
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'te' : 'en';
    
    // 1. Update Buttons
    const btn = document.getElementById('lang-display');
    btn.innerText = currentLang === 'en' ? 'ENGLISH' : 'తెలుగు';
    
    // 2. Update Placeholders
    document.getElementById('searchInput').placeholder = getText('searchPlaceholder');
    document.querySelector('.btn-add').innerText = getText('add');
    
    // 3. Update Title
    document.getElementById('app-title').innerText = getText('title');
    
    // 4. Force Re-render of the Tree
    renderTree();
}

function toggleTheme() {
    let b = document.body;
    b.setAttribute('data-theme', b.getAttribute('data-theme')==='light' ? 'dark' : 'light');
}

/* ==================== 3. RENDER LOGIC ==================== */

function renderTree() {
    const container = document.getElementById('tree-content');
    container.innerHTML = ''; 

    // Find Root: Adam (1)
    const rootPerson = db.find(p => p.id === 1);
    if (!rootPerson) return;

    // Create the Tree wrapper
    const treeDiv = document.createElement('div');
    treeDiv.className = 'tree';

    const rootUl = document.createElement('ul');
    rootUl.appendChild(createBranch(rootPerson));
    
    treeDiv.appendChild(rootUl);
    container.appendChild(treeDiv);
    
    // Optional line drawing (if kept)
    const svg = document.getElementById('svg-layer');
    if(svg) svg.innerHTML = '';
}

function createBranch(person, visited = new Set()) {
    if (typeof person !== 'object') {
        person = db.find(x => x.id === person);
    }
    if (!person || visited.has(person.id)) return document.createDocumentFragment();
    visited.add(person.id);

    const li = document.createElement('li');
    const card = document.createElement('div');
    card.className = 'card';

    // 1. Name & Spouse Row
    const partnersDiv = document.createElement('div');
    partnersDiv.className = 'partners-row';
    partnersDiv.appendChild(createBadge(person));

    if (person.spouseIds && person.spouseIds.length > 0) {
        person.spouseIds.forEach(sid => {
            const spouse = db.find(x => x.id === sid);
            if (spouse) {
                const sep = document.createElement('span'); 
                sep.innerText = "+"; sep.style.margin="0 5px";
                partnersDiv.appendChild(sep);
                partnersDiv.appendChild(createBadge(spouse));
                if(!spouse.fatherId && !spouse.motherId) visited.add(spouse.id);
            }
        });
    }
    card.appendChild(partnersDiv);

    // 2. Actions (Corrected Language Logic)
    const actionDiv = document.createElement('div');
    actionDiv.className = 'actions';
    
    // Ensure translation happens HERE during render
    const labelChild = getText('child');
    const labelSpouse = getText('spouse');

    actionDiv.innerHTML = `
        <span onclick="openModal('child', ${person.id})" style="color:#2196f3; font-weight:bold">${labelChild}</span> | 
        <span onclick="openModal('spouse', ${person.id})" style="color:#e91e63; font-weight:bold">${labelSpouse}</span>
    `;
    card.appendChild(actionDiv);
    li.appendChild(card);

    // 3. Children Groups
    let children = db.filter(c => c.fatherId === person.id);
    if (person.gender === 'female') {
        children = children.concat(db.filter(c => c.motherId === person.id && !c.fatherId));
    }

    if (children.length > 0) {
        const ul = document.createElement('ul');
        let grouped = {};
        let noMomKey = 'unknown';
        children.forEach(kid => {
            let key = kid.motherId || noMomKey;
            if(!grouped[key]) grouped[key] = [];
            grouped[key].push(kid);
        });

        const mothers = Object.keys(grouped);
        
        if (mothers.length > 1) {
            mothers.forEach(mId => {
                const subLi = document.createElement('li');
                if (mId !== noMomKey) {
                    const mom = db.find(x => x.id == mId);
                    if(mom) {
                        const lbl = document.createElement('div');
                        lbl.className = 'family-group-label';
                        const mName = currentLang === 'en' ? mom.name : (mom.name_te || mom.name);
                        lbl.innerText = getText('with') + mName;
                        subLi.appendChild(lbl);
                    }
                }
                const subUl = document.createElement('ul');
                grouped[mId].forEach(child => subUl.appendChild(createBranch(child, visited)));
                subLi.appendChild(subUl);
                ul.appendChild(subLi); 
            });
        } else {
            children.forEach(child => ul.appendChild(createBranch(child, visited)));
        }
        li.appendChild(ul);
    }
    return li;
}

function createBadge(person) {
    const div = document.createElement('div');
    div.className = `person ${person.gender}`;
    div.setAttribute('data-id', person.id);
    
    // *** KEY FIX: Proper Language Check ***
    let displayName = "";
    if (currentLang === 'te') {
        // Prefer Telugu Name, fallback to English if missing
        displayName = person.name_te ? person.name_te : person.name;
    } else {
        displayName = person.name;
    }
    
    div.innerHTML = `
        ${displayName}
        <span class='action-icons'>
            <span class='action-icon edit-icon' onclick="openModal('edit', ${person.id}); event.stopPropagation()">✎</span>
        </span>
    `;
    
    div.onclick = (e) => { e.stopPropagation(); openInfoPanel(person.id); };
    div.onmouseenter = () => highlightAncestors(person.id);
    div.onmouseleave = () => clearHighlights();

    return div;
}

/* ==================== 4. TOOLS (Search, Info, Zoom) ==================== */

function openInfoPanel(id) {
    const p = db.find(x => x.id == id);
    if (!p) return;
    
    const panel = document.getElementById('info-panel');
    panel.style.display = "block";
    const name = currentLang === 'en' ? p.name : (p.name_te || p.name);
    document.getElementById('panel-name').innerText = name;

    let bio = "";
    if(currentLang === 'te') {
        bio = p.bio_te ? p.bio_te : (p.bio || "సమాచారం లేదు.");
    } else {
        bio = p.bio || "No details available.";
    }

    const getName = (pid) => {
        if(!pid) return "-";
        let x = db.find(z => z.id === pid);
        return currentLang === 'en' ? x.name : (x.name_te || x.name);
    };

    let parentsHTML = `
        <span class="label" style="font-weight:bold; font-size:11px; color:#555;">${getText('parents')}</span><br>
        ${getText('father')}: ${getName(p.fatherId)} | ${getText('mother')}: ${getName(p.motherId)}
    `;

    document.getElementById('ancestor-content').innerHTML = `
        <div class="bio-box">${bio}</div>
        <hr style="opacity:0.2">
        ${parentsHTML}
        <div class="divider"></div>
    `;
}

function hideAncestors() { document.getElementById('info-panel').style.display = "none"; }

function highlightAncestors(id) {
    let set = new Set();
    const traverse = (pid) => {
        if(!pid) return;
        set.add(pid);
        let p = db.find(x=>x.id==pid);
        if(p) { if(p.fatherId) traverse(p.fatherId); if(p.motherId) traverse(p.motherId); }
    };
    traverse(id);
    document.querySelectorAll('.person').forEach(el => {
        let did = parseInt(el.getAttribute('data-id'));
        if(did === id) el.classList.add('highlight');
        else if (set.has(did)) {
            el.style.backgroundColor = "#fff176"; 
            el.style.borderColor = "#fdd835";
        }
    });
}

function clearHighlights() {
    document.querySelectorAll('.person').forEach(el => {
        el.classList.remove('highlight');
        el.style.backgroundColor = "";
        el.style.borderColor = "";
    });
}

function handleEnter(e) { if(e.key === 'Enter') searchTree(); }
function searchTree() {
    let val = document.getElementById('searchInput').value.trim().toLowerCase();
    if(!val) return;
    
    // Enhanced search
    let found = db.find(p => 
        (p.name && p.name.toLowerCase().includes(val)) || 
        (p.name_te && p.name_te.includes(val))
    );
    
    if(found) {
        goToId(found.id);
        setTimeout(() => {
            const el = document.querySelector(`.person[data-id="${found.id}"]`);
            if(el) {
                el.classList.add('highlight');
                setTimeout(()=>el.classList.remove('highlight'), 2500);
                openInfoPanel(found.id);
            }
        }, 300); // Small delay to allow scroll
    } else {
        alert(currentLang === 'en' ? "Not Found" : "దొరకలేదు");
    }
}

function goToId(id) {
    const el = document.querySelector(`.person[data-id="${id}"]`);
    if(el) el.scrollIntoView({behavior:'smooth', block:'center', inline:'center'});
}

function changeZoom(d) {
    scale = Math.max(0.1, scale + d);
    document.getElementById('tree-content').style.transform = `scale(${scale})`;
    document.getElementById('zoom-level').innerText = Math.round(scale*100)+"%";
}
function resetZoom() { scale=1; changeZoom(0); }

/* ==================== 5. MODAL LOGIC ==================== */
function openModal(mode, id) {
    editTarget = { mode, id };
    document.getElementById('dataModal').style.display = 'flex';
    document.getElementById('mName').value = "";
    document.getElementById('mNameTe').value = "";
    document.getElementById('parentSelectContainer').style.display = "none";

    let title = "Add";
    if(mode === 'edit') {
        title = currentLang==='en'?"Edit Details":"సవరించండి";
        let p = db.find(x=>x.id==id);
        document.getElementById('mName').value = p.name;
        document.getElementById('mNameTe').value = p.name_te||"";
        document.getElementById('mGender').value = p.gender;
    } 
    else if(mode === 'child') {
        title = currentLang==='en'?"Add Child":"పిల్లలను జోడించు";
        let p = db.find(x=>x.id==id);
        if(p.gender === 'male' && p.spouseIds.length > 0) {
            let sel = document.getElementById('mOtherParent');
            sel.innerHTML = `<option value="">Unknown</option>`;
            p.spouseIds.forEach(sid => {
                let s = db.find(k=>k.id==sid);
                let op = document.createElement('option');
                op.value=s.id; 
                op.innerText = currentLang==='en'?s.name:s.name_te;
                sel.appendChild(op);
            });
            document.getElementById('parentSelectContainer').style.display="block";
        }
    }
    document.querySelector('.modal-content h3').innerText = title;
}

function closeModal() { document.getElementById('dataModal').style.display = 'none'; }

function saveData() {
    let nm = document.getElementById('mName').value;
    let nmt = document.getElementById('mNameTe').value;
    let gn = document.getElementById('mGender').value;
    
    if(editTarget.mode === 'edit') {
        let p = db.find(x=>x.id==editTarget.id);
        p.name=nm; p.name_te=nmt; p.gender=gn;
    } 
    else if(editTarget.mode === 'child') {
        let parent = db.find(x=>x.id==editTarget.id);
        let fid=null, mid=null;
        if(parent.gender==='male') { 
            fid=parent.id; 
            let v = document.getElementById('mOtherParent').value; 
            if(v) mid=parseInt(v);
        } else mid=parent.id;
        
        db.push({ id: ++nextId, name:nm, name_te:nmt, gender:gn, fatherId:fid, motherId:mid, spouseIds:[] });
    }
    else if(editTarget.mode === 'new_root') {
        db.push({ id: ++nextId, name:nm, name_te:nmt, gender:gn, fatherId:null, motherId:null, spouseIds:[] });
    }
    else if(editTarget.mode === 'spouse') {
        let p = db.find(x=>x.id==editTarget.id);
        let sid = ++nextId;
        db.push({ id:sid, name:nm, name_te:nmt, gender:gn, fatherId:null, spouseIds:[p.id]});
        if(!p.spouseIds) p.spouseIds=[];
        p.spouseIds.push(sid);
    }
    renderTree();
    closeModal();
}
/* ==================== 6. PINCH TO ZOOM LOGIC (Touch Screens) ==================== */

// State variables for pinch zoom
let initialPinchDistance = 0;
let initialScale = 1;
const forestContainer = document.getElementById('forest-container');

// Helper to calculate distance between two touch points
function getPinchDistance(touches) {
    return Math.hypot(
        touches[0].pageX - touches[1].pageX,
        touches[0].pageY - touches[1].pageY
    );
}

// 1. Touch Start: Record initial distance
document.addEventListener('touchstart', function(e) {
    if (e.touches.length === 2) {
        initialPinchDistance = getPinchDistance(e.touches);
        initialScale = scale; // Capture current global scale
    }
}, { passive: false });

// 2. Touch Move: Calculate new scale
document.addEventListener('touchmove', function(e) {
    if (e.touches.length === 2) {
        // Prevent default browser page zoom logic
        e.preventDefault();

        const currentDistance = getPinchDistance(e.touches);
        
        // Calculate logic: New Scale = StartScale * (CurrentDist / StartDist)
        if (initialPinchDistance > 0) {
            const pinchRatio = currentDistance / initialPinchDistance;
            let newScale = initialScale * pinchRatio;

            // Clamp zoom limits (0.1 to 3.0)
            if (newScale < 0.1) newScale = 0.1;
            if (newScale > 3.0) newScale = 3.0;

            // Update Global Variable & UI
            scale = newScale;
            updateZoomUI(); 
        }
    }
}, { passive: false });

/* ==================== HELPER REFACTOR ==================== */
// Ensure your changeZoom function calls a central UI updater
// Replace your existing changeZoom / resetZoom with these robust versions:

function updateZoomUI() {
    const content = document.getElementById('tree-content');
    if(content) {
        content.style.transform = `scale(${scale})`;
        document.getElementById('zoom-level').innerText = Math.round(scale * 100) + "%";
    }
}

// Override existing simple zoom functions to use updateZoomUI
function changeZoom(d) {
    scale += d;
    if (scale < 0.1) scale = 0.1;
    if (scale > 3.0) scale = 3.0;
    updateZoomUI();
}

function resetZoom() {
    scale = 1.0;
    updateZoomUI();
    // Re-center on Adam roughly if reset
    goToId(1);
}
