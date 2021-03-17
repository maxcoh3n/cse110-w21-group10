import { ChangeToEnglish, ChangeToSpanish } from "../info.js";

describe("info", () => {
  document.body.innerHTML = `<button id="info-btn">Information</button>
  <div id="info-modal" class="modal">
    <div class="modal-content">
      <span id="info-span" class="close">&times;</span>

      <h2>Information</h2><hr>
      <ul id ="language-option">
        <li>Click the Settings button in the top right corner and configure your settings.</li>
        <li>Add tasks to the task list to the right. You can click Delete if you added a task by mistake.</li>
        <li>Select the task you want and click Start to start the timer.</li>
        <li>After you have completed a session you can click Complete to complete the selected task and Undo if you clicked Complete by mistake.</li>
        <li>You can click the Pomodoro Log button on the left to view a log of completed sessions and statistics. </li>
      </ul><br>

      <p>Select your language:
      <input type="radio" id="english" name="language" checked="checked">
      <label for="english">English</label>
      <input type="radio" id="spanish" name="language">
      <label for="spanish">Spanish</label></p>

    </div>
  </div>`;

  test("does not crash", () => {
    let infoBtn = document.getElementById("info-btn");
    let infoSpan = document.getElementById("info-span");

    expect(infoBtn.click()).toBeUndefined();
    expect(infoSpan.click()).toBeUndefined();

    expect(ChangeToEnglish()).toBeUndefined();
    expect(ChangeToSpanish()).toBeUndefined();
  });
});
