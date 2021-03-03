// Calls on page refresh
renderStatistics();

function renderStatistics(){
    const numCompletedTasks = document.getElementById("num-tasks-completed").childNodes[2];
    const avgSessionsPerDay = document.getElementById("avg-sessions-per-day").childNodes[2];
    const avgTasksPerDay = document.getElementById("average-tasks-per-day").childNodes[2];
    const avgSessionsPerTask = document.getElementById("avg-sessions-per-task").childNodes[2];

    const statsObj = JSON.parse(localStorage.getItem("statistics"));


    numCompletedTasks.innerHTML = statsObj.numCompletedTasks;
    // avgSessionsPerDay.innerHTML = ;
    // avgTasksPerDay.innerHTML = ;
    // avgSessionsPerTask.innerHTML = ;

}

export {renderStatistics};