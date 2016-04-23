(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _statesBootJs = require("./states/Boot.js");

var _statesBootJs2 = _interopRequireDefault(_statesBootJs);

var _statesPreloadJs = require("./states/Preload.js");

var _statesPreloadJs2 = _interopRequireDefault(_statesPreloadJs);

var _statesGameJs = require("./states/Game.js");

var _statesGameJs2 = _interopRequireDefault(_statesGameJs);

var _statesHomeScreenJs = require("./states/HomeScreen.js");

var _statesHomeScreenJs2 = _interopRequireDefault(_statesHomeScreenJs);

var game;

window.onload = function () {
  game = new Phaser.Game(1024, 768, Phaser.AUTO, "game");
  game.state.add("boot", _statesBootJs2["default"]);
  game.state.add("preload", _statesPreloadJs2["default"]);
  game.state.add("game", _statesGameJs2["default"]);
  game.state.add("homescreen", _statesHomeScreenJs2["default"]);
  game.state.start("boot");
};

},{"./states/Boot.js":2,"./states/Game.js":3,"./states/HomeScreen.js":4,"./states/Preload.js":5}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
//require other components

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Game = (function (_Phaser$State) {
  function Game() {
    _classCallCheck(this, Game);

    //object level properties
    _get(Object.getPrototypeOf(Game.prototype), 'constructor', this).call(this);
  }

  _inherits(Game, _Phaser$State);

  _createClass(Game, [{
    key: 'create',
    value: function create() {

      //object level properties
      this.pulling = false;
      this.launched = false;
      this.round = 0;
      this.score = 0;

      //start physics
      this.physics.startSystem(Phaser.Physics.P2JS);
      this.world.setBounds(0, 0, 3000, 768);

      //add game bg
      this.bg = this.add.sprite(0, 0, 'bg');
      this.bg.fixedToCamera = true;

      //impulse chain
      this.forceLine = this.add.graphics(0, 0);

      //create and configure comet
      this.comet = this.add.sprite(300, 330, 'comet');
      this.comet.anchor.set(0.5, 0.5);
      this.physics.p2.enable(this.comet);
      this.comet.body.setCircle(40, 140, -10);
      this.comet.inputEnabled = true;

      //setup asteroids
      this.asteroids = this.add.group();
      this.asteroids.enableBody = true;
      this.asteroids.physicsBodyType = Phaser.Physics.P2JS;

      //emitter
      this.trail = this.add.emitter(this.comet.x, this.comet.y);
      this.trail.makeParticles(['particle1', 'particle2']);
      this.trail.start(false, 3000, 50);
      this.trail.setAlpha(1, 0, 3000);
      this.trail.setScale(0.4, 1, 0.4, 1, 4000);

      //foreground
      this.add.sprite(0, 0, 'fg');

      //Text
      var style = { font: '30px Arial', fill: '#FFF' };
      this.txtScore = this.add.text(20, 20, 'Round 0, Score 0', style);
      this.txtScore.fixedToCamera = true;

      //follow that comet
      this.camera.follow(this.comet);

      //setup game board
      this.resetBoard();
    }
  }, {
    key: 'startPull',
    value: function startPull() {
      this.pulling = true;
      this.game.input.onUp.addOnce(this.endPull, this);
    }
  }, {
    key: 'endPull',
    value: function endPull() {
      this.pulling = false;
      this.launched = true;

      var forceLine = new Phaser.Line(this.input.activePointer.x, this.input.activePointer.y, this.comet.x, this.comet.y);
      this.comet.body.motionState = Phaser.Physics.P2.Body.DYNAMIC;
      this.comet.body.velocity.x = Math.cos(forceLine.angle) * forceLine.length * 6;
      this.comet.body.velocity.y = Math.sin(forceLine.angle) * forceLine.length * 2;
      this.forceLine.clear();

      this.time.events.add(5500, this.resetBoard, this);
    }
  }, {
    key: 'resetBoard',
    value: function resetBoard() {

      this.launched = false;

      this.comet.body.reset();
      this.comet.body.rotation = 0;
      this.comet.body.motionState = Phaser.Physics.P2.Body.STATIC;
      this.comet.events.onInputDown.addOnce(this.startPull, this);
      this.comet.body.x = 300;
      this.comet.body.y = 370;

      this.asteroids.removeAll(true);
      this.asteroids.create(2800, 400, 'asteroid');
      this.asteroids.create(2500, 200, 'asteroid');
      this.asteroids.create(2200, 500, 'asteroid');
      this.asteroids.create(2200, 200, 'asteroid');
      this.asteroids.create(2600, 600, 'asteroid');
      this.asteroids.create(1800, 600, 'asteroid');
      this.asteroids.create(1600, 300, 'asteroid');

      this.asteroids.forEach(function (asteroid) {
        asteroid.mass = 0.7;
        asteroid.checkWorldBounds = true;
        asteroid.body.setCircle(75);
        asteroid.events.onOutOfBounds.addOnce(this.killedAsteroid, this);
      }, this);

      this.round++;
      this.txtScore.text = 'Round: ' + this.round + ' Score: ' + this.score;
    }
  }, {
    key: 'killedAsteroid',
    value: function killedAsteroid() {
      this.score++;
    }
  }, {
    key: 'update',
    value: function update() {

      if (this.pulling) {
        this.forceLine.clear();
        this.forceLine.lineStyle(10, 16777215, 0.8);
        this.forceLine.moveTo(this.input.activePointer.x, this.input.activePointer.y);
        this.forceLine.lineTo(this.comet.x, this.comet.y);
      }

      if (this.launched) {
        this.comet.body.force.y = 270;
      }

      this.trail.x = this.comet.x;
      this.trail.y = this.comet.y;
    }
  }]);

  return Game;
})(Phaser.State);

