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
const numbreaksSlider = document.getElementById('numbreaks-slider');
const numbreaksNumber = document.getElementById('numbreaks-number');

worktimeSlider.addEventListener('input', updateWorktime);
worktimeNumber.addEventListener('input', updateWorktime);
shortBreaktimeSlider.addEventListener('input', updateShortBreaktime);
shortBreaktimeNumber.addEventListener('input', updateShortBreaktime);
longBreaktimeSlider.addEventListener('input', updateLongBreaktime);
longBreaktimeNumber.addEventListener('input', updateLongBreaktime);
numbreaksSlider.addEventListener('input', updateNumbreaks);
numbreaksNumber.addEventListener('input', updateNumbreaks);

function updateWorktime(e){
  let num = e.target.value;
  worktimeSlider.value = num;
  worktimeNumber.value = num;
}

function updateShortBreaktime(e){
  let num = e.target.value;
  shortBreaktimeSlider.value = num;
  shortBreaktimeNumber.value = num;
}

function updateLongBreaktime(e){
  let num = e.target.value;
  longBreaktimeSlider.value = num;
  longBreaktimeNumber.value = num;
}

function updateNumbreaks(e){
  let num = e.target.value;
  numbreaksSlider.value = num;
  numbreaksNumber.value = num;
}
