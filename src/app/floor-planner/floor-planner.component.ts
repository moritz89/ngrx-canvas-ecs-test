import { CanvasAspect } from './../store/models/aspects/canvas';
import { fabric } from 'fabric';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, ObjectUnsubscribedError } from 'rxjs';
import { takeUntil, mergeAll } from 'rxjs/operators';

import { bound } from '../utils/bound';
import * as fromStore from '../store/reducers';
import * as canvasAspect from '../store/actions/aspect/canvas.actions';
import * as item from '../store/actions/item.actions';
import { createPump } from '../store/items/pump';

@Component({
  selector: 'app-floor-planner',
  templateUrl: './floor-planner.component.html',
  styleUrls: ['./floor-planner.component.css']
})
export class FloorPlannerComponent implements OnInit, OnDestroy {
  canvas: fabric.Canvas;

  // To be able to reference fabric objects by their ID, they are stored here
  objects: { [id: string]: fabric.Object } = {};

  addedFabricObject$: Observable<fabric.Object[]> = this.store.select(
    fromStore.getAddedFabricObject
  );
  changedCanvasObjects$: Observable<CanvasAspect[]> = this.store.select(
    fromStore.getChangedCanvasObjects
  );
  removedCanvasObjects$: Observable<string[]> = this.store.select(
    fromStore.getRemovedCanvasAspectIds
  );

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store: Store<fromStore.State>) {
    this.addedFabricObject$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        mergeAll()
      )
      .subscribe(object => {
        if (this.objects.hasOwnProperty(object.name)) {
          this.canvas.remove(this.objects[object.name]);
          console.warn('re-adding existing objects');
        }
        this.canvas.add(object);
        this.objects[object.name] = object;
      });

    this.changedCanvasObjects$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        mergeAll()
      )
      .subscribe(object => {
        this.objects[object.id].set({ top: object.top, left: object.left });
        this.objects[object.id].setCoords();
        this.canvas.renderAll();
      });
    this.removedCanvasObjects$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        mergeAll()
      )
      .subscribe(id => this.canvas.remove(this.objects[id]));
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
    this.store.dispatch(
      new canvasAspect.MoveObjectAction({
        position: {
          id: target.name,
          point_tl: target.aCoords.tl
        }
      })
    );
  }

  create() {
    this.store.dispatch(new item.AddAction(createPump()));
  }

  delete() {
    Object.keys(this.objects).forEach(id =>
      this.store.dispatch(new item.RemoveAction({id}))
    );
  }

  clear() {
    this.canvas.clear();
    this.objects = {};
  }
}
