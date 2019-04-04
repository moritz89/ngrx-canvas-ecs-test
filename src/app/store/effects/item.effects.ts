import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, concat, of, EMPTY } from 'rxjs';
import { concatMap, tap, map, mergeMap, catchError } from 'rxjs/operators';

import * as item from '../actions/item.actions';
const api = 'http://localhost:8000/items/';

@Injectable()
export class ItemEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  addItem$: Observable<Action> = this.actions$.pipe(
    ofType<item.AddAction>(item.Add),
    concatMap(action =>
      concat(
        item.createAddAspectActions(action.payload.aspects),
        this.http.post(api, JSON.stringify(action.payload)).pipe(
          tap(res => console.log(res)),
          map(res => new item.AddSuccessAction()),
          catchError(err => {
            console.log(err);
            return of(new item.AddFailureAction());
          })
        )
      )
    )
  );
}
