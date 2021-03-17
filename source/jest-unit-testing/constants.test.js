import {setLocalStorageDefaults} from "../constants.js";
import {meh} from "../bad.js"


describe('constants', ()=>{
    test('testing renderAll when tasksArray length = 0', ()=>{
        expect(setLocalStorageDefaults()).toBeUndefined();
    })
});