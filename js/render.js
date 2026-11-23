// KoLaboranci © 2026 CappySoft.pl
// Rysowanie stołu: rywale, reakcje na środku, twoje laboratorium i ręka.

// ---------- render ----------
function progressHTML(p){const g=groupsOf(p);return `<div class="progress">${GORDER.map(k=>`<span class="dot ${g.has(k)?'on':''}" style="${gv(k)}" title="${tr(GROUPS[k].name)}"></span>`).join('')}<span>&nbsp;${t('progress',{g:g.size,ng:G.needG,r:p.done.length,nr:G.needR})}</span></div>`}
function leaderChip(p){return `<span class="leaderchip" title="${esc(tr(p.leader.text))}"><span class="medal" style="${gv(p.leader.g)}">${p.leader.ini}</span>${esc(p.leader.name)}</span>`}
function render(){
  if(!G)return;
  const me=human(),myTurn=cur()===me&&!G.busy&&!G.over&&G.handVisible;
  $('#opps').innerHTML=G.players.filter(p=>p!==me).map(p=>`<div class="panel opp ${cur()===p&&!G.over?'active':''}">
    <div class="prow"><span class="pname">${esc(p.name)}</span><span class="label">${t(p.isHuman?'human':'computer')}</span>${leaderChip(p)}</div>
    <div class="prow" style="justify-content:space-between;margin-top:6px">${progressHTML(p)}<span class="handcount" title="${t('cardsInHandTitle')}">${'<i class="cardback"></i>'.repeat(Math.min(p.hand.length,9))}<span class="label">&nbsp;${p.hand.length}</span></span></div>
    <div class="minis">${p.lab.length?p.lab.map(miniHTML).join(''):`<span class="empty">${t('emptyLab')}</span>`}</div>
    ${p.done.length?`<div class="reward" style="margin-top:6px">${t('reactionsList')}: ${p.done.map(r=>esc(tr(r.name))).join(', ')}</div>`:''}
  </div>`).join('');
  $('#deckInfo').textContent=t('deckInfo',{d:G.deck.length,x:G.discard.length,r:G.rdeck.length});
  $('#center').innerHTML=G.center.map(r=>{const met=reqMet(me,r);return `<div class="rcard" style="--rc:var(--g-${r.g})"><div class="art">${rart(r.art,r.g)}</div><div class="body">
    <h3>${esc(tr(r.name))}</h3><span class="eqn">${r.q}</span>
    <div class="reqs">${r.req.map(([g,n])=>`<span class="req ${reqGroupOk(me,g)?'ok':''}" style="${g==='any'?'--g:var(--muted)':gv(g)}">${n}× ${g==='any'?t('any'):tr(GROUPS[g].short)}</span>`).join('')}</div>
    <div class="thr"><span class="w">${t('successThr',{n:r.win})}</span><span class="l">${t('failThr',{n:r.fail,pen:tr(PENTEXT[r.pen])})}</span></div>
    <div class="reward">${t('reward')}: <b>${esc(tr(r.rtext))}</b></div>
    <button class="btn ${met&&myTurn&&G.ap>=2?'primary':''} sm" data-react="${r.uid}" ${met&&myTurn&&G.ap>=2?'':'disabled'}>${t(met?'doReaction':'missingEls')}</button>
  </div></div>`}).join('')||`<p class="empty">${t('allReactionsDone')}</p>`;
  const apDots=[0,1,2].map(i=>`<i class="${i<G.ap&&cur()===me?'on':''}"></i>`).join('');
  const status=G.over?t('gameOver'):cur()===me?(G.busy?t('playing'):G.ap>0?(G.multi?t('yourTurnNamed',{name:esc(me.name)}):t('yourTurn')):t('noActions')):t('waitTurn',{name:esc(cur().name)});
  $('#me').className='panel me'+(cur()===me&&!G.over?' active':'');
  $('#me').innerHTML=`<div class="me-head"><div><h2>${G.multi?t('labOf',{name:esc(me.name)}):t('yourLab')}</h2><div class="prow">${leaderChip(me)}${progressHTML(me)}</div></div>
      <div class="prow"><span class="label">${t('actions')}</span><span class="ap">${apDots}</span></div></div>
    <div class="status">${status}</div>
    <div class="actions" style="margin:10px 0">
      <button class="btn" id="drawBtn" ${myTurn&&G.ap>=1?'':'disabled'}>${t('btnDraw')}</button>
      <button class="btn" id="redrawBtn" ${myTurn&&G.ap>=3?'':'disabled'}>${t('btnRedraw')}</button>
      <button class="btn primary" id="endBtn" ${myTurn?'':'disabled'}>${t('btnEnd')}</button>
    </div>
    <div class="label" style="margin-bottom:6px">${t('onBench',{group:tr(GROUPS[me.leader.g].name).toLowerCase(),text:esc(tr(me.leader.text))})}</div>
    <div class="lab">${me.lab.length?me.lab.map((s,i)=>{const cost=s.equip&&s.equip.id==='pipeta'?0:1;const ok=myTurn&&!s.used&&G.ap>=cost;return cardHTML(s.card,{slot:s,fact:false,foot:`<div class="foot"><button class="btn sm" data-act="${i}" ${ok?'':'disabled'}>${s.used?t('usedThisTurn'):t('activate',{n:cost})}</button></div>`})}).join(''):`<span class="empty">${t('emptyLabHint')}</span>`}</div>
    <div class="label" style="margin-bottom:6px">${G.multi?t('handOf',{name:esc(me.name)}):t('yourHand')} (${me.hand.length}/7)</div>
    <div class="hand">${!G.handVisible?`<span class="empty">${t('cardsHidden',{name:esc(me.name),n:me.hand.length})}</span>`:me.hand.map(c=>{let btn='';
      if(c.kind==='el')btn=`<button class="btn sm primary" data-play="${c.uid}" ${myTurn&&G.ap>=1?'':'disabled'}>${t('btnPlay')}</button>`;
      else if(c.kind==='eq'){const free=has(me,'r_h2o2')&&!G.freeEq;btn=`<button class="btn sm" data-play="${c.uid}" ${myTurn&&(G.ap>=1||free)?'':'disabled'}>${t('btnEquip',{n:free?0:1})}</button>`}
      else if(c.kind==='sp')btn=`<button class="btn sm" data-play="${c.uid}" ${myTurn&&G.ap>=1?'':'disabled'}>${t('btnUse')}</button>`;
      else btn=`<span class="label" style="flex:1;text-align:center;padding:5px 0">${t(c.kind==='mod'?'afterRoll':'onRivalPlay')}</span>`;
      return cardHTML(c,{foot:`<div class="foot">${btn}</div>`})}).join('')||`<span class="empty">${t('noCards')}</span>`}</div>`;
  $('#drawBtn').onclick=humanDraw;$('#redrawBtn').onclick=humanRedraw;$('#endBtn').onclick=humanEnd;
  document.querySelectorAll('[data-play]').forEach(b=>b.onclick=()=>humanPlay(+b.dataset.play));
  document.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>humanActivate(+b.dataset.act));
  document.querySelectorAll('[data-react]').forEach(b=>b.onclick=()=>humanReact(+b.dataset.react));
}
