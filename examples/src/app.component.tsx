import { h } from "preact";
import { Ticker } from "@/ticker";
import { useTicker } from "./use-ticker.hook";
const ticker = new Ticker(100);

export const App = (): h.JSX.Element => {
  const {
    handleTickerStart,
    handleTickerStop,

    tickerCount,
  } = useTicker(ticker);

  return (
    <div>
      <h1>Ticker</h1>
      <p>A simple TICK emitter. So you can TICK when you TOCK.</p>
      <div class="control-group">
        <button onClick={handleTickerStart}>Ticker: Start</button>
        <button onClick={handleTickerStop}>Ticker: Stop</button>
      </div>
      <div class="control-group">{tickerCount}</div>
    </div>
  );
};
