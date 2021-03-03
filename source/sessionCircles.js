let circlesContainer = document.getElementById("session-circles");
let sessionIdx = localStorage.getItem("numCurrentSech");
let numOfSessions = localStorage.getItem("numSessions");

/* Updates previous session color to completed color when completed */
function updatePrevColor(event) {
  console.log(event.detail.session);
  let sessionIdx = event.detail.session;

  // Mark previous circles completed; reset to blank if end of pomo cycle
  if (sessionIdx != 0) {
    circlesContainer.childNodes[sessionIdx - 1].setAttribute(
      "class",
      "completed-circle"
    );
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
  console.log(sessionIdx);
  circlesContainer.childNodes[sessionIdx].setAttribute("class", "curr-circle");
  if (sessionIdx == 0) {
    for (let i = 1; i < circlesContainer.childNodes.length; i++) {
      circlesContainer.childNodes[i].setAttribute("class", "blank-circle");
    }
  }
}

/* Adds/deletes circles to DOM according to numSessions */
function renderCircles() {
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
      console.log("delete circle");
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
  numOfSessions = localStorage.getItem("numSessions");
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

let sessionSlider = document.getElementById("num-sessions-slider");
let sessionNumberInput = document.getElementById("num-sessions-number");
sessionNumberInput.addEventListener("input", renderCircles);
sessionSlider.addEventListener("input", renderCircles);
circlesContainer.addEventListener("sessionChange", updatePrevColor);
circlesContainer.addEventListener("breakEnd", updateCurrColor);
renderCircles();

export { changeSession, endBreak };
