
window.requestAnimationFrame(timer);

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.arc(150, 150, 100, Math.PI, 0);
ctx.lineTo(230, 150);
ctx.arc(150, 150, 80, 0, Math.PI, true);
ctx.lineTo(50, 150);
ctx.closePath();
ctx.stroke();

//ctx.fill();



function timer() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");  
    var arclenght = Math.PI / 6;
    var time = new Date();


    var seconds = time.getSeconds();
    ctx.beginPath();
    ctx.arc(150, 150, 100, Math.PI, ((arclenght * (6*(seconds/60))) - Math.PI));
    ctx.lineTo(150 + (Math.cos(-((arclenght * (6*(seconds/60))) - Math.PI)) * 80), 150 - (Math.sin(-((arclenght * (6*(seconds/60))) - Math.PI)) * 80));
    ctx.arc(150, 150, 80, ((arclenght * (6*(seconds/60))) - Math.PI), Math.PI, true);
    ctx.lineTo(50, 150);
    ctx.fill();
    if(seconds == 0){
        ctx.clearRect(0,0,500,500);
    }
    window.requestAnimationFrame(timer);
}