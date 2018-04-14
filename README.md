Ticker JS
==========

A simple `TICK` emitter.  So you can `TICK` when you `TOCK`.

### Installation

    npm install @ichabodcole/ticker

### Basic Usage

    import {
      Ticker,
      TickerEvent, // TICK | STOP
      TickerState  // TICKING | STOPPED
    } from '@ichabodcole/ticker'

    // The Timer constructor takes an interval
    // in milliseconds; defaults to 50.

    const timer = new Timer(100)

    timer.on(TickerEvent.TICK, e => {
      // Do cool stuff every 100 milliseconds 4EVRRRR
    })

    timer.start()

    // Stop doing cool stuff, WNEVRRRR
    timer.stop()
