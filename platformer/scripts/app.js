(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _statesBootJs = require("./states/Boot.js");

var _statesBootJs2 = _interopRequireDefault(_statesBootJs);

var _statesPreloadJs = require("./states/Preload.js");

var _statesPreloadJs2 = _interopRequireDefault(_statesPreloadJs);

var _statesGameJs = require("./states/Game.js");

var _statesGameJs2 = _interopRequireDefault(_statesGameJs);

var _statesLevel1Js = require("./states/Level1.js");

var _statesLevel1Js2 = _interopRequireDefault(_statesLevel1Js);

var _statesLevel2Js = require("./states/Level2.js");

var _statesLevel2Js2 = _interopRequireDefault(_statesLevel2Js);

var _statesGameOverJs = require("./states/GameOver.js");

var _statesGameOverJs2 = _interopRequireDefault(_statesGameOverJs);

var game;

window.onload = function () {
  game = new Phaser.Game(1024, 768, Phaser.AUTO, "game");
  game.state.add("boot", _statesBootJs2["default"]);
  game.state.add("preload", _statesPreloadJs2["default"]);
  game.state.add("game", _statesGameJs2["default"]);
  game.state.add("Level1", _statesLevel1Js2["default"]);
  game.state.add("Level2", _statesLevel2Js2["default"]);
  game.state.add("GameOver", _statesGameOverJs2["default"]);
  game.state.start("boot");
};

},{"./states/Boot.js":5,"./states/Game.js":6,"./states/GameOver.js":7,"./states/Level1.js":8,"./states/Level2.js":9,"./states/Preload.js":10}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Mouse = (function (_Phaser$Sprite) {
		function Mouse(game, x, y, player) {
				_classCallCheck(this, Mouse);

				_get(Object.getPrototypeOf(Mouse.prototype), "constructor", this).call(this, game, x, y, "mouse", 0);

				//game object level variables
				this.speed = 200;
				this.jumpPower = 600;
				this.stepLimit = 90;
				this.facing = 0;
				this.currentStep = Math.floor(Math.random() * this.stepLimit);
				this.player = player;

				//animations
				this.animations.add("stand", [0]);
				this.swingAnimation = this.animations.add("swing", [0, 1, 2, 3, 4, 5, 6, 7]);
				this.animations.add("run", [8, 9, 10, 11, 12, 13, 14]);

				this.game.physics.enable(this, Phaser.Physics.ARCADE);
				this.body.collideWorldBounds = true;
				this.body.drag = { x: 600, y: 0 };
				this.body.setSize(60, 80);
				this.anchor.setTo(0.5, 1);

				this.animations.play("run", 9, true);
		}

		_inherits(Mouse, _Phaser$Sprite);

		_createClass(Mouse, [{
				key: "update",
				value: function update() {

						var dist = Phaser.Math.distance(this.x, this.y, this.player.x, this.player.y);

						if (Math.round(dist) < 210) {
								this.animations.play("swing", 9);

								if (this.x < this.player.x) {
										this.scale.x = 1;
								} else {
										this.scale.x = -1;
								}
						}

						if (!this.swingAnimation.isPlaying) {

								this.currentStep++;
								this.body.velocity.x = this.speed;

								this.animations.play("run", 9, true);

								this.scale.x = this.speed > 0 ? 1 : -1;

								if (this.currentStep >= this.stepLimit) {
										this.speed *= -1;
										this.currentStep = 0;
								}
						}
				}
		}]);

		return Mouse;
})(Phaser.Sprite);

exports["default"] = Mouse;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var NumberBox = (function (_Phaser$Group) {
	function NumberBox(game, bgasset, val, parent) {
		_classCallCheck(this, NumberBox);

		_get(Object.getPrototypeOf(NumberBox.prototype), "constructor", this).call(this, game, parent);

		// initialize your prefab here
		this.create(0, 0, bgasset);

		var style = { font: "30px Arial", align: "center", fill: "#fff" };
		this.txtValue = new Phaser.Text(this.game, 55, 55, val.toString(), style);
		this.txtValue.anchor.setTo(0.5, 0.5);
		this.add(this.txtValue);
	}

	_inherits(NumberBox, _Phaser$Group);

	_createClass(NumberBox, [{
		key: "setValue",
		value: function setValue(val) {
			this.txtValue.text = val.toString();
		}
	}]);

	return NumberBox;
})(Phaser.Group);

exports["default"] = NumberBox;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Player = (function (_Phaser$Sprite) {
	function Player(game, x, y) {
		_classCallCheck(this, Player);

		_get(Object.getPrototypeOf(Player.prototype), "constructor", this).call(this, game, x, y, "player", 0);

		//game object level variables
		this.speed = 400;
		this.airSpeed = 300;
		this.jumpPower = 600;
		this.inAir = true;
		this.hitGround = false;

		//animations
		this.animations.add("idle", [0, 1, 2, 3, 4, 3, 2, 1]);
		this.animations.add("jump", [0, 5, 6, 7, 8, 9]);
		this.landAnimation = this.animations.add("land", [7, 6, 5]);
		this.animations.add("run", [11, 12, 13, 14, 15, 16, 17]);

		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.collideWorldBounds = true;
		this.body.drag = { x: 600, y: 0 };
		this.body.setSize(60, 100);
		this.anchor.setTo(0.5, 1);
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.jumpButton.onDown.add(this.jump, this);

		this.animations.play("idle", 9, true);

		this.flashEffect = this.game.add.tween(this).to({ alpha: 0 }, 50, Phaser.Easing.Bounce.Out).to({ alpha: 0.8 }, 50, Phaser.Easing.Bounce.Out).to({ alpha: 1 }, 150, Phaser.Easing.Circular.Out);
	}

	_inherits(Player, _Phaser$Sprite);

	_createClass(Player, [{
		key: "animationState",
		value: function animationState() {

			if (this.hitGround) {
				this.animations.play("land", 15);
			} else if (!this.inAir && !this.landAnimation.isPlaying) {
				if (Math.abs(this.body.velocity.x) > 4) {
					this.animations.play("run", 9, true);
				} else if (this.body.onFloor()) {
					this.animations.play("idle", 9, true);
				}
			}
		}
	}, {
		key: "update",
		value: function update() {

			this.hitGround = false;
			var wasAir = this.inAir;
			this.inAir = !this.body.onFloor();

			if (this.inAir != wasAir && this.body.velocity > 0) {
				this.hitGround = true;
			}

			this.animationState();

			this.speedToUse = this.inAir ? this.airSpeed : this.speed;

			if (this.cursors.left.isDown) {
				this.scale.x = -1;
				this.body.velocity.x = -this.speedToUse;
			}

			if (this.cursors.right.isDown) {
				this.scale.x = 1;
				this.body.velocity.x = this.speedToUse;
			}
		}
	}, {
		key: "jump",
		value: function jump() {
			if (this.body.onFloor() == true) {
				this.body.velocity.y = -this.jumpPower;
				this.animations.play("jump", 30);
				this.doubleJump = true;
			} else if (this.doubleJump == true) {
				console.log(this.doubleJump);
				this.doubleJump = false;
				this.body.velocity.y = -this.jumpPower;
				this.animations.play("jump", 30);
			}
		}
	}, {
		key: "flash",
		value: function flash() {
			if (!this.flashEffect.isRunning) {
				this.flashEffect.start();
			}
		}
	}]);

	return Player;
})(Phaser.Sprite);

