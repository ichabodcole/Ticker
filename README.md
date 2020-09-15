Ticker JS
==========

A simple `TICK` emitter.  So you can `TICK` when you `TOCK`.

### Installation

    npm install @ichabodcole/ticker

### Basic Usage

    import {
      Ticker,
      TickerEvent, { type: TickerEvent }
      TickerEventTypes, // START | TICK | STOP
      TickerStates,  // TICKING | STOPPED
    } from '@ichabodcole/ticker'

    // The Ticker constructor takes an interval
    // in milliseconds; defaults to 50.
    const ticker = new Ticker(100)

    // Do your cool biznis every 100 milliseconds 4EVRRRR
    function myCoolBiznis(e: TickerEvent) {
      console.log('Cool Dude!', e.type);
    }

    // Do cool stuff on TICK
    ticker.on(TickerEventTypes.TICK, myCoolBiznis)

    // Start the ticking
    ticker.start() // You can listen for the START event too, ticker.on(TickerEventTypes.START, ...)

    // check the ticker state if you want 
    console.log(ticker.state) // "TICKING"

    // Stop doing cool stuff on TICK, WNEVRRRR
    ticker.stop() // You can listen for the STOP event too, ticker.on(TickerEventTypes.STOP, ...)

    console.log(ticker.state) // "STOPPED"

    // Remove the listener for this event
    ticker.off(TickerEventTypes.Tick, myCoolBiznis)
