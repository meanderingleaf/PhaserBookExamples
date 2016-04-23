//require other components
import Player from "../prefabs/Player.js";
import Mouse from "../prefabs/Mouse.js";
import NumberBox from "../prefabs/NumberBox.js";

export default class Level2 extends Phaser.State {

  constructor() {
    //object level properties
    super();
  }

  create() {

  	//physics
  	this.physics.startSystem(Phaser.Physics.ARCADE);
  	this.physics.arcade.gravity.y = 800;

    //map start
    this.map = this.add.tilemap('level2');

    //parallax background
    this.map.addTilesetImage('gamebg');
    this.bg = this.map.createLayer('bg');
    this.bg.scrollFactorX = .6;
    this.bg.scrollFactorY = .6;

    //walkable tiles
    this.map.addTilesetImage('Tiles');
    this.layer = this.map.createLayer('Level');

    //collision
    this.layer.resizeWorld();
    this.map.setCollisionBetween(6,25,true,this.layer);

    //coin layer
    this.coins = this.add.group();
    this.coins.physicsBodyType = Phaser.Physics.ARCADE;
    this.coins.enableBody = true;
    this.map.createFromObjects("Collectables", 241, 'coin', null, true, false, this.coins);
    this.coins.setAll("body.gravity", 0);

    //place doors
    this.doors = this.add.group();
    this.doors.physicsBodyType = Phaser.Physics.ARCADE;
    this.doors.enableBody = true;
    this.map.createFromObjects("Doors", 242, 'sign', null, true, false, this.doors);
    this.doors.setAll("body.gravity", 0);

    //player
    this.map.createFromObjects("Player", 243, null, null, true, false, this.world, Player);
    this.player = this.world.getTop();

    //place enemies
    this.enemies = this.add.group();
    this.map.createFromObjects("Enemies", 225, null, null, true, false, this.enemies, Mouse);
    this.enemies.setAll("player", this.player);

  	//UI
  	this.UIGroup = this.add.group();
  	this.scoreField = new NumberBox(this.game, "scoreholder", this.game.score, this.UIGroup);
  	this.scoreField.fixedToCamera = true;

    this.sfx = this.add.audioSprite('sfx');

  	this.camera.follow(this.player);
  }

  update() {
  	this.physics.arcade.collide(this.player, this.layer);
  	this.physics.arcade.collide(this.enemies, this.layer);
    this.physics.arcade.overlap(this.player, this.doors, this.hitDoor, null, this);
  	this.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
  	this.physics.arcade.collide(this.player, this.enemies, this.hitEnemy, null, this);
  }

  collectCoin(playerRef, coinRef) {
  	coinRef.kill();
  	this.game.score ++;
  	this.scoreField.setValue(this.game.score);
    this.sfx.play("coin");
  }

  hitDoor(playerRef, doorRef) {
    this.game.state.start("GameOver");
  }

  hitEnemy(playerRef, enemyRef) {	
  	if(!playerRef.flashEffect.isRunning) {
  		playerRef.flash();
      this.sfx.play("hit");
	  	if(this.game.score > 0) {
	  		this.game.score --;
	  		this.scoreField.setValue(this.game.score);
	  	}
  	}
  }

}