//Timer

const countdown = document.getElementById("countdown");
const title = document.getElementById("title-countdown");
const startBtn = document.getElementById("start-btn");
countdown.innerHTML = `${localStorage.getItem("workMins")}:00`;

/**
timer
Uses the countdown h1 to set and run a timer of length designated by the startTime parameter.
*/

function timer() {
  if (startBtn.innerHTML == "Start") {
    startBtn.innerHTML = "cancel";
    document.getElementById("settings-btn").style.display = "none";
    updateCountdown(true);
  } else {
    updateCountdown(false);
    startBtn.innerHTML = "Start";
  }
}

function updateCountdown(IsOn) {
  const devMode = document.getElementById("dev-mode");
  if (IsOn) {
    if (localStorage.getItem("workOrBreak") == "work") {
      time = localStorage.getItem("workMins") * 60;
      count = setInterval(updateTime, devMode.checked ? 10 : 1000);
      localStorage.setItem("intervalID", count);
    } else if (localStorage.getItem("workOrBreak") == "break") {
      time = localStorage.getItem("shortBreakMins") * 60;
      count = setInterval(updateTime, devMode.checked ? 10 : 1000);
      localStorage.setItem("intervalID", count);
    } else if (localStorage.getItem("workOrBreak") == "longBreak") {
      time = localStorage.getItem("longBreakMins") * 60;
      count = setInterval(updateTime, devMode.checked ? 10 : 1000);
      localStorage.setItem("intervalID", count);
    }
  } else {
    document.getElementById("settings-btn").style.display = "block";
    clearInterval(localStorage.getItem("intervalID"));
    if (localStorage.getItem("workOrBreak") == "work") {
      countdown.innerHTML = `${localStorage.getItem("workMins")}:00`;
    } else if (localStorage.getItem("workOrBreak") == "break") {
      countdown.innerHTML = `${localStorage.getItem("shortBreakMins")}:00`;
    } else if (localStorage.getItem("workOrBreak") == "longBreak") {
      countdown.innerHTML = `${localStorage.getItem("longBreakMins")}:00`;
    }
  }

  function updateTime() {
    time = time < 0 ? 0 : time;

    let mins = Math.floor(time / 60);
    let sec = time % 60;

    sec = sec < 10 ? "0" + sec : sec;

    title.innerHTML = `${mins}:${sec}`;
    countdown.innerHTML = `${mins}:${sec}`;
    time--;
    if (time == 0) {
      clearInterval(count);
      if (localStorage.getItem("workOrBreak") == "work") {
        localStorage.setItem(
          "numCurrentSech",
          1 + Number(localStorage.getItem("numCurrentSech"))
        );
        console.log(localStorage.getItem("numCurrentSech"));
        if (
          localStorage.getItem("numCurrentSech") >=
          localStorage.getItem("numSessions")
        ) {
          localStorage.setItem("workOrBreak", "longBreak");
        } else {
          localStorage.setItem("workOrBreak", "break");
        }
      } else if (localStorage.getItem("workOrBreak") == "break") {
        localStorage.setItem("workOrBreak", "work");
        startBtn.innerHTML = "Start";
        updateCountdown(false);
        return;
      } else if (localStorage.getItem("workOrBreak") == "longBreak") {
        localStorage.setItem("numCurrentSech", "0");
        localStorage.setItem("workOrBreak", "work");
        startBtn.innerHTML = "Start";
        updateCountdown(false);
        return;
      }
      updateCountdown(true);
    }
  }
}

startBtn.onclick = function () {
  timer();
};
