import { Action } from '@ngrx/store';
import { ElectricalAspect } from '../../models/aspects/electrical';

export const Add = '[Electrical] Add Aspect';
export const Remove = '[Electrical] Remove Aspect';

export class AddAction implements Action {
  readonly type = Add;
  constructor(public payload: {aspect: ElectricalAspect}) {}
}

export class RemoveAction implements Action {
  readonly type = Remove;
  constructor(public payload: {id: string}) {}
}

export type Actions = AddAction | RemoveAction;
