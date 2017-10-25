import { Pump } from './pump.model';
import { Firefighter } from './../shared/firefighter.model';

export interface ShiftInstance {
    firefighter: Firefighter;
    shifts: {
      pump: string,
      count: number}[];
}
