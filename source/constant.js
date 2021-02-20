let maxTimer = localStorage.getItem('workMin');
if (!maxTimer)
    localStorage.setItem('workMin', '25');

let maxShortBreak = localStorage.getItem('shortBreakMin');
if (maxShortBreak == null)
    localStorage.setItem('shortBreakMin', '5');

let maxLongBreak = localStorage.getItem('longBreakMin');
if (maxLongBreak == null)
    localStorage.setItem('longBreakMin', '15')

let numShortBreaks = localStorage.getItem('numShortBreaks') // nums of short break berfore long break
if (numShortBreaks == null)
    localStorage.setItem('numShortBreaks', '4');

let completedTasks = localStorage.getItem('completedTasks') // nums of short break berfore long break
if (completedTasks == null)
    localStorage.setItem('completedTasks', '[]');

let upcomingTasks = localStorage.getItem('upcomingTasks') // nums of short break berfore long break
if (upcomingTasks == null)
    localStorage.setItem('upcomingTasks', '[]');



addTask.onclick = function() {                          // Don't know the button name on html yet
    var tasks = [];
    //tasks[numTasks] = prompt("Enter new task:");
    if (tasks != null)
    {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        tasks.push(JSON.parse(localStorage.getItem('tasks')));
        //numtasks++;
    }
}
completed.onclick = function() {
    var completedTasks = [];
    for (var i = 0; i < numtasks; i++)
    {
        completedTasks[i] = false;
        if (document.getElementById(tasks[i]).checked == true)      //.condition for if tasks in checked
            completedTasks[i] = true;                               // mark task as complete if condition is true. 
    }
}

function logs()
{
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0'); 
    today = month + '/' + day + ': ';
    for (var i = 0; i < numtasks; i++)
    {
        if (completedTasks[i])
        {
            console.log(today + tasks[i]);
        }
    }
}
//task list to do, and completed tasks along with date, rating, associated task
//default empty array for completedTasks and upcomingTasks
