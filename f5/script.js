/* ==================== 1. GLOBAL STATE & TEXTS ==================== */
let currentLang = 'en'; 
let currentScale = 1.0;
let editTarget = { mode: '', id: null };
let nextId = 9000;

// Texts for Translations
const TXT = {
    'Search...': { en: 'Search...', te: 'శోధించండి...' },
    'Details': { en: "Details", te: "వివరాలు" },
    'Bio': { en: "No details available.", te: "సమాచారం లేదు." },
    'Father': { en: "Father", te: "తండ్రి" },
    'Mother': { en: "Mother", te: "తల్లి" },
    '+ Child': { en: "+ Child", te: "+ పిల్లలు" },
    '+ Spouse': { en: "+ Spouse", te: "+ జత" },
    'With': { en: "With ", te: "తల్లి: " }
};
const _t = (key) => TXT[key] ? (TXT[key][currentLang] || key) : key;
const getNm = (p) => currentLang === 'te' ? (p.name_te || p.name) : p.name;
const getBio = (p) => currentLang === 'te' ? (p.bio_te || p.bio) : p.bio;

/* ==================== 2. COMPLETE DATABASE (Adam -> Jesus) ==================== */
let db = [
    // --- GEN 1: Creation ---
    { id: 1, name: "Adam", name_te: "ఆదాము", gender: "male", spouseIds: [2], fatherId: null, bio: "First Man.", bio_te: "మొదటి మానవుడు." },
    { id: 2, name: "Eve", name_te: "హవ్వ", gender: "female", spouseIds: [1], fatherId: null },

    // --- GEN 4: Cain's Line ---
    { id: 4, name: "Cain", name_te: "కయీను", gender: "male", fatherId: 1, motherId: 2 },
    { id: 151, name: "Enoch (Cain)", name_te: "హనోకు", gender: "male", fatherId: 4 },
    { id: 152, name: "Irad", name_te: "ఈరాదు", gender: "male", fatherId: 151 },
    { id: 153, name: "Mehujael", name_te: "మెహూయయేలు", gender: "male", fatherId: 152 },
    { id: 154, name: "Methushael", name_te: "మెతూషాయేలు", gender: "male", fatherId: 153 },
    { id: 155, name: "Lamech (Cain)", name_te: "లెమెకు", gender: "male", spouseIds: [156,157], fatherId: 154 },
    { id: 156, name: "Adah", name_te: "ఆదా", gender: "female", spouseIds: [155] },
    { id: 157, name: "Zillah", name_te: "జిల్లా", gender: "female", spouseIds: [155] },
    { id: 158, name: "Jabal", name_te: "యాబాలు", gender: "male", fatherId: 155, motherId: 156 },
    { id: 159, name: "Jubal", name_te: "యూబాలు", gender: "male", fatherId: 155, motherId: 156 },
    { id: 160, name: "Tubal-Cain", name_te: "తుబల్కయీను", gender: "male", fatherId: 155, motherId: 157 },

    // --- GEN 5: Seth to Noah ---
    { id: 3, name: "Seth", name_te: "షేతు", gender: "male", fatherId: 1, motherId: 2 },
    { id: 5, name: "Abel", name_te: "హేబెలు", gender: "male", fatherId: 1, motherId: 2 },
    { id: 6, name: "Enos", name_te: "ఎనోషు", gender: "male", fatherId: 3 },
    { id: 7, name: "Cainan", name_te: "కేనాన", gender: "male", fatherId: 6 },
    { id: 8, name: "Mahalaleel", name_te: "మహలలేలు", gender: "male", fatherId: 7 },
    { id: 9, name: "Jared", name_te: "యెరెదు", gender: "male", fatherId: 8 },
    { id: 10, name: "Enoch", name_te: "హనోకు", gender: "male", fatherId: 9 },
    { id: 11, name: "Methuselah", name_te: "మెతూషెలా", gender: "male", fatherId: 10 },
    { id: 12, name: "Lamech", name_te: "లెమెకు", gender: "male", fatherId: 11 },
    { id: 13, name: "Noah", name_te: "నోవహు", gender: "male", fatherId: 12 },

    // --- SONS OF NOAH ---
    { id: 14, name: "Shem", name_te: "షేము", gender: "male", fatherId: 13 },
    { id: 15, name: "Ham", name_te: "హాము", gender: "male", fatherId: 13 },
    { id: 16, name: "Japheth", name_te: "యెపెతు", gender: "male", fatherId: 13 },

    // Ham's Descendants (Cush, Mizraim)
    { id: 201, name: "Cush", name_te: "కూషు", gender: "male", fatherId: 15 },
    { id: 202, name: "Mizraim", name_te: "మిజ్రాయిము", gender: "male", fatherId: 15 },
    { id: 205, name: "Nimrod", name_te: "నిమ్రోదు", gender: "male", fatherId: 201, bio: "Mighty Hunter", bio_te: "పరాక్రమశాలి" },

    // Shem's Line to Abraham
    { id: 17, name: "Arphaxad", name_te: "అర్సక్షదు", gender: "male", fatherId: 14 },
    { id: 18, name: "Shelah", name_te: "షాలహు", gender: "male", fatherId: 17 },
    { id: 19, name: "Eber", name_te: "ఏబెరు", gender: "male", fatherId: 18 },
    { id: 20, name: "Peleg", name_te: "పెలెగు", gender: "male", fatherId: 19 },
    { id: 310, name: "Joktan", name_te: "యొక్తాను", gender: "male", fatherId: 19 }, // Arab tribes
    { id: 21, name: "Reu", name_te: "రెలూ", gender: "male", fatherId: 20 },
    { id: 22, name: "Serug", name_te: "సెరూగు", gender: "male", fatherId: 21 },
    { id: 23, name: "Nahor", name_te: "నాహోరు", gender: "male", fatherId: 22 },
    { id: 24, name: "Terah", name_te: "తేరాహు", gender: "male", fatherId: 23 },

    // Patriarchs
    { id: 25, name: "Abraham", name_te: "అబ్రాహాము", gender: "male", spouseIds: [26, 27], fatherId: 24 },
    { id: 26, name: "Sarah", name_te: "శారా", gender: "female", spouseIds: [25] },
    { id: 27, name: "Hagar", name_te: "హాగరు", gender: "female", spouseIds: [25] },

    { id: 28, name: "Isaac", name_te: "ఇస్సాకు", gender: "male", spouseIds: [29], fatherId: 25, motherId: 26 },
    { id: 29, name: "Rebekah", name_te: "రిబ్కా", gender: "female", spouseIds: [28] },
    { id: 30, name: "Ishmael", name_te: "ఇష్మాయేలు", gender: "male", fatherId: 25, motherId: 27 },

    // Jacob
    { id: 31, name: "Jacob", name_te: "యాకోబు", gender: "male", spouseIds: [32, 33, 34, 35], fatherId: 28, motherId: 29 },
    { id: 32, name: "Leah", name_te: "లేయా", gender: "female", spouseIds: [31] },
    { id: 33, name: "Rachel", name_te: "రాహేలు", gender: "female", spouseIds: [31] },
    { id: 34, name: "Bilhah", name_te: "బిల్హా", gender: "female", spouseIds: [31] },
    { id: 35, name: "Zilpah", name_te: "జిల్పా", gender: "female", spouseIds: [31] },

    // 12 Tribes
    { id: 40, name: "Reuben", name_te: "రూబేను", gender: "male", fatherId: 31, motherId: 32 },
    
    { id: 41, name: "Simeon", name_te: "షిమ్యోను", gender: "male", fatherId: 31, motherId: 32 },
    { id: 42, name: "Levi", name_te: "లేవి", gender: "male", fatherId: 31, motherId: 32 },
    { id: 43, name: "Judah", name_te: "యూదా", gender: "male", spouseIds: [400], fatherId: 31, motherId: 32 },
    { id: 44, name: "Issachar", name_te: "ఇస్సాఖారు", gender: "male", fatherId: 31, motherId: 32 },
    { id: 45, name: "Zebulun", name_te: "జెబూలూను", gender: "male", fatherId: 31, motherId: 32 },
    { id: 46, name: "Dinah", name_te: "దీనా", gender: "female", fatherId: 31, motherId: 32 },
    { id: 47, name: "Joseph", name_te: "యోసేపు", gender: "male", fatherId: 31, motherId: 33 },
    { id: 48, name: "Benjamin", name_te: "బెన్యామీను", gender: "male", fatherId: 31, motherId: 33 },
    { id: 49, name: "Dan", name_te: "దాను", gender: "male", fatherId: 31, motherId: 34 },
    { id: 50, name: "Naphtali", name_te: "నఫ్తాలి", gender: "male", fatherId: 31, motherId: 34 },
    { id: 51, name: "Gad", name_te: "గాదు", gender: "male", fatherId: 31, motherId: 35 },
    { id: 52, name: "Asher", name_te: "ఆషేరు", gender: "male", fatherId: 31, motherId: 35 },

    // Line to David
    { id: 400, name: "Tamar", name_te: "తామారు", gender: "female", spouseIds: [43] },
    { id: 60, name: "Perez", name_te: "పెరెసు", gender: "male", fatherId: 43, motherId: 400 },
    { id: 61, name: "Hezron", name_te: "హెస్రోను", gender: "male", fatherId: 60 },
    { id: 62, name: "Ram", name_te: "రాము", gender: "male", fatherId: 61 },
    { id: 63, name: "Amminadab", name_te: "అమ్మీనాదాబు", gender: "male", fatherId: 62 },
    { id: 64, name: "Nahshon", name_te: "నయస్సోను", gender: "male", fatherId: 63 },
    { id: 65, name: "Salmon", name_te: "సల్మాను", gender: "male", spouseIds: [650], fatherId: 64 },
    { id: 650, name: "Rahab", name_te: "రాహాబు", gender: "female", spouseIds: [65] },
    { id: 66, name: "Boaz", name_te: "బోయజు", gender: "male", spouseIds: [660], fatherId: 65, motherId: 650 },
    { id: 660, name: "Ruth", name_te: "రూతు", gender: "female", spouseIds: [66] },
    { id: 67, name: "Obed", name_te: "ఓబేదు", gender: "male", fatherId: 66, motherId: 660 },
    { id: 69, name: "Jesse", name_te: "యెష్షయి", gender: "male", fatherId: 67 },

    // Kings of Judah (Complete List for 'David to Jesus')
    { id: 70, name: "David", name_te: "దావీదు", gender: "male", spouseIds:[71], fatherId: 69 },
    { id: 71, name: "Bathsheba", name_te: "బత్షెబ", gender: "female", spouseIds: [70] },
    { id: 72, name: "Solomon", name_te: "సొలొమోను", gender: "male", fatherId: 70, motherId: 71 },
    { id: 73, name: "Rehoboam", name_te: "రెహబాము", gender: "male", fatherId: 72 },
    { id: 74, name: "Abijah", name_te: "అబీయా", gender: "male", fatherId: 73 },
    { id: 75, name: "Asa", name_te: "ఆసా", gender: "male", fatherId: 74 },
    { id: 76, name: "Jehoshaphat", name_te: "యెహోషాపాతు", gender: "male", fatherId: 75 },
    { id: 77, name: "Joram", name_te: "యెహోరాము", gender: "male", fatherId: 76 },
    { id: 78, name: "Uzziah", name_te: "ఉజ్జియా", gender: "male", fatherId: 77 },
    { id: 79, name: "Jotham", name_te: "యోతాము", gender: "male", fatherId: 78 },
    { id: 80, name: "Ahaz", name_te: "ఆహాజు", gender: "male", fatherId: 79 },
    { id: 81, name: "Hezekiah", name_te: "హిజ్కియా", gender: "male", fatherId: 80 },
    { id: 82, name: "Manasseh", name_te: "మనష్షే", gender: "male", fatherId: 81 },
    { id: 83, name: "Amon", name_te: "ఆమోను", gender: "male", fatherId: 82 },
    { id: 84, name: "Josiah", name_te: "యోషీయా", gender: "male", fatherId: 83 },
    { id: 85, name: "Jeconiah", name_te: "యెకొన్యా", gender: "male", fatherId: 84 },

    // Exile to Jesus
    { id: 86, name: "Shealtiel", name_te: "షెయల్తీయేలు", gender: "male", fatherId: 85 },
    { id: 87, name: "Zerubbabel", name_te: "జెరుబ్బాబెలు", gender: "male", fatherId: 86 },
    { id: 88, name: "Abiud", name_te: "అబీహూదు", gender: "male", fatherId: 87 },
    { id: 89, name: "Eliakim", name_te: "ఎల్యాకీము", gender: "male", fatherId: 88 },
    { id: 90, name: "Azor", name_te: "అజోరు", gender: "male", fatherId: 89 },
    { id: 91, name: "Zadok", name_te: "సాదోకు", gender: "male", fatherId: 90 },
    { id: 92, name: "Achim", name_te: "యాకీము", gender: "male", fatherId: 91 },
    { id: 93, name: "Eliud", name_te: "ఎలీహూదు", gender: "male", fatherId: 92 },
    { id: 94, name: "Eleazar", name_te: "ఎలియాజరు", gender: "male", fatherId: 93 },
    { id: 95, name: "Matthan", name_te: "మత్తాను", gender: "male", fatherId: 94 },
    { id: 96, name: "Jacob", name_te: "యాకోబు", gender: "male", fatherId: 95 },
    
    // JESUS
    { id: 499, name: "Joseph", name_te: "యోసేపు", gender: "male", spouseIds: [498], fatherId: 96 },
    { id: 498, name: "Mary", name_te: "మరియ", gender: "female", spouseIds: [499] },
    { id: 500, name: "Jesus Christ", name_te: "యేసు క్రీస్తు", gender: "male", fatherId: 499, motherId: 498 }
];

