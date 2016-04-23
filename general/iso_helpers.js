
function catesianToIso(cartesianCoords) {
	var isoCoords = {};
	isoCoords.x = (cartesianCoords.x / tileHalfWidth + cartesianCoords.y / tileHalfHeight) /2;
	isoCoords.y = (cartesianCoords.y / tileHalfHeight - (cartesianCoords.x / tileHalfWidth)) /2;
	return isoCoords;
}

function isoToCartesian( isoCoords ) {
	var cartesianCoords = {}
	cartesianCoords.x = (isoCoords.x - isoCoords.y) * tileHalfWidth;
	cartesianCoords.y = (isoCoords.x + isoCoords.y) * tileHalfHeight;
	return cartesianCoords;
}