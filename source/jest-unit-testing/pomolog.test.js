import {clearLog, updateLogWhenPageRefresh } from "../pomoLog.js";

describe('pomoLog', () => {

    document.body.innerHTML = ` <div id="pomo-toggle-container">
    <input id="pomo-toggle" type="checkbox" class="pomo-toggle" />
    <label for="pomo-toggle" id="pomo-label">Pomodoro Log</label>

    <ol class="pomo-log">
      <li id="stats-container">
        <details>
          <summary>Statistics</summary>
          <ol id="stats-list" style="list-style: none">
            <li id="num-tasks-completed">
              <label>Number of Tasks Completed: </label
              ><span></span>
            </li>
            <li id="avg-sessions-per-day">
              <label>Average Sessions Per day: </label
              ><span></span>
            </li>
            <li id="average-tasks-per-day">
              <label>Average Tasks Per day: </label
              ><span></span>
            </li>
            <li id="avg-sessions-per-task">
              <label>Average Sessions to complete a Task: </label
              ><span></span>
            </li>
          </ol>
          <script src="statistics.js" type="module"></script>
        </details>
      </li>
      <hr />

      <li id="daily-log-container">
        <h6>Daily Log</h6>
        <ol id="log-list" style="list-style: none"></ol>
      </li>
    </ol>
    <script src="./components/completed-task.js"></script>
    <script type="module" src="pomoLog.js"></script>
  </div>`;

  test('does not crash', () => {
    localStorage.setItem("completedSessions", "101");
    expect(updateLogWhenPageRefresh()).toBeUndefined();
    expect(clearLog()).toBeUndefined();
  });

});