/* ==================== 3. STARTUP ==================== */
window.onload = function() {
    renderTree();
    // Center logic fix for zoom/scroll overlap
    setTimeout(() => goToId(1), 500); 
};

/* ==================== 4. RENDERING ==================== */
function renderTree() {
    const container = document.getElementById('tree-content');
    container.innerHTML = ''; 

    // Always Root: Adam
    const root = db.find(p => p.id === 1);
    
    // CSS Tree Container
    const div = document.createElement('div');
    div.className = 'tree';
    
    const ul = document.createElement('ul');
    ul.appendChild(createBranch(root, new Set()));
    div.appendChild(ul);
    container.appendChild(div);
}

function createBranch(person, visited) {
    if(!person || visited.has(person.id)) return document.createDocumentFragment();
    visited.add(person.id);

    const li = document.createElement('li');
    const card = document.createElement('div');
    card.className = 'card';

    // Name + Spouse
    const row = document.createElement('div');
    row.className = 'partners-row';
    row.appendChild(createBadge(person));

    if (person.spouseIds && person.spouseIds.length > 0) {
        person.spouseIds.forEach(sid => {
            const spouse = db.find(x => x.id === sid);
            if (spouse) {
                const s = document.createElement('span'); 
                s.className="divider"; s.innerText="+";
                row.appendChild(s);
                row.appendChild(createBadge(spouse));
                if(!spouse.fatherId) visited.add(spouse.id); // Add strict check to avoid infinite recursion
            }
        });
    }
    card.appendChild(row);

    // Edit Actions
    const btns = document.createElement('div');
    btns.className = 'btn-row';
    btns.innerHTML = `
        <button class="btn-mini bg-c" onclick="openModal('child', ${person.id})">${_t('+ Child')}</button>
        <button class="btn-mini bg-s" onclick="openModal('spouse', ${person.id})">${_t('+ Spouse')}</button>
    `;
    card.appendChild(btns);
    li.appendChild(card);

    // Children (With Mother Grouping)
    let kids = db.filter(c => c.fatherId === person.id);
    if(person.gender==='female') kids = kids.concat(db.filter(c=>c.motherId===person.id && !c.fatherId));

    if(kids.length > 0) {
        const ul = document.createElement('ul');
        let grouped = {};
        kids.forEach(k => {
            let key = k.motherId || 'uk';
            if(!grouped[key]) grouped[key] = [];
            grouped[key].push(k);
        });

        // If Multi-Mother, render group labels
        const mKeys = Object.keys(grouped);
        if(mKeys.length > 1) {
            mKeys.forEach(mk => {
                const sLi = document.createElement('li');
                // Group Header
                if(mk!=='uk') {
                    const m = db.find(x=>x.id==mk);
                    if(m) {
                        const d = document.createElement('div');
                        d.className = 'group-label';
                        d.innerText = _t("With") + getNm(m);
                        sLi.appendChild(d);
                    }
                }
                const sUl = document.createElement('ul');
                grouped[mk].forEach(ch => sUl.appendChild(createBranch(ch, visited)));
                sLi.appendChild(sUl);
                ul.appendChild(sLi);
            });
        } else {
            // Direct
            kids.forEach(ch => ul.appendChild(createBranch(ch, visited)));
        }
        li.appendChild(ul);
    }
    return li;
}

