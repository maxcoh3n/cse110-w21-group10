import {updatePrevColor, updateCurrColor, renderCircles, resetColors, changeSession, endBreak, startLongBreak, toggleNumSessionInput } from "../sessionCircles.js";
import { setLocalStorageDefaults } from "../constants.js";

describe('sessionCircles', ()=>{
    document.body.innerHTML =
    `<div class='flex'>
                  <label id="num-sessions-label">Number of Work Sessions Before Long Break: </label>
                  <input id="num-sessions-number" type="number" min="3" max="5">
                  <div class='label'>
                      <p class='numLeft'>3</p><input id="num-sessions-slider" type="range" min="3" max="5">
                      <p class='numRight'>5</p>
                  </div>
    </div>
    <div id="timer-container">
      <div id="session-circles" data-session-num="0"></div>
      <div id="canvas-container">
        <canvas id="horseshoe" width="500" height="500"></canvas>
    </div id = "hi">
    `;
    test('resetColors', ()=>{
        setLocalStorageDefaults();
        let circlesContainer = document.getElementById("session-circles");
        var curr = document.createElement("curr-circle");
        circlesContainer.appendChild(curr);
        expect(resetColors()).toBeUndefined();
    })

    test('renderCircles delete circles', ()=>{
        setLocalStorageDefaults();
        let circlesContainer = document.getElementById("session-circles");
        var curr = document.createElement("curr-circle");
        circlesContainer.appendChild(curr);
        let sessionSlider = document.getElementById("num-sessions-slider");
        sessionSlider.value = 2;
        expect(renderCircles()).toBeUndefined();
    })

    test('renderCircles add circles', ()=>{
        setLocalStorageDefaults();
        let circlesContainer = document.getElementById("session-circles");
        var curr = document.createElement("curr-circle");
        circlesContainer.appendChild(curr);
        let sessionSlider = document.getElementById("num-sessions-slider");
        sessionSlider.value = 1;
        expect(renderCircles()).toBeUndefined();
    })

    test('toggleNumSessionInput', ()=>{
        setLocalStorageDefaults();
        expect(toggleNumSessionInput()).toBeUndefined();
    })

    // test('updatePrevColor', ()=>{
    //     setLocalStorageDefaults();
    //     const input = document.querySelector('input');
    //     expect(input.addEventListener('input', updatePrevColor())).toBeUndefined();
    // })

    // test('updateCurrColor', ()=>{
    //     setLocalStorageDefaults();
    //     const input = document.querySelector('input');
    //     expect(input.addEventListener('input', updateCurrColor())).toBeUndefined();
    // })

    test('changeSession', ()=>{
        setLocalStorageDefaults();
        const input = document.querySelector('input');
        expect(input.addEventListener('input', changeSession())).toBeUndefined();
    })

    test('endBreak', ()=>{
        setLocalStorageDefaults();
        const input = document.querySelector('input');
        expect(input.addEventListener('input', endBreak())).toBeUndefined();
    })

    test('startLongBreak', ()=>{
        setLocalStorageDefaults();
        const input = document.querySelector('input');
        expect(input.addEventListener('input', startLongBreak())).toBeUndefined();
    })
});