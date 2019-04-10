import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { WaterAspect } from '../models/aspects/water';
import * as waterAspect from '../actions/aspect/water.actions';

export interface State extends EntityState<WaterAspect> {}

export const adapter: EntityAdapter<WaterAspect> = createEntityAdapter<
  WaterAspect
>();

export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: waterAspect.Actions
): State {
  switch (action.type) {
    case waterAspect.Add: {
      return adapter.addOne(action.payload.aspect, state);
    }
    case waterAspect.Remove: {
      return adapter.removeOne(action.payload.id, state);
    }
    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;
