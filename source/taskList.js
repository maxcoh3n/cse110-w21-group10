import {renderStatistics} from "./statistics.js";

function renderOne(taskInput){

  const taskButton = document.getElementById("complete-task-btn");

  let taskList = document.getElementById("task-list");
  let tasksArray = localStorage.getItem("upcomingTasks");
  tasksArray = JSON.parse(tasksArray);

  let task = document.createElement("input");
  task.addEventListener("click", function() {

    let taskList = document.getElementById("task-list");

    let boxChecked = false;
    for (let box of taskList.childNodes) {
      if (box.checked) {
        boxChecked = true;
        let completedSessions = localStorage.getItem("completedSessions");
        completedSessions = JSON.parse(completedSessions);
        let foundTask = false;
        for(let i = 0; i<completedSessions.length; i++){
          if( box.id == completedSessions[i].taskName ) {
            foundTask = true;
            if( completedSessions[i].completed == false ) {
              document.getElementById("curr-task").children[0].innerHTML = box.id;
              taskButton.innerHTML = "Completed";
            } else {
              taskButton.innerHTML = "Undo";
              document.getElementById("curr-task").children[0].innerHTML = "None";
            }
          }
        }
        if( foundTask == false ) {
          document.getElementById("curr-task").children[0].innerHTML = box.id;
          taskButton.innerHTML = "Delete";
        }
      }
    }
    if( boxChecked == false ) {
      document.getElementById("curr-task").children[0].innerHTML = "None";
    }

  });

  task.setAttribute("type", "radio");
  task.setAttribute("name", "task-list");
  task.setAttribute("id", taskInput);
  if (tasksArray.length == 1) {
    task.setAttribute("checked", "true");
    document.getElementById("curr-task").children[0].innerHTML = taskInput;
  }
  taskList.appendChild(task);

  let label = document.createElement("label");
  label.setAttribute("for", taskInput);
  label.setAttribute("class", "tasks");
  label.setAttribute("id", "label" + taskInput);

  label.innerHTML = taskInput + "<br>";
  taskList.appendChild(label);

}

function renderAll() {

  const taskButton = document.getElementById("complete-task-btn");

  let tasksArray = localStorage.getItem("upcomingTasks");
  tasksArray = JSON.parse(tasksArray);

  for (let i = 0; i < tasksArray.length; i++) {
    renderOne(tasksArray[i]);
  }

  if (tasksArray.length != 0) {

    let completedSessions = localStorage.getItem("completedSessions");
    completedSessions = JSON.parse(completedSessions);
    let foundTask = false;
    for(let i = 0; i<completedSessions.length; i++){
      if( tasksArray[0] == completedSessions[i].taskName ) {
        foundTask = true;
        if( completedSessions[i].completed == false ) {
          taskButton.innerHTML = "Completed";
        } else {
          taskButton.innerHTML = "Undo";
        }
      }
    }
    if( foundTask == false ) {
      taskButton.innerHTML = "Delete";
    }

    document.getElementById(tasksArray[0]).checked = true;
    document.getElementById("curr-task").children[0].innerHTML = tasksArray[0];
  }
}

renderAll();

const addTask = document.getElementById("new-task-btn");
addTask.onclick = function () {
  const taskButton = document.getElementById("complete-task-btn");
  let tasksArray = localStorage.getItem("upcomingTasks");
  tasksArray = JSON.parse(tasksArray);

  const newTaskInput = document.getElementById("new-task");

  if (tasksArray.includes(newTaskInput.value)) {
    newTaskInput.value = "";
  }

  if (newTaskInput.value) {
    tasksArray.push(newTaskInput.value);
    localStorage.setItem("upcomingTasks", JSON.stringify(tasksArray));
    renderOne(newTaskInput.value);
    if( tasksArray.length == 1 ) {
      taskButton.innerHTML = "Delete";
    }
    newTaskInput.value = "";
  }

  tasksArray = localStorage.getItem("upcomingTasks");
};

const newTaskInput = document.getElementById("new-task");
newTaskInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTask.click();
  }
});

function inCompleted(taskName) {
  let completedSessions = localStorage.getItem("completedSessions");
  completedSessions = JSON.parse(completedSessions);
  for(let task of completedSessions) {
    if( task.taskName == taskName ) {
      return true;
    }
  }
  return false;
}

function isCompleted(taskName) {
  let completedSessions = localStorage.getItem("completedSessions");
  completedSessions = JSON.parse(completedSessions);
  for(let task of completedSessions) {
    if( task.taskName == taskName ) {
      return task.completed;
    }
  }
  return false;
}

