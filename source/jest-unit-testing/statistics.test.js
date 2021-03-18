import { renderStatistics } from "../statistics.js";
import { setLocalStorageDefaults } from "../constants.js";

describe("statistics", () => {
  document.body.innerHTML = `<li id="stats-container">
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
</li>`;

  test("renders when there are default statistics in localStorage", () => {
    setLocalStorageDefaults();

    expect(renderStatistics()).toBeUndefined();

    const numCompletedTasks = document.getElementById("num-tasks-completed").childNodes[2];
    const avgSessionsPerDay = document.getElementById("avg-sessions-per-day").childNodes[2];
    const avgTasksPerDay = document.getElementById("average-tasks-per-day").childNodes[2];
    const avgSessionsPerTask = document.getElementById("avg-sessions-per-task").childNodes[2];

    expect(numCompletedTasks.innerHTML).toBe("0");
    expect(avgSessionsPerDay.innerHTML).toBe("N/A");
    expect(avgTasksPerDay.innerHTML).toBe("N/A");
    expect(avgSessionsPerTask.innerHTML).toBe("N/A");
  });
  test("renders when there are some statistics in localStorage", () => {
    setLocalStorageDefaults();

    let statsObj = {
      numCompletedTaskSessions: 6,
      numCompletedTasks: 3,
      numSessions: 10,
      numDaysWorking: 2,
    };
    localStorage.setItem("statistics", JSON.stringify(statsObj));

    expect(renderStatistics()).toBeUndefined();

    const numCompletedTasks = document.getElementById("num-tasks-completed").childNodes[2];
    const avgSessionsPerDay = document.getElementById("avg-sessions-per-day").childNodes[2];
    const avgTasksPerDay = document.getElementById("average-tasks-per-day").childNodes[2];
    const avgSessionsPerTask = document.getElementById("avg-sessions-per-task").childNodes[2];

    expect(numCompletedTasks.innerHTML).toBe("3");
    expect(avgSessionsPerDay.innerHTML).toBe("5.00");
    expect(avgTasksPerDay.innerHTML).toBe("1.50");
    expect(avgSessionsPerTask.innerHTML).toBe("2.00");
  });
});
