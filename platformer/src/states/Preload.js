export default class Preload {

  constructor() {
    this.asset = null;
    this.ready = false;
  }

  preload() {
    this.load.image('loading_bg', 'assets/images/loading_bg.jpg');
  }

  create() {

    //background for game
    this.add.sprite(0,0, "loading_bg");

    this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    //do all your loading here
    this.load.spritesheet('player', 'assets/images/sprites/FoxSprite.png', 210, 210);
    this.load.spritesheet('mouse', 'assets/images/sprites/MouseSprite.png', 165, 160);
    this.load.image('gamebg', 'assets/images/Background.png');
    this.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level2', 'assets/levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('Tiles', 'assets/images/Tiles.png');
    this.load.image('coin', 'assets/images/coin.png');
    this.load.image('scoreholder', 'assets/images/scoreholder.png');
    this.load.image('sign', 'assets/images/sign.png');
    this.load.image('gameover_bg', 'assets/images/gameover_bg.png');
    this.load.audiosprite('sfx', [ 'assets/sounds/sfx.mp3', 'assets/sounds/sfx.ogg' ], "assets/sounds/sfx.json")

    //staaaart load
    this.load.start();
  }

  update() {

    if(this.ready) {
      this.game.state.start('game');
    }

  }

  onLoadComplete() {
    this.ready = true;
  }

}