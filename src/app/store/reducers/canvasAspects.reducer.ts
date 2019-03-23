import { Action } from '@ngrx/store';
import { CanvasAspect } from '../models/aspects/canvas';
import * as canvasAspect from '../actions/aspect/canvas.actions';

export interface State {
  ids: number[];
  entities: { [id: number]: CanvasAspect };
  addedIds: number[];
  changedIds: number[];
  removedIds: number[];
}

export const initialState: State = {
  ids: [],
  entities: {},
  addedIds: [],
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
        ids: [...(state.ids), idCounter],
        entities: Object.assign({}, state.entities,  {
          [id]: {id, ...(action.payload)}
        }),
        addedIds: [idCounter],
        changedIds: [],
        removedIds: []
      };
    }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;
export const getAddedIds = (state: State) => state.addedIds;
export const getChangedIds = (state: State) => state.changedIds;
export const getRemovedIds = (state: State) => state.removedIds;

