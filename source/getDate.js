/**
 * returns today's date in a mm/dd format
 */
function getDate() {
  let dateObject = new Date();
  return dateObject.getMonth() + 1 + "/" + dateObject.getDate();
}

export { getDate };
