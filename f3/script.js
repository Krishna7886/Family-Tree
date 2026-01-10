/* ==================== GLOBAL CONFIGURATION ==================== */
let currentLang = 'en'; // 'en' for English, 'te' for Telugu
let scale = 1;          // Zoom level
let nextId = 9000;      // Counter for new manual entries
let editTarget = { mode: '', id: null };

/* ==================== 1. DATABASE (Biblical Genealogy) ==================== */
// Schema: { id, name, name_te, gender, spouseIds, fatherId, motherId, bio, bio_te }

let db = [
    // --- GENERATION 1: CREATION ---
    { id: 1, name: "Adam", name_te: "ఆదాము", gender: "male", spouseIds: [2], fatherId: null, bio: "The first man.", bio_te: "దేవుడు సృష్టించిన మొదటి మానవుడు." },
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

    // --- SONS OF NOAH ---
    { id: 14, name: "Shem", name_te: "షేము", gender: "male", fatherId: 13 },
    { id: 15, name: "Ham", name_te: "హాము", gender: "male", fatherId: 13 },
    { id: 16, name: "Japheth", name_te: "యెపెతు", gender: "male", fatherId: 13 },

    // --- LINE OF SHEM (To Abraham) ---
    { id: 17, name: "Arphaxad", name_te: "అర్సక్షదు", gender: "male", fatherId: 14 },
    { id: 18, name: "Shelah", name_te: "షాలహు", gender: "male", fatherId: 17 },
    { id: 19, name: "Eber", name_te: "ఏబెరు", gender: "male", fatherId: 18 },
    { id: 20, name: "Peleg", name_te: "పెలెగు", gender: "male", fatherId: 19 },
    { id: 21, name: "Reu", name_te: "రెలూ", gender: "male", fatherId: 20 },
    { id: 22, name: "Serug", name_te: "సెరూగు", gender: "male", fatherId: 21 },
    { id: 23, name: "Nahor", name_te: "నాహోరు", gender: "male", fatherId: 22 },
    { id: 24, name: "Terah", name_te: "తేరాహు", gender: "male", fatherId: 23 },

    // --- PATRIARCHS ---
    { id: 25, name: "Abraham", name_te: "అబ్రాహాము", gender: "male", spouseIds: [26, 27], fatherId: 24, bio: "Father of Faith.", bio_te: "విశ్వాసులకు తండ్రి." },
    { id: 26, name: "Sarah", name_te: "శారా", gender: "female", spouseIds: [25] },
    { id: 27, name: "Hagar", name_te: "హాగరు", gender: "female", spouseIds: [25] },

    { id: 28, name: "Isaac", name_te: "ఇస్సాకు", gender: "male", spouseIds: [29], fatherId: 25, motherId: 26 },
    { id: 29, name: "Rebekah", name_te: "రిబ్కా", gender: "female", spouseIds: [28] },
    { id: 30, name: "Ishmael", name_te: "ఇష్మాయేలు", gender: "male", fatherId: 25, motherId: 27 },

    { id: 31, name: "Jacob", name_te: "యాకోబు", gender: "male", spouseIds: [32, 33, 34, 35], fatherId: 28, motherId: 29, bio: "Father of 12 Tribes.", bio_te: "12 గోత్రముల మూలపురుషుడు." },
    { id: 32, name: "Leah", name_te: "లేయా", gender: "female", spouseIds: [31] },
    { id: 33, name: "Rachel", name_te: "రాహేలు", gender: "female", spouseIds: [31] },
    { id: 34, name: "Bilhah", name_te: "బిల్హా", gender: "female", spouseIds: [31] },
    { id: 35, name: "Zilpah", name_te: "జిల్పా", gender: "female", spouseIds: [31] },

    // --- 12 SONS (TRIBES) ---
    // Leah's Sons
    { id: 40, name: "Reuben", name_te: "రూబేను", gender: "male", fatherId: 31, motherId: 32 },
    { id: 41, name: "Simeon", name_te: "షిమ్యోను", gender: "male", fatherId: 31, motherId: 32 },
    { id: 42, name: "Levi", name_te: "లేవి", gender: "male", fatherId: 31, motherId: 32, bio: "Priestly Tribe", bio_te: "యాజక గోత్రం" },
    { id: 43, name: "Judah", name_te: "యూదా", gender: "male", spouseIds:[400], fatherId: 31, motherId: 32, bio: "Royal Line", bio_te: "రాజ వంశము" },
    { id: 44, name: "Issachar", name_te: "ఇస్సాఖారు", gender: "male", fatherId: 31, motherId: 32 },
    { id: 45, name: "Zebulun", name_te: "జెబూలూను", gender: "male", fatherId: 31, motherId: 32 },
    { id: 46, name: "Dinah", name_te: "దీనా", gender: "female", fatherId: 31, motherId: 32 },

    // Rachel's Sons
    { id: 47, name: "Joseph", name_te: "యోసేపు", gender: "male", fatherId: 31, motherId: 33 },
    { id: 48, name: "Benjamin", name_te: "బెన్యామీను", gender: "male", fatherId: 31, motherId: 33 },

    // Bilhah's Sons
    { id: 49, name: "Dan", name_te: "దాను", gender: "male", fatherId: 31, motherId: 34 },
    { id: 50, name: "Naphtali", name_te: "నఫ్తాలి", gender: "male", fatherId: 31, motherId: 34 },

    // Zilpah's Sons
    { id: 51, name: "Gad", name_te: "గాదు", gender: "male", fatherId: 31, motherId: 35 },
    { id: 52, name: "Asher", name_te: "ఆషేరు", gender: "male", fatherId: 31, motherId: 35 },

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
    
    // King David
    { id: 70, name: "King David", name_te: "దావీదు రాజు", gender: "male", spouseIds: [71], fatherId: 69, bio: "Slew Goliath.", bio_te: "గొల్యాతును చంపాడు." },
    { id: 71, name: "Bathsheba", name_te: "బత్షెబ", gender: "female", spouseIds: [70] },
    { id: 72, name: "Solomon", name_te: "సొలొమోను", gender: "male", fatherId: 70, motherId: 71, bio: "Wisest King.", bio_te: "జ్ఞానియైన రాజు." },
    { id: 73, name: "Rehoboam", name_te: "రెహబాము", gender: "male", fatherId: 72 },
    
    // ... Skipping many generations for UI performance, jumping to NT ...
    
    { id: 490, name: "Jacob (NT)", name_te: "యాకోబు (మత్తయి 1)", gender: "male", fatherId: 73 }, // Symbolic Link for rendering continuity
    { id: 499, name: "Joseph", name_te: "యోసేపు", gender: "male", spouseIds: [498], fatherId: 490 },
    { id: 498, name: "Mary", name_te: "మరియ", gender: "female", spouseIds: [499] },
    
    { id: 500, name: "Jesus Christ", name_te: "యేసు క్రీస్తు", gender: "male", fatherId: 499, motherId: 498, bio: "The Savior of the World.", bio_te: "లోక రక్షకుడు." }
];

