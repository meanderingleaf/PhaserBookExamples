(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _Boot = require("./states/Boot.js");

var _Boot2 = _interopRequireWildcard(_Boot);

var _Preload = require("./states/Preload.js");

var _Preload2 = _interopRequireWildcard(_Preload);

var _Game = require("./states/Game.js");

var _Game2 = _interopRequireWildcard(_Game);

var _StartScreen = require("./states/StartScreen.js");

var _StartScreen2 = _interopRequireWildcard(_StartScreen);

var _GameOver = require("./states/GameOver.js");

var _GameOver2 = _interopRequireWildcard(_GameOver);

var game;

window.onload = function () {
  game = new Phaser.Game(1024, 768, Phaser.AUTO, "game");
  game.state.add("boot", _Boot2["default"]);
  game.state.add("preload", _Preload2["default"]);
  game.state.add("game", _Game2["default"]);
  game.state.add("gameOver", _GameOver2["default"]);
  game.state.add("startScreen", _StartScreen2["default"]);
  game.state.start("boot");
};

},{"./states/Boot.js":6,"./states/Game.js":7,"./states/GameOver.js":8,"./states/Preload.js":9,"./states/StartScreen.js":10}],2:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var Enemy = (function (_Phaser$Sprite) {
	function Enemy(game, x, y, bulletLayer, frame) {
		_classCallCheck(this, Enemy);

		_get(Object.getPrototypeOf(Enemy.prototype), "constructor", this).call(this, game, x, y, "enemy", frame);

		// initialize your prefab here
		this.game.physics.enable(this, Phaser.Physics.ARCADE);

		this.body.velocity.x = -175;
		this.bounceTick = Math.random() * 2;

		this.bulletLayer = bulletLayer;

		this.outOfBoundsKill = true;

		this.willFire = Phaser.Utils.chanceRoll(50);

		console.log(this.willFire);

		if (this.willFire) {
			this.fireTimer = this.game.time.create(false);
			this.fireTimer.add(3500, this.fireShot, this);
			this.fireTimer.start();
		}
	}

	_inherits(Enemy, _Phaser$Sprite);

	_createClass(Enemy, [{
		key: "fireShot",
		value: function fireShot() {
			var bullet = this.bulletLayer.create(this.x, this.y, "enemyBullet");
			this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
			bullet.outOfBoundsKill = true;
			bullet.checkWorldBounds = true;
			bullet.body.velocity.x = -250;
		}
	}, {
		key: "update",
		value: function update() {
			this.bounceTick += 0.02;
			this.y += Math.sin(this.bounceTick) * 1;
		}
	}]);

	return Enemy;
})(Phaser.Sprite);

exports["default"] = Enemy;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var HealthBar = (function (_Phaser$Group) {
	function HealthBar(game, xpos, ypos, barGraphic, holderGraphic) {
		_classCallCheck(this, HealthBar);

		_get(Object.getPrototypeOf(HealthBar.prototype), "constructor", this).call(this, game);

		this.x = xpos;
		this.y = ypos;

		this.bar = this.create(0, 0, barGraphic);
		this.holder = this.create(0, 0, holderGraphic);
	}

	_inherits(HealthBar, _Phaser$Group);

	_createClass(HealthBar, [{
		key: "setValue",
		value: function setValue(val) {
			if (this.tween) this.tween.stop();
			this.tween = this.game.add.tween(this.bar.scale);
			this.tween.to({ x: val }, 350);
			this.tween.start();
		}
	}]);

	return HealthBar;
})(Phaser.Group);

exports["default"] = HealthBar;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

},{}],5:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
	value: true
});

var Player = (function (_Phaser$Sprite) {
	function Player(game, x, y, bullets) {
		_classCallCheck(this, Player);

		_get(Object.getPrototypeOf(Player.prototype), "constructor", this).call(this, game, x, y, "player", 0);

		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.drag.x = 35;
		this.body.drag.y = 35;
		this.body.collideWorldBounds = true;

		// initialize your prefab here
		this.speed = 100;
		this.bulletGate = 0;
		this.bullets = bullets;
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this.health = { current: 10, max: 10 };
		this.fireposition = { x: 160, y: 100 };

		this.animations.add("fly", [0, 0, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10]);
		this.fireAnimation = this.animations.add("fire", [11, 12, 13]);
		this.fireAnimation.onComplete.add(this.playFly, this);
		this.animations.play("fly", 14, true);
	}

	_inherits(Player, _Phaser$Sprite);

	_createClass(Player, [{
		key: "update",
		value: function update() {

			// write your prefab's specific update code here
			if (this.cursors.left.isDown) {
				this.body.velocity.x = -this.speed;
			}

			if (this.cursors.right.isDown) {
				this.body.velocity.x = this.speed;
			}

			if (this.cursors.up.isDown) {
				this.body.velocity.y = -this.speed;
			}

			if (this.cursors.down.isDown) {
				this.body.velocity.y = this.speed;
			}

			if (this.fireButton.isDown) {
				this.fire();
			}
		}
	}, {
		key: "fire",
		value: function fire() {

			if (this.game.time.now > this.bulletGate) {

				var bullet = this.bullets.getFirstDead();
				if (bullet) {
					bullet.x = this.x + this.fireposition.x;
					bullet.y = this.y + this.fireposition.y;
					bullet.revive();
				} else {
					bullet = this.bullets.create(this.x + this.fireposition.x, this.y + this.fireposition.y, "bullet");
					this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
					bullet.outOfBoundsKill = true;
					bullet.checkWorldBounds = true;
					bullet.body.velocity.x = 250;
				}

				this.animations.play("fire");

				this.bulletGate = this.game.time.now + 500;
			}
		}
	}, {
		key: "damage",
		value: function damage(amt) {
			this.health.current -= amt;
		}
	}, {
		key: "playFly",
		value: function playFly() {
			this.animations.play("fly", 14, true);
		}
	}]);

	return Player;
})(Phaser.Sprite);

