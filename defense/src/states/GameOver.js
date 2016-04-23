export default class GameOver {

  preload() {

  }

  create() {
  	this.game.add.sprite(0,0, "gamebg");
  	this.otr = this.game.add.sprite(this.game.width/2,200,"gameoverText");
  	this.otr.anchor.setTo(.5, .5);
  	this.btnPlay = this.game.add.sprite(this.game.width/2,300,"btnAgain");
  	this.btnPlay.anchor.setTo(.5, .5);
  	this.btnPlay.alpha = 0;

  	this.game.add.tween(this.btnPlay).to( { alpha: 1 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

  	this.game.input.onDown.addOnce(this.switchState, this);
  }

  switchState() {
  	this.game.state.start("game");
  }
  
}