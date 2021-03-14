import {resetSettings} from "../settings.js";

describe('settings ', ()=>{
    document.body.innerHTML = 
      `  
      <audio id="alarm-sound"></audio>
      <button id="settings-btn">Settings</button>

      <div id="settings-modal" class="modal">
  
          <div class="modal-content">
              <span id="settings-span" class="close">&times;</span>
              <h2>Settings</h2>
              <label id="worktime-label">Work Time:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</label>
              <input id="worktime-number" type="number" min="20" max="30">
              <input id="worktime-slider" type="range" min="20" max="30"><br><br>
  
              <label id="short-breaktime-label">Short Break Time:&emsp;&emsp;&emsp;</label>
              <input id="short-breaktime-number" type="number" min="5" max="10">
              <input id="short-breaktime-slider" type="range" min="5" max="10"><br><br>
  
              <label id="long-breaktime-label">Long Break Time:&emsp;&emsp;&emsp;</label>
              <input id="long-breaktime-number" type="number" min="15" max="25">
              <input id="long-breaktime-slider" type="range" min="15" max="25"><br><br>
  
              <label id="num-sessions-label">Number of Work Sessions Before Long Break: </label>
              <input id="num-sessions-number" type="number" min="3" max="5">
              <input id="num-sessions-slider" type="range" min="3" max="5"><br><br>
  
              <div class='flex-icon'>
                  <label id="volume-label">Volume: &emsp; <img id='icon-vol' style="width:20px;height:20px;"
                          src="../images/icons/volume-level-3.svg" alt='horn' /></label>
                  <input id="volume-number" type="number" min="0" max="100">
              </div>
              <input id="volume-slider" type="range" min="0" max="100">
  
              <div class='flex'>
                  <label id="sounds-label">Alarm Sound: &emsp;</label>
                  <select name='sounds' id='sounds'>
                      <option value="./sounds/alarm_clock_0.mp3">Digital 1</option>
                      <option value="./sounds/alarm_clock_2.mp3">Digital 2</option>
                      <option value="./sounds/alarm_clock_8.mp3">Digital 3</option>
                      <option value="./sounds/alarm_clock_1.mp3">Classic 1</option>
                      <option value="./sounds/alarm_clock_3.mp3">Classic 2</option>
                      <option value="./sounds/alarm_clock_4.mp3">Modern 1</option>
                      <option value="./sounds/alarm_clock_7.mp3">Modern 2</option>
                      <option value="./sounds/alarm_clock_10.mp3">Modern 3</option>
                      <option value="./sounds/alarm_clock_5.mp3">Soothing</option>
                      <option value="./sounds/alarm_clock_6.mp3">Rooster</option>
                      <option value="./sounds/alarm_clock_9.mp3">Alarm in my head</option>
                  </select>
                  <div id="test-btn-container">
                      <button id="test-btn" type="submit">Test</button>
                  </div>
              </div>
  
              <br><br><label for="dev-mode">Dev Mode</label><input type="checkbox" id="dev-mode">
  
              <br /><br /><label for="clear-data-btn"></label><button id="clear-data-btn">Clear ALL Data</button>
          </div>
  
      </div>`;

    test( ' does not crash', ()=>{

        let settingsModal = document.getElementById("settings-modal");
        let settingsBtn = document.getElementById("settings-btn");
        let settingsSpan = document.getElementById("settings-span");

        expect(settingsBtn.click()).toBeUndefined();
        expect(settingsSpan.click()).toBeUndefined();

        expect(resetSettings()).toBeUndefined();
        
        let clearData = document.getElementById("clear-data-btn");
        expect(clearData.click()).toBeUndefined();
        
    })
  });
  