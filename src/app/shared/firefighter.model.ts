import { Qualification } from './qualification.model';

export interface Firefighter {
  _id?: string;
  number: number;
  rank: string;
  name: string;
  nightDuty?: {
    n2: Date,
    pn2: Date
  };
  qualifications?: Qualification[];
  shifts?: {
    f1: number,
    lp1: number,
    r1: number,
    rp1: number,
    run1: number,
    spare: number,
    total: number
  };
}
