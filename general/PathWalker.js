export default class PathWalker extends Phaser.Sprite {

	constructor(game, x, y, frame) {  
	    super(game, x, y, 'spriteKey', frame);
	}

	setPath(path) {
		this.path = path;
		this.pathPosition = -1;
		this.advanceTile();
	}

	advanceTile() {
		this.pathPosition ++;

		if(this.pathPosition < this.path.length) {
			//tween
			this.walkMotion = this.game.add.tween(this).to({ isoX: this.path[this.pathPosition].x, isoY: this.path[this.pathPosition].y }, 2000, Phaser.Easing.Linear.None, true);
			this.walkMotion.onComplete.add(this.advanceTile, this);
		}
	}
}