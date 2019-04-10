import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ElectricalAspect } from '../models/aspects/electrical';
import * as electricalAspect from '../actions/aspect/electrical.actions';

export interface State extends EntityState<ElectricalAspect> {}

export const adapter: EntityAdapter<ElectricalAspect> = createEntityAdapter<
  ElectricalAspect
>();

export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: electricalAspect.Actions
): State {
  switch (action.type) {
    case electricalAspect.Add: {
      return adapter.addOne(action.payload.aspect, state);
    }
    case electricalAspect.Remove: {
      return adapter.removeOne(action.payload.id, state);
    }
    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;
