

const addTask = document.getElementById("new-task-btn");
addTask.onclick = function() {                     
    let tasksArray = localStorage.getItem("upcomingTasks");
    tasksArray = JSON.parse(tasksArray);  

    const newTaskInput = document.getElementById("new-task");

    if(newTaskInput.value){
        tasksArray.push(newTaskInput.value);
        localStorage.setItem("upcomingTasks", JSON.stringify(tasksArray));
        newTaskInput.value = "";
    }

    tasksArray = localStorage.getItem("upcomingTasks");
}


const completed = document.getElementById("complete-task-btn")
completed.onclick = function() {
    console.log("complete");
    // var completedTasks = [];
    // for (var i = 0; i < numtasks; i++)
    // {
    //     completedTasks[i] = false;
    //     if (document.getElementById(tasks[i]).checked == true)      //.condition for if tasks in checked
    //         completedTasks[i] = true;                               // mark task as complete if condition is true. 
    // }
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