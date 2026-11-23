// KoLaboranci © 2026 CappySoft.pl
// Wielojęzyczność (PL/EN): wybór języka, tłumaczenie napisów i danych kart.
//
//  t('klucz', {zmienne})  – napis interfejsu ze słownika js/lang/pl.js albo js/lang/en.js
//  tr(T('tekst pl','text en')) – wybiera wersję językową tekstu z danych kart (js/data.js)
//
// Nowy język: dodaj plik js/lang/xx.js (STR.xx = {...}), dopisz go w index.html,
// dodaj przycisk z data-lang="xx" w nagłówku i wersję xx w danych kart.

const STR = {};
const T = (pl, en) => ({ pl, en });

// Pamięć ustawień w przeglądarce (bezpieczna: działa też, gdy przeglądarka jej nie udostępnia).
const store = {
  get(k){ try { return localStorage.getItem('kolaboranci.' + k) } catch (e) { return null } },
  set(k, v){ try { localStorage.setItem('kolaboranci.' + k, v) } catch (e) {} }
};

let LANG = (store.get('lang') === 'en') ? 'en' : 'pl';
document.documentElement.lang = LANG;

function tr(x){
  if (x && typeof x === 'object' && !Array.isArray(x) && 'pl' in x) return x[LANG] ?? x.pl;
  return x;
}
function t(key, v = {}){
  let s = STR[LANG] && STR[LANG][key];
  if (s === undefined) s = STR.pl[key];
  if (s === undefined) return key;
  if (typeof s === 'function') return s(v);
  if (typeof s !== 'string') return s;
  return s.replace(/\{(\w+)\}/g, (m, n) => v[n] !== undefined ? v[n] : m);
}

// Napisy w index.html oznaczone data-i18n="klucz" oraz przyciski PL|EN.
function applyStatic(){
  document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n) });
  document.querySelectorAll('[data-lang]').forEach(b => {
    const on = b.dataset.lang === LANG;
    b.classList.toggle('sel', on);
    b.setAttribute('aria-pressed', on);
  });
  const lg = document.querySelector('#legend');
  if (lg && typeof GROUPS !== 'undefined')
    lg.innerHTML = GORDER.map(g => `<span><i class="dot on" style="${gv(g)}"></i>${tr(GROUPS[g].name)}</span>`).join('');
  if (typeof updateThemeBtn === 'function') updateThemeBtn();
}

function setLang(l){
  if (l === LANG) return;
  LANG = l;
  store.set('lang', l);
  document.documentElement.lang = l;
  applyStatic();
  if (typeof G !== 'undefined' && G) { nameDefaults(G.players); render(); }
}
