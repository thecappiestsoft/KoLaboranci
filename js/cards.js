// KoLaboranci © 2026 CappySoft.pl
// Wygląd kart w HTML (pierwiastek, sprzęt, reakcja specjalna, Warunki, Recenzja).

// ---------- card html ----------
function cardHTML(c,o={}){
  const slot=o.slot;
  if(c.kind==='el'){
    const extra=c.g==='gaz'?tr(PASSIVE.gaz):c.sym==='Au'?tr(PASSIVE.Au):'';
    const eq=slot&&slot.equip?`<div class="eqtag">${icon(slot.equip.id,16)}<span>${esc(tr(slot.equip.name))}</span></div>`:'';
    return `<div class="card el ${slot&&slot.used?'used':''}" style="${gv(c.g)}"><div class="ctop"><span>${c.Z}</span><span class="badge">${c.thr}+</span></div>
      <div class="pic">${bohr(c.shells,c.g)}<div class="sym">${c.sym}</div></div>
      <div class="nm">${tr(c.name)}</div><div class="label" style="padding:0 8px;font-size:9.5px">${tr(GROUPS[c.g].name)}</div>
      <div class="tx">${tr(EFFTEXT[c.eff])}${extra?` <b>${extra}</b>`:''}</div>${eq}
      ${o.fact!==false?`<div class="fact">${tr(c.fact)}</div>`:''}
      ${slot&&isProt(slot)?`<span class="prot">${t('protected')}</span>`:''}${o.foot||''}</div>`;
  }
  if(c.kind==='eq')return `<div class="card eqc ${c.curse?'curse':''}"><div class="ctop"><span class="kind">${t(c.curse?'kindCurse':'kindEquip')}</span></div><div class="pic">${icon(c.id,72)}</div><div class="nm">${tr(c.name)}</div><div class="tx">${tr(c.text)}</div>${o.foot||''}</div>`;
  if(c.kind==='sp')return `<div class="card sp"><div class="ctop"><span class="kind">${t('kindSpecial')}</span></div><div class="pic">${icon(c.id,72)}</div><div class="nm">${tr(c.name)}</div><div class="tx">${tr(c.text)}</div>${o.foot||''}</div>`;
  if(c.kind==='mod')return `<div class="card mod"><div class="ctop"><span class="kind">${t('kindMod')}</span></div><div class="pic"><div class="modval">${c.plus?`<span class="p">+${c.plus}</span>`:''}${c.minus?`<span class="m">−${c.minus}</span>`:''}</div></div><div class="nm">${tr(c.name)}</div><div class="tx">${t('modText')}</div>${o.foot||''}</div>`;
  if(c.kind==='ch')return `<div class="card ch"><div class="ctop"><span class="kind">${t('kindCh')}</span></div><div class="pic">${icon('ch',72)}</div><div class="nm">${tr(c.name)}</div><div class="tx">${t('chText')}</div>${o.foot||''}</div>`;
}
function miniHTML(s){return `<div class="mini" style="${gv(s.card.g)}" title="${esc(tr(s.card.name))}${s.equip?' + '+esc(tr(s.equip.name)):''}"><b>${s.card.sym}</b><small>${s.card.Z}</small>${s.equip?`<span class="eq">${icon(s.equip.id,12)}</span>`:''}</div>`}
