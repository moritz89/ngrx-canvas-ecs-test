import { fabric } from 'fabric';
import { Observable, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, mergeMap, switchMap, mapTo } from 'rxjs/operators';
import { of } from 'rxjs';

import * as pump from '../actions/pump.actions';
import * as canvasAspect from '../actions/aspect/canvas.actions';

const pumpObject = {
  left: 50,
  top: 50,
  strokeWidth: 0,
  width: 20,
  height: 30,
  fill: 'blue'
};

@Injectable()
export class PumpEffects {
  public pumpId = 0;
  public fabricId = 0;

  @Effect()
  requestNewPump$: Observable<Action> = this.actions$.pipe(
    ofType(pump.Create)
    // mapTo(new pump.AddAction({id: 0, name: '', fabricId: 0}))
    // tap(action => this.pumpId += 1),
    // tap(action => this.fabricId += 1),
    // mergeMap(action => {
    //   return [
    //     new pump.AddAction({
    //       id: this.pumpId,
    //       name: 'me pump',
    //       fabricId: this.fabricId
    //     }),
    //     new canvasAspect.AddFabricObject({
    //       itemId: this.pumpId,
    //       object: new fabric.Rect(pumpObject)
    //     })
    //   ];
    // })
  );

  constructor(private actions$: Actions) {}
}
