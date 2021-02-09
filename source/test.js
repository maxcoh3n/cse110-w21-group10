console.log("test")
console.log("test")

/**
 *
 * @param {number} floors
 * @param {number} bathrooms
 * @param {number} rooms
 * @param {string} street
 */
function house( floors, bathrooms, rooms, street ) {
    let ret = `This house on ${street} street has ${floors} floors, ${bathrooms} bathrooms, and ${rooms} rooms!`;
    return ret;
}