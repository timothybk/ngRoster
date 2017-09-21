import { Pump } from './pump.model';
import { Firefighter } from './../shared/firefighter.model';

export class ShiftInstance {
  constructor(
    public date: string,
    public firefighter: Firefighter,
    public pump: Pump,
    public shift: string,
    public md: boolean
  ) {}
}