function createBadge(person) {
    const d = document.createElement('div');
    d.className = `person ${person.gender}`;
    d.setAttribute('data-id', person.id);
    d.innerHTML = `
        ${getNm(person)}
        <div class="action-icons">
            <span class="ico-btn" onclick="openModal('edit', ${person.id})">✎</span>
            <span class="ico-btn" onclick="deleteMember(${person.id})">✖</span>
        </div>
    `;
    // HOVER logic
    d.onmouseenter = () => { showInfo(person.id); highlightTrace(person.id); };
    d.onmouseleave = () => { hideAncestors(); clearHighlights(); };
    d.onclick = (e) => { e.stopPropagation(); showInfo(person.id); }; // mobile tap
    return d;
}

/* ==================== 5. NAVIGATION & UTILS ==================== */
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'te' : 'en';
    renderTree();
}
function toggleTheme() {
    let b = document.body;
    b.setAttribute('data-theme', b.getAttribute('data-theme')==='light'?'dark':'light');
}

function updateZoom() {
    document.getElementById('tree-content').style.transform = `scale(${scale})`;
    document.getElementById('zoom-level').innerText = Math.round(scale*100) + "%";
}
function changeZoom(d) {
    scale = Math.min(Math.max(scale + d, 0.1), 3.0);
    updateZoom();
}
function resetZoom() { scale = 1.0; updateZoom(); goToId(1); }

