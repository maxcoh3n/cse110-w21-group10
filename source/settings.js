//Settings

var modal = document.getElementById("my-modal");
var settingsBtn = document.getElementById("settings-btn");
var span = document.getElementsByClassName("close")[0];

settingsBtn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const worktimeSlider = document.getElementById("worktime-slider");
const worktimeNumber = document.getElementById('worktime-number');
const shortBreaktimeSlider = document.getElementById('short-breaktime-slider');
const shortBreaktimeNumber = document.getElementById('short-breaktime-number');
const longBreaktimeSlider = document.getElementById('long-breaktime-slider');
const longBreaktimeNumber = document.getElementById('long-breaktime-number');
const numSessionsSlider = document.getElementById('num-sessions-slider');
const numSessionsNumber = document.getElementById('num-sessions-number');

worktimeSlider.value = localStorage.getItem('workMin');
worktimeNumber.value = localStorage.getItem('workMin');
shortBreaktimeSlider.value = localStorage.getItem('shortBreakMin');
shortBreaktimeNumber.value = localStorage.getItem('shortBreakMin');
longBreaktimeSlider.value = localStorage.getItem('longBreakMin');
longBreaktimeNumber.value = localStorage.getItem('longBreakMin');
numSessionsSlider.value = localStorage.getItem('numSessions');
numSessionsNumber.value = localStorage.getItem('numSessions');

worktimeSlider.addEventListener('input', updateWorktime);
worktimeNumber.addEventListener('input', updateWorktime);
shortBreaktimeSlider.addEventListener('input', updateShortBreaktime);
shortBreaktimeNumber.addEventListener('input', updateShortBreaktime);
longBreaktimeSlider.addEventListener('input', updateLongBreaktime);
longBreaktimeNumber.addEventListener('input', updateLongBreaktime);
numSessionsSlider.addEventListener('input', updateNumSessions);
numSessionsNumber.addEventListener('input', updateNumSessions);

function updateWorktime(e){
  let num = e.target.value;
  worktimeSlider.value = num;
  worktimeNumber.value = num;
  localStorage.setItem('workMin', num);
}

function updateShortBreaktime(e){
  let num = e.target.value;
  shortBreaktimeSlider.value = num;
  shortBreaktimeNumber.value = num;
  localStorage.setItem('shortBreakMin', num);
}

function updateLongBreaktime(e){
  let num = e.target.value;
  longBreaktimeSlider.value = num;
  longBreaktimeNumber.value = num;
  localStorage.setItem('longBreakMin', num);
}

function updateNumSessions(e){
  let num = e.target.value;
  numSessionsSlider.value = num;
  numSessionsNumber.value = num;
  localStorage.setItem('numSessions', num);
}
