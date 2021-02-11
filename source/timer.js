const startMins = 25;
let time = startMins*60;

const countdown = document.getElementByID('countdown');

setInterval(updateCountdown, 1000);

function updateCountdown(){
   const mins = Math.floor(time/60);
   let sec = time%60;
   
   //sec = sec < 10
   
   countdown.innerHTML = `${mins}: ${sec}`;
   time--;

}
