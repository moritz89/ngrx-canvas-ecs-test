import { Action } from '@ngrx/store';
import { CanvasAspect } from '../models/aspects/canvas';
import * as canvasAspect from '../actions/aspect/canvas.actions';

export interface State {
  ids: number[];
  entities: { [id: number]: CanvasAspect };
  changedIds: number[];
  removedIds: number[];
}

export const initialState: State = {
  ids: [],
  entities: {},
  changedIds: [],
  removedIds: []
};

let idCounter = 0;

export function reducer(state = initialState, action: canvasAspect.AddFabricObject): State {
  switch (action.type) {
    case canvasAspect.CanvasActionTypes.AddFabricObject: {
      idCounter += 1;
      const id = idCounter;
      return {
        ids: [...state.ids, idCounter],
        entities: Object.assign({}, state.entities,  {
          [id]: {id, object: action.payload.object}
        }),
        changedIds: [idCounter],
        removedIds: []
      };
    }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;
export const getChangedIds = (state: State) => state.changedIds;
export const getRemovedIds = (state: State) => state.removedIds;
