/**
 * Stops the Horse shoe animation by calling cancelInterval.
 * Clears out the canvas.
 */
function stopHorseShoe() {
  clearInterval(localStorage.getItem("animateID"));
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
/**
 *
 * @param {number} time
 * @param {number} direction
 * @param {boolean} devMode
 * Starts the Horse shoe animation. Noah pls continue
 */
function drawHorseShoe(time, direction, devMode) {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var cw = canvas.width;
  var ch = canvas.height;

  var cx = cw / 2;
  var cy = ch / 2;
  var radius = (Math.min(cw, ch) * 0.75) / 2;
  var startAngle = (-5 * Math.PI) / 4;
  var endAngle = (5 * Math.PI) / 4;
  var offset = 0;
  if (direction == -1) {
    offset = (3 * Math.PI) / 2;
  }
  // Can use input parameters instead, workTime and breakTime are in terms of minutes
  //time = 0.5;

  var increment = (3 * Math.PI) / (2 * time * 60);

  ctx.lineWidth = 30;
  ctx.strokeStyle = "black";
  var count = setInterval(animate, devMode ? 0.5 : 1000);
  localStorage.setItem("animateID", count);

  function animate() {
    ctx.clearRect(0, 0, cw, ch);
    // Drawing work arc means we increment offset depending on workTime
    if (direction == 1) {
      offset += increment;
    }
    // Drawing break arc means we decrement offset depending on breakTime
    else if (direction == -1) {
      offset -= increment;
    }
    // Draw an arc that has fixed starting degrees, with ending degrees dependent on timer
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, offset - endAngle);
    ctx.stroke();
  }
}
export { drawHorseShoe, stopHorseShoe };
