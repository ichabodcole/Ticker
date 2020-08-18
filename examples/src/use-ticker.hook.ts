import { Ticker, TickerEvent, TickerEventTypes } from "@/.";
import { useEffect, useState } from "preact/hooks";

interface TickerHook {
  tickerCount: number;
  handleTickerStart: () => void;
  handleTickerStop: () => void;
}

export function useTicker(ticker: Ticker): TickerHook {
  const [tickerCount, setTickerCount] = useState(0);

  useEffect(() => {
    ticker.on(TickerEventTypes.START, (event: TickerEvent) =>
      console.log(`Ticker: ${event.type}`),
    );

    ticker.on(TickerEventTypes.STOP, (event: TickerEvent) =>
      console.log(`Ticker: ${event.type}`),
    );

    ticker.on(TickerEventTypes.TICK, handleTick);
  }, []);

  function handleTick(event: TickerEvent): void {
    console.log(`Ticker: ${event.type}`);
    setTickerCount((tick) => tick + 1);
  }

  function handleTickerStart(): void {
    ticker.start();
  }

  function handleTickerStop(): void {
    ticker.stop();
  }

  return {
    tickerCount,
    handleTickerStart,
    handleTickerStop,
  };
}