/* ==================== 2. RENDERING LOGIC (The Flexbox Tree) ==================== */

window.onload = function() {
    renderTree();
    // Auto-center viewport roughly after render
    setTimeout(goToOrigin, 200);
}

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
    // Start Recursive Building
    rootUl.appendChild(createBranch(rootPerson));
    
    treeDiv.appendChild(rootUl);
    container.appendChild(treeDiv);
    
    // Draw SVG Lines later if needed (though CSS handles the hierarchy now)
}

/**
 * Recursive Function to create UL/LI Structure
 * @param {Object} person - Database object
 * @param {Set} visited - To prevent circular loops
 */
function createBranch(person, visited = new Set()) {
    // If person is just a reference ID, find them
    if (typeof person !== 'object') {
        person = db.find(x => x.id === person);
    }
    if (!person || visited.has(person.id)) return document.createDocumentFragment();
    visited.add(person.id);

    const li = document.createElement('li');
    
    // 1. Create the Card (Person + Spouses)
    const card = document.createElement('div');
    card.className = 'card';

    // Name/Spouse Row
    const partnersDiv = document.createElement('div');
    partnersDiv.className = 'partners-row';
    
    // Self Badge
    partnersDiv.appendChild(createBadge(person));

    // Check Spouses
    if (person.spouseIds && person.spouseIds.length > 0) {
        person.spouseIds.forEach(sid => {
            const spouse = db.find(x => x.id === sid);
            if (spouse) {
                const sep = document.createElement('span'); 
                sep.innerText = "+"; 
                sep.style.margin="0 5px";
                partnersDiv.appendChild(sep);
                partnersDiv.appendChild(createBadge(spouse));
                // We add spouse to visited so they don't appear as separate roots,
                // assuming biblical genealogy tracks PATRILINEAL mostly.
                if(!spouse.fatherId && !spouse.motherId) visited.add(spouse.id);
            }
        });
    }
    card.appendChild(partnersDiv);

    // Edit/Add Controls
    const actionDiv = document.createElement('div');
    actionDiv.className = 'actions';
    actionDiv.innerHTML = `
        <span onclick="openModal('child', ${person.id})">+ Child</span>
        <span onclick="openModal('spouse', ${person.id})">+ Spouse</span>
    `;
    card.appendChild(actionDiv);

    li.appendChild(card);

    // 2. Find Children
    // Rule: Father is usually the key in this DB.
    let children = db.filter(c => c.fatherId === person.id);
    
    // If mother lineage (e.g. Jesus <- Mary)
    if (person.gender === 'female') {
        const matChildren = db.filter(c => c.motherId === person.id && !c.fatherId);
        children = children.concat(matChildren);
    }

    // 3. Render Children
    if (children.length > 0) {
        const ul = document.createElement('ul');
        
        // Group by Mother logic (for multiple wives like Jacob)
        let grouped = {};
        let noMomKey = 'unknown';
        children.forEach(kid => {
            let key = kid.motherId || noMomKey;
            if(!grouped[key]) grouped[key] = [];
            grouped[key].push(kid);
        });

        // Determine if we need grouping visuals
        const mothers = Object.keys(grouped);
        const useGroups = mothers.length > 1;

        if (useGroups) {
            mothers.forEach(mId => {
                const subLi = document.createElement('li');
                
                // Optional Label: "Children with Leah"
                if (mId !== noMomKey) {
                    const mom = db.find(x => x.id == mId);
                    if(mom) {
                        const lbl = document.createElement('div');
                        lbl.className = 'group-label';
                        const wName = currentLang === 'en' ? "w/ " : "తల్లి: ";
                        const mName = currentLang === 'en' ? mom.name : (mom.name_te || mom.name);
                        lbl.innerText = wName + mName;
                        subLi.appendChild(lbl);
                    }
                }

                // Sub-tree for this group
                const subUl = document.createElement('ul');
                grouped[mId].forEach(child => {
                    subUl.appendChild(createBranch(child, visited));
                });
                
                subLi.appendChild(subUl);
                // We are inserting an extra UL/LI layer to visualize groups
                const tempUl = document.createElement('ul'); 
                tempUl.style.paddingTop = '0';
                tempUl.appendChild(subLi); 
                
                // Actually, CSS flex tree works best if we attach specific ULs to the main LI
                // Simplified strategy for this prompt:
                // Add the Group Li directly to the main UL
                ul.appendChild(subLi);
            });
        } else {
            // Standard single lineage
            children.forEach(child => {
                ul.appendChild(createBranch(child, visited));
            });
        }
        li.appendChild(ul);
    }

    return li;
}

