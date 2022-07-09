import EventEmitter from "eventemitter3";
import { TickerState, TickerStates } from "@/ticker-state";
import { TickerEventType, TickerEventTypes } from "@/ticker-event-type";
import { TickerEvent } from "@/ticker-event";

export class Ticker {
  private _interval: number;
  private _intervalId: ReturnType<typeof setInterval> | null = null;
  protected _emitter: EventEmitter;
  protected _state: TickerState;

  constructor(interval = 50) {
    this._emitter = new EventEmitter();
    this._interval = interval;
    this._state = TickerStates.STOPPED;
  }

  start(): void {
    if (this._state !== TickerStates.TICKING) {
      this._state = TickerStates.TICKING;
      this._createInterval();
      this._emit(TickerEventTypes.START);
    }
  }

  stop(): void {
    if (this._state !== TickerStates.STOPPED) {
      this._state = TickerStates.STOPPED;
      this._destroyInterval();
      this._emit(TickerEventTypes.STOP);
    }
  }

  tick(): void {
    this._emit(TickerEventTypes.TICK);
  }

  on(
    tickerEvent: TickerEventType,
    func: (ars: TickerEvent) => void,
    ctx?: unknown,
  ): void {
    this._emitter.on(tickerEvent, func, ctx);
  }

  off(
    tickerEvent: TickerEventType,
    func?: (args: TickerEvent) => void,
    ctx?: unknown,
  ): void {
    this._emitter.off(tickerEvent, func, ctx);
  }

  get state(): TickerState {
    return this._state;
  }

  get interval(): number {
    return this._interval;
  }

  set interval(value: number) {
    this._interval = value;
    if (this.state === TickerStates.TICKING) {
      this._createInterval();
    }
  }

  protected _emit(type: TickerEventType): boolean {
    const tickerEvent: TickerEvent = { type };
    return this._emitter.emit(type, tickerEvent);
  }

  protected _createInterval(): void {
    this._destroyInterval();
    this._intervalId = setInterval(() => {
      this.tick();
    }, this._interval);
  }

  protected _destroyInterval(): void {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }
}
