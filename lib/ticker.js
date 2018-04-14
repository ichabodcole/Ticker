'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ticker = exports.TickerState = exports.TickerEvent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Ticker Event Types
var TickerEvent = {
  TICK: 'TICK',
  START: 'START',
  STOP: 'STOP'

  // Ticker States
};var TickerState = {
  STOPPED: 'STOPPED',
  TICKING: 'TICKING'
};

var Ticker = function (_EventEmitter) {
  _inherits(Ticker, _EventEmitter);

  function Ticker() {
    var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;

    _classCallCheck(this, Ticker);

    var _this = _possibleConstructorReturn(this, (Ticker.__proto__ || Object.getPrototypeOf(Ticker)).call(this));

    _this._intervalId = null;
    _this._interval = interval;

    _this.state = null;
    _this.state = TickerState.STOPPED;
    return _this;
  }

  _createClass(Ticker, [{
    key: 'start',
    value: function start() {
      this.state = TickerState.TICKING;
      this.__createInterval();
      this.emit(TickerEvent.START);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.state = TickerState.STOPPED;
      this.__destroyInterval();
      this.emit(TickerEvent.STOP);
    }
  }, {
    key: 'tick',
    value: function tick() {
      this.emit(TickerEvent.TICK);
    }
  }, {
    key: '__createInterval',
    value: function __createInterval() {
      this.__destroyInterval();
      this._intervalId = setInterval(this.tick.bind(this), this._interval);
    }
  }, {
    key: '__destroyInterval',
    value: function __destroyInterval() {
      if (this._intervalId) {
        clearInterval(this._intervalId);
        this._intervalId = null;
      }
    }
  }, {
    key: 'interval',
    get: function get() {
      return this._interval;
    }
  }]);

  return Ticker;
}(_eventemitter2.default);

exports.default = Ticker;
exports.TickerEvent = TickerEvent;
exports.TickerState = TickerState;
exports.Ticker = Ticker;
