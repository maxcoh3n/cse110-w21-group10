/**
 * Stops the Horse shoe animation by calling cancelInterval.
 * Clears out the canvas.
 */
function stopHorseShoe() {
  clearInterval(localStorage.getItem("animateID"));
  let canvas = document.getElementById("horseshoe");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
/**
 *
 * @param {number} time
 * @param {number} direction
 * @param {boolean} devMode
 * Starts the horseshoe animation in the HTML canvas tag with id horseshoe. Input var time 
 * represents the timer duration in minutes, which affects the rate at which the horseshoe 
 * changes in shape. Direction indicates if we are drawing clockwise (when working timer), or
 * counterclockwise (when break timer).
 */
function drawHorseShoe(time, direction, devMode) {
  var canvas = document.getElementById("horseshoe");
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = 30;
  ctx.strokeStyle = "black";

  // Scaling based on width allows for easy resizability
  var cw = canvas.width;
  var ch = canvas.height;
  var cx = cw / 2;
  var cy = ch / 2;
  var radius = (Math.min(cw, ch) * 0.75) / 2;
  var startAngle = (-5 * Math.PI) / 4;
  var endAngle = (5 * Math.PI) / 4;
  var offset = 0;

  // Start offset at max angle if we are counting back
  if (direction == -1) {
    offset = (3 * Math.PI) / 2;
  }

  // Amount of movement (in radians) per second
  var increment = (3 * Math.PI) / (2 * time * 60);

  // Function animate runs every second
  var count = setInterval(animate, devMode ? 0.5 : 1000);
  localStorage.setItem("animateID", count);

  /**
    * One cycle of the animation. Change the offset based on increment (depends on time). 
    * Draw an arc from start angle to end angle. 
  */
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
