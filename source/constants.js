let workMins = localStorage.getItem("workMins");
if (!workMins) localStorage.setItem("workMins", "25");

let shortBreakMins = localStorage.getItem("shortBreakMins");
if (!shortBreakMins) localStorage.setItem("shortBreakMins", "5");

let longBreakMins = localStorage.getItem("longBreakMins");
if (!longBreakMins) localStorage.setItem("longBreakMins", "15");

let numSessions = localStorage.getItem("numSessions");
if (!numSessions) localStorage.setItem("numSessions", "4");

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

let logTasks = localStorage.getItem("logTasks");
if (!logTasks) {
  localStorage.setItem("logTasks", "[]");
}
