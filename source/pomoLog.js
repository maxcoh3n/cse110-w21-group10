// repopulates pomo log when page is refreshed.
updateLogWhenPageRefresh();

// adds new item to pomo log, newTask is the new item from local storage
function AddToLog(newTask) {
  // want to add log list to local storage?
  // do we want to remove fisnihed tasks from storage and move it over here?
  // need to implament with undo button

  //   let logTasks = localStorage.getItem("logTasks");
  //   logTasks = JSON.parse(logTasks);
  //   logTasks.push(newTask);
  //   localStorage.setItem("logTasks", JSON.stringify(logTasks));
  //   console.log(localStorage.getItem("logTasks"));

  let dailyLog = document.getElementById("log-list");
  let customElement = document.createElement("completed-task");

  customElement.setAttribute("name", newTask.taskName);
  customElement.setAttribute("date", newTask.date);
  customElement.setAttribute("id", newTask.taskName + " " + newTask.date);

  let totalTime = 0;
  for (let i = 0; i < newTask.durationArray.length; i++) {
    totalTime = totalTime + Number(newTask.durationArray[i]);
  }
  customElement.setAttribute("totaltime", totalTime);
  dailyLog.appendChild(customElement);
}

// updates an existing pomo log entry, updatedTask is the taks to update
function updatePomoLog(updatedTask) {
  let dailyLog = document.getElementById("log-list");
  let children = dailyLog.children;
  for (let i = 0; i < children.length; i++) {
    if (children[i].id == updatedTask.taskName + " " + updatedTask.date) {
      children[i].setAttribute(
        "totaltime",
        Number(children[i].getAttribute("totaltime")) +
          Number(localStorage.getItem("workMins"))
      );
      return;
    }
  }
}
// repopulates pomo log from data in local storage
function updateLogWhenPageRefresh() {
  let completedSessions = localStorage.getItem("completedSessions");
  completedSessions = JSON.parse(completedSessions);
  for (let i = 0; i < completedSessions.length; i++) {
    AddToLog(completedSessions[i]);
  }
}
