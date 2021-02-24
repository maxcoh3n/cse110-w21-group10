function renderOne(taskInput){
  let taskList = document.getElementById("task-list");
  let tasksArray = localStorage.getItem("upcomingTasks");
  tasksArray = JSON.parse(tasksArray);

  let task = document.createElement("input");
  task.setAttribute("type", "radio");
  task.setAttribute("name", "task-list");
  task.setAttribute("id", taskInput);
  if(tasksArray.length == 1){
    task.setAttribute("checked", "true");
  }
  taskList.appendChild(task);

  let label = document.createElement("label");
  label.setAttribute("for", taskInput);

  label.setAttribute("id", "label" + taskInput);

  label.innerHTML = taskInput + "<br>";
  taskList.appendChild(label);
}

function renderAll(){
  let tasksArray = localStorage.getItem("upcomingTasks");
  tasksArray = JSON.parse(tasksArray);

  for(i = 0; i < tasksArray.length; i++){
    renderOne(tasksArray[i]);
  }
}

renderAll();

const addTask = document.getElementById("new-task-btn");
addTask.onclick = function() {
    let tasksArray = localStorage.getItem("upcomingTasks");
    tasksArray = JSON.parse(tasksArray);

    const newTaskInput = document.getElementById("new-task");

    if(newTaskInput.value){
        tasksArray.push(newTaskInput.value);
        localStorage.setItem("upcomingTasks", JSON.stringify(tasksArray));
        renderOne(newTaskInput.value);
        newTaskInput.value = "";
    }

    tasksArray = localStorage.getItem("upcomingTasks");
}


const completed = document.getElementById("complete-task-btn")
completed.onclick = function() {

  let taskList = document.getElementById("task-list");

  let taskArray = [];

    for( let box of taskList.childNodes ) {
      if( box.checked ) {
        let label = document.getElementById("label" + box.id);
        label.style.textDecoration = 'line-through';
      } else {
        if( box.name == 'task-list' ) {
          taskArray.push(box.id);
        }
      }
    }

    localStorage.setItem("upcomingTasks", JSON.stringify(taskArray));

}

function logs()
{
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    today = month + '/' + day + ': ';
    for (var i = 0; i < numtasks; i++)
    {
        if (completedTasks[i])
        {
            console.log(today + tasks[i]);
        }
    }
}
//task list to do, and completed tasks along with date, rating, associated task
