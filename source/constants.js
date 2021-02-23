let workMins = localStorage.getItem('workMins');
if (!workMins) localStorage.setItem('workMins', '25');

let shortBreakMins = localStorage.getItem('shortBreakMins');
if (!shortBreakMins) localStorage.setItem('shortBreakMins', '5');

let longBreakMins = localStorage.getItem('longBreakMins');
if (!longBreakMins) localStorage.setItem('longBreakMins', '15');

let numSessions = localStorage.getItem('numSessions');
if (!numSessions) localStorage.setItem('numSessions', '4');

let completedTasks = localStorage.getItem('completedTasks');
if (!completedTasks) localStorage.setItem('completedTasks', '[]');

let upcomingTasks = localStorage.getItem('upcomingTasks');
if (!upcomingTasks) localStorage.setItem('upcomingTasks', '[]');

let WorkOrBreak = localStorage.getItem('WorkOrBreak');
if (!WorkOrBreak) {
  localStorage.setItem('WorkOrBreak', 'work');
}
let NumcurrentSech = localStorage.getItem('NumcurrentSech');
if (!NumcurrentSech) localStorage.setItem('NumcurrentSech', '0');
