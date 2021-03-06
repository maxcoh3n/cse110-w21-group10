//Timer
import { updatePomoLog, AddToLog } from "./pomoLog.js";
import { changeSession, endBreak, startLongBreak } from "./sessionCircles.js";
import {renderStatistics} from "./statistics.js";


const countdown = document.getElementById("countdown");
countdown.innerHTML = `${localStorage.getItem("workMins")}:00`;
let sessionNum = localStorage.getItem("numCurrentSech");
/**
timer
Uses the countdown h1 to set and run a timer of length designated by the startTime parameter.
*/

function timer() {
  const sound = document.getElementById("alarm-sound");

  const completed = document.getElementById("complete-task-btn");
  completed.innerHTML = "Completed";
  let removeLabels = [];
  let removeTasks = [];
  if (startBtn.innerHTML == "Start") {
    completed.disabled = true; // disables changing tasks during work session
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
    document.getElementById("settings-btn").style.display = "none";
    updateCountdown(true);
  } else {
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


function updateCountdown(IsOn) {
  const title = document.getElementById("title-countdown");
  const workBreakLabel = document.getElementById("work-break-label");

  const devMode = document.getElementById("dev-mode");
  if (IsOn) {
    var time; // must be var so that updateTime can access it
    if (localStorage.getItem("workOrBreak") == "work") {
      time = localStorage.getItem("workMins") * 60;
    } else if (localStorage.getItem("workOrBreak") == "break") {
      time = localStorage.getItem("shortBreakMins") * 60;
    } else if (localStorage.getItem("workOrBreak") == "longBreak") {
      time = localStorage.getItem("longBreakMins") * 60;
    }
    var count = setInterval(updateTime, devMode.checked ? 0.5 : 1000);
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
    workBreakLabel.style.display = "none";
    const completed = document.getElementById("complete-task-btn");
    completed.disabled = false;
  }

  function updateTime() {
    if (localStorage.getItem("workOrBreak") == "work") {
      workBreakLabel.style.display = "block";
      workBreakLabel.innerHTML = "Work Time";
    }
    if (localStorage.getItem("workOrBreak") == "break" || localStorage.getItem("workOrBreak") == "longBreak") {
      workBreakLabel.style.display = "block";
      workBreakLabel.innerHTML = "Break Time";
    }
    time--;
    time = time < 0 ? 0 : time;

    let mins = Math.floor(time / 60);
    let sec = time % 60;

    sec = sec < 10 ? "0" + sec : sec;

    title.innerHTML = `${mins}:${sec}`;
    countdown.innerHTML = `${mins}:${sec}`;
    if (time == 0) {
      const sound = document.getElementById("alarm-sound");
      sound.play();
      clearInterval(count);
      if (localStorage.getItem("workOrBreak") == "work") {
        incNumSessions();
        handleNumDaysWorking();

        //Complete tasks
        let completedSessions = localStorage.getItem("completedSessions");
        completedSessions = JSON.parse(completedSessions);
        let newTask = true;
        let dateObject = new Date();
        let date = dateObject.getMonth() + 1 + "/" + dateObject.getDate();
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
            taskID: completedSessions.filter(task => task.taskName == currentTaskName).length,
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

/*
* increases numsessions statistic
*/
function incNumSessions(){
  let stats = JSON.parse(localStorage.getItem("statistics"));
  stats.numSessions++;
  localStorage.setItem("statistics",JSON.stringify(stats));
  renderStatistics();
}

/*
* increases numsessions statistic
*/
function handleNumDaysWorking(){
  let lastDayWorked = localStorage.getItem("lastDayWorked");
  let dateObject = new Date();
  let date = dateObject.getMonth() + 1 + "/" + dateObject.getDate();
  if(lastDayWorked != date){
    localStorage.setItem("lastDayWorked",date);
    let stats = JSON.parse(localStorage.getItem("statistics"));
    stats.numDaysWorking++;
    localStorage.setItem("statistics",JSON.stringify(stats));
    renderStatistics();
  }
}

const startBtn = document.getElementById("start-btn");
startBtn.onclick = function () {
  timer();
  let maxSessions = localStorage.getItem("numSessions");
  if (sessionNum >= maxSessions) {
    sessionNum = 0;
  }
  endBreak(sessionNum);
};
