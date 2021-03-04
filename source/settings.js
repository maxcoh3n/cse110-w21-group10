//Settings

let modal = document.getElementById('my-modal');

let settingsBtn = document.getElementById('settings-btn');
settingsBtn.onclick = function () {
  modal.style.display = 'block';
};

let span = document.getElementsByClassName('close')[0];
span.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

//Work Time
const worktimeSlider = document.getElementById('worktime-slider');
worktimeSlider.value = localStorage.getItem('workMins');
worktimeSlider.addEventListener('input', updateWorktime);

const worktimeNumber = document.getElementById('worktime-number');
worktimeNumber.value = localStorage.getItem('workMins');
worktimeNumber.addEventListener('input', updateWorktime);

function updateWorktime(e) {
  let num = e.target.value;
  worktimeSlider.value = num;
  worktimeNumber.value = num;
  localStorage.setItem('workMins', num);
  document.getElementById('countdown').innerHTML = localStorage.getItem('workMins') + ':00';
}

//Short Breaktime
const shortBreaktimeSlider = document.getElementById('short-breaktime-slider');
shortBreaktimeSlider.value = localStorage.getItem('shortBreakMins');
shortBreaktimeSlider.addEventListener('input', updateShortBreaktime);

const shortBreaktimeNumber = document.getElementById('short-breaktime-number');
shortBreaktimeNumber.value = localStorage.getItem('shortBreakMins');
shortBreaktimeNumber.addEventListener('input', updateShortBreaktime);

function updateShortBreaktime(e) {
  let num = e.target.value;
  shortBreaktimeSlider.value = num;
  shortBreaktimeNumber.value = num;
  localStorage.setItem('shortBreakMins', num);
}

//Long Breaktime
const longBreaktimeSlider = document.getElementById('long-breaktime-slider');
longBreaktimeSlider.value = localStorage.getItem('longBreakMins');
longBreaktimeSlider.addEventListener('input', updateLongBreaktime);

const longBreaktimeNumber = document.getElementById('long-breaktime-number');
longBreaktimeNumber.value = localStorage.getItem('longBreakMins');
longBreaktimeNumber.addEventListener('input', updateLongBreaktime);

function updateLongBreaktime(e) {
  let num = e.target.value;
  longBreaktimeSlider.value = num;
  longBreaktimeNumber.value = num;
  localStorage.setItem('longBreakMins', num);
}

//Number of Work Sessions Before Long Break
const numSessionsSlider = document.getElementById('num-sessions-slider');
numSessionsSlider.value = localStorage.getItem('numSessions');
numSessionsSlider.addEventListener('input', updateNumSessions);

const numSessionsNumber = document.getElementById('num-sessions-number');
numSessionsNumber.value = localStorage.getItem('numSessions');
numSessionsNumber.addEventListener('input', updateNumSessions);

function updateNumSessions(e) {
  let num = e.target.value;
  numSessionsSlider.value = num;
  numSessionsNumber.value = num;
  localStorage.setItem('numSessions', num);
}
