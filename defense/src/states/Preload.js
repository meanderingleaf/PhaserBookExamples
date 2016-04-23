export default class Preload { 

  constructor() {
  	this.preloadAsset = null;
    this.ready = false;
  }

  preload() {
    this.load.image('loading_bg', 'assets/images/loading_bg.jpg');
  }

  create() {

    //background for game
    this.add.sprite(0,0, "loading_bg");

    this.preloadAsset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
    this.preloadAsset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.preloadAsset);

    //do all your loading here
    this.load.pack('level1', 'assets/assetPack.json', null, this);
    
    //staaaart load
    this.load.start();
  }

  update() {

    if(this.ready) {
      this.game.state.start('menu');
    }

  }

  onLoadComplete() {
    this.ready = true;
  }

}