import { fabric } from 'fabric';
import { Action } from '@ngrx/store';
import { CanvasAspect } from '../../models/aspects/canvas';

export const MoveObject = '[Canvas] Move Object';
export const AddObject = '[Canvas] Add Object';

export class MoveAction implements Action {
  readonly type = MoveObject;
  constructor(public payload: {position: MoveObjectPayload}) {}
}

export interface MoveObjectPayload {
  id: string;
  point_tl: fabric.Point;
}

export class AddAction implements Action {
  readonly type = AddObject;
  constructor(public payload: {canvasAspect: CanvasAspect}) {}
}

export type Actions = MoveAction | AddAction;
