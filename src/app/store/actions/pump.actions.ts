import { Action } from '@ngrx/store';
import { BatchAction } from 'ngrx-batch-action-reducer';

import * as canvasAspect from './aspect/canvas.actions';

export const Load = '[Pump] Load Pumps';
export const Add = '[Pump] Add Pump';
export const CreateNew = '[Pump] Create New Pump';
export const RequestNew = '[Pump] Request New Pump';
export const RequestNewSuccess;
export const RequestNew;

export class LoadAction implements Action {
  readonly type = Load;
}

export class AddAction implements Action {
  readonly type = Add;

  constructor(public payload: AddActionPayload) {}
}

export interface AddActionPayload {
  id: number;
  name: string;
  fabricId: number;
}

@BatchAction()
export class CreateNewAction implements Action {
  readonly type = CreateNew;
  constructor(public payload: [AddAction, canvasAspect.AddObjectAction]) {}
}

export type PumpActions = LoadAction | AddAction | CreateNewAction;
