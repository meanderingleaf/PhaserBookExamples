var game;

import Boot from "./states/Boot.js";
import Preload from "./states/Preload.js";
import Game from "./states/Game.js";

window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  game.state.add('boot', new Boot());
  game.state.add('preload', new Preload());
  game.state.add('game', new Game());
  game.state.start('boot');
};
