
let pokemon = [];
let teams = [];
let matchups = {};
let tierOrder = [];
let metaCoreNames = [];
let relevantNames = [];
let metaReportData = {};

async function loadASCENDData() {
  const [pokemonResponse, teamsResponse] = await Promise.all([
    fetch("pokemon.json"),
    fetch("teams.json")
  ]);

  const pokemonData = await pokemonResponse.json();
  const teamsData = await teamsResponse.json();

  pokemon = pokemonData.pokemon || [];
  teams = teamsData.teams || [];
  matchups = teamsData.matchups || {};
  tierOrder = pokemonData.tierOrder || ["S+","S","S-","A+","A","A-","B+","B","B-","C+","C","C-","D"];
  metaCoreNames = pokemonData.metaCoreNames || [];
  relevantNames = pokemonData.relevantNames || [];
  metaReportData = teamsData.metaReport || {};
}

loadASCENDData().then(() => {

const metaCoreNames=["Incineroar", "Garchomp", "Charizard Y", "Kingambit", "Whimsicott", "Gengar", "Rotom-Wash", "Floette Flor Eterna", "Sneasler", "Tyranitar", "Dragonite", "Sinistcha"];
const tierOrder=["S+", "S", "S-", "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D"];
const byName=Object.fromEntries(pokemon.map(p=>[p.name,p]));byName["Charizard"]=byName["Charizard Y"];
let audioCtx,muted=false,musicOn=false,musicTimer,audioArmed=true,musicVolume=.018,volumeState=0;
function initAudio(){audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)()}
function setAudioStatus(text,active=false){
  const el=document.getElementById("audioStatus");
  if(el){el.textContent=text;el.classList.toggle("active",active)}
}
function clickSound(){
  if(muted)return;
  try{
    initAudio();
    const n=audioCtx.currentTime,o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.type="square";
    o.frequency.setValueAtTime(880,n);
    o.frequency.exponentialRampToValueAtTime(1320,n+.035);
    g.gain.setValueAtTime(.0001,n);
    g.gain.exponentialRampToValueAtTime(.045,n+.008);
    g.gain.exponentialRampToValueAtTime(.0001,n+.07);
    o.connect(g);g.connect(audioCtx.destination);o.start(n);o.stop(n+.08)
  }catch(e){}
}
function openSound(){
  if(muted)return;
  try{
    initAudio();
    const n=audioCtx.currentTime,o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.type="triangle";
    o.frequency.setValueAtTime(520,n);
    o.frequency.exponentialRampToValueAtTime(1040,n+.12);
    g.gain.setValueAtTime(.0001,n);
    g.gain.exponentialRampToValueAtTime(.055,n+.02);
    g.gain.exponentialRampToValueAtTime(.0001,n+.18);
    o.connect(g);g.connect(audioCtx.destination);o.start(n);o.stop(n+.2)
  }catch(e){}
}
function startMusic(){
  if(musicOn||muted)return;
  initAudio();
  musicOn=true;
  audioArmed=false;
  musicBtn.textContent="♪ Música ON";
  musicBtn.classList.add("active");
  setAudioStatus("♪ Música activa — volumen: bajo",true);
  const notes=[220,277.18,329.63,415.3,329.63,277.18,246.94,329.63];
  let s=0;
  musicTimer=setInterval(()=>{
    if(!musicOn||muted)return;
    const n=audioCtx.currentTime,o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.type="triangle";
    o.frequency.value=notes[s++%notes.length];
    g.gain.setValueAtTime(.0001,n);
    g.gain.exponentialRampToValueAtTime(musicVolume,n+.03);
    g.gain.exponentialRampToValueAtTime(.0001,n+.34);
    o.connect(g);g.connect(audioCtx.destination);o.start(n);o.stop(n+.36)
  },360)
}

function updateVolumeLabel(){
  const levels=["bajo","medio","alto"];
  if(musicOn){
    setAudioStatus(`♪ Música activa — volumen: ${levels[volumeState]}`,true);
  }
}
function cycleVolume(){
  volumeState=(volumeState+1)%3;
  if(volumeState===0) musicVolume=.018;
  if(volumeState===1) musicVolume=.04;
  if(volumeState===2) musicVolume=.075;
  updateVolumeLabel();
}

function stopMusic(){
  musicOn=false;
  clearInterval(musicTimer);
  musicBtn.textContent="♪ Música OFF";
  musicBtn.classList.remove("active");
  setAudioStatus("♪ Música pausada",false)
}
function activateAudioOnce(){
  if(audioArmed&&!muted)startMusic();
}
document.addEventListener("pointerdown",activateAudioOnce,{once:true});
document.addEventListener("click",e=>{
  if(e.target.closest("button,.poke-card,.member,.link-btn,.tier-mon,.top-pick-card"))clickSound()
});
musicBtn.onclick=()=>{
  if(musicOn)stopMusic();
  else startMusic();
};
muteBtn.onclick=()=>{
  muted=!muted;
  if(muted){
    stopMusic();
    muteBtn.textContent="🔇 SFX OFF";
    muteBtn.classList.remove("active");
    setAudioStatus("Audio desactivado",false);
  }else{
    muteBtn.textContent="🔊 SFX ON";
    muteBtn.classList.add("active");

const audioStatusEl=document.getElementById("audioStatus");
if(audioStatusEl){
  audioStatusEl.addEventListener("click",()=>{
    if(musicOn && !muted){
      cycleVolume();
    }
  });
}

    setAudioStatus("♪ Audio retro disponible — toca cualquier opción para activarlo",false);
    audioArmed=true;
  }
};
muteBtn.classList.add("active");

const audioStatusEl=document.getElementById("audioStatus");
if(audioStatusEl){
  audioStatusEl.addEventListener("click",()=>{
    if(musicOn && !muted){
      cycleVolume();
    }
  });
}

document.querySelectorAll(".navbtn").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".navbtn").forEach(b=>b.classList.remove("active"));btn.classList.add("active");document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));setTimeout(()=>document.getElementById(btn.dataset.target).classList.add("active"),40)});

