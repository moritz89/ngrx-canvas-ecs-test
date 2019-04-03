import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CanvasAspect } from '../models/aspects/canvas';
import * as canvasAspect from '../actions/aspect/canvas.actions';

const gridSpacing = 50;

export interface State extends EntityState<CanvasAspect> {
  addedIds: string[];
  changedIds: string[];
  removedIds: string[];
}

export const adapter: EntityAdapter<CanvasAspect> = createEntityAdapter<
  CanvasAspect
>();

export const initialState: State = adapter.getInitialState({
  addedIds: [],
  changedIds: [],
  removedIds: []
});

const gridSize = 50;

export function reducer(
  state = initialState,
  action: canvasAspect.Actions
): State {
  switch (action.type) {
    case canvasAspect.AddObject: {
      const newState = adapter.addOne(action.payload, state);
      newState.addedIds = [action.payload.id];
      newState.changedIds = [];
      newState.removedIds = [];
      return newState;
    }
    case canvasAspect.MoveObject: {
      const newPoint = snapPoint(action.payload.point_tl, gridSize);
      const newState = adapter.updateOne(
        {
          id: action.payload.id,
          changes: { left: newPoint.x, top: newPoint.y }
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

function snapPoint(point: fabric.Point, gridSpacing: number): fabric.Point {
  const snappedPoint = point.clone();

  // Check if to snap left or right grid
  if (point.x % gridSpacing < gridSpacing / 2) {
    snappedPoint.setX(point.x - (point.x % gridSpacing));
  } else {
    snappedPoint.setX(point.x + (gridSpacing - (point.x % gridSpacing)));
  }

  // Check whether to snap to the upper or lower grid
  if (point.y % gridSpacing < gridSpacing / 2) {
    snappedPoint.setY(point.y - (point.y % gridSpacing));
  } else {
    snappedPoint.setY(point.y + (gridSpacing - (point.y % gridSpacing)));
  }

  return snappedPoint;
}
