//Timer
import { updatePomoLog, AddToLog } from "./pomoLog.js";
import { changeSession, endBreak, startLongBreak, resetColors } from "./sessionCircles.js";
import { renderStatistics } from "./statistics.js";
import { getDate } from "./getDate.js";
import { drawHorseShoe, stopHorseShoe } from "./horseshoe.js";

// Adds an event listener to the start button when page is loaded.
window.addEventListener("DOMContentLoaded", (event) => {
  const countdown = document.getElementById("countdown");
  countdown.innerHTML = `${localStorage.getItem("workMins")}:00`;

  const startBtn = document.getElementById("start-btn");
  startBtn.addEventListener("click", start);
});

/**
 * Starts the timer, duration depend on user input for work time
 * and styling features depend on break or work time
 */
function start() {
  timer();
}

let sessionNum = localStorage.getItem("numCurrentSech");

/**
 * Uses the countdown h1 to set and run a
 * timer of length designated by the startTime parameter.
 * If the button with "start" is clicked
 *  disable completed button
 *  Change the button to "Cancel"
 * If the button with "cancel" is clicked
 *  Enable choosing task
 *  Stop countdown
 *  Change the button to "Start".
 */
function timer() {
  const sound = document.getElementById("alarm-sound");

  const completed = document.getElementById("complete-task-btn");
  completed.innerHTML = "Completed";
  let removeLabels = [];
  let removeTasks = [];

  const startBtn = document.getElementById("start-btn");
  if (startBtn.innerHTML == "Start") {
    const vol = localStorage.getItem("vol");
    sound.volume = vol / 100;
    completed.disabled = true;
    let taskList = document.getElementById("task-list");
    for (let task of taskList.childNodes) {
      task.disabled = true;
      let label = document.getElementById("label" + task.id);
      if (label != null && label.style.textDecoration == "line-through") {
        removeLabels.push(label);
        removeTasks.push(task);
      }
    }
    for (let label of removeLabels) {
      label.remove();
    }
    for (let task of removeTasks) {
      task.remove();
    }

    startBtn.innerHTML = "Cancel";

    // Disable all other features
    document.getElementById("settings-btn").disabled = true;
    document.getElementById("settings-btn").style.opacity = "60%";
    document.getElementById("task-list-container").style.opacity = "60%";
    document.getElementById("new-task").disabled = true;
    document.getElementById("new-task-btn").disabled = true;
    document.getElementById("info-btn").disabled = true;
    let pomologBtn = document.getElementById("pomo-toggle");
    pomologBtn.disabled = true;
    document.getElementById("pomo-label").style.opacity = "60%";
    let pomologOpen = pomologBtn.checked;
    pomologBtn.checked = false;
    localStorage.setItem("pomologOpen", String(pomologOpen));
    let maxSessions = localStorage.getItem("numSessions");
    if (sessionNum >= maxSessions) {
      sessionNum = 0;
    }
    endBreak(sessionNum);

    updateCountdown(true);
  } else {
    stopHorseShoe();

    // Enable all other features
    document.getElementById("settings-btn").disabled = false;
    document.getElementById("settings-btn").style.opacity = "100%";
    document.getElementById("task-list-container").style.opacity = "100%";
    document.getElementById("new-task-container").style.opacity = "100%";
    document.getElementById("new-task").disabled = false;
    document.getElementById("new-task-btn").disabled = false;
    document.getElementById("info-btn").disabled = false;
    let pomologBtn = document.getElementById("pomo-toggle");
    pomologBtn.disabled = false;
    document.getElementById("pomo-label").style.opacity = "100%";
    pomologBtn.checked = localStorage.getItem("pomologOpen") == "true" ? true : false;

    resetColors();

    let completedSessions = localStorage.getItem("completedSessions");
    completedSessions = JSON.parse(completedSessions);
    let currentTaskName = document.getElementById("curr-task").children[0].innerHTML;
    let newTask = true;
    for (let i = 0; i < completedSessions.length; i++) {
      if (completedSessions[i].taskName == currentTaskName) {
        newTask = false;
        break;
      }
    }
    if (newTask == true) {
      completed.innerHTML = "Delete";
    } else {
      completed.innerHTML = "Completed";
    }

    let taskList = document.getElementById("task-list");
    for (let task of taskList.childNodes) {
      task.disabled = false; // enables changing tasks
    }
    completed.disabled = false;
    sound.pause();
    sound.currentTime = 0;
    updateCountdown(false);
    startBtn.innerHTML = "Start";
  }
}

/**
 * @param {boolean} IsOn
 * If the condition input is true
 *  Set time equal to work or short break or long break
 *  Start counting down the timer
 * If the condition input is false
 *  Display the time of work or short break or long break
 *  without counting down
 *  disable the complete button
 */
