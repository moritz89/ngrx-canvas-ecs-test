import { fabric } from 'fabric';
import { Action } from '@ngrx/store';

export enum CanvasActionTypes {
  LoadCanvass = '[Canvas] Load Canvass',
  SnapCanvass = '[Canvas] Snap Canvass',
  AddFabricObject = '[Canvas] Add Canvass'
}

export class LoadCanvass implements Action {
  readonly type = CanvasActionTypes.LoadCanvass;
}

export class SnapCanvass implements Action {
  readonly type = CanvasActionTypes.SnapCanvass;

  constructor(public payload: SnapCanvassPayload) {}
}

interface SnapCanvassPayload {
  itemId: number;
}

export class AddFabricObject implements Action {
  readonly type = CanvasActionTypes.AddFabricObject;

  constructor(public payload: AddFabricObjectPayload) {}
}

interface AddFabricObjectPayload {
  itemId: number;
  object: fabric.Object;
}

export type CanvasActions = LoadCanvass | SnapCanvass | AddFabricObject;
