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
