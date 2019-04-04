import { Action } from '@ngrx/store';
import { ElectricalAspect } from '../../models/aspects/electrical';

export const Add = '[Electrical] Add Aspect';

export class AddAction implements Action {
  readonly type = Add;
  constructor(public payload: {electricalAspect: ElectricalAspect}) {}
}

export type Actions = AddAction;
