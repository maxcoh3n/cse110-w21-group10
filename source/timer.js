/**
timer
Uses the countdown h1 to set and run a timer of length designated by the startTime parameter.
@param    startTime the length of the timer in minutes.
*/

function timer(startTime){

  let time = startTime * 60;

  const countdown = document.getElementById('countdown');

  setInterval(updateCountdown, 1000);

  function updateCountdown() {
    time = time < 0 ? 0 : time;

    let mins = Math.floor(time/60);
    let sec = time % 60;

    sec = sec < 10 ? '0' + sec : sec;

    countdown.innerHTML = `${mins}:${sec}`;
    time--;
  }
}


//Settings

var modal = document.getElementById("myModal");
var settingsBtn = document.getElementById("settingsBtn");
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
worktimeSlider.addEventListener('input', updateWorktimeValue);

const worktimeNumber = document.getElementById('worktime-number');
worktimeNumber.addEventListener('input', updateWorktimeValue);

const breaktimeSlider = document.getElementById('breaktime-slider');
breaktimeSlider.addEventListener('input', updateBreaktimeValue);

const breaktimeNumber = document.getElementById('breaktime-number');
breaktimeNumber.addEventListener('input', updateBreaktimeValue);

const numbreaksSlider = document.getElementById('numbreaks-slider');
numbreaksSlider.addEventListener('input', updateNumbreaksValue);

const numbreaksNumber = document.getElementById('numbreaks-number');
numbreaksNumber.addEventListener('input', updateNumbreaksValue);

function updateWorktimeValue(e){
  let num = e.target.value;
  worktimeSlider.value = num;
  worktimeNumber.value = num;
}

function updateBreaktimeValue(e){
  let num = e.target.value;
  breaktimeSlider.value = num;
  breaktimeNumber.value = num;
}

function updateNumbreaksValue(e){
  let num = e.target.value;
  numbreaksSlider.value = num;
  numbreaksNumber.value = num;
}


const startBtn = document.getElementById("startBtn");
startBtn.onclick = function() {
  timer(worktimeNumber.value);
  startBtn.disabled = true;
}
