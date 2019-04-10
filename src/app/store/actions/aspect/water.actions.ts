import { Action } from '@ngrx/store';
import { WaterAspect } from '../../models/aspects/water';

export const Add = '[Water] Add Aspect';
export const Remove = '[Water] Remove Aspect';

export class AddAction implements Action {
  readonly type = Add;
  constructor(public payload: { aspect: WaterAspect }) {}
}

export class RemoveAction implements Action {
  readonly type = Remove;
  constructor(public payload: { id: string }) {}
}

export type Actions = AddAction | RemoveAction;
