function renderOne(taskInput) {
  let taskList = document.getElementById("task-list");
  let tasksArray = localStorage.getItem("upcomingTasks");
  tasksArray = JSON.parse(tasksArray);

  let task = document.createElement("input");
  task.setAttribute("type", "radio");
  task.setAttribute("name", "task-list");
  task.setAttribute("id", taskInput);
  if (tasksArray.length == 1) {
    task.setAttribute("checked", "true");
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
  let tasksArray = localStorage.getItem("upcomingTasks");
  tasksArray = JSON.parse(tasksArray);

  for (i = 0; i < tasksArray.length; i++) {
    renderOne(tasksArray[i]);
  }

  if (tasksArray.length != 0) {
    document.getElementById(tasksArray[0]).checked = true;
    document.getElementById("curr-task").children[0].innerHTML = tasksArray[0];
  }
}

renderAll();

const addTask = document.getElementById("new-task-btn");
addTask.onclick = function () {
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

const completed = document.getElementById("complete-task-btn");
completed.onclick = function () {
  let taskList = document.getElementById("task-list");
  let taskArray = [];

  if (completed.innerHTML == "Completed") {
    for (let box of taskList.childNodes) {
      if (box.checked) {
        //Completed tasks
        let completedTasks = localStorage.getItem("completedTasks");
        completedTasks = JSON.parse(completedTasks);
        let currentTaskName = document.getElementById("curr-task").children[0].innerHTML;
        for (i = 0; i < completedTasks.length; i++) {
          if (completedTasks[i].taskName == currentTaskName) {
            completedTasks[i].completed = true;
            console.log(completedTasks);
          }
        }

        let label = document.getElementById("label" + box.id);
        label.style.textDecoration = "line-through";
        completed.innerHTML = "Undo";
      } else {
        if (
          box.name == "task-list" &&
          document.getElementById("label" + box.id).style.textDecoration != "line-through"
        ) {
          taskArray.push(box.id);
        }
      }
    }
  } else {
    for (let box of taskList.childNodes) {
      let label = document.getElementById("label" + box.id);
      if (box.name == "task-list") {
        taskArray.push(box.id);
      }
      if (label != null && label.style.textDecoration == "line-through") {
        label.style.textDecoration = "none";
        completed.innerHTML = "Completed";
      }
    }

    //completed tasks
    // what is the point of this?
    let completedTasks = localStorage.getItem("completedTasks");
    completedTasks = JSON.parse(completedTasks);
    let currentTaskName = document.getElementById("curr-task").children[0].innerHTML;
    for (i = 0; i < completedTasks.length; i++) {
      if (completedTasks[i].taskName == currentTaskName) {
        completedTasks[i].completed = false;
        console.log(completedTasks);
      }
    }
  }

  localStorage.setItem("upcomingTasks", JSON.stringify(taskArray));

  if (taskArray.length > 0) {
    document.getElementById(taskArray[0]).checked = true;
    document.getElementById("curr-task").children[0].innerHTML = taskArray[0];
  } else {
    document.getElementById("curr-task").children[0].innerHTML = "None";
  }
};
