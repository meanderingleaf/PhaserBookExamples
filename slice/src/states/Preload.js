export default class Preload {

  constructor() {
	   this.preloadAsset = null;
    this.ready = false;
  }

  preload() {

    var style = { font: "65px dymaxionscriptregular", fill: "#222", align: "center" };
    this.instructionText = this.add.text(-20, -20, ".", style);
    this.instructionText.alpha = 0;

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
    this.load.atlasJSONHash('devices', 'assets/images/sprites/devices.png', 'assets/images/sprites/devices.json');
    this.load.image('gamebg', 'assets/images/gamebg.png');
    this.load.image('triangle', 'assets/images/sprites/triangle.png');
    this.load.image('zoid', 'assets/images/sprites/zoid.png');

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