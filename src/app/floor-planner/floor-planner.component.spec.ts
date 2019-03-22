import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorPlannerComponent } from './floor-planner.component';
import { Store, StoreModule } from '@ngrx/store';

describe('FloorPlannerComponent', () => {
  let component: FloorPlannerComponent;
  let fixture: ComponentFixture<FloorPlannerComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ FloorPlannerComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorPlannerComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