function createBadge(person) {
    const div = document.createElement('div');
    div.className = `person ${person.gender}`;
    div.setAttribute('data-id', person.id);
    
    // Choose Language
    const displayName = currentLang === 'en' ? person.name : (person.name_te || person.name);
    
    div.innerHTML = `${displayName}`;
    
    // Interactivity
    div.onclick = (e) => { e.stopPropagation(); openInfoPanel(person.id); };
    div.onmouseenter = () => highlightLineage(person.id);
    div.onmouseleave = () => clearHighlights();

    return div;
}

/* ==================== 3. FEATURES: HIGHLIGHT, INFO, SEARCH ==================== */

function openInfoPanel(id) {
    const p = db.find(x => x.id == id);
    if (!p) return;
    
    const panel = document.getElementById('info-panel');
    const content = document.getElementById('ancestor-content');
    const title = document.getElementById('panel-name');
    panel.style.display = "block";

    const name = currentLang === 'en' ? p.name : (p.name_te || p.name);
    const bio = currentLang === 'en' ? (p.bio || "No details.") : (p.bio_te || p.bio || "సమాచారం లేదు.");
    title.innerText = name;

    content.innerHTML = `
        <div class="bio">${bio}</div>
        <p><small>${p.gender === 'male' ? (currentLang==='en'?'Male':'పురుషుడు') : (currentLang==='en'?'Female':'స్త్రీ')}</small></p>
        <div class="divider">---</div>
        <button onclick="openModal('edit', ${p.id})">${currentLang === 'en' ? "Edit Details" : "సవరించండి"}</button>
    `;
}

