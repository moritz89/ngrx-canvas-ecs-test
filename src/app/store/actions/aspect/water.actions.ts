import { Action } from '@ngrx/store';
import { WaterAspect } from '../../models/aspects/water';

export const Add = '[Water] Add Aspect';

export class AddAction implements Action {
  readonly type = Add;
  constructor(public payload: {waterAspect: WaterAspect}) {}
}

export type Actions = AddAction;
