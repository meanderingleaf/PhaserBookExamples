export default class PrefabExample extends Phaser.Sprite {

	constructor(game, x, y, bulletLayer, frame) {  
	  super(game, x, y, 'spriteKey', frame);

	  // initialize your prefab here
	 
	  //here is a simple, speed variable
	  this.speed = 2;
	}

	//simple usage of the the update function, along with the class properties
	update() {
		this.x += this.speed;
	}
}