export const TickerEventTypes = {
  TICK: "TICK",
  START: "START",
  STOP: "STOP",
} as const;

export type TickerEventType = keyof typeof TickerEventTypes;
