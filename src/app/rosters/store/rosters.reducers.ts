import { Pump } from "./../../shared/pump.model";
import { Shifts } from "./../../shared/shifts.model";
import { ShiftBuilder } from "./../../shared/shift-builder.model";
import * as RostersActions from "../store/rosters.actions";
import { FfPumpTotal } from "../../shared/ff-pump-total.model";
import { FfCount } from "../../shared/ff-count.model";

export interface State {
  allShifts: Shifts[];
  pumps: Pump[];
  flyerWeighted: FfCount[];
  runnerWeighted: FfCount[];
  rescuepumpWeighted: FfCount[];
  salvageWeighted: FfCount[];
  brontoWeighted: FfCount[];
}

const initialState: State = {
  allShifts: [],
  pumps: [{ name: "test", seats: ["one", "two"], qualifications: ["nil"] }],
  flyerWeighted: [],
  runnerWeighted: [],
  rescuepumpWeighted: [],
  salvageWeighted: [],
  brontoWeighted: [],
};

export function rostersReducer(
  state = initialState,
  action: RostersActions.RostersActions
) {
  switch (action.type) {
    case RostersActions.SET_SHIFTS:
      return {
        ...state,
        allShifts: [...action.payload]
      };
    case RostersActions.SET_PUMPS:
      return {
        ...state,
        pumps: [...action.payload]
      };
    case RostersActions.SET_FF_PUMP_TOTALS:
      return {
        ...state,
        flyerWeighted: [ ...action.payload[0] ],
        runnerWeighted: [ ...action.payload[1] ],
        rescuepumpWeighted: [ ...action.payload[2] ],
        salvageWeighted: [ ...action.payload[3] ],
        brontoWeighted: [ ...action.payload[4] ],
      };
    case RostersActions.ROSTERS_ERROR:
    default:
      return state;
  }
}
