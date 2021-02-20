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




