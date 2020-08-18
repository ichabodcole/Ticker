import { Ticker, TickerStates, TickerEventTypes, TickerEvent } from "../src";

describe("Ticker", () => {
  let tk: Ticker;

  beforeEach(() => {
    tk = new Ticker(50);
  });

  describe("constructor", () => {
    it("should not throw", () => {
      expect(() => {
        return new Ticker();
      }).not.toThrow();
    });
  });

  describe("properties", () => {
    describe("state", () => {
      describe("the default state", () => {
        it("should be STOPPED", () => {
          expect(tk.state).toBe(TickerStates.STOPPED);
        });
      });

      describe("after calling ticker.stop", () => {
        it("should return TickerStates.STOPPED", () => {
          tk.start();
          tk.stop();
          expect(tk.state).toBe(TickerStates.STOPPED);
        });
      });

      describe("after calling ticker.start", () => {
        it("should return TickerStates.TICKING", () => {
          tk.start();
          expect(tk.state).toBe(TickerStates.TICKING);
        });
      });
    });

    describe("interval", () => {
      it("should get the ticker interval value", () => {
        expect(tk.interval).toBe(50);
      });

      it("should set the ticker interval to the value", () => {
        tk.interval = 100;
        expect(tk.interval).toBe(100);
      });

      it("should start ticking at the new interval if TICKING is in progress", () => {
        jest.useFakeTimers();
        const mockFn = jest.fn();
        tk.on(TickerEventTypes.TICK, mockFn);
        tk.start();

        expect(tk.interval).toBe(50);

        tk.interval = 100;

        jest.advanceTimersByTime(55);
        expect(mockFn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(100);
        expect(mockFn).toHaveBeenCalledTimes(1);

        jest.useRealTimers();
      });
    });
  });

  describe("methods", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    describe("on", () => {
      it("should be defined", () => {
        expect(tk.on).toBeDefined();
      });

      it("should add a listener to an event", () => {
        const mockFn = jest.fn();
        tk.on(TickerEventTypes.START, mockFn);
        tk.on(TickerEventTypes.STOP, mockFn);
        tk.start();
        tk.stop();
        expect(mockFn).toHaveBeenCalledTimes(2);
      });
    });

    describe("off", () => {
      it("should be defined", () => {
        expect(tk.off).toBeDefined();
      });

      it("should remove listeners from an event", () => {
        const mockFn = jest.fn();
        tk.on(TickerEventTypes.TICK, mockFn);
        tk.tick();
        expect(mockFn).toHaveBeenCalledTimes(1);

        tk.off(TickerEventTypes.TICK, mockFn);
        tk.tick();
        expect(mockFn).toHaveBeenCalledTimes(1);
      });
    });

    describe("start", () => {
      it("should be defined", () => {
        expect(tk.start).toBeDefined();
      });

      it("should set the state variable to TICKING", () => {
        expect(tk.state).toBe(TickerStates.STOPPED);
        tk.start();
        expect(tk.state).toBe(TickerStates.TICKING);
      });

      it("should emit the START event", () => {
        const mockFn = jest.fn();
        const tickerEvent: TickerEvent = { type: TickerEventTypes.START };
        tk.on(TickerEventTypes.START, mockFn);
        tk.start();
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith(tickerEvent);
      });

      it("should call the tick method every (n)milliseconds based on the interval", () => {
        jest.spyOn(tk, "tick");
        tk.start();
        jest.advanceTimersByTime(55);
        expect(tk.tick).toHaveBeenCalledTimes(1);
      });
    });

    describe("stop", () => {
      it("should be defined", () => {
        expect(tk.stop).toBeDefined();
      });

      it("should change the state value to STOPPED", () => {
        tk.start();
        expect(tk.state).toBe(TickerStates.TICKING);
        tk.stop();
        expect(tk.state).toBe(TickerStates.STOPPED);
      });

      it("should stop calling the tick method", () => {
        jest.spyOn(tk, "tick");
        tk.start();
        tk.stop();
        jest.advanceTimersByTime(55);
        expect(tk.tick).not.toHaveBeenCalled();
      });

      it("should emit the STOP event", () => {
        const mockFn = jest.fn();
        const tickerEvent: TickerEvent = { type: TickerEventTypes.STOP };
        tk.on(TickerEventTypes.STOP, mockFn);
        tk.start();
        tk.stop();
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith(tickerEvent);
      });
    });

    describe("tick", () => {
      it("should emit the TICK event", () => {
        const mockFn = jest.fn();
        const tickerEvent: TickerEvent = { type: TickerEventTypes.TICK };
        tk.on(TickerEventTypes.TICK, mockFn);
        tk.tick();
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith(tickerEvent);
      });
    });
  });
});
