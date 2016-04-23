export default class Game extends Phaser.State {

  create() {
    this.game.score = 0;
  	this.game.state.start("Level1");
  }

}