exports["default"] = Player;
module.exports = exports["default"];

},{}],6:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

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

},{}],7:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
//require our other computers

var _Player = require("../prefabs/Player.js");

var _Player2 = _interopRequireWildcard(_Player);

var _Enemy = require("../prefabs/Enemy.js");

var _Enemy2 = _interopRequireWildcard(_Enemy);

var _NumberBox = require("../prefabs/NumberBox.js");

var _NumberBox2 = _interopRequireWildcard(_NumberBox);

var _HealthBar = require("../prefabs/HealthBar.js");

var _HealthBar2 = _interopRequireWildcard(_HealthBar);

var Game = (function (_Phaser$State) {
  function Game() {
    _classCallCheck(this, Game);

    //object level properties
    _get(Object.getPrototypeOf(Game.prototype), "constructor", this).call(this);
  }

  _inherits(Game, _Phaser$State);

  _createClass(Game, [{
    key: "create",
    value: function create() {

      this.spawnChance = 0.02;
      this.score = 0;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.bg = this.add.tileSprite(0, 0, 1024, 768, "bg");

      this.bullets = this.add.group();
      this.enemyBullets = this.add.group();

      //add player
      this.player = new _Player2["default"](this.game, 0, 0, this.bullets);
      this.game.add.existing(this.player);

      //add a few enemeis..
      this.enemies = this.add.group();
      for (var i = 0; i < 5; i++) {
        var enemy = new _Enemy2["default"](this.game, this.game.width + 100 + Math.random() * 400, Math.random() * this.game.height, this.enemyBullets);
        this.enemies.add(enemy);
      }

      //add the explosions
      this.explosions = this.game.add.emitter(0, 0, 200);
      this.explosions.makeParticles("hexagon");
      this.explosions.setAlpha(1, 0.2, 2000);

      //add UI
      this.setupUI();

      //wave timer
      this.waveTimer = this.game.time.create(false);
      this.waveTimer.loop(20000, this.incrementWave, this);
      this.waveTimer.start();
    }
  }, {
    key: "setupUI",
    value: function setupUI() {
      this.UILayer = this.add.group();

      this.scoreField = new _NumberBox2["default"](this.game, "circle", 0);
      this.UILayer.add(this.scoreField);

      this.healthBar = new _HealthBar2["default"](this.game, 120, 40, "health_bar", "health_holder");
      this.UILayer.add(this.healthBar);
    }
  }, {
    key: "update",
    value: function update() {
      this.bg.tilePosition.x -= 0.5;

      if (Math.random() < this.spawnChance) {
        var enemy = new _Enemy2["default"](this.game, this.game.width + 100 + Math.random() * 400, Math.random() * this.game.height, this.enemyBullets);
        this.enemies.add(enemy);
      }

      this.physics.arcade.overlap(this.enemies, this.bullets, this.damageEnemy, null, this);
      this.physics.arcade.overlap(this.player, this.enemies, this.damagePlayer, null, this);
      this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
    }
  }, {
    key: "incrementWave",
    value: function incrementWave() {
      this.spawnChance *= 1.2;
    }
  }, {
    key: "damagePlayer",
    value: function damagePlayer(playerRef, enemyRef) {
      this.player.damage(1);
      this.healthBar.setValue(this.player.health.current / this.player.health.max);
      enemyRef.kill();

      if (this.player.health.current <= 0) {
        this.game.state.start("gameOver");
      }
    }
  }, {
    key: "damageEnemy",
    value: function damageEnemy(enemy, bullet) {

      this.explosions.x = enemy.x;
      this.explosions.y = enemy.y;

      this.explosions.explode(2000, 4);

      enemy.kill();
      bullet.kill();

      this.score++;
      this.scoreField.setValue(this.score);
    }
  }]);

  return Game;
})(Phaser.State);

