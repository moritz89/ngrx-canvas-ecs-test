import { Action } from '@ngrx/store';
import { Pump } from '../models/pump';
import * as pump from '../actions/pump.actions';

export interface State {
  ids: number[];
  entities: { [id: number]: Pump };
}

export const initialState: State = {
  ids: [],
  entities: {}
};

export function reducer(state = initialState, action: pump.AddAction): State {
  switch (action.type) {
    case pump.Add: {
      return {
        ids: [...state.ids, action.payload.id],
        entities: Object.assign({}, state.entities, {
          id: action.payload.id,
          name: action.payload.name,
          fabricId: action.payload.fabricId
        })
      };
    }
    default:
      return state;
  }
}
