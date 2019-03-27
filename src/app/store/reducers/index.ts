import { fabric } from 'fabric';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { enableBatchReducer } from 'ngrx-batch-action-reducer';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../environments/environment';
import * as fromPumps from './pumps.reducer';
import * as fromCanvasAspects from './canvasAspects.reducer';
import { CanvasAspect } from '../models/aspects/canvas';
import { toFabricObject } from './toFabricObject';
// import * as fromElectricalAspects from "./electricalAspects.reducer";
// import * as fromWaterAspects from "./waterAspect.reducers";

export interface State {
  pumps: fromPumps.State;
  canvasAspects: fromCanvasAspects.State;
  // electricalAspects: fromElectricalAspects.State;
  // waterAspects: fromWaterAspects.State;
}

export const reducers: ActionReducerMap<State> = {
  pumps: fromPumps.reducer,
  canvasAspects: fromCanvasAspects.reducer
  // electricalAspects: fromElectricalAspects.reducer
  // waterAspects: fromWaterAspects.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];

export const getCanvasAspectsState = (state: State) => state.canvasAspects;
export const getCanvasAspectEntities = createSelector(
  getCanvasAspectsState,
  fromCanvasAspects.getEntities
);
export const getAddedCanvasAspectIds = createSelector(
  getCanvasAspectsState,
  fromCanvasAspects.getAddedIds
);
export const getChangedCanvasAspectIds = createSelector(
  getCanvasAspectsState,
  fromCanvasAspects.getChangedIds
);
export const getRemovedCanvasAspectIds = createSelector(
  getCanvasAspectsState,
  fromCanvasAspects.getRemovedIds
);

export const getAddedFabricObject = createSelector(
  getCanvasAspectEntities,
  getAddedCanvasAspectIds,
  (entities, ids) => {
    return ids.map(id => toFabricObject(entities[id]));
  }
);

export const getChangedCanvasObjects = createSelector(
  getCanvasAspectEntities,
  getChangedCanvasAspectIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const getRemovedCanvasObjects = createSelector(
  getCanvasAspectEntities,
  getRemovedCanvasAspectIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);