exports["default"] = Game;
module.exports = exports["default"];

},{"../prefabs/Enemy.js":2,"../prefabs/HealthBar.js":3,"../prefabs/NumberBox.js":4,"../prefabs/Player.js":5}],8:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var GameOver = (function () {
  function GameOver() {
    _classCallCheck(this, GameOver);
  }

  _createClass(GameOver, [{
    key: 'create',
    value: function create() {}
  }, {
    key: 'update',
    value: function update() {

      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.game.state.start('game');
      }
    }
  }]);

  return GameOver;
})();

exports['default'] = GameOver;
module.exports = exports['default'];

},{}],9:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

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
      //this.load.image('player', 'assets/images/player.png'); //width and height of sprite
      this.load.image('enemy', 'assets/images/enemy.png');
      this.load.image('explosion', 'assets/images/explosion.png');

      this.load.spritesheet('player', 'assets/images/gunbot.png', 214, 269); //width and height of sprite
      this.load.image('hexagon', 'assets/images/hexagon_particle.png');
      this.load.image('bullet', 'assets/images/bullet.png');
      this.load.image('enemyBullet', 'assets/images/enemyBullet.png');
      this.load.image('bg', 'assets/images/bg.jpg');

      this.load.image('health_bar', 'assets/images/health_bar.png');
      this.load.image('health_holder', 'assets/images/health_holder.png');
      this.load.image('circle', 'assets/images/circle.png');

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

},{}],10:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var StartScreen = (function () {
  function StartScreen() {
    _classCallCheck(this, StartScreen);
  }

  _createClass(StartScreen, [{
    key: 'create',
    value: function create() {}
  }, {
    key: 'update',
    value: function update() {
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.game.state.start('game');
      }
    }
  }]);

  return StartScreen;
})();