function colorForTier(t){return {"S+":"#ff233d","S":"#ffd75a","S-":"#ffd75a","A+":"#b247ff","A":"#b247ff","A-":"#b247ff","B+":"#35d8ff","B":"#35d8ff","B-":"#35d8ff","C+":"#56ff5f","C":"#56ff5f","C-":"#56ff5f","D":"#8f8f8f"}[t]||"#ffd75a"}
function tierClass(t){return "tier-"+String(t).toLowerCase().replace("+","plus").replace("-","minus")}
const relevantNames=["Aerodactyl", "Farigiraf", "Froslass", "Dragapult", "Primarina", "Pelipper", "Hatterene", "Mimikyu", "Basculegion", "Hydreigon", "Scizor", "Archaludon", "Corviknight", "Glimmora", "Sableye", "Volcarona", "Meowscarada"];
function makeCard(p,grid){
  const c=document.createElement("article");
  c.className=`poke-card ${tierClass(p.tier)}`;
  c.style.setProperty("--c",colorForTier(p.tier));
  c.innerHTML=`<img src="${p.sprite}" onerror="this.style.display='none'"><div class="poke-info"><h3>${p.name}</h3><p>${p.role}</p><span class="tag">${p.tier}</span></div>`;
  c.onclick=()=>openBuild(p);
  grid.appendChild(c);
}
function renderTierGroups(container,list,compact=false){
  container.innerHTML="";
  const orderedTiers=["S+","S","S-","A+","A","A-","B+","B","B-","C+","C","C-","D"];
  orderedTiers.forEach(t=>{const group=list.filter(p=>p.tier===t);if(!group.length)return;const title=document.createElement("div");title.className="tier-subtitle";title.innerHTML=`<span>${t}</span>`;container.appendChild(title);const grid=document.createElement("div");grid.className=compact?"grid regular tier-grid-cards":"grid tier-grid-cards";container.appendChild(grid);group.forEach(p=>makeCard(p,grid));});
}
const manualOrder=(names)=>names.map(n=>byName[n]).filter(Boolean);
function currentFiltered(){const q=(document.getElementById('searchBox')?.value||'').toLowerCase();const gf=document.getElementById('groupFilter')?.value||'';const tf=document.getElementById('tierFilter')?.value||'';const rf=document.getElementById('roleFilter')?.value||'';return pokemon.filter(p=>(!q||p.name.toLowerCase().includes(q))&&(!gf||p.group===gf)&&(!tf||p.tier===tf)&&(!rf||p.role===rf));}
function applyFilters(){const list=currentFiltered();renderTierGroups(metaCoreGrid,list.filter(p=>p.group==="Meta Core"),false);renderTierGroups(relevantGrid,list.filter(p=>p.group==="Pokémon Relevantes"),true);renderTierGroups(regularGrid,list.filter(p=>p.group==="Pokémon Reglamentarios"),true);}
if(document.getElementById('tierFilter')){["S+","S","S-","A+","A","A-","B+","B","B-","C+","C","C-","D"].forEach(t=>tierFilter.innerHTML+=`<option>${t}</option>`);[...new Set(pokemon.map(p=>p.role))].sort().forEach(r=>roleFilter.innerHTML+=`<option>${r}</option>`);[searchBox,groupFilter,tierFilter,roleFilter].forEach(el=>el.addEventListener('input',applyFilters));clearFilters.onclick=()=>{searchBox.value='';groupFilter.value='';tierFilter.value='';roleFilter.value='';applyFilters();};}
applyFilters();
function openBuild(p){modalPanel.style.setProperty("--mc",colorForTier(p.tier));modalImg.src=p.sprite;modalName.textContent=p.name;modalGroup.textContent=p.group;modalTier.textContent=p.tier;modalType.textContent=p.type;modalRole.textContent=p.role;modalAbility.textContent=p.ability;modalItem.textContent=p.item;modalNature.textContent=p.nature;modalEvs.textContent=p.evs;modalNotes.textContent=p.notes;modalMoves.innerHTML=p.moves.map(m=>`<span class="move">${m}</span>`).join(""); if(document.getElementById("modalBadges")){modalBadges.innerHTML=(p.badges||[]).map(b=>`<span class="badge">${b}</span>`).join("");} buildModal.classList.add("show");openSound&&openSound()}
closeModal.onclick=()=>buildModal.classList.remove("show");buildModal.onclick=e=>{if(e.target===buildModal)buildModal.classList.remove("show")};

