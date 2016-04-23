export default class Human extends Phaser.Plugin.Isometric.IsoSprite {

	constructor(game, x, y, enemies, arrows) {  
	  	super(game, x, y, 0, 'human', 0);

	  	// initialize your prefab here
		this.animations.add('idle', [10,11]);
		this.animations.play('idle', 2, true);

		this.anchor.setTo(.5, .5);
		this.enemies = enemies;
		this.arrows = arrows;

		this.shotInterval = 400;
		this.shotTime = this.game.time.now+this.shotInterval;
	}

	update() {

		if(this.game.time.now > this.shotTime) {

			this.target = this.enemies.findNearest(this.x, this.y);

			if(this.target) {
				var arrow = this.arrows.getFirstDead();
				if(!arrow) arrow = this.arrows.create(0, 0, "arrow");
				arrow.revive();
				arrow.x = this.x;
				arrow.y = this.y;
				arrow.lifespan = 4000;

				arrow.rotation = this.game.physics.arcade.moveToObject(arrow, this.target, 120)

				this.shotTime = this.game.time.now+this.shotInterval;
			}
		}
	}
}