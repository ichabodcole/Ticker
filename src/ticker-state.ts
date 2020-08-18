export const TickerStates = {
  TICKING: "TICKING",
  STOPPED: "STOPPED",
} as const;

export type TickerState = keyof typeof TickerStates;