function hideAncestors() {
    document.getElementById('info-panel').style.display = "none";
}

function highlightLineage(id) {
    // Walk up the tree parents
    let target = db.find(x=>x.id == id);
    if(!target) return;

    // Recursive highlighter
    const highlight = (pid) => {
        if(!pid) return;
        const el = document.querySelector(`.person[data-id="${pid}"]`);
        if(el) {
            el.classList.add('highlight');
            let data = db.find(x=>x.id==pid);
            if(data) {
                highlight(data.fatherId);
                highlight(data.motherId);
            }
        }
    };
    
    // Main target special style
    const mainEl = document.querySelector(`.person[data-id="${id}"]`);
    if(mainEl) mainEl.classList.add('highlight'); // add specific class if needed

    highlight(target.fatherId);
    highlight(target.motherId);
}

function clearHighlights() {
    document.querySelectorAll('.person.highlight').forEach(el => el.classList.remove('highlight'));
}

/* ==================== 4. TOOLS: ZOOM, SEARCH, THEME, LANG ==================== */

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'te' : 'en';
    document.getElementById('lang-display').innerText = currentLang === 'en' ? 'English' : 'తెలుగు';
    // Translate Title
    document.getElementById('app-title').innerText = currentLang==='en' ? "Biblical Family Tree" : "బైబిల్ వంశవృక్షం";
    renderTree(); // Redraw text
}

function toggleTheme() {
    const b = document.body;
    b.setAttribute('data-theme', b.getAttribute('data-theme')==='light' ? 'dark' : 'light');
}

function changeZoom(delta) {
    scale += delta;
    if(scale < 0.1) scale = 0.1;
    applyTransform();
}
function resetZoom() { scale = 1; applyTransform(); }

function applyTransform() {
    const con = document.getElementById('tree-content');
    con.style.transform = `scale(${scale})`;
    document.getElementById('zoom-level').innerText = Math.round(scale * 100) + "%";
}

function handleEnter(e) { if(e.key === 'Enter') searchTree(); }
function searchTree() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    if(!term) return;
    
    const found = db.find(p => (p.name.toLowerCase().includes(term) || (p.name_te && p.name_te.includes(term))));
    if(found) {
        goToId(found.id);
        const el = document.querySelector(`.person[data-id="${found.id}"]`);
        if(el) {
            el.classList.add('highlight');
            setTimeout(()=>el.classList.remove('highlight'), 3000);
        }
    } else {
        alert(currentLang==='en' ? "Not Found" : "దొరకలేదు");
    }
}

