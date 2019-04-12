import { Action } from '@ngrx/store';
import { Aspects } from '../models/aspects';

import * as canvasAspect from '../actions/aspect/canvas.actions';
import * as electricalAspect from '../actions/aspect/electrical.actions';
import * as metaAspect from '../actions/aspect/meta.actions';
import * as waterAspect from '../actions/aspect/water.actions';
import { CanvasAspect } from '../models/aspects/canvas';
import { ElectricalAspect } from '../models/aspects/electrical';
import { WaterAspect } from '../models/aspects/water';

const urlBase = 'http://localhost:8000/';

const Type2UrlPostfix = new Map<string, string>([
  ['pump', 'pumps'],
  ['pipe', 'pipes']
]);

export interface ApiItem {
  id: string;
  name: string;
  canvasAspect?: CanvasAspect;
  electricalAspect?: ElectricalAspect;
  waterAspect?: WaterAspect;
}

export const Add = '[Item] Add';
export const AddSuccess = '[Item] Add Success';
export const AddFailure = '[Item] Add Failure';
export const Remove = '[Item] Remove';

export class AddAction implements Action {
  readonly type = Add;
  constructor(public payload: AddPayload) {}
}

export interface AddPayload {
  id: string;
  aspects: Aspects;
}

export class AddSuccessAction implements Action {
  readonly type = AddSuccess;
}

export class AddFailureAction implements Action {
  readonly type = AddFailure;
  constructor(public payload: AddPayload) {}
}

export class RemoveAction implements Action {
  readonly type = Remove;
  constructor(public payload: { id: string }) {}
}

export type ItemActions =
  | AddAction
  | AddSuccessAction
  | AddFailureAction
  | RemoveAction;

export function createAddAspectActions(aspects: Aspects): Action[] {
  const actions = [];
  if (aspects.canvas) {
    actions.push(new canvasAspect.AddAction({ aspect: aspects.canvas }));
  }
  if (aspects.electrical) {
    actions.push(
      new electricalAspect.AddAction({ aspect: aspects.electrical })
    );
  }
  if (aspects.meta) {
    actions.push(new metaAspect.AddAction({ aspect: aspects.meta }));
  }
  if (aspects.water) {
    actions.push(new waterAspect.AddAction({ aspect: aspects.water }));
  }
  return actions;
}

export function createRemoveAspectActions(aspects: Aspects): Action[] {
  const actions = [];
  if (aspects.canvas) {
    actions.push(new canvasAspect.RemoveAction({ id: aspects.canvas.id }));
  }
  if (aspects.electrical) {
    actions.push(
      new electricalAspect.RemoveAction({ id: aspects.electrical.id })
    );
  }
  if (aspects.meta) {
    actions.push(new metaAspect.RemoveAction({ id: aspects.meta.id }));
  }
  if (aspects.water) {
    actions.push(new waterAspect.RemoveAction({ id: aspects.water.id }));
  }
  return actions;
}

export function serializeAspects(
  aspects: Aspects
): { apiItem: ApiItem; url: string } {
  const apiItem: ApiItem = {
    id: aspects.meta.id,
    name: aspects.meta.name,
    canvasAspect: aspects.canvas,
    electricalAspect: aspects.electrical,
    waterAspect: aspects.water
  };

  const url = urlBase + Type2UrlPostfix.get(aspects.meta.type) + '/';

  return { apiItem, url };
}

// export function deserializeAspects(apiItem: ApiItem, type: string): Aspects {
//   const aspects: Aspects = {
//     canvas: apiItem.canvasAspect,
//     electrical: apiItem.electricalAspect,
//     meta: { id: apiItem.id, name: apiItem.name, type },
//     water: apiItem.waterAspect
//   };

//   return aspects;
// }