teams.forEach((t,i)=>{const b=document.createElement("button");b.className="select-btn";b.innerHTML=`${i+1}. ${t.name}<br><small>${(t.tags||[]).join(" • ")}</small>`;b.onclick=()=>{document.querySelectorAll("#teamList .select-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");teamDetail.innerHTML=`<h3>${t.name}</h3><div>${(t.tags||[]).map(x=>`<span class='team-tag'>${x}</span>`).join("")}</div><p><b>Dificultad:</b> ${t.difficulty||"Media"}</p><p><b>Estilo:</b> ${t.style}</p><p>${t.plan}</p><div class="id-row"><span class="id-code">${t.id}</span><button class="copy-btn" onclick="navigator.clipboard&&navigator.clipboard.writeText('${t.id}')">Copiar ID</button></div><p><b>Leads:</b> ${(t.leads||[]).join(" · ")}</p><p><b>Win condition:</b> ${t.wincon||"Por definir"}</p><details><summary>Variantes</summary><ul>${(t.variants||[]).map(v=>`<li>${v}</li>`).join("")}</ul></details><div class="team-members">${t.members.map(n=>{const p=byName[n];return p?`<article class="member" onclick="openBuild(byName['${p.name}'])"><img src="${p.sprite}"><span>${n}</span></article>`:""}).join("")}</div>`};teamList.appendChild(b)}); if(teamList.firstChild) teamList.firstChild.click();
matchups.forEach((m,i)=>{const b=document.createElement("button");b.className="select-btn";b.textContent=`${i+1}. ${m.name}`;b.onclick=()=>{document.querySelectorAll("#matchupList .select-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");const t=teams.find(x=>x.name===m.name)||{};matchupDetail.innerHTML=`<h3>${m.name}</h3><div class="match-card"><b>Leads recomendados:</b><br>${(t.leads||[]).join("<br>")}</div><div class="match-card"><b>Gana mejor contra:</b><br>${m.best}</div><div class="match-card"><b>Sufre contra:</b><br>${m.worst}</div><div class="match-card"><b>Early game:</b><br>${m.early}</div><div class="match-card"><b>Mid game:</b><br>${m.mid}</div><div class="match-card"><b>Late game:</b><br>${m.late}</div><div class="match-card"><b>Errores comunes:</b><br>${m.errores}</div>`};matchupList.appendChild(b)}); if(matchupList.firstChild) matchupList.firstChild.click();
tierOrder.forEach(t=>{const list=pokemon.filter(p=>p.tier===t);if(!list.length)return;const box=document.createElement("div");box.className="tier-box";box.innerHTML=`<h3>${t} Tier</h3>`;list.forEach(p=>{const row=document.createElement("div");row.className=`tier-mon ${tierClass(p.tier)}`;row.innerHTML=`<img src="${p.sprite}" onerror="this.style.display='none'"><div><b>${p.name}</b><br><small>${p.role}</small></div>`;row.onclick=()=>openBuild(p);box.appendChild(row)});tierGrid.appendChild(box)});

