import { PumpCounts } from './pump-counts.model';

export interface ShiftInstance {
  pump: string;
  counts: PumpCounts;
}