exports["default"] = Player;
module.exports = exports["default"];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Boot = (function () {
  function Boot() {
    _classCallCheck(this, Boot);
  }

  _createClass(Boot, [{
    key: 'preload',
    value: function preload() {
      this.load.image('preloader', 'assets/images/loading_bar.png');
    }
  }, {
    key: 'create',
    value: function create() {
      this.game.input.maxPointers = 1;
      this.game.state.start('preload');
    }
  }]);

  return Boot;
})();

exports['default'] = Boot;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Game = (function (_Phaser$State) {
  function Game() {
    _classCallCheck(this, Game);

    if (_Phaser$State != null) {
      _Phaser$State.apply(this, arguments);
    }
  }

  _inherits(Game, _Phaser$State);

  _createClass(Game, [{
    key: "create",
    value: function create() {
      this.game.score = 0;
      this.game.state.start("Level1");
    }
  }]);

  return Game;
})(Phaser.State);

exports["default"] = Game;
module.exports = exports["default"];

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var GameOver = (function (_Phaser$State) {
  function GameOver() {
    _classCallCheck(this, GameOver);

    if (_Phaser$State != null) {
      _Phaser$State.apply(this, arguments);
    }
  }

  _inherits(GameOver, _Phaser$State);

  _createClass(GameOver, [{
    key: "create",
    value: function create() {
      this.add.sprite(0, 0, "gameover_bg");

      var style = { font: "30px Arial", align: "center", fill: "#fff" };
      this.txtValue = this.add.text(512, 534, this.game.score.toString() + " points", style);
      this.txtValue.anchor.setTo(0.5, 0.5);
      this.game.input.onDown.addOnce(this.switchState, this);
    }
  }, {
    key: "switchState",
    value: function switchState() {
      this.game.score = 0;
      this.state.start("Level1");
    }
  }]);

  return GameOver;
})(Phaser.State);

