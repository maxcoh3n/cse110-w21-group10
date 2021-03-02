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
        for(i = 0; i<completedSessions.length; i++){
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

  for (i = 0; i < tasksArray.length; i++) {
    renderOne(tasksArray[i]);
  }

  if (tasksArray.length != 0) {

    let completedSessions = localStorage.getItem("completedSessions");
    completedSessions = JSON.parse(completedSessions);
    let foundTask = false;
    for(i = 0; i<completedSessions.length; i++){
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

  if(tasksArray.includes(newTaskInput.value)){
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

function comple() {

  let taskList = document.getElementById("task-list");
  let taskArray = [];
    for (let box of taskList.childNodes) {
      if (box.checked) {
        //Completed tasks
        let completedSessions = localStorage.getItem("completedSessions");
        completedSessions = JSON.parse(completedSessions);
        for(i = 0; i<completedSessions.length; i++){
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
    }
    localStorage.setItem("upcomingTasks", JSON.stringify(taskArray));
}

function undo() {

  let taskList = document.getElementById("task-list");
  let taskArray = [];
    for (let box of taskList.childNodes) {
      let label = document.getElementById("label" + box.id);
      if( box.checked) {
        document.getElementById("curr-task").children[0].innerHTML = box.id;
        completed.innerHTML = "Completed";
        label.style.textDecoration = "none";
        let completedSessions = localStorage.getItem("completedSessions");
        completedSessions = JSON.parse(completedSessions);
        for(i = 0; i<completedSessions.length; i++){
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
    let completedSessions = localStorage.getItem("completedSessions");
    completedSessions = JSON.parse(completedSessions);
    for (let box of taskList.childNodes) {
      let label = document.getElementById("label" + box.id);
      if( box.checked ) {
        completedSessions = completedSessions.filter( task => task != box.id );
        label.remove();
        box.remove();
      } else if( label != null ){
        taskArray.push(box.id);
      }
    }
    localStorage.setItem("completedSessions", JSON.stringify(completedSessions));
    localStorage.setItem("upcomingTasks", JSON.stringify(taskArray));

}

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

