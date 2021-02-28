//Timer

const countdown = document.getElementById("countdown");
const title = document.getElementById("title-countdown");
const startBtn = document.getElementById("start-btn");
countdown.innerHTML = `${localStorage.getItem("workMins")}:00`;
const workBreakLabel = document.getElementById("work-break-label");
const completed = document.getElementById("complete-task-btn");
/*sound*/
const sound = document.getElementById("alarm-sound");

function startSound() {
  sound.play();
}

/**
timer
Uses the countdown h1 to set and run a timer of length designated by the startTime parameter.
*/

function timer() {
  completed.innerHTML = "Completed";
  if (startBtn.innerHTML == "Start") {
    completed.disabled = true;
    let taskList = document.getElementById("task-list");
    for( let task of taskList.childNodes ) {
      let label = document.getElementById("label" + task.id);
      if( label != null && label.style.textDecoration == 'line-through' ) {
        label.remove();
        task.remove();
      }
    }

    startBtn.innerHTML = "Cancel";
    document.getElementById("settings-btn").style.display = "none";
    updateCountdown(true);
  } else {
    completed.disabled = false;
    sound.pause();
    sound.currentTime = 0;
    updateCountdown(false);
    startBtn.innerHTML = "Start";
  }
}

function updateCountdown(IsOn) {
  const devMode = document.getElementById("dev-mode");
  if (IsOn) {
    if (localStorage.getItem("workOrBreak") == "work") {
      time = localStorage.getItem("workMins") * 60;
    } else if (localStorage.getItem("workOrBreak") == "break") {
      time = localStorage.getItem("shortBreakMins") * 60;
    } else if (localStorage.getItem("workOrBreak") == "longBreak") {
      time = localStorage.getItem("longBreakMins") * 60;
    }
    count = setInterval(updateTime, devMode.checked ? 10 : 1000);
    localStorage.setItem("intervalID", count);
  } else {
    document.getElementById("settings-btn").style.display = "block";
    clearInterval(localStorage.getItem("intervalID"));
    if (localStorage.getItem("workOrBreak") == "work") {
      countdown.innerHTML = `${localStorage.getItem("workMins")}:00`;
      title.innerHTML = `${localStorage.getItem("workMins")}:00`;
    } else if (localStorage.getItem("workOrBreak") != "work") {
      localStorage.setItem("workOrBreak", "work");
      countdown.innerHTML = `${localStorage.getItem("workMins")}:00`;
      title.innerHTML = `${localStorage.getItem("workMins")}:00`;
    }
    workBreakLabel.style.display = "none";
    completed.disabled = false;
  }
}

  function updateTime() {
    if(localStorage.getItem("workOrBreak") == "work"){
      workBreakLabel.style.display = "block";
      workBreakLabel.innerHTML = "Work Time";
    }
    if(localStorage.getItem("workOrBreak") == "break" || localStorage.getItem("workOrBreak") == "longBreak"){
      workBreakLabel.style.display = "block";
      workBreakLabel.innerHTML = "Break Time";
    }

    // if (localStorage.getItem("workOrBreak") == "work") {
    //   time = localStorage.getItem("workMins") * 60;
    // } else if (localStorage.getItem("workOrBreak") == "break") {
    //   time = localStorage.getItem("shortBreakMins") * 60;
    // } else if (localStorage.getItem("workOrBreak") == "longBreak") {
    //   time = localStorage.getItem("longBreakMins") * 60;
    // }

    time = time < 0 ? 0 : time;

    let mins = Math.floor(time / 60);
    let sec = time % 60;

    sec = sec < 10 ? "0" + sec : sec;

    title.innerHTML = `${mins}:${sec}`;
    countdown.innerHTML = `${mins}:${sec}`;
    time--;
    if (time == 0) {
      startSound();
      clearInterval(count);
      if (localStorage.getItem("workOrBreak") == "work") {
        localStorage.setItem(
          "numCurrentSech",
          1 + Number(localStorage.getItem("numCurrentSech"))
        );
        console.log(
          "Testing: Work session number " +
            localStorage.getItem("numCurrentSech")
        );
        if (
          localStorage.getItem("numCurrentSech") >=
          localStorage.getItem("numSessions")
        ) {
          localStorage.setItem("numCurrentSech", "0");
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
        localStorage.setItem("workOrBreak", "work");
        startBtn.innerHTML = "Start";
        updateCountdown(false);
        return;
      }
      updateCountdown(true);
    }
  }

startBtn.onclick = function () {
  timer();
};

module.exports = {
  timer,
  updateCountdown
};