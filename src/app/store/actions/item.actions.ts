import { Action } from '@ngrx/store';
import { Aspects } from '../models/aspects';

import * as canvasAspect from '../actions/aspect/canvas.actions';
import * as electricalAspect from '../actions/aspect/electrical.actions';
import * as metaAspect from '../actions/aspect/meta.actions';
import * as waterAspect from '../actions/aspect/water.actions';

export const Add = '[Item] Add';
export const AddSuccess = '[Item] Add Success';
export const AddFailure = '[Item] Add Failure';

export class AddAction implements Action {
  readonly type = Add;
  constructor(public payload: AddPayload) {}
}

export interface AddPayload {
  id: string;
  aspects: Aspects;
}

export function createAddAspectActions(aspects: Aspects): Action[] {
  const actions = [];
  if (aspects.canvasAspect) {
    actions.push(
      new canvasAspect.AddAction({ canvasAspect: aspects.canvasAspect })
    );
  }
  if (aspects.electricalAspect) {
    actions.push(
      new electricalAspect.AddAction({
        electricalAspect: aspects.electricalAspect
      })
    );
  }
  if (aspects.metaAspect) {
    actions.push(new metaAspect.AddAction({ metaAspect: aspects.metaAspect }));
  }
  if (aspects.waterAspect) {
    actions.push(
      new waterAspect.AddAction({ waterAspect: aspects.waterAspect })
    );
  }
  return actions;
}

export type ItemActions = AddAction;
