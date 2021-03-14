import {timer} from "../timer.js";

test( ' does not crash', ()=>{
  document.body.innerHTML =
  '        <title id="title-countdown">Pomodoro Timer</title>' +
  '        <label id="worktime-label">Work Time:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</label>' +
  '        <h1 id="countdown"></h1>    ' +
  '        <button id="start-btn">Start</button>'     +
  '        <h2>Task List</h2> <button id="complete-task-btn">Completed</button>    ' +
  '        <div id="task-list"> </div>' +
  '        <button id="settings-btn">Settings</button>    ' +
  '        <br><br><label for="dev-mode">Dev Mode</label><input type="checkbox" id="dev-mode">  ' +
  '        <h2 id="work-break-label"></h2>' +
  '        <h2>Task List</h2>' +
  '        <button id="complete-task-btn">Completed</button>' + 
  '        <audio id="alarm-sound"></audio>    '
  ;


describe('timer ', ()=>{
  
  expect(timer()).toBeUndefined();
  })
  
});