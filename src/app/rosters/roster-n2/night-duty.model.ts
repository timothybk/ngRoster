import { Firefighter } from './../../shared/firefighter.model';

export interface Nightduty {
  firefighter: Firefighter;
  date: Date;
  type: string;
}