pokemon.forEach(p=>{const o=document.createElement("option");o.value=p.name;o.textContent=p.name;speedMon.appendChild(o)});
function calcStat(base,ev,l,n){return Math.floor((Math.floor(((2*base+31+Math.floor(ev/4))*l)/100)+5)*n)}calcSpeedBtn.onclick=()=>{const raw=calcStat(100,+speedEV.value,+speedLevel.value,+speedNature.value);speedResult.innerHTML=`Velocidad estimada: <b>${raw}</b><br>Con modificador: <b>${Math.floor(raw*+speedMod.value)}</b>.`};calcDmgBtn.onclick=()=>{const l=+dmgLevel.value,a=+atkStat.value,d=+defStat.value,p=+power.value,m=+dmgMod.value,base=Math.floor(Math.floor(Math.floor((2*l/5+2)*p*a/d)/50)+2),min=Math.floor(base*.85*m),max=Math.floor(base*m);dmgResult.innerHTML=`Rango aproximado: <b>${min} - ${max}</b> PS.<br>Para precisión real usa Showdown Champions Calc.`}
const canvas=particles,ctx=canvas.getContext("2d");let W,H,parts=[];function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}onresize=resize;resize();for(let i=0;i<120;i++)parts.push({x:Math.random()*W,y:Math.random()*H,r:1+Math.random()*3,v:.4+Math.random()*1.8,h:Math.random()<.5?42:195,a:.2+Math.random()*.6});function loop(){ctx.clearRect(0,0,W,H);ctx.globalCompositeOperation="lighter";for(const p of parts){p.y-=p.v;if(p.y<-20){p.y=H+20;p.x=Math.random()*W}const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*7);g.addColorStop(0,`hsla(${p.h},100%,65%,${p.a})`);g.addColorStop(1,"transparent");ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,p.r*7,0,Math.PI*2);ctx.fill()}requestAnimationFrame(loop)}loop();

