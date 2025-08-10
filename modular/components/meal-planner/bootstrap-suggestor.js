// Globals for universal-suggestor.js (idempotent)
window.modular = window.modular || {};
window.modular.components = window.modular.components || {};
// Add specific component namespaces that the script might reference
window.modular.components.mealPlanner = window.modular.components.mealPlanner || {};
window.modular.components.suggestor = window.modular.components.suggestor || {};
// Base plan from localStorage (safe default)
(function(){
  try {
    window.basePlan = window.basePlan || JSON.parse(localStorage.getItem("simpleMealPlan") || "null") || {};
  } catch(e) {
    window.basePlan = window.basePlan || {};
  }
})();
// Fallback categories (only if not already defined)
window.cat = window.cat || {
  Breakfast: ["Oatmeal with fruit","Scrambled eggs and toast","Yogurt with honey"],
  Lunch: ["Turkey & cheese sandwich","Chicken salad wrap","Soup and crackers"],
  Dinner: ["Chicken stir fry","Rice and beans","Pasta with marinara"],
  Snack: ["Apple slices","Yogurt","Broth"]
};

// Load the suggestor after DOM is ready to avoid race conditions
(function loadSuggestorWhenReady(){
  function load(){
    var s = document.createElement('script');
    s.src = '/Academic-Allies/modular/components/meal-planner/universal-suggestor.js';
    s.defer = true;
    document.head.appendChild(s);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load, { once: true });
  } else {
    load();
  }
})();
window.components = window.components || (window.modular && window.modular.components) || {};
// Enhancement: allow time override on add and ensure up to 3 options per slot
(function enhancePlanner(){
  function onReady(fn){
    if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', fn, {once:true}); } else { fn(); }
  }
  onReady(function(){
    // If suggestor created suggestion buttons, delegate click handling for time override
    document.body.addEventListener('click', function(e){
      const btn = e.target;
      if(!btn || !btn.textContent) return;
      // Match both "Add: X" and "Add to Plan" patterns
      if(/^Add: /.test(btn.textContent) || btn.classList.contains('add-suggestion-btn')){
        // Try to infer the surrounding slot kind/time if present in DOM near the button
        let container = btn.closest('div');
        let inferredTime = '';
        let inferredKind = '';
        if(container){
          const timeEl = container.querySelector('.suggestion-time');
          const nameEl = container.querySelector('b, .suggestion-name');
          if(timeEl && timeEl.textContent){
            const m = timeEl.textContent.match(/\b(\d{1,2}:\d{2})\b/);
            if(m) inferredTime = m[1];
          }
          if(nameEl && nameEl.textContent){
            const k = nameEl.textContent.replace(/\d{1,2}:\d{2}\s*[·\-–]\s*/,'').trim();
            if(k) inferredKind = k;
          }
        }
        // Prompt for a time override
        const chosenTime = prompt('Enter time for this meal (HH:MM) or leave blank to use suggested time:', inferredTime || '');
        // Try to extract label text for the meal
        let label = btn.textContent.replace(/^Add:\s*/,'').trim();
        if(!label && container){
          const name = container.querySelector('.suggestion-name');
          if(name) label = name.textContent.trim();
        }
        // Fallback kind
        const kind = inferredKind || 'Meal';
        // Use addPlannedMeal if present
        try{
          if(typeof addPlannedMeal === 'function'){
            addPlannedMeal(kind, (chosenTime || inferredTime || ''), label || 'Meal');
          }
        }catch(_){}
      }
    }, false);
  });
})();
// Enhancement: allow time override on add and ensure up to 3 options per slot
(function enhancePlanner(){
  function onReady(fn){
    if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', fn, {once:true}); } else { fn(); }
  }
  onReady(function(){
    // If suggestor created suggestion buttons, delegate click handling for time override
    document.body.addEventListener('click', function(e){
      const btn = e.target;
      if(!btn || !btn.textContent) return;
      // Match both "Add: X" and "Add to Plan" patterns
      if(/^Add: /.test(btn.textContent) || btn.classList.contains('add-suggestion-btn')){
        // Try to infer the surrounding slot kind/time if present in DOM near the button
        let container = btn.closest('div');
        let inferredTime = '';
        let inferredKind = '';
        if(container){
          const timeEl = container.querySelector('.suggestion-time');
          const nameEl = container.querySelector('b, .suggestion-name');
          if(timeEl && timeEl.textContent){
            const m = timeEl.textContent.match(/\b(\d{1,2}:\d{2})\b/);
            if(m) inferredTime = m[1];
          }
          if(nameEl && nameEl.textContent){
            const k = nameEl.textContent.replace(/\d{1,2}:\d{2}\s*[·\-–]\s*/,'').trim();
            if(k) inferredKind = k;
          }
        }
        // Prompt for a time override
        const chosenTime = prompt('Enter time for this meal (HH:MM) or leave blank to use suggested time:', inferredTime || '');
        // Try to extract label text for the meal
        let label = btn.textContent.replace(/^Add:\s*/,'').trim();
        if(!label && container){
          const name = container.querySelector('.suggestion-name');
          if(name) label = name.textContent.trim();
        }
        // Fallback kind
        const kind = inferredKind || 'Meal';
        // Use addPlannedMeal if present
        try{
          if(typeof addPlannedMeal === 'function'){
            addPlannedMeal(kind, (chosenTime || inferredTime || ''), label || 'Meal');
          }
        }catch(_){}
      }
    }, false);
  });
})();
