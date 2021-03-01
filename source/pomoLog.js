function AddToLog(finishedTask) {
  // want to add log list to local storage?
  // do we want to remove fisnihed tasks from storage and move it over here?
  // need to implament with undo button

  //   let logTasks = localStorage.getItem("logTasks");
  //   logTasks = JSON.parse(logTasks);
  //   logTasks.push(finishedTask);
  //   localStorage.setItem("logTasks", JSON.stringify(logTasks));
  //   console.log(localStorage.getItem("logTasks"));

  let dailyLog = document.getElementById("log-list");
  let customElement = document.createElement("completed-task");

  customElement.setAttribute("name", finishedTask.taskName);
  customElement.setAttribute("date", finishedTask.date);

  let totalTime = 0;
  for (let i = 0; i < finishedTask.durationArray.length; i++) {
    totalTime = totalTime + Number(finishedTask.durationArray[i]);
  }
  customElement.setAttribute("totalTime", totalTime);
  dailyLog.appendChild(customElement);
}
