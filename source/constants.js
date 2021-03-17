// sets constants when page is refreshed - must be before domcontentloaded
setLocalStorageDefaults();

/**
 * Sets all default values in localstorage if they do not exist yet
 */
function setLocalStorageDefaults() {
  let workMins = localStorage.getItem("workMins");
  if (!workMins) localStorage.setItem("workMins", "25");

  let shortBreakMins = localStorage.getItem("shortBreakMins");
  if (!shortBreakMins) localStorage.setItem("shortBreakMins", "5");

  let longBreakMins = localStorage.getItem("longBreakMins");
  if (!longBreakMins) localStorage.setItem("longBreakMins", "15");

  let numSessions = localStorage.getItem("numSessions");
  if (!numSessions) localStorage.setItem("numSessions", "4");

  let vol = localStorage.getItem("vol");
  if (!vol) localStorage.setItem("vol", "50");

  let soundType = localStorage.getItem("soundType");
  if (!soundType) localStorage.setItem("soundType", "./sounds/alarm_clock_0.mp3");

  let completedSessions = localStorage.getItem("completedSessions");
  if (!completedSessions) localStorage.setItem("completedSessions", "[]");

  let upcomingTasks = localStorage.getItem("upcomingTasks");
  if (!upcomingTasks) localStorage.setItem("upcomingTasks", "[]");

  let workOrBreak = localStorage.getItem("workOrBreak");
  if (workOrBreak != "work") {
    localStorage.setItem("workOrBreak", "work");
  }
  let numCurrentSech = localStorage.getItem("numCurrentSech");
  if (numCurrentSech != 0) localStorage.setItem("numCurrentSech", "0");

  let statistics = localStorage.getItem("statistics");
  let statsObj = {
    numCompletedTaskSessions: 0,
    numCompletedTasks: 0,
    numSessions: 0,
    numDaysWorking: 0,
    numDistractions: 0,
  };
  if (!statistics) localStorage.setItem("statistics", JSON.stringify(statsObj));

  let lastDayWorked = localStorage.getItem("lastDayWorked");
  if (!lastDayWorked) localStorage.setItem("lastDayWorked", "");
}

export { setLocalStorageDefaults };
