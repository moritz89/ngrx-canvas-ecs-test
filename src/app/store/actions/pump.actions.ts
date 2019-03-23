import { Action } from '@ngrx/store';

export const Load = '[Pump] Load Pumps';
export const Add = '[Pump] Add Pump';
export const CreateNew = '[Pump] Create New Pump';

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

export class CreateNewAction implements Action {
  readonly type = CreateNew;
}

export type PumpActions = LoadAction | AddAction | CreateNewAction;
