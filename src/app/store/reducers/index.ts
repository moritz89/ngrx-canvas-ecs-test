import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../../../environments/environment";
import * as fromPumps from "./pumps.reducer";
import * as fromCanvasAspects from "./canvasAspects.reducer";
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
  ? []
  : [];

export const getCanvasAspectsState = (state: State) => state.canvasAspects;

export const getCanvasAspectEntities = createSelector(
  getCanvasAspectsState,
  fromCanvasAspects.getEntities
);

export const getCanvasAspects = createSelector(
  getCanvasAspectEntities,
  entities => {
    return Object.values(entities);
  }
);
