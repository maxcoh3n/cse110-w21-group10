let circlesContainer = document.getElementById("session-circles");
let sessionIdx = localStorage.getItem("numCurrentSech");
let numOfSessions = localStorage.getItem("numSessions");

/* Updates the circle color when session is completed */
function updateColor(event) {
  console.log(event.detail.session);
  let sessionIdx = event.detail.session;

  // Update current circle color if it is not the last session
  if (sessionIdx < numOfSessions) {
    circlesContainer.childNodes[sessionIdx].setAttribute(
      "class",
      "curr-circle"
    );
  } else {
    circlesContainer.childNodes[sessionIdx - 1].setAttribute(
      "class",
      "completed-circle"
    );
  }

  // Mark previous circles completed; reset to blank if end of pomo cycle
  if (sessionIdx != 0) {
    circlesContainer.childNodes[sessionIdx - 1].setAttribute(
      "class",
      "completed-circle"
    );
  } else {
    for (let i = 0; i < circlesContainer.childNodes.length; i++) {
      circlesContainer.childNodes[i].setAttribute("class", "blank-circle");
    }
    circlesContainer.childNodes[0].setAttribute("class", "curr-circle");
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

let sessionSlider = document.getElementById("num-sessions-slider");
sessionSlider.addEventListener("input", renderCircles);
circlesContainer.addEventListener("sessionChange", updateColor);
renderCircles();

export { changeSession };
