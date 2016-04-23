export default class HealthBar extends Phaser.Group {

	constructor(game, xpos, ypos, barGraphic, holderGraphic) {
		super(game);

		this.x = xpos;
		this.y = ypos;

		this.bar = this.create(0,0, barGraphic);
		this.holder = this.create(0,0, holderGraphic);
	}

	setValue(val) {
		if(this.tween) this.tween.stop();
		this.tween = this.game.add.tween(this.bar.scale);
		this.tween.to({ x: val }, 350);
		this.tween.start();
	}

}