exports['default'] = Game;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
"use strict";

},{}],5:[function(require,module,exports){
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
      //this.load.image('player', 'assets/images/player.png'); //width and height of sprite
      this.load.image('bg', 'assets/images/smasherBG.jpg');
      this.load.image('particle1', 'assets/images/comet_particle1.png');
      this.load.image('particle2', 'assets/images/comet_particle2.png');
      this.load.image('comet', 'assets/images/comet.png');
      this.load.image('asteroid', 'assets/images/asteroid.png');
      this.load.image('fg', 'assets/images/smasherForeground.png');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcZ3J1bnQtYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL2NydXNoZXIvc3JjL2FwcC5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvY3J1c2hlci9zcmMvc3RhdGVzL0Jvb3QuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL2NydXNoZXIvc3JjL3N0YXRlcy9HYW1lLmpzIiwic3JjL3N0YXRlcy9Ib21lU2NyZWVuLmpzIiwiQzovVXNlcnMvVHJhdmlzL0Rlc2t0b3AvSFRNTDUgR2FtZXMgQm9vay9leGFtcGxlcy9jcnVzaGVyL3NyYy9zdGF0ZXMvUHJlbG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7NEJDRWlCLGtCQUFrQjs7OzsrQkFDZixxQkFBcUI7Ozs7NEJBQ3hCLGtCQUFrQjs7OztrQ0FDWix3QkFBd0I7Ozs7QUFML0MsSUFBSSxJQUFJLENBQUM7O0FBUVQsTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFZO0FBQzFCLE1BQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZELE1BQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sNEJBQU8sQ0FBQztBQUM3QixNQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLCtCQUFVLENBQUM7QUFDbkMsTUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSw0QkFBTyxDQUFDO0FBQzdCLE1BQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFD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QUFLLENBQUMsV0FBVyxFQUFFLG1DQUFtQyxDQUFDLENBQUM7QUFDbEUsVUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLHlCQUF5QixDQUFDLENBQUM7QUFDcEQsVUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLDRCQUE0QixDQUFDLENBQUM7QUFDMUQsVUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLHFDQUFxQyxDQUFDLENBQUM7OztBQUk3RCxVQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ25COzs7V0FFSyxrQkFBRzs7QUFFUCxVQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDYixZQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7T0FDL0I7S0FFRjs7O1dBRWEsMEJBQUc7QUFDZixVQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztLQUNuQjs7O1NBOUNrQixPQUFPOzs7cUJBQVAsT0FBTyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZ2FtZTtcclxuXHJcbmltcG9ydCBCb290IGZyb20gXCIuL3N0YXRlcy9Cb290LmpzXCI7XHJcbmltcG9ydCBQcmVsb2FkIGZyb20gXCIuL3N0YXRlcy9QcmVsb2FkLmpzXCI7XHJcbmltcG9ydCBHYW1lIGZyb20gXCIuL3N0YXRlcy9HYW1lLmpzXCI7XHJcbmltcG9ydCBIb21lU2NyZWVuIGZyb20gXCIuL3N0YXRlcy9Ib21lU2NyZWVuLmpzXCI7XHJcblxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDEwMjQsIDc2OCwgUGhhc2VyLkFVVE8sICdnYW1lJyk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBCb290KTtcclxuICBnYW1lLnN0YXRlLmFkZCgncHJlbG9hZCcsIFByZWxvYWQpO1xyXG4gIGdhbWUuc3RhdGUuYWRkKCdnYW1lJywgR2FtZSk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ2hvbWVzY3JlZW4nLCBIb21lU2NyZWVuKTtcclxuICBnYW1lLnN0YXRlLnN0YXJ0KCdib290Jyk7XHJcbn07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9vdCB7XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3ByZWxvYWRlcicsICdhc3NldHMvaW1hZ2VzL2xvYWRpbmdfYmFyLnBuZycpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgdGhpcy5nYW1lLmlucHV0Lm1heFBvaW50ZXJzID0gMTtcclxuICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgncHJlbG9hZCcpO1xyXG4gIH1cclxuXHJcbn0iLCIvL3JlcXVpcmUgb3RoZXIgY29tcG9uZW50c1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy9vYmplY3QgbGV2ZWwgcHJvcGVydGllc1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIFxyXG4gICAgLy9vYmplY3QgbGV2ZWwgcHJvcGVydGllc1xyXG4gICAgdGhpcy5wdWxsaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmxhdW5jaGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnJvdW5kID0gMDtcclxuICAgIHRoaXMuc2NvcmUgPSAwO1xyXG4gICAgXHJcbiAgICAvL3N0YXJ0IHBoeXNpY3NcclxuICAgIHRoaXMucGh5c2ljcy5zdGFydFN5c3RlbShQaGFzZXIuUGh5c2ljcy5QMkpTKTtcclxuICAgIHRoaXMud29ybGQuc2V0Qm91bmRzKDAsIDAsIDMwMDAsIDc2OCk7XHJcbiAgICBcclxuICAgIC8vYWRkIGdhbWUgYmdcclxuICAgIHRoaXMuYmcgPSB0aGlzLmFkZC5zcHJpdGUoMCwwLCdiZycpO1xyXG4gICAgdGhpcy5iZy5maXhlZFRvQ2FtZXJhID10cnVlO1xyXG4gICAgXHJcbiAgICAvL2ltcHVsc2UgY2hhaW5cclxuICAgIHRoaXMuZm9yY2VMaW5lID0gdGhpcy5hZGQuZ3JhcGhpY3MoMCwwKTtcclxuICAgIFxyXG4gICAgLy9jcmVhdGUgYW5kIGNvbmZpZ3VyZSBjb21ldFxyXG4gICAgdGhpcy5jb21ldCA9IHRoaXMuYWRkLnNwcml0ZSgzMDAsMzMwLCdjb21ldCcpO1xyXG4gICAgdGhpcy5jb21ldC5hbmNob3Iuc2V0KC41LCAuNSk7XHJcbiAgICB0aGlzLnBoeXNpY3MucDIuZW5hYmxlKHRoaXMuY29tZXQpO1xyXG4gICAgdGhpcy5jb21ldC5ib2R5LnNldENpcmNsZSg0MCwgMTQwLCAtMTApO1xyXG4gICAgdGhpcy5jb21ldC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgXHJcbiAgICAvL3NldHVwIGFzdGVyb2lkc1xyXG4gICAgdGhpcy5hc3Rlcm9pZHMgPSB0aGlzLmFkZC5ncm91cCgpO1xyXG4gICAgdGhpcy5hc3Rlcm9pZHMuZW5hYmxlQm9keSA9IHRydWU7XHJcbiAgICB0aGlzLmFzdGVyb2lkcy5waHlzaWNzQm9keVR5cGUgPSBQaGFzZXIuUGh5c2ljcy5QMkpTO1xyXG4gICAgXHJcbiAgICAvL2VtaXR0ZXJcclxuICAgIHRoaXMudHJhaWwgPSB0aGlzLmFkZC5lbWl0dGVyKHRoaXMuY29tZXQueCwgdGhpcy5jb21ldC55KTtcclxuICAgIHRoaXMudHJhaWwubWFrZVBhcnRpY2xlcyhbJ3BhcnRpY2xlMScsICdwYXJ0aWNsZTInXSk7XHJcbiAgICB0aGlzLnRyYWlsLnN0YXJ0KGZhbHNlLCAzMDAwLCA1MCk7XHJcbiAgICB0aGlzLnRyYWlsLnNldEFscGhhKDEsIDAsIDMwMDApO1xyXG4gICAgdGhpcy50cmFpbC5zZXRTY2FsZSgwLjQsIDEsIDAuNCwgMSwgNDAwMCk7XHJcbiAgICBcclxuICAgIC8vZm9yZWdyb3VuZFxyXG4gICAgdGhpcy5hZGQuc3ByaXRlKDAsMCwgJ2ZnJyk7XHJcbiAgICBcclxuICAgIC8vVGV4dFxyXG4gICAgdmFyIHN0eWxlID0geyBmb250OiBcIjMwcHggQXJpYWxcIiwgZmlsbDogXCIjRkZGXCIgfTtcclxuICAgIHRoaXMudHh0U2NvcmUgPSB0aGlzLmFkZC50ZXh0KDIwLCAyMCwgXCJSb3VuZCAwLCBTY29yZSAwXCIsIHN0eWxlKTtcclxuICAgIHRoaXMudHh0U2NvcmUuZml4ZWRUb0NhbWVyYSA9IHRydWU7XHJcbiAgICBcclxuICAgIC8vZm9sbG93IHRoYXQgY29tZXRcclxuICAgIHRoaXMuY2FtZXJhLmZvbGxvdyh0aGlzLmNvbWV0KTtcclxuICAgIFxyXG4gICAgLy9zZXR1cCBnYW1lIGJvYXJkXHJcbiAgICB0aGlzLnJlc2V0Qm9hcmQoKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0UHVsbCgpIHtcclxuICAgIHRoaXMucHVsbGluZyA9IHRydWU7XHJcbiAgICB0aGlzLmdhbWUuaW5wdXQub25VcC5hZGRPbmNlKHRoaXMuZW5kUHVsbCwgdGhpcyk7ICBcclxuICB9XHJcbiAgXHJcbiAgZW5kUHVsbCgpIHtcclxuICAgIHRoaXMucHVsbGluZyA9ICBmYWxzZTtcclxuICAgIHRoaXMubGF1bmNoZWQgPSB0cnVlO1xyXG4gICAgXHJcbiAgICB2YXIgZm9yY2VMaW5lID0gbmV3IFBoYXNlci5MaW5lKHRoaXMuaW5wdXQuYWN0aXZlUG9pbnRlci54LCB0aGlzLmlucHV0LmFjdGl2ZVBvaW50ZXIueSwgdGhpcy5jb21ldC54LCB0aGlzLmNvbWV0LnkpO1xyXG4gICAgdGhpcy5jb21ldC5ib2R5Lm1vdGlvblN0YXRlID0gIFBoYXNlci5QaHlzaWNzLlAyLkJvZHkuRFlOQU1JQztcclxuICAgIHRoaXMuY29tZXQuYm9keS52ZWxvY2l0eS54ID0gTWF0aC5jb3MoZm9yY2VMaW5lLmFuZ2xlKSAqIGZvcmNlTGluZS5sZW5ndGggKiA2O1xyXG4gICAgdGhpcy5jb21ldC5ib2R5LnZlbG9jaXR5LnkgPSBNYXRoLnNpbihmb3JjZUxpbmUuYW5nbGUpICogZm9yY2VMaW5lLmxlbmd0aCAqIDI7XHJcbiAgICB0aGlzLmZvcmNlTGluZS5jbGVhcigpO1xyXG4gICAgXHJcbiAgICB0aGlzLnRpbWUuZXZlbnRzLmFkZCg1NTAwLCB0aGlzLnJlc2V0Qm9hcmQsIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRCb2FyZCgpIHtcclxuXHJcbiAgICB0aGlzLmxhdW5jaGVkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5jb21ldC5ib2R5LnJlc2V0KCk7XHJcbiAgICB0aGlzLmNvbWV0LmJvZHkucm90YXRpb24gPSAwO1xyXG4gICAgdGhpcy5jb21ldC5ib2R5Lm1vdGlvblN0YXRlID0gIFBoYXNlci5QaHlzaWNzLlAyLkJvZHkuU1RBVElDO1xyXG4gICAgdGhpcy5jb21ldC5ldmVudHMub25JbnB1dERvd24uYWRkT25jZSh0aGlzLnN0YXJ0UHVsbCwgdGhpcyk7XHJcbiAgICB0aGlzLmNvbWV0LmJvZHkueCA9IDMwMDtcclxuICAgIHRoaXMuY29tZXQuYm9keS55ID0gMzcwO1xyXG4gICAgXHJcbiAgICB0aGlzLmFzdGVyb2lkcy5yZW1vdmVBbGwodHJ1ZSk7XHJcbiAgICB0aGlzLmFzdGVyb2lkcy5jcmVhdGUoMjgwMCwgNDAwLCAnYXN0ZXJvaWQnKTtcclxuICAgIHRoaXMuYXN0ZXJvaWRzLmNyZWF0ZSgyNTAwLCAyMDAsICdhc3Rlcm9pZCcpO1xyXG4gICAgdGhpcy5hc3Rlcm9pZHMuY3JlYXRlKDIyMDAsIDUwMCwgJ2FzdGVyb2lkJyk7XHJcbiAgICB0aGlzLmFzdGVyb2lkcy5jcmVhdGUoMjIwMCwgMjAwLCAnYXN0ZXJvaWQnKTtcclxuICAgIHRoaXMuYXN0ZXJvaWRzLmNyZWF0ZSgyNjAwLCA2MDAsICdhc3Rlcm9pZCcpO1xyXG4gICAgdGhpcy5hc3Rlcm9pZHMuY3JlYXRlKDE4MDAsIDYwMCwgJ2FzdGVyb2lkJyk7XHJcbiAgICB0aGlzLmFzdGVyb2lkcy5jcmVhdGUoMTYwMCwgMzAwLCAnYXN0ZXJvaWQnKTtcclxuICAgIFxyXG4gICAgdGhpcy5hc3Rlcm9pZHMuZm9yRWFjaChcclxuICAgICAgZnVuY3Rpb24oYXN0ZXJvaWQpIHtcclxuICAgICAgICBhc3Rlcm9pZC5tYXNzID0gLjc7XHJcbiAgICAgICAgYXN0ZXJvaWQuY2hlY2tXb3JsZEJvdW5kcyA9IHRydWU7XHJcbiAgICAgICAgYXN0ZXJvaWQuYm9keS5zZXRDaXJjbGUoNzUpO1xyXG4gICAgICAgIGFzdGVyb2lkLmV2ZW50cy5vbk91dE9mQm91bmRzLmFkZE9uY2UodGhpcy5raWxsZWRBc3Rlcm9pZCwgdGhpcylcclxuICAgICAgfSwgXHJcbiAgICAgIHRoaXNcclxuICAgICk7XHJcbiAgICBcclxuICAgIHRoaXMucm91bmQgKys7XHJcbiAgICB0aGlzLnR4dFNjb3JlLnRleHQgPSBcIlJvdW5kOiBcIiArIHRoaXMucm91bmQgKyBcIiBTY29yZTogXCIgKyB0aGlzLnNjb3JlO1xyXG4gICAgICBcclxuICAgICAgXHJcbiAgfVxyXG4gIFxyXG4gIGtpbGxlZEFzdGVyb2lkKCkge1xyXG4gICAgdGhpcy5zY29yZSArKztcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIFxyXG4gICAgaWYodGhpcy5wdWxsaW5nICkge1xyXG4gICAgICAgIHRoaXMuZm9yY2VMaW5lLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5mb3JjZUxpbmUubGluZVN0eWxlKDEwLCAweGZmZmZmZiwgLjgpO1xyXG4gICAgICAgIHRoaXMuZm9yY2VMaW5lLm1vdmVUbyggdGhpcy5pbnB1dC5hY3RpdmVQb2ludGVyLngsIHRoaXMuaW5wdXQuYWN0aXZlUG9pbnRlci55KTtcclxuICAgICAgICB0aGlzLmZvcmNlTGluZS5saW5lVG8odGhpcy5jb21ldC54LCB0aGlzLmNvbWV0LnkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZih0aGlzLmxhdW5jaGVkKSB7XHJcbiAgICAgIHRoaXMuY29tZXQuYm9keS5mb3JjZS55ID0gMjcwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0aGlzLnRyYWlsLnggPSB0aGlzLmNvbWV0Lng7XHJcbiAgICB0aGlzLnRyYWlsLnkgPSB0aGlzLmNvbWV0Lnk7XHJcbiAgICBcclxuICB9XHJcblxyXG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJaUlzSW1acGJHVWlPaUpET2k5VmMyVnljeTlVY21GMmFYTXZSR1Z6YTNSdmNDOUlWRTFNTlNCSFlXMWxjeUJDYjI5ckwyVjRZVzF3YkdWekwyTnlkWE5vWlhJdmMzSmpMM04wWVhSbGN5OUliMjFsVTJOeVpXVnVMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2x0ZGZRPT0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVsb2FkIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmFzc2V0ID0gbnVsbDtcclxuICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2xvYWRpbmdfYmcnLCAnYXNzZXRzL2ltYWdlcy9sb2FkaW5nX2JnLmpwZycpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG5cclxuICAgIC8vYmFja2dyb3VuZCBmb3IgZ2FtZVxyXG4gICAgdGhpcy5hZGQuc3ByaXRlKDAsMCwgXCJsb2FkaW5nX2JnXCIpO1xyXG5cclxuICAgIHRoaXMuYXNzZXQgPSB0aGlzLmFkZC5zcHJpdGUodGhpcy5nYW1lLndpZHRoLzIsdGhpcy5nYW1lLmhlaWdodC8yLCAncHJlbG9hZGVyJyk7XHJcbiAgICB0aGlzLmFzc2V0LmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XHJcblxyXG4gICAgdGhpcy5sb2FkLm9uTG9hZENvbXBsZXRlLmFkZE9uY2UodGhpcy5vbkxvYWRDb21wbGV0ZSwgdGhpcyk7XHJcbiAgICB0aGlzLmxvYWQuc2V0UHJlbG9hZFNwcml0ZSh0aGlzLmFzc2V0KTtcclxuXHJcbiAgICAvL2RvIGFsbCB5b3VyIGxvYWRpbmcgaGVyZVxyXG4gICAgLy90aGlzLmxvYWQuaW1hZ2UoJ3BsYXllcicsICdhc3NldHMvaW1hZ2VzL3BsYXllci5wbmcnKTsgLy93aWR0aCBhbmQgaGVpZ2h0IG9mIHNwcml0ZVxyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdiZycsICdhc3NldHMvaW1hZ2VzL3NtYXNoZXJCRy5qcGcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgncGFydGljbGUxJywgJ2Fzc2V0cy9pbWFnZXMvY29tZXRfcGFydGljbGUxLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdwYXJ0aWNsZTInLCAnYXNzZXRzL2ltYWdlcy9jb21ldF9wYXJ0aWNsZTIucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2NvbWV0JywgJ2Fzc2V0cy9pbWFnZXMvY29tZXQucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2FzdGVyb2lkJywgJ2Fzc2V0cy9pbWFnZXMvYXN0ZXJvaWQucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2ZnJywgJ2Fzc2V0cy9pbWFnZXMvc21hc2hlckZvcmVncm91bmQucG5nJyk7XHJcbiAgICBcclxuXHJcbiAgICAvL3N0YWFhYXJ0IGxvYWRcclxuICAgIHRoaXMubG9hZC5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG5cclxuICAgIGlmKHRoaXMucmVhZHkpIHtcclxuICAgICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdnYW1lJyk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgb25Mb2FkQ29tcGxldGUoKSB7XHJcbiAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcclxuICB9XHJcblxyXG59Il19
