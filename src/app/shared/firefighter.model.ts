import { Qualification } from './qualification.model';

export class Firefighter {
  constructor(public number: number,
              public rank: string,
              public name: string,
              public qualifications: any[]
            ) {}
}
