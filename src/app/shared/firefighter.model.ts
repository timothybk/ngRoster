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
  shifts?: {
    pump: string;
    count: number;
  }[];
  nightduties: {
    date: Date;
    type: string;
  }[];
}
