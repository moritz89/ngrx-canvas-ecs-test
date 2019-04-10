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

import { toFabricObject } from './toFabricObject';

import * as fromCanvasAspects from './canvas-aspects.reducer';
import * as fromElectricalAspects from './electrical-aspects.reducer';
import * as fromMetaAspects from './meta-aspect.reducer';
import * as fromWaterAspects from './water-aspect.reducer';
import { Aspects } from '../models/aspects';

export interface State {
  canvasAspects: fromCanvasAspects.State;
  electricalAspects: fromElectricalAspects.State;
  metaAspects: fromMetaAspects.State;
  waterAspects: fromWaterAspects.State;
}

export const reducers: ActionReducerMap<State> = {
  canvasAspects: fromCanvasAspects.reducer,
  electricalAspects: fromElectricalAspects.reducer,
  metaAspects: fromMetaAspects.reducer,
  waterAspects: fromWaterAspects.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze, enableBatchReducer]
  : [enableBatchReducer];

// Canvas Aspect selectors ------------------------------------------
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

// Electrical Aspect Selectors
export const getElectricalAspectsState = (state: State) =>
  state.electricalAspects;
export const getElectricalAspectEntities = createSelector(
  getElectricalAspectsState,
  fromElectricalAspects.getEntities
);

// Meta Aspect Selectors
export const getMetaAspectsState = (state: State) => state.metaAspects;
export const getMetaAspectEntities = createSelector(
  getMetaAspectsState,
  fromMetaAspects.getEntities
);

// Water Aspect Selectors
export const getWaterAspectsState = (state: State) => state.waterAspects;
export const getWaterAspectEntities = createSelector(
  getWaterAspectsState,
  fromWaterAspects.getEntities
);

export const getAspectsByID = (id: string) =>
  createSelector(
    getCanvasAspectEntities,
    getElectricalAspectEntities,
    getMetaAspectEntities,
    getWaterAspectEntities,
    (canvasEntities, electricalEntities, metaEntities, waterEntities) => {
      return {
        canvas: canvasEntities[id],
        electrical: electricalEntities[id],
        meta: metaEntities[id],
        water: waterEntities[id]
      } as Aspects;
    }
  );
