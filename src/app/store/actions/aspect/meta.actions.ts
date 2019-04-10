import { Action } from '@ngrx/store';
import { MetaAspect } from '../../models/aspects/meta';

export const Add = '[Meta] Add Aspect';
export const Remove = '[Meta] Remove Aspect';

export class AddAction implements Action {
  readonly type = Add;
  constructor(public payload: { aspect: MetaAspect }) {}
}

export class RemoveAction implements Action {
  readonly type = Remove;
  constructor(public payload: { id: string }) {}
}

export type Actions = AddAction | RemoveAction;
