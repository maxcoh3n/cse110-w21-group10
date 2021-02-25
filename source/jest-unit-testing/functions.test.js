describe('timer ', ()=>{
  test( ' does not crash', ()=>{
    document.body.innerHTML =
    '        <h1 id="countdown"></h1>    ' +
    '        <button id="start-btn">Start</button>'     +
    '            <h2>Task List</h2> <button id="complete-task-btn">Completed</button>    ' +
    '<div id="task-list"> </div>' +
    '    <button id="settings-btn">Settings</button>    ' +
    '         <br><br><label for="dev-mode">Dev Mode</label><input type="checkbox" id="dev-mode">  '
    ;
    const {timer} = require('../timer'); // must be included after innerHTML is defined or else it will crash

    expect(timer()).toBeUndefined();
  })
});