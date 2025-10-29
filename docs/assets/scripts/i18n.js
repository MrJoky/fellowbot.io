(async () => {
  const key = 'lang';
  const pick = (localStorage.getItem(key) || navigator.language || 'en').slice(0,2);
  const lang = (['de','en'].includes(pick) ? pick : 'en');

  const dict = await fetch(`assets/i18n/${lang}.json`, {cache:'no-store'}).then(r=>r.json());
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const path = el.getAttribute('data-i18n').split('.');
    let cur = dict; for (const p of path) cur = (cur||{})[p];
    if (typeof cur === 'string') el.textContent = cur;
  });

  document.querySelectorAll('[data-setlang]').forEach(btn => {
    btn.addEventListener('click', () => {
      localStorage.setItem(key, btn.getAttribute('data-setlang'));
      location.reload();
    });
  });
})();

