// KoLaboranci © 2026 CappySoft.pl
// Kości 2k6, rzuty z modyfikatorami i okno zagrywania kart Warunków reakcji.

// ---------- dice ----------
const PIPS={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
function dieHTML(n){let h='';for(let i=0;i<9;i++)h+=PIPS[n].includes(i)?'<span></span>':'<i></i>';return h}
async function rollDice(){
  const a=1+rnd(6),b=1+rnd(6);
  const d1=$('#d1'),d2=$('#d2');
  d1.classList.remove('roll');d2.classList.remove('roll');void d1.offsetWidth;d1.classList.add('roll');d2.classList.add('roll');
  for(let i=0;i<4;i++){d1.innerHTML=dieHTML(1+rnd(6));d2.innerHTML=dieHTML(1+rnd(6));await sleep(80)}
  d1.innerHTML=dieHTML(a);d2.innerHTML=dieHTML(b);
  return [a,b];
}
function showRoll(label,total,thr,detail){
  const ok=total>=thr;
  $('#rollinfo').innerHTML=`<div class="tot">${total}</div><div>${label}: ${t('need')} ${thr}+ <span class="res ${ok?'ok':'no'}">${t(ok?'rollOk':'rollFail')}</span></div><div class="label">${detail}</div>`;
}

// roll with modifiers; thr = main threshold; extra thresholds for "could matter"
async function rollCheck(p,bonus,thr,label,extraThr=[]){
  const [a,b]=await rollDice();
  let total=a+b+bonus;
  const detail=`${a}+${b}${bonus?` ${bonus>0?'+':'−'}${Math.abs(bonus)}`:''}`;
  showRoll(label,total,thr,detail);
  log(`${p.name} · ${label}: ${a}+${b}${bonus?(bonus>0?' +':' −')+Math.abs(bonus):''} = <b>${total}</b> (${t('need')} ${thr}+)`);
  total=await modWindow(p,total,[thr,...extraThr],label,thr);
  showRoll(label,total,thr,detail+(total!==a+b+bonus?' · '+t('withMods'):''));
  return total;
}
function crosses(total,v,thrs){return thrs.some(x=>(total>=x)!==(total+v>=x))}
async function modWindow(roller,total,thrs,label,mainThr){
  const order=[...G.players.filter(x=>x.isHuman),...G.players.filter(x=>!x.isHuman)];
  for(const pl of order){
    const mods=pl.hand.filter(c=>c.kind==='mod');
    if(!mods.length)continue;
    if(pl.isHuman){
      const opts=[];const seen=new Set();
      mods.forEach(c=>{[[c.plus,1],[c.minus,-1]].forEach(([v,s])=>{if(!v)return;const k=tr(c.name)+s;if(seen.has(k))return;if(!crosses(total,v*s,thrs))return;seen.add(k);opts.push({label:`${tr(c.name)} <b>${s>0?'+':'−'}${v}</b>`,value:{c,v:v*s},primary:false})})});
      if(!opts.length)continue;
      opts.push({label:t('noPlay'),value:null,primary:true});
      const info=t('modInfo',{name:esc(roller.name),label:esc(label),total,thr:mainThr});
      const ch=await asPlayer(pl,`${info} ${t('modReason')}`,()=>ask(t('modAsk'),`<p>${info}</p>`,opts),true);
      if(ch){pl.hand.splice(pl.hand.indexOf(ch.c),1);discardCard(ch.c);total+=ch.v;log(t('logPlaysMod',{name:pl.name,card:tr(ch.c.name),v:(ch.v>0?'+':'')+ch.v,total}),ch.v>0?'ok':'no');showRoll(label,total,mainThr,t('modChanged'));render()}
    }else{
      let play=null;
      if(pl===roller){if(total<mainThr){const c=mods.filter(m=>m.plus&&total+m.plus>=mainThr).sort((a,b)=>a.plus-b.plus)[0];if(c)play={c,v:c.plus}}}
      else{const hostile=roller.isHuman||roller===leaderOf();
        if(hostile&&total>=mainThr&&Math.random()<.7){const c=mods.filter(m=>m.minus&&total-m.minus<mainThr).sort((a,b)=>a.minus-b.minus)[0];if(c)play={c,v:-c.minus}}}
      if(play){await sleep(350);pl.hand.splice(pl.hand.indexOf(play.c),1);discardCard(play.c);total+=play.v;log(t('logPlaysMod',{name:pl.name,card:tr(play.c.name),v:(play.v>0?'+':'')+play.v,total}),play.v>0?'ok':'no');showRoll(label,total,mainThr,t('modChanged'));render()}
    }
  }
  return total;
}
