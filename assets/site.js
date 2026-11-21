(function(){
  var html = document.documentElement;
  function setLang(l){
    html.lang = l;
    document.querySelectorAll('.lang button').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.lang === l); });
    try{ localStorage.setItem('lang', l); }catch(e){}
  }
  var saved = null;
  try{ saved = localStorage.getItem('lang'); }catch(e){}
  if(!saved && (navigator.language || '').toLowerCase().indexOf('pt') === 0) saved = 'pt';
  setLang(saved || 'en');
  document.querySelectorAll('.lang button').forEach(function(b){ b.addEventListener('click', function(){ setLang(b.dataset.lang); }); });
})();

/* MOTION */
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) { els.forEach(function(e){ e.classList.add('in'); }); }
  else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(e){ io.observe(e); });
  }
  var hero = document.querySelector('.hero');
  if (hero && !reduce) hero.addEventListener('pointermove', function(ev){
    var r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
    hero.style.setProperty('--my', (ev.clientY - r.top) + 'px');
  });
})();

/* filtro por tema (página de projetos) */
(function(){
  var botoes = document.querySelectorAll('.filters button');
  if (!botoes.length) return;
  botoes.forEach(function(b){
    b.addEventListener('click', function(){
      var tema = b.dataset.tema;
      botoes.forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      document.querySelectorAll('.theme').forEach(function(s){
        s.hidden = tema !== 'todos' && s.dataset.tema !== tema;
      });
    });
  });
})();
