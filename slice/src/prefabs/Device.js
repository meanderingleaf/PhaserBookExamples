export default class Device extends Phaser.Sprite {

  constructor(game, x, y, frame, collisionGroup, sliceGroup) {  
  	super(game, x, y, 'devices');

  	// initialize your prefab here
  	this.frameName = frame;

    this.anchor.setTo(.5,.5);

  	this.game.physics.p2.enable(this);
    this.body.setCollisionGroup(collisionGroup);
    this.body.collides(sliceGroup);
    //this.body.collideWorldBounds = false;
  }


    update() {
      if(this.body.y > 3000) {
        this.kill();
      }
    }

    launch() {

      this.body.setZeroVelocity();
      this.body.angularVelocity = 0;

      	if(Phaser.Utils.chanceRoll(50)) {
      		this.body.x = this.game.width;
          this.body.y = this.game.height + 100;
      		//this.body.velocity.x = 800;
      		//this.body.velocity.x = 2500;
      		this.body.applyForce( [800, 2500], this.body.x + 20, this.body.y );
      	} else {
      		this.body.x = 0;
          this.body.y = this.game.height + 100;
      		this.body.applyForce( [-800, 2500], this.body.x - 20, this.body.y );
      	}

        this.life = 20;
    }
}