// KoLaboranci © 2026 CappySoft.pl
// Obsługa kliknięć gracza (zagraj, aktywuj, przeprowadź reakcję, dobierz, zakończ turę).

// ---------- human input ----------
async function act(fn){
  if(G.busy||G.over||!cur().isHuman||cur()!==human()||!G.handVisible)return;
  G.busy=true;render();
  try{await fn()}catch(e){console.error(e)}
  G.busy=false;render();checkWin();
}
function humanPlay(uid){
  const p=human();const c=p.hand.find(x=>x.uid===uid);if(!c)return;
  act(async()=>{
    if(c.kind==='el'){if(G.ap<1)return;await playElement(p,c)}
    else if(c.kind==='eq'){
      const free=has(p,'r_h2o2')&&!G.freeEq;if(G.ap<1&&!free)return;
      const tg=eqTargets(p,c);if(!tg.length){await ask(t('noTargetTitle'),`<p>${t(c.curse?'noTargetCurse':'noTargetEquip')}</p>`,[{label:'OK',value:1,primary:true}]);return}
      const x=await pickSlot(t(c.curse?'qOnWhose':'qOnWhich'),tg,{cancel:t('cancel')});if(!x)return;await playEquip(p,c,x)}
    else if(c.kind==='sp'){if(G.ap<1)return;if(!spValid(p,c)){await ask(t('notNow'),`<p>${t('noTargetNow')}</p>`,[{label:'OK',value:1,primary:true}]);return}await playSpecial(p,c)}
  });
}
function humanActivate(i){const p=human();const s=p.lab[i];act(async()=>{const cost=s.equip&&s.equip.id==='pipeta'?0:1;if(s.used||G.ap<cost)return;await activate(p,s,false)})}
function humanReact(uid){const p=human();const r=G.center.find(x=>x.uid===uid);act(async()=>{if(!r||G.ap<2||!reqMet(p,r))return;await attemptReaction(p,r)})}
function humanDraw(){act(async()=>{if(G.ap<1)return;draw(human(),1);G.ap-=1})}
function humanRedraw(){act(async()=>{if(G.ap<3)return;const p=human();G.discard.push(...p.hand);p.hand=[];draw(p,5);log(t('logRedraw',{name:p.name}));G.ap=0})}
function humanEnd(){if(G.busy||G.over||!cur().isHuman||cur()!==human())return;G.busy=true;render();endTurn().then(()=>{G.busy=false;render()})}
