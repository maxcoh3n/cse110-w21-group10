let circlesContainer = document.getElementById("session-circles");
let sessionIdx = localStorage.getItem("numCurrentSech");

/* Updates previous session color to completed color when completed */
function updatePrevColor(event) {
  let sessionIdx = event.detail.session;

  // Mark previous circles completed; reset to blank if end of pomo cycle
  if (sessionIdx != 0) {
    circlesContainer.childNodes[sessionIdx - 1].setAttribute(
      "class",
      "completed-circle"
    );

    sessionNumberInput.disabled = true;
    sessionSlider.disabled = true;
  } else {
    resetColors();
  }
}

/* Resets colors (Current session index is 0) */
function resetColors() {
  for (let i = 0; i < circlesContainer.childNodes.length; i++) {
    circlesContainer.childNodes[i].setAttribute("class", "blank-circle");
  }
  circlesContainer.childNodes[0].setAttribute("class", "curr-circle");
}

/* Updates current circle color to curr-circle when starting next session */
function updateCurrColor(event) {
  let sessionIdx = event.detail.session;
  circlesContainer.childNodes[sessionIdx].setAttribute("class", "curr-circle");
  if (sessionIdx == 0) {
    for (let i = 1; i < circlesContainer.childNodes.length; i++) {
      circlesContainer.childNodes[i].setAttribute("class", "blank-circle");
    }
  }
}

/* Adds/deletes circles to DOM according to numSessions */
function renderCircles() {
  let numOfSessions = localStorage.getItem("numSessions");

  // Delete circles
  if (circlesContainer.children.length > sessionSlider.value) {
    for (
      let i = circlesContainer.children.length - sessionSlider.value;
      i > 0;
      i--
    ) {
      circlesContainer.removeChild(
        circlesContainer.childNodes[circlesContainer.children.length - 1]
      );
    }
  } else if (circlesContainer.children.length < sessionSlider.value) {
    // Add circles
    for (
      let i = sessionSlider.value - circlesContainer.children.length;
      i > 0;
      i--
    ) {
      let newCircle = document.createElement("span");
      newCircle.setAttribute("class", "blank-circle");
      circlesContainer.appendChild(newCircle);
    }
  }
  circlesContainer.childNodes[sessionIdx].setAttribute("class", "curr-circle");
}

/* Create custom event for session change */
function changeSession(sessionNum) {
  let event = new CustomEvent("sessionChange", {
    detail: {
      session: sessionNum,
    },
  });
  circlesContainer.dispatchEvent(event);
}

/* Create custom event for break ending */
function endBreak(sessionNum) {
  let event = new CustomEvent("breakEnd", {
    detail: {
      session: sessionNum,
    },
  });
  circlesContainer.dispatchEvent(event);
}

/* Custom event for start of long break */
function startLongBreak(sessionNum) {
  let event = new CustomEvent("longBreakStart", {
    detail: {
      session: sessionNum,
    },
  });
  circlesContainer.dispatchEvent(event);
}

/* Enables/disables input to change numSessions */
function toggleNumSessionInput() {
  sessionNumberInput.disabled = false;
  sessionSlider.disabled = false;
}

let sessionSlider = document.getElementById("num-sessions-slider");
let sessionNumberInput = document.getElementById("num-sessions-number");
sessionSlider.value = localStorage.getItem("numSessions");
sessionNumberInput.value = localStorage.getItem("numSessions");
sessionNumberInput.addEventListener("input", renderCircles);
sessionSlider.addEventListener("input", renderCircles);
circlesContainer.addEventListener("sessionChange", updatePrevColor);
circlesContainer.addEventListener("breakEnd", updateCurrColor);
circlesContainer.addEventListener("longBreakStart", toggleNumSessionInput);
renderCircles();

export { changeSession, endBreak, startLongBreak };
