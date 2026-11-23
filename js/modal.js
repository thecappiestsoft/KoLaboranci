// KoLaboranci © 2026 CappySoft.pl
// Okna dialogowe: pytania, wybór karty, pierwiastka lub gracza.

// ---------- modal ----------
function ask(title,html,options,{cards=false}={}){
  return new Promise(res=>{
    const root=$('#modalRoot');
    root.innerHTML=`<div class="scrim"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="mt"><h3 id="mt">${title}</h3><div class="mbody">${html||''}</div><div class="opts ${cards?'cards':''}"></div></div></div>`;
    const box=root.querySelector('.opts');
    options.forEach((o,i)=>{const b=document.createElement('button');b.className=o.cls||(cards&&o.card?'optcard':'btn'+(o.primary?' primary':''));b.innerHTML=o.label;b.disabled=!!o.disabled;b.onclick=()=>{root.innerHTML='';res(o.value)};box.appendChild(b);if(i===0)setTimeout(()=>b.focus(),30)});
  });
}
async function pickCard(title,cards,{cancel=null,html=''}={}){
  if(!cards.length)return null;
  const opts=cards.map(c=>({label:cardHTML(c,{noBtn:true}),value:c,card:true}));
  if(cancel)opts.push({label:cancel,value:null,cls:'btn'});
  return ask(title,html,opts,{cards:true});
}
async function pickSlot(title,list,{cancel=null}={}){
  // list: [{owner,slot}]
  if(!list.length)return null;
  const opts=list.map(x=>({label:`<div style="padding:6px">${x.owner===human()?t('yours'):esc(x.owner.name)}</div>`+cardHTML(x.slot.card,{noBtn:true,slot:x.slot}),value:x,card:true}));
  if(cancel)opts.push({label:cancel,value:null,cls:'btn'});
  return ask(title,'',opts,{cards:true});
}
async function pickPlayer(p,title,list){
  if(!list.length)return null;
  if(!p.isHuman)return list.slice().sort((a,b)=>score(b)-score(a))[0];
  return ask(title,'',list.map(o=>({label:`${esc(o.name)} · ${t('cardsInHand',{n:o.hand.length})}`,value:o})));
}
