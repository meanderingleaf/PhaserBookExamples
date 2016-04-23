export default class GameOver extends Phaser.State {

  create() {
  	this.add.sprite( 0,0,'gameover_bg');

  	var style = { font: "30px Arial", align: "center", fill: "#fff" };
	this.txtValue = this.add.text(512, 534, this.game.score.toString() + " points", style);
	this.txtValue.anchor.setTo(.5, .5);
 	this.game.input.onDown.addOnce(this.switchState, this);
  }

  switchState() {
  	this.game.score = 0;
  	this.state.start("Level1");
  }


}