function handleEnter(e){ if(e.key==='Enter') searchTree(); }
function searchTree() {
    let val = document.getElementById('searchInput').value.trim().toLowerCase();
    if(!val) return;
    // Check both EN and TE
    let f = db.find(x => (x.name.toLowerCase().includes(val) || (x.name_te && x.name_te.includes(val))));
    if(f) {
        goToId(f.id);
        const el = document.querySelector(`.person[data-id="${f.id}"]`);
        if(el) {
            el.classList.add('highlight');
            setTimeout(()=>el.classList.remove('highlight'), 2500);
            showInfo(f.id);
        }
    } else {
        alert("Not Found");
    }
}

function goToId(id) {
    const el = document.querySelector(`.person[data-id="${id}"]`);
    if(el) el.scrollIntoView({behavior:'smooth', block:'center', inline:'center'});
}

/* ==================== 6. INFO & HIGHLIGHT ==================== */
function showInfo(id) {
    const p = db.find(x=>x.id==id);
    const pan = document.getElementById('info-panel');
    pan.style.display = 'block';
    
    document.getElementById('panel-name').innerText = getNm(p);
    
    const pnm = (pid) => {
        let k = db.find(z=>z.id==pid);
        return k ? getNm(k) : "?";
    };
    
    let bio = getBio(p) || (currentLang==='en'?"No details.":"సమాచారం లేదు.");
    
    document.getElementById('ancestor-content').innerHTML = `
        <div class="bio-text">${bio}</div>
        <div class="info-row">
            <strong>${_t("Parents")}:</strong><br> 
            F: ${pnm(p.fatherId)} | M: ${pnm(p.motherId)}
        </div>
    `;
}
function hideAncestors() { document.getElementById('info-panel').style.display='none'; }

