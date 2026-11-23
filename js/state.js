// KoLaboranci © 2026 CappySoft.pl
// Stan gry: talia, gracze, nowa gra, dobieranie, dziennik oraz tryb gry przy jednym urządzeniu.

// ---------- state ----------
let G=null;
const SETTINGS={short:true,seats:[
 {type:'human',name:'',leader:'curie'},{type:'bot',name:'',leader:'random'},{type:'bot',name:'',leader:'random'},{type:'none',name:'',leader:'random'}]};

function buildDeck(){
  const d=[];
  ELEMENTS.forEach(([sym,name,Z,g,thr,eff,shells,fact])=>d.push({uid:++UID,kind:'el',sym,name,Z,g,thr,eff,shells,fact}));
  EQUIP.forEach(([id,name,n,text])=>{for(let i=0;i<n;i++)d.push({uid:++UID,kind:'eq',id,name,text,curse:id==='zanieczyszczenie'})});
  SPECIAL.forEach(([id,name,n,text])=>{for(let i=0;i<n;i++)d.push({uid:++UID,kind:'sp',id,name,text})});
  MODS.forEach(([name,plus,minus,n])=>{for(let i=0;i<n;i++)d.push({uid:++UID,kind:'mod',name,plus,minus})});
  const chName=T(STR.pl.chName,STR.en.chName);
  for(let i=0;i<12;i++)d.push({uid:++UID,kind:'ch',name:chName});
  return shuffle(d);
}
function newGame(){
  const seats=SETTINGS.seats.filter(x=>x.type!=='none');
  const used=new Set();const players=[];let bi=0;
  seats.forEach(st=>{
    let L=LEADERS.find(l=>l.id===st.leader&&!used.has(l.id));
    if(!L)L=shuffle(LEADERS.filter(l=>!used.has(l.id)))[0];
    used.add(L.id);
    const isH=st.type==='human';
    // auto: domyślne imię, które zmienia się razem z językiem (własne imię gracza zostaje bez zmian)
    const auto=isH?(st.name.trim()?null:['player',players.filter(x=>x.isHuman).length+1]):['bot',bi++];
    players.push({name:isH&&!auto?st.name.trim():'',auto,isHuman:isH,leader:L});
  });
  players.forEach((p,i)=>{p.idx=i;p.hand=[];p.lab=[];p.done=[]});
  nameDefaults(players);
  const rdeck=shuffle(REACTIONS.map(r=>({uid:++UID,name:r[0],req:r[1],win:r[2],fail:r[3],pen:r[4],reward:r[5],rtext:r[6],q:r[7],ok:r[8],wrong:r[9],g:r[10],art:r[11]})));
  const humans=players.filter(x=>x.isHuman);
  G={players,viewer:players.indexOf(humans[0]),multi:humans.length>1,handVisible:humans.length<2,deck:buildDeck(),discard:[],rdeck,center:rdeck.splice(0,3),cur:0,ap:3,turn:0,busy:false,over:false,needG:SETTINGS.short?4:6,needR:SETTINGS.short?2:3,freeEq:false,logs:[]};
  players.forEach(p=>draw(p,5,true));
  $('#log').innerHTML='';
  log(t('logNewGame',{v:t(SETTINGS.short?'variantShort':'variantFull')}),'t');
  startTurn();
}
function nameDefaults(players){players.forEach(p=>{if(p.auto)p.name=p.auto[0]==='bot'?t('botNames')[p.auto[1]]:t('playerN',{n:p.auto[1]})})}
const cur=()=>G.players[G.cur];
const human=()=>G.players[G.viewer];
const opps=p=>G.players.filter(x=>x!==p);
const has=(p,r)=>p.done.some(d=>d.reward===r);
const isProt=s=>s.prot&&G.turn<s.prot;
function groupsOf(p){const s=new Set([p.leader.g]);p.lab.forEach(x=>s.add(x.card.g));return s}
function score(p){return groupsOf(p).size+p.done.length*1.6+p.lab.length*.2}
function leaderOf(){return G.players.slice().sort((a,b)=>score(b)-score(a))[0]}

function draw(p,n,silent){
  const got=[];
  for(let i=0;i<n;i++){
    if(!G.deck.length){if(!G.discard.length)break;G.deck=shuffle(G.discard);G.discard=[];log(t('logReshuffle'));}
    const c=G.deck.shift();p.hand.push(c);got.push(c);
  }
  if(!silent&&got.length)log(t('logDraws',{name:p.name,n:got.length}));
  return got;
}
function discardCard(c){G.discard.push(c)}
function log(html,cls){const el=document.createElement('p');if(cls)el.className=cls;el.innerHTML=html;const L=$('#log');L.appendChild(el);L.scrollTop=L.scrollHeight}
function burst(text,bad){const b=document.createElement('div');b.className='burst'+(bad?' no':'');b.textContent=text;document.body.appendChild(b);setTimeout(()=>b.remove(),1150)}

// ---------- hot-seat ----------
async function asPlayer(pl,reason,fn,optional){
  if(!G.multi||(pl===human()&&G.handVisible))return fn();
  const prev=G.viewer,prevVis=G.handVisible;
  G.handVisible=false;render();
  const opts=[{label:t('hsIamShow',{name:esc(pl.name)}),value:true,primary:true}];
  if(optional)opts.push({label:t('hsNoReact',{name:esc(pl.name)}),value:false});
  const ok=await ask(t('hsPass',{name:esc(pl.name)}),`<p>${reason}</p><p class="label">${t('hsLookAway')}</p>`,opts);
  if(!ok){G.handVisible=prevVis;render();return undefined}
  G.viewer=pl.idx;G.handVisible=true;render();
  const r=await fn();
  G.handVisible=false;G.viewer=prev;render();
  const back=G.players[prev];
  if(prevVis&&back.isHuman){await ask(t('hsGiveBack',{name:esc(back.name)}),`<p>${t('hsSaved')}</p>`,[{label:t('hsIam',{name:esc(back.name)}),value:1,primary:true}]);G.handVisible=true;render()}
  return r;
}
