import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store, Action, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, concat, of, EMPTY } from 'rxjs';
import {
  concatMap,
  tap,
  map,
  mergeMap,
  catchError,
  first
} from 'rxjs/operators';

import * as fromStore from '../reducers';
import * as item from '../actions/item.actions';

const api = 'http://localhost:8000/items/';

@Injectable()
export class ItemEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store$: Store<fromStore.State>
  ) {}

  @Effect()
  addItem$: Observable<Action> = this.actions$.pipe(
    ofType<item.AddAction>(item.Add),
    concatMap(action =>
      concat(
        item.createAddAspectActions(action.payload.aspects),
        this.http.post(api, JSON.stringify(action.payload)).pipe(
          tap(res => console.log(res)),
          map(() => new item.AddSuccessAction()),
          catchError(err => {
            console.log(err);
            return of(new item.AddFailureAction(action.payload));
          })
        )
      )
    )
  );

  @Effect()
  addItemFailure$: Observable<Action> = this.actions$.pipe(
    ofType<item.AddFailureAction>(item.AddFailure),
    mergeMap(action => item.createRemoveAspectActions(action.payload.aspects))
  );

  @Effect()
  removeItem$: Observable<Action> = this.actions$.pipe(
    ofType<item.RemoveAction>(item.Remove),
    mergeMap(action =>
      this.store$.pipe(
        select(fromStore.getAspectsByID(action.payload.id)),
        first()
      )
    ),
    mergeMap(aspects => item.createRemoveAspectActions(aspects))
  );
}