exports['default'] = StartScreen;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcZ3J1bnQtYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL3NobXVwL3NyYy9hcHAuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL3NobXVwL3NyYy9wcmVmYWJzL0VuZW15LmpzIiwiQzovVXNlcnMvVHJhdmlzL0Rlc2t0b3AvSFRNTDUgR2FtZXMgQm9vay9leGFtcGxlcy9zaG11cC9zcmMvcHJlZmFicy9IZWFsdGhCYXIuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL3NobXVwL3NyYy9wcmVmYWJzL051bWJlckJveC5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvc2htdXAvc3JjL3ByZWZhYnMvUGxheWVyLmpzIiwiQzovVXNlcnMvVHJhdmlzL0Rlc2t0b3AvSFRNTDUgR2FtZXMgQm9vay9leGFtcGxlcy9zaG11cC9zcmMvc3RhdGVzL0Jvb3QuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL3NobXVwL3NyYy9zdGF0ZXMvR2FtZS5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvc2htdXAvc3JjL3N0YXRlcy9HYW1lT3Zlci5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvc2htdXAvc3JjL3N0YXRlcy9QcmVsb2FkLmpzIiwiQzovVXNlcnMvVHJhdmlzL0Rlc2t0b3AvSFRNTDUgR2FtZXMgQm9vay9leGFtcGxlcy9zaG11cC9zcmMvc3RhdGVz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T0FDOUI7S0FDRDs7O1NBWGtCLFdBQVc7OztxQkFBWCxXQUFXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBnYW1lO1xyXG5cclxuaW1wb3J0IEJvb3QgZnJvbSBcIi4vc3RhdGVzL0Jvb3QuanNcIjtcclxuaW1wb3J0IFByZWxvYWQgZnJvbSBcIi4vc3RhdGVzL1ByZWxvYWQuanNcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vc3RhdGVzL0dhbWUuanNcIjtcclxuaW1wb3J0IFN0YXJ0U2NyZWVuIGZyb20gXCIuL3N0YXRlcy9TdGFydFNjcmVlbi5qc1wiO1xyXG5pbXBvcnQgR2FtZU92ZXIgZnJvbSBcIi4vc3RhdGVzL0dhbWVPdmVyLmpzXCI7XHJcblxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDEwMjQsIDc2OCwgUGhhc2VyLkFVVE8sICdnYW1lJyk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcclxuICBnYW1lLnN0YXRlLmFkZCgncHJlbG9hZCcsIFByZWxvYWQpO1xyXG4gIGdhbWUuc3RhdGUuYWRkKCdnYW1lJywgR2FtZSk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ2dhbWVPdmVyJywgR2FtZU92ZXIpO1xyXG4gIGdhbWUuc3RhdGUuYWRkKCdzdGFydFNjcmVlbicsIFN0YXJ0U2NyZWVuKTtcclxuICBnYW1lLnN0YXRlLnN0YXJ0KCdib290Jyk7XHJcbn07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZW15IGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGJ1bGxldExheWVyLCBmcmFtZSkgeyAgXHJcblx0ICBzdXBlcihnYW1lLCB4LCB5LCAnZW5lbXknLCBmcmFtZSk7XHJcblxyXG5cdCAgLy8gaW5pdGlhbGl6ZSB5b3VyIHByZWZhYiBoZXJlXHJcblx0ICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuXHJcblx0ICB0aGlzLmJvZHkudmVsb2NpdHkueCA9IC0xNzU7XHJcblx0ICB0aGlzLmJvdW5jZVRpY2sgPSBNYXRoLnJhbmRvbSgpICogMjtcclxuXHJcblx0ICB0aGlzLmJ1bGxldExheWVyID0gYnVsbGV0TGF5ZXI7XHJcblxyXG5cdCAgdGhpcy5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xyXG5cclxuXHQgIHRoaXMud2lsbEZpcmUgPSBQaGFzZXIuVXRpbHMuY2hhbmNlUm9sbCg1MCk7XHJcblx0ICBcclxuXHQgIGNvbnNvbGUubG9nKHRoaXMud2lsbEZpcmUpO1xyXG5cclxuXHQgIGlmKHRoaXMud2lsbEZpcmUpIHtcclxuXHQgIFx0dGhpcy5maXJlVGltZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoZmFsc2UpO1xyXG4gICAgICBcdHRoaXMuZmlyZVRpbWVyLmFkZCgzNTAwLCB0aGlzLmZpcmVTaG90LCB0aGlzKTtcclxuICAgICAgXHR0aGlzLmZpcmVUaW1lci5zdGFydCgpO1xyXG5cdCAgfVxyXG5cdH1cclxuXHJcblx0ZmlyZVNob3QoKSB7XHJcblx0XHR2YXIgYnVsbGV0ID0gdGhpcy5idWxsZXRMYXllci5jcmVhdGUodGhpcy54LCB0aGlzLnksIFwiZW5lbXlCdWxsZXRcIik7XHJcblx0XHR0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUoYnVsbGV0LCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG5cdFx0YnVsbGV0Lm91dE9mQm91bmRzS2lsbCA9IHRydWU7XHJcblx0ICAgIGJ1bGxldC5jaGVja1dvcmxkQm91bmRzID0gdHJ1ZTtcclxuXHRcdGJ1bGxldC5ib2R5LnZlbG9jaXR5LnggPSAtMjUwO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKCkge1xyXG5cdFx0dGhpcy5ib3VuY2VUaWNrICs9IC4wMjtcclxuXHQgIFx0dGhpcy55ICs9IE1hdGguc2luKHRoaXMuYm91bmNlVGljaykgKiAxO1xyXG5cdH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWx0aEJhciBleHRlbmRzIFBoYXNlci5Hcm91cCB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHhwb3MsIHlwb3MsIGJhckdyYXBoaWMsIGhvbGRlckdyYXBoaWMpIHtcclxuXHRcdHN1cGVyKGdhbWUpO1xyXG5cclxuXHRcdHRoaXMueCA9IHhwb3M7XHJcblx0XHR0aGlzLnkgPSB5cG9zO1xyXG5cclxuXHRcdHRoaXMuYmFyID0gdGhpcy5jcmVhdGUoMCwwLCBiYXJHcmFwaGljKTtcclxuXHRcdHRoaXMuaG9sZGVyID0gdGhpcy5jcmVhdGUoMCwwLCBob2xkZXJHcmFwaGljKTtcclxuXHR9XHJcblxyXG5cdHNldFZhbHVlKHZhbCkge1xyXG5cdFx0aWYodGhpcy50d2VlbikgdGhpcy50d2Vlbi5zdG9wKCk7XHJcblx0XHR0aGlzLnR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzLmJhci5zY2FsZSk7XHJcblx0XHR0aGlzLnR3ZWVuLnRvKHsgeDogdmFsIH0sIDM1MCk7XHJcblx0XHR0aGlzLnR3ZWVuLnN0YXJ0KCk7XHJcblx0fVxyXG5cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE51bWJlckJveCBleHRlbmRzIFBoYXNlci5Hcm91cCB7IFxyXG5cclxuXHRjb25zdHJ1Y3RvcihnYW1lLCBiZ2Fzc2V0LCB2YWwsIHBhcmVudCkgeyAgXHJcblx0ICBcdHN1cGVyKGdhbWUsIHBhcmVudCk7XHJcblxyXG5cdCAgXHQvLyBpbml0aWFsaXplIHlvdXIgcHJlZmFiIGhlcmVcclxuXHQgIFx0dGhpcy5jcmVhdGUoMCwwLCBiZ2Fzc2V0KTtcclxuXHJcblx0XHR2YXIgc3R5bGUgPSB7IGZvbnQ6IFwiMzBweCBBcmlhbFwiLCBhbGlnbjogXCJjZW50ZXJcIiwgZmlsbDogXCIjZmZmXCIgfTtcclxuXHRcdHRoaXMudHh0VmFsdWUgPSBuZXcgUGhhc2VyLlRleHQodGhpcy5nYW1lLCA1NSwgNTUsIHZhbC50b1N0cmluZygpLCBzdHlsZSk7XHJcblx0XHR0aGlzLnR4dFZhbHVlLmFuY2hvci5zZXRUbyguNSwgLjUpO1xyXG5cdFx0dGhpcy5hZGQodGhpcy50eHRWYWx1ZSk7XHJcblxyXG5cdH1cclxuXHJcblx0c2V0VmFsdWUodmFsKSB7XHJcblx0XHR0aGlzLnR4dFZhbHVlLnRleHQgPSB2YWwudG9TdHJpbmcoKTtcclxuXHR9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHsgXHJcblxyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGJ1bGxldHMpIHsgIFxyXG5cclxuXHQgIHN1cGVyKGdhbWUsIHgsIHksICdwbGF5ZXInLCAwKTtcclxuXHJcblx0ICB0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuXHQgIHRoaXMuYm9keS5kcmFnLnggPSAzNTtcclxuXHQgIHRoaXMuYm9keS5kcmFnLnkgPSAzNTtcclxuXHQgIHRoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSB0cnVlO1xyXG5cclxuXHQgIC8vIGluaXRpYWxpemUgeW91ciBwcmVmYWIgaGVyZVxyXG5cdCAgdGhpcy5zcGVlZCA9IDEwMDtcclxuXHQgIHRoaXMuYnVsbGV0R2F0ZSA9IDA7XHJcblx0ICB0aGlzLmJ1bGxldHMgPSBidWxsZXRzO1xyXG5cdCAgdGhpcy5jdXJzb3JzID0gdGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuXHQgIHRoaXMuZmlyZUJ1dHRvbiA9IHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5hZGRLZXkoUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKTtcclxuXHJcblxyXG5cdCAgdGhpcy5oZWFsdGggPSB7IGN1cnJlbnQ6IDEwLCBtYXg6IDEwIH07XHJcblx0ICB0aGlzLmZpcmVwb3NpdGlvbiA9IHsgeDogMTYwLCB5OiAxMDAgfTtcclxuXHJcblx0ICB0aGlzLmFuaW1hdGlvbnMuYWRkKFwiZmx5XCIsIFswLDAsMSwxLDIsMiwzLDQsNSw2LDcsOCw5LDEwLDEwXSk7XHJcblx0ICB0aGlzLmZpcmVBbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbnMuYWRkKFwiZmlyZVwiLCBbMTEsMTIsMTNdKTtcclxuXHQgIHRoaXMuZmlyZUFuaW1hdGlvbi5vbkNvbXBsZXRlLmFkZCh0aGlzLnBsYXlGbHksIHRoaXMpO1xyXG5cdCAgdGhpcy5hbmltYXRpb25zLnBsYXkoXCJmbHlcIiwgMTQsIHRydWUpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKCkge1xyXG5cclxuXHJcblx0ICBcdC8vIHdyaXRlIHlvdXIgcHJlZmFiJ3Mgc3BlY2lmaWMgdXBkYXRlIGNvZGUgaGVyZVxyXG5cdFx0aWYodGhpcy5jdXJzb3JzLmxlZnQuaXNEb3duKSB7XHJcblx0XHRcdHRoaXMuYm9keS52ZWxvY2l0eS54ID0gLXRoaXMuc3BlZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodGhpcy5jdXJzb3JzLnJpZ2h0LmlzRG93bikge1xyXG5cdFx0XHR0aGlzLmJvZHkudmVsb2NpdHkueCA9IHRoaXMuc3BlZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodGhpcy5jdXJzb3JzLnVwLmlzRG93bikge1xyXG5cdFx0XHR0aGlzLmJvZHkudmVsb2NpdHkueSA9IC10aGlzLnNwZWVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHRoaXMuY3Vyc29ycy5kb3duLmlzRG93bikge1xyXG5cdFx0XHR0aGlzLmJvZHkudmVsb2NpdHkueSA9IHRoaXMuc3BlZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodGhpcy5maXJlQnV0dG9uLmlzRG93bikge1xyXG5cdFx0XHR0aGlzLmZpcmUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZpcmUoKSB7XHJcblxyXG5cdFx0aWYodGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5idWxsZXRHYXRlKSB7XHJcblxyXG5cdFx0XHR2YXIgYnVsbGV0ID0gdGhpcy5idWxsZXRzLmdldEZpcnN0RGVhZCgpO1xyXG5cdFx0XHRpZihidWxsZXQpIHtcclxuXHRcdFx0XHRidWxsZXQueCA9IHRoaXMueCArIHRoaXMuZmlyZXBvc2l0aW9uLng7XHJcblx0XHRcdFx0YnVsbGV0LnkgPSB0aGlzLnkgKyB0aGlzLmZpcmVwb3NpdGlvbi55O1xyXG5cdFx0XHRcdGJ1bGxldC5yZXZpdmUoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRidWxsZXQgPSB0aGlzLmJ1bGxldHMuY3JlYXRlKHRoaXMueCArIHRoaXMuZmlyZXBvc2l0aW9uLngsIHRoaXMueSt0aGlzLmZpcmVwb3NpdGlvbi55LCBcImJ1bGxldFwiKTtcclxuXHRcdFx0XHR0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUoYnVsbGV0LCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG5cdFx0XHRcdGJ1bGxldC5vdXRPZkJvdW5kc0tpbGwgPSB0cnVlO1xyXG5cdCAgICBcdFx0YnVsbGV0LmNoZWNrV29ybGRCb3VuZHMgPSB0cnVlO1xyXG5cdFx0XHRcdGJ1bGxldC5ib2R5LnZlbG9jaXR5LnggPSAyNTA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuYW5pbWF0aW9ucy5wbGF5KFwiZmlyZVwiKTtcclxuXHJcblx0XHRcdHRoaXMuYnVsbGV0R2F0ZSA9IHRoaXMuZ2FtZS50aW1lLm5vdyArIDUwMDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGRhbWFnZShhbXQpIHtcclxuXHRcdHRoaXMuaGVhbHRoLmN1cnJlbnQgLT0gYW10O1xyXG5cdH1cclxuXHJcblx0cGxheUZseSgpIHtcclxuXHRcdHRoaXMuYW5pbWF0aW9ucy5wbGF5KFwiZmx5XCIsIDE0LCB0cnVlKTtcclxuXHR9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCb290IHtcclxuXHJcbiAgcHJlbG9hZCgpIHtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgncHJlbG9hZGVyJywgJ2Fzc2V0cy9pbWFnZXMvbG9hZGluZ19iYXIucG5nJyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmdhbWUuaW5wdXQubWF4UG9pbnRlcnMgPSAxO1xyXG4gICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XHJcbiAgfVxyXG5cclxufSIsIi8vcmVxdWlyZSBvdXIgb3RoZXIgY29tcHV0ZXJzXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL3ByZWZhYnMvUGxheWVyLmpzXCI7XHJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi4vcHJlZmFicy9FbmVteS5qc1wiO1xyXG5pbXBvcnQgTnVtYmVyQm94IGZyb20gXCIuLi9wcmVmYWJzL051bWJlckJveC5qc1wiO1xyXG5pbXBvcnQgSGVhbHRoQmFyIGZyb20gXCIuLi9wcmVmYWJzL0hlYWx0aEJhci5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy9vYmplY3QgbGV2ZWwgcHJvcGVydGllc1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcblxyXG4gICAgICB0aGlzLnNwYXduQ2hhbmNlID0gLjAyO1xyXG4gICAgICB0aGlzLnNjb3JlID0gMDtcclxuXHJcbiAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcblxyXG4gICAgICB0aGlzLmJnID0gdGhpcy5hZGQudGlsZVNwcml0ZSgwLCAwLCAxMDI0LCA3NjgsICdiZycpO1xyXG5cclxuICAgICAgdGhpcy5idWxsZXRzID0gdGhpcy5hZGQuZ3JvdXAoKTtcclxuICAgICAgdGhpcy5lbmVteUJ1bGxldHMgPSB0aGlzLmFkZC5ncm91cCgpO1xyXG5cclxuICAgICAgLy9hZGQgcGxheWVyXHJcbiAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzLmdhbWUsIDAsIDAsIHRoaXMuYnVsbGV0cyk7XHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy5wbGF5ZXIpO1xyXG4gICAgICBcclxuICAgICAgLy9hZGQgYSBmZXcgZW5lbWVpcy4uXHJcbiAgICAgIHRoaXMuZW5lbWllcyA9IHRoaXMuYWRkLmdyb3VwKCk7XHJcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgICB2YXIgZW5lbXkgPSBuZXcgRW5lbXkodGhpcy5nYW1lLCB0aGlzLmdhbWUud2lkdGggKyAxMDAgKyAoTWF0aC5yYW5kb20oKSAqIDQwMCksIE1hdGgucmFuZG9tKCkgKiB0aGlzLmdhbWUuaGVpZ2h0LCB0aGlzLmVuZW15QnVsbGV0cyk7XHJcbiAgICAgICAgdGhpcy5lbmVtaWVzLmFkZChlbmVteSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vYWRkIHRoZSBleHBsb3Npb25zXHJcbiAgICAgIHRoaXMuZXhwbG9zaW9ucyA9IHRoaXMuZ2FtZS5hZGQuZW1pdHRlcigwLDAsIDIwMCk7XHJcbiAgICAgIHRoaXMuZXhwbG9zaW9ucy5tYWtlUGFydGljbGVzKFwiaGV4YWdvblwiKTtcclxuICAgICAgdGhpcy5leHBsb3Npb25zLnNldEFscGhhKDEsIC4yLCAyMDAwKTtcclxuXHJcbiAgICAgIC8vYWRkIFVJXHJcbiAgICAgIHRoaXMuc2V0dXBVSSgpO1xyXG5cclxuICAgICAgLy93YXZlIHRpbWVyXHJcbiAgICAgIHRoaXMud2F2ZVRpbWVyID0gdGhpcy5nYW1lLnRpbWUuY3JlYXRlKGZhbHNlKTtcclxuICAgICAgdGhpcy53YXZlVGltZXIubG9vcCgyMDAwMCwgdGhpcy5pbmNyZW1lbnRXYXZlLCB0aGlzKTtcclxuICAgICAgdGhpcy53YXZlVGltZXIuc3RhcnQoKTtcclxuICB9XHJcbiAgXHJcbiAgc2V0dXBVSSgpIHtcclxuICAgIHRoaXMuVUlMYXllciA9IHRoaXMuYWRkLmdyb3VwKCk7XHJcblxyXG4gICAgdGhpcy5zY29yZUZpZWxkID0gbmV3IE51bWJlckJveCh0aGlzLmdhbWUsIFwiY2lyY2xlXCIsIDApO1xyXG4gICAgdGhpcy5VSUxheWVyLmFkZCh0aGlzLnNjb3JlRmllbGQpO1xyXG5cclxuICAgIHRoaXMuaGVhbHRoQmFyID0gbmV3IEhlYWx0aEJhcih0aGlzLmdhbWUsIDEyMCwgNDAsIFwiaGVhbHRoX2JhclwiLCBcImhlYWx0aF9ob2xkZXJcIik7XHJcbiAgICB0aGlzLlVJTGF5ZXIuYWRkKHRoaXMuaGVhbHRoQmFyKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIHRoaXMuYmcudGlsZVBvc2l0aW9uLnggLT0gLjU7XHJcblxyXG4gICAgaWYoTWF0aC5yYW5kb20oKSA8IHRoaXMuc3Bhd25DaGFuY2UpIHtcclxuICAgICAgdmFyIGVuZW15ID0gbmV3IEVuZW15KHRoaXMuZ2FtZSwgdGhpcy5nYW1lLndpZHRoICsgMTAwICsgKE1hdGgucmFuZG9tKCkgKiA0MDApLCBNYXRoLnJhbmRvbSgpICogdGhpcy5nYW1lLmhlaWdodCwgdGhpcy5lbmVteUJ1bGxldHMpO1xyXG4gICAgICB0aGlzLmVuZW1pZXMuYWRkKGVuZW15KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAodGhpcy5lbmVtaWVzLCB0aGlzLmJ1bGxldHMsIHRoaXMuZGFtYWdlRW5lbXksIG51bGwsIHRoaXMpO1xyXG4gICAgdGhpcy5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLmVuZW1pZXMsIHRoaXMuZGFtYWdlUGxheWVyLCBudWxsLCB0aGlzKTtcclxuICAgIHRoaXMucGh5c2ljcy5hcmNhZGUub3ZlcmxhcCh0aGlzLnBsYXllciwgdGhpcy5lbmVteUJ1bGxldHMsIHRoaXMuZGFtYWdlUGxheWVyLCBudWxsLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIGluY3JlbWVudFdhdmUoKSB7XHJcbiAgICB0aGlzLnNwYXduQ2hhbmNlICo9IDEuMjtcclxuICB9XHJcblxyXG4gIGRhbWFnZVBsYXllcihwbGF5ZXJSZWYsIGVuZW15UmVmKSB7XHJcbiAgICAgIHRoaXMucGxheWVyLmRhbWFnZSgxKTtcclxuICAgICAgdGhpcy5oZWFsdGhCYXIuc2V0VmFsdWUodGhpcy5wbGF5ZXIuaGVhbHRoLmN1cnJlbnQgLyB0aGlzLnBsYXllci5oZWFsdGgubWF4KTtcclxuICAgICAgZW5lbXlSZWYua2lsbCgpO1xyXG5cclxuICAgICAgaWYodGhpcy5wbGF5ZXIuaGVhbHRoLmN1cnJlbnQgPD0gMCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnZ2FtZU92ZXInKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgZGFtYWdlRW5lbXkoZW5lbXksIGJ1bGxldCkge1xyXG4gICAgICBcclxuICAgICAgdGhpcy5leHBsb3Npb25zLnggPSBlbmVteS54O1xyXG4gICAgICB0aGlzLmV4cGxvc2lvbnMueSA9IGVuZW15Lnk7XHJcblxyXG4gICAgICB0aGlzLmV4cGxvc2lvbnMuZXhwbG9kZSgyMDAwLCA0KTtcclxuXHJcbiAgICAgIGVuZW15LmtpbGwoKTtcclxuICAgICAgYnVsbGV0LmtpbGwoKTtcclxuXHJcbiAgICAgIHRoaXMuc2NvcmUrKztcclxuICAgICAgdGhpcy5zY29yZUZpZWxkLnNldFZhbHVlKHRoaXMuc2NvcmUpO1xyXG4gIH1cclxuICBcclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVPdmVyIHtcclxuXHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuXHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgXHRcclxuICBcdGlmKHRoaXMuZ2FtZS5pbnB1dC5rZXlib2FyZC5pc0Rvd24oUGhhc2VyLktleWJvYXJkLlNQQUNFQkFSKSkge1xyXG4gIFx0XHR0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ2dhbWUnKTtcclxuICBcdH1cclxuICB9XHJcblxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIFx0dGhpcy5hc3NldCA9IG51bGw7XHJcbiAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcmVsb2FkKCkge1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdsb2FkaW5nX2JnJywgJ2Fzc2V0cy9pbWFnZXMvbG9hZGluZ19iZy5qcGcnKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuXHJcbiAgICAvL2JhY2tncm91bmQgZm9yIGdhbWVcclxuICAgIHRoaXMuYWRkLnNwcml0ZSgwLDAsIFwibG9hZGluZ19iZ1wiKTtcclxuXHJcbiAgICB0aGlzLmFzc2V0ID0gdGhpcy5hZGQuc3ByaXRlKHRoaXMuZ2FtZS53aWR0aC8yLHRoaXMuZ2FtZS5oZWlnaHQvMiwgJ3ByZWxvYWRlcicpO1xyXG4gICAgdGhpcy5hc3NldC5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG5cclxuICAgIHRoaXMubG9hZC5vbkxvYWRDb21wbGV0ZS5hZGRPbmNlKHRoaXMub25Mb2FkQ29tcGxldGUsIHRoaXMpO1xyXG4gICAgdGhpcy5sb2FkLnNldFByZWxvYWRTcHJpdGUodGhpcy5hc3NldCk7XHJcblxyXG4gICAgLy9kbyBhbGwgeW91ciBsb2FkaW5nIGhlcmVcclxuICAgIC8vdGhpcy5sb2FkLmltYWdlKCdwbGF5ZXInLCAnYXNzZXRzL2ltYWdlcy9wbGF5ZXIucG5nJyk7IC8vd2lkdGggYW5kIGhlaWdodCBvZiBzcHJpdGVcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnZW5lbXknLCAnYXNzZXRzL2ltYWdlcy9lbmVteS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnZXhwbG9zaW9uJywgJ2Fzc2V0cy9pbWFnZXMvZXhwbG9zaW9uLnBuZycpO1xyXG5cclxuICAgIHRoaXMubG9hZC5zcHJpdGVzaGVldCgncGxheWVyJywgJ2Fzc2V0cy9pbWFnZXMvZ3VuYm90LnBuZycsIDIxNCwgMjY5KTsgLy93aWR0aCBhbmQgaGVpZ2h0IG9mIHNwcml0ZVxyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdoZXhhZ29uJywgJ2Fzc2V0cy9pbWFnZXMvaGV4YWdvbl9wYXJ0aWNsZS5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnYnVsbGV0JywgJ2Fzc2V0cy9pbWFnZXMvYnVsbGV0LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdlbmVteUJ1bGxldCcsICdhc3NldHMvaW1hZ2VzL2VuZW15QnVsbGV0LnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdiZycsICdhc3NldHMvaW1hZ2VzL2JnLmpwZycpO1xyXG5cclxuICAgIHRoaXMubG9hZC5pbWFnZSgnaGVhbHRoX2JhcicsICdhc3NldHMvaW1hZ2VzL2hlYWx0aF9iYXIucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2hlYWx0aF9ob2xkZXInLCAnYXNzZXRzL2ltYWdlcy9oZWFsdGhfaG9sZGVyLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdjaXJjbGUnLCAnYXNzZXRzL2ltYWdlcy9jaXJjbGUucG5nJyk7XHJcblxyXG4gICAgLy9zdGFhYWFydCBsb2FkXHJcbiAgICB0aGlzLmxvYWQuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuXHJcbiAgICBpZih0aGlzLnJlYWR5KSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnZ2FtZScpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIG9uTG9hZENvbXBsZXRlKCkge1xyXG4gICAgdGhpcy5yZWFkeSA9IHRydWU7XHJcbiAgfVxyXG5cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXJ0U2NyZWVuIHtcclxuXHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICBcdFxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gIFx0aWYodGhpcy5nYW1lLmlucHV0LmtleWJvYXJkLmlzRG93bihQaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpKSB7XHJcbiAgXHRcdHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnZ2FtZScpO1xyXG4gIFx0fVxyXG4gIH1cclxuXHJcbn0iXX0=
