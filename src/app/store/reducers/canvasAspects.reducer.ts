import { Action } from "@ngrx/store";
import { CanvasAspect } from "../models/aspects/canvas";

export interface State {
  ids: number[];
  entities: { [id: number]: CanvasAspect };
}

export const initialState: State = {
  ids: [],
  entities: {}
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;
