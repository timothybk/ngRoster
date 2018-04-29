import { Qualification } from './qualification.model';

export interface Firefighter {
  _id?: string;
  number: number;
  rank: string;
  name: string;
  qualifications?: string[];
  n2: Date;
}
