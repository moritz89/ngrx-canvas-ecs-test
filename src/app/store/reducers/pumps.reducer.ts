import { Pump } from '../models/pump';
import * as pump from '../actions/pump.actions';

export interface State {
  ids: string[];
  entities: { [id: string]: Pump };
}

export const initialState: State = {
  ids: [],
  entities: {}
};

export function reducer(state = initialState, action: pump.AddAction): State {
  switch (action.type) {
    case pump.Add: {
      return {
        ids: [...state.ids, action.payload.pump.id],
        entities: Object.assign({}, state.entities, action.payload.pump)
      };
    }
    default:
      return state;
  }
}
