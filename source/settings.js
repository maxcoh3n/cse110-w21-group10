//Settings

var modal = document.getElementById("my-modal");
var settingsBtn = document.getElementById("settings-btn");
var span = document.getElementsByClassName("close")[0];

settingsBtn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const worktimeSlider = document.getElementById("worktime-slider");
const worktimeNumber = document.getElementById("worktime-number");
const shortBreaktimeSlider = document.getElementById("short-breaktime-slider");
const shortBreaktimeNumber = document.getElementById("short-breaktime-number");
const longBreaktimeSlider = document.getElementById("long-breaktime-slider");
const longBreaktimeNumber = document.getElementById("long-breaktime-number");
const numSessionsSlider = document.getElementById("num-sessions-slider");
const numSessionsNumber = document.getElementById("num-sessions-number");

worktimeSlider.value = localStorage.getItem("workMins");
worktimeNumber.value = localStorage.getItem("workMins");
shortBreaktimeSlider.value = localStorage.getItem("shortBreakMins");
shortBreaktimeNumber.value = localStorage.getItem("shortBreakMins");
longBreaktimeSlider.value = localStorage.getItem("longBreakMins");
longBreaktimeNumber.value = localStorage.getItem("longBreakMins");
numSessionsSlider.value = localStorage.getItem("numSessions");
numSessionsNumber.value = localStorage.getItem("numSessions");

worktimeSlider.addEventListener("input", updateWorktime);
worktimeNumber.addEventListener("input", updateWorktime);
shortBreaktimeSlider.addEventListener("input", updateShortBreaktime);
shortBreaktimeNumber.addEventListener("input", updateShortBreaktime);
longBreaktimeSlider.addEventListener("input", updateLongBreaktime);
longBreaktimeNumber.addEventListener("input", updateLongBreaktime);
numSessionsSlider.addEventListener("input", updateNumSessions);
numSessionsNumber.addEventListener("input", updateNumSessions);

function updateWorktime(e) {
  let num = e.target.value;
  worktimeSlider.value = num;
  worktimeNumber.value = num;
  localStorage.setItem("workMins", num);
  document.getElementById("countdown").innerHTML =
    localStorage.getItem("workMins") + ":00";
}

function updateShortBreaktime(e) {
  let num = e.target.value;
  shortBreaktimeSlider.value = num;
  shortBreaktimeNumber.value = num;
  localStorage.setItem("shortBreakMins", num);
}

function updateLongBreaktime(e) {
  let num = e.target.value;
  longBreaktimeSlider.value = num;
  longBreaktimeNumber.value = num;
  localStorage.setItem("longBreakMins", num);
}

function updateNumSessions(e) {
  let num = e.target.value;
  numSessionsSlider.value = num;
  numSessionsNumber.value = num;
  localStorage.setItem("numSessions", num);
}

module.exports = {
  updateLongBreaktime,
  updateNumSessions,
  updateShortBreaktime,
  updateWorktime 
};
