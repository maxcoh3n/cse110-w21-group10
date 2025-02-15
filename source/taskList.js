import { getDate } from "./getDate.js";
import { renderStatistics } from "./statistics.js";
import { updateLogWhenPageRefresh } from "./pomoLog.js";

// adds listeners and refreshes when page is loaded
window.addEventListener("DOMContentLoaded", (event) => {
  renderAll();

  const addTask = document.getElementById("new-task-btn");
  addTask.addEventListener("click", addTaskEvent);

  const newTaskInput = document.getElementById("new-task");
  newTaskInput.addEventListener("keyup", keyUpEvent);

  const completed = document.getElementById("complete-task-btn");
  completed.addEventListener("click", completedEvent);
});

/**
 * @param {Object} taskInput
 * Takes the taskInput (task name) and renders that task to the task list
 */
function renderOne(taskInput) {
  const taskButton = document.getElementById("complete-task-btn");

  let taskList = document.getElementById("task-list");
  let tasksArray = localStorage.getItem("upcomingTasks");
  tasksArray = JSON.parse(tasksArray);

  let task = document.createElement("input");
  task.addEventListener("click", function () {
    let taskList = document.getElementById("task-list");

    let boxChecked = false;
    for (let box of taskList.childNodes) {
      if (box.checked) {
        boxChecked = true;
        let completedSessions = localStorage.getItem("completedSessions");
        completedSessions = JSON.parse(completedSessions);
        let foundTask = false;
        for (let i = 0; i < completedSessions.length; i++) {
          if (box.id == completedSessions[i].taskName && completedSessions[i].date == getDate()) {
            foundTask = true;
            if (completedSessions[i].completed == false) {
              document.getElementById("curr-task").children[0].innerHTML = box.id;
              taskButton.innerHTML = "Completed";
            } else {
              taskButton.innerHTML = "Undo";
              document.getElementById("curr-task").children[0].innerHTML = "Default Task";
            }
          }
        }
        if (foundTask == false) {
          document.getElementById("curr-task").children[0].innerHTML = box.id;
          taskButton.innerHTML = "Delete";
        }
      }
    }
    if (boxChecked == false) {
      document.getElementById("curr-task").children[0].innerHTML = "Default Task";
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

/**
 * runs on page load
 * renders all tasks in the upcomingTasks local storage to the task list
 */
function renderAll() {
  const taskButton = document.getElementById("complete-task-btn");
  let tasksArray = localStorage.getItem("upcomingTasks");
  tasksArray = JSON.parse(tasksArray);

  if (tasksArray.length == 0) {
    taskButton.disabled = true;
  } else {
    taskButton.disabled = false;
  }

  for (let i = 0; i < tasksArray.length; i++) {
    renderOne(tasksArray[i]);
  }

  if (tasksArray.length != 0) {
    let completedSessions = localStorage.getItem("completedSessions");
    completedSessions = JSON.parse(completedSessions);
    let foundTask = false;
    for (let i = 0; i < completedSessions.length; i++) {
      if (tasksArray[0] == completedSessions[i].taskName && completedSessions[i].date == getDate()) {
        foundTask = true;
        if (completedSessions[i].completed == false) {
          taskButton.innerHTML = "Completed";
        } else {
          taskButton.innerHTML = "Undo";
        }
      }
    }
    if (foundTask == false) {
      taskButton.innerHTML = "Delete";
    }

    document.getElementById(tasksArray[0]).checked = true;
    document.getElementById("curr-task").children[0].innerHTML = tasksArray[0];
  }
}

/**
 * adds a new task to the upcoming tasks list
 */
function addTaskEvent() {
  const taskButton = document.getElementById("complete-task-btn");
  let tasksArray = localStorage.getItem("upcomingTasks");
  tasksArray = JSON.parse(tasksArray);

  const newTaskInput = document.getElementById("new-task");

  if (tasksArray.includes(newTaskInput.value)) {
    newTaskInput.value = "";
  }

  let taskList = document.getElementById("task-list");
  for (let box of taskList.childNodes) {
    if (box.id == newTaskInput.value) {
      newTaskInput.value = "";
    }
  }

  let completedSessions = localStorage.getItem("completedSessions");
  completedSessions = JSON.parse(completedSessions);

  // if this was already completed today, we uncomplete it
  for (let task of completedSessions) {
    if (task.taskName == newTaskInput.value && task.date == getDate()) {
      task.completed = false;
      decNumCompletedTasks();
      decNumCompletedTaskSessions(task.durationArray.length);
    }
  }

  localStorage.setItem("completedSessions", JSON.stringify(completedSessions));

  if (newTaskInput.value) {
    tasksArray.push(newTaskInput.value);
    taskButton.disabled = false;
    localStorage.setItem("upcomingTasks", JSON.stringify(tasksArray));
    renderOne(newTaskInput.value);
    if (tasksArray.length == 1) {
      if (inCompleted(newTaskInput.value) == false) {
        taskButton.innerHTML = "Delete";
      } else {
        taskButton.innerHTML = "Completed";
      }
    }
    newTaskInput.value = "";
  }

  updateLogWhenPageRefresh();
}

/**
 * allows for enter key to add a new task to the task list
 */
function keyUpEvent(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    const addTask = document.getElementById("new-task-btn");
    addTask.click();
  }
}

/**
 * @param {string} taskInput - a task inputted by the user
 * Checking if the task is in completed session and date is today
 * If the task is found
 *  return true
 * else
 *  return false
 * determine if the button will say delete
 */
function inCompleted(taskName) {
  let completedSessions = localStorage.getItem("completedSessions");
  completedSessions = JSON.parse(completedSessions);
  for (let task of completedSessions) {
    if (task.taskName == taskName && task.date == getDate()) {
      return true;
    }
  }
  return false;
}

/**
 * @param {string} taskName - a task inputted by the user
 * Checking if the task is in progress of complete
 * If the task is found
 *  return true
 * else
 *  return false
 * determines if the button says undo or complete
 */
function isCompleted(taskName) {
  let completedSessions = localStorage.getItem("completedSessions");
  completedSessions = JSON.parse(completedSessions);
  for (let task of completedSessions) {
    if (task.taskName == taskName) {
      return task.completed;
    }
  }
  return false;
}

//must be here to be accessed by comple and undo functions
let completedTaskSessions = 0;

/**
 * Marked a task as completed
 * Strike through the task after task completed
 * Change the check to the next task
 */
function comple() {
  incNumCompletedTasks();

  let taskList = document.getElementById("task-list");
  let completedSessions = localStorage.getItem("completedSessions");
  completedSessions = JSON.parse(completedSessions);
  let taskArray = [];

  const completed = document.getElementById("complete-task-btn");
  for (let box of taskList.childNodes) {
    if (box.checked) {
      for (let i = 0; i < completedSessions.length; i++) {
        if (box.id == completedSessions[i].taskName && completedSessions[i].date == getDate()) {
          completedSessions[i].completed = true;
          completed.innerHTML = "Undo";
          document.getElementById("curr-task").children[0].innerHTML = "Default Task";
          completedTaskSessions = completedSessions[i].durationArray.length;
        }
      }
      localStorage.setItem("completedSessions", JSON.stringify(completedSessions));

      let label = document.getElementById("label" + box.id);
      label.style.textDecoration = "line-through";
    } else {
      if (box.name == "task-list" && document.getElementById("label" + box.id).style.textDecoration != "line-through") {
        taskArray.push(box.id);
      }
    }
  }
  incNumCompletedTaskSessions(completedTaskSessions);
  localStorage.setItem("upcomingTasks", JSON.stringify(taskArray));

  if (taskArray.length > 0) {
    document.getElementById(taskArray[0]).checked = true;
    document.getElementById("curr-task").children[0].innerHTML = taskArray[0];
    if (inCompleted(taskArray[0])) {
      if (isCompleted(taskArray[0])) {
        completed.innerHTML = "Undo";
      } else {
        completed.innerHTML = "Completed";
      }
    } else {
      completed.innerHTML = "Delete";
    }
  }
  updateLogWhenPageRefresh();
}

/**
 * Undo a task that marked completed
 */
function undo() {
  decNumCompletedTasks();
  decNumCompletedTaskSessions(completedTaskSessions);
  completedTaskSessions = 0;

  let taskList = document.getElementById("task-list");
  let taskArray = [];
  for (let box of taskList.childNodes) {
    let label = document.getElementById("label" + box.id);
    if (box.checked) {
      document.getElementById("curr-task").children[0].innerHTML = box.id;
      const completed = document.getElementById("complete-task-btn");
      completed.innerHTML = "Completed";
      label.style.textDecoration = "none";
      let completedSessions = localStorage.getItem("completedSessions");
      completedSessions = JSON.parse(completedSessions);
      for (let i = 0; i < completedSessions.length; i++) {
        if (box.id == completedSessions[i].taskName && completedSessions[i].date == getDate()) {
          completedSessions[i].completed = false;
        }
      }
      localStorage.setItem("completedSessions", JSON.stringify(completedSessions));
    }
    if (box.name == "task-list") {
      taskArray.push(box.id);
    }
  }
  localStorage.setItem("upcomingTasks", JSON.stringify(taskArray));
  updateLogWhenPageRefresh();
}

/**
 * handles the delete state for tasks
 */
function del() {
  let taskList = document.getElementById("task-list");
  document.getElementById("curr-task").children[0].innerHTML = "Default Task";
  let taskArray = [];
  let upcomingTasks = localStorage.getItem("upcomingTasks");
  upcomingTasks = JSON.parse(upcomingTasks);
  let nextTaskNum = 0;
  for (let box of taskList.childNodes) {
    let label = document.getElementById("label" + box.id);
    if (box.checked == true) {
      taskArray = upcomingTasks.filter((task) => task != box.id);
      label.remove();
      box.remove();
      break;
    }
    nextTaskNum++;
  }
  nextTaskNum = Math.floor(nextTaskNum / 2);
  localStorage.setItem("upcomingTasks", JSON.stringify(taskArray));

  const completed = document.getElementById("complete-task-btn");
  if (taskArray.length > 0) {
    if (nextTaskNum < taskArray.length) {
      document.getElementById(taskArray[nextTaskNum]).checked = true;
      document.getElementById("curr-task").children[0].innerHTML = taskArray[nextTaskNum];
      if (inCompleted(taskArray[nextTaskNum])) {
        if (isCompleted(taskArray[nextTaskNum])) {
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
      if (inCompleted(taskArray[0])) {
        if (isCompleted(taskArray[0])) {
          completed.innerHTML = "Undo";
        } else {
          completed.innerHTML = "Completed";
        }
      } else {
        completed.innerHTML = "Delete";
      }
    }
  }

  if (taskList.children.length != 0) {
    completed.disabled = false;
  } else {
    completed.disabled = true;
  }
}

/**
 * increases numCompletedTasks statistic
 */
function incNumCompletedTasks() {
  let stats = JSON.parse(localStorage.getItem("statistics"));
  stats.numCompletedTasks++;
  localStorage.setItem("statistics", JSON.stringify(stats));
  renderStatistics();
}

/**
 * decreases numCompletedTasks statistic
 */
function decNumCompletedTasks() {
  let stats = JSON.parse(localStorage.getItem("statistics"));
  stats.numCompletedTasks--;
  localStorage.setItem("statistics", JSON.stringify(stats));
  renderStatistics();
}

/*
 * increases numCompletedTaskSessions statistic
 * @param {number} numSessions
 */
function incNumCompletedTaskSessions(numSessions) {
  let stats = JSON.parse(localStorage.getItem("statistics"));
  stats.numCompletedTaskSessions += numSessions;
  localStorage.setItem("statistics", JSON.stringify(stats));
  renderStatistics();
}

/*
 * decreases numCompletedTaskSessions statistic
 * @param {number} numSessions
 */
function decNumCompletedTaskSessions(numSessions) {
  let stats = JSON.parse(localStorage.getItem("statistics"));
  stats.numCompletedTaskSessions -= numSessions;
  localStorage.setItem("statistics", JSON.stringify(stats));
  renderStatistics();
}

/**
 * handles the three phases for tasks
 */
function completedEvent() {
  const completed = document.getElementById("complete-task-btn");
  if (completed.innerHTML == "Completed") {
    comple();
  } else if (completed.innerHTML == "Undo") {
    undo();
  } else if (completed.innerHTML == "Delete") {
    del();
  }
}

export {
  renderOne,
  renderAll,
  addTaskEvent,
  keyUpEvent,
  inCompleted,
  isCompleted,
  comple,
  undo,
  del,
  incNumCompletedTasks,
  decNumCompletedTasks,
  incNumCompletedTaskSessions,
  decNumCompletedTaskSessions,
  completedEvent,
};
