import { Nightduty } from './../shared/night-duty.model';
import { ShiftInstance } from './../shared/shift-instance.model';
import { Qualification } from './qualification.model';

export interface Firefighter {
  _id?: string;
  number: number;
  rank: string;
  name: string;
  nightDuty?: {
    n2: Date;
    pn2: Date;
  };
  qualifications?: Qualification[];
  shifts?: ShiftInstance[];
  nightduties: Nightduty[];
}
