describe('timer ', ()=>{
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
    '        <button id="complete-task-btn">Completed</button>'
    ;
    const timer = require('../timer.js'); // must be included after innerHTML is defined or else it will crash
    expect(timer.timer()).toBeUndefined();
    expect(timer.updateCountdown()).toBeUndefined();
  })
  test( ' does not crash', ()=>{
    document.body.innerHTML =
    '        <button id="settings-btn">Settings</button>    ' +
    '        <div id="my-modal" class="modal">  </div>            ' +
    '        <div class="modal-content"> </div>   ' +
    '        <span class="close">&times;</span>' +
    '        <label id="worktime-label">Work Time:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</label>    ' +
    '        <input id="worktime-number" type="number" min="20" max="30">  ' +
    '        <input id="worktime-slider" type="range" min="20" max="30"><br><br>' +
    '        <label id="short-breaktime-label">Short Break Time:&emsp;&emsp;&emsp;</label>' +
    '        <input id="short-breaktime-number" type="number" min="5" max="10">' +
    '        <input id="short-breaktime-slider" type="range" min="5" max="10"><br><br>' +
    '        <label id="long-breaktime-label">Long Break Time:&emsp;&emsp;&emsp;</label>' +
    '        <input id="long-breaktime-number" type="number" min="15" max="25">' +
    '        <input id="long-breaktime-slider" type="range" min="15" max="25"><br><br>' +
    '        <label id="num-sessions-label">Number of Work Sessions Before Long Break: </label>' +
    '        <input id="num-sessions-number" type="number" min="3" max="5">' + 
    '        <input id="num-sessions-slider" type="range" min="3" max="5">' +
    '        <br><br><label for="dev-mode">Dev Mode</label><input type="checkbox" id="dev-mode">'
    ;
    const settings = require('../settings.js'); // must be included after innerHTML is defined or else it will crash
    //expect(localStorage.getItem("workMins")).toBe(30)
    //expect(settings.updateWorktime(30)).toBeUndefined();
  })
});