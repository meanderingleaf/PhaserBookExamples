export default class StartScreen {


  create() {
  	
  }

  update() {
  	if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
  		this.game.state.start('game');
  	}
  }

}