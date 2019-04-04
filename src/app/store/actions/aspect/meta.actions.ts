import { Action } from '@ngrx/store';
import { MetaAspect } from '../../models/aspects/meta';

export const Add = '[Meta] Add Aspect';

export class AddAction implements Action {
  readonly type = Add;
  constructor(public payload: {metaAspect: MetaAspect}) {}
}

export type Actions = AddAction;
