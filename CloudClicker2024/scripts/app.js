(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _Boot = require("./states/Boot.js");

var _Boot2 = _interopRequireWildcard(_Boot);

var _Preload = require("./states/Preload.js");

var _Preload2 = _interopRequireWildcard(_Preload);

var _Game = require("./states/Game.js");

var _Game2 = _interopRequireWildcard(_Game);

var game;

window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
  game.state.add("boot", new _Boot2["default"]());
  game.state.add("preload", new _Preload2["default"]());
  game.state.add("game", new _Game2["default"]());
  game.state.start("boot");
};

},{"./states/Boot.js":2,"./states/Game.js":3,"./states/Preload.js":4}],2:[function(require,module,exports){
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
      this.game.state.start('preload');
    }
  }]);

  return Boot;
})();

exports['default'] = Boot;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Game = (function () {
  function Game() {
    _classCallCheck(this, Game);

    this.clouds;
    this.txtScore;
    this.score;
  }

  _createClass(Game, [{
    key: "create",
    value: function create() {
      this.add.sprite(0, 0, "game_bg");
      this.clouds = this.add.group();

      this.score = 0;
      var style = { font: "24px Arial", fill: "#FFFFFF" };
      this.txtScore = this.add.text(10, 10, this.score.toString(), style);
    }
  }, {
    key: "update",
    value: function update() {
      if (Math.random() < 0.01) {
        var cloud = this.clouds.getFirstDead();
        if (cloud) {
          cloud.x = Math.random() * this.game.width;
          cloud.y = Math.random() * this.game.height;
          cloud.revive();
        } else {
          var cloud = this.clouds.create(Math.random() * this.game.width, Math.random() * this.game.height, "cloud");
          cloud.inputEnabled = true;
          cloud.events.onInputDown.add(this.onCloudClick, this);
        }

        cloud.alpha = 0;
        this.add.tween(cloud).to({ y: "-50", alpha: 1 }, 800, Phaser.Easing.Cubic.Out, true);
      }
    }
  }, {
    key: "onCloudClick",
    value: function onCloudClick(cloud) {
      cloud.kill();
      this.score++;
      this.txtScore.setText(this.score.toString());
    }
  }]);

  return Game;
})();

