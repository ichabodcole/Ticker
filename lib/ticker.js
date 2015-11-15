'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events').EventEmitter;

// Ticker event types
var TickerEvent = {
    TICK: 'ticker:tick',
    START: 'ticker:start',
    STOP: 'ticker:stop'
};

var Ticker = (function (_EventEmitter) {
    _inherits(Ticker, _EventEmitter);

    function Ticker() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Ticker);

        // Allow option to override events object if desired.

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ticker).call(this));

        _this.model = Object.assign({}, options.model || {});
        // Initialize Model
        _this.tickInterval = null;
        _this.interval = options.interval || 50;
        _this.state = Ticker.STOPPED;
        return _this;
    }

    _createClass(Ticker, [{
        key: 'start',
        value: function start() {
            this.state = Ticker.TICKING;
            this.createInterval();
            this.emit(TickerEvent.START);
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.state = Ticker.STOPPED;
            this.destroyInterval();
            this.emit(TickerEvent.STOP);
        }
    }, {
        key: 'tick',
        value: function tick() {
            this.emit(TickerEvent.TICK);
        }
    }, {
        key: 'createInterval',
        value: function createInterval() {
            this.destroyInterval();
            this.tickInterval = setInterval(this.tick.bind(this), this.interval);
        }
    }, {
        key: 'destroyInterval',
        value: function destroyInterval() {
            if (this.tickInterval) {
                clearInterval(this.tickInterval);
                this.tickInterval = null;
            }
        }
    }, {
        key: 'interval',
        set: function set(milliseconds) {
            this.model.interval = milliseconds;
            if (this.state === Ticker.TICKING) {
                this.createInterval();
            }
        },
        get: function get() {
            return this.model.interval;
        }
    }, {
        key: 'state',
        set: function set(state) {
            this.model.state = state;
        },
        get: function get() {
            return this.model.state;
        }
    }]);

    return Ticker;
})(EventEmitter);
// Ticker states

Ticker.STOPPED = 'stopped';
Ticker.TICKING = 'ticking';

exports.default = Ticker;
exports.TickerEvent = TickerEvent;
exports.Ticker = Ticker;