function comple() {
  incNumCompletedTasks();

  let taskList = document.getElementById("task-list");
  let completedSessions = localStorage.getItem("completedSessions");
  completedSessions = JSON.parse(completedSessions);
  let taskArray = [];
  let taskCheck = 0;
  let foundCheck = false;
  for (let box of taskList.childNodes) {
    if (box.checked) {
      foundCheck = true;
      for(let i = 0; i<completedSessions.length; i++){
        if( box.id == completedSessions[i].taskName ) {
          completedSessions[i].completed = true;
          completed.innerHTML = "Undo";
          document.getElementById("curr-task").children[0].innerHTML = "None";
        }
      }
      localStorage.setItem("completedSessions", JSON.stringify(completedSessions));

      let label = document.getElementById("label" + box.id);
      label.style.textDecoration = "line-through";
    } else {
      if ( box.name == "task-list" &&
      document.getElementById("label" + box.id).style.textDecoration != "line-through" ) {
        taskArray.push(box.id);
      }
    }
    if( foundCheck == false ) {
      taskCheck++;
    }
  }
  localStorage.setItem("upcomingTasks", JSON.stringify(taskArray));
  taskCheck = Math.floor(taskCheck / 2);

  if( taskArray.length > 0 ) {
    if( taskCheck < (taskArray.length) ) {
      document.getElementById(taskArray[taskCheck]).checked = true;
      document.getElementById("curr-task").children[0].innerHTML = taskArray[taskCheck];
      if( inCompleted(taskArray[taskCheck]) ) {
        if( isCompleted(taskArray[taskCheck]) ) {
          completed.innerHTML = "Undo";
        } else {
          completed.innerHTML = "Completed";
        }
      } else {
        completed.innerHTML = "Delete";
      }
    } else {
      document.getElementById(taskArray[0]).checked = true;
      document.getElementById("curr-task").children[0].innerHTML = taskArray[0];
      if( inCompleted(taskArray[0]) ) {
        if( isCompleted(taskArray[0]) ) {
          completed.innerHTML = "Undo";
        } else {
          completed.innerHTML = "Completed";
        }
      } else {
        completed.innerHTML = "Delete";
      }
    }
  }

}

function undo() {

  decNumCompletedTasks();

  let taskList = document.getElementById("task-list");
  let taskArray = [];
    for (let box of taskList.childNodes) {
      let label = document.getElementById("label" + box.id);
      if( box.checked ) {
        document.getElementById("curr-task").children[0].innerHTML = box.id;
        completed.innerHTML = "Completed";
        label.style.textDecoration = "none";
        let completedSessions = localStorage.getItem("completedSessions");
        completedSessions = JSON.parse(completedSessions);
        for(let i = 0; i<completedSessions.length; i++){
          if( box.id == completedSessions[i].taskName ) {
            completedSessions[i].completed = false;
          }
        }
        localStorage.setItem("completedSessions", JSON.stringify(completedSessions));
      }
      if ( box.name == "task-list" ) {
        taskArray.push(box.id);
      }
    }
    localStorage.setItem("upcomingTasks", JSON.stringify(taskArray));

}

function del() {



  let taskList = document.getElementById("task-list");
  document.getElementById("curr-task").children[0].innerHTML = "None";
  let taskArray = [];
  let upcomingTasks = localStorage.getItem("upcomingTasks");
  upcomingTasks = JSON.parse(upcomingTasks);
  let nextTaskNum = 0;
  for (let box of taskList.childNodes) {
    let label = document.getElementById("label" + box.id);
    if( box.checked == true ) {
      taskArray = upcomingTasks.filter( task => task != box.id );
      label.remove();
      box.remove();
      break;
    }
    nextTaskNum++;
  }
  nextTaskNum = Math.floor(nextTaskNum / 2);
  localStorage.setItem("upcomingTasks", JSON.stringify(taskArray));

  if( taskArray.length > 0 ) {
    if( nextTaskNum < (taskArray.length) ) {
      document.getElementById(taskArray[nextTaskNum]).checked = true;
      document.getElementById("curr-task").children[0].innerHTML = taskArray[nextTaskNum];
      if( inCompleted(taskArray[nextTaskNum]) ) {
        if( isCompleted(taskArray[nextTaskNum]) ) {
          completed.innerHTML = "Undo";
        } else {
          completed.innerHTML = "Completed";
        }
      } else {
        completed.innerHTML = "Delete";
      }
    } else {
      document.getElementById(taskArray[0]).checked = true;
      document.getElementById("curr-task").children[0].innerHTML = taskArray[0];
      if( inCompleted(taskArray[0]) ) {
        if( isCompleted(taskArray[0]) ) {
          completed.innerHTML = "Undo";
        } else {
          completed.innerHTML = "Completed";
        }
      } else {
        completed.innerHTML = "Delete";
      }
    }
  }

}

/*
* increases numCompletedTasks statistic
*/
function incNumCompletedTasks(){
  let stats = JSON.parse(localStorage.getItem("statistics"));
  stats.numCompletedTasks++;
  localStorage.setItem("statistics",JSON.stringify(stats));
  renderStatistics();
}

/*
* decreases numCompletedTasks statistic
*/
function decNumCompletedTasks(){
  let stats = JSON.parse(localStorage.getItem("statistics"));
  stats.numCompletedTasks--;
  localStorage.setItem("statistics",JSON.stringify(stats));
  renderStatistics();
}

// /*
// * increases incNumCompletedTasks statistic
// */
// function incNumCompletedTasks(){
//   let stats = JSON.parse(localStorage.getItem("statistics"));
//   stats.numCompletedTasks++;
//   localStorage.setItem("statistics",JSON.stringify(stats));
//   renderStatistics();
// }

// /*
// * decreases incNumCompletedTasks statistic
// */
// function decNumCompletedSessions(){
//   let stats = JSON.parse(localStorage.getItem("statistics"));
//   stats.numCompletedTasks--;
//   localStorage.setItem("statistics",JSON.stringify(stats));
//   renderStatistics();
// }

const completed = document.getElementById("complete-task-btn");
completed.onclick = function () {

  if( completed.innerHTML == "Completed" ) {
    comple();
  } else if( completed.innerHTML == "Undo" ) {
    undo();
  } else if(completed.innerHTML == "Delete") {
    del();
  }
};
