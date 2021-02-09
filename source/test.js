console.log("test")
console.log("test")

/**
 *
 * @param {number} floors1
 * @param {number} bathrooms
 * @param {number} rooms
 * @param {string} street
 */
function house( floors1, bathrooms, rooms, street ) {
    let ret = `This house on ${street} street has ${floors1} floors, ${bathrooms} bathrooms, and ${rooms} rooms!`;
    return ret;
}