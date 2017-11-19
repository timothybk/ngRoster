import { Firefighter } from './firefighter.model';

export interface ShiftBuilder {
  pump: string;
  driver: string;
  one: string;
  two?: string;
  three?: string;
}

