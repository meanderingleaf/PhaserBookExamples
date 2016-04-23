var game;

import Boot from "./states/Boot.js";
import Preload from "./states/Preload.js";
import Game from "./states/Game.js";
import HomeScreen from "./states/HomeScreen.js";

window.onload = function () {
  game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game');
  game.state.add('boot', Boot);
  game.state.add('preload', Preload);
  game.state.add('game', Game);
  game.state.add('homescreen', HomeScreen);
  game.state.start('boot');
};