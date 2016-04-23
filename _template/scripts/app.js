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
  //hi
  game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
  game.state.add("boot", _statesBootJs2["default"]);
  game.state.add("preload", _statesPreloadJs2["default"]);
  game.state.add("game", _statesGameJs2["default"]);
  game.state.start("boot");
};

},{"./states/Boot.js":2,"./states/Game.js":3,"./states/Preload.js":4}],2:[function(require,module,exports){
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

//require other components

var Game = (function (_Phaser$State) {
  function Game() {
    _classCallCheck(this, Game);

    //object level properties
    _get(Object.getPrototypeOf(Game.prototype), "constructor", this).call(this);
  }

  _inherits(Game, _Phaser$State);

  _createClass(Game, [{
    key: "create",
    value: function create() {}
  }, {
    key: "update",
    value: function update() {}
  }]);

  return Game;
})(Phaser.State);

exports["default"] = Game;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcZ3J1bnQtYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL190ZW1wbGF0ZS9zcmMvYXBwLmpzIiwiQzovVXNlcnMvVHJhdmlzL0Rlc2t0b3AvSFRNTDUgR2FtZXMgQm9vay9leGFtcGxlcy9fdGVtcGxhdGUvc3JjL3N0YXRlcy9Cb290LmpzIiwiQzovVXNlcnMvVHJhdmlzL0Rlc2t0b3AvSFRNTDUgR2FtZXMgQm9vay9leGFtcGxlcy9fdGVtcGxhdGUvc3JjL3N0YXRlcy9HYW1lLmpzIiwiQzovVXNlcnMvVHJhdmlzL0Rlc2t0b3AvSFRNTDUgR2FtZXMgQm9vay9leGFtcGxlcy9fdGVtcGxhdGUvc3JjL3N0YXRlcy9QcmVsb2FkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs0QkNFaUIsa0JBQWtCOzs7OytCQUNmLHFCQUFxQjs7Ozs0QkFDeEIsa0JBQWtCOzs7O0FBSm5DLElBQUksSUFBSSxDQUFDOztBQU9ULE1BQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWTs7QUFFMUIsTUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdEQsTUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSw0QkFBTyxDQUFDO0FBQzdCLE1BQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsK0JBQVUsQ0FBQztBQUNuQyxNQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLDRCQUFPLENBQUM7QUFDN0IsTUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDMUIsQ0FBQzs7Ozs7Ozs7Ozs7OztJQ2RtQixJQUFJO1dBQUosSUFBSTswQkFBSixJQUFJOzs7ZUFBSixJQUFJOztXQUVoQixtQkFBRztBQUNSLFVBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO0tBQy9EOzs7V0FFSyxrQkFBRztBQUNQLFVBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDaEMsVUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2xDOzs7U0FUa0IsSUFBSTs7O3FCQUFKLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNFSixJQUFJO0FBRVosV0FGUSxJQUFJLEdBRVQ7MEJBRkssSUFBSTs7O0FBSXJCLCtCQUppQixJQUFJLDZDQUliO0dBQ1Q7O1lBTGtCLElBQUk7O2VBQUosSUFBSTs7V0FPakIsa0JBQUcsRUFDUjs7O1dBR0ssa0JBQUcsRUFDUjs7O1NBWmtCLElBQUk7R0FBUyxNQUFNLENBQUMsS0FBSzs7cUJBQXpCLElBQUk7Ozs7Ozs7Ozs7Ozs7O0lDRkosT0FBTztBQUVmLFdBRlEsT0FBTyxHQUVaOzBCQUZLLE9BQU87O0FBR3hCLFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0dBQ3BCOztlQUxrQixPQUFPOztXQU9uQixtQkFBRztBQUNSLFVBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0tBQy9EOzs7V0FFSyxrQkFBRzs7O0FBR1AsVUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQzs7QUFFbkMsVUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ2hGLFVBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7O0FBRWxDLFVBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVELFVBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7QUFPdkMsVUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNuQjs7O1dBRUssa0JBQUc7O0FBRVAsVUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2IsWUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO09BQy9CO0tBRUY7OztXQUVhLDBCQUFHO0FBQ2YsVUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDbkI7OztTQXhDa0IsT0FBTzs7O3FCQUFQLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGdhbWU7XHJcblxyXG5pbXBvcnQgQm9vdCBmcm9tIFwiLi9zdGF0ZXMvQm9vdC5qc1wiO1xyXG5pbXBvcnQgUHJlbG9hZCBmcm9tIFwiLi9zdGF0ZXMvUHJlbG9hZC5qc1wiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9zdGF0ZXMvR2FtZS5qc1wiO1xyXG5cclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0Ly9oaVxyXG4gIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoODAwLCA2MDAsIFBoYXNlci5BVVRPLCAnZ2FtZScpO1xyXG4gIGdhbWUuc3RhdGUuYWRkKCdib290JywgQm9vdCk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ3ByZWxvYWQnLCBQcmVsb2FkKTtcclxuICBnYW1lLnN0YXRlLmFkZCgnZ2FtZScsIEdhbWUpO1xyXG4gIGdhbWUuc3RhdGUuc3RhcnQoJ2Jvb3QnKTtcclxufTtcclxuXHJcblxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCb290IHtcclxuXHJcbiAgcHJlbG9hZCgpIHtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgncHJlbG9hZGVyJywgJ2Fzc2V0cy9pbWFnZXMvbG9hZGluZ19iYXIucG5nJyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmdhbWUuaW5wdXQubWF4UG9pbnRlcnMgPSAxO1xyXG4gICAgdGhpcy5nYW1lLnN0YXRlLnN0YXJ0KCdwcmVsb2FkJyk7XHJcbiAgfVxyXG5cclxufSIsIi8vcmVxdWlyZSBvdGhlciBjb21wb25lbnRzXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvL29iamVjdCBsZXZlbCBwcm9wZXJ0aWVzXHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gIH1cclxuXHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICB9XHJcblxyXG5cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWxvYWQge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYXNzZXQgPSBudWxsO1xyXG4gICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHJlbG9hZCgpIHtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnbG9hZGluZ19iZycsICdhc3NldHMvaW1hZ2VzL2xvYWRpbmdfYmcuanBnJyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcblxyXG4gICAgLy9iYWNrZ3JvdW5kIGZvciBnYW1lXHJcbiAgICB0aGlzLmFkZC5zcHJpdGUoMCwwLCBcImxvYWRpbmdfYmdcIik7XHJcblxyXG4gICAgdGhpcy5hc3NldCA9IHRoaXMuYWRkLnNwcml0ZSh0aGlzLmdhbWUud2lkdGgvMix0aGlzLmdhbWUuaGVpZ2h0LzIsICdwcmVsb2FkZXInKTtcclxuICAgIHRoaXMuYXNzZXQuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcclxuXHJcbiAgICB0aGlzLmxvYWQub25Mb2FkQ29tcGxldGUuYWRkT25jZSh0aGlzLm9uTG9hZENvbXBsZXRlLCB0aGlzKTtcclxuICAgIHRoaXMubG9hZC5zZXRQcmVsb2FkU3ByaXRlKHRoaXMuYXNzZXQpO1xyXG5cclxuICAgIC8vZG8gYWxsIHlvdXIgbG9hZGluZyBoZXJlXHJcbiAgICAvL3RoaXMubG9hZC5pbWFnZSgncGxheWVyJywgJ2Fzc2V0cy9pbWFnZXMvcGxheWVyLnBuZycpOyAvL3dpZHRoIGFuZCBoZWlnaHQgb2Ygc3ByaXRlXHJcblxyXG5cclxuICAgIC8vc3RhYWFhcnQgbG9hZFxyXG4gICAgdGhpcy5sb2FkLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcblxyXG4gICAgaWYodGhpcy5yZWFkeSkge1xyXG4gICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ2dhbWUnKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBvbkxvYWRDb21wbGV0ZSgpIHtcclxuICAgIHRoaXMucmVhZHkgPSB0cnVlO1xyXG4gIH1cclxuXHJcbn0iXX0=
