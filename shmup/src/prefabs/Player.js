export default class Player extends Phaser.Sprite { 

	constructor(game, x, y, bullets) {  

	  super(game, x, y, 'player', 0);

	  this.game.physics.enable(this, Phaser.Physics.ARCADE);
	  this.body.drag.x = 35;
	  this.body.drag.y = 35;
	  this.body.collideWorldBounds = true;

	  // initialize your prefab herea
	  this.speed = 100;
	  this.bulletGate = 0;
	  this.shotInterval = 500;
	  this.bullets = bullets;
	  this.cursors = this.game.input.keyboard.createCursorKeys();
	  this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


	  this.health = { current: 10, max: 10 };
	  this.fireposition = { x: 160, y: 100 };

	  this.animations.add("fly", [0,0,1,1,2,2,3,4,5,6,7,8,9,10,10]);
	  this.fireAnimation = this.animations.add("fire", [11,12,13]);
	  this.fireAnimation.onComplete.add(this.playFly, this);
	  this.animations.play("fly", 14, true);
	}

	update() {


	  	// write your prefab's specific update code here
		if(this.cursors.left.isDown) {
			this.body.velocity.x = -this.speed;
		}

		if(this.cursors.right.isDown) {
			this.body.velocity.x = this.speed;
		}

		if(this.cursors.up.isDown) {
			this.body.velocity.y = -this.speed;
		}

		if(this.cursors.down.isDown) {
			this.body.velocity.y = this.speed;
		}

		if(this.fireButton.isDown) {
			this.fire();
		}
	}

	fire() {

		if(this.game.time.now > this.bulletGate) {

			var bullet = this.bullets.getFirstDead();
			if(bullet) {
				bullet.x = this.x + this.fireposition.x;
				bullet.y = this.y + this.fireposition.y;
				bullet.revive();
			} else {
				bullet = this.bullets.create(this.x + this.fireposition.x, this.y+this.fireposition.y, "bullet");
				this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
				bullet.outOfBoundsKill = true;
	    		bullet.checkWorldBounds = true;
				bullet.body.velocity.x = 250;
			}

			this.animations.play("fire");

			this.bulletGate = this.game.time.now + this.shotInterval;
			
		}
	}

	damage(amt) {
		this.health.current -= amt;
	}

	playFly() {
		this.animations.play("fly", 14, true);
	}
}