exports["default"] = GameOver;
module.exports = exports["default"];

},{}],8:[function(require,module,exports){
//require other components
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _prefabsPlayerJs = require("../prefabs/Player.js");

var _prefabsPlayerJs2 = _interopRequireDefault(_prefabsPlayerJs);

var _prefabsMouseJs = require("../prefabs/Mouse.js");

var _prefabsMouseJs2 = _interopRequireDefault(_prefabsMouseJs);

var _prefabsNumberBoxJs = require("../prefabs/NumberBox.js");

var _prefabsNumberBoxJs2 = _interopRequireDefault(_prefabsNumberBoxJs);

var Level1 = (function (_Phaser$State) {
  function Level1() {
    _classCallCheck(this, Level1);

    //object level properties
    _get(Object.getPrototypeOf(Level1.prototype), "constructor", this).call(this);
  }

  _inherits(Level1, _Phaser$State);

  _createClass(Level1, [{
    key: "create",
    value: function create() {

      //physics
      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.physics.arcade.gravity.y = 800;

      //map start
      this.map = this.add.tilemap("level1");

      //parallax background
      this.map.addTilesetImage("gamebg");
      this.bg = this.map.createLayer("bg");
      this.bg.scrollFactorX = 0.6;
      this.bg.scrollFactorY = 0.6;

      //walkable tiles
      this.map.addTilesetImage("Tiles");
      this.layer = this.map.createLayer("Level");

      //collision
      this.layer.resizeWorld();
      this.map.setCollisionBetween(6, 25, true, this.layer);

      //coin layer
      this.coins = this.add.group();
      this.coins.physicsBodyType = Phaser.Physics.ARCADE;
      this.coins.enableBody = true;
      this.map.createFromObjects("Collectables", 41, "coin", null, true, false, this.coins);
      this.coins.setAll("body.gravity", 0);

      //place doors
      this.doors = this.add.group();
      this.doors.physicsBodyType = Phaser.Physics.ARCADE;
      this.doors.enableBody = true;
      this.map.createFromObjects("Doors", 242, "sign", null, true, false, this.doors);
      this.doors.setAll("body.gravity", 0);

      //player
      this.map.createFromObjects("Player", 243, null, null, true, false, this.world, _prefabsPlayerJs2["default"]);
      this.player = this.world.getTop();

      //place enemies
      this.enemies = this.add.group();
      this.map.createFromObjects("Enemies", 25, null, null, true, false, this.enemies, _prefabsMouseJs2["default"]);
      this.enemies.setAll("player", this.player);

      //UI
      this.UIGroup = this.add.group();
      this.scoreField = new _prefabsNumberBoxJs2["default"](this.game, "scoreholder", this.game.score, this.UIGroup);
      this.scoreField.fixedToCamera = true;

      //sound
      this.sfx = this.add.audioSprite("sfx");

      this.camera.follow(this.player);
    }
  }, {
    key: "update",
    value: function update() {
      this.physics.arcade.collide(this.player, this.layer);
      this.physics.arcade.collide(this.enemies, this.layer);
      this.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
      this.physics.arcade.overlap(this.player, this.doors, this.hitDoor, null, this);
      this.physics.arcade.collide(this.player, this.enemies, this.hitEnemy, null, this);
    }
  }, {
    key: "collectCoin",
    value: function collectCoin(playerRef, coinRef) {
      coinRef.kill();
      this.game.score++;
      this.scoreField.setValue(this.game.score);
      this.sfx.play("coin");
    }
  }, {
    key: "hitDoor",
    value: function hitDoor(playerRef, doorRef) {
      this.game.state.clearCurrentState();
      this.game.state.start("Level2");
    }
  }, {
    key: "hitEnemy",
    value: function hitEnemy(playerRef, enemyRef) {
      if (!playerRef.flashEffect.isRunning) {
        playerRef.flash();
        this.sfx.play("hit");
        if (this.game.score > 0) {
          this.game.score--;
          this.scoreField.setValue(this.game.score);
        }
      }
    }
  }]);

  return Level1;
})(Phaser.State);

exports["default"] = Level1;
module.exports = exports["default"];

},{"../prefabs/Mouse.js":2,"../prefabs/NumberBox.js":3,"../prefabs/Player.js":4}],9:[function(require,module,exports){
//require other components
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _prefabsPlayerJs = require("../prefabs/Player.js");

var _prefabsPlayerJs2 = _interopRequireDefault(_prefabsPlayerJs);

var _prefabsMouseJs = require("../prefabs/Mouse.js");

var _prefabsMouseJs2 = _interopRequireDefault(_prefabsMouseJs);

var _prefabsNumberBoxJs = require("../prefabs/NumberBox.js");

var _prefabsNumberBoxJs2 = _interopRequireDefault(_prefabsNumberBoxJs);

var Level2 = (function (_Phaser$State) {
  function Level2() {
    _classCallCheck(this, Level2);

    //object level properties
    _get(Object.getPrototypeOf(Level2.prototype), "constructor", this).call(this);
  }

  _inherits(Level2, _Phaser$State);

  _createClass(Level2, [{
    key: "create",
    value: function create() {

      //physics
      this.physics.startSystem(Phaser.Physics.ARCADE);
      this.physics.arcade.gravity.y = 800;

      //map start
      this.map = this.add.tilemap("level2");

      //parallax background
      this.map.addTilesetImage("gamebg");
      this.bg = this.map.createLayer("bg");
      this.bg.scrollFactorX = 0.6;
      this.bg.scrollFactorY = 0.6;

      //walkable tiles
      this.map.addTilesetImage("Tiles");
      this.layer = this.map.createLayer("Level");

      //collision
      this.layer.resizeWorld();
      this.map.setCollisionBetween(6, 25, true, this.layer);

      //coin layer
      this.coins = this.add.group();
      this.coins.physicsBodyType = Phaser.Physics.ARCADE;
      this.coins.enableBody = true;
      this.map.createFromObjects("Collectables", 241, "coin", null, true, false, this.coins);
      this.coins.setAll("body.gravity", 0);

      //place doors
      this.doors = this.add.group();
      this.doors.physicsBodyType = Phaser.Physics.ARCADE;
      this.doors.enableBody = true;
      this.map.createFromObjects("Doors", 242, "sign", null, true, false, this.doors);
      this.doors.setAll("body.gravity", 0);

      //player
      this.map.createFromObjects("Player", 243, null, null, true, false, this.world, _prefabsPlayerJs2["default"]);
      this.player = this.world.getTop();

      //place enemies
      this.enemies = this.add.group();
      this.map.createFromObjects("Enemies", 225, null, null, true, false, this.enemies, _prefabsMouseJs2["default"]);
      this.enemies.setAll("player", this.player);

      //UI
      this.UIGroup = this.add.group();
      this.scoreField = new _prefabsNumberBoxJs2["default"](this.game, "scoreholder", this.game.score, this.UIGroup);
      this.scoreField.fixedToCamera = true;

      this.sfx = this.add.audioSprite("sfx");

      this.camera.follow(this.player);
    }
  }, {
    key: "update",
    value: function update() {
      this.physics.arcade.collide(this.player, this.layer);
      this.physics.arcade.collide(this.enemies, this.layer);
      this.physics.arcade.overlap(this.player, this.doors, this.hitDoor, null, this);
      this.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
      this.physics.arcade.collide(this.player, this.enemies, this.hitEnemy, null, this);
    }
  }, {
    key: "collectCoin",
    value: function collectCoin(playerRef, coinRef) {
      coinRef.kill();
      this.game.score++;
      this.scoreField.setValue(this.game.score);
      this.sfx.play("coin");
    }
  }, {
    key: "hitDoor",
    value: function hitDoor(playerRef, doorRef) {
      this.game.state.start("GameOver");
    }
  }, {
    key: "hitEnemy",
    value: function hitEnemy(playerRef, enemyRef) {
      if (!playerRef.flashEffect.isRunning) {
        playerRef.flash();
        this.sfx.play("hit");
        if (this.game.score > 0) {
          this.game.score--;
          this.scoreField.setValue(this.game.score);
        }
      }
    }
  }]);

  return Level2;
})(Phaser.State);

exports["default"] = Level2;
module.exports = exports["default"];

},{"../prefabs/Mouse.js":2,"../prefabs/NumberBox.js":3,"../prefabs/Player.js":4}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Preload = (function () {
  function Preload() {
    _classCallCheck(this, Preload);

    this.asset = null;
    this.ready = false;
  }

  _createClass(Preload, [{
    key: 'preload',
    value: function preload() {
      this.load.image('loading_bg', 'assets/images/loading_bg.jpg');
    }
  }, {
    key: 'create',
    value: function create() {

      //background for game
      this.add.sprite(0, 0, 'loading_bg');

      this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);

      //do all your loading here
      this.load.spritesheet('player', 'assets/images/sprites/FoxSprite.png', 210, 210);
      this.load.spritesheet('mouse', 'assets/images/sprites/MouseSprite.png', 165, 160);
      this.load.image('gamebg', 'assets/images/Background.png');
      this.load.tilemap('level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.tilemap('level2', 'assets/levels/level2.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('Tiles', 'assets/images/Tiles.png');
      this.load.image('coin', 'assets/images/coin.png');
      this.load.image('scoreholder', 'assets/images/scoreholder.png');
      this.load.image('sign', 'assets/images/sign.png');
      this.load.image('gameover_bg', 'assets/images/gameover_bg.png');
      this.load.audiosprite('sfx', ['assets/sounds/sfx.mp3', 'assets/sounds/sfx.ogg'], 'assets/sounds/sfx.json');

      //staaaart load
      this.load.start();
    }
  }, {
    key: 'update',
    value: function update() {

      if (this.ready) {
        this.game.state.start('game');
      }
    }
  }, {
    key: 'onLoadComplete',
    value: function onLoadComplete() {
      this.ready = true;
    }
  }]);

  return Preload;
})();

exports['default'] = Preload;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcZ3J1bnQtYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL3BsYXRmb3JtZXIvc3JjL2FwcC5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvcGxhdGZvcm1lci9zcmMvcHJlZmFicy9Nb3VzZS5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvcGxhdGZvcm1lci9zcmMvcHJlZmFicy9OdW1iZXJCb3guanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL3BsYXRmb3JtZXIvc3JjL3ByZWZhYnMvUGxheWVyLmpzIiwiQzovVXNlcnMvVHJhdmlzL0Rlc2t0b3AvSFRNTDUgR2FtZXMgQm9vay9leGFtcGxlcy9wbGF0Zm9ybWVyL3NyYy9zdGF0ZXMvQm9vdC5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvcGxhdGZvcm1lci9zcmMvc3RhdGVzL0dhbWUuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL3BsYXRmb3JtZXIvc3JjL3N0YXRlcy9HYW1lT3Zlci5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvcGxhdGZvcm1lci9zcmMvc3RhdGVzL0xldmVsMS5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvcGxhdGZvcm1lci9zcmMvc3RhdGVzL0xldmVsMi5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvcGxhdGZvcm1lci9zcmMvc3RhdGVzL1ByZWxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OzRCQ0VpQixrQkFBa0I7Ozs7K0JBQ2YscUJBQXFCOzs7OzRCQUN4QixrQkFBa0I7Ozs7OEJBQ2Ysb0JBQW9COzs7OzhCQUNyQixvQkFBb0I7Ozs7Z0NBQ2xCLHNCQUFzQjs7OztBQVAzQyxJQUFJLElBQUksQ0FBQzs7QUFVVCxNQUFNLENBQUMsTUFBTSxHQUFHLFlBQVk7QUFDMUIsTUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdkQsTUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSw0QkFBTyxDQUFDO0FBQzdCLE1BQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsK0JBQVUsQ0FBQztBQUNuQyxNQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLDRCQUFPLENBQUM7QUFDN0IsTUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSw4QkFBUyxDQUFDO0FBQ2pDLE1BQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsOEJBQVMsQ0FBQztBQUNqQyxNQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLGdDQUFXLENBQUM7QUFDckMsTUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDMUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNuQm1CLEtBQUs7QUFFYixXQUZRLEtBQUssQ0FFWixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUU7MEJBRmIsS0FBSzs7QUFHeEIsK0JBSG1CLEtBQUssNkNBR2xCLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7OztBQUc5QixRQUFJ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LEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFbkQsTUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RELE1BQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0FBQ3BDLE1BQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDbEMsTUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLE1BQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QixNQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0FBQzNELE1BQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVFLE1BQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUU1QyxNQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUV0QyxNQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FDcEMsRUFBRSxDQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDL0Ms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OztTQWpEa0IsT0FBTzs7O3FCQUFQLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGdhbWU7XHJcblxyXG5pbXBvcnQgQm9vdCBmcm9tIFwiLi9zdGF0ZXMvQm9vdC5qc1wiO1xyXG5pbXBvcnQgUHJlbG9hZCBmcm9tIFwiLi9zdGF0ZXMvUHJlbG9hZC5qc1wiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9zdGF0ZXMvR2FtZS5qc1wiO1xyXG5pbXBvcnQgTGV2ZWwxIGZyb20gIFwiLi9zdGF0ZXMvTGV2ZWwxLmpzXCI7XHJcbmltcG9ydCBMZXZlbDIgZnJvbSBcIi4vc3RhdGVzL0xldmVsMi5qc1wiO1xyXG5pbXBvcnQgR2FtZU92ZXIgZnJvbSBcIi4vc3RhdGVzL0dhbWVPdmVyLmpzXCI7XHJcblxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDEwMjQsIDc2OCwgUGhhc2VyLkFVVE8sICdnYW1lJyk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcclxuICBnYW1lLnN0YXRlLmFkZCgncHJlbG9hZCcsIFByZWxvYWQpO1xyXG4gIGdhbWUuc3RhdGUuYWRkKCdnYW1lJywgR2FtZSk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ0xldmVsMScsIExldmVsMSk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ0xldmVsMicsIExldmVsMik7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoXCJHYW1lT3ZlclwiLCBHYW1lT3Zlcik7XHJcbiAgZ2FtZS5zdGF0ZS5zdGFydCgnYm9vdCcpO1xyXG59OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdXNlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XHJcblxyXG5cdFx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgcGxheWVyKSB7IFxyXG5cdFx0c3VwZXIoZ2FtZSwgeCwgeSwgJ21vdXNlJywgMCk7XHJcblxyXG5cdFx0Ly9nYW1lIG9iamVjdCBsZXZlbCB2YXJpYWJsZXNcclxuXHRcdHRoaXMuc3BlZWQgPSAyMDA7XHJcblx0XHR0aGlzLmp1bXBQb3dlciA9IDYwMDtcclxuXHRcdHRoaXMuc3RlcExpbWl0ID0gOTA7XHJcblx0XHR0aGlzLmZhY2luZyA9IDA7XHJcblx0XHR0aGlzLmN1cnJlbnRTdGVwID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5zdGVwTGltaXQpO1xyXG5cdFx0dGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcblxyXG5cdFx0Ly9hbmltYXRpb25zXHJcblx0XHR0aGlzLmFuaW1hdGlvbnMuYWRkKFwic3RhbmRcIiwgWzBdKTtcclxuXHRcdHRoaXMuc3dpbmdBbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWRkKFwic3dpbmdcIiwgWzAsMSwyLDMsNCw1LDYsN10pO1xyXG5cdFx0dGhpcy5hbmltYXRpb25zLmFkZChcInJ1blwiLCBbOCw5LDEwLDExLDEyLDEzLDE0XSk7XHJcblxyXG5cdFx0dGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcblx0XHR0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcclxuXHRcdHRoaXMuYm9keS5kcmFnID0geyB4OiA2MDAsIHk6IDAgfTtcclxuXHRcdHRoaXMuYm9keS5zZXRTaXplKDYwLCA4MCk7XHJcblx0XHR0aGlzLmFuY2hvci5zZXRUbyguNSwgMSk7XHJcblxyXG5cdFx0dGhpcy5hbmltYXRpb25zLnBsYXkoXCJydW5cIiwgOSwgdHJ1ZSk7XHJcblx0fVx0XHRcclxuXHJcblx0dXBkYXRlKCkge1xyXG5cclxuXHRcdHZhciBkaXN0ID0gUGhhc2VyLk1hdGguZGlzdGFuY2UodGhpcy54LCB0aGlzLnksIHRoaXMucGxheWVyLngsIHRoaXMucGxheWVyLnkpO1xyXG5cclxuXHRcdGlmKCBNYXRoLnJvdW5kKGRpc3QpIDwgMjEwICkge1xyXG5cdFx0XHR0aGlzLmFuaW1hdGlvbnMucGxheShcInN3aW5nXCIsIDkpO1xyXG5cclxuXHRcdFx0aWYodGhpcy54IDwgdGhpcy5wbGF5ZXIueCkge1xyXG5cdFx0XHRcdHRoaXMuc2NhbGUueCA9IDE7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zY2FsZS54ID0gLTE7XHJcblx0XHRcdH1cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHRpZighdGhpcy5zd2luZ0FuaW1hdGlvbi5pc1BsYXlpbmcpIHtcclxuXHJcblx0XHRcdHRoaXMuY3VycmVudFN0ZXArKztcclxuXHRcdFx0dGhpcy5ib2R5LnZlbG9jaXR5LnggPSB0aGlzLnNwZWVkO1xyXG5cclxuXHRcdFx0dGhpcy5hbmltYXRpb25zLnBsYXkoXCJydW5cIiwgOSwgdHJ1ZSk7XHJcblxyXG5cdFx0XHR0aGlzLnNjYWxlLnggPSAodGhpcy5zcGVlZCA+IDApID8gMSA6IC0xO1xyXG5cclxuXHRcdFx0aWYodGhpcy5jdXJyZW50U3RlcCA+PSB0aGlzLnN0ZXBMaW1pdCkge1xyXG5cdFx0XHRcdHRoaXMuc3BlZWQgKj0gLTE7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50U3RlcCA9IDA7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVtYmVyQm94IGV4dGVuZHMgUGhhc2VyLkdyb3VwIHsgXHJcblxyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIGJnYXNzZXQsIHZhbCwgcGFyZW50KSB7ICBcclxuXHQgIFx0c3VwZXIoZ2FtZSwgcGFyZW50KTtcclxuXHJcblx0ICBcdC8vIGluaXRpYWxpemUgeW91ciBwcmVmYWIgaGVyZVxyXG5cdCAgXHR0aGlzLmNyZWF0ZSgwLDAsIGJnYXNzZXQpO1xyXG5cclxuXHRcdHZhciBzdHlsZSA9IHsgZm9udDogXCIzMHB4IEFyaWFsXCIsIGFsaWduOiBcImNlbnRlclwiLCBmaWxsOiBcIiNmZmZcIiB9O1xyXG5cdFx0dGhpcy50eHRWYWx1ZSA9IG5ldyBQaGFzZXIuVGV4dCh0aGlzLmdhbWUsIDU1LCA1NSwgdmFsLnRvU3RyaW5nKCksIHN0eWxlKTtcclxuXHRcdHRoaXMudHh0VmFsdWUuYW5jaG9yLnNldFRvKC41LCAuNSk7XHJcblx0XHR0aGlzLmFkZCh0aGlzLnR4dFZhbHVlKTtcclxuXHJcblx0fVxyXG5cclxuXHRzZXRWYWx1ZSh2YWwpIHtcclxuXHRcdHRoaXMudHh0VmFsdWUudGV4dCA9IHZhbC50b1N0cmluZygpO1xyXG5cdH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xyXG5cclxuXHRjb25zdHJ1Y3RvcihnYW1lLCB4LCB5KSB7IFxyXG5cdFx0c3VwZXIoZ2FtZSwgeCwgeSwgJ3BsYXllcicsIDApO1xyXG5cclxuXHRcdC8vZ2FtZSBvYmplY3QgbGV2ZWwgdmFyaWFibGVzXHJcblx0XHR0aGlzLnNwZWVkID0gNDAwO1xyXG5cdFx0dGhpcy5haXJTcGVlZCA9IDMwMDtcclxuXHRcdHRoaXMuanVtcFBvd2VyID0gNjAwO1xyXG5cdFx0dGhpcy5pbkFpciA9IHRydWU7XHJcblx0XHR0aGlzLmhpdEdyb3VuZCA9IGZhbHNlO1xyXG5cclxuXHRcdC8vYW5pbWF0aW9uc1xyXG5cdFx0dGhpcy5hbmltYXRpb25zLmFkZChcImlkbGVcIiwgWzAsMSwyLDMsNCwzLDIsMV0pO1xyXG5cdFx0dGhpcy5hbmltYXRpb25zLmFkZChcImp1bXBcIiwgWzAsNSw2LDcsOCw5XSk7XHJcblx0XHR0aGlzLmxhbmRBbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWRkKFwibGFuZFwiLCBbNyw2LDVdKTtcclxuXHRcdHRoaXMuYW5pbWF0aW9ucy5hZGQoXCJydW5cIiwgWzExLDEyLDEzLDE0LDE1LDE2LDE3XSk7XHJcblxyXG5cdFx0dGhpcy5nYW1lLnBoeXNpY3MuZW5hYmxlKHRoaXMsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcblx0XHR0aGlzLmJvZHkuY29sbGlkZVdvcmxkQm91bmRzID0gdHJ1ZTtcclxuXHRcdHRoaXMuYm9keS5kcmFnID0geyB4OiA2MDAsIHk6IDAgfTtcclxuXHRcdHRoaXMuYm9keS5zZXRTaXplKDYwLCAxMDApO1xyXG5cdFx0dGhpcy5hbmNob3Iuc2V0VG8oLjUsIDEpO1xyXG5cdFx0dGhpcy5jdXJzb3JzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuXHRcdHRoaXMuanVtcEJ1dHRvbiA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKTtcclxuXHRcdHRoaXMuanVtcEJ1dHRvbi5vbkRvd24uYWRkKHRoaXMuanVtcCwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5hbmltYXRpb25zLnBsYXkoXCJpZGxlXCIsIDksIHRydWUpO1xyXG5cclxuXHRcdHRoaXMuZmxhc2hFZmZlY3QgPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC50byggeyBhbHBoYTogMCB9LCA1MCwgUGhhc2VyLkVhc2luZy5Cb3VuY2UuT3V0KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQudG8oIHsgYWxwaGE6IC44IH0sIDUwLCBQaGFzZXIuRWFzaW5nLkJvdW5jZS5PdXQpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC50byggeyBhbHBoYTogMSB9LCAxNTAsIFBoYXNlci5FYXNpbmcuQ2lyY3VsYXIuT3V0KTtcclxuXHR9XHRcdFxyXG5cclxuXHRhbmltYXRpb25TdGF0ZSgpIHtcclxuXHJcblx0XHRpZih0aGlzLmhpdEdyb3VuZCkge1xyXG5cdFx0XHR0aGlzLmFuaW1hdGlvbnMucGxheShcImxhbmRcIiwgMTUpO1xyXG5cdFx0fSBlbHNlIGlmKCF0aGlzLmluQWlyICYmICF0aGlzLmxhbmRBbmltYXRpb24uaXNQbGF5aW5nKSB7XHJcblx0XHRcdGlmKE1hdGguYWJzKHRoaXMuYm9keS52ZWxvY2l0eS54KSA+IDQpIHtcclxuXHRcdFx0XHR0aGlzLmFuaW1hdGlvbnMucGxheShcInJ1blwiLCA5LCB0cnVlKTtcclxuXHRcdFx0fSBlbHNlIGlmKCB0aGlzLmJvZHkub25GbG9vcigpICkge1xyXG5cdFx0XHRcdHRoaXMuYW5pbWF0aW9ucy5wbGF5KFwiaWRsZVwiLCA5LCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0fVxyXG5cclxuXHR1cGRhdGUoKSB7XHJcblxyXG5cdFx0dGhpcy5oaXRHcm91bmQgPSBmYWxzZTtcclxuXHRcdHZhciB3YXNBaXIgPSB0aGlzLmluQWlyO1xyXG5cdFx0dGhpcy5pbkFpciA9ICF0aGlzLmJvZHkub25GbG9vcigpO1xyXG5cclxuXHRcdGlmKHRoaXMuaW5BaXIgIT0gd2FzQWlyICYmIHRoaXMuYm9keS52ZWxvY2l0eSA+IDApIHtcclxuXHRcdFx0dGhpcy5oaXRHcm91bmQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYW5pbWF0aW9uU3RhdGUoKTtcclxuXHJcblx0XHR0aGlzLnNwZWVkVG9Vc2UgPSB0aGlzLmluQWlyID8gdGhpcy5haXJTcGVlZCA6IHRoaXMuc3BlZWQ7XHJcblxyXG5cdFx0aWYodGhpcy5jdXJzb3JzLmxlZnQuaXNEb3duKSB7XHJcblx0XHRcdHRoaXMuc2NhbGUueCA9IC0xO1xyXG5cdFx0XHR0aGlzLmJvZHkudmVsb2NpdHkueCA9IC10aGlzLnNwZWVkVG9Vc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodGhpcy5jdXJzb3JzLnJpZ2h0LmlzRG93bikge1xyXG5cdFx0XHR0aGlzLnNjYWxlLnggPSAxO1xyXG5cdFx0XHR0aGlzLmJvZHkudmVsb2NpdHkueCA9IHRoaXMuc3BlZWRUb1VzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGp1bXAoKSB7XHJcblx0XHRpZih0aGlzLmJvZHkub25GbG9vcigpID09IHRydWUpIHtcclxuXHRcdFx0dGhpcy5ib2R5LnZlbG9jaXR5LnkgPSAtdGhpcy5qdW1wUG93ZXI7XHJcblx0XHRcdHRoaXMuYW5pbWF0aW9ucy5wbGF5KFwianVtcFwiLCAzMCk7XHJcblx0XHRcdHRoaXMuZG91YmxlSnVtcCA9IHRydWU7XHJcblx0XHR9IGVsc2UgaWYodGhpcy5kb3VibGVKdW1wID09IHRydWUpIHtcclxuXHRcdFx0Y29uc29sZS5sb2codGhpcy5kb3VibGVKdW1wKTtcclxuXHRcdFx0dGhpcy5kb3VibGVKdW1wID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuYm9keS52ZWxvY2l0eS55ID0gLXRoaXMuanVtcFBvd2VyO1xyXG5cdFx0XHR0aGlzLmFuaW1hdGlvbnMucGxheShcImp1bXBcIiwgMzApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Zmxhc2goKSB7XHJcblx0XHRpZighdGhpcy5mbGFzaEVmZmVjdC5pc1J1bm5pbmcpIHtcclxuXHRcdFx0dGhpcy5mbGFzaEVmZmVjdC5zdGFydCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCb290IHtcclxuXHJcbiAgcHJlbG9hZCgpIHtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgncHJlbG9hZGVyJywgJ2Fzc2V0cy9pbWFnZXMvbG9hZGluZ19iYXIucG5nJyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmdhbWUuaW5wdXQubWF4UG9pbnRlcnMgPSAxO1xyXG4gICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XHJcbiAgfVxyXG5cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmdhbWUuc2NvcmUgPSAwO1xyXG4gIFx0dGhpcy5nYW1lLnN0YXRlLnN0YXJ0KFwiTGV2ZWwxXCIpO1xyXG4gIH1cclxuXHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT3ZlciBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICBcdHRoaXMuYWRkLnNwcml0ZSggMCwwLCdnYW1lb3Zlcl9iZycpO1xyXG5cclxuICBcdHZhciBzdHlsZSA9IHsgZm9udDogXCIzMHB4IEFyaWFsXCIsIGFsaWduOiBcImNlbnRlclwiLCBmaWxsOiBcIiNmZmZcIiB9O1xyXG5cdHRoaXMudHh0VmFsdWUgPSB0aGlzLmFkZC50ZXh0KDUxMiwgNTM0LCB0aGlzLmdhbWUuc2NvcmUudG9TdHJpbmcoKSArIFwiIHBvaW50c1wiLCBzdHlsZSk7XHJcblx0dGhpcy50eHRWYWx1ZS5hbmNob3Iuc2V0VG8oLjUsIC41KTtcclxuIFx0dGhpcy5nYW1lLmlucHV0Lm9uRG93bi5hZGRPbmNlKHRoaXMuc3dpdGNoU3RhdGUsIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgc3dpdGNoU3RhdGUoKSB7XHJcbiAgXHR0aGlzLmdhbWUuc2NvcmUgPSAwO1xyXG4gIFx0dGhpcy5zdGF0ZS5zdGFydChcIkxldmVsMVwiKTtcclxuICB9XHJcblxyXG5cclxufSIsIi8vcmVxdWlyZSBvdGhlciBjb21wb25lbnRzXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL3ByZWZhYnMvUGxheWVyLmpzXCI7XHJcbmltcG9ydCBNb3VzZSBmcm9tIFwiLi4vcHJlZmFicy9Nb3VzZS5qc1wiO1xyXG5pbXBvcnQgTnVtYmVyQm94IGZyb20gXCIuLi9wcmVmYWJzL051bWJlckJveC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGV2ZWwxIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvL29iamVjdCBsZXZlbCBwcm9wZXJ0aWVzXHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG5cclxuICBcdC8vcGh5c2ljc1xyXG4gIFx0dGhpcy5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgXHR0aGlzLnBoeXNpY3MuYXJjYWRlLmdyYXZpdHkueSA9IDgwMDtcclxuXHJcbiAgICAvL21hcCBzdGFydFxyXG4gICAgdGhpcy5tYXAgPSB0aGlzLmFkZC50aWxlbWFwKFwibGV2ZWwxXCIpO1xyXG5cclxuICAgIC8vcGFyYWxsYXggYmFja2dyb3VuZFxyXG4gICAgdGhpcy5tYXAuYWRkVGlsZXNldEltYWdlKCdnYW1lYmcnKTtcclxuICAgIHRoaXMuYmcgPSB0aGlzLm1hcC5jcmVhdGVMYXllcignYmcnKTtcclxuICAgIHRoaXMuYmcuc2Nyb2xsRmFjdG9yWCA9IC42O1xyXG4gICAgdGhpcy5iZy5zY3JvbGxGYWN0b3JZID0gLjY7XHJcblxyXG4gICAgLy93YWxrYWJsZSB0aWxlc1xyXG4gICAgdGhpcy5tYXAuYWRkVGlsZXNldEltYWdlKCdUaWxlcycpO1xyXG4gICAgdGhpcy5sYXllciA9IHRoaXMubWFwLmNyZWF0ZUxheWVyKCdMZXZlbCcpO1xyXG5cclxuICAgIC8vY29sbGlzaW9uXHJcbiAgICB0aGlzLmxheWVyLnJlc2l6ZVdvcmxkKCk7XHJcbiAgICB0aGlzLm1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDYsMjUsdHJ1ZSx0aGlzLmxheWVyKTtcclxuXHJcbiAgXHQvL2NvaW4gbGF5ZXJcclxuICAgIHRoaXMuY29pbnMgPSB0aGlzLmFkZC5ncm91cCgpO1xyXG4gICAgdGhpcy5jb2lucy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XHJcbiAgICB0aGlzLmNvaW5zLmVuYWJsZUJvZHkgPSB0cnVlO1xyXG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoXCJDb2xsZWN0YWJsZXNcIiwgNDEsICdjb2luJywgbnVsbCwgdHJ1ZSwgZmFsc2UsIHRoaXMuY29pbnMpO1xyXG4gICAgdGhpcy5jb2lucy5zZXRBbGwoXCJib2R5LmdyYXZpdHlcIiwgMCk7XHJcblxyXG4gICAgLy9wbGFjZSBkb29yc1xyXG4gICAgdGhpcy5kb29ycyA9IHRoaXMuYWRkLmdyb3VwKCk7XHJcbiAgICB0aGlzLmRvb3JzLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcclxuICAgIHRoaXMuZG9vcnMuZW5hYmxlQm9keSA9IHRydWU7XHJcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cyhcIkRvb3JzXCIsIDI0MiwgJ3NpZ24nLCBudWxsLCB0cnVlLCBmYWxzZSwgdGhpcy5kb29ycyk7XHJcbiAgICB0aGlzLmRvb3JzLnNldEFsbChcImJvZHkuZ3Jhdml0eVwiLCAwKTtcclxuXHJcbiAgICAvL3BsYXllclxyXG4gIFx0dGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoXCJQbGF5ZXJcIiwgMjQzLCBudWxsLCBudWxsLCB0cnVlLCBmYWxzZSwgdGhpcy53b3JsZCwgUGxheWVyKTtcclxuICAgIHRoaXMucGxheWVyID0gdGhpcy53b3JsZC5nZXRUb3AoKTtcclxuXHJcbiAgICAvL3BsYWNlIGVuZW1pZXNcclxuICAgIHRoaXMuZW5lbWllcyA9IHRoaXMuYWRkLmdyb3VwKCk7XHJcbiAgICB0aGlzLm1hcC5jcmVhdGVGcm9tT2JqZWN0cyhcIkVuZW1pZXNcIiwgMjUsIG51bGwsIG51bGwsIHRydWUsIGZhbHNlLCB0aGlzLmVuZW1pZXMsIE1vdXNlKTtcclxuICAgIHRoaXMuZW5lbWllcy5zZXRBbGwoXCJwbGF5ZXJcIiwgdGhpcy5wbGF5ZXIpO1xyXG5cclxuICBcdC8vVUlcclxuICBcdHRoaXMuVUlHcm91cCA9IHRoaXMuYWRkLmdyb3VwKCk7XHJcbiAgXHR0aGlzLnNjb3JlRmllbGQgPSBuZXcgTnVtYmVyQm94KHRoaXMuZ2FtZSwgXCJzY29yZWhvbGRlclwiLCB0aGlzLmdhbWUuc2NvcmUsIHRoaXMuVUlHcm91cCk7XHJcbiAgXHR0aGlzLnNjb3JlRmllbGQuZml4ZWRUb0NhbWVyYSA9IHRydWU7XHJcblxyXG4gICAgLy9zb3VuZFxyXG4gICAgdGhpcy5zZnggPSB0aGlzLmFkZC5hdWRpb1Nwcml0ZSgnc2Z4Jyk7XHJcblxyXG4gIFx0dGhpcy5jYW1lcmEuZm9sbG93KHRoaXMucGxheWVyKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICBcdHRoaXMucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5sYXllcik7XHJcbiAgXHR0aGlzLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5lbmVtaWVzLCB0aGlzLmxheWVyKTtcclxuICBcdHRoaXMucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5jb2lucywgdGhpcy5jb2xsZWN0Q29pbiwgbnVsbCwgdGhpcyk7XHJcbiAgICB0aGlzLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5wbGF5ZXIsIHRoaXMuZG9vcnMsIHRoaXMuaGl0RG9vciwgbnVsbCwgdGhpcyk7XHJcbiAgXHR0aGlzLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5wbGF5ZXIsIHRoaXMuZW5lbWllcywgdGhpcy5oaXRFbmVteSwgbnVsbCwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICBjb2xsZWN0Q29pbihwbGF5ZXJSZWYsIGNvaW5SZWYpIHtcclxuICBcdGNvaW5SZWYua2lsbCgpO1xyXG4gIFx0dGhpcy5nYW1lLnNjb3JlICsrO1xyXG4gIFx0dGhpcy5zY29yZUZpZWxkLnNldFZhbHVlKHRoaXMuZ2FtZS5zY29yZSk7XHJcbiAgICB0aGlzLnNmeC5wbGF5KFwiY29pblwiKTtcclxuICB9XHJcblxyXG4gIGhpdERvb3IocGxheWVyUmVmLCBkb29yUmVmKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhdGUuY2xlYXJDdXJyZW50U3RhdGUoKTtcclxuICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydChcIkxldmVsMlwiKTtcclxuICB9XHJcblxyXG4gIGhpdEVuZW15KHBsYXllclJlZiwgZW5lbXlSZWYpIHtcdFxyXG4gIFx0aWYoIXBsYXllclJlZi5mbGFzaEVmZmVjdC5pc1J1bm5pbmcpIHtcclxuICBcdFx0cGxheWVyUmVmLmZsYXNoKCk7XHJcbiAgICAgIHRoaXMuc2Z4LnBsYXkoXCJoaXRcIik7XHJcblx0ICBcdGlmKHRoaXMuZ2FtZS5zY29yZSA+IDApIHtcclxuXHQgIFx0XHR0aGlzLmdhbWUuc2NvcmUgLS07XHJcblx0ICBcdFx0dGhpcy5zY29yZUZpZWxkLnNldFZhbHVlKHRoaXMuZ2FtZS5zY29yZSk7XHJcblx0ICBcdH1cclxuICBcdH1cclxuICB9XHJcblxyXG59IiwiLy9yZXF1aXJlIG90aGVyIGNvbXBvbmVudHNcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi4vcHJlZmFicy9QbGF5ZXIuanNcIjtcclxuaW1wb3J0IE1vdXNlIGZyb20gXCIuLi9wcmVmYWJzL01vdXNlLmpzXCI7XHJcbmltcG9ydCBOdW1iZXJCb3ggZnJvbSBcIi4uL3ByZWZhYnMvTnVtYmVyQm94LmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMZXZlbDIgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vb2JqZWN0IGxldmVsIHByb3BlcnRpZXNcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcblxyXG4gIFx0Ly9waHlzaWNzXHJcbiAgXHR0aGlzLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICBcdHRoaXMucGh5c2ljcy5hcmNhZGUuZ3Jhdml0eS55ID0gODAwO1xyXG5cclxuICAgIC8vbWFwIHN0YXJ0XHJcbiAgICB0aGlzLm1hcCA9IHRoaXMuYWRkLnRpbGVtYXAoJ2xldmVsMicpO1xyXG5cclxuICAgIC8vcGFyYWxsYXggYmFja2dyb3VuZFxyXG4gICAgdGhpcy5tYXAuYWRkVGlsZXNldEltYWdlKCdnYW1lYmcnKTtcclxuICAgIHRoaXMuYmcgPSB0aGlzLm1hcC5jcmVhdGVMYXllcignYmcnKTtcclxuICAgIHRoaXMuYmcuc2Nyb2xsRmFjdG9yWCA9IC42O1xyXG4gICAgdGhpcy5iZy5zY3JvbGxGYWN0b3JZID0gLjY7XHJcblxyXG4gICAgLy93YWxrYWJsZSB0aWxlc1xyXG4gICAgdGhpcy5tYXAuYWRkVGlsZXNldEltYWdlKCdUaWxlcycpO1xyXG4gICAgdGhpcy5sYXllciA9IHRoaXMubWFwLmNyZWF0ZUxheWVyKCdMZXZlbCcpO1xyXG5cclxuICAgIC8vY29sbGlzaW9uXHJcbiAgICB0aGlzLmxheWVyLnJlc2l6ZVdvcmxkKCk7XHJcbiAgICB0aGlzLm1hcC5zZXRDb2xsaXNpb25CZXR3ZWVuKDYsMjUsdHJ1ZSx0aGlzLmxheWVyKTtcclxuXHJcbiAgICAvL2NvaW4gbGF5ZXJcclxuICAgIHRoaXMuY29pbnMgPSB0aGlzLmFkZC5ncm91cCgpO1xyXG4gICAgdGhpcy5jb2lucy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XHJcbiAgICB0aGlzLmNvaW5zLmVuYWJsZUJvZHkgPSB0cnVlO1xyXG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoXCJDb2xsZWN0YWJsZXNcIiwgMjQxLCAnY29pbicsIG51bGwsIHRydWUsIGZhbHNlLCB0aGlzLmNvaW5zKTtcclxuICAgIHRoaXMuY29pbnMuc2V0QWxsKFwiYm9keS5ncmF2aXR5XCIsIDApO1xyXG5cclxuICAgIC8vcGxhY2UgZG9vcnNcclxuICAgIHRoaXMuZG9vcnMgPSB0aGlzLmFkZC5ncm91cCgpO1xyXG4gICAgdGhpcy5kb29ycy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5BUkNBREU7XHJcbiAgICB0aGlzLmRvb3JzLmVuYWJsZUJvZHkgPSB0cnVlO1xyXG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoXCJEb29yc1wiLCAyNDIsICdzaWduJywgbnVsbCwgdHJ1ZSwgZmFsc2UsIHRoaXMuZG9vcnMpO1xyXG4gICAgdGhpcy5kb29ycy5zZXRBbGwoXCJib2R5LmdyYXZpdHlcIiwgMCk7XHJcblxyXG4gICAgLy9wbGF5ZXJcclxuICAgIHRoaXMubWFwLmNyZWF0ZUZyb21PYmplY3RzKFwiUGxheWVyXCIsIDI0MywgbnVsbCwgbnVsbCwgdHJ1ZSwgZmFsc2UsIHRoaXMud29ybGQsIFBsYXllcik7XHJcbiAgICB0aGlzLnBsYXllciA9IHRoaXMud29ybGQuZ2V0VG9wKCk7XHJcblxyXG4gICAgLy9wbGFjZSBlbmVtaWVzXHJcbiAgICB0aGlzLmVuZW1pZXMgPSB0aGlzLmFkZC5ncm91cCgpO1xyXG4gICAgdGhpcy5tYXAuY3JlYXRlRnJvbU9iamVjdHMoXCJFbmVtaWVzXCIsIDIyNSwgbnVsbCwgbnVsbCwgdHJ1ZSwgZmFsc2UsIHRoaXMuZW5lbWllcywgTW91c2UpO1xyXG4gICAgdGhpcy5lbmVtaWVzLnNldEFsbChcInBsYXllclwiLCB0aGlzLnBsYXllcik7XHJcblxyXG4gIFx0Ly9VSVxyXG4gIFx0dGhpcy5VSUdyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcclxuICBcdHRoaXMuc2NvcmVGaWVsZCA9IG5ldyBOdW1iZXJCb3godGhpcy5nYW1lLCBcInNjb3JlaG9sZGVyXCIsIHRoaXMuZ2FtZS5zY29yZSwgdGhpcy5VSUdyb3VwKTtcclxuICBcdHRoaXMuc2NvcmVGaWVsZC5maXhlZFRvQ2FtZXJhID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnNmeCA9IHRoaXMuYWRkLmF1ZGlvU3ByaXRlKCdzZngnKTtcclxuXHJcbiAgXHR0aGlzLmNhbWVyYS5mb2xsb3codGhpcy5wbGF5ZXIpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gIFx0dGhpcy5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyLCB0aGlzLmxheWVyKTtcclxuICBcdHRoaXMucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLmVuZW1pZXMsIHRoaXMubGF5ZXIpO1xyXG4gICAgdGhpcy5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLmRvb3JzLCB0aGlzLmhpdERvb3IsIG51bGwsIHRoaXMpO1xyXG4gIFx0dGhpcy5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLmNvaW5zLCB0aGlzLmNvbGxlY3RDb2luLCBudWxsLCB0aGlzKTtcclxuICBcdHRoaXMucGh5c2ljcy5hcmNhZGUuY29sbGlkZSh0aGlzLnBsYXllciwgdGhpcy5lbmVtaWVzLCB0aGlzLmhpdEVuZW15LCBudWxsLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIGNvbGxlY3RDb2luKHBsYXllclJlZiwgY29pblJlZikge1xyXG4gIFx0Y29pblJlZi5raWxsKCk7XHJcbiAgXHR0aGlzLmdhbWUuc2NvcmUgKys7XHJcbiAgXHR0aGlzLnNjb3JlRmllbGQuc2V0VmFsdWUodGhpcy5nYW1lLnNjb3JlKTtcclxuICAgIHRoaXMuc2Z4LnBsYXkoXCJjb2luXCIpO1xyXG4gIH1cclxuXHJcbiAgaGl0RG9vcihwbGF5ZXJSZWYsIGRvb3JSZWYpIHtcclxuICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydChcIkdhbWVPdmVyXCIpO1xyXG4gIH1cclxuXHJcbiAgaGl0RW5lbXkocGxheWVyUmVmLCBlbmVteVJlZikge1x0XHJcbiAgXHRpZighcGxheWVyUmVmLmZsYXNoRWZmZWN0LmlzUnVubmluZykge1xyXG4gIFx0XHRwbGF5ZXJSZWYuZmxhc2goKTtcclxuICAgICAgdGhpcy5zZngucGxheShcImhpdFwiKTtcclxuXHQgIFx0aWYodGhpcy5nYW1lLnNjb3JlID4gMCkge1xyXG5cdCAgXHRcdHRoaXMuZ2FtZS5zY29yZSAtLTtcclxuXHQgIFx0XHR0aGlzLnNjb3JlRmllbGQuc2V0VmFsdWUodGhpcy5nYW1lLnNjb3JlKTtcclxuXHQgIFx0fVxyXG4gIFx0fVxyXG4gIH1cclxuXHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmFzc2V0ID0gbnVsbDtcclxuICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2xvYWRpbmdfYmcnLCAnYXNzZXRzL2ltYWdlcy9sb2FkaW5nX2JnLmpwZycpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG5cclxuICAgIC8vYmFja2dyb3VuZCBmb3IgZ2FtZVxyXG4gICAgdGhpcy5hZGQuc3ByaXRlKDAsMCwgXCJsb2FkaW5nX2JnXCIpO1xyXG5cclxuICAgIHRoaXMuYXNzZXQgPSB0aGlzLmFkZC5zcHJpdGUodGhpcy5nYW1lLndpZHRoLzIsdGhpcy5nYW1lLmhlaWdodC8yLCAncHJlbG9hZGVyJyk7XHJcbiAgICB0aGlzLmFzc2V0LmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XHJcblxyXG4gICAgdGhpcy5sb2FkLm9uTG9hZENvbXBsZXRlLmFkZE9uY2UodGhpcy5vbkxvYWRDb21wbGV0ZSwgdGhpcyk7XHJcbiAgICB0aGlzLmxvYWQuc2V0UHJlbG9hZFNwcml0ZSh0aGlzLmFzc2V0KTtcclxuXHJcbiAgICAvL2RvIGFsbCB5b3VyIGxvYWRpbmcgaGVyZVxyXG4gICAgdGhpcy5sb2FkLnNwcml0ZXNoZWV0KCdwbGF5ZXInLCAnYXNzZXRzL2ltYWdlcy9zcHJpdGVzL0ZveFNwcml0ZS5wbmcnLCAyMTAsIDIxMCk7XHJcbiAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ21vdXNlJywgJ2Fzc2V0cy9pbWFnZXMvc3ByaXRlcy9Nb3VzZVNwcml0ZS5wbmcnLCAxNjUsIDE2MCk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2dhbWViZycsICdhc3NldHMvaW1hZ2VzL0JhY2tncm91bmQucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQudGlsZW1hcCgnbGV2ZWwxJywgJ2Fzc2V0cy9sZXZlbHMvbGV2ZWwxLmpzb24nLCBudWxsLCBQaGFzZXIuVGlsZW1hcC5USUxFRF9KU09OKTtcclxuICAgIHRoaXMubG9hZC50aWxlbWFwKCdsZXZlbDInLCAnYXNzZXRzL2xldmVscy9sZXZlbDIuanNvbicsIG51bGwsIFBoYXNlci5UaWxlbWFwLlRJTEVEX0pTT04pO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdUaWxlcycsICdhc3NldHMvaW1hZ2VzL1RpbGVzLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdjb2luJywgJ2Fzc2V0cy9pbWFnZXMvY29pbi5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnc2NvcmVob2xkZXInLCAnYXNzZXRzL2ltYWdlcy9zY29yZWhvbGRlci5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnc2lnbicsICdhc3NldHMvaW1hZ2VzL3NpZ24ucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2dhbWVvdmVyX2JnJywgJ2Fzc2V0cy9pbWFnZXMvZ2FtZW92ZXJfYmcucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuYXVkaW9zcHJpdGUoJ3NmeCcsIFsgJ2Fzc2V0cy9zb3VuZHMvc2Z4Lm1wMycsICdhc3NldHMvc291bmRzL3NmeC5vZ2cnIF0sIFwiYXNzZXRzL3NvdW5kcy9zZnguanNvblwiKVxyXG5cclxuICAgIC8vc3RhYWFhcnQgbG9hZFxyXG4gICAgdGhpcy5sb2FkLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcblxyXG4gICAgaWYodGhpcy5yZWFkeSkge1xyXG4gICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ2dhbWUnKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBvbkxvYWRDb21wbGV0ZSgpIHtcclxuICAgIHRoaXMucmVhZHkgPSB0cnVlO1xyXG4gIH1cclxuXHJcbn0iXX0=
