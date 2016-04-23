//require other components

export default class Game extends Phaser.State {

  constructor() {
    //object level properties
    super();
  }

  create() {
    
    //object level properties
    this.pulling = false;
    this.launched = false;
    this.round = 0;
    this.score = 0;
    
    //start physics
    this.physics.startSystem(Phaser.Physics.P2JS);
    this.world.setBounds(0, 0, 3000, 768);
    
    //add game bg
    this.bg = this.add.sprite(0,0,'bg');
    this.bg.fixedToCamera =true;
    
    //impulse chain
    this.forceLine = this.add.graphics(0,0);
    
    //create and configure comet
    this.comet = this.add.sprite(300,330,'comet');
    this.comet.anchor.set(.5, .5);
    this.physics.p2.enable(this.comet);
    this.comet.body.setCircle(40, 140, -10);
    this.comet.inputEnabled = true;
    
    //setup asteroids
    this.asteroids = this.add.group();
    this.asteroids.enableBody = true;
    this.asteroids.physicsBodyType = Phaser.Physics.P2JS;
    
    //emitter
    this.trail = this.add.emitter(this.comet.x, this.comet.y);
    this.trail.makeParticles(['particle1', 'particle2']);
    this.trail.start(false, 3000, 50);
    this.trail.setAlpha(1, 0, 3000);
    this.trail.setScale(0.4, 1, 0.4, 1, 4000);
    
    //foreground
    this.add.sprite(0,0, 'fg');
    
    //Text
    var style = { font: "30px Arial", fill: "#FFF" };
    this.txtScore = this.add.text(20, 20, "Round 0, Score 0", style);
    this.txtScore.fixedToCamera = true;
    
    //follow that comet
    this.camera.follow(this.comet);
    
    //setup game board
    this.resetBoard();
  }

  startPull() {
    this.pulling = true;
    this.game.input.onUp.addOnce(this.endPull, this);  
  }
  
  endPull() {
    this.pulling =  false;
    this.launched = true;
    
    var forceLine = new Phaser.Line(this.input.activePointer.x, this.input.activePointer.y, this.comet.x, this.comet.y);
    this.comet.body.motionState =  Phaser.Physics.P2.Body.DYNAMIC;
    this.comet.body.velocity.x = Math.cos(forceLine.angle) * forceLine.length * 6;
    this.comet.body.velocity.y = Math.sin(forceLine.angle) * forceLine.length * 2;
    this.forceLine.clear();
    
    this.time.events.add(5500, this.resetBoard, this);
  }

  resetBoard() {

    this.launched = false;

    this.comet.body.reset();
    this.comet.body.rotation = 0;
    this.comet.body.motionState =  Phaser.Physics.P2.Body.STATIC;
    this.comet.events.onInputDown.addOnce(this.startPull, this);
    this.comet.body.x = 300;
    this.comet.body.y = 370;
    
    this.asteroids.removeAll(true);
    this.asteroids.create(2800, 400, 'asteroid');
    this.asteroids.create(2500, 200, 'asteroid');
    this.asteroids.create(2200, 500, 'asteroid');
    this.asteroids.create(2200, 200, 'asteroid');
    this.asteroids.create(2600, 600, 'asteroid');
    this.asteroids.create(1800, 600, 'asteroid');
    this.asteroids.create(1600, 300, 'asteroid');
    
    this.asteroids.forEach(
      function(asteroid) {
        asteroid.mass = .7;
        asteroid.checkWorldBounds = true;
        asteroid.body.setCircle(75);
        asteroid.events.onOutOfBounds.addOnce(this.killedAsteroid, this)
      }, 
      this
    );
    
    this.round ++;
    this.txtScore.text = "Round: " + this.round + " Score: " + this.score;
      
      
  }
  
  killedAsteroid() {
    this.score ++;
  }

  update() {
    
    if(this.pulling ) {
        this.forceLine.clear();
        this.forceLine.lineStyle(10, 0xffffff, .8);
        this.forceLine.moveTo( this.input.activePointer.x, this.input.activePointer.y);
        this.forceLine.lineTo(this.comet.x, this.comet.y);
    }
    
    if(this.launched) {
      this.comet.body.force.y = 270;
    }
    
    this.trail.x = this.comet.x;
    this.trail.y = this.comet.y;
    
  }

}