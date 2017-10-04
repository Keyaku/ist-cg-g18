/*******************************************************************************
* Edibles - Helper methods
*******************************************************************************/
/**
* edibleObjects is a dictionary with interactable objects such as oranges.
*/
var edibleObjects = {};

/**
* Adds a new edible of supertype Object3D with to a dictionary
* whose keys are the desired Object3D name passed as a String
*/
function createEdible(Edible, name, x, y, z) {
	edibleObjects[name] = new Edible(name, x, y, z);
}

function getEdible(edibleName) {
	var edible = edibleObjects[edibleName];
	console.log(edibleName);
}

function deleteEdible(edibleName) {
	var obj = scene.getObjectByName(edibleName);
	scene.remove(obj);
	delete edibleObjects[edibleName];
}
