import { Averages } from './averages.model';
import { Firefighter } from './firefighter.model';

export interface FfApiResponse {
  firefighters: Firefighter[];
  averages: Averages;
}
