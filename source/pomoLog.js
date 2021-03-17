// repopulates pomo log when page is refreshed.
window.addEventListener("DOMContentLoaded", (event) => {
  updateLogWhenPageRefresh();
});

/**
 *
 * @param {*} newTask new item to pomo log, newTask is the new item from local storage
 */
function AddToLog(newTask) {
  let dailyLog = document.getElementById("log-list");
  let customElement = document.createElement("completed-task");

  customElement.setAttribute("name", newTask.taskName);
  customElement.setAttribute("date", newTask.date);
  customElement.setAttribute("id", newTask.taskName + " " + newTask.date);

  customElement.setAttribute("totaltime", JSON.stringify(newTask.durationArray));
  dailyLog.prepend(customElement);
}

/**
 * @param {*} updatedTask
 * @returns When the correct Task was found to save some for loop iterations.
 *  updates an existing pomo log entry, updatedTask is the task to update.
 */
function updatePomoLog(updatedTask) {
  let dailyLog = document.getElementById("log-list");
  let children = dailyLog.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].id == updatedTask.taskName + " " + updatedTask.date) {
      children[i].setAttribute("finishedses", localStorage.getItem("workMins"));
      return;
    }
  }
}

//
/**
 * repopulates pomo log using data in local storage.
 */
function updateLogWhenPageRefresh() {
  let dailyLog = document.getElementById("log-list");
  while (dailyLog.firstChild) {
    dailyLog.removeChild(dailyLog.firstChild);
  }
  let completedSessions = localStorage.getItem("completedSessions");
  completedSessions = JSON.parse(completedSessions);
  for (let i = completedSessions.length - 1; i >= 0; i--) {
    RenderToLog(completedSessions[i]);
  }
}

/**
 * @param {*} newTask
 * Renders a new task to the pomo log.
 * Builds a custom component with data from local storage and appends it to the log.
 */
function RenderToLog(newTask) {
  let dailyLog = document.getElementById("log-list");
  let customElement = document.createElement("completed-task");

  customElement.setAttribute("name", newTask.taskName);
  customElement.setAttribute("date", newTask.date);
  customElement.setAttribute("id", newTask.taskName + " " + newTask.date);
  if (newTask.completed) {
    customElement.setAttribute("isdone", 1);
  } else {
    customElement.setAttribute("isdone", 0);
  }

  customElement.setAttribute("totaltime", JSON.stringify(newTask.durationArray));
  dailyLog.appendChild(customElement);
}

/*
 * clears the display of the log to the user
 */
function clearLog() {
  let dailyLog = document.getElementById("log-list");
  while (dailyLog.firstChild) {
    dailyLog.removeChild(dailyLog.firstChild);
  }
}

export { updatePomoLog, AddToLog, clearLog, updateLogWhenPageRefresh };
