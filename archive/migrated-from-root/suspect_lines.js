      document.querySelectorAll('.suggestion-time').forEach(function(el){
        var t = (el.textContent||'').trim(); var m = t.match(/(\d{1,2}:\d{2})/);
        if(m){ el.textContent = t.replace(m[1], to12h(m[2])); }
      });
      document.querySelectorAll('[data-time], .time-label, .meal-time').forEach(function(el){
        var t = el.getAttribute('data-time') || (el.textContent||'').trim();
        var m = (t||'').match(/^(\d{1,2}):(\d{2})$/);
        if(m){
          el.setAttribute && el.setAttribute('data-time-12', to12h(m[0]));
          if(/^\d{1,2}:\d{2}$/.test(t)) el.textContent = to12h(t);
        }
      });
    }catch(_){}
  });
})();
// Log GitHub dispatch result (owner-only write path)
(function logDispatchResults(){
  var orig = window.saveStudentPrefsPatch;
  if (typeof orig === 'function') {
    window.saveStudentPrefsPatch = async function(studentId, patch){
      try{
