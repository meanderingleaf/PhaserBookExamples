(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _statesBootJs = require("./states/Boot.js");

var _statesBootJs2 = _interopRequireDefault(_statesBootJs);

var _statesPreloadJs = require("./states/Preload.js");

var _statesPreloadJs2 = _interopRequireDefault(_statesPreloadJs);

var _statesGameJs = require("./states/Game.js");

var _statesGameJs2 = _interopRequireDefault(_statesGameJs);

var game;

window.onload = function () {
  game = new Phaser.Game("100%", "100%", Phaser.AUTO, "game");
  game.state.add("boot", _statesBootJs2["default"]);
  game.state.add("preload", _statesPreloadJs2["default"]);
  game.state.add("game", _statesGameJs2["default"]);
  game.state.start("boot");
};

},{"./states/Boot.js":5,"./states/Game.js":6,"./states/Preload.js":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var SwipeHandler = (function (_Phaser$Group) {
	function SwipeHandler(game) {
		_classCallCheck(this, SwipeHandler);

		_get(Object.getPrototypeOf(SwipeHandler.prototype), "constructor", this).call(this, game);
		this.game.input.onUp.add(this.inputUp, this);

		this.swipeStart = new Phaser.Signal();
		this.swipeEnd = new Phaser.Signal();

		this.swiping = false;
	}

	_inherits(SwipeHandler, _Phaser$Group);

	_createClass(SwipeHandler, [{
		key: "update",
		value: function update() {
			if (this.game.input.activePointer.isDown) {
				if (!this.swiping) {
					if (this.game.input.speed.getMagnitude() > 20) {
						this.swiping = true;
						this.swipeStart.dispatch(this);
					}
				} else {
					if (this.game.input.speed.getMagnitude() < 10) {
						this.swiping = false;
						this.swipeEnd.dispatch(this);
					}
				}
			}
		}
	}, {
		key: "inputUp",
		value: function inputUp() {
			if (this.gesturing) {
				this.swiping = false;
				this.swipeEnd.dispatch(this);
			}
		}
	}]);

	return SwipeHandler;
})(Phaser.Group);

exports["default"] = SwipeHandler;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Device = (function (_Phaser$Sprite) {
  function Device(game, x, y, frame, collisionGroup, sliceGroup) {
    _classCallCheck(this, Device);

    _get(Object.getPrototypeOf(Device.prototype), 'constructor', this).call(this, game, x, y, 'devices');

    // initialize your prefab here
    this.frameName = frame;

    this.anchor.setTo(0.5, 0.5);

    this.game.physics.p2.enable(this);
    this.body.setCollisionGroup(collisionGroup);
    this.body.collides(sliceGroup);
    //this.body.collideWorldBounds = false;
  }

  _inherits(Device, _Phaser$Sprite);

  _createClass(Device, [{
    key: 'update',
    value: function update() {
      if (this.body.y > 3000) {
        this.kill();
      }
    }
  }, {
    key: 'launch',
    value: function launch() {

      this.body.setZeroVelocity();
      this.body.angularVelocity = 0;

      if (Phaser.Utils.chanceRoll(50)) {
        this.body.x = this.game.width;
        this.body.y = this.game.height + 100;
        //this.body.velocity.x = 800;
        //this.body.velocity.x = 2500;
        this.body.applyForce([800, 2500], this.body.x + 20, this.body.y);
      } else {
        this.body.x = 0;
        this.body.y = this.game.height + 100;
        this.body.applyForce([-800, 2500], this.body.x - 20, this.body.y);
      }

      this.life = 20;
    }
  }]);

  return Device;
})(Phaser.Sprite);

exports['default'] = Device;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var SliceBody = (function (_Phaser$Physics$P2$Body) {
  function SliceBody(game, ray, collisionGroup, sliceGroup) {
    _classCallCheck(this, SliceBody);

    _get(Object.getPrototypeOf(SliceBody.prototype), "constructor", this).call(this, game, null, ray.x, ray.y, 1);

    this.ray = ray;
    this.addRectangle(ray.length, 2, 0, 0, ray.angle);

    this.setCollisionGroup(sliceGroup);
    this.collides(collisionGroup);
    this.addToWorld();
    this["static"] = true;
    this.onBeginContact.add(this.sliceHit, this);

    // this.debug = true;
    this.life = 10;
    this.success = new Phaser.Signal();
  }

  _inherits(SliceBody, _Phaser$Physics$P2$Body);

  _createClass(SliceBody, [{
    key: "updateLife",
    value: function updateLife() {
      this.life--;

      if (this.life <= 0) {
        this.removeFromWorld();
        this.group.remove(this);
      }
    }
  }, {
    key: "sliceHit",
    value: function sliceHit(other) {
      other.sprite.kill();
      this.success.dispatch(this, other);
    }
  }]);

  return SliceBody;
})(Phaser.Physics.P2.Body);

exports["default"] = SliceBody;
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

      this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
      this.scale.setMinMax(260, 480, 768, 1024);

      if (this.game.device.desktop == false) {
        this.scale.forceOrientation(false, true);
      }

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _prefabsSliceBodyJs = require("../prefabs/SliceBody.js");

var _prefabsSliceBodyJs2 = _interopRequireDefault(_prefabsSliceBodyJs);

var _prefabsDeviceJs = require("../prefabs/Device.js");

var _prefabsDeviceJs2 = _interopRequireDefault(_prefabsDeviceJs);

var _componentsSwipeHandlerJs = require("../components/SwipeHandler.js");

var _componentsSwipeHandlerJs2 = _interopRequireDefault(_componentsSwipeHandlerJs);

var Game = (function () {
  function Game() {
    _classCallCheck(this, Game);

    this.deviceTypes = ["boy.png", "floppy.png", "walkman.png"];
    this.deviceTypes.getRandomEntry = function () {
      return this[Math.floor(Math.random() * this.length)];
    };
  }

  _createClass(Game, [{
    key: "create",
    value: function create() {

      this.bg = this.add.sprite(this.game.width / 2, this.game.height / 2, "gamebg");
      this.bg.anchor.set(0.5, 0.5);

      this.game.world.setBounds(-15000, -15000, 30000, 30000);

      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.game.physics.p2.gravity.y = 750;
      this.game.physics.p2.restitution = 0.8;

      this.drawingSlice = false;

      //this.game.input.onDown.add(this.inputDown, this);
      //this.game.input.onUp.add(this.inputUp, this);

      this.devices = this.add.group();
      this.trails = this.add.group();

      this.sliceStart = { x: 0, y: 0 };
      this.sliceBodies = new Phaser.ArraySet();

      this.timer = this.game.time.create(false);
      this.timer.loop(1000, this.spawnWave, this);
      this.timer.start();

      this.score = 0;

      var style = { font: "70px dymaxionscriptregular", fill: "#ff0044", align: "center" };
      this.txtScore = this.add.text(this.game.width / 2, 30, this.score.toString() + " pts", style);
      this.txtScore.anchor.set(0.5);

      this.emitter = this.game.add.emitter(0, 0, 200);
      this.emitter = this.emitter.makeParticles(["triangle", "zoid"]);

      this.slicedPieces = this.add.group();
      this.deviceCollisionGroup = this.game.physics.p2.createCollisionGroup();
      this.sliceCollisionGroup = this.game.physics.p2.createCollisionGroup();

      this.swipeHandler = new _componentsSwipeHandlerJs2["default"](this.game);
      this.swipeHandler.swipeStart.add(this.swipeStart, this);
      this.swipeHandler.swipeEnd.add(this.swipeEnd, this);
      this.add.existing(this.swipeHandler);

      this.spawnWave();
    }
  }, {
    key: "update",
    value: function update() {

      if (this.swipeHandler.swiping) {
        this.curGraphics.clear();
        this.curGraphics.lineStyle(10, 16767232, 1);
        this.curGraphics.moveTo(this.sliceStart.x, this.sliceStart.y);
        this.curGraphics.lineTo(this.input.activePointer.x, this.input.activePointer.y);
      }

      this.sliceBodies.callAll("updateLife");
    }
  }, {
    key: "endSegment",
    value: function endSegment() {
      var ray = new Phaser.Line(this.sliceStart.x, this.sliceStart.y, this.input.activePointer.x, this.input.activePointer.y);
      var sliceBody = new _prefabsSliceBodyJs2["default"](this.game, ray, this.deviceCollisionGroup, this.sliceCollisionGroup);

      //add the line to it
      sliceBody.group = this.sliceBodies;
      sliceBody.success.add(this.sliceHit, this);
      this.sliceBodies.add(sliceBody);

      // this.sliceBody.removeFromWorld();
      //   this.sliceBody = null;

      // this.sliceBody.destroy();

      this.game.add.tween(this.curGraphics).to({ alpha: 0 }, 800, Phaser.Easing.Quadratic.Out, true);
    }
  }, {
    key: "sliceHit",
    value: function sliceHit(sliceBody, device) {

      var coords = sliceBody.ray.coordinatesOnLine(20);

      for (var i = 0; i < coords.length; i++) {
        this.emitter.x = coords[i][0];
        this.emitter.y = coords[i][1];
        this.emitter.explode(2000, 1);
      }

      this.score++;
      this.txtScore.text = this.score.toString() + " pts";

      var sliceSprite = this.slicedPieces.create(device.sprite.x, device.sprite.y, device.sprite.key, device.sprite.frameName);
      var halfHeight = Math.floor(sliceSprite.height / 2);
      sliceSprite.crop(new Phaser.Rectangle(0, 0, sliceSprite.width, halfHeight));
      this.game.physics.p2.enable(sliceSprite);
      sliceSprite.anchor.setTo(0.5, 1);
      sliceSprite.body.rotation = device.rotation;
      sliceSprite.body.setCollisionGroup(this.game.physics.p2.nothingCollisionGroup);
      sliceSprite.body.angularVelocity = -1.2;

      var sliceSprite2 = this.slicedPieces.create(device.sprite.x, device.sprite.y, device.sprite.key, device.sprite.frameName);
      sliceSprite2.crop(new Phaser.Rectangle(0, halfHeight, sliceSprite.width, halfHeight));
      this.game.physics.p2.enable(sliceSprite2);
      sliceSprite2.anchor.setTo(0.5, 0);
      sliceSprite2.body.rotation = device.rotation;
      sliceSprite2.body.setCollisionGroup(this.game.physics.p2.nothingCollisionGroup);
      sliceSprite2.body.angularVelocity = 1.2;
    }
  }, {
    key: "startSegment",
    value: function startSegment() {
      this.sliceStart.x = this.input.activePointer.x;
      this.sliceStart.y = this.input.activePointer.y;
      this.curGraphics = new Phaser.Graphics(this.game, 0, 0);
      this.curGraphics.lineStyle(10, 16767232, 1);
      this.trails.add(this.curGraphics);
    }
  }, {
    key: "swipeStart",
    value: function swipeStart() {
      this.startSegment();
    }
  }, {
    key: "swipeEnd",
    value: function swipeEnd() {
      this.endSegment();
    }
  }, {
    key: "resize",
    value: function resize(width, height) {
      this.txtScore.x = width / 2;

      this.bg.x = width / 2;
      this.bg.y = height / 2;
      this.bg.height = height;
    }
  }, {
    key: "spawnWave",
    value: function spawnWave() {

      var d = this.devices.getFirstDead();
      if (!d) {
        d = new _prefabsDeviceJs2["default"](this.game, 300, this.game.height + 100, this.deviceTypes.getRandomEntry(), this.deviceCollisionGroup, this.sliceCollisionGroup);
        d.launch();
        this.devices.add(d);
      } else {
        d.revive();
        d.launch();
      }
    }
  }]);

  return Game;
})();

exports["default"] = Game;
module.exports = exports["default"];

},{"../components/SwipeHandler.js":2,"../prefabs/Device.js":3,"../prefabs/SliceBody.js":4}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Preload = (function () {
  function Preload() {
    _classCallCheck(this, Preload);

    this.preloadAsset = null;
    this.ready = false;
  }

  _createClass(Preload, [{
    key: "preload",
    value: function preload() {

      var style = { font: "65px dymaxionscriptregular", fill: "#222", align: "center" };
      this.instructionText = this.add.text(-20, -20, ".", style);
      this.instructionText.alpha = 0;

      this.load.image("loading_bg", "assets/images/loading_bg.jpg");
    }
  }, {
    key: "create",
    value: function create() {

      //background for game
      this.add.sprite(0, 0, "loading_bg");

      this.preloadAsset = this.add.sprite(this.game.width / 2, this.game.height / 2, "preloader");
      this.preloadAsset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.preloadAsset);

      //do all your loading here
      this.load.atlasJSONHash("devices", "assets/images/sprites/devices.png", "assets/images/sprites/devices.json");
      this.load.image("gamebg", "assets/images/gamebg.png");
      this.load.image("triangle", "assets/images/sprites/triangle.png");
      this.load.image("zoid", "assets/images/sprites/zoid.png");

      //staaaart load
      this.load.start();
    }
  }, {
    key: "update",
    value: function update() {

      if (this.ready) {
        this.game.state.start("game");
      }
    }
  }, {
    key: "onLoadComplete",
    value: function onLoadComplete() {
      this.ready = true;
    }
  }]);

  return Preload;
})();

