import { Pump } from './pump.model';
import { Firefighter } from './../shared/firefighter.model';

export class ShiftInstance {
  constructor(
    public firefighter: Firefighter,
    public shifts: {
      pump: string,
      count: number}[],
    public totalShifts: number
  ) {}
}
