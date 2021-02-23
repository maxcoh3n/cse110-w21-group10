//Timer

const countdown = document.getElementById('countdown');
const title = document.getElementById('title-countdown');
const startBtn = document.getElementById("start-btn");

/*sound*/
const sound = document.getElementById("alarm-sound");
function startMusic() {
  sound.play();
}



/**
timer
Uses the countdown h1 to set and run a timer of length designated by the startTime parameter.
*/

function timer(){

  if( startBtn.innerHTML == "Start" ) {
    const devMode = document.getElementById("dev-mode");


    time = localStorage.getItem('workMins') * 60;
    count = setInterval(updateCountdown, devMode.checked? 10: 1000);
    startBtn.innerHTML = "Cancel";
  } else {
    sound.pause();
    sound.currentTime = 0;

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
    if (time === 0) {
      startMusic();
    }
  }
}


startBtn.onclick = function() {
  timer();
}
