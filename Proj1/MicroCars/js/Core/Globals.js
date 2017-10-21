/*******************************************************************************
* Car variables
*******************************************************************************/
const CAR_ACCELERATION = 2;
const TURN_ASSIST = CAR_ACCELERATION / 32;
const WHEEL_ROTATION = Math.PI / 16;

/*******************************************************************************
* Board variables
*******************************************************************************/
const BOARD_WIDTH = 1000;
const BOARD_LENGHT = 1000;
const HALF_BOARD_WIDTH  = BOARD_WIDTH  >> 1;
const HALF_BOARD_LENGHT = BOARD_LENGHT >> 1;
const FRICTION = 0.02;

/*******************************************************************************
* Directional variables
*******************************************************************************/
const X_AXIS_HEADING = new THREE.Vector3(1, 0, 0);
const Y_AXIS_HEADING = new THREE.Vector3(0, 1, 0);
const Z_AXIS_HEADING = new THREE.Vector3(0, 0, 1);

/*******************************************************************************
* Trignometric variables
*******************************************************************************/
const TO_DEGREES = 180 / Math.PI;
const TO_RADIANS = Math.PI / 180;
const NINETY_DEGREES = Math.PI / 2;
const THREE_HUNDRED_SIXTY_DEGREES = 2 * Math.PI;

/*******************************************************************************
* Helper methods
*******************************************************************************/

/**
* objectNeedsRespawn verifies if an object is within the boundaries of the board
* @param x: x position of the object subject to verification.
* @param z: z position of the object subject to verification.
* @return: Boolean value True if orange is outside of the board. False otherwise
*/
function objectNeedsRespawn(x, z) {
  if (x >= ((-1) * HALF_BOARD_WIDTH) && x <= (HALF_BOARD_WIDTH) &&
      z >= ((-1) * HALF_BOARD_LENGHT) && z <= (HALF_BOARD_LENGHT)) {
    return true;
  } else {
    return false;
  }
}

/** generateSpawnLocation(min, max)
@param min: used to calculate a random coordinate in inverval [min, max]
@param max: used to calculate a random coordinate in inverval [min, max]
@var signX: defines if x coordinate is positive or negative
@var signZ: defines if z coordinate is positive or negative
@var x: X coordinate (value calculated randomly based on min-max values)
@var y: Y coordiante (default is 0 - orange stay on top of the board at all times)
@var z: Z coordinate (value calculated randomly based on min-max values)
@return: Vector3D that defines a new spawn location after orange falls from the table.
*/
function generateSpawnLocation(min, max) {
  var signX = Math.random() < 0.5 ? -1 : 1;
  var signZ = Math.random() < 0.5 ? -1 : 1;
  var x = Math.floor(Math.random() * (max - min + 1)) + min;
  var y = 0;
  var z = Math.floor(Math.random() * (max - min + 1)) + min;
  var spawnLocation = new THREE.Vector3(x, y, z);
  return spawnLocation;
}

/** respawnObject(spawnLocation, axis, distance)
* @param obj: object that is being respawned
* @param distance: How far should the orange travel after respawning
*/
function respawnObject(obj, distance) {
  obj.position.set(generateSpawnLocation(0, HALF_BOARD_WIDTH));
  obj.move(X_AXIS_HEADING, distance);
}
