import { Qualification } from './qualification.model';

export interface Firefighter {
  key: string;
  number: number;
  rank: string;
  name: string;
  qualifications: any[];
}