function highlightTrace(id) {
    let s = new Set();
    const up = (pid) => {
        if(!pid)return;
        s.add(pid);
        let x = db.find(z=>z.id==pid);
        if(x){ up(x.fatherId); up(x.motherId); }
    }
    up(id);
    document.querySelectorAll('.person').forEach(el=>{
        let did = parseInt(el.getAttribute('data-id'));
        if(s.has(did)) el.classList.add('highlight-trace');
    });
}
function clearHighlights() {
    document.querySelectorAll('.person').forEach(e => e.classList.remove('highlight', 'highlight-trace'));
}

/* ==================== 7. MODALS & EDIT ==================== */
function openModal(mode, id) {
    editTarget = {mode, id};
    document.getElementById('dataModal').style.display='flex';
    document.getElementById('mName').value=''; 
    document.getElementById('mNameTe').value='';
    document.getElementById('mTime').value=''; 
    document.getElementById('mBio').value='';
    document.getElementById('parentSelectContainer').style.display='none';

    if(mode === 'edit') {
        let p = db.find(x=>x.id==id);
        document.getElementById('mName').value = p.name;
        document.getElementById('mNameTe').value = p.name_te||'';
        document.getElementById('mBio').value = p.bio||'';
    } else if (mode === 'child') {
        // Parent selector logic if multiple wives
        let p = db.find(x=>x.id==id);
        if(p.gender === 'male' && p.spouseIds.length > 0) {
            let sel = document.getElementById('mOtherParent');
            sel.innerHTML = '<option value="">Unknown</option>';
            p.spouseIds.forEach(sid => {
                let s = db.find(k=>k.id==sid);
                let op = document.createElement('option');
                op.value=s.id; op.innerText = getNm(s);
                sel.appendChild(op);
            });
            document.getElementById('parentSelectContainer').style.display='block';
        }
    }
}
function closeModal() { document.getElementById('dataModal').style.display='none'; }

