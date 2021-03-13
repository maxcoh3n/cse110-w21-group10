/* Updates previous session color to completed color when completed */
function updatePrevColor(event) {
  let sessionIdx = event.detail.session;

  // Mark previous circles completed; reset to blank if end of pomo cycle
  if (sessionIdx != 0) {
    let circlesContainer = document.getElementById("session-circles");
    circlesContainer.childNodes[sessionIdx - 1].setAttribute("class", "completed-circle");

    let sessionNumberInput = document.getElementById("num-sessions-number");
    sessionNumberInput.disabled = true;

    let sessionSlider = document.getElementById("num-sessions-slider");
    sessionSlider.disabled = true;
  } else {
    resetColors();
  }
}

/* Resets colors (Current session index is 0) */
function resetColors() {
  let circlesContainer = document.getElementById("session-circles");
  for (let i = 0; i < circlesContainer.childNodes.length; i++) {
    console.log(localStorage.getItem("numCurrentSech"));
    if (i < Number(localStorage.getItem("numCurrentSech"))) {
      circlesContainer.childNodes[i].setAttribute("class", "completed-circle");
    } else {
      circlesContainer.childNodes[i].setAttribute("class", "blank-circle");
    }
  }
  console.log("reset color");
}

/* Updates current circle color to curr-circle when starting next session */
function updateCurrColor(event) {
  let circlesContainer = document.getElementById("session-circles");
  let sessionIdx = event.detail.session;
  circlesContainer.childNodes[sessionIdx].setAttribute("class", "curr-circle");
  if (sessionIdx == 0) {
    for (let i = 1; i < circlesContainer.childNodes.length; i++) {
      circlesContainer.childNodes[i].setAttribute("class", "blank-circle");
    }
  }
  console.log("update curr color");
}

/* Adds/deletes circles to DOM according to numSessions */
function renderCircles() {
  let circlesContainer = document.getElementById("session-circles");
  let sessionSlider = document.getElementById("num-sessions-slider");

  // Delete circles
  if (circlesContainer.children.length > sessionSlider.value) {
    for (let i = circlesContainer.children.length - sessionSlider.value; i > 0; i--) {
      circlesContainer.removeChild(circlesContainer.childNodes[circlesContainer.children.length - 1]);
    }
  } else if (circlesContainer.children.length < sessionSlider.value) {
    // Add circles
    for (let i = sessionSlider.value - circlesContainer.children.length; i > 0; i--) {
      let newCircle = document.createElement("span");
      newCircle.setAttribute("class", "blank-circle");
      circlesContainer.appendChild(newCircle);
    }
  }
}

/* Create custom event for session change */
function changeSession(sessionNum) {
  let circlesContainer = document.getElementById("session-circles");
  let event = new CustomEvent("sessionChange", {
    detail: {
      session: sessionNum,
    },
  });
  circlesContainer.dispatchEvent(event);
}

/* Create custom event for break ending */
function endBreak(sessionNum) {
  let circlesContainer = document.getElementById("session-circles");
  let event = new CustomEvent("breakEnd", {
    detail: {
      session: sessionNum,
    },
  });
  circlesContainer.dispatchEvent(event);
}

/* Custom event for start of long break */
function startLongBreak(sessionNum) {
  let circlesContainer = document.getElementById("session-circles");
  let event = new CustomEvent("longBreakStart", {
    detail: {
      session: sessionNum,
    },
  });
  circlesContainer.dispatchEvent(event);
}

/* Enables/disables input to change numSessions */
function toggleNumSessionInput() {
  let sessionNumberInput = document.getElementById("num-sessions-number");

  sessionNumberInput.disabled = false;
  
  let sessionSlider = document.getElementById("num-sessions-slider");
  sessionSlider.disabled = false;
}


window.addEventListener("DOMContentLoaded", (event) => {
  let sessionSlider = document.getElementById("num-sessions-slider");
  sessionSlider.value = localStorage.getItem("numSessions");
  sessionSlider.addEventListener("input", renderCircles);

  let sessionNumberInput = document.getElementById("num-sessions-number");
  sessionNumberInput.value = localStorage.getItem("numSessions");
  sessionNumberInput.addEventListener("input", renderCircles);

  let circlesContainer = document.getElementById("session-circles");
  circlesContainer.addEventListener("sessionChange", updatePrevColor);
  circlesContainer.addEventListener("breakEnd", updateCurrColor);
  circlesContainer.addEventListener("longBreakStart", toggleNumSessionInput);

  renderCircles();
});

export { changeSession, endBreak, startLongBreak, resetColors };
