var game;

import Boot from "./states/Boot.js";
import Preload from "./states/Preload.js";
import Game from "./states/Game.js";
import Level1 from  "./states/Level1.js";
import Level2 from "./states/Level2.js";
import GameOver from "./states/GameOver.js";


window.onload = function () {
  game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game');
  game.state.add('boot', Boot);
  game.state.add('preload', Preload);
  game.state.add('game', Game);
  game.state.add('Level1', Level1);
  game.state.add('Level2', Level2);
  game.state.add("GameOver", GameOver);
  game.state.start('boot');
};