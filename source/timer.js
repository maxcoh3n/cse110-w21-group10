//Timer

var count;
const countdown = document.getElementById('countdown');
const title = document.getElementById('title-countdown');

/**
timer
Uses the countdown h1 to set and run a timer of length designated by the startTime parameter.
@param    startTime the length of the timer in minutes.
*/

function timer(startTime){

  let time = startTime * 60;

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
  timer(worktimeNumber.value);
  startBtn.disabled = true;
  cancelBtn.disabled = false;
}

/**
cancelBtn
When cancel button is clicked while timer is in progress, countdown is set to 0:00
*/
const cancelBtn = document.getElementById("cancel-btn");
cancelBtn.onclick = function() {
  if( worktimeNumber.value > 0 && startBtn.disabled ) {
    clearInterval(count);
    title.innerHTML = "0:00";
    countdown.innerHTML = "0:00";
    startBtn.disabled = false;
    cancelBtn.disabled = true;
  }
}
