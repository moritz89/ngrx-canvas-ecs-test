import { CanvasAspect } from './../store/models/aspects/canvas';
import { fabric } from 'fabric';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, ObjectUnsubscribedError } from 'rxjs';
import { takeUntil, mergeAll } from 'rxjs/operators';

import { bound } from '../utils/bound';
import * as fromStore from '../store/reducers';
import * as pump from '../store/actions/pump.actions';
import * as canvasAspect from '../store/actions/aspect/canvas.actions';
import * as uuid from 'uuid';

@Component({
  selector: 'app-floor-planner',
  templateUrl: './floor-planner.component.html',
  styleUrls: ['./floor-planner.component.css']
})
export class FloorPlannerComponent implements OnInit, OnDestroy {
  canvas: fabric.Canvas;

  // To be able to reference fabric objects by their ID, they are stored here
  objects: { [id: number]: fabric.Object } = {};

  addedFabricObject$: Observable<fabric.Object[]>;
  changedCanvasObjects$: Observable<CanvasAspect[]>;
  removedCanvasObjects$: Observable<CanvasAspect[]>;

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
    this.addedFabricObject$ = store.select(fromStore.getAddedFabricObject);
    this.changedCanvasObjects$ = store.select(
      fromStore.getChangedCanvasObjects
    );
    this.removedCanvasObjects$ = store.select(
      fromStore.getRemovedCanvasObjects
    );

    this.addedFabricObject$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        mergeAll()
      )
      .subscribe(object => {
        if (this.objects.hasOwnProperty(Number(object.name))) {
          this.canvas.remove(this.objects[Number(object.name)]);
          console.warn('re-adding existing objects');
        }
        this.canvas.add(object);
        this.objects[Number(object.name)] = object;
      });

    this.changedCanvasObjects$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        mergeAll()
      )
      .subscribe(object => {
        console.log(object);
        this.objects[object.id].set({ top: object.top, left: object.left });
        this.objects[object.id].setCoords();
        this.canvas.renderAll();
      });
    // canvasAspect2 => {
    // console.log(new fabric.Rect(this.pumpObject));
    // if (canvasAspect2) {
    //   this.canvas.add(canvasAspect2.object);
    // }}
    // this.removedCanvasObjects$
    //   .pipe(
    //     takeUntil(this.ngUnsubscribe),
    //     mergeAll()
    //   )
    //   .subscribe(fabricObject => {
    //     this.canvas.remove(fabricObject);
    //   });
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
    const target = options.target as fabric.Object;
    console.log(target.aCoords);
    this.store.dispatch(
      new canvasAspect.MoveAction({
        id: target.name,
        point_tl: target.aCoords.tl
      })
    );
  }

  create() {
    this.store.dispatch(
      new canvasAspect.AddAction({
        id: uuid.v4(),
        type: 'Rectangle',
        left: this.pumpObject.left,
        top: this.pumpObject.top,
        width: this.pumpObject.width,
        height: this.pumpObject.height,
        strokeWidth: this.pumpObject.strokeWidth,
        fill: this.pumpObject.fill
      })
    );
  }

  delete() {
    //   for (let pump of this.waterCycle.pumps) {
    //     pump.delete();
    //   }
  }

  clear() {
    this.canvas.clear();
    this.objects = {};
  }
}
