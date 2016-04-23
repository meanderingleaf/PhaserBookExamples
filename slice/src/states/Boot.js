export default class Boot { 

  preload() {
    this.load.image('preloader', 'assets/images/loading_bar.png');
  }

  create() {

  	this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	this.scale.setMinMax(260,480,768,1024);

	if (this.game.device.desktop == false)
	{
	  	this.scale.forceOrientation(false, true); 
	}

    this.game.state.start('preload');
  }

}

