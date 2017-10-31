import * as RostersActions from '../store/rosters.actions';

export interface State {
  placeholder: string;
}

const initialState: State = {
  placeholder: 'placeholder'
};

export function rostersReducer(
  state = initialState,
  action: RostersActions.RostersActions
) {
  switch (action.type) {
    case RostersActions.ROSTERS_ERROR:
    default:
      return state;
  }
}
