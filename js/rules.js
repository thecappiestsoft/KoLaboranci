// KoLaboranci © 2026 CappySoft.pl
// Mechanika: premie, kradzież/niszczenie, efekty pierwiastków (EFF), sprzęt,
// reakcje specjalne, sprawdzanie wymagań i przeprowadzanie reakcji z quizem równań.

// ---------- core actions ----------
const elName=c=>`${tr(c.name)} (${c.sym})`;
function actBonus(p,slot){
  const g=slot.card.g;let b=0;
  if(p.leader.id==='davy'&&g==='alk')b++;
  if(p.leader.id==='ram'&&g==='gaz')b++;
  if(p.leader.id==='czo'&&g==='prz')b++;
  if(has(p,'r_mg')&&g==='zal')b++;if(has(p,'r_na')&&g==='alk')b++;if(has(p,'r_h2o')&&g==='nme')b++;
  if(has(p,'r_fe')&&g==='prz')b++;if(has(p,'r_xef4')&&g==='gaz')b++;if(has(p,'r_photo'))b++;
  const e=slot.equip&&slot.equip.id;
  if(e==='okulary'||e==='termometr')b++;if(e==='palnik')b+=2;if(e==='zanieczyszczenie')b-=2;
  return b;
}
function reactBonus(p){let b=0;if(p.leader.id==='curie')b++;if(has(p,'r_ch4'))b++;b+=p.lab.filter(s=>s.equip&&s.equip.id==='katalizator').length;return b}
function canSteal(owner,s){return s.card.g!=='gaz'&&!(s.equip&&s.equip.id==='fartuch')&&!isProt(s)&&!(s.card.g==='zal'&&has(owner,'r_cao'))}
function canDestroy(owner,s){return s.card.sym!=='Au'&&!(s.equip&&s.equip.id==='rekawice')&&!isProt(s)&&!(s.card.g==='prz'&&has(owner,'r_cu'))}
function oppSlots(p,f){const out=[];opps(p).forEach(o=>o.lab.forEach(s=>{if(f(o,s))out.push({owner:o,slot:s})}));return out}
function botPickSlot(list){
  if(!list.length)return null;
  // prefer leader's elements whose group they have only once
  return list.slice().sort((x,y)=>{const sx=score(x.owner)*10+(x.owner.lab.filter(s=>s.card.g===x.slot.card.g).length===1?5:0)+x.slot.card.thr*.1;const sy=score(y.owner)*10+(y.owner.lab.filter(s=>s.card.g===y.slot.card.g).length===1?5:0)+y.slot.card.thr*.1;return sy-sx})[0];
}
async function chooseOppSlot(p,f,title){const list=oppSlots(p,f);if(!list.length){log(t('noTarget'));return null}return p.isHuman?pickSlot(title,list):botPickSlot(list)}
function steal(thief,owner,slot){owner.lab.splice(owner.lab.indexOf(slot),1);slot.used=true;slot.prot=0;thief.lab.push(slot);log(t('logSteal',{name:thief.name,el:elName(slot.card),owner:owner.name}),'no')}
function destroy(owner,slot){owner.lab.splice(owner.lab.indexOf(slot),1);discardCard(slot.card);if(slot.equip)discardCard(slot.equip);log(t('logLose',{name:owner.name,el:elName(slot.card)}),'no');if(owner.leader.id==='lav')draw(owner,1)}
async function loseCards(p,n,title){
  if(p.isHuman&&G.multi&&!(p===human()&&G.handVisible)&&p.hand.length)return asPlayer(p,t('mustDiscard',{name:esc(p.name),n}),()=>loseCards(p,n,title));
  for(let i=0;i<n&&p.hand.length;i++){
    let c;
    if(p.isHuman){render();c=await pickCard(title||t('discardN',{i:i+1,n}),p.hand)}
    else c=p.hand.slice().sort((a,b)=>val(a)-val(b))[0];
    p.hand.splice(p.hand.indexOf(c),1);discardCard(c);
    log(t('logDiscards',{name:p.name,card:tr(c.name)}));
  }
}
function val(c){return {mod:2,ch:3,eq:2.5,sp:3,el:4}[c.kind]+Math.random()}
async function takeFrom(p,list,filterTitle){ // from discard
  if(!list.length){log(t('noSuitableDiscard'));return null}
  let c=p.isHuman?await pickCard(filterTitle,list):list.slice().sort((a,b)=>val(b)-val(a))[0];
  G.discard.splice(G.discard.indexOf(c),1);p.hand.push(c);log(t('logTakesDiscard',{name:p.name,card:tr(c.name)}));return c;
}

