import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, concat, of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

import * as item from '../actions/item.actions';
// const api = 'http://127.0.0.1:8000/items/';

@Injectable()
export class ItemEffects {
  constructor(private actions$: Actions, private http$: HttpClient) {}

  @Effect()
  addItem$: Observable<Action> = this.actions$.pipe(
    ofType<item.AddAction>(item.Add),
    concatMap(action =>
      concat(
        item.createAddAspectActions(action.payload.aspects),
        // this.http$.post(api, item.toJSON(action.payload))
      )
    )
  );
}
