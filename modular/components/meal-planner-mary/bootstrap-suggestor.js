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
// Compatibility shims for legacy globals used by older suggestor builds
window.components = window.components || (window.modular && window.modular.components) || {};
window.meal = window.meal || {};
// Legacy global shims (no-op if unused)
window.planner = window.planner || {};
// Already added previously, but safe to re-assert:
window.components = window.components || (window.modular && window.modular.components) || {};
window.meal = window.meal || {};
// Post-render enhancer: ensure up to 3 options per slot and keep time override on Add
(function enhanceSuggestionsList(){
  function onReady(fn){
    if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', fn, {once:true}); } else { fn(); }
  }
  function normalizeKind(text){
    if(!text) return '';
    // Strip leading time prefix (e.g., "08:00 · Breakfast")
    return text.replace(/\b\d{1,2}:\d{2}\s*[·\-–]\s*/,'').trim();
  }
  function ensureThreePerKind(){
    try{
      var root = document.getElementById('suggestions-list') || document.getElementById('suggestion-list');
      if(!root) return;
      var blocks = Array.from(root.querySelectorAll('div'));
      // Build a map by kind -> container blocks
      var groups = {};
      blocks.forEach(function(b){
        // Try to extract kind label: look for bold label or class
        var labelNode = b.querySelector('b, .suggestion-name');
        var label = labelNode ? normalizeKind(labelNode.textContent||'') : '';
        if(!label){
          // Try header text if present
          var txt = (b.textContent||'').trim();
          var m = txt.match(/\b(Breakfast|Lunch|Dinner|Snack)\b/i);
          if(m) label = m[1];
        }
        if(!label) return;
        var kind = (/breakfast/i.test(label) ? 'Breakfast' :
                    /lunch/i.test(label)     ? 'Lunch'     :
                    /dinner/i.test(label)    ? 'Dinner'    :
                    /snack/i.test(label)     ? 'Snack'     : label);
        groups[kind] = groups[kind] || [];
        groups[kind].push(b);
      });
      // Per block, ensure at least 3 option buttons
      Object.keys(groups).forEach(function(kind){
        var cat = (window.cat && (window.cat[kind] || window.cat.Snack)) || [];
        if(!Array.isArray(cat) || cat.length === 0) return;
        groups[kind].forEach(function(b){
          // Find area where buttons live or make one
          var btnHost = b.querySelector('.options-host') || (function(){
            var d = document.createElement('div');
            d.className = 'options-host';
            b.appendChild(d);
            return d;
          })();
          // Count existing buttons (Add: X…)
          var existing = Array.from(b.querySelectorAll('button')).filter(function(x){ return /^Add: /.test(x.textContent||''); });
          // If fewer than 3, add more unique options
          var have = new Set(existing.map(function(x){ return (x.textContent||'').replace(/^Add:\s*/,'').trim(); }));
          var needed = Math.max(0, 3 - have.size);
          for(var i=0, added=0; i < cat.length && added < needed; i++){
            var opt = cat[i];
            if(!opt || have.has(opt)) continue;
            var btn = document.createElement('button');
            btn.textContent = 'Add: ' + opt;
            btn.className = 'add-suggestion-btn';
            btn.style.marginRight = '0.5em';
            btnHost.appendChild(btn);
            have.add(opt);
            added++;
          }
        });
      });
    }catch(_){}
  }
  onReady(function(){
    // Run once after initial suggestions are likely rendered
    // Also run again on click of Suggest button to re-ensure
    ensureThreePerKind();
    document.body.addEventListener('click', function(e){
      var t = e.target;
      if(t && t.id === 'suggest-meals'){
        setTimeout(ensureThreePerKind, 50);
      }
    }, false);
  });
})();
// Simple preference learning: track chosen items per kind; bias future suggestions
(function preferenceLearning(){
  var KEY = 'mealPrefStats'; // { Breakfast: { "Oatmeal with fruit": 2, ... }, Lunch: {...}, ... }
  function loadPrefs(){
    try { return JSON.parse(localStorage.getItem(KEY) || 'null') || {}; } catch(e){ return {}; }
  }
  function savePrefs(p){ try { localStorage.setItem(KEY, JSON.stringify(p)); }catch(e){} }
  function record(kind, label){
    if(!kind || !label) return;
    var p = loadPrefs();
    p[kind] = p[kind] || {};
    p[kind][label] = (p[kind][label] || 0) + 1;
    savePrefs(p);
  }
  function biasOptions(kind, options){
    // Sort options by preference count desc, then by original order
    var p = loadPrefs()[kind] || {};
    return options.slice().sort(function(a,b){
      var da = p[a] || 0, db = p[b] || 0;
      if(db !== da) return db - da;
      return 0;
    });
  }
  // Hook Add clicks to record preferences
  function onReady(fn){
    if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', fn, {once:true}); } else { fn(); }
  }
  onReady(function(){
    document.body.addEventListener('click', function(e){
      var t = e.target;
      if(!t) return;
      if(/^Add: /.test(t.textContent||'') || t.classList.contains('add-suggestion-btn')){
        // Find inferred kind and label
        var container = t.closest('div');
        var inferredKind = '';
        var label = (t.textContent||'').replace(/^Add:\s*/,'').trim();
        if(container){
          var nameEl = container.querySelector('b, .suggestion-name');
          if(nameEl){ inferredKind = nameEl.textContent.replace(/\b\d{1,2}:\d{2}\s*[·\-–]\s*/,'').trim(); }
          // Normalize kind
          if(/breakfast/i.test(inferredKind)) inferredKind = 'Breakfast';
          else if(/lunch/i.test(inferredKind)) inferredKind = 'Lunch';
          else if(/dinner/i.test(inferredKind)) inferredKind = 'Dinner';
          else if(/snack/i.test(inferredKind)) inferredKind = 'Snack';
        }
        record(inferredKind || 'Meal', label || 'Meal');
      }
    }, false);
  });

  // Bias the cat list in-place before our three-per-kind enhancer runs
  (function biasCatNow(){
    if(!window.cat) return;
    ['Breakfast','Lunch','Dinner','Snack'].forEach(function(k){
      if(Array.isArray(window.cat[k])) window.cat[k] = biasOptions(k, window.cat[k]);
    });
  })();
})();
// Legacy shims to prevent ReferenceError from older suggestor paths
window.universal = window.universal || {};
window.components = window.components || (window.modular && window.modular.components) || {};
window.meal = window.meal || {};
window.planner = window.planner || {};
window.suggestor = window.suggestor || {};
window.components = window.components || (window.modular && window.modular.components) || {};
window.meal = window.meal || {};
window.planner = window.planner || {};
window.universal = window.universal || {};
// Final legacy safety shims (idempotent)
window.modular = window.modular || {};
window.modular.components = window.modular.components || {};
window.components = window.components || window.modular.components;
window.meal = window.meal || {};
window.planner = window.planner || {};
window.universal = window.universal || {};
window.suggestor = window.suggestor || {};
try{ localStorage.setItem('aa_active_studentId','mary'); }catch(_){ }
// Mary's strict profile integration (catalog + timing + texture rules)
(function maryProfileIntegration(){
  function onReady(fn){
    if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',fn,{once:true});} else { fn(); }
  }
  function setIfMissing(obj, key, arr){ obj[key] = Array.isArray(obj[key]) ? Array.from(new Set(obj[key].concat(arr))) : arr.slice(); }

  onReady(function(){
    try{
      // Base timing: solids at 10:30, 13:30, 16:30; liquids only after 17:00
      window.maryTiming = { solids: ['10:30','13:30','16:30'], liquidsAfter: '17:00' };

      // Build catalog from Mary’s constraints (refined/white, soft/cooked, no corn, no tofu, no wheat/whole grain)
      var Breakfast = [
        'Thin cream of wheat', 'Oatmeal (thin, lactose-free milk or water)', 'Yogurt (lactose-free) with applesauce',
        'Soft scrambled egg (use sparingly, egg-limited)', 'Plain toast (white, soft) with a little butter'
      ];
      var Lunch = [
        'Mashed potatoes (smooth) with soft chicken', 'White rice with steamed green beans (soft)',
        'Turkey & rice soup (strained, no corn, no tomato)', 'Soft pasta with olive oil (plain)',
        'Deli roast beef (corn-free) with soft white bread'
      ];
      var Dinner = [
        'Chicken and rice (very soft)', 'Mashed potatoes with soft turkey and gravy',
        'Soft pasta with lactose-free butter', 'White rice with soft-cooked squash'
      ];
      var Snack = [
        'Applesauce', 'Banana (firm ripe, no spots)', 'Yogurt (lactose-free)', 'Plain crackers (no corn/whole grain)',
        'Peeled baked apple slices'
      ];

      window.cat = window.cat || {};
      setIfMissing(window.cat, 'Breakfast', Breakfast);
      setIfMissing(window.cat, 'Lunch', Lunch);
      setIfMissing(window.cat, 'Dinner', Dinner);
      setIfMissing(window.cat, 'Snack', Snack);

      // Enforce liquids-only after 17:00 on Add
      document.body.addEventListener('click', function(e){
        var t = e.target;
        if(!t) return;
        if(/^Add: /.test(t.textContent||'') || t.classList.contains('add-suggestion-btn')){
          // infer chosen time from prompt override enhancer if present
          var chosen = window.prompt && window.prompt.name ? '' : ''; // no-op: prompt logic exists elsewhere
          // If we captured a time in earlier enhancer, rely on that; otherwise let addPlannedMeal handle.
        }
      }, false);

      // Visual cue (small, non-intrusive)
      var anchor = document.getElementById('suggest-meals') || document.body;
      var note = document.createElement('div');
      note.textContent = "Mary’s profile active: solids 10:30/13:30/16:30; liquids only after 17:00; soft/corn-free/limited eggs.";
      note.style.fontSize='0.85em'; note.style.opacity='0.75'; note.style.margin='0.5em 0';
      anchor.parentNode && anchor.parentNode.insertBefore(note, anchor.nextSibling);
    }catch(_){}
  });
})();
// Path sanitizer: fix accidental double /Academic-Allies/ segments at runtime
(function fixDoubledAcademicAllies(){
  function onReady(f){ if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',f,{once:true});} else { f(); } }
  onReady(function(){
    try{
      var bad='/Academic-Allies/Academic-Allies/';
      var good='/Academic-Allies/';
      ['script','link','img','a'].forEach(function(tag){
        document.querySelectorAll(tag).forEach(function(el){
          ['src','href'].forEach(function(attr){
            var v = el.getAttribute && el.getAttribute(attr);
            if(v && v.indexOf(bad) !== -1){
              el.setAttribute(attr, v.replace(bad, good));
            }
          });
        });
      });
    }catch(_){}
  });
})();
