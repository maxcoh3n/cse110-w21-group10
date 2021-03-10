// renders statistics is refreshed.
window.addEventListener("DOMContentLoaded", (event) => {
  renderStatistics();
});

function renderStatistics() {
  const numCompletedTasks = document.getElementById("num-tasks-completed").childNodes[2];
  const avgSessionsPerDay = document.getElementById("avg-sessions-per-day").childNodes[2];
  const avgTasksPerDay = document.getElementById("average-tasks-per-day").childNodes[2];
  const avgSessionsPerTask = document.getElementById("avg-sessions-per-task").childNodes[2];

  const statsObj = JSON.parse(localStorage.getItem("statistics"));

  numCompletedTasks.innerHTML = statsObj.numCompletedTasks;

  if (statsObj.numCompletedTasks > 0) {
    avgSessionsPerTask.innerHTML = (statsObj.numCompletedTaskSessions / statsObj.numCompletedTasks).toFixed(2);
  } else {
    avgSessionsPerTask.innerHTML = "N/A";
  }

  if (statsObj.numDaysWorking > 0) {
    avgTasksPerDay.innerHTML = (statsObj.numCompletedTasks / statsObj.numDaysWorking).toFixed(2);
    avgSessionsPerDay.innerHTML = (statsObj.numSessions / statsObj.numDaysWorking).toFixed(2);
  } else {
    avgTasksPerDay.innerHTML = "N/A";
    avgSessionsPerDay.innerHTML = "N/A";
  }
}

export { renderStatistics };