function goToId(id) {
    const el = document.querySelector(`.person[data-id="${id}"]`);
    // Find container to scroll
    const box = document.getElementById('forest-container');
    if (el && box) {
        // Logic to center element within the scrollable div
        // (Simplified scrollIntoView usually works well enough)
        el.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    }
}
function goToOrigin() { goToId(1); }

/* ==================== 5. MODAL / DATA HANDLING ==================== */

function openModal(mode, id) {
    editTarget = { mode, id };
    document.getElementById('dataModal').style.display = 'flex';
    document.getElementById('mName').value = "";
    document.getElementById('mNameTe').value = "";
    document.getElementById('mBio').value = "";
    document.getElementById('parentSelectContainer').style.display = "none";

    let title = currentLang==='en'?"Add":"జోడించు";
    if (mode === 'edit') {
        const p = db.find(x => x.id == id);
        title = currentLang==='en'?"Edit Details":"వివరాలను సవరించండి";
        document.getElementById('mName').value = p.name;
        document.getElementById('mNameTe').value = p.name_te || "";
        document.getElementById('mGender').value = p.gender;
        document.getElementById('mBio').value = p.bio || "";
    } else if (mode === 'child') {
        // Show mother select
        const parent = db.find(x => x.id == id);
        if (parent.gender === 'male' && parent.spouseIds && parent.spouseIds.length > 0) {
            const sel = document.getElementById('mOtherParent');
            sel.innerHTML = "<option value=''>Unknown</option>";
            parent.spouseIds.forEach(sid => {
                let s = db.find(k=>k.id == sid);
                let opt = document.createElement('option');
                opt.value = s.id; opt.innerText = currentLang==='en'?s.name:(s.name_te||s.name);
                sel.appendChild(opt);
            });
            document.getElementById('parentSelectContainer').style.display = "block";
        }
    }
    document.querySelector('.modal-content h3').innerText = title;
}

function closeModal() { document.getElementById('dataModal').style.display = 'none'; }

function saveData() {
    const name = document.getElementById('mName').value;
    const nameTe = document.getElementById('mNameTe').value;
    const gen = document.getElementById('mGender').value;
    const bio = document.getElementById('mBio').value;
    
    if(!name) return alert("Name Required");

    if (editTarget.mode === 'edit') {
        let p = db.find(x => x.id == editTarget.id);
        p.name = name; p.name_te = nameTe; p.gender = gen; p.bio = bio;
    } 
    else if (editTarget.mode === 'new_root') {
        db.push({ id: ++nextId, name, name_te: nameTe, gender: gen, bio, spouseIds:[], fatherId:null, motherId:null });
    }
    else if (editTarget.mode === 'child') {
        let pid = editTarget.id;
        let parent = db.find(x=>x.id == pid);
        let fid = null, mid = null;
        if(parent.gender === 'male') {
            fid = pid;
            let mSel = document.getElementById('mOtherParent').value;
            if(mSel) mid = parseInt(mSel);
        } else {
            mid = pid;
        }
        db.push({ id: ++nextId, name, name_te:nameTe, gender:gen, bio, spouseIds:[], fatherId:fid, motherId:mid });
    }
    else if (editTarget.mode === 'spouse') {
        let spouseOf = db.find(x=>x.id == editTarget.id);
        let newId = ++nextId;
        db.push({ id: newId, name, name_te: nameTe, gender:gen, bio, spouseIds:[spouseOf.id], fatherId:null, motherId:null});
        if(!spouseOf.spouseIds) spouseOf.spouseIds=[];
        spouseOf.spouseIds.push(newId);
    }

    renderTree();
    closeModal();
}
