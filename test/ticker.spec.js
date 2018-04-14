import { Ticker, TickerEvent, TickerState } from '../src/Ticker'

describe('Ticker', function () {
  let tk

  beforeEach(function () {
    tk = new Ticker(50)
  })

  describe('constructor', function () {
    it('should not throw', function () {
      expect(function () {
        return new Ticker()
      }).not.toThrow()
    })
  })

  describe('properties', function () {
    describe('state', function () {
      describe('the default state', function () {
        it('should be STOPPED', function () {
          expect(tk.state).toBe(TickerState.STOPPED)
        })
      })

      describe('after calling ticker.stop', function () {
        it('should return TickerState.STOPPED', function () {
          tk.start()
          tk.stop()
          expect(tk.state).toBe(TickerState.STOPPED)
        })
      })

      describe('after calling ticker.start', function () {
        it('should return TickerState.TICKING', function () {
          tk.start()
          expect(tk.state).toBe(TickerState.TICKING)
        })
      })
    })

    describe('interval', function () {
      it('should get the ticker models interval value', function () {
        expect(tk.interval).toBe(50)
      })
    })
  })

  describe('methods', function () {
    beforeEach(function () {
      jasmine.clock().install()
    })

    afterEach(function () {
      jasmine.clock().uninstall()
    })

    describe('start', function () {
      it('should be defined', function () {
        expect(tk.start).toBeDefined()
      })

      it('should set the state variable to TICKING', function () {
        tk.start()
        expect(tk.state).toBe(TickerState.TICKING)
      })

      it('should emit the START event', function () {
        spyOn(tk, 'emit')
        tk.start()
        expect(tk.emit).toHaveBeenCalledWith(TickerEvent.START)
      })

      it('should call the tick method every (n)milliseconds based on the interval', function () {
        spyOn(tk, 'tick')
        tk.start()
        jasmine.clock().tick(55)
        expect(tk.tick).toHaveBeenCalled()
      })
    })

    describe('stop', function () {
      it('should be defined', function () {
        expect(tk.stop).toBeDefined()
      })

      it('should change the state value to STOPPED', function () {
        tk.start()
        tk.stop()
        expect(tk.state).toBe(TickerState.STOPPED)
      })

      it('should stop calling the tick method', function () {
        spyOn(tk, 'tick')
        tk.start()
        tk.stop()
        jasmine.clock().tick(55)
        expect(tk.tick).not.toHaveBeenCalled()
      })

      it('should emit the STOP event', function () {
        spyOn(tk, 'emit')
        tk.stop()
        expect(tk.emit).toHaveBeenCalledWith(TickerEvent.STOP)
      })
    })

    describe('tick', function () {
      it('should broadcast the TICK event', function () {
        spyOn(tk, 'emit')
        tk.tick()
        expect(tk.emit).toHaveBeenCalledWith(TickerEvent.TICK)
      })
    })

    describe('on', function () {
      it('should be defined', function () {
        expect(tk.on).toBeDefined()
      })
    })

    describe('removeListener', function () {
      it('should be defined', function () {
        expect(tk.removeListener).toBeDefined()
      })
    })
  })
})