const EFF={
 async stealHand(p){const o=await pickPlayer(p,t('qStealHandWho'),opps(p).filter(x=>x.hand.length));if(!o)return log(t('nobodyCards'));const c=o.hand.splice(rnd(o.hand.length),1)[0];p.hand.push(c);log(t('logStealHand',{name:p.name,other:o.name}))},
 async stealEl(p){const x=await chooseOppSlot(p,canSteal,t('qStealEl'));if(x)steal(p,x.owner,x.slot)},
 async stealElDraw(p){await EFF.stealEl(p);draw(p,1)},
 async stealEl2(p){await EFF.stealEl(p);render();await EFF.stealEl(p)},
 async peekTake(p){const o=await pickPlayer(p,t('qPeekWho'),opps(p).filter(x=>x.hand.length));if(!o)return log(t('nobodyCards'));let c=p.isHuman?await pickCard(t('qPeekTake',{name:esc(o.name)}),o.hand):o.hand.slice().sort((a,b)=>val(b)-val(a))[0];o.hand.splice(o.hand.indexOf(c),1);p.hand.push(c);log(t('logPeek',{name:p.name,other:o.name}))},
 async draw1(p){draw(p,1)},async draw2(p){draw(p,2)},async draw3(p){draw(p,3)},
 async drawPlay(p){const [c]=draw(p,1);if(c&&c.kind==='el'){log(t('logIsElement',{el:tr(c.name)}),'ok');p.hand.splice(p.hand.indexOf(c),1);await placeElement(p,c)}},
 async freePlay(p){const els=p.hand.filter(c=>c.kind==='el');if(!els.length)return log(t('noElInHand'));const c=p.isHuman?await pickCard(t('qWhichElPlay'),els,{cancel:t('none')}):botBestElement(p,els);if(!c)return;p.hand.splice(p.hand.indexOf(c),1);await placeElement(p,c)},
 async draw3disc1(p){draw(p,3);await loseCards(p,1,t('discard1'))},
 async destroyDraw(p){await EFF.destroy(p);draw(p,1)},
 async destroy(p){const x=await chooseOppSlot(p,canDestroy,t('qDestroyEl'));if(x)destroy(x.owner,x.slot)},
 async disc2(p){const o=await pickPlayer(p,t('qWhoDisc2'),opps(p).filter(x=>x.hand.length));if(o)await loseCards(o,2,t('mustDiscardCard'))},
 async disc1(p){const o=await pickPlayer(p,t('qWhoDisc1'),opps(p).filter(x=>x.hand.length));if(o)await loseCards(o,1,t('mustDiscardCard'))},
 async allDisc1(p){for(const o of opps(p))await loseCards(o,1,t('mustDiscardCard'))},
 async takeMod(p){const c=await takeFrom(p,G.discard.filter(c=>c.kind==='mod'),t('takeModTitle'));if(!c)draw(p,1)},
 async protect(p){if(!p.lab.length)return;let s=p.isHuman?(await pickSlot(t('qProtect'),p.lab.map(slot=>({owner:p,slot})))).slot:p.lab.slice().sort((a,b)=>b.card.thr-a.card.thr)[0];s.prot=G.turn+G.players.length;log(t('logProtected',{el:tr(s.card.name)}),'ok')},
 async takeDiscard(p){const c=await takeFrom(p,G.discard.slice(),t('takeDiscardTitle'));if(!c)draw(p,1)},
 async revive(p){const els=G.discard.filter(c=>c.kind==='el');if(!els.length)return log(t('noElDiscard'));let c=p.isHuman?await pickCard(t('qRevive'),els):botBestElement(p,els);G.discard.splice(G.discard.indexOf(c),1);await placeElement(p,c)},
 async destroyEquip(p){
   const list=[];G.players.forEach(o=>o.lab.forEach(s=>{if(s.equip&&((o!==p&&!s.equip.curse)||(o===p&&s.equip.curse)))list.push({owner:o,slot:s})}));
   if(!list.length)return log(t('noEquipToDestroy'));
   const x=p.isHuman?await pickSlot(t('qWhoseEquip'),list):(list.find(l=>l.owner===p)||list[0]);
   log(t('logEquipDestroyed',{eq:tr(x.slot.equip.name),owner:x.owner.name}),'no');discardCard(x.slot.equip);x.slot.equip=null},
 async discDraw(p){await EFF.disc1(p);draw(p,1)},
 async takeEquip(p){const c=await takeFrom(p,G.discard.filter(c=>c.kind==='eq'&&!c.curse),t('takeEquipTitle'));if(!c)draw(p,1)},
 async moveEquip(p){
   const mine=p.lab.filter(s=>!s.equip);if(!mine.length)return log(t('noFreeEl'));
   const list=oppSlots(p,(o,s)=>s.equip&&!s.equip.curse);if(!list.length)return log(t('oppNoEquip'));
   const x=p.isHuman?await pickSlot(t('qWhichEquip'),list):list[0];
   const to=p.isHuman?(await pickSlot(t('qOntoWhich'),mine.map(slot=>({owner:p,slot})))).slot:mine[0];
   to.equip=x.slot.equip;x.slot.equip=null;log(t('logTakesEquip',{name:p.name,eq:tr(to.equip.name)}))},
 async drawAg(p){const [c]=draw(p,1);if(c&&c.kind==='mod')draw(p,1)}
};
function botBestElement(p,els){const g=groupsOf(p);return els.slice().sort((a,b)=>(g.has(a.g)?1:0)-(g.has(b.g)?1:0)||a.thr-b.thr)[0]}

