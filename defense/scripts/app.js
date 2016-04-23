(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _statesBootJs = require("./states/Boot.js");

var _statesBootJs2 = _interopRequireDefault(_statesBootJs);

var _statesPreloadJs = require("./states/Preload.js");

var _statesPreloadJs2 = _interopRequireDefault(_statesPreloadJs);

var _statesGameJs = require("./states/Game.js");

var _statesGameJs2 = _interopRequireDefault(_statesGameJs);

var _statesMenuJs = require("./states/Menu.js");

var _statesMenuJs2 = _interopRequireDefault(_statesMenuJs);

var _statesGameOverJs = require("./states/GameOver.js");

var _statesGameOverJs2 = _interopRequireDefault(_statesGameOverJs);

var game;

window.onload = function () {
  game = new Phaser.Game(800, 450, Phaser.AUTO, "game");
  game.state.add("boot", _statesBootJs2["default"]);
  game.state.add("preload", _statesPreloadJs2["default"]);
  game.state.add("gameover", _statesGameOverJs2["default"]);
  game.state.add("menu", _statesMenuJs2["default"]);
  game.state.add("game", _statesGameJs2["default"]);
  game.state.start("boot");
};

},{"./states/Boot.js":6,"./states/Game.js":7,"./states/GameOver.js":8,"./states/Menu.js":9,"./states/Preload.js":10}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var SimplePool = (function (_Phaser$ArraySet) {
	function SimplePool(objectFactory) {
		_classCallCheck(this, SimplePool);

		_get(Object.getPrototypeOf(SimplePool.prototype), "constructor", this).call(this);
		this.makeObject = objectFactory;
	}

	_inherits(SimplePool, _Phaser$ArraySet);

	_createClass(SimplePool, [{
		key: "get",
		value: function get() {

			var obj = this.getFirstDead();
			if (obj) return obj;else return this.makeObject();
		}
	}, {
		key: "prewarm",
		value: function prewarm(amount) {
			for (var i = 0; i < amount; i++) {
				this.add(this.makeObject());
			}
		}
	}, {
		key: "getFirstDead",
		value: function getFirstDead() {

			for (var i = 0; i < this.list.length; i++) {
				if (this.list[i].poolDead) {
					return this.list[i];
				}
			}

			return null;
		}
	}]);

	return SimplePool;
})(Phaser.ArraySet);

exports["default"] = SimplePool;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Human = (function (_Phaser$Plugin$Isometric$IsoSprite) {
	function Human(game, x, y, enemies, arrows) {
		_classCallCheck(this, Human);

		_get(Object.getPrototypeOf(Human.prototype), 'constructor', this).call(this, game, x, y, 0, 'human', 0);

		// initialize your prefab here
		this.animations.add('idle', [10, 11]);
		this.animations.play('idle', 2, true);

		this.anchor.setTo(0.5, 0.5);
		this.enemies = enemies;
		this.arrows = arrows;

		this.shotInterval = 400;
		this.shotTime = this.game.time.now + this.shotInterval;
	}

	_inherits(Human, _Phaser$Plugin$Isometric$IsoSprite);

	_createClass(Human, [{
		key: 'update',
		value: function update() {

			if (this.game.time.now > this.shotTime) {

				this.target = this.enemies.findNearest(this.x, this.y);

				if (this.target) {
					var arrow = this.arrows.getFirstDead();
					if (!arrow) arrow = this.arrows.create(0, 0, 'arrow');
					arrow.revive();
					arrow.x = this.x;
					arrow.y = this.y;
					arrow.lifespan = 4000;

					arrow.rotation = this.game.physics.arcade.moveToObject(arrow, this.target, 120);

					this.shotTime = this.game.time.now + this.shotInterval;
				}
			}
		}
	}]);

	return Human;
})(Phaser.Plugin.Isometric.IsoSprite);

exports['default'] = Human;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Skeleton = (function (_Phaser$Plugin$Isometric$IsoSprite) {
	function Skeleton(game, x, y, frame) {
		_classCallCheck(this, Skeleton);

		_get(Object.getPrototypeOf(Skeleton.prototype), 'constructor', this).call(this, game, x, y, 0, 'skeleton', frame);

		// initialize your prefab here
		this.walkAnim = this.animations.add('walk', [10, 11]);
		this.animations.add('hurt', [12]);
		this.animations.add('attack', [13, 14, 13, 14, 14, 13, 14]);

		this.animations.play('walk', 2, true);

		this.anchor.setTo(0.5, 0.5);

		this.game.physics.enable(this, Phaser.Physics.ARCADE);

		this.path, this.pathPosition;

		this.health = 5;
		this.worth = 20;

		this.pathFinished = new Phaser.Signal();
	}

	_inherits(Skeleton, _Phaser$Plugin$Isometric$IsoSprite);

	_createClass(Skeleton, [{
		key: 'setPath',
		value: function setPath(path) {
			this.path = path;
			this.pathPosition = -1;
		}
	}, {
		key: 'advanceTile',
		value: function advanceTile() {

			this.pathPosition++;

			if (this.pathPosition < this.path.length) {
				//tween
				if (this.path[this.pathPosition].x > this.isoX) {
					this.scale.x = 1;
				} else {
					this.scale.x = -1;
				}

				this.walkMotion = this.game.add.tween(this).to({ isoX: this.path[this.pathPosition].x, isoY: this.path[this.pathPosition].y }, 2000, Phaser.Easing.Linear.None, true);
				this.walkMotion.onComplete.add(this.advanceTile, this);
			} else {
				this.animations.play('attack', 2);
				this.animations.currentAnim.onComplete.addOnce(this.attackOver, this);
			}
		}
	}, {
		key: 'attackOver',
		value: function attackOver() {
			this.pathFinished.dispatch(this);
		}
	}]);

	return Skeleton;
})(Phaser.Plugin.Isometric.IsoSprite);

exports['default'] = Skeleton;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

function Boot() {}

