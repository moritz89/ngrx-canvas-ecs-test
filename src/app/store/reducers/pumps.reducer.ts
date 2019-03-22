import { Action } from "@ngrx/store";
import { Pump } from "../models/pump";

export interface State {
  ids: number[];
  entities: { [id: number]: Pump };
}

export const initialState: State = {
  ids: [],
  entities: {}
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    default:
      return state;
  }
}
