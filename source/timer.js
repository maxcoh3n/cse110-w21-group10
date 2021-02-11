let startingMins = 25;
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