exports["default"] = Game;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
		value: true
});

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
						this.load.image('cloud', 'assets/images/cloud.png');
						this.load.image('game_bg', 'assets/images/game_bg.jpg');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcZ3J1bnQtYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL0Nsb3VkQ2xpY2tlcjIwMjQvc3JjL2FwcC5qcyIsIkM6L1VzZXJzL1RyYXZpcy9EZXNrdG9wL0hUTUw1IEdhbWVzIEJvb2svZXhhbXBsZXMvQ2xvdWRDbGlja2VyMjAyNC9zcmMvc3RhdGVzL0Jvb3QuanMiLCJDOi9Vc2Vycy9UcmF2aXMvRGVza3RvcC9IVE1MNSBHYW1lcyBCb29rL2V4YW1wbGVzL0Nsb3VkQ2xpY2tlcjIwMjQvc3JjL3N0YXRlcy9HYW1lLmpzIiwiQzovVXNlcnMvVHJhdmlzL0Rlc2t0b3AvSFRNTDUgR2FtZXMgQm9vay9leGFtcGxlcy9DbG91ZENsaWNrZXIyMDI0L3NyYy9zdGF0ZXMvUHJlbG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7b0JDRWlCLGtCQUFrQjs7Ozt1QkFDZixxQkFBcUI7Ozs7b0JBQ3hCLGtCQUFrQjs7OztBQUpuQyxJQUFJLElBQUksQ0FBQzs7QUFNVCxNQUFNLENBQUMsTUFBTSxHQUFHLFlBQVk7QUFDMUIsTUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdEQsTUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLHVCQUFVLENBQUMsQ0FBQztBQUNuQyxNQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsMEJBQWEsQ0FBQyxDQUFDO0FBQ3pDLE1BQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSx1QkFBVSxDQUFDLENBQUM7QUFDbkMsTUFBSSxD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QUFJLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDbEI7OztXQUVLLGtCQUFHOztBQUVOLFVBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtBQUNiLFlBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztPQUMvQjtLQUVGOzs7V0FFYSwwQkFBRztBQUNmLFVBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQ25COzs7U0F2Q2tCLE9BQU87OztxQkFBUCxPQUFPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBnYW1lO1xyXG5cclxuaW1wb3J0IEJvb3QgZnJvbSBcIi4vc3RhdGVzL0Jvb3QuanNcIjtcclxuaW1wb3J0IFByZWxvYWQgZnJvbSBcIi4vc3RhdGVzL1ByZWxvYWQuanNcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vc3RhdGVzL0dhbWUuanNcIjtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSg4MDAsIDYwMCwgUGhhc2VyLkFVVE8sICdnYW1lJyk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ2Jvb3QnLCBuZXcgQm9vdCgpKTtcclxuICBnYW1lLnN0YXRlLmFkZCgncHJlbG9hZCcsIG5ldyBQcmVsb2FkKCkpO1xyXG4gIGdhbWUuc3RhdGUuYWRkKCdnYW1lJywgbmV3IEdhbWUoKSk7XHJcbiAgZ2FtZS5zdGF0ZS5zdGFydCgnYm9vdCcpO1xyXG59O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCb290IHtcclxuICBwcmVsb2FkKCkge1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdwcmVsb2FkZXInLCAnYXNzZXRzL2ltYWdlcy9sb2FkaW5nX2Jhci5wbmcnKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgncHJlbG9hZCcpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuY2xvdWRzO1xyXG5cdFx0dGhpcy50eHRTY29yZTtcclxuXHRcdHRoaXMuc2NvcmU7XHJcblx0fVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgXHR0aGlzLmFkZC5zcHJpdGUoMCwwLFwiZ2FtZV9iZ1wiKTtcclxuICBcdHRoaXMuY2xvdWRzID0gdGhpcy5hZGQuZ3JvdXAoKTtcclxuXHJcbiAgXHR0aGlzLnNjb3JlID0gMDtcclxuICBcdHZhciBzdHlsZSA9IHsgZm9udDogXCIyNHB4IEFyaWFsXCIsIGZpbGw6IFwiI0ZGRkZGRlwiIH07XHJcbiAgXHR0aGlzLnR4dFNjb3JlID0gdGhpcy5hZGQudGV4dCgxMCwxMCx0aGlzLnNjb3JlLnRvU3RyaW5nKCksIHN0eWxlKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICBcdGlmKE1hdGgucmFuZG9tKCkgPCAuMDEpIHtcclxuICBcdFx0dmFyIGNsb3VkID0gdGhpcy5jbG91ZHMuZ2V0Rmlyc3REZWFkKCk7XHJcbiAgXHRcdGlmKGNsb3VkKSB7XHJcbiAgXHRcdFx0Y2xvdWQueCA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLmdhbWUud2lkdGg7XHJcbiAgXHRcdFx0Y2xvdWQueSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLmdhbWUuaGVpZ2h0O1xyXG4gIFx0XHRcdGNsb3VkLnJldml2ZSgpO1xyXG4gIFx0XHR9IGVsc2Uge1xyXG4gIFx0XHRcdHZhciBjbG91ZCA9IHRoaXMuY2xvdWRzLmNyZWF0ZShNYXRoLnJhbmRvbSgpICogdGhpcy5nYW1lLndpZHRoLCBNYXRoLnJhbmRvbSgpICogdGhpcy5nYW1lLmhlaWdodCwgXCJjbG91ZFwiKTtcclxuICBcdFx0XHRjbG91ZC5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gIFx0XHRcdGNsb3VkLmV2ZW50cy5vbklucHV0RG93bi5hZGQodGhpcy5vbkNsb3VkQ2xpY2ssIHRoaXMpO1xyXG4gIFx0XHR9XHJcblxyXG4gIFx0XHRjbG91ZC5hbHBoYSA9IDA7XHJcbiAgXHRcdHRoaXMuYWRkLnR3ZWVuKGNsb3VkKS50byh7IHk6IFwiLTUwXCIsIGFscGhhOiAxIH0sIDgwMCwgUGhhc2VyLkVhc2luZy5DdWJpYy5PdXQsIHRydWUpO1xyXG4gIFx0fVxyXG4gIH1cclxuXHJcbiAgb25DbG91ZENsaWNrKGNsb3VkKSB7XHJcbiAgXHRjbG91ZC5raWxsKCk7XHJcbiAgXHR0aGlzLnNjb3JlICsrO1xyXG4gIFx0dGhpcy50eHRTY29yZS5zZXRUZXh0KHRoaXMuc2NvcmUudG9TdHJpbmcoKSk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZWxvYWQge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5wcmVsb2FkQXNzZXQgPSBudWxsO1xyXG5cdFx0dGhpcy5yZWFkeSA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0cHJlbG9hZCgpIHtcclxuXHRcdHRoaXMubG9hZC5pbWFnZSgnbG9hZGluZ19iZycsICdhc3NldHMvaW1hZ2VzL2xvYWRpbmdfYmcuanBnJyk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGUoKSB7XHJcblxyXG5cdFx0Ly9iYWNrZ3JvdW5kIGZvciBnYW1lXHJcblx0XHR0aGlzLmFkZC5zcHJpdGUoMCwwLCBcImxvYWRpbmdfYmdcIik7XHJcblxyXG5cdFx0dGhpcy5wcmVsb2FkQXNzZXQgPSB0aGlzLmFkZC5zcHJpdGUodGhpcy5nYW1lLndpZHRoLzIsdGhpcy5nYW1lLmhlaWdodC8yLCAncHJlbG9hZGVyJyk7XHJcblx0XHR0aGlzLnByZWxvYWRBc3NldC5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG5cclxuXHRcdHRoaXMubG9hZC5vbkxvYWRDb21wbGV0ZS5hZGRPbmNlKHRoaXMub25Mb2FkQ29tcGxldGUsIHRoaXMpO1xyXG5cdFx0dGhpcy5sb2FkLnNldFByZWxvYWRTcHJpdGUodGhpcy5wcmVsb2FkQXNzZXQpO1xyXG5cclxuXHRcdC8vZG8gYWxsIHlvdXIgbG9hZGluZyBoZXJlXHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoJ2Nsb3VkJywgJ2Fzc2V0cy9pbWFnZXMvY2xvdWQucG5nJyk7XHJcblx0XHR0aGlzLmxvYWQuaW1hZ2UoJ2dhbWVfYmcnLCAnYXNzZXRzL2ltYWdlcy9nYW1lX2JnLmpwZycpO1xyXG5cclxuXHRcdC8vc3RhYWFhcnQgbG9hZFxyXG5cdFx0dGhpcy5sb2FkLnN0YXJ0KCk7XHJcblx0fVxyXG5cclxuXHR1cGRhdGUoKSB7XHJcblxyXG4gICAgaWYodGhpcy5yZWFkeSkge1xyXG4gICAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ2dhbWUnKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBvbkxvYWRDb21wbGV0ZSgpIHtcclxuICAgIHRoaXMucmVhZHkgPSB0cnVlO1xyXG4gIH1cclxuXHJcbn1cclxuIl19
