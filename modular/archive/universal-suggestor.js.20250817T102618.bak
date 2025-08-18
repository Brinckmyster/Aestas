cat > modular/components/meal-planner/universal-suggestor.js <<'EOF'
// Universal Meal Suggestor for Academic Allies
// Inject this logic into your HTML (script tag, bottom) after let basePlan = null;
// This replaces generateSuggestions() to ensure everyone sees real meals.

function generateSuggestions() {
  // Pull candidate lists from ANY base plan format, or revert to sensible defaults
  const carbs = (basePlan && basePlan.carbs) ? basePlan.carbs : [
    "White rice", "Mashed potatoes", "Soft pasta", "White sandwich bread", "Crackers"
  ];
  const proteins = (basePlan && basePlan.proteins) ? basePlan.proteins : [
    "Chicken", "Deli turkey", "Eggs", "Greek yogurt", "Lentils", "Tofu"
  ];
  const vegs = (basePlan && basePlan.vegs) ? basePlan.vegs : [
    "Steamed green beans", "Soft-cooked carrots", "Peeled apple", "Cucumber", "Broccoli"
  ];
  const fats = (basePlan && basePlan.fats) ? basePlan.fats : [
    "Olive oil", "Lactose-free butter", "Sunflower oil"
  ];

  // Most typical meal times
  const mealTimes = ["08:00", "12:00", "18:00"];
  const suggestions = [];

  for (let i = 0; i < mealTimes.length; i++) {
    // Pick random index for each group
    const carb = carbs[Math.floor(Math.random() * carbs.length)];
    const protein = proteins[Math.floor(Math.random() * proteins.length)];
    const veg = vegs[Math.floor(Math.random() * vegs.length)];
    const fat = fats[Math.floor(Math.random() * fats.length)];

    suggestions.push({
      name: `${protein} with ${carb}`,
      time: mealTimes[i],
      notes: `Include: ${veg}, prepared with ${fat}.`
    });
  }
  renderSuggestions(suggestions);
}
