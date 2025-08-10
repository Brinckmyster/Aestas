// Minimal globals for universal-suggestor.js
window.modular = window.modular || {};
window.modular.components = window.modular.components || {};
(function(){
  try {
    window.basePlan = window.basePlan || JSON.parse(localStorage.getItem("simpleMealPlan") || "null") || {};
  } catch(e) {
    window.basePlan = window.basePlan || {};
  }
})();
window.cat = window.cat || {
  Breakfast: ["Oatmeal with fruit","Scrambled eggs and toast","Yogurt with honey"],
  Lunch: ["Turkey & cheese sandwich","Chicken salad wrap","Soup and crackers"],
  Dinner: ["Chicken stir fry","Rice and beans","Pasta with marinara"],
  Snack: ["Apple slices","Yogurt","Broth"]
};
(function(){
  var s = document.createElement('script');
  s.src = '/Academic-Allies/modular/components/meal-planner/universal-suggestor.js';
  s.defer = true;
  document.head.appendChild(s);
})();
