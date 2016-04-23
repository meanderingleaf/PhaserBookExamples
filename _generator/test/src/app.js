var game;

window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  game.state.add('boot', require("./states/Boot.js"));
  game.state.add('preload', require("./states/Preload.js"));
  game.state.add('game', require("./states/Game.js"));
  game.state.start('boot');
};