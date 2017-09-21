import { Qualification } from './qualification.model';

export class Firefighter {
  constructor(public id: string,
              public number: number,
              public rank: string,
              public name: string,
              public qualifications: Qualification[]
            ) {}
}
