// KoLaboranci © 2026 CappySoft.pl
// Przełącznik motywu: jasny | ciemny.
// Bez wyboru gra stosuje motyw systemu. Po kliknięciu wybór jest zapamiętywany w przeglądarce.
// Kolory obu motywów są w css/style.css (sekcje :root i [data-theme="dark"]).

const ICON_SUN = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></g></svg>';
const ICON_MOON = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" fill="currentColor"/></svg>';

function currentTheme(){
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
}
function setTheme(th){
  document.documentElement.dataset.theme = th;
  store.set('theme', th);
  updateThemeBtn();
}
// Dwa przyciski obok siebie: jasny | ciemny. Podświetlony jest aktywny motyw.
function updateThemeBtn(){
  const seg = document.querySelector('#themeSeg');
  if (!seg) return;
  seg.setAttribute('aria-label', t('themeGroup'));
  const cur = currentTheme();
  seg.querySelectorAll('[data-theme-set]').forEach(b => {
    const th = b.dataset.themeSet, on = th === cur;
    if (!b.innerHTML) b.innerHTML = th === 'dark' ? ICON_MOON : ICON_SUN;
    const label = t(th === 'dark' ? 'darkMode' : 'lightMode');
    b.title = label;
    b.setAttribute('aria-label', label);
    b.setAttribute('aria-pressed', on);
    b.classList.toggle('sel', on);
  });
}

if (window.matchMedia) {
  const mq = matchMedia('(prefers-color-scheme: dark)');
  const onChange = () => updateThemeBtn();
  if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
}
