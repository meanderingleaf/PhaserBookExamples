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
    //this.load.image('player', 'assets/images/player.png'); //width and height of sprite


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