import {renderStatistics} from "./statistics.js";
import { clearLog } from "./pomoLog.js";
import { clearTaskList } from "./taskList.js";
import {setLocalStorageDefaults} from "./constants.js"

// renders statistics is refreshed.
window.addEventListener("DOMContentLoaded", (event) => {
  resetSettings();
});
//Settings

let settingsModal = document.getElementById("settings-modal");
let settingsBtn = document.getElementById("settings-btn");
let settingsSpan = document.getElementById("settings-span");

settingsBtn.onclick = function () {
  settingsModal.style.display = "block";
};

settingsSpan.onclick = function () {
  settingsModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == settingsModal) {
    settingsModal.style.display = "none";
  }
};

  const volumeNum = document.getElementById("volume-number")
  const volumeSlider = document.getElementById('volume-slider')
  const worktimeSlider = document.getElementById("worktime-slider");
  const worktimeNumber = document.getElementById("worktime-number");
  const shortBreaktimeSlider = document.getElementById("short-breaktime-slider");
  const shortBreaktimeNumber = document.getElementById("short-breaktime-number");
  const longBreaktimeSlider = document.getElementById("long-breaktime-slider");
  const longBreaktimeNumber = document.getElementById("long-breaktime-number");
  const numSessionsSlider = document.getElementById("num-sessions-slider");
  const numSessionsNumber = document.getElementById("num-sessions-number");
  const test = document.getElementById("test-btn");
  const audio = document.getElementById("alarm-sound");
  const soundPicker = document.getElementById('sounds')
  const iconVol = document.getElementById('icon-vol')

/**
* sets all settings to localstorage values and adds listeners
*/
function resetSettings(){
  volumeSlider.value = localStorage.getItem("vol");
  volumeNum.value = localStorage.getItem("vol");
  worktimeSlider.value = localStorage.getItem("workMins");
  worktimeNumber.value = localStorage.getItem("workMins");
  shortBreaktimeSlider.value = localStorage.getItem("shortBreakMins");
  shortBreaktimeNumber.value = localStorage.getItem("shortBreakMins");
  longBreaktimeSlider.value = localStorage.getItem("longBreakMins");
  longBreaktimeNumber.value = localStorage.getItem("longBreakMins");
  numSessionsSlider.value = localStorage.getItem("numSessions");
  numSessionsNumber.value = localStorage.getItem("numSessions");
  soundPicker.value = localStorage.getItem("soundType");
  audio.src = localStorage.getItem("soundType");
  updateVolIcon(localStorage.getItem("vol"));

  worktimeSlider.addEventListener("input", updateWorktime);
  worktimeNumber.addEventListener("input", updateWorktime);
  shortBreaktimeSlider.addEventListener("input", updateShortBreaktime);
  shortBreaktimeNumber.addEventListener("input", updateShortBreaktime);
  longBreaktimeSlider.addEventListener("input", updateLongBreaktime);
  longBreaktimeNumber.addEventListener("input", updateLongBreaktime);
  numSessionsSlider.addEventListener("input", updateNumSessions);
  numSessionsNumber.addEventListener("input", updateNumSessions);
  volumeSlider.addEventListener("input", updateVol);
  volumeNum.addEventListener('input',updateVol);
  test.addEventListener('click', updateTest);
  soundPicker.addEventListener('click',updateSound);
  setIconVolImage()
}

/**
 * @param {string} e
 * Change the current sound type to input value
 */
function updateSound(e){
  const value = e.target.value
  audio.src = value
  localStorage.setItem("soundType",value)
  document.getElementById("alarm-sound").src = value
}

/**
 * Test the loudness of the current volume
 */
function updateTest(){
  const vol = volumeNum.value
  audio.volume = vol/100
  audio.play()
}

/**
 * @param {number} e
 * Change the volume of the sound to input value
 * Change the image of the speaker according to the volume
 */
function updateVol(e) {
  let num = e.target.value;
  volumeSlider.value = num;
  volumeNum.value = num;
  localStorage.setItem("vol", num);
  updateVolIcon(vol)
}

/** 
* @param {number} vol - volume out of 100
*/
function updateVolIcon(vol){
  if (num > 66 && num <= 100) {
    iconVol.src = "./icons/volume-level-3.svg";
  }
  else if (num > 33 && num < 67) {
      iconVol.src = "./icons/volume-level-2.svg";
  }
  else if (num > 0 && num < 34) {
      iconVol.src = "./icons/volume-level-1.svg";
  }
  else {
      iconVol.src = "./icons/volume-level-0.svg";
  }
}

/**
 * @param {number} e
 * Change the work time to input value
 * Display the work time on the page.
 */
function updateWorktime(e) {
  let num = e.target.value;
  worktimeSlider.value = num;
  worktimeNumber.value = num;
  localStorage.setItem("workMins", num);
  document.getElementById("countdown").innerHTML =
    localStorage.getItem("workMins") + ":00";
}

/**
 * @param {number} e
 * Change the short break time to input value
 */
function updateShortBreaktime(e) {
  let num = e.target.value;
  shortBreaktimeSlider.value = num;
  shortBreaktimeNumber.value = num;
  localStorage.setItem("shortBreakMins", num);
}

/**
 * @param {number} e
 * Change the long break time to input value
 */
function updateLongBreaktime(e) {
  let num = e.target.value;
  longBreaktimeSlider.value = num;
  longBreaktimeNumber.value = num;
  localStorage.setItem("longBreakMins", num);
}

/**
 * @param {number} e
 * Change the number of sessions to input value
 */
function updateNumSessions(e) {
  let num = e.target.value;
  numSessionsSlider.value = num;
  numSessionsNumber.value = num;
  localStorage.setItem("numSessions", num);
}

/*
* clears the statistics/data for the user's session history
*/
const clearData = document.getElementById("clear-data-btn");
clearData.onclick = function () {
  const DELETE_MESSAGE = "Clearing your data is an irreversible action, your session history will be lost. \nAre you sure you want to clear your data?\n\n"
  let response = confirm(DELETE_MESSAGE);
  if(response) {

    localStorage.clear();
    setLocalStorageDefaults();


    renderStatistics();

    clearLog();

    clearTaskList();
    resetSettings();
  }
}

export {resetSettings};