function updateCountdown(IsOn) {
  const title = document.getElementById("title-countdown");

  const devMode = Number(localStorage.getItem("devMode"));
  if (IsOn) {
    var time; // must be var so that updateTime can access it
    if (localStorage.getItem("workOrBreak") == "work") {
      time = localStorage.getItem("workMins") * 60;
      drawHorseShoe(time / 60, 1, devMode ? true : false);
    } else if (localStorage.getItem("workOrBreak") == "break") {
      time = localStorage.getItem("shortBreakMins") * 60;
      drawHorseShoe(time / 60, -1, devMode ? true : false);
    } else if (localStorage.getItem("workOrBreak") == "longBreak") {
      time = localStorage.getItem("longBreakMins") * 60;
      drawHorseShoe(time / 60, -1, devMode ? true : false);
    }
    var count = setInterval(updateTime, devMode ? 0.5 : 1000);
    localStorage.setItem("intervalID", count);
  } else {
    let taskList = document.getElementById("task-list");
    for (let task of taskList.childNodes) {
      task.disabled = false; // enables changing tasks
    }
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

    const completed = document.getElementById("complete-task-btn");
    completed.disabled = false;
  }

  /**
   * Display the if the user is currently in work time or break time
   * Count down the timer
   * When the time reach 0
   * Notify use with alarm sound
   * Add new completed session with the current task
   * Add the complete task to log
   */
  function updateTime() {
    const startBtn = document.getElementById("start-btn");

    time--;
    time = time < 0 ? 0 : time;

    let mins = Math.floor(time / 60);
    let sec = time % 60;

    sec = sec < 10 ? "0" + sec : sec;

    title.innerHTML = `${mins}:${sec}`;
    countdown.innerHTML = `${mins}:${sec}`;
    if (time == 0) {
      stopHorseShoe();
      const sound = document.getElementById("alarm-sound");
      sound.src = localStorage.getItem("soundType");
      sound.play();
      clearInterval(count);
      if (localStorage.getItem("workOrBreak") == "work") {
        incNumSessions();
        handleNumDaysWorking();

        //Complete tasks
        let completedSessions = localStorage.getItem("completedSessions");
        completedSessions = JSON.parse(completedSessions);
        let newTask = true;
        let date = getDate();
        let worktimeNumber = document.getElementById("worktime-number");
        let currentTaskName = document.getElementById("curr-task").children[0].innerHTML;

        for (let i = 0; i < completedSessions.length; i++) {
          if (
            completedSessions[i].taskName == currentTaskName &&
            completedSessions[i].date == date &&
            !completedSessions[i].completed
          ) {
            newTask = false;
            completedSessions[i].durationArray.push(worktimeNumber.value);
            updatePomoLog(completedSessions[i]); //for pomo log, function from pomoLog.js
          }
        }

        if (newTask == true) {
          let completedTask = {
            taskName: currentTaskName,
            durationArray: [worktimeNumber.value],
            date: date,
            completed: false,
          };
          AddToLog(completedTask);
          completedSessions.push(completedTask);
        }

        localStorage.setItem("completedSessions", JSON.stringify(completedSessions));
        localStorage.setItem("numCurrentSech", 1 + Number(localStorage.getItem("numCurrentSech")));

        sessionNum = Number(sessionNum) + 1;
        changeSession(sessionNum);

        if (localStorage.getItem("numCurrentSech") >= localStorage.getItem("numSessions")) {
          localStorage.setItem("workOrBreak", "longBreak");
          localStorage.setItem("numCurrentSech", "0");
        } else {
          localStorage.setItem("workOrBreak", "break");
        }

        // Enable all other features
        document.getElementById("settings-btn").disabled = false;
        document.getElementById("settings-btn").style.opacity = "100%";
        document.getElementById("task-list-container").style.opacity = "100%";
        document.getElementById("new-task-container").style.opacity = "100%";
        document.getElementById("new-task").disabled = false;
        document.getElementById("new-task-btn").disabled = false;
        document.getElementById("info-btn").disabled = false;
        let pomologBtn = document.getElementById("pomo-toggle");
        pomologBtn.disabled = false;
        document.getElementById("pomo-label").style.opacity = "100%";
        pomologBtn.checked = localStorage.getItem("pomologOpen") == "true" ? true : false;
      } else if (localStorage.getItem("workOrBreak") == "break") {
        localStorage.setItem("workOrBreak", "work");
        startBtn.innerHTML = "Start";
        updateCountdown(false);
        return;
      } else if (localStorage.getItem("workOrBreak") == "longBreak") {
        localStorage.setItem("workOrBreak", "work");
        sessionNum = 0;
        startLongBreak(sessionNum);
        startBtn.innerHTML = "Start";
        updateCountdown(false);
        return;
      }
      updateCountdown(true);
    }
  }
}

/**
 * increases numsessions statistic
 */
function incNumSessions() {
  let stats = JSON.parse(localStorage.getItem("statistics"));
  stats.numSessions++;
  localStorage.setItem("statistics", JSON.stringify(stats));
  renderStatistics();
}

/**
 * increases numsessions statistic
 */
function handleNumDaysWorking() {
  let lastDayWorked = localStorage.getItem("lastDayWorked");
  let date = getDate();
  if (lastDayWorked != date) {
    localStorage.setItem("lastDayWorked", date);
    let stats = JSON.parse(localStorage.getItem("statistics"));
    stats.numDaysWorking++;
    localStorage.setItem("statistics", JSON.stringify(stats));
    renderStatistics();
  }
}

/**
 * space bar to start timer
 */
document.body.onkeyup = function (e) {
  if (e.keyCode == 32 && document.activeElement != document.getElementById("new-task")) {
    e.preventDefault();
    const startBtn = document.getElementById("start-btn");
    startBtn.click();
  }
};

export { timer };
