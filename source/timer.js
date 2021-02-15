/**
timer
Uses the countdown h1 to set and run a timer of length designated by the startTime parameter.

@param    startTime the length of the timer in minutes.
*/

function timer(startTime){

  let startingMins = startTime;
  let time = startingMins * 60;

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

timer(25);
