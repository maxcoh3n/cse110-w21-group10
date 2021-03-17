import { renderOne, renderAll, addTaskEvent, keyUpEvent , 
    inCompleted, isCompleted, comple, undo, del, incNumCompletedTasks, 
    decNumCompletedTasks, incNumCompletedTaskSessions, 
    decNumCompletedTaskSessions, completedEvent } from "../taskList.js";
import { setLocalStorageDefaults } from "../constants.js";
import { updateLogWhenPageRefresh } from "../pomoLog.js";
describe('taskList', ()=>{
    document.body.innerHTML =
      `
      <div id="timer-container">
      <div id="session-circles" data-session-num="0"></div>
      <div id="canvas-container">
        <canvas id="horseshoe" width="500" height="500"></canvas>
      </div id = "hi">
      <h1 id="countdown"></h1>
      <!-- We update this for the horseshoe -->
        <button id="start-btn">Start</button>
        <!-- Current Task -->
        <p id="curr-task">Current Task: <span>Default Task</span></p>
        <h2 id="work-break-label"></h2>
      </div>
      <div id="task-list-container">
      <div id="task-list-header">
        <h2>Task List</h2>
        <button id="complete-task-btn">Completed</button>
      </div>
      <hr />
      <div id="task-list"></div>
      <hr />
      <!-- <input id="pomo-toggle" type="checkbox" class="pomo-toggle" />
        <label for="pomo-toggle" id="pomo-label">Pomodoro Log</label> -->
      <div id="new-task-container">
        <input id="new-task" type="text" placeholder="Enter New Task Here" />
        <button id="new-task-btn">Add Task</button><br />
        <script src="taskList.js" type="module"></script>
      </div>
      </div>
      <div id="pomo-toggle-container">
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
  </div>
      `;
    test('testing renderAll when tasksArray length = 0', ()=>{
        setLocalStorageDefaults();
        const taskButton = document.getElementById("complete-task-btn");
        expect(renderAll()).toBeUndefined();
        expect(taskButton.disabled).toBe(true);
    })

    test('testing renderAll when tasksArray length = 3 and task is not found in completedSessions', ()=>{
        setLocalStorageDefaults();

        let tasks = ["101", "102", "103"] 
        localStorage.setItem("upcomingTasks", JSON.stringify(tasks));

        const taskButton = document.getElementById("complete-task-btn");
        let tasksArray = localStorage.getItem("upcomingTasks");
        tasksArray = JSON.parse(tasksArray);

        let completed = ["100"] 
        localStorage.setItem("completedSessions", JSON.stringify(completed));

        let completedSessions = localStorage.getItem("completedSessions");
        completedSessions = JSON.parse(completedSessions);
        let foundTask = false;

        expect(renderAll()).toBeUndefined();
        expect(taskButton.disabled).toBe(false);
        expect(taskButton.innerHTML).toBe("Delete");
    })

    test('testing renderAll when tasksArray length = 3 and task is found and completed in completedSessions', ()=>{
        setLocalStorageDefaults();

        let tasks = ["101", "102", "103"] 
        localStorage.setItem("upcomingTasks", JSON.stringify(tasks));

        const taskButton = document.getElementById("complete-task-btn");
        let tasksArray = localStorage.getItem("upcomingTasks");
        tasksArray = JSON.parse(tasksArray);

        let completed = ["101"] 
        localStorage.setItem("completedSessions", JSON.stringify(completed));

        let completedSessions = localStorage.getItem("completedSessions");
        completedSessions = JSON.parse(completedSessions);
        let foundTask = false;

        let customElement = document.createElement("completed-task");
        customElement.setAttribute("name", completedSessions.taskName);
        expect(renderAll()).toBeUndefined();
        expect(taskButton.disabled).toBe(false);
        //expect(taskButton.innerHTML).toBe("Undo");        need to find a way to compare taskName
    })

    test('testing addTaskEvent adding new task that already exist', ()=>{
        setLocalStorageDefaults();
        let tasks = ["101", "102", "103"] 
        localStorage.setItem("upcomingTasks", JSON.stringify(tasks));

        const taskButton = document.getElementById("complete-task-btn");
        let tasksArray = localStorage.getItem("upcomingTasks");
        tasksArray = JSON.parse(tasksArray);
      
        const newTaskInput = document.getElementById("new-task");
        newTaskInput.value = "101";

        let completed = ["101"] 
        localStorage.setItem("completedSessions", JSON.stringify(completed));

        let completedSessions = localStorage.getItem("completedSessions");
        completedSessions = JSON.parse(completedSessions);

        expect(addTaskEvent()).toBeUndefined();
        expect(newTaskInput.value).toBe("");
    })

    test('testing addTaskEvent adding new task that does not exist in tasksArray', ()=>{
        setLocalStorageDefaults();
        let tasks = ["101", "102", "103"] 
        localStorage.setItem("upcomingTasks", JSON.stringify(tasks));

        const taskButton = document.getElementById("complete-task-btn");
        let tasksArray = localStorage.getItem("upcomingTasks");
        tasksArray = JSON.parse(tasksArray);
      
        const newTaskInput = document.getElementById("new-task");
        newTaskInput.value = "100";

        let completed = ["101"] 
        localStorage.setItem("completedSessions", JSON.stringify(completed));

        let completedSessions = localStorage.getItem("completedSessions");
        completedSessions = JSON.parse(completedSessions);

        expect(addTaskEvent()).toBeUndefined();
        expect(newTaskInput.value).toBe("");
    })



    test('testing comple', ()=>{
        setLocalStorageDefaults();
        expect(comple()).toBeUndefined();
        let taskList = document.getElementById("task-list");
        let completedSessions = localStorage.getItem("completedSessions");
        completedSessions = JSON.parse(completedSessions);
        let taskArray = [];

        const completed = document.getElementById("complete-task-btn");
    })

    test('testing del', ()=>{
        setLocalStorageDefaults();
        expect(del()).toBeUndefined();
        let taskList = document.getElementById("task-list");
        let completedSessions = localStorage.getItem("completedSessions");
        completedSessions = JSON.parse(completedSessions);
        let taskArray = [];

        const completed = document.getElementById("complete-task-btn");
    })

    test('testing incNumCompletedTasks', ()=>{
        setLocalStorageDefaults();
        expect(incNumCompletedTasks()).toBeUndefined();
    })

    test('testing decNumCompletedTasks', ()=>{
        setLocalStorageDefaults();
        expect(decNumCompletedTasks()).toBeUndefined();
    })

    test('testing completedEvent', ()=>{
        setLocalStorageDefaults();
        expect(completedEvent()).toBeUndefined();
    })

    test('testing renderOne', ()=>{
        setLocalStorageDefaults();
        const input = document.querySelector('input');
        expect(input.addEventListener('input', renderOne())).toBeUndefined();
    })

    test('testing isCompleted', ()=>{
        setLocalStorageDefaults();
        const input = document.querySelector('input');
        expect(input.addEventListener('input', isCompleted())).toBeUndefined();
    })

    test('testing incNumCompletedTaskSessions', ()=>{
        setLocalStorageDefaults();
        const input = document.querySelector('input');
        expect(input.addEventListener('input', incNumCompletedTaskSessions())).toBeUndefined();
    })

    test('testing decNumCompletedTaskSessions', ()=>{
        setLocalStorageDefaults();
        const input = document.querySelector('input');
        expect(input.addEventListener('input', decNumCompletedTaskSessions())).toBeUndefined();
    })
  });
