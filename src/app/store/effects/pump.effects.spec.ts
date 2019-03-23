import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PumpEffects } from './pump.effects';

describe('PumpEffects', () => {
  let actions$: Observable<any>;
  let effects: PumpEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PumpEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(PumpEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
