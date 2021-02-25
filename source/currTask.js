/* Checks if tasklist input is changed and updates current Task display */
let tasks = document.getElementById("task-list");
tasks.addEventListener("change", function (event) {
  if (event.target.name == "task-list") {
    document.getElementById("curr-task").children[0].innerHTML =
      event.target.id;
  }
});

/* Current Tasks displays the only tasks if there is one task */
const checkOneTaskSize = function () {
  if (tasks.children.length == 2) {
    document.getElementById("curr-task").children[0].innerHTML =
      tasks.children[0].id;
  }
};

const mutations = { childList: true };
const taskListObserver = new MutationObserver(checkOneTaskSize);
taskListObserver.observe(tasks, mutations);
