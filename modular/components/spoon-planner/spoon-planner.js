    // Initialize Google Sign-In when the API loads
    window.onload = function() {
      google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID',
        callback: handleCredentialResponse
      });
      
      google.accounts.id.renderButton(
        document.getElementById('googleSignInContainer'),
        {
          theme: 'outline',
          size: 'medium',
          type: 'standard',
          shape: 'rectangular',
          logo_alignment: 'left',
          text: 'signin_with'
        }
      );
    };
    
    function handleCredentialResponse(response) {
      // Handle the signed-in user info
      console.log('Encoded JWT ID token: ' + response.credential);
      // Add your sign-in logic here
    }
// Spoon Planner Component Logic

const DEFAULT_SPOONS = 12;
let spoons = DEFAULT_SPOONS;
let tasks = [];

function updateSpoonsDisplay() {
  const spoonsElem = document.getElementById('spoons-remaining');
  const used = tasks.reduce((sum, t) => sum + t.spoons, 0);
  const remaining = Math.max(0, spoons - used);
  spoonsElem.innerHTML = `Spoons Remaining: <strong>${remaining}</strong>`;
  if (remaining === 0) {
    spoonsElem.style.color = '#ef4444';
  } else {
    spoonsElem.style.color = '';
  }

function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.setAttribute('data-idx', idx);

    const info = document.createElement('div');
    info.className = 'task-info';
    const name = document.createElement('span');
    name.className = 'task-name';
    name.textContent = task.name;
    info.appendChild(name);

    const spoonsSpan = document.createElement('span');
    spoonsSpan.className = 'task-spoons';
    spoonsSpan.textContent = `Spoons: ${task.spoons}`;
    info.appendChild(spoonsSpan);

    li.appendChild(info);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.type = 'button';
    removeBtn.setAttribute('aria-label', `Remove task ${task.name}`);
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      tasks.splice(idx, 1);
      saveSpoonTasks();
      renderTasks();
      updateSpoonsDisplay();
    });
    li.appendChild(removeBtn);

    list.appendChild(li);
  });
  localStorage.setItem('spoonTasks', JSON.stringify(tasks));

function loadSpoonTasks() {
  if (saved) {
    try {
      tasks = JSON.parse(saved);
    } catch {
      tasks = [];
    }
  }
}

function resetSpoons() {
  tasks = [];
  saveSpoonTasks();
  renderTasks();
  updateSpoonsDisplay();
}

document.addEventListener('DOMContentLoaded', function () {
  loadSpoonTasks();
  renderTasks();
  updateSpoonsDisplay();

  document.getElementById('add-task-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('task-name').value.trim();
    const spoonsNeeded = parseInt(document.getElementById('task-spoons').value, 10);
    if (!name || isNaN(spoonsNeeded) || spoonsNeeded < 1 || spoonsNeeded > DEFAULT_SPOONS) return;

    const used = tasks.reduce((sum, t) => sum + t.spoons, 0);
    if (used + spoonsNeeded > DEFAULT_SPOONS) {
      alert('Not enough spoons left for this task.');
      return;
    }

    tasks.push({ name, spoons: spoonsNeeded });
    saveSpoonTasks();
    renderTasks();
    this.reset();
  });

  document.getElementById('reset-spoons').addEventListener('click', function () {
    if (confirm('Reset all tasks and spoons for today?')) {
      resetSpoons();
    }
});
document.addEventListener("DOMContentLoaded",function(){
  var btn = document.getElementById("add-task-btn");
var btn = document.getElementById("add-task-btn");
  var taskList = document.getElementById("task-list");
  if(btn && taskList){
    btn.addEventListener("click", function(){
      var name = document.getElementById("task-name").value.trim();
      var spoons = parseInt(document.getElementById("task-spoons").value,10);
      if(!name||isNaN(spoons)){
        alert("Task and spoons required.");
        return;
      }
      if(!window.tasks)window.tasks=[];
      window.tasks.push({name: name, spoons: spoons});
      taskList.innerHTML="";
      window.tasks.forEach(function(task){
        var li=document.createElement("li");
        li.textContent=task.name+" — "+task.spoons+" spoons";
        taskList.appendChild(li);
      });
    });
  }
});