async function placeElement(p,card){
  const slot={card,equip:null,used:false,prot:0};
  p.lab.push(slot);log(t('logPlace',{name:p.name,el:elName(card)}));render();
  if(checkWin())return;
  await activate(p,slot,true);
}
async function activate(p,slot,free){
  if(slot.used)return;
  if(!free){const cost=slot.equip&&slot.equip.id==='pipeta'?0:1;G.ap-=cost}
  slot.used=true;render();
  const total=await rollCheck(p,actBonus(p,slot),slot.card.thr,t('activation',{sym:slot.card.sym}));
  if(total>=slot.card.thr){if(p.isHuman)burst(slot.card.sym+'!');log(t('logActOk',{eff:tr(EFFTEXT[slot.card.eff])}),'ok');await EFF[slot.card.eff](p,slot);if(p.leader.id==='moi'&&slot.card.g==='hal')draw(p,1)}
  else log(t('logActFail'),'no');
  render();checkWin();
}
async function playElement(p,card){
  G.ap-=1;p.hand.splice(p.hand.indexOf(card),1);render();
  if(await challenge(p,card)){discardCard(card);render();return}
  await placeElement(p,card);
}
function eqTargets(p,card){return card.curse?oppSlots(p,(o,s)=>!s.equip):p.lab.filter(s=>!s.equip).map(slot=>({owner:p,slot}))}
async function playEquip(p,card,target){
  const free=has(p,'r_h2o2')&&!G.freeEq; if(free)G.freeEq=true; else G.ap-=1;
  p.hand.splice(p.hand.indexOf(card),1);render();
  if(await challenge(p,card)){discardCard(card);render();return}
  if(!G.players.some(o=>o.lab.includes(target.slot))||target.slot.equip){discardCard(card);return}
  target.slot.equip=card;
  log(t(target.owner!==p?'logEquipOn':'logEquip',{name:p.name,eq:tr(card.name),el:tr(target.slot.card.name),owner:target.owner.name}),card.curse?'no':'');
  render();
}
function spValid(p,c){
  switch(c.id){
   case 'elektroliza':return oppSlots(p,canDestroy).length>0;
   case 'wymiana':return p.lab.length>0&&oppSlots(p,canSteal).length>0;
   case 'destylacja':return G.discard.length>0;
   case 'korozja':return oppSlots(p,(o,s)=>s.equip&&!s.equip.curse).length>0;
  }return true;
}
async function playSpecial(p,c){
  G.ap-=1;p.hand.splice(p.hand.indexOf(c),1);render();
  log(t('logSpecial',{name:p.name,card:tr(c.name)}));
  if(await challenge(p,c)){discardCard(c);render();return}
  discardCard(c);
  switch(c.id){
   case 'uklad':{
     if(G.deck.length<5&&G.discard.length){G.deck=G.deck.concat(shuffle(G.discard.filter(x=>x!==c)));G.discard=[c]}
     const top=G.deck.splice(0,5);
     for(let i=0;i<2&&top.length;i++){const k=p.isHuman?await pickCard(t('takeCardN',{i:i+1}),top):top.slice().sort((a,b)=>val(b)-val(a))[0];top.splice(top.indexOf(k),1);p.hand.push(k)}
     G.deck=G.deck.concat(top);log(t('logTop2',{name:p.name}));break}
   case 'elektroliza':await EFF.destroy(p);break;
   case 'wymiana':{
     const x=await chooseOppSlot(p,canSteal,t('qOppElTake'));if(!x)break;
     const mine=p.isHuman?(await pickSlot(t('qMyElGive'),p.lab.map(slot=>({owner:p,slot})))).slot:p.lab.slice().sort((a,b)=>(p.lab.filter(s=>s.card.g===b.card.g).length)-(p.lab.filter(s=>s.card.g===a.card.g).length))[0];
     x.owner.lab.splice(x.owner.lab.indexOf(x.slot),1);p.lab.splice(p.lab.indexOf(mine),1);x.owner.lab.push(mine);p.lab.push(x.slot);x.slot.used=true;
     log(t('logSwap',{name:p.name,a:mine.card.sym,b:x.slot.card.sym,owner:x.owner.name}));break}
   case 'destylacja':{for(let i=0;i<2;i++){const k=await takeFrom(p,G.discard.filter(x=>x!==c),t('takeDiscardTitle'));if(!k)break}break}
   case 'wybuch':for(const o of G.players)await loseCards(o,2,t('explosionDiscard'));break;
   case 'synteza':draw(p,2);break;
   case 'wietrzenie':{const gifts=G.players.map(o=>o.hand.length?o.hand.splice(rnd(o.hand.length),1)[0]:null);gifts.forEach((g,i)=>{if(g)G.players[(i+1)%G.players.length].hand.push(g)});log(t('logPassLeft'));break}
   case 'korozja':{const list=oppSlots(p,(o,s)=>s.equip&&!s.equip.curse);if(list.length){const x=p.isHuman?await pickSlot(t('qEquipDestroy'),list):list[0];log(t('logCorrode',{eq:tr(x.slot.equip.name),owner:x.owner.name}),'no');discardCard(x.slot.equip);x.slot.equip=null}draw(p,1);break}
  }
  render();checkWin();
}

