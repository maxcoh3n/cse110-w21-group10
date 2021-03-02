// repopulates pomo log when page is refreshed.
updateLogWhenPageRefresh();

// adds new item to pomo log, newTask is the new item from local storage
function AddToLog(newTask) {
  let dailyLog = document.getElementById("log-list");
  let customElement = document.createElement("completed-task");

  customElement.setAttribute("name", newTask.taskName);
  customElement.setAttribute("date", newTask.date);
  customElement.setAttribute("id", newTask.taskName + " " + newTask.date);

  customElement.setAttribute(
    "totaltime",
    JSON.stringify(newTask.durationArray)
  );
  dailyLog.prepend(customElement);
}

// updates an existing pomo log entry, updatedTask is the taks to update
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
// repopulates pomo log from data in local storage
function updateLogWhenPageRefresh() {
  let completedSessions = localStorage.getItem("completedSessions");
  completedSessions = JSON.parse(completedSessions);
  for (let i = completedSessions.length - 1; i >= 0; i--) {
    RenderToLog(completedSessions[i]);
  }
}
function RenderToLog(newTask) {
  let dailyLog = document.getElementById("log-list");
  let customElement = document.createElement("completed-task");

  customElement.setAttribute("name", newTask.taskName);
  customElement.setAttribute("date", newTask.date);
  customElement.setAttribute("id", newTask.taskName + " " + newTask.date);

  customElement.setAttribute(
    "totaltime",
    JSON.stringify(newTask.durationArray)
  );
  dailyLog.appendChild(customElement);
}