Boot.prototype = {
  preload: function preload() {
    this.load.image('preloader', 'assets/images/loading_bar.png');
  },
  create: function create() {
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _prefabsHumanJs = require("../prefabs/Human.js");

var _prefabsHumanJs2 = _interopRequireDefault(_prefabsHumanJs);

var _prefabsSkeletonJs = require("../prefabs/Skeleton.js");

var _prefabsSkeletonJs2 = _interopRequireDefault(_prefabsSkeletonJs);

var _prefabsNumberBoxJs = require("../prefabs/NumberBox.js");

var _prefabsNumberBoxJs2 = _interopRequireDefault(_prefabsNumberBoxJs);

var _componentsSimplePoolJs = require("../components/SimplePool.js");

var _componentsSimplePoolJs2 = _interopRequireDefault(_componentsSimplePoolJs);

var Game = (function () {
    function Game() {
        _classCallCheck(this, Game);

        this.spawnTime = 1000;
    }

    _createClass(Game, [{
        key: "create",
        value: function create() {

            this.mapData = this.game.cache.getJSON("mapdata");

            this.playerLife = 10;
            this.money = 100;

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.game.time.advancedTiming = true;

            this.game.add.sprite(0, 0, "gamebg");

            // Add and enable the plug-in.
            this.game.plugins.add(new Phaser.Plugin.Isometric(this.game));

            // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
            // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
            this.game.iso.anchor.setTo(0.5, 0.2);

            // Create a group for our tiles.
            this.isoGroup = this.game.add.group();
            this.isoChars = this.game.add.group();

            // Let's make a load of tiles on a grid.
            this.spawnTiles();

            this.allies = this.game.add.group(this.isoChars);
            this.enemies = this.game.add.group(this.isoChars);
            this.enemies.findNearest = this.findNearest;
            this.arrows = this.game.add.group();
            this.arrows.enableBody = true;
            this.arrows.physicsBodyType = Phaser.Physics.ARCADE;
            //this.arrows.createMultiple(30, "arrow");

            // Provide a 3D position for the cursor
            this.cursorPos = new Phaser.Plugin.Isometric.Point3();

            //setup the pathfinding
            this.easystar = new EasyStar.js();
            this.easystar.setGrid(this.mapData.tileMap);
            this.easystar.setAcceptableTiles([1]);

            this.boundFound = this.pathFound.bind(this);
            this.easystar.findPath(1, 0, 0, 4, this.boundFound);

            this.scoreBox = new _prefabsNumberBoxJs2["default"](this.game, "moneyholder", this.money);
            this.scoreBox.x = 10;
            this.scoreBox.y = 10;
            this.add.existing(this.scoreBox);

            this.healthBox = new _prefabsNumberBoxJs2["default"](this.game, "healthholder", this.playerLife);
            this.healthBox.x = 110;
            this.healthBox.y = 10;
            this.add.existing(this.healthBox);

            this.nextSpawn = this.game.time.now + this.spawnTime;
        }
    }, {
        key: "update",
        value: function update() {

            // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
            // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
            this.game.iso.unproject(this.game.input.activePointer.position, this.cursorPos);

            // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
            this.isoGroup.forEach(this.checkTiles, this, false);

            if (this.game.input.activePointer.isDown && this.selectedTile) {

                if (!this.selectedTile.occupant && this.selectedTile.buyable) {
                    if (this.money >= 100) {
                        var human = new _prefabsHumanJs2["default"](this.game, this.selectedTile.isoX, this.selectedTile.isoY, this.enemies, this.arrows);
                        this.allies.add(human);
                        this.selectedTile.occupant = human;
                        this.money -= 100;
                        this.scoreBox.setValue(this.money);
                    }
                }
            }

            this.game.physics.arcade.overlap(this.arrows, this.enemies, this.arrowHitEnemy, null, this);

            if (this.game.time.now > this.nextSpawn) {
                this.spawnEnemy();
                this.nextSpawn = this.game.time.now + this.spawnTime;
            }

            this.easystar.calculate();
            this.game.iso.simpleSort(this.enemies);
        }
    }, {
        key: "arrowHitEnemy",
        value: function arrowHitEnemy(arrow, enemy) {
            arrow.kill();
            enemy.damage(1);
            if (!enemy.alive) {
                this.money += enemy.worth;
                this.scoreBox.setValue(this.money);
            }
        }
    }, {
        key: "checkTiles",
        value: function checkTiles(tile) {
            var inBounds = tile.isoBounds.containsXY(this.cursorPos.x, this.cursorPos.y);
            // If it does, do a little animation and tint change.
            if (!tile.selected && inBounds) {
                tile.selected = true;
                tile.tint = 8830938;
                this.game.add.tween(tile).to({ isoZ: 4 }, 200, Phaser.Easing.Quadratic.InOut, true);

                this.selectedTile = tile;
            }
            // If not, revert back to how it was.
            else if (tile.selected && !inBounds) {
                tile.selected = false;
                tile.tint = 16777215;
                this.game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }
        }
    }, {
        key: "spawnTiles",
        value: function spawnTiles() {

            var size = 55;
            var map_width = this.mapData.tileMap[0].length - 1;
            var map_height = this.mapData.tileMap.length - 1;

            this.gameTiles = [];

            var i = 0,
                tile;
            var cc = 5;
            for (var y = 0; y <= map_height; y++) {
                this.gameTiles[y] = [];
                for (var x = 0; x <= map_width; x++) {

                    var tileNumber = this.mapData.tileMap[y][x];
                    var tileName = this.mapData.tileNames[tileNumber];

                    tile = this.game.add.isoSprite(x * size, y * size, 0, tileName, 0, this.isoGroup);
                    tile.anchor.set(0.5, 0);
                    tile.buyable = tileNumber == 0 ? true : false;

                    this.gameTiles[y][x] = tile;
                }
            }
        }
    }, {
        key: "pathFound",
        value: function pathFound(path) {
            if (path === null) {
                console.log("Path was not found.");
            } else {
                console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);

                this.convertedPath = [];
                var curPoint;
                for (var i = 0; i < path.length; i++) {
                    curPoint = this.gameTiles[path[i].y][path[i].x];
                    this.convertedPath.push({ x: curPoint.isoX, y: curPoint.isoY });
                }
            }
        }
    }, {
        key: "enemyAtGoal",
        value: function enemyAtGoal(enemy) {
            enemy.kill();
            this.playerLife--;
            this.healthBox.setValue(this.playerLife);

            if (this.playerLife <= 0) {
                this.gameOver();
            }
        }
    }, {
        key: "spawnEnemy",
        value: function spawnEnemy() {
            var skel = new _prefabsSkeletonJs2["default"](this.game, this.convertedPath[0].x, this.convertedPath[0].y);
            skel.setPath(this.convertedPath);
            skel.advanceTile();
            skel.pathFinished.addOnce(this.enemyAtGoal, this);
            this.enemies.add(skel);
        }
    }, {
        key: "gameOver",
        value: function gameOver() {
            this.game.state.start("gameover");
        }
    }, {
        key: "findNearest",
        value: function findNearest(xc, yc) {
            var lowestChild = null;
            var lowestDist = null;

            this.forEach(function (child) {

                var dist = Phaser.Math.distance(xc, yc, child.x, child.y);

                if (!lowestChild) {
                    lowestChild = child;
                } else {
                    if (dist < lowestDist) {
                        lowestChild = child;
                        lowestDist = dist;
                    }
                }
            }, this, true);

            return lowestChild;
        }
    }]);

    return Game;
})();

exports["default"] = Game;
module.exports = exports["default"];

},{"../components/SimplePool.js":2,"../prefabs/Human.js":3,"../prefabs/NumberBox.js":4,"../prefabs/Skeleton.js":5}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameOver = (function () {
  function GameOver() {
    _classCallCheck(this, GameOver);
  }

  _createClass(GameOver, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      this.game.add.sprite(0, 0, "gamebg");
      this.otr = this.game.add.sprite(this.game.width / 2, 200, "gameoverText");
      this.otr.anchor.setTo(0.5, 0.5);
      this.btnPlay = this.game.add.sprite(this.game.width / 2, 300, "btnAgain");
      this.btnPlay.anchor.setTo(0.5, 0.5);
      this.btnPlay.alpha = 0;

      this.game.add.tween(this.btnPlay).to({ alpha: 1 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

      this.game.input.onDown.addOnce(this.switchState, this);
    }
  }, {
    key: "switchState",
    value: function switchState() {
      this.game.state.start("game");
    }
  }]);

  return GameOver;
})();

