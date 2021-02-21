//Timer

const countdown = document.getElementById('countdown');
const title = document.getElementById('title-countdown');
const startBtn = document.getElementById("start-btn");

/**
timer
Uses the countdown h1 to set and run a timer of length designated by the startTime parameter.
*/

function timer(){

  if( startBtn.innerHTML == "Start" ) {
    time = localStorage.getItem('workMin') * 60;
    count = setInterval(updateCountdown, 1000);
    startBtn.innerHTML = "Cancel";
  } else {
    time = 0;
    clearInterval(count);
    title.innerHTML = "0:00";
    countdown.innerHTML = "0:00";
    startBtn.innerHTML = "Start";
  }

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

startBtn.onclick = function() {
  timer();
}
