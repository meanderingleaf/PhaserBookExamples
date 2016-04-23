function Boot() { }

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/images/loading_bar.png');
  },
  create: function() {
    this.game.state.start('preload');
  }
};


module.exports = Boot;