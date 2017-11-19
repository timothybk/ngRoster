import { PumpCounts } from './pump-counts.model';

export interface Averages {
  flyer: PumpCounts;
  runner: PumpCounts;
  rescuepump: PumpCounts;
  salvage: PumpCounts;
  bronto: PumpCounts;
}
