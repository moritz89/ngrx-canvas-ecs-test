import { Action } from '@ngrx/store';
import { Aspects } from '../models/aspects';

import * as canvasAspect from '../actions/aspect/canvas.actions';
import * as electricalAspect from '../actions/aspect/electrical.actions';
import * as metaAspect from '../actions/aspect/meta.actions';
import * as waterAspect from '../actions/aspect/water.actions';

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
