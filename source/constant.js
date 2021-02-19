let maxTimer = localStorage.getItem('Timer');
if (maxTimer == null)
    localStorage.setItem('Timer', '25:00');

let maxShortBreak = localStorage.getItem('shortBreak');
if (maxShortBreak == null)
    localStorage.setItem('shortBreak', '0');

let maxLongBreak = localStorage.getItem('longBreak');
if (maxLongBreak == null)
    localStorage.setItem('longBreak', '0')

let numShortBreaks = localStorage.getItem('numShortBreaks') // nums of short break berfore long break
if (numShortBreaks == null)
    localStorage.setItem('numShortBreaks', '0');

// let numTasks = localStorage.getItem('numTasks')
// if (numTasks == null)
//     localStorage.setItem('numTasks', '0')

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
    today = mm + '/' + dd + ': ';
    for (var i = 0; i < numtasks; i++)
    {
        if (document.getElementById(tasks[i]).checked == true)
        {
            console.log(today + tasks[i]);
        }
    }
}
//task list to do, and completed tasks along with date, rating, associated task
//default empty array for completedTasks and upcomingTasks