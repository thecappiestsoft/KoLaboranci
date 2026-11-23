// KoLaboranci © 2026 CappySoft.pl
// Ekran nowej gry, okno zasad, przełączniki języka i motywu oraz uruchomienie gry (ładowany jako ostatni).

// ---------- setup & rules ----------
function openSetup(){
  const root=$('#modalRoot');
  const TYPES=[['human','seatHuman'],['bot','seatBot'],['none','seatNone']];
  const draw=()=>{
    const active=SETTINGS.seats.filter(x=>x.type!=='none');
    const humans=active.filter(x=>x.type==='human').length;
    const err=active.length<2?t('needTwo'):humans<1?t('needHuman'):'';
    root.innerHTML=`<div class="scrim"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="st"><h3 id="st">${t('newGame')}</h3>
      <p style="margin-top:0">${t('setupIntro')}</p>
      <div class="seats">${SETTINGS.seats.map((st,i)=>`<div class="seat ${st.type}">
        <div class="seat-head"><span class="label">${t('seat',{n:i+1})}</span>
          <div class="seg">${TYPES.map(([ty,k])=>`<button class="${st.type===ty?'sel':''}" data-seat="${i}" data-t="${ty}">${t(k)}</button>`).join('')}</div></div>
        ${st.type==='human'?`<div class="seat-row"><label for="nm${i}" class="label">${t('nameLabel')}</label><input id="nm${i}" data-name="${i}" maxlength="18" value="${esc(st.name)}" placeholder="${esc(t('playerN',{n:i+1}))}"></div>`:''}
        ${st.type!=='none'?`<div class="seat-row"><label for="ld${i}" class="label">${t('leaderLabel')}</label><select id="ld${i}" data-lead="${i}"><option value="random">${t('random')}</option>${LEADERS.map(l=>`<option value="${l.id}" ${st.leader===l.id?'selected':''}>${l.name} · ${tr(GROUPS[l.g].short)}</option>`).join('')}</select></div>
          ${st.leader!=='random'?`<div class="reward">${tr(LEADERS.find(l=>l.id===st.leader).text)}</div>`:''}`:''}
      </div>`).join('')}</div>
      <div class="label">${t('variant')}</div>
      <div class="seg" id="segVar"><button class="${SETTINGS.short?'sel':''}" data-v="1">${t('variantShortBtn')}</button><button class="${!SETTINGS.short?'sel':''}" data-v="0">${t('variantFullBtn')}</button></div>
      ${err?`<p style="color:var(--bad);font-weight:700">${err}</p>`:''}
      <div class="opts"><button class="btn primary" id="goBtn" ${err?'disabled':''}>${t('startGame')}</button><button class="btn" id="cancelBtn">${t('cancel')}</button></div></div></div>`;
    root.querySelectorAll('[data-seat]').forEach(b=>b.onclick=()=>{const st=SETTINGS.seats[+b.dataset.seat];st.type=b.dataset.t;draw()});
    root.querySelectorAll('[data-name]').forEach(inp=>inp.oninput=()=>{SETTINGS.seats[+inp.dataset.name].name=inp.value});
    root.querySelectorAll('[data-lead]').forEach(sel=>sel.onchange=()=>{SETTINGS.seats[+sel.dataset.lead].leader=sel.value;draw()});
    root.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{SETTINGS.short=b.dataset.v==='1';draw()});
    $('#goBtn').onclick=()=>{root.innerHTML='';newGame()};
    $('#cancelBtn').onclick=()=>{root.innerHTML=''};
  };
  draw();
}
function openRules(){
  ask(t('rulesTitle'),`<div class="rules">${t('rulesHtml')}</div>`,[{label:t('letsGo'),value:1,primary:true}]);
}

// Start: napisy, przełączniki i pierwsza gra.
applyStatic();
$('#d1').innerHTML=dieHTML(3);$('#d2').innerHTML=dieHTML(4);
$('#newBtn').onclick=()=>{if(G&&G.busy&&!G.over)return;openSetup()};
$('#rulesBtn').onclick=openRules;
document.querySelectorAll('[data-theme-set]').forEach(b=>b.onclick=()=>setTheme(b.dataset.themeSet));
document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
newGame();
