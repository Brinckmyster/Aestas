document.addEventListener("DOMContentLoaded", function() {
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