exports["default"] = Preload;
module.exports = exports["default"];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcZ3J1bnQtYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL3NsaWNlL3NyYy9hcHAuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL3NsaWNlL3NyYy9jb21wb25lbnRzL1N3aXBlSGFuZGxlci5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvc2xpY2Uvc3JjL3ByZWZhYnMvRGV2aWNlLmpzIiwiQzovVXNlcnMvVHJhdmlzL0Rlc2t0b3AvSFRNTDUgR2FtZXMgQm9vay9leGFtcGxlcy9zbGljZS9zcmMvcHJlZmFicy9TbGljZUJvZHkuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL3NsaWNlL3NyYy9zdGF0ZXMvQm9vdC5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvc2xpY2Uvc3JjL3N0YXRlcy9HYW1lLmpzIiwiQzovVXNlcnMvVHJhdmlzL0Rlc2t0b3AvSFRNTDUgR2FtZXMgQm9vay9leGFtcGxlcy9zbGljZS9zcmMvc3RhdGVzL1ByZWxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OzRCQ0dpQixrQkFBa0I7Ozs7K0JBQ2YscUJBQXFCOzs7OzRCQUN4QixrQkFBa0I7Ozs7QUFKbkMsSUFBSSxJQUFJLENBQUM7O0FBTVQsTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFZO0FBQzFCLE1BQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0s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Q0FBQyxDQUFDOztBQUV6QyxVQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1RCxVQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7O0FBRzlDLFVBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxtQ0FBbUMsRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDO0FBQzlHLFVBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0FBQ3RELFVBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ2xFLFVBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDOzs7QUFHMUQsVUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNuQjs7O1dBRUssa0JBQUc7O0FBRVAsVUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2IsWUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO09BQy9CO0tBRUY7OztXQUVhLDBCQUFHO0FBQ2YsVUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDbkI7OztTQS9Da0IsT0FBTzs7O3FCQUFQLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXHJcbnZhciBnYW1lO1xyXG5cclxuaW1wb3J0IEJvb3QgZnJvbSBcIi4vc3RhdGVzL0Jvb3QuanNcIjtcclxuaW1wb3J0IFByZWxvYWQgZnJvbSBcIi4vc3RhdGVzL1ByZWxvYWQuanNcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vc3RhdGVzL0dhbWUuanNcIjtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShcIjEwMCVcIiwgXCIxMDAlXCIsIFBoYXNlci5BVVRPLCAnZ2FtZScpO1xyXG4gIGdhbWUuc3RhdGUuYWRkKCdib290JywgQm9vdCk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcclxuICBnYW1lLnN0YXRlLmFkZCgnZ2FtZScsIEdhbWUpO1xyXG4gIGdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTtcclxufTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTd2lwZUhhbmRsZXIgZXh0ZW5kcyBQaGFzZXIuR3JvdXAge1xyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKGdhbWUpIHtcclxuXHJcblx0XHRzdXBlcihnYW1lKTtcclxuXHRcdHRoaXMuZ2FtZS5pbnB1dC5vblVwLmFkZCh0aGlzLmlucHV0VXAsIHRoaXMpO1xyXG5cclxuICBcdFx0dGhpcy5zd2lwZVN0YXJ0ID0gbmV3IFBoYXNlci5TaWduYWwoKTtcclxuICBcdFx0dGhpcy5zd2lwZUVuZCA9ICBuZXcgUGhhc2VyLlNpZ25hbCgpO1xyXG5cclxuICBcdFx0dGhpcy5zd2lwaW5nID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHJcblx0dXBkYXRlKCkge1xyXG5cdFx0aWYoIHRoaXMuZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyLmlzRG93biApIHtcclxuXHQgICAgICBpZiggIXRoaXMuc3dpcGluZyApIHtcclxuXHQgICAgICAgIGlmKCB0aGlzLmdhbWUuaW5wdXQuc3BlZWQuZ2V0TWFnbml0dWRlKCkgPiAyMCApIHtcclxuXHQgICAgICAgICAgdGhpcy5zd2lwaW5nID0gdHJ1ZTtcclxuXHQgICAgICAgICAgdGhpcy5zd2lwZVN0YXJ0LmRpc3BhdGNoKHRoaXMpO1xyXG5cdCAgICAgICAgfVxyXG5cdCAgICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICBpZih0aGlzLmdhbWUuaW5wdXQuc3BlZWQuZ2V0TWFnbml0dWRlKCkgPCAxMCApIHtcclxuXHQgICAgICAgICAgdGhpcy5zd2lwaW5nID0gZmFsc2U7XHJcblx0ICAgICAgICAgIHRoaXMuc3dpcGVFbmQuZGlzcGF0Y2godGhpcyk7XHJcblx0ICAgICAgICB9XHJcblx0ICAgICAgfVxyXG5cdCAgICB9XHJcblxyXG5cdH1cclxuXHJcblx0aW5wdXRVcCgpIHtcclxuXHRcdGlmKHRoaXMuZ2VzdHVyaW5nKSB7XHJcblx0XHRcdHRoaXMuc3dpcGluZyA9IGZhbHNlO1xyXG5cdCAgICBcdHRoaXMuc3dpcGVFbmQuZGlzcGF0Y2godGhpcyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERldmljZSBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xyXG5cclxuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBmcmFtZSwgY29sbGlzaW9uR3JvdXAsIHNsaWNlR3JvdXApIHsgIFxyXG4gIFx0c3VwZXIoZ2FtZSwgeCwgeSwgJ2RldmljZXMnKTtcclxuXHJcbiAgXHQvLyBpbml0aWFsaXplIHlvdXIgcHJlZmFiIGhlcmVcclxuICBcdHRoaXMuZnJhbWVOYW1lID0gZnJhbWU7XHJcblxyXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oLjUsLjUpO1xyXG5cclxuICBcdHRoaXMuZ2FtZS5waHlzaWNzLnAyLmVuYWJsZSh0aGlzKTtcclxuICAgIHRoaXMuYm9keS5zZXRDb2xsaXNpb25Hcm91cChjb2xsaXNpb25Hcm91cCk7XHJcbiAgICB0aGlzLmJvZHkuY29sbGlkZXMoc2xpY2VHcm91cCk7XHJcbiAgICAvL3RoaXMuYm9keS5jb2xsaWRlV29ybGRCb3VuZHMgPSBmYWxzZTtcclxuICB9XHJcblxyXG5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgaWYodGhpcy5ib2R5LnkgPiAzMDAwKSB7XHJcbiAgICAgICAgdGhpcy5raWxsKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsYXVuY2goKSB7XHJcblxyXG4gICAgICB0aGlzLmJvZHkuc2V0WmVyb1ZlbG9jaXR5KCk7XHJcbiAgICAgIHRoaXMuYm9keS5hbmd1bGFyVmVsb2NpdHkgPSAwO1xyXG5cclxuICAgICAgXHRpZihQaGFzZXIuVXRpbHMuY2hhbmNlUm9sbCg1MCkpIHtcclxuICAgICAgXHRcdHRoaXMuYm9keS54ID0gdGhpcy5nYW1lLndpZHRoO1xyXG4gICAgICAgICAgdGhpcy5ib2R5LnkgPSB0aGlzLmdhbWUuaGVpZ2h0ICsgMTAwO1xyXG4gICAgICBcdFx0Ly90aGlzLmJvZHkudmVsb2NpdHkueCA9IDgwMDtcclxuICAgICAgXHRcdC8vdGhpcy5ib2R5LnZlbG9jaXR5LnggPSAyNTAwO1xyXG4gICAgICBcdFx0dGhpcy5ib2R5LmFwcGx5Rm9yY2UoIFs4MDAsIDI1MDBdLCB0aGlzLmJvZHkueCArIDIwLCB0aGlzLmJvZHkueSApO1xyXG4gICAgICBcdH0gZWxzZSB7XHJcbiAgICAgIFx0XHR0aGlzLmJvZHkueCA9IDA7XHJcbiAgICAgICAgICB0aGlzLmJvZHkueSA9IHRoaXMuZ2FtZS5oZWlnaHQgKyAxMDA7XHJcbiAgICAgIFx0XHR0aGlzLmJvZHkuYXBwbHlGb3JjZSggWy04MDAsIDI1MDBdLCB0aGlzLmJvZHkueCAtIDIwLCB0aGlzLmJvZHkueSApO1xyXG4gICAgICBcdH1cclxuXHJcbiAgICAgICAgdGhpcy5saWZlID0gMjA7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTbGljZUJvZHkgZXh0ZW5kcyBQaGFzZXIuUGh5c2ljcy5QMi5Cb2R5IHtcclxuXHJcbiAgY29uc3RydWN0b3IoZ2FtZSwgcmF5LCBjb2xsaXNpb25Hcm91cCwgc2xpY2VHcm91cCkgeyAgXHJcbiAgICBzdXBlcihnYW1lLCBudWxsLCByYXkueCwgcmF5LnksIDEpO1xyXG5cclxuICAgIHRoaXMucmF5ID0gcmF5O1xyXG4gICAgdGhpcy5hZGRSZWN0YW5nbGUocmF5Lmxlbmd0aCwyLDAsMCxyYXkuYW5nbGUpO1xyXG5cclxuICAgIHRoaXMuc2V0Q29sbGlzaW9uR3JvdXAoc2xpY2VHcm91cCk7XHJcbiAgICB0aGlzLmNvbGxpZGVzKGNvbGxpc2lvbkdyb3VwKTtcclxuICAgIHRoaXMuYWRkVG9Xb3JsZCgpO1xyXG4gICAgdGhpcy5zdGF0aWMgPSB0cnVlO1xyXG4gICAgdGhpcy5vbkJlZ2luQ29udGFjdC5hZGQodGhpcy5zbGljZUhpdCwgdGhpcyk7XHJcblxyXG4gICAvLyB0aGlzLmRlYnVnID0gdHJ1ZTtcclxuICAgIHRoaXMubGlmZSA9IDEwO1xyXG4gICAgdGhpcy5zdWNjZXNzID0gbmV3IFBoYXNlci5TaWduYWwoKTtcclxuICB9XHJcbiAgXHJcblxyXG4gIHVwZGF0ZUxpZmUoKSB7XHJcbiAgICB0aGlzLmxpZmUgLS07XHJcblxyXG4gICAgaWYodGhpcy5saWZlIDw9IDApIHtcclxuICAgICAgdGhpcy5yZW1vdmVGcm9tV29ybGQoKTtcclxuICAgICAgdGhpcy5ncm91cC5yZW1vdmUodGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzbGljZUhpdChvdGhlcikge1xyXG4gICAgb3RoZXIuc3ByaXRlLmtpbGwoKTtcclxuICAgIHRoaXMuc3VjY2Vzcy5kaXNwYXRjaCh0aGlzLCBvdGhlcik7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9vdCB7IFxyXG5cclxuICBwcmVsb2FkKCkge1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdwcmVsb2FkZXInLCAnYXNzZXRzL2ltYWdlcy9sb2FkaW5nX2Jhci5wbmcnKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuXHJcbiAgXHR0aGlzLnNjYWxlLnNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuUkVTSVpFO1xyXG5cdHRoaXMuc2NhbGUuc2V0TWluTWF4KDI2MCw0ODAsNzY4LDEwMjQpO1xyXG5cclxuXHRpZiAodGhpcy5nYW1lLmRldmljZS5kZXNrdG9wID09IGZhbHNlKVxyXG5cdHtcclxuXHQgIFx0dGhpcy5zY2FsZS5mb3JjZU9yaWVudGF0aW9uKGZhbHNlLCB0cnVlKTsgXHJcblx0fVxyXG5cclxuICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgncHJlbG9hZCcpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbiIsImltcG9ydCBTbGljZUJvZHkgZnJvbSBcIi4uL3ByZWZhYnMvU2xpY2VCb2R5LmpzXCI7XHJcbmltcG9ydCBEZXZpY2UgZnJvbSBcIi4uL3ByZWZhYnMvRGV2aWNlLmpzXCI7XHJcbmltcG9ydCBTd2lwZUhhbmRsZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvU3dpcGVIYW5kbGVyLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHsgXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIHRoaXMuZGV2aWNlVHlwZXMgPSBbIFwiYm95LnBuZ1wiLCBcImZsb3BweS5wbmdcIiwgXCJ3YWxrbWFuLnBuZ1wiIF07XHJcbiAgICB0aGlzLmRldmljZVR5cGVzLmdldFJhbmRvbUVudHJ5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzWyBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogdGhpcy5sZW5ndGgpIF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcblxyXG4gICAgdGhpcy5iZyA9IHRoaXMuYWRkLnNwcml0ZSh0aGlzLmdhbWUud2lkdGgvMiwgdGhpcy5nYW1lLmhlaWdodC8yLCAnZ2FtZWJnJyk7XHJcbiAgICB0aGlzLmJnLmFuY2hvci5zZXQoMC41LCAwLjUpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS53b3JsZC5zZXRCb3VuZHMoLTE1MDAwLCAtMTUwMDAsIDMwMDAwLCAzMDAwMCk7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUGhhc2VyLlBoeXNpY3MuUDJKUyk7XHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5wMi5ncmF2aXR5LnkgPSA3NTA7XHJcbiAgICB0aGlzLmdhbWUucGh5c2ljcy5wMi5yZXN0aXR1dGlvbiA9IDAuODtcclxuXHJcbiAgXHR0aGlzLmRyYXdpbmdTbGljZSA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICAvL3RoaXMuZ2FtZS5pbnB1dC5vbkRvd24uYWRkKHRoaXMuaW5wdXREb3duLCB0aGlzKTtcclxuICAgIC8vdGhpcy5nYW1lLmlucHV0Lm9uVXAuYWRkKHRoaXMuaW5wdXRVcCwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5kZXZpY2VzID0gdGhpcy5hZGQuZ3JvdXAoKTtcclxuICBcdHRoaXMudHJhaWxzID0gdGhpcy5hZGQuZ3JvdXAoKTtcclxuXHJcbiAgXHR0aGlzLnNsaWNlU3RhcnQgPSB7IHg6IDAsIHk6IDAgfTtcclxuICAgIHRoaXMuc2xpY2VCb2RpZXMgPSBuZXcgUGhhc2VyLkFycmF5U2V0KCk7XHJcblxyXG4gICAgdGhpcy50aW1lciA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZShmYWxzZSk7XHJcbiAgICB0aGlzLnRpbWVyLmxvb3AoMTAwMCwgdGhpcy5zcGF3bldhdmUsIHRoaXMpO1xyXG4gICAgdGhpcy50aW1lci5zdGFydCgpO1xyXG5cclxuICAgIHRoaXMuc2NvcmUgPSAwO1xyXG5cclxuICAgIHZhciBzdHlsZSA9IHsgZm9udDogXCI3MHB4IGR5bWF4aW9uc2NyaXB0cmVndWxhclwiLCBmaWxsOiBcIiNmZjAwNDRcIiwgYWxpZ246IFwiY2VudGVyXCIgfTtcclxuICAgIHRoaXMudHh0U2NvcmUgPSB0aGlzLmFkZC50ZXh0KCB0aGlzLmdhbWUud2lkdGggLyAyLCAzMCwgdGhpcy5zY29yZS50b1N0cmluZygpICsgXCIgcHRzXCIsIHN0eWxlKTtcclxuICAgIHRoaXMudHh0U2NvcmUuYW5jaG9yLnNldCgwLjUpO1xyXG5cclxuICAgIHRoaXMuZW1pdHRlciA9IHRoaXMuZ2FtZS5hZGQuZW1pdHRlcigwLDAsIDIwMCk7XHJcbiAgICB0aGlzLmVtaXR0ZXIgPSB0aGlzLmVtaXR0ZXIubWFrZVBhcnRpY2xlcyhbJ3RyaWFuZ2xlJywgJ3pvaWQnXSk7XHJcblxyXG4gICAgdGhpcy5zbGljZWRQaWVjZXMgPSB0aGlzLmFkZC5ncm91cCgpO1xyXG4gICAgdGhpcy5kZXZpY2VDb2xsaXNpb25Hcm91cCA9IHRoaXMuZ2FtZS5waHlzaWNzLnAyLmNyZWF0ZUNvbGxpc2lvbkdyb3VwKCk7XHJcbiAgICB0aGlzLnNsaWNlQ29sbGlzaW9uR3JvdXAgPSB0aGlzLmdhbWUucGh5c2ljcy5wMi5jcmVhdGVDb2xsaXNpb25Hcm91cCgpO1xyXG5cclxuICAgIHRoaXMuc3dpcGVIYW5kbGVyID0gbmV3IFN3aXBlSGFuZGxlcih0aGlzLmdhbWUpO1xyXG4gICAgdGhpcy5zd2lwZUhhbmRsZXIuc3dpcGVTdGFydC5hZGQodGhpcy5zd2lwZVN0YXJ0LCB0aGlzKTtcclxuICAgIHRoaXMuc3dpcGVIYW5kbGVyLnN3aXBlRW5kLmFkZCh0aGlzLnN3aXBlRW5kLCB0aGlzKTtcclxuICAgIHRoaXMuYWRkLmV4aXN0aW5nKHRoaXMuc3dpcGVIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLnNwYXduV2F2ZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG5cclxuICAgIGlmKHRoaXMuc3dpcGVIYW5kbGVyLnN3aXBpbmcpIHtcclxuICAgICAgICB0aGlzLmN1ckdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5jdXJHcmFwaGljcy5saW5lU3R5bGUoMTAsIDB4ZmZkOTAwLCAxKTtcclxuICAgICAgICB0aGlzLmN1ckdyYXBoaWNzLm1vdmVUbyh0aGlzLnNsaWNlU3RhcnQueCwgdGhpcy5zbGljZVN0YXJ0LnkpO1xyXG4gICAgICAgIHRoaXMuY3VyR3JhcGhpY3MubGluZVRvKCB0aGlzLmlucHV0LmFjdGl2ZVBvaW50ZXIueCwgdGhpcy5pbnB1dC5hY3RpdmVQb2ludGVyLnkgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNsaWNlQm9kaWVzLmNhbGxBbGwoXCJ1cGRhdGVMaWZlXCIpO1xyXG4gIH1cclxuXHJcbiAgZW5kU2VnbWVudCgpIHtcclxuICAgICB2YXIgcmF5ID0gbmV3IFBoYXNlci5MaW5lKHRoaXMuc2xpY2VTdGFydC54LCB0aGlzLnNsaWNlU3RhcnQueSwgdGhpcy5pbnB1dC5hY3RpdmVQb2ludGVyLngsIHRoaXMuaW5wdXQuYWN0aXZlUG9pbnRlci55KTsgIFx0IFxyXG4gICAgIHZhciBzbGljZUJvZHkgPSBuZXcgU2xpY2VCb2R5KHRoaXMuZ2FtZSwgcmF5LCB0aGlzLmRldmljZUNvbGxpc2lvbkdyb3VwLCB0aGlzLnNsaWNlQ29sbGlzaW9uR3JvdXApO1xyXG5cclxuICAgICAvL2FkZCB0aGUgbGluZSB0byBpdFxyXG4gICAgIHNsaWNlQm9keS5ncm91cCA9IHRoaXMuc2xpY2VCb2RpZXM7XHJcbiAgICAgc2xpY2VCb2R5LnN1Y2Nlc3MuYWRkKHRoaXMuc2xpY2VIaXQsIHRoaXMpO1xyXG4gICAgIHRoaXMuc2xpY2VCb2RpZXMuYWRkKHNsaWNlQm9keSk7XHJcblxyXG4gICAgIC8vIHRoaXMuc2xpY2VCb2R5LnJlbW92ZUZyb21Xb3JsZCgpO1xyXG4gICAvLyAgIHRoaXMuc2xpY2VCb2R5ID0gbnVsbDtcclxuXHJcbiAgIC8vIHRoaXMuc2xpY2VCb2R5LmRlc3Ryb3koKTtcclxuXHJcbiAgICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzLmN1ckdyYXBoaWNzKS50byh7IGFscGhhOiAwIH0sIDgwMCwgUGhhc2VyLkVhc2luZy5RdWFkcmF0aWMuT3V0LCB0cnVlKTtcclxuICB9XHJcblxyXG4gIHNsaWNlSGl0KCBzbGljZUJvZHksIGRldmljZSApIHtcclxuXHJcbiAgICB2YXIgY29vcmRzID0gc2xpY2VCb2R5LnJheS5jb29yZGluYXRlc09uTGluZSgyMCk7XHJcblxyXG4gICAgZm9yKCB2YXIgaSA9IDA7ICBpIDwgY29vcmRzLmxlbmd0aDsgaSsrKSB7IFxyXG4gICAgICB0aGlzLmVtaXR0ZXIueCA9IGNvb3Jkc1tpXVswXTtcclxuICAgICAgdGhpcy5lbWl0dGVyLnkgPSBjb29yZHNbaV1bMV07XHJcbiAgICAgIHRoaXMuZW1pdHRlci5leHBsb2RlKDIwMDAsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2NvcmUrKztcclxuICAgIHRoaXMudHh0U2NvcmUudGV4dCA9IHRoaXMuc2NvcmUudG9TdHJpbmcoKSArIFwiIHB0c1wiO1xyXG5cclxuICAgIHZhciBzbGljZVNwcml0ZSA9IHRoaXMuc2xpY2VkUGllY2VzLmNyZWF0ZShkZXZpY2Uuc3ByaXRlLngsZGV2aWNlLnNwcml0ZS55LGRldmljZS5zcHJpdGUua2V5LGRldmljZS5zcHJpdGUuZnJhbWVOYW1lKTtcclxuICAgIHZhciBoYWxmSGVpZ2h0ID0gTWF0aC5mbG9vcihzbGljZVNwcml0ZS5oZWlnaHQgLyAyKTtcclxuICAgIHNsaWNlU3ByaXRlLmNyb3AobmV3IFBoYXNlci5SZWN0YW5nbGUoMCwwLCBzbGljZVNwcml0ZS53aWR0aCwgaGFsZkhlaWdodCkpO1xyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MucDIuZW5hYmxlKHNsaWNlU3ByaXRlKTtcclxuICAgIHNsaWNlU3ByaXRlLmFuY2hvci5zZXRUbyguNSwgMSk7XHJcbiAgICBzbGljZVNwcml0ZS5ib2R5LnJvdGF0aW9uID0gZGV2aWNlLnJvdGF0aW9uO1xyXG4gICAgc2xpY2VTcHJpdGUuYm9keS5zZXRDb2xsaXNpb25Hcm91cCh0aGlzLmdhbWUucGh5c2ljcy5wMi5ub3RoaW5nQ29sbGlzaW9uR3JvdXApO1xyXG4gICAgc2xpY2VTcHJpdGUuYm9keS5hbmd1bGFyVmVsb2NpdHkgPSAtMS4yO1xyXG5cclxuXHJcbiAgICB2YXIgc2xpY2VTcHJpdGUyID0gdGhpcy5zbGljZWRQaWVjZXMuY3JlYXRlKGRldmljZS5zcHJpdGUueCxkZXZpY2Uuc3ByaXRlLnksZGV2aWNlLnNwcml0ZS5rZXksZGV2aWNlLnNwcml0ZS5mcmFtZU5hbWUpO1xyXG4gICAgc2xpY2VTcHJpdGUyLmNyb3AobmV3IFBoYXNlci5SZWN0YW5nbGUoMCxoYWxmSGVpZ2h0LCBzbGljZVNwcml0ZS53aWR0aCwgaGFsZkhlaWdodCkpO1xyXG4gICAgdGhpcy5nYW1lLnBoeXNpY3MucDIuZW5hYmxlKHNsaWNlU3ByaXRlMik7XHJcbiAgICBzbGljZVNwcml0ZTIuYW5jaG9yLnNldFRvKC41LCAwKTtcclxuICAgIHNsaWNlU3ByaXRlMi5ib2R5LnJvdGF0aW9uID0gZGV2aWNlLnJvdGF0aW9uO1xyXG4gICAgc2xpY2VTcHJpdGUyLmJvZHkuc2V0Q29sbGlzaW9uR3JvdXAodGhpcy5nYW1lLnBoeXNpY3MucDIubm90aGluZ0NvbGxpc2lvbkdyb3VwKTtcclxuICAgIHNsaWNlU3ByaXRlMi5ib2R5LmFuZ3VsYXJWZWxvY2l0eSA9IDEuMjtcclxuXHJcbiAgfVxyXG5cclxuICBzdGFydFNlZ21lbnQoKSB7XHJcblx0ICB0aGlzLnNsaWNlU3RhcnQueCA9IHRoaXMuaW5wdXQuYWN0aXZlUG9pbnRlci54O1xyXG4gIFx0dGhpcy5zbGljZVN0YXJ0LnkgPSB0aGlzLmlucHV0LmFjdGl2ZVBvaW50ZXIueTtcclxuICBcdHRoaXMuY3VyR3JhcGhpY3MgPSBuZXcgUGhhc2VyLkdyYXBoaWNzKHRoaXMuZ2FtZSwgMCwgMCk7XHJcbiAgXHR0aGlzLmN1ckdyYXBoaWNzLmxpbmVTdHlsZSgxMCwgMHhmZmQ5MDAsIDEpO1xyXG4gIFx0dGhpcy50cmFpbHMuYWRkKHRoaXMuY3VyR3JhcGhpY3MpO1xyXG4gIH1cclxuXHJcbiAgc3dpcGVTdGFydCgpIHtcclxuICBcdHRoaXMuc3RhcnRTZWdtZW50KCk7XHJcbiAgfVxyXG5cclxuICBzd2lwZUVuZCgpIHtcclxuXHQgICB0aGlzLmVuZFNlZ21lbnQoKTtcclxuICB9XHJcblxyXG4gIHJlc2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB0aGlzLnR4dFNjb3JlLnggPSB3aWR0aCAvIDI7XHJcblxyXG4gICAgdGhpcy5iZy54ID0gd2lkdGgvMjtcclxuICAgIHRoaXMuYmcueSA9IGhlaWdodC8yO1xyXG4gICAgdGhpcy5iZy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBzcGF3bldhdmUoKSB7XHJcblxyXG4gICAgdmFyIGQgPSB0aGlzLmRldmljZXMuZ2V0Rmlyc3REZWFkKCk7XHJcbiAgICBpZighZCkge1xyXG4gICAgICBkID0gIG5ldyBEZXZpY2UodGhpcy5nYW1lLCAzMDAsIHRoaXMuZ2FtZS5oZWlnaHQgKyAxMDAsIHRoaXMuZGV2aWNlVHlwZXMuZ2V0UmFuZG9tRW50cnkoKSwgdGhpcy5kZXZpY2VDb2xsaXNpb25Hcm91cCwgdGhpcy5zbGljZUNvbGxpc2lvbkdyb3VwKTtcclxuICAgICAgZC5sYXVuY2goKTtcclxuICAgICAgdGhpcy5kZXZpY2VzLmFkZChkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGQucmV2aXZlKCk7XHJcbiAgICAgIGQubGF1bmNoKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWxvYWQge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuXHQgICB0aGlzLnByZWxvYWRBc3NldCA9IG51bGw7XHJcbiAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcmVsb2FkKCkge1xyXG5cclxuICAgIHZhciBzdHlsZSA9IHsgZm9udDogXCI2NXB4IGR5bWF4aW9uc2NyaXB0cmVndWxhclwiLCBmaWxsOiBcIiMyMjJcIiwgYWxpZ246IFwiY2VudGVyXCIgfTtcclxuICAgIHRoaXMuaW5zdHJ1Y3Rpb25UZXh0ID0gdGhpcy5hZGQudGV4dCgtMjAsIC0yMCwgXCIuXCIsIHN0eWxlKTtcclxuICAgIHRoaXMuaW5zdHJ1Y3Rpb25UZXh0LmFscGhhID0gMDtcclxuXHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2xvYWRpbmdfYmcnLCAnYXNzZXRzL2ltYWdlcy9sb2FkaW5nX2JnLmpwZycpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG5cclxuICAgIC8vYmFja2dyb3VuZCBmb3IgZ2FtZVxyXG4gICAgdGhpcy5hZGQuc3ByaXRlKDAsMCwgXCJsb2FkaW5nX2JnXCIpO1xyXG5cclxuICAgIHRoaXMucHJlbG9hZEFzc2V0ID0gdGhpcy5hZGQuc3ByaXRlKHRoaXMuZ2FtZS53aWR0aC8yLHRoaXMuZ2FtZS5oZWlnaHQvMiwgJ3ByZWxvYWRlcicpO1xyXG4gICAgdGhpcy5wcmVsb2FkQXNzZXQuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcclxuXHJcbiAgICB0aGlzLmxvYWQub25Mb2FkQ29tcGxldGUuYWRkT25jZSh0aGlzLm9uTG9hZENvbXBsZXRlLCB0aGlzKTtcclxuICAgIHRoaXMubG9hZC5zZXRQcmVsb2FkU3ByaXRlKHRoaXMucHJlbG9hZEFzc2V0KTtcclxuXHJcbiAgICAvL2RvIGFsbCB5b3VyIGxvYWRpbmcgaGVyZVxyXG4gICAgdGhpcy5sb2FkLmF0bGFzSlNPTkhhc2goJ2RldmljZXMnLCAnYXNzZXRzL2ltYWdlcy9zcHJpdGVzL2RldmljZXMucG5nJywgJ2Fzc2V0cy9pbWFnZXMvc3ByaXRlcy9kZXZpY2VzLmpzb24nKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnZ2FtZWJnJywgJ2Fzc2V0cy9pbWFnZXMvZ2FtZWJnLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCd0cmlhbmdsZScsICdhc3NldHMvaW1hZ2VzL3Nwcml0ZXMvdHJpYW5nbGUucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3pvaWQnLCAnYXNzZXRzL2ltYWdlcy9zcHJpdGVzL3pvaWQucG5nJyk7XHJcblxyXG4gICAgLy9zdGFhYWFydCBsb2FkXHJcbiAgICB0aGlzLmxvYWQuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuXHJcbiAgICBpZih0aGlzLnJlYWR5KSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnZ2FtZScpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIG9uTG9hZENvbXBsZXRlKCkge1xyXG4gICAgdGhpcy5yZWFkeSA9IHRydWU7XHJcbiAgfVxyXG5cclxufSJdfQ==
