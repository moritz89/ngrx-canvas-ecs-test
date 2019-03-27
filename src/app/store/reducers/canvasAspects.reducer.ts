import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CanvasAspect } from '../models/aspects/canvas';
import * as canvasAspect from '../actions/aspect/canvas.actions';

const gridSpacing = 50;

export interface State extends EntityState<CanvasAspect> {
  addedIds: number[];
  changedIds: number[];
  removedIds: number[];
}

export const adapter: EntityAdapter<CanvasAspect> = createEntityAdapter<
  CanvasAspect
>();

export const initialState: State = adapter.getInitialState({
  addedIds: [],
  changedIds: [],
  removedIds: []
});

let idCounter = 0;

export function reducer(
  state = initialState,
  action: canvasAspect.Actions
): State {
  switch (action.type) {
    case canvasAspect.AddObject: {
      idCounter += 1;
      const newState = adapter.addOne(
        { id: idCounter, ...action.payload },
        state
      );
      newState.addedIds = [idCounter];
      newState.changedIds = [];
      newState.removedIds = [];
      return newState;
    }
    case canvasAspect.MoveObject: {
      const newPoint = snapObject(
        action.payload.point,
        gridSize
      );
      const newState = adapter.updateOne(
        {
          id: action.payload.id,
          changes: { top: newPoint.x, left: newPoint.y}
        },
        state
      );
      newState.addedIds = [];
      newState.changedIds = [action.payload.id];
      newState.removedIds = [];
      return newState;
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

function snapObject(point: fabric.Point, gridSpacing: number): fabric.Point {
  if(point.type !== 'tl') {
    console.warn('Can only snap top-left points');
    return point;
  }

  const snappedPoint = point.clone();

  // Check if to snap left or right grid
  if (point.x % gridSpacing < gridSpacing / 2) {
    snappedPoint.setX(point.x - (point.x % gridSpacing));
  } else {
    snappedPoint.setX(point.x + (gridSpacing - (point.x % gridSpacing)));
  }

  // Check if to snap the upper or lower grid
  if (point.y % gridSpacing < gridSpacing / 2) {
    snappedPoint.setY(point.y - (point.y % gridSpacing));
  } else {
    snappedPoint.setY(point.y + (gridSpacing - (point.y % gridSpacing)));
  }

  return snappedPoint;
}
