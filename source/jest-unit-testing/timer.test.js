import { timer } from "../timer.js";

describe("timer ", () => {
  document.body.innerHTML = `        <title id="title-countdown">Pomodoro Timer</title>
            <label id="worktime-label">Work Time:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</label>
            <h1 id="countdown"></h1>    
            <button id="start-btn">Start</button>
            <h2>Task List</h2> <button id="complete-task-btn">Completed</button>    
            <div id="task-list"> </div>
            <button id="settings-btn">Settings</button>    
           <br><br><label for="dev-mode">Dev Mode</label><input type="checkbox" id="dev-mode">  
            <h2>Task List</h2>
            <button id="complete-task-btn">Completed</button>
            <audio id="alarm-sound"></audio>    
            <div id="task-list-container"></div
          <div id="new-task-container">
          <input id="new-task" type="text" placeholder="Enter New Task Here" />
          <button id="new-task-btn">Add Task</button><br />
          <script src="taskList.js" type="module"></script>
          </div>
          <button id="info-btn">Information</button>
          <input id="pomo-toggle" type="checkbox" class="pomo-toggle" />
      <label for="pomo-toggle" id="pomo-label">Pomodoro Log</label>
      <div id="session-circles" data-session-num="0"></div>

          `;

  test(" does not crash", () => {
    expect(timer()).toBeUndefined();
  });
});
