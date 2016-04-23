var game;

import Boot from "./states/Boot.js";
import Preload from "./states/Preload.js";
import Game from "./states/Game.js";
import Menu from "./states/Menu.js";
import GameOver from "./states/GameOver.js";

window.onload = function () {
  game = new Phaser.Game(800, 450, Phaser.AUTO, 'game');
  game.state.add('boot', Boot);
  game.state.add('preload', Preload);
  game.state.add('gameover', GameOver);
  game.state.add('menu', Menu);
  game.state.add('game', Game);
  game.state.start('boot');
};