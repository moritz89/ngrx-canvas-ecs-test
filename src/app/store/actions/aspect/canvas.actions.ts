import { fabric } from 'fabric';
import { Action } from '@ngrx/store';
import { CanvasAspect } from '../../models/aspects/canvas';

export const MoveObject = '[Canvas] Move Object';
export const Add = '[Canvas] Add Aspect';
export const Remove = '[Canvas] Remove Aspect';

export class MoveObjectAction implements Action {
  readonly type = MoveObject;
  constructor(public payload: {position: MoveObjectPayload}) {}
}

export interface MoveObjectPayload {
  id: string;
  point_tl: fabric.Point;
}

export class AddAction implements Action {
  readonly type = Add;
  constructor(public payload: {aspect: CanvasAspect}) {}
}

export class RemoveAction implements Action {
  readonly type = Remove;
  constructor(public payload: {id: string}) {}
}

export type Actions = AddAction | RemoveAction | MoveObjectAction;
