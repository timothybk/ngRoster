import { Qualification } from './../shared/qualification.model';
export class Pump {
  constructor(
    public name: string,
    public seats: string[],
    public qualifications: Qualification[]
  ) {}
}
