import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { MetaAspect } from '../models/aspects/meta';
import * as metaAspect from '../actions/aspect/meta.actions';

export interface State extends EntityState<MetaAspect> {}

export const adapter: EntityAdapter<MetaAspect> = createEntityAdapter<
  MetaAspect
>();

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: metaAspect.Actions): State {
  switch (action.type) {
    case metaAspect.Add: {
      return adapter.addOne(action.payload.aspect, state);
    }
    case metaAspect.Remove: {
      return adapter.removeOne(action.payload.id, state);
    }
    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;
