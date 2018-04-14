import EventEmitter from 'eventemitter3'

// Ticker Event Types
const TickerEvent = {
  TICK: 'TICK',
  START: 'START',
  STOP: 'STOP'
}

// Ticker States
const TickerState = {
  STOPPED: 'STOPPED',
  TICKING: 'TICKING'
}

class Ticker extends EventEmitter {
  constructor (interval = 50) {
    super()
    this._intervalId = null
    this._interval = interval

    this.state = null
    this.state = TickerState.STOPPED
  }

  start () {
    this.state = TickerState.TICKING
    this.__createInterval()
    this.emit(TickerEvent.START)
  }

  stop () {
    this.state = TickerState.STOPPED
    this.__destroyInterval()
    this.emit(TickerEvent.STOP)
  }

  tick () {
    this.emit(TickerEvent.TICK)
  }

  __createInterval () {
    this.__destroyInterval()
    this._intervalId = setInterval(this.tick.bind(this), this._interval)
  }

  __destroyInterval () {
    if (this._intervalId) {
      clearInterval(this._intervalId)
      this._intervalId = null
    }
  }

  get interval () {
    return this._interval
  }
}

export default Ticker
export {
  TickerEvent,
  TickerState,
  Ticker
}
