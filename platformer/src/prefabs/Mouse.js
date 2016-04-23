export default class Mouse extends Phaser.Sprite {

		constructor(game, x, y, player) { 
		super(game, x, y, 'mouse', 0);

		//game object level variables
		this.speed = 200;
		this.jumpPower = 600;
		this.stepLimit = 90;
		this.facing = 0;
		this.currentStep = Math.floor(Math.random() * this.stepLimit);
		this.player = player;

		//animations
		this.animations.add("stand", [0]);
		this.swingAnimation = this.animations.add("swing", [0,1,2,3,4,5,6,7]);
		this.animations.add("run", [8,9,10,11,12,13,14]);

		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.collideWorldBounds = true;
		this.body.drag = { x: 600, y: 0 };
		this.body.setSize(60, 80);
		this.anchor.setTo(.5, 1);

		this.animations.play("run", 9, true);
	}		

	update() {

		var dist = Phaser.Math.distance(this.x, this.y, this.player.x, this.player.y);

		if( Math.round(dist) < 210 ) {
			this.animations.play("swing", 9);

			if(this.x < this.player.x) {
				this.scale.x = 1;
			} else {
				this.scale.x = -1;
			}			
		}

		if(!this.swingAnimation.isPlaying) {

			this.currentStep++;
			this.body.velocity.x = this.speed;

			this.animations.play("run", 9, true);

			this.scale.x = (this.speed > 0) ? 1 : -1;

			if(this.currentStep >= this.stepLimit) {
				this.speed *= -1;
				this.currentStep = 0;
			}
		}

	}
}