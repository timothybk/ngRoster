import { Qualification } from './qualification.model';

export interface Firefighter {
  id?: string;
  number: number;
  rank: string;
  name: string;
  nightDuty: {
    n2: Date,
    pn2: Date
  };
  qualifications: {
    md: boolean,
    rescue: boolean,
    aerial: boolean
  };
}
