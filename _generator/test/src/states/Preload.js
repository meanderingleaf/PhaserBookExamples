function Preload() {
	this.preloadAsset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {

    this.load.image('loading_bg', 'assets/images/loading_bg.jpg');
  },
  create: function() {

    //background for game
    this.add.sprite(0,0, "loading_bg");

    this.preloadAsset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
    this.preloadAsset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.preloadAsset);

    //do all your loading here
    //this.load.image('btnAbout', 'assets/img/btnAbout.png');

    //staaaart load
    this.load.start();
  },
  update: function() {

    if(this.ready) {
      this.game.state.start('game');
    }

  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;