(function(){
  function tierClassLocal(t){return "tier-"+String(t).toLowerCase().replace("+","plus").replace("-","minus")}
  function renderHomePicks(){
    const names=["Charizard Y","Garchomp","Incineroar","Kingambit","Floette Flor Eterna","Aerodactyl"];
    const box=document.getElementById("homeTopPicks");
    if(!box || typeof byName==="undefined") return;
    box.innerHTML=names.map(n=>{
      const p=byName[n];
      if(!p) return "";
      return `<article class="top-pick-card ${tierClassLocal(p.tier)}" onclick="openBuild(byName['${p.name}'])">
        <img src="${p.sprite}" onerror="this.style.display='none'">
        <strong>${p.name}</strong>
        <small>${p.tier} • ${p.role||""}</small>
      </article>`;
    }).join("");
  }
  document.addEventListener("click", function(e){
    const b=e.target.closest("[data-jump]");
    if(!b) return;
    const target=b.getAttribute("data-jump");
    const nav=[...document.querySelectorAll(".navbtn")].find(x=>x.dataset.target===target);
    if(nav) nav.click();
  });
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", renderHomePicks);
  else setTimeout(renderHomePicks, 50);
})();

(function(){
  const quotes = [
    "El meta cambia.<br>ASCEND evoluciona antes que él.",
    "No se trata de copiar equipos.<br>Se trata de entender por qué ganan.",
    "Los campeones no siguen tendencias.<br>Las crean.",
    "Cada turno importa.<br>Cada decisión define la partida.",
    "El verdadero meta empieza<br>cuando entiendes el juego.",
    "No basta con jugar mejor.<br>Debes pensar más rápido.",
    "La diferencia entre ganar y perder<br>es entender el tempo.",
    "El ladder cambia cada día.<br>La preparación marca la diferencia.",
    "Construido para competir.<br>Diseñado para evolucionar.",
    "La unión crea campeones.<br>La estrategia los mantiene arriba.",
    "El meta nunca espera.<br>ASCEND tampoco.",
    "Antes del movimiento perfecto<br>existe la lectura correcta.",
    "La presión gana turnos.<br>La disciplina gana torneos.",
    "No juegues el meta.<br>Contrólalo.",
    "El conocimiento construye ventaja.<br>ASCEND la convierte en victorias.",
    "Una visión.<br>Cuatro mentes.<br>Un solo objetivo.",
    "Donde la estrategia<br>se convierte en resultados.",
    "Preparación.<br>Adaptación.<br>Dominio.",
    "El meta cambia.<br>La mentalidad competitiva permanece.",
    "La diferencia no está en el Pokémon.<br>Está en quién lo entiende mejor."
  ];

  let quoteIndex = 0;
  let quotePaused = false;
  const quoteLine = document.getElementById("quoteLine");
  const quoteBox = document.getElementById("quoteCarousel");

  function showQuote(i){
    if(!quoteLine) return;
    quoteLine.classList.add("fade-out");
    setTimeout(()=>{
      quoteLine.innerHTML = quotes[i];
      quoteLine.classList.remove("fade-out");
    }, 650);
  }

  if(quoteLine){
    quoteLine.innerHTML = quotes[0];
    if(quoteBox){
      quoteBox.addEventListener("mouseenter",()=>quotePaused=true);
      quoteBox.addEventListener("mouseleave",()=>quotePaused=false);
    }
    setInterval(()=>{
      if(quotePaused) return;
      quoteIndex = (quoteIndex + 1) % quotes.length;
      showQuote(quoteIndex);
    }, 10000);
  }

  // Navegación de Pokémon dentro del modal
  let currentPokemonIndex = -1;

  function getCurrentPokemonList(){
    if(typeof pokemon === "undefined") return [];
    const cards = [...document.querySelectorAll("#metaCoreGrid .poke-card, #relevantGrid .poke-card, #regularGrid .poke-card")];
    const names = cards.map(card => {
      const h = card.querySelector(".poke-info h3");
      return h ? h.textContent.trim() : "";
    }).filter(Boolean);
    if(names.length && typeof byName !== "undefined"){
      return names.map(n => byName[n]).filter(Boolean);
    }
    return pokemon;
  }

  const originalOpenBuild = window.openBuild || openBuild;
  window.openBuild = function(p){
    const list = getCurrentPokemonList();
    currentPokemonIndex = list.findIndex(x => x && p && x.name === p.name);
    if(currentPokemonIndex < 0 && typeof pokemon !== "undefined"){
      currentPokemonIndex = pokemon.findIndex(x => x.name === p.name);
    }
    originalOpenBuild(p);
  };

  function movePokemon(dir){
    const modal = document.getElementById("buildModal");
    if(!modal || !modal.classList.contains("show")) return;
    const list = getCurrentPokemonList();
    if(!list.length) return;

    if(currentPokemonIndex < 0){
      const currentName = document.getElementById("modalName")?.textContent?.trim();
      currentPokemonIndex = list.findIndex(x => x.name === currentName);
    }

    currentPokemonIndex = (currentPokemonIndex + dir + list.length) % list.length;
    window.openBuild(list[currentPokemonIndex]);
  }

  const prev = document.getElementById("prevPokemon");
  const next = document.getElementById("nextPokemon");
  if(prev) prev.addEventListener("click", e=>{e.stopPropagation(); movePokemon(-1);});
  if(next) next.addEventListener("click", e=>{e.stopPropagation(); movePokemon(1);});

  document.addEventListener("keydown", e=>{
    const modal = document.getElementById("buildModal");
    if(!modal || !modal.classList.contains("show")) return;

    if(e.key === "ArrowLeft"){
      e.preventDefault();
      movePokemon(-1);
    }
    if(e.key === "ArrowRight"){
      e.preventDefault();
      movePokemon(1);
    }
    if(e.key === "Escape"){
      e.preventDefault();
      modal.classList.remove("show");
    }
  });
})();

