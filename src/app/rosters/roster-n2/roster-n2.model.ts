import { Firefighter } from './../../shared/firefighter.model';
export class RosterN2 {

  constructor(
    public firefighter: Firefighter,
    public n2Date: string,
    public pn2Date?: string) {}
}
