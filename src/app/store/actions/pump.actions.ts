import { Action } from '@ngrx/store';
import { BatchAction } from 'ngrx-batch-action-reducer';

import { Pump } from '../models/pump';
import { CanvasAspect } from '../models/aspects/canvas';

export const Load = '[Pump] Load Pumps';
export const Add = '[Pump] Add Pump';
export const Create = '[Pump] Create Pump';
export const CreateSuccess = '[Pump] Create Pump Success';
export const CreateFailure = '[Pump] Create Pump Failure';

export class LoadAction implements Action {
  readonly type = Load;
}

export class AddAction implements Action {
  readonly type = Add;
  constructor(public payload: AddActionPayload) {}
}

export interface AddActionPayload {
  pump: Pump;
}

export class CreateAction implements Action {
  readonly type = Create;
  constructor(public payload: CreateActionPayload) {}
}

export interface CreateActionPayload {
  pump: Pump;
  CanvasAspect: CanvasAspect;
}

export type PumpActions = LoadAction | AddAction | CreateAction;
