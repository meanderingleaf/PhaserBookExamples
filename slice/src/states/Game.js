import SliceBody from "../prefabs/SliceBody.js";
import Device from "../prefabs/Device.js";
import SwipeHandler from "../components/SwipeHandler.js";

export default class Game { 

  constructor() {

    this.deviceTypes = [ "boy.png", "floppy.png", "walkman.png" ];
    this.deviceTypes.getRandomEntry = function() {
      return this[ Math.floor( Math.random() * this.length) ];
    }
  }

  create() {

    this.bg = this.add.sprite(this.game.width/2, this.game.height/2, 'gamebg');
    this.bg.anchor.set(0.5, 0.5);

    this.game.world.setBounds(-15000, -15000, 30000, 30000);

    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.gravity.y = 750;
    this.game.physics.p2.restitution = 0.8;

  	this.drawingSlice = false;


    //this.game.input.onDown.add(this.inputDown, this);
    //this.game.input.onUp.add(this.inputUp, this);

    this.devices = this.add.group();
  	this.trails = this.add.group();

  	this.sliceStart = { x: 0, y: 0 };
    this.sliceBodies = new Phaser.ArraySet();

    this.timer = this.game.time.create(false);
    this.timer.loop(1000, this.spawnWave, this);
    this.timer.start();

    this.score = 0;

    var style = { font: "70px dymaxionscriptregular", fill: "#ff0044", align: "center" };
    this.txtScore = this.add.text( this.game.width / 2, 30, this.score.toString() + " pts", style);
    this.txtScore.anchor.set(0.5);

    this.emitter = this.game.add.emitter(0,0, 200);
    this.emitter = this.emitter.makeParticles(['triangle', 'zoid']);

    this.slicedPieces = this.add.group();
    this.deviceCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.sliceCollisionGroup = this.game.physics.p2.createCollisionGroup();

    this.swipeHandler = new SwipeHandler(this.game);
    this.swipeHandler.swipeStart.add(this.swipeStart, this);
    this.swipeHandler.swipeEnd.add(this.swipeEnd, this);
    this.add.existing(this.swipeHandler);

    this.spawnWave();
  }

  update() {

    if(this.swipeHandler.swiping) {
        this.curGraphics.clear();
        this.curGraphics.lineStyle(10, 0xffd900, 1);
        this.curGraphics.moveTo(this.sliceStart.x, this.sliceStart.y);
        this.curGraphics.lineTo( this.input.activePointer.x, this.input.activePointer.y );
    }

    this.sliceBodies.callAll("updateLife");
  }

  endSegment() {
     var ray = new Phaser.Line(this.sliceStart.x, this.sliceStart.y, this.input.activePointer.x, this.input.activePointer.y);  	 
     var sliceBody = new SliceBody(this.game, ray, this.deviceCollisionGroup, this.sliceCollisionGroup);

     //add the line to it
     sliceBody.group = this.sliceBodies;
     sliceBody.success.add(this.sliceHit, this);
     this.sliceBodies.add(sliceBody);

     // this.sliceBody.removeFromWorld();
   //   this.sliceBody = null;

   // this.sliceBody.destroy();

     this.game.add.tween(this.curGraphics).to({ alpha: 0 }, 800, Phaser.Easing.Quadratic.Out, true);
  }

  sliceHit( sliceBody, device ) {

    var coords = sliceBody.ray.coordinatesOnLine(20);

    for( var i = 0;  i < coords.length; i++) { 
      this.emitter.x = coords[i][0];
      this.emitter.y = coords[i][1];
      this.emitter.explode(2000, 1);
    }

    this.score++;
    this.txtScore.text = this.score.toString() + " pts";

    var sliceSprite = this.slicedPieces.create(device.sprite.x,device.sprite.y,device.sprite.key,device.sprite.frameName);
    var halfHeight = Math.floor(sliceSprite.height / 2);
    sliceSprite.crop(new Phaser.Rectangle(0,0, sliceSprite.width, halfHeight));
    this.game.physics.p2.enable(sliceSprite);
    sliceSprite.anchor.setTo(.5, 1);
    sliceSprite.body.rotation = device.rotation;
    sliceSprite.body.setCollisionGroup(this.game.physics.p2.nothingCollisionGroup);
    sliceSprite.body.angularVelocity = -1.2;


    var sliceSprite2 = this.slicedPieces.create(device.sprite.x,device.sprite.y,device.sprite.key,device.sprite.frameName);
    sliceSprite2.crop(new Phaser.Rectangle(0,halfHeight, sliceSprite.width, halfHeight));
    this.game.physics.p2.enable(sliceSprite2);
    sliceSprite2.anchor.setTo(.5, 0);
    sliceSprite2.body.rotation = device.rotation;
    sliceSprite2.body.setCollisionGroup(this.game.physics.p2.nothingCollisionGroup);
    sliceSprite2.body.angularVelocity = 1.2;

  }

  startSegment() {
	  this.sliceStart.x = this.input.activePointer.x;
  	this.sliceStart.y = this.input.activePointer.y;
  	this.curGraphics = new Phaser.Graphics(this.game, 0, 0);
  	this.curGraphics.lineStyle(10, 0xffd900, 1);
  	this.trails.add(this.curGraphics);
  }

  swipeStart() {
  	this.startSegment();
  }

  swipeEnd() {
	   this.endSegment();
  }

  resize(width, height) {
    this.txtScore.x = width / 2;

    this.bg.x = width/2;
    this.bg.y = height/2;
    this.bg.height = height;
  }

  spawnWave() {

    var d = this.devices.getFirstDead();
    if(!d) {
      d =  new Device(this.game, 300, this.game.height + 100, this.deviceTypes.getRandomEntry(), this.deviceCollisionGroup, this.sliceCollisionGroup);
      d.launch();
      this.devices.add(d);
    } else {
      d.revive();
      d.launch();
    }
  }

}