let maxTimer = localStorage.getItem('workMin');
if (!maxTimer)
    localStorage.setItem('workMin', '25');

let maxShortBreak = localStorage.getItem('shortBreakMin');
if (maxShortBreak == null)
    localStorage.setItem('shortBreakMin', '5');

let maxLongBreak = localStorage.getItem('longBreakMin');
if (maxLongBreak == null)
    localStorage.setItem('longBreakMin', '15')

let numSessions = localStorage.getItem('numSessions') 
if (numSessions == null)
    localStorage.setItem('numSessions', '4');

let completedTasks = localStorage.getItem('completedTasks') 
if (completedTasks == null)
    localStorage.setItem('completedTasks', '[]');

let upcomingTasks = localStorage.getItem('upcomingTasks') 
if (upcomingTasks == null)
    localStorage.setItem('upcomingTasks', '[]');




