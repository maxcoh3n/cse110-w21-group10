//Timer

var count;
var time;
const countdown = document.getElementById('countdown');
const title = document.getElementById('title-countdown');

/**
timer
Uses the countdown h1 to set and run a timer of length designated by the startTime parameter.
@param    startTime the length of the timer in minutes.
*/

function timer(startTime){

  time = startTime * 60;

  count = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    time = time < 0 ? 0 : time;

    let mins = Math.floor(time/60);
    let sec = time % 60;

    sec = sec < 10 ? '0' + sec : sec;

    title.innerHTML = `${mins}:${sec}`
    countdown.innerHTML = `${mins}:${sec}`;
    time--;
  }
}


const startBtn = document.getElementById("start-btn");
startBtn.onclick = function() {
  if( time <  (worktimeNumber.value * 60) && time > 0 ) {
    clearInterval(count);
    time = 0;
    title.innerHTML = "0:00";
    countdown.innerHTML = "0:00";
    startBtn.innerHTML = "Start";
  } else {
    timer(worktimeNumber.value);
    startBtn.innerHTML = "Cancel";
  }
}

