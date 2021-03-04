/* Checks if tasklist input is changed and updates current Task display */
let tasks = document.getElementById("task-list");
tasks.addEventListener("change", function (event) {
  if (event.target.name == "task-list") {
    document.getElementById("curr-task").children[0].innerHTML = event.target.id;
  }
});

/* Current Tasks displays the only task when the first task is added */
const checkOneTaskSize = function () {
  let storedTasks = localStorage.getItem("upcomingTasks");
  storedTasks = JSON.parse(storedTasks);
  if (storedTasks.length == 1) {
    document.getElementById("curr-task").children[0].innerHTML = storedTasks[0];
  }
};

const mutations = { childList: true };
const taskListObserver = new MutationObserver(checkOneTaskSize);
taskListObserver.observe(tasks, mutations);

/* Check if there already exists a task and only one task */
function checkOneStoredTask() {
  let storedTasks = localStorage.getItem("upcomingTasks");
  if (JSON.parse(storedTasks).length == 1) {
    document.getElementById("curr-task").children[0].innerHTML = tasks.children[0].id;
  }
}
checkOneStoredTask();
