import { fabric } from 'fabric';
import { Action } from '@ngrx/store';
import { CanvasAspect } from '../../models/aspects/canvas';
import { Omit } from '../../../utils/omit';

export const Load = '[Canvas] Load Canvases';
export const MoveObject = '[Canvas] Move Object';
export const AddObject = '[Canvas] Add Object';

export class LoadAction implements Action {
  readonly type = Load;
}

export class MoveObjectAction implements Action {
  readonly type = MoveObject;

  constructor(public payload: MoveObjectPayload) {}
}

export interface MoveObjectPayload {
  id: number;
  point: fabric.Point;
}

export class AddObjectAction implements Action {
  readonly type = AddObject;

  constructor(public payload: AddObjectPayload) {}
}

export interface AddObjectPayload extends Omit<CanvasAspect, 'id'> {}

export type Actions = LoadAction | MoveObjectAction | AddObjectAction;
