import { CanvasAspect } from './../store/models/aspects/canvas';
import { fabric } from 'fabric';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, mergeAll } from 'rxjs/operators';

import { bound } from '../utils/bound';
import * as fromStore from '../store/reducers';
import * as pump from '../store/actions/pump.actions';
import * as canvasAspect from '../store/actions/aspect/canvas.actions';

@Component({
  selector: 'app-floor-planner',
  templateUrl: './floor-planner.component.html',
  styleUrls: ['./floor-planner.component.css']
})
export class FloorPlannerComponent implements OnInit, OnDestroy {
  canvas: fabric.Canvas;
  changedCanvasObjects$: Observable<CanvasAspect[]>;
  removedCanvasObjects$: Observable<fabric.Object[]>;
  public pumpObject = {
    left: 50,
    top: 50,
    strokeWidth: 0,
    width: 20,
    height: 30,
    fill: 'blue'
  };

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store: Store<fromStore.State>) {
    this.changedCanvasObjects$ = store.select(
      fromStore.getChangedCanvasObjects
    );
    this.removedCanvasObjects$ = store.select(
      fromStore.getRemovedCanvasObjects
    );

    this.changedCanvasObjects$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        mergeAll()
      )
      .subscribe(canvasAspect2 => {
        console.log(new fabric.Rect(this.pumpObject));
        if (canvasAspect2) {
          this.canvas.add(canvasAspect2.object);
        }
      });
    this.removedCanvasObjects$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        mergeAll()
      )
      .subscribe(fabricObject => {
        this.canvas.remove(fabricObject);
      });
  }

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.backgroundColor = 'gray';
    this.canvas.renderAll();

    this.canvas.on({
      'object:moved': this.objectMovedHandler
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  @bound
  private objectMovedHandler(options: any) {
    // this.store.dispatch(new canvasAspect2.SnapCanvass(options.target));
    // if (!this.isSnapped(options.target)) {
    // this.snapObject(options.target);
    // }
  }

  create() {
    this.store.dispatch(
      new canvasAspect.AddFabricObject({
        itemId: 1,
        object: new fabric.Rect(this.pumpObject)
      })
    );
  }

  delete() {
    //   for (let pump of this.waterCycle.pumps) {
    //     pump.delete();
    //   }
  }
}