// Exportes globales para eventos inline generados dinámicamente.
if (typeof openBuild !== "undefined") window.openBuild = openBuild;
if (typeof renderBundleTeam !== "undefined") window.renderBundleTeam = renderBundleTeam;
if (typeof renderBundleMatchup !== "undefined") window.renderBundleMatchup = renderBundleMatchup;

}).catch(err => {
  console.error('Error cargando datos ASCEND:', err);
});



// Mobile app navigation
(function(){
  const body = document.body;
  const toggle = document.getElementById("mobileMenuToggle");
  const closeBtn = document.getElementById("mobileMenuClose");
  const overlay = document.getElementById("mobileOverlay");

  function openMenu(){ body.classList.add("mobile-menu-open"); }
  function closeMenu(){ body.classList.remove("mobile-menu-open"); }

  if(toggle) toggle.addEventListener("click", openMenu);
  if(closeBtn) closeBtn.addEventListener("click", closeMenu);
  if(overlay) overlay.addEventListener("click", closeMenu);

  document.addEventListener("click", function(e){
    const btn = e.target.closest(".navbtn");
    if(btn && window.innerWidth <= 900){
      setTimeout(closeMenu, 120);
    }
  });

  document.addEventListener("keydown", function(e){
    if(e.key === "Escape") closeMenu();
  });
})();



// ASCEND Mobile Stability Patch v1
(function(){
  const body = document.body;

  // Observe modal visibility to lock body scroll safely on mobile.
  const modal = document.getElementById("buildModal");
  if(modal){
    const syncModalState = () => {
      body.classList.toggle("modal-open", modal.classList.contains("show"));
    };
    new MutationObserver(syncModalState).observe(modal, {attributes:true, attributeFilter:["class"]});
    syncModalState();

    modal.addEventListener("click", function(e){
      if(e.target === modal){
        modal.classList.remove("show");
        body.classList.remove("modal-open");
      }
    });
  }

  // Prevent iOS double-tap zoom on key UI buttons.
  document.addEventListener("touchend", function(e){
    const actionable = e.target.closest("button,.navbtn,.poke-card,.member,.modal-nav,.close");
    if(actionable) actionable.blur && actionable.blur();
  }, {passive:true});

  // Extra safe close behavior.
  const closeModalBtn = document.getElementById("closeModal");
  if(closeModalBtn && modal){
    closeModalBtn.addEventListener("click", function(){
      modal.classList.remove("show");
      body.classList.remove("modal-open");
    });
  }
})();
