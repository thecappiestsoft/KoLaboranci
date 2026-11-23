// KoLaboranci © 2026 CappySoft.pl
// Karta „Recenzja naukowa!” – pojedynek na kości przeciw zagranej karcie.

// ---------- challenge ----------
async function challenge(p,card){
  const order=[...opps(p).filter(o=>o.isHuman),...opps(p).filter(o=>!o.isHuman)];
  const cname=esc(tr(card.name));
  for(const o of order){
    const chc=o.hand.find(c=>c.kind==='ch');if(!chc)continue;
    let go=false;
    if(o.isHuman){go=await asPlayer(o,t('chReason',{name:esc(p.name),card:cname}),()=>ask(t('chAsk'),`<p>${t('chBody',{name:esc(p.name),card:cname})}</p>`,[{label:t('chYes'),value:true,primary:true},{label:t('chNo'),value:false}]),true)}
    else go=Math.random()<(p.isHuman?.35:(p===leaderOf()?.25:.1));
    if(!go)continue;
    o.hand.splice(o.hand.indexOf(chc),1);discardCard(chc);
    log(t('logCh',{name:o.name,card:cname}),'no');
    await sleep(300);
    const [a,b]=await rollDice();const cb=(o.leader.id==='ram'?1:0);const cv=a+b+cb;
    await sleep(500);
    const [c,d]=await rollDice();const db=(p.leader.id==='ram'?1:0)+(has(p,'r_neut')?2:0);const dv=c+d+db;
    $('#rollinfo').innerHTML=`<div class="tot">${cv} : ${dv}</div><div>${t('chVs',{a:esc(o.name),b:esc(p.name)})}</div><div class="label">${t(cv>dv?'chRejected':'chPasses')}</div>`;
    log(t('logChRoll',{a:o.name,av:cv,b:p.name,bv:dv}));
    if(cv>dv){log(t('logChLost',{card:cname}),'no');burst(t('burstRejected'),true);return true}
    log(t('logChDefended',{name:p.name}),'ok');return false;
  }
  return false;
}