exports["default"] = GameOver;
module.exports = exports["default"];

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = (function () {
  function Menu() {
    _classCallCheck(this, Menu);
  }

  _createClass(Menu, [{
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      this.game.add.sprite(0, 0, "gamebg");
      this.title = this.game.add.sprite(this.game.width / 2, 200, "title");
      this.title.anchor.setTo(0.5, 0.5);
      this.btnPlay = this.game.add.sprite(this.game.width / 2, 300, "btnBegin");
      this.btnPlay.anchor.setTo(0.5, 0.5);
      this.btnPlay.alpha = 0;

      this.game.add.tween(this.btnPlay).to({ alpha: 1 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

      this.game.input.onDown.addOnce(this.switchState, this);
    }
  }, {
    key: "switchState",
    value: function switchState() {
      this.game.state.start("game");
    }
  }]);

  return Menu;
})();

exports["default"] = Menu;
module.exports = exports["default"];

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Preload = (function () {
  function Preload() {
    _classCallCheck(this, Preload);

    this.preloadAsset = null;
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

      this.preloadAsset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
      this.preloadAsset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.preloadAsset);

      //do all your loading here
      this.load.pack('level1', 'assets/assetPack.json', null, this);

      //staaaart load
      this.load.start();
    }
  }, {
    key: 'update',
    value: function update() {

      if (this.ready) {
        this.game.state.start('menu');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcZ3J1bnQtYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL2RlZmVuc2Uvc3JjL2FwcC5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvZGVmZW5zZS9zcmMvY29tcG9uZW50cy9TaW1wbGVQb29sLmpzIiwiQzovVXNlcnMvVHJhdmlzL0Rlc2t0b3AvSFRNTDUgR2FtZXMgQm9vay9leGFtcGxlcy9kZWZlbnNlL3NyYy9wcmVmYWJzL0h1bWFuLmpzIiwiQzovVXNlcnMvVHJhdmlzL0Rlc2t0b3AvSFRNTDUgR2FtZXMgQm9vay9leGFtcGxlcy9kZWZlbnNlL3NyYy9wcmVmYWJzL051bWJlckJveC5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvZGVmZW5zZS9zcmMvcHJlZmFicy9Ta2VsZXRvbi5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvZGVmZW5zZS9zcmMvc3RhdGVzL0Jvb3QuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL2RlZmVuc2Uvc3JjL3N0YXRlcy9HYW1lLmpzIiwiQzovVXNlcnMvVHJhdmlzL0Rlc2t0b3AvSFRNTDUgR2FtZXMgQm9vay9leGFtcGxlcy9kZWZlbnNlL3NyYy9zdGF0ZXMvR2FtZU92ZXIuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL2RlZmVuc2Uvc3JjL3N0YXRlcy9NZW51LmpzIiwiQzovVXNlcnMvVHJhdmlzL0Rlc2t0b3AvSFRNTDUgR2FtZXMgQm9vay9leGFt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QUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDcEMsVUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxjQUFjLENBQUMsQ0FBQztBQUN0RSxVQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO0FBQzlCLFVBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsVUFBVSxDQUFDLENBQUM7QUFDdEUsVUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztBQUNsQyxVQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7O0FBRXZCLFVBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRTlHLFVBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN2RDs7O1dBRVUsdUJBQUc7QUFDYixVQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FD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SSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7QUFHOUQsVUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNuQjs7O1dBRUssa0JBQUc7O0FBRVAsVUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2IsWUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO09BQy9CO0tBRUY7OztXQUVhLDBCQUFHO0FBQ2YsVUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDbkI7OztTQXZDa0IsT0FBTzs7O3FCQUFQLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGdhbWU7XHJcblxyXG5pbXBvcnQgQm9vdCBmcm9tIFwiLi9zdGF0ZXMvQm9vdC5qc1wiO1xyXG5pbXBvcnQgUHJlbG9hZCBmcm9tIFwiLi9zdGF0ZXMvUHJlbG9hZC5qc1wiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9zdGF0ZXMvR2FtZS5qc1wiO1xyXG5pbXBvcnQgTWVudSBmcm9tIFwiLi9zdGF0ZXMvTWVudS5qc1wiO1xyXG5pbXBvcnQgR2FtZU92ZXIgZnJvbSBcIi4vc3RhdGVzL0dhbWVPdmVyLmpzXCI7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoODAwLCA0NTAsIFBoYXNlci5BVVRPLCAnZ2FtZScpO1xyXG4gIGdhbWUuc3RhdGUuYWRkKCdib290JywgQm9vdCk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcclxuICBnYW1lLnN0YXRlLmFkZCgnZ2FtZW92ZXInLCBHYW1lT3Zlcik7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ21lbnUnLCBNZW51KTtcclxuICBnYW1lLnN0YXRlLmFkZCgnZ2FtZScsIEdhbWUpO1xyXG4gIGdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTtcclxufTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGVQb29sIGV4dGVuZHMgUGhhc2VyLkFycmF5U2V0IHtcclxuXHJcblx0Y29uc3RydWN0b3Iob2JqZWN0RmFjdG9yeSkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMubWFrZU9iamVjdCA9IG9iamVjdEZhY3Rvcnk7XHJcblx0fVxyXG5cclxuXHRnZXQoKSB7XHJcblxyXG5cdFx0dmFyIG9iaiA9IHRoaXMuZ2V0Rmlyc3REZWFkKCk7XHJcblx0XHRpZihvYmopIHJldHVybiBvYmo7XHJcblx0XHRlbHNlIHJldHVybiB0aGlzLm1ha2VPYmplY3QoKTtcclxuXHR9XHJcblxyXG5cdHByZXdhcm0oYW1vdW50KSB7XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgYW1vdW50OyBpKyspIHtcclxuXHRcdFx0dGhpcy5hZGQoIHRoaXMubWFrZU9iamVjdCgpICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXRGaXJzdERlYWQoKSB7XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZih0aGlzLmxpc3RbaV0ucG9vbERlYWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5saXN0W2ldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEh1bWFuIGV4dGVuZHMgUGhhc2VyLlBsdWdpbi5Jc29tZXRyaWMuSXNvU3ByaXRlIHtcclxuXHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgZW5lbWllcywgYXJyb3dzKSB7ICBcclxuXHQgIFx0c3VwZXIoZ2FtZSwgeCwgeSwgMCwgJ2h1bWFuJywgMCk7XHJcblxyXG5cdCAgXHQvLyBpbml0aWFsaXplIHlvdXIgcHJlZmFiIGhlcmVcclxuXHRcdHRoaXMuYW5pbWF0aW9ucy5hZGQoJ2lkbGUnLCBbMTAsMTFdKTtcclxuXHRcdHRoaXMuYW5pbWF0aW9ucy5wbGF5KCdpZGxlJywgMiwgdHJ1ZSk7XHJcblxyXG5cdFx0dGhpcy5hbmNob3Iuc2V0VG8oLjUsIC41KTtcclxuXHRcdHRoaXMuZW5lbWllcyA9IGVuZW1pZXM7XHJcblx0XHR0aGlzLmFycm93cyA9IGFycm93cztcclxuXHJcblx0XHR0aGlzLnNob3RJbnRlcnZhbCA9IDQwMDtcclxuXHRcdHRoaXMuc2hvdFRpbWUgPSB0aGlzLmdhbWUudGltZS5ub3crdGhpcy5zaG90SW50ZXJ2YWw7XHJcblx0fVxyXG5cclxuXHR1cGRhdGUoKSB7XHJcblxyXG5cdFx0aWYodGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5zaG90VGltZSkge1xyXG5cclxuXHRcdFx0dGhpcy50YXJnZXQgPSB0aGlzLmVuZW1pZXMuZmluZE5lYXJlc3QodGhpcy54LCB0aGlzLnkpO1xyXG5cclxuXHRcdFx0aWYodGhpcy50YXJnZXQpIHtcclxuXHRcdFx0XHR2YXIgYXJyb3cgPSB0aGlzLmFycm93cy5nZXRGaXJzdERlYWQoKTtcclxuXHRcdFx0XHRpZighYXJyb3cpIGFycm93ID0gdGhpcy5hcnJvd3MuY3JlYXRlKDAsIDAsIFwiYXJyb3dcIik7XHJcblx0XHRcdFx0YXJyb3cucmV2aXZlKCk7XHJcblx0XHRcdFx0YXJyb3cueCA9IHRoaXMueDtcclxuXHRcdFx0XHRhcnJvdy55ID0gdGhpcy55O1xyXG5cdFx0XHRcdGFycm93LmxpZmVzcGFuID0gNDAwMDtcclxuXHJcblx0XHRcdFx0YXJyb3cucm90YXRpb24gPSB0aGlzLmdhbWUucGh5c2ljcy5hcmNhZGUubW92ZVRvT2JqZWN0KGFycm93LCB0aGlzLnRhcmdldCwgMTIwKVxyXG5cclxuXHRcdFx0XHR0aGlzLnNob3RUaW1lID0gdGhpcy5nYW1lLnRpbWUubm93K3RoaXMuc2hvdEludGVydmFsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVtYmVyQm94IGV4dGVuZHMgUGhhc2VyLkdyb3VwIHsgXHJcblxyXG5cdGNvbnN0cnVjdG9yKGdhbWUsIGJnYXNzZXQsIHZhbCwgcGFyZW50KSB7ICBcclxuXHQgIFx0c3VwZXIoZ2FtZSwgcGFyZW50KTtcclxuXHJcblx0ICBcdC8vIGluaXRpYWxpemUgeW91ciBwcmVmYWIgaGVyZVxyXG5cdCAgXHR0aGlzLmNyZWF0ZSgwLDAsIGJnYXNzZXQpO1xyXG5cclxuXHRcdHZhciBzdHlsZSA9IHsgZm9udDogXCIzMHB4IEFyaWFsXCIsIGFsaWduOiBcImNlbnRlclwiLCBmaWxsOiBcIiNmZmZcIiB9O1xyXG5cdFx0dGhpcy50eHRWYWx1ZSA9IG5ldyBQaGFzZXIuVGV4dCh0aGlzLmdhbWUsIDU1LCA1NSwgdmFsLnRvU3RyaW5nKCksIHN0eWxlKTtcclxuXHRcdHRoaXMudHh0VmFsdWUuYW5jaG9yLnNldFRvKC41LCAuNSk7XHJcblx0XHR0aGlzLmFkZCh0aGlzLnR4dFZhbHVlKTtcclxuXHJcblx0fVxyXG5cclxuXHRzZXRWYWx1ZSh2YWwpIHtcclxuXHRcdHRoaXMudHh0VmFsdWUudGV4dCA9IHZhbC50b1N0cmluZygpO1xyXG5cdH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNrZWxldG9uIGV4dGVuZHMgUGhhc2VyLlBsdWdpbi5Jc29tZXRyaWMuSXNvU3ByaXRlIHtcclxuXHJcblx0Y29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgZnJhbWUpIHsgIFxyXG5cdCAgICBzdXBlcihnYW1lLCB4LCB5LCAwLCAnc2tlbGV0b24nLCBmcmFtZSk7XHJcblxyXG5cdCAgXHQvLyBpbml0aWFsaXplIHlvdXIgcHJlZmFiIGhlcmVcclxuXHRcdHRoaXMud2Fsa0FuaW0gPSB0aGlzLmFuaW1hdGlvbnMuYWRkKCd3YWxrJywgWzEwLDExXSk7XHJcblx0XHR0aGlzLmFuaW1hdGlvbnMuYWRkKCdodXJ0JywgWzEyXSk7XHJcblx0XHR0aGlzLmFuaW1hdGlvbnMuYWRkKCdhdHRhY2snLCBbMTMsMTQsMTMsMTQsMTQsMTMsMTRdKTtcclxuXHJcblx0XHR0aGlzLmFuaW1hdGlvbnMucGxheSgnd2FsaycsIDIsIHRydWUpO1xyXG5cclxuXHRcdHRoaXMuYW5jaG9yLnNldFRvKC41LCAuNSk7XHJcblxyXG5cdCAgXHR0aGlzLmdhbWUucGh5c2ljcy5lbmFibGUodGhpcywgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuXHJcblx0XHR0aGlzLnBhdGgsIHRoaXMucGF0aFBvc2l0aW9uO1xyXG5cclxuXHRcdHRoaXMuaGVhbHRoID0gNTtcclxuXHRcdHRoaXMud29ydGggPSAyMDtcclxuXHJcblx0XHR0aGlzLnBhdGhGaW5pc2hlZCA9IG5ldyBQaGFzZXIuU2lnbmFsKCk7XHJcblx0fVxyXG5cclxuXHJcblx0c2V0UGF0aChwYXRoKSB7XHJcblx0XHR0aGlzLnBhdGggPSBwYXRoO1xyXG5cdFx0dGhpcy5wYXRoUG9zaXRpb24gPSAtMTtcclxuXHR9XHJcblxyXG5cdGFkdmFuY2VUaWxlKCkge1xyXG5cdFx0XHJcblx0XHR0aGlzLnBhdGhQb3NpdGlvbiArKztcclxuXHJcblx0XHRpZih0aGlzLnBhdGhQb3NpdGlvbiA8IHRoaXMucGF0aC5sZW5ndGgpIHtcclxuXHRcdFx0Ly90d2VlblxyXG5cdFx0XHRpZiggdGhpcy5wYXRoW3RoaXMucGF0aFBvc2l0aW9uXS54ID4gdGhpcy5pc29YICkge1xyXG5cdFx0XHRcdHRoaXMuc2NhbGUueCA9IDE7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zY2FsZS54ID0gLTE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMud2Fsa01vdGlvbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcykudG8oeyBpc29YOiB0aGlzLnBhdGhbdGhpcy5wYXRoUG9zaXRpb25dLngsIGlzb1k6IHRoaXMucGF0aFt0aGlzLnBhdGhQb3NpdGlvbl0ueSB9LCAyMDAwLCBQaGFzZXIuRWFzaW5nLkxpbmVhci5Ob25lLCB0cnVlKTtcclxuXHRcdFx0dGhpcy53YWxrTW90aW9uLm9uQ29tcGxldGUuYWRkKHRoaXMuYWR2YW5jZVRpbGUsIHRoaXMpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5hbmltYXRpb25zLnBsYXkoXCJhdHRhY2tcIiwgMik7XHJcblx0XHRcdHRoaXMuYW5pbWF0aW9ucy5jdXJyZW50QW5pbS5vbkNvbXBsZXRlLmFkZE9uY2UodGhpcy5hdHRhY2tPdmVyLCB0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRhdHRhY2tPdmVyKCkge1xyXG5cdFx0dGhpcy5wYXRoRmluaXNoZWQuZGlzcGF0Y2godGhpcyk7XHJcblx0fVxyXG59IiwiZnVuY3Rpb24gQm9vdCgpIHsgfVxyXG5cclxuQm9vdC5wcm90b3R5cGUgPSB7XHJcbiAgcHJlbG9hZDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3ByZWxvYWRlcicsICdhc3NldHMvaW1hZ2VzL2xvYWRpbmdfYmFyLnBuZycpO1xyXG4gIH0sXHJcbiAgY3JlYXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgncHJlbG9hZCcpO1xyXG4gIH1cclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJvb3Q7IiwiaW1wb3J0IEh1bWFuIGZyb20gXCIuLi9wcmVmYWJzL0h1bWFuLmpzXCI7XHJcbmltcG9ydCBTa2VsZXRvbiBmcm9tIFwiLi4vcHJlZmFicy9Ta2VsZXRvbi5qc1wiO1xyXG5pbXBvcnQgTnVtYmVyQm94IGZyb20gXCIuLi9wcmVmYWJzL051bWJlckJveC5qc1wiO1xyXG5pbXBvcnQgU2ltcGxlUG9vbCBmcm9tIFwiLi4vY29tcG9uZW50cy9TaW1wbGVQb29sLmpzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUgeyBcclxuICBcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgXHR0aGlzLnNwYXduVGltZSA9IDEwMDA7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcblxyXG4gICAgdGhpcy5tYXBEYXRhID0gIHRoaXMuZ2FtZS5jYWNoZS5nZXRKU09OKCdtYXBkYXRhJyk7XHJcblxyXG4gICAgdGhpcy5wbGF5ZXJMaWZlID0gMTA7XHJcblx0XHR0aGlzLm1vbmV5ID0gMTAwO1xyXG5cclxuXHRcdHRoaXMuZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcblxyXG4gICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQuc3ByaXRlKDAsMCwgXCJnYW1lYmdcIik7XHJcblxyXG4gICAgLy8gQWRkIGFuZCBlbmFibGUgdGhlIHBsdWctaW4uXHJcbiAgICB0aGlzLmdhbWUucGx1Z2lucy5hZGQobmV3IFBoYXNlci5QbHVnaW4uSXNvbWV0cmljKHRoaXMuZ2FtZSkpO1xyXG5cclxuICAgIC8vIFRoaXMgaXMgdXNlZCB0byBzZXQgYSBnYW1lIGNhbnZhcy1iYXNlZCBvZmZzZXQgZm9yIHRoZSAwLCAwLCAwIGlzb21ldHJpYyBjb29yZGluYXRlIC0gYnkgZGVmYXVsdFxyXG4gICAgLy8gdGhpcyBwb2ludCB3b3VsZCBiZSBhdCBzY3JlZW4gY29vcmRpbmF0ZXMgMCwgMCAodG9wIGxlZnQpIHdoaWNoIGlzIHVzdWFsbHkgdW5kZXNpcmFibGUuXHJcbiAgICB0aGlzLmdhbWUuaXNvLmFuY2hvci5zZXRUbygwLjUsIDAuMik7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGEgZ3JvdXAgZm9yIG91ciB0aWxlcy5cclxuICAgIHRoaXMuaXNvR3JvdXAgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XHJcbiAgICB0aGlzLmlzb0NoYXJzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xyXG5cclxuICAgIC8vIExldCdzIG1ha2UgYSBsb2FkIG9mIHRpbGVzIG9uIGEgZ3JpZC5cclxuICAgIHRoaXMuc3Bhd25UaWxlcygpO1xyXG5cclxuICAgIHRoaXMuYWxsaWVzID0gdGhpcy5nYW1lLmFkZC5ncm91cCh0aGlzLmlzb0NoYXJzKTtcclxuICAgIHRoaXMuZW5lbWllcyA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAodGhpcy5pc29DaGFycyk7XHJcbiAgICB0aGlzLmVuZW1pZXMuZmluZE5lYXJlc3QgPSB0aGlzLmZpbmROZWFyZXN0O1xyXG4gICAgdGhpcy5hcnJvd3MgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XHJcbiAgICB0aGlzLmFycm93cy5lbmFibGVCb2R5ID0gdHJ1ZTtcclxuICAgIHRoaXMuYXJyb3dzLnBoeXNpY3NCb2R5VHlwZSA9IFBoYXNlci5QaHlzaWNzLkFSQ0FERTtcclxuICAgIC8vdGhpcy5hcnJvd3MuY3JlYXRlTXVsdGlwbGUoMzAsIFwiYXJyb3dcIik7XHJcblxyXG4gICAgLy8gUHJvdmlkZSBhIDNEIHBvc2l0aW9uIGZvciB0aGUgY3Vyc29yXHJcbiAgICB0aGlzLmN1cnNvclBvcyA9IG5ldyBQaGFzZXIuUGx1Z2luLklzb21ldHJpYy5Qb2ludDMoKTtcclxuXHJcbiAgICAvL3NldHVwIHRoZSBwYXRoZmluZGluZ1xyXG5cdFx0dGhpcy5lYXN5c3RhciA9IG5ldyBFYXN5U3Rhci5qcygpO1xyXG5cdFx0dGhpcy5lYXN5c3Rhci5zZXRHcmlkKHRoaXMubWFwRGF0YS50aWxlTWFwKTtcclxuXHRcdHRoaXMuZWFzeXN0YXIuc2V0QWNjZXB0YWJsZVRpbGVzKFsxXSk7XHJcblxyXG5cdFx0dGhpcy5ib3VuZEZvdW5kID0gdGhpcy5wYXRoRm91bmQuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuZWFzeXN0YXIuZmluZFBhdGgoMSwgMCwgMCwgNCwgdGhpcy5ib3VuZEZvdW5kKTtcclxuXHJcblx0XHR0aGlzLnNjb3JlQm94ID0gbmV3IE51bWJlckJveCh0aGlzLmdhbWUsIFwibW9uZXlob2xkZXJcIiwgdGhpcy5tb25leSk7XHJcblx0XHR0aGlzLnNjb3JlQm94LnggPSAxMDtcclxuXHRcdHRoaXMuc2NvcmVCb3gueSA9IDEwO1xyXG5cdFx0dGhpcy5hZGQuZXhpc3RpbmcodGhpcy5zY29yZUJveCk7XHJcblxyXG5cdFx0dGhpcy5oZWFsdGhCb3ggPSBuZXcgTnVtYmVyQm94KHRoaXMuZ2FtZSwgXCJoZWFsdGhob2xkZXJcIiwgdGhpcy5wbGF5ZXJMaWZlKTtcclxuXHRcdHRoaXMuaGVhbHRoQm94LnggPSAxMTA7XHJcblx0XHR0aGlzLmhlYWx0aEJveC55ID0gMTA7XHJcblx0XHR0aGlzLmFkZC5leGlzdGluZyh0aGlzLmhlYWx0aEJveCk7XHJcblxyXG5cdFx0dGhpcy5uZXh0U3Bhd24gPSB0aGlzLmdhbWUudGltZS5ub3cgICsgdGhpcy5zcGF3blRpbWU7XHJcblxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG5cclxuIFx0XHQvLyBJdCdzIGltcG9ydGFudCB0byB1bmRlcnN0YW5kIHRoYXQgc2NyZWVuLXRvLWlzb21ldHJpYyBwcm9qZWN0aW9uIG1lYW5zIHlvdSBoYXZlIHRvIHNwZWNpZnkgYSB6IHBvc2l0aW9uIG1hbnVhbGx5LCBhcyB0aGlzIGNhbm5vdCBiZSBlYXNpbHlcclxuICAgICAgICAvLyBkZXRlcm1pbmVkIGZyb20gdGhlIDJEIHBvaW50ZXIgcG9zaXRpb24gd2l0aG91dCBleHRyYSB0cmlja2VyeS4gQnkgZGVmYXVsdCwgdGhlIHogcG9zaXRpb24gaXMgMCBpZiBub3Qgc2V0LlxyXG4gICAgICAgIHRoaXMuZ2FtZS5pc28udW5wcm9qZWN0KHRoaXMuZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyLnBvc2l0aW9uLCB0aGlzLmN1cnNvclBvcyk7XHJcblxyXG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBhbGwgdGlsZXMgYW5kIHRlc3QgdG8gc2VlIGlmIHRoZSAzRCBwb3NpdGlvbiBmcm9tIGFib3ZlIGludGVyc2VjdHMgd2l0aCB0aGUgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgSXNvU3ByaXRlIHRpbGUgYm91bmRzLlxyXG4gICAgICAgIHRoaXMuaXNvR3JvdXAuZm9yRWFjaCh0aGlzLmNoZWNrVGlsZXMsIHRoaXMsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duICYmIHRoaXMuc2VsZWN0ZWRUaWxlKSB7XHJcblxyXG4gICAgICAgIFx0aWYoIXRoaXMuc2VsZWN0ZWRUaWxlLm9jY3VwYW50ICYmIHRoaXMuc2VsZWN0ZWRUaWxlLmJ1eWFibGUpIHtcclxuXHQgICAgICAgIFx0aWYodGhpcy5tb25leSA+PSAxMDApIHtcclxuXHRcdFx0ICAgICAgICB2YXIgaHVtYW4gPSBuZXcgSHVtYW4odGhpcy5nYW1lLCB0aGlzLnNlbGVjdGVkVGlsZS5pc29YLCB0aGlzLnNlbGVjdGVkVGlsZS5pc29ZLCB0aGlzLmVuZW1pZXMsIHRoaXMuYXJyb3dzKTtcclxuXHRcdFx0ICAgICAgICB0aGlzLmFsbGllcy5hZGQoaHVtYW4pO1xyXG5cdFx0ICAgICAgICBcdHRoaXMuc2VsZWN0ZWRUaWxlLm9jY3VwYW50ID0gaHVtYW47XHJcblx0XHQgICAgICAgIFx0dGhpcy5tb25leSAtPSAxMDA7XHJcbiAgXHRcdFx0XHRcdHRoaXMuc2NvcmVCb3guc2V0VmFsdWUodGhpcy5tb25leSk7XHJcblx0ICAgICAgICBcdH1cclxuXHQgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5waHlzaWNzLmFyY2FkZS5vdmVybGFwKHRoaXMuYXJyb3dzLCB0aGlzLmVuZW1pZXMsIHRoaXMuYXJyb3dIaXRFbmVteSwgbnVsbCwgdGhpcylcclxuXHJcbiAgICAgICAgaWYodGhpcy5nYW1lLnRpbWUubm93ID4gdGhpcy5uZXh0U3Bhd24pIHtcclxuICAgICAgICBcdHRoaXMuc3Bhd25FbmVteSgpO1xyXG4gICAgICAgIFx0dGhpcy5uZXh0U3Bhd24gPSB0aGlzLmdhbWUudGltZS5ub3cgKyB0aGlzLnNwYXduVGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZWFzeXN0YXIuY2FsY3VsYXRlKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lLmlzby5zaW1wbGVTb3J0KHRoaXMuZW5lbWllcyk7XHJcbiAgfVxyXG5cclxuICBhcnJvd0hpdEVuZW15KGFycm93LCBlbmVteSkge1xyXG4gIFx0YXJyb3cua2lsbCgpO1xyXG4gIFx0ZW5lbXkuZGFtYWdlKDEpO1xyXG4gIFx0aWYoIWVuZW15LmFsaXZlKSB7XHJcbiAgXHRcdHRoaXMubW9uZXkgKz0gZW5lbXkud29ydGg7XHJcbiAgXHRcdHRoaXMuc2NvcmVCb3guc2V0VmFsdWUodGhpcy5tb25leSk7XHJcbiAgXHR9XHJcbiAgfVxyXG5cclxuICBjaGVja1RpbGVzKHRpbGUpIHtcclxuXHRcdHZhciBpbkJvdW5kcyA9IHRpbGUuaXNvQm91bmRzLmNvbnRhaW5zWFkodGhpcy5jdXJzb3JQb3MueCwgdGhpcy5jdXJzb3JQb3MueSk7XHJcbiAgICAgICAgLy8gSWYgaXQgZG9lcywgZG8gYSBsaXR0bGUgYW5pbWF0aW9uIGFuZCB0aW50IGNoYW5nZS5cclxuICAgICAgICBpZiAoIXRpbGUuc2VsZWN0ZWQgJiYgaW5Cb3VuZHMpIHtcclxuICAgICAgICAgICAgdGlsZS5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRpbGUudGludCA9IDB4ODZiZmRhO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRpbGUpLnRvKHsgaXNvWjogNCB9LCAyMDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluT3V0LCB0cnVlKTtcclxuXHJcbiAgICAgICAgXHR0aGlzLnNlbGVjdGVkVGlsZSA9IHRpbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIElmIG5vdCwgcmV2ZXJ0IGJhY2sgdG8gaG93IGl0IHdhcy5cclxuICAgICAgICBlbHNlIGlmICh0aWxlLnNlbGVjdGVkICYmICFpbkJvdW5kcykge1xyXG4gICAgICAgICAgICB0aWxlLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRpbGUudGludCA9IDB4ZmZmZmZmO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRpbGUpLnRvKHsgaXNvWjogMCB9LCAyMDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluT3V0LCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgc3Bhd25UaWxlcygpIHtcclxuXHJcbiAgXHRcdHZhciBzaXplID0gNTU7XHJcbiAgXHRcdHZhciBtYXBfd2lkdGggPSB0aGlzLm1hcERhdGEudGlsZU1hcFswXS5sZW5ndGggLSAxO1xyXG4gIFx0XHR2YXIgbWFwX2hlaWdodCA9IHRoaXMubWFwRGF0YS50aWxlTWFwLmxlbmd0aCAtIDE7XHJcblxyXG5cclxuICBcdFx0dGhpcy5nYW1lVGlsZXMgPSBbXTtcclxuXHJcbiAgICAgICAgdmFyIGkgPSAwLCB0aWxlO1xyXG4gICAgICAgIHZhciBjYyA9IDU7XHJcbiAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPD0gbWFwX2hlaWdodDsgeSArKykge1xyXG4gICAgICAgIFx0dGhpcy5nYW1lVGlsZXNbIHkgXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8PSBtYXBfd2lkdGg7IHggKyspIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIHRpbGVOdW1iZXIgPSAgdGhpcy5tYXBEYXRhLnRpbGVNYXBbeV1bIHggXTtcclxuICAgICAgICAgICAgICAgIHZhciB0aWxlTmFtZSA9IHRoaXMubWFwRGF0YS50aWxlTmFtZXNbdGlsZU51bWJlcl07XHJcblxyXG4gICAgICAgICAgICAgICBcdHRpbGUgPSB0aGlzLmdhbWUuYWRkLmlzb1Nwcml0ZSh4KnNpemUsIHkqc2l6ZSwgMCwgdGlsZU5hbWUsIDAsIHRoaXMuaXNvR3JvdXApO1xyXG4gICAgICAgICAgICAgICAgdGlsZS5hbmNob3Iuc2V0KDAuNSwgMCk7XHJcbiAgICAgICAgICAgICAgICB0aWxlLmJ1eWFibGUgPSAodGlsZU51bWJlciA9PSAwKSA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVUaWxlc1t5XVt4XSA9IHRpbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGF0aEZvdW5kKHBhdGgpIHtcclxuXHQgICAgaWYgKHBhdGggPT09IG51bGwpIHtcclxuXHQgICAgICAgIGNvbnNvbGUubG9nKFwiUGF0aCB3YXMgbm90IGZvdW5kLlwiKTtcclxuXHQgICAgfSBlbHNlIHtcclxuXHQgICAgICAgIGNvbnNvbGUubG9nKFwiUGF0aCB3YXMgZm91bmQuIFRoZSBmaXJzdCBQb2ludCBpcyBcIiArIHBhdGhbMF0ueCArIFwiIFwiICsgcGF0aFswXS55KTtcclxuXHJcblx0ICAgICAgICB0aGlzLmNvbnZlcnRlZFBhdGggPSBbXTtcclxuXHQgICAgICAgIHZhciBjdXJQb2ludDtcclxuXHQgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XHJcblx0ICAgICAgICBcdGN1clBvaW50ID0gdGhpcy5nYW1lVGlsZXNbcGF0aFtpXS55XVtwYXRoW2ldLnhdO1xyXG5cdCAgICAgICAgXHR0aGlzLmNvbnZlcnRlZFBhdGgucHVzaCggeyB4OiBjdXJQb2ludC5pc29YLCB5OiBjdXJQb2ludC5pc29ZIH0gKVxyXG5cdCAgICAgICAgfVxyXG5cdCAgICAgIFxyXG5cdCAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZW5lbXlBdEdvYWwoZW5lbXkpIHtcclxuICAgIFx0ZW5lbXkua2lsbCgpO1xyXG4gICAgXHR0aGlzLnBsYXllckxpZmUgLS07XHJcbiAgICBcdHRoaXMuaGVhbHRoQm94LnNldFZhbHVlKHRoaXMucGxheWVyTGlmZSk7XHJcblxyXG4gICAgXHRpZih0aGlzLnBsYXllckxpZmUgPD0gMCkge1xyXG4gICAgXHRcdHRoaXMuZ2FtZU92ZXIoKTtcclxuICAgIFx0fVxyXG4gICAgfVxyXG5cclxuICAgIHNwYXduRW5lbXkoKSB7XHJcblx0XHQgIHZhciBza2VsID0gbmV3IFNrZWxldG9uKHRoaXMuZ2FtZSwgdGhpcy5jb252ZXJ0ZWRQYXRoWzBdLngsIHRoaXMuY29udmVydGVkUGF0aFswXS55KTtcclxuICAgICAgICBza2VsLnNldFBhdGgodGhpcy5jb252ZXJ0ZWRQYXRoKTtcclxuICAgICAgICBza2VsLmFkdmFuY2VUaWxlKCk7XHJcbiAgICAgICAgc2tlbC5wYXRoRmluaXNoZWQuYWRkT25jZSh0aGlzLmVuZW15QXRHb2FsLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmVuZW1pZXMuYWRkKHNrZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGdhbWVPdmVyKCkge1xyXG4gICAgXHR0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ2dhbWVvdmVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZE5lYXJlc3QoeGMsIHljKSB7XHJcbiAgICBcdHZhciBsb3dlc3RDaGlsZCA9IG51bGw7XHJcbiAgICBcdHZhciBsb3dlc3REaXN0ID0gbnVsbDtcclxuXHJcbiAgICBcdHRoaXMuZm9yRWFjaChmdW5jdGlvbihjaGlsZCkgeyBcclxuXHJcbiAgICBcdFx0dmFyIGRpc3QgPSBQaGFzZXIuTWF0aC5kaXN0YW5jZSh4YywgeWMsIGNoaWxkLngsIGNoaWxkLnkpO1xyXG5cclxuICAgIFx0XHRpZighbG93ZXN0Q2hpbGQpIHtcclxuICAgIFx0XHRcdGxvd2VzdENoaWxkID0gY2hpbGQ7XHJcbiAgICBcdFx0fSBlbHNlIHtcclxuICAgIFx0XHRcdGlmKGRpc3QgPCBsb3dlc3REaXN0KSB7XHJcbiAgICBcdFx0XHRcdGxvd2VzdENoaWxkID0gY2hpbGQ7XHJcbiAgICBcdFx0XHRcdGxvd2VzdERpc3QgPSBkaXN0O1xyXG4gICAgXHRcdFx0fVxyXG4gICAgXHRcdH1cclxuICAgIFx0fSwgdGhpcywgdHJ1ZSk7XHJcblxyXG4gICAgXHRyZXR1cm4gbG93ZXN0Q2hpbGQ7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT3ZlciB7XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gIFx0dGhpcy5nYW1lLmFkZC5zcHJpdGUoMCwwLCBcImdhbWViZ1wiKTtcclxuICBcdHRoaXMub3RyID0gdGhpcy5nYW1lLmFkZC5zcHJpdGUodGhpcy5nYW1lLndpZHRoLzIsMjAwLFwiZ2FtZW92ZXJUZXh0XCIpO1xyXG4gIFx0dGhpcy5vdHIuYW5jaG9yLnNldFRvKC41LCAuNSk7XHJcbiAgXHR0aGlzLmJ0blBsYXkgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSh0aGlzLmdhbWUud2lkdGgvMiwzMDAsXCJidG5BZ2FpblwiKTtcclxuICBcdHRoaXMuYnRuUGxheS5hbmNob3Iuc2V0VG8oLjUsIC41KTtcclxuICBcdHRoaXMuYnRuUGxheS5hbHBoYSA9IDA7XHJcblxyXG4gIFx0dGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzLmJ0blBsYXkpLnRvKCB7IGFscGhhOiAxIH0sIDEwMDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluT3V0LCB0cnVlLCAwLCAxMDAwLCB0cnVlKTtcclxuXHJcbiAgXHR0aGlzLmdhbWUuaW5wdXQub25Eb3duLmFkZE9uY2UodGhpcy5zd2l0Y2hTdGF0ZSwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICBzd2l0Y2hTdGF0ZSgpIHtcclxuICBcdHRoaXMuZ2FtZS5zdGF0ZS5zdGFydChcImdhbWVcIik7XHJcbiAgfVxyXG4gIFxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudSB7XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gIFx0dGhpcy5nYW1lLmFkZC5zcHJpdGUoMCwwLCBcImdhbWViZ1wiKTtcclxuICBcdHRoaXMudGl0bGUgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSh0aGlzLmdhbWUud2lkdGgvMiwyMDAsXCJ0aXRsZVwiKTtcclxuICBcdHRoaXMudGl0bGUuYW5jaG9yLnNldFRvKC41LCAuNSk7XHJcbiAgXHR0aGlzLmJ0blBsYXkgPSB0aGlzLmdhbWUuYWRkLnNwcml0ZSh0aGlzLmdhbWUud2lkdGgvMiwzMDAsXCJidG5CZWdpblwiKTtcclxuICBcdHRoaXMuYnRuUGxheS5hbmNob3Iuc2V0VG8oLjUsIC41KTtcclxuICBcdHRoaXMuYnRuUGxheS5hbHBoYSA9IDA7XHJcblxyXG4gIFx0dGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzLmJ0blBsYXkpLnRvKCB7IGFscGhhOiAxIH0sIDEwMDAsIFBoYXNlci5FYXNpbmcuUXVhZHJhdGljLkluT3V0LCB0cnVlLCAwLCAxMDAwLCB0cnVlKTtcclxuXHJcbiAgXHR0aGlzLmdhbWUuaW5wdXQub25Eb3duLmFkZE9uY2UodGhpcy5zd2l0Y2hTdGF0ZSwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICBzd2l0Y2hTdGF0ZSgpIHtcclxuICBcdHRoaXMuZ2FtZS5zdGF0ZS5zdGFydChcImdhbWVcIik7XHJcbiAgfVxyXG5cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWxvYWQgeyBcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgXHR0aGlzLnByZWxvYWRBc3NldCA9IG51bGw7XHJcbiAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcmVsb2FkKCkge1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdsb2FkaW5nX2JnJywgJ2Fzc2V0cy9pbWFnZXMvbG9hZGluZ19iZy5qcGcnKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuXHJcbiAgICAvL2JhY2tncm91bmQgZm9yIGdhbWVcclxuICAgIHRoaXMuYWRkLnNwcml0ZSgwLDAsIFwibG9hZGluZ19iZ1wiKTtcclxuXHJcbiAgICB0aGlzLnByZWxvYWRBc3NldCA9IHRoaXMuYWRkLnNwcml0ZSh0aGlzLmdhbWUud2lkdGgvMix0aGlzLmdhbWUuaGVpZ2h0LzIsICdwcmVsb2FkZXInKTtcclxuICAgIHRoaXMucHJlbG9hZEFzc2V0LmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XHJcblxyXG4gICAgdGhpcy5sb2FkLm9uTG9hZENvbXBsZXRlLmFkZE9uY2UodGhpcy5vbkxvYWRDb21wbGV0ZSwgdGhpcyk7XHJcbiAgICB0aGlzLmxvYWQuc2V0UHJlbG9hZFNwcml0ZSh0aGlzLnByZWxvYWRBc3NldCk7XHJcblxyXG4gICAgLy9kbyBhbGwgeW91ciBsb2FkaW5nIGhlcmVcclxuICAgIHRoaXMubG9hZC5wYWNrKCdsZXZlbDEnLCAnYXNzZXRzL2Fzc2V0UGFjay5qc29uJywgbnVsbCwgdGhpcyk7XHJcbiAgICBcclxuICAgIC8vc3RhYWFhcnQgbG9hZFxyXG4gICAgdGhpcy5sb2FkLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcblxyXG4gICAgaWYodGhpcy5yZWFkeSkge1xyXG4gICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ21lbnUnKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBvbkxvYWRDb21wbGV0ZSgpIHtcclxuICAgIHRoaXMucmVhZHkgPSB0cnVlO1xyXG4gIH1cclxuXHJcbn0iXX0=
