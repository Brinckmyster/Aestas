// Mary UI banner/banner after shared header
(function maryUiBannerAfterHeader(){
  function onReady(fn){ if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',fn,{once:true});} else { fn(); } }
  onReady(function(){
    try{
      if(document.title && document.title.indexOf("Mary")===-1){
        document.title = "Mary’s " + document.title.replace(/^Mary’s\\s*/,'');
      }
      var header = document.querySelector('#shared-header, header, .shared-header, nav') || document.body.firstElementChild || document.body;
      var banner = document.createElement('div');
      banner.textContent = "Mary’s Meal Planner — solids at 10:30/1:30/4:30, liquids only after 5pm; soft textures; strict corn/wheat rules.";
      banner.style.cssText = "background:#5b8; color:#fff; padding:8px 12px; font-weight:600; border-radius:6px; margin:8px 0;";
      if(header && header.parentNode){
        header.parentNode.insertBefore(banner, header.nextSibling);
      } else {
        document.body.insertBefore(banner, document.body.firstChild);
      }
    }catch(_){}
  });
})();
