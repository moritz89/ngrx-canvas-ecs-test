import { Action } from "@ngrx/store";

export enum CanvasActionTypes {
  LoadCanvass = "[Canvas] Load Canvass",
  SnapCanvass = "[Canvas] Snap Canvass"
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

export type CanvasActions = LoadCanvass | SnapCanvass;
