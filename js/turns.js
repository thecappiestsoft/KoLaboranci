// KoLaboranci © 2026 CappySoft.pl
// Przebieg tury, prosta sztuczna inteligencja rywali i sprawdzanie zwycięstwa.

// ---------- turns ----------
async function startTurn(){
  if(G.over)return;
  const p=cur();G.ap=3;G.freeEq=false;p.lab.forEach(s=>s.used=false);
  if(G.multi){G.handVisible=false;render();
    if(p.isHuman){await ask(t('turnOf',{name:esc(p.name)}),`<p>${t('passDeviceTurn')}</p>`,[{label:t('iamShowCards',{name:esc(p.name)}),value:1,primary:true}]);G.viewer=p.idx;G.handVisible=true}}
  log(t('turnOf',{name:p.name}),'t');
  if(has(p,'r_salt'))draw(p,1);
  render();
  if(!p.isHuman){G.busy=true;render();await sleep(600);await botTurn(p);G.busy=false;await endTurn()}
}
async function endTurn(){
  if(G.over)return;
  const p=cur();
  if(p.hand.length>7){log(t('logTooMany',{name:p.name}));await loseCards(p,p.hand.length-7,t('limit7'))}
  G.turn++;G.cur=(G.cur+1)%G.players.length;
  await startTurn();
}
async function botTurn(p){
  let guard=0;
  while(G.ap>0&&!G.over&&guard++<12){
    await sleep(650);
    if(G.ap>=2){const r=G.center.filter(r=>reqMet(p,r)).sort((a,b)=>a.win-b.win)[0];
      if(r&&r.win-reactBonus(p)-1.2<=9){await attemptReaction(p,r);continue}}
    const els=p.hand.filter(c=>c.kind==='el');
    if(els.length){await playElement(p,botBestElement(p,els));continue}
    const sp=p.hand.find(c=>c.kind==='sp'&&spValid(p,c));
    if(sp){await playSpecial(p,sp);continue}
    const eq=p.hand.find(c=>c.kind==='eq'&&eqTargets(p,c).length);
    if(eq){const tg=eq.curse?botPickSlot(eqTargets(p,eq)):eqTargets(p,eq)[0];await playEquip(p,eq,tg);continue}
    const s=p.lab.find(s=>!s.used);
    if(s){await activate(p,s,false);continue}
    draw(p,1);G.ap-=1;render();
  }
}
function checkWin(){
  if(G.over)return true;
  for(const p of G.players){
    const g=groupsOf(p).size, r=p.done.length;
    if(g>=G.needG||r>=G.needR){
      G.over=true;G.busy=false;render();
      const why=r>=G.needR?t('whyReact',{n:r}):t('whyGroups',{n:g});
      log(t('logWins',{name:p.name,why}),'t');
      G.handVisible=true;setTimeout(()=>ask(p.isHuman&&!G.multi?t('youWin'):t('winner',{name:esc(p.name)}),`<p>${t('logWins',{name:esc(p.name),why})}</p><p>${t('reactionsDone')}: ${G.players.map(x=>`${esc(x.name)} ${x.done.length}`).join(' · ')}</p>`,[{label:t('playAgain'),value:'again',primary:true},{label:t('close'),value:null}]).then(v=>{if(v)openSetup()}),900);
      return true;
    }
  }
  return false;
}
