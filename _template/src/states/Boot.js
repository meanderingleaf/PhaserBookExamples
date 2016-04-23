export default class Boot {

  preload() {
    this.load.image('preloader', 'assets/images/loading_bar.png');
  }

  create() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }

}