function saveData() {
    let nm = document.getElementById('mName').value;
    let nmt = document.getElementById('mNameTe').value;
    let gn = document.getElementById('mGender').value;
    let bi = document.getElementById('mBio').value;
    
    if(editTarget.mode === 'edit') {
        let p = db.find(x=>x.id==editTarget.id);
        p.name=nm; p.name_te=nmt; p.gender=gn; p.bio=bi;
    } else if (editTarget.mode === 'child') {
        let p = db.find(x=>x.id==editTarget.id);
        let fid = p.gender==='male'?p.id:null;
        let mid = p.gender==='female'?p.id:null;
        
        if(p.gender==='male') {
            let v = document.getElementById('mOtherParent').value;
            if(v) mid = parseInt(v);
        }
        db.push({id: ++nextId, name:nm, name_te:nmt, gender:gn, bio:bi, fatherId:fid, motherId:mid, spouseIds:[]});
    }
    renderTree();
    closeModal();
}

function deleteMember(id) {
    if(!confirm("Delete?")) return;
    // Cleanup spouses
    let p = db.find(x=>x.id==id);
    if(p.spouseIds) p.spouseIds.forEach(s => {
        let sp = db.find(k=>k.id==s);
        if(sp) sp.spouseIds = sp.spouseIds.filter(z=>z!=id);
    });
    // Remove
    db = db.filter(x => x.id != id);
    renderTree();
}