// requirement matching
function reqMet(p,r){
  const units=[{g:p.leader.g,wild:false}];
  p.lab.forEach(s=>{const u={g:s.card.g,wild:s.card.g==='gaz'&&has(p,'r_xef4')};units.push(u);if(s.equip&&s.equip.id==='zlewka')units.push({...u})});
  const slots=[];r.req.forEach(([g,n])=>{for(let i=0;i<n;i++)slots.push(g)});
  slots.sort((a,b)=>(a==='any')-(b==='any'));
  const used=new Array(units.length).fill(false);
  const bt=i=>{if(i===slots.length)return true;for(let k=0;k<units.length;k++){if(used[k])continue;const u=units[k];if(slots[i]==='any'||u.g===slots[i]||u.wild){used[k]=true;if(bt(i+1))return true;used[k]=false}}return false};
  return bt(0);
}
function reqGroupOk(p,g){return g==='any'?true:(p.leader.g===g||p.lab.some(s=>s.card.g===g||(s.card.g==='gaz'&&has(p,'r_xef4'))))}
async function attemptReaction(p,r){
  G.ap-=2;render();
  const rname=tr(r.name);
  log(t('logTry',{name:p.name,r:rname}),'t');
  let quiz=false;
  if(p.isHuman){
    const opts=shuffle([{label:r.ok,value:true,cls:'btn quizopt'},...r.wrong.map(w=>({label:w,value:false,cls:'btn quizopt'}))]);
    opts.push({label:t('skipTask'),value:null,cls:'btn'});
    const ans=await ask(t('quizTitle'),t('quizBody',{r:esc(rname),q:r.q}),opts);
    if(ans===true){quiz=true;log(t('logQuizOk'),'ok');burst('+2')}
    else if(ans===false){log(t('logQuizBad',{ok:r.ok}),'no');await ask(t('almost'),`<p>${t('correctIs')}</p><p class="eqn" style="font-size:16px">${r.ok}</p>`,[{label:t('rollDiceBtn'),value:1,primary:true}])}
  }else{quiz=Math.random()<.6;if(quiz)log(t('logBotQuiz',{name:p.name,ok:r.ok}),'ok')}
  const total=await rollCheck(p,reactBonus(p)+(quiz?2:0),r.win,rname,[r.fail+1]);
  if(total>=r.win){
    G.center.splice(G.center.indexOf(r),1);p.done.push(r);if(G.rdeck.length)G.center.push(G.rdeck.shift());
    log(t('logReactOk',{name:p.name,reward:tr(r.rtext)}),'ok');burst(t(p.isHuman?'burstReactOk':'burstReactRival'),!p.isHuman);
  }else if(total<=r.fail){
    log(t('logReactBad',{name:p.name,pen:tr(PENTEXT[r.pen])}),'no');burst(t('burstFailed'),true);
    if(r.pen==='disc1')await loseCards(p,1,t('penDisc1'));
    if(r.pen==='disc2')await loseCards(p,2,t('penDiscard'));
    if(r.pen==='destroy1'&&p.lab.length){const s=p.isHuman?(await pickSlot(t('penWhichEl'),p.lab.map(slot=>({owner:p,slot})))).slot:p.lab.slice().sort((a,b)=>p.lab.filter(x=>x.card.g===b.card.g).length-p.lab.filter(x=>x.card.g===a.card.g).length)[0];destroy(p,s)}
  }else log(t('logReactNone'));
  render();checkWin();
}
