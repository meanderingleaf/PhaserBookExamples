export default class Enemy extends Phaser.Sprite {

	constructor(game, x, y, bulletLayer, frame) {  
	  super(game, x, y, 'enemy', frame);

	  // initialize your prefab here
	  this.game.physics.enable(this, Phaser.Physics.ARCADE);

	  this.body.velocity.x = -175;
	  this.bounceTick = Math.random() * 2;

	  this.bulletLayer = bulletLayer;

	  this.outOfBoundsKill = true;

	  this.willFire = Phaser.Utils.chanceRoll(50);
	  
	  console.log(this.willFire);

	  if(this.willFire) {
	  	this.fireTimer = this.game.time.create(false);
      	this.fireTimer.add(3500, this.fireShot, this);
      	this.fireTimer.start();
	  }
	}

	fireShot() {
		var bullet = this.bulletLayer.create(this.x, this.y, "enemyBullet");
		this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
		bullet.outOfBoundsKill = true;
	    bullet.checkWorldBounds = true;
		bullet.body.velocity.x = -250;
	}

	update() {
		this.bounceTick += .02;
	  	this.y += Math.sin(this.bounceTick) * 1;
	}
}