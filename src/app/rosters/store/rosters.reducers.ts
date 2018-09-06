import { Pump } from "./../../shared/pump.model";
import { Shifts } from "./../../shared/shifts.model";
import { ShiftBuilder } from "./../../shared/shift-builder.model";
import * as RostersActions from "../store/rosters.actions";
import { FfPumpTotal } from "../../shared/ff-pump-total.model";
import { FfCount } from "../../shared/ff-count.model";

export interface State {
  allShifts: Shifts[];
  pumps: Pump[];
  pumpPreferences: Array<Array<any>>;
  pumpSeating: [];
  failList: [];
}

const initialState: State = {
  allShifts: [],
  pumps: [{ name: "test", seats: ["one", "two"], qualifications: ["nil"] }],
  pumpPreferences: [['flyer', []], ['flyer', []], ['flyer', []], ['flyer', []], ['flyer', []]],
  pumpSeating: [],
  failList: [],
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
        pumpPreferences: [ ...action.payload[0] ],
        pumpSeating: [ ...action.payload[1] ],
        failList: [ ...action.payload[2] ]
      };
    case RostersActions.ROSTERS_ERROR:
    default:
      return state;
  }
}
