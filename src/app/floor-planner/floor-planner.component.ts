import { Component, OnInit, OnDestroy } from "@angular/core";
import { fabric } from "fabric";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { bound } from "../utils/bound";
import * as fromStore from "../store/reducers";
import { CanvasAspect } from "../store/models/aspects/canvas";
import * as canvasAspect from "../store/actions/aspect/canvas.actions";

@Component({
  selector: "app-floor-planner",
  templateUrl: "./floor-planner.component.html",
  styleUrls: ["./floor-planner.component.css"]
})
export class FloorPlannerComponent implements OnInit, OnDestroy {
  canvas: fabric.Canvas;
  canvasAspects$: Observable<CanvasAspect[]>;

  constructor(private store: Store<fromStore.State>) {
    this.canvas = new fabric.Canvas("canvas");
    this.canvasAspects$ = store.select(fromStore.getCanvasAspectEntities);
  }

  ngOnInit() {
    this.canvas.backgroundColor = "gray";
    this.canvas.renderAll();

    this.canvas.on({
      "object:moved": this.objectMovedHandler
    });
  }

  ngOnDestroy(): void {}

  @bound
  private objectMovedHandler(options: any) {
    this.store.dispatch(new canvasAspect.SnapCanvass(options.target));

    if (!this.isSnapped(options.target)) {
      // this.snapObject(options.target);
    }
  }

  private isSnapped(object: fabric.Object): boolean {
    // const boundingRect = object.getBoundingRect();
    // if (
    //   boundingRect.left % this.gridSpacingY ||
    //   boundingRect.top % this.gridSpacingX
    // ) {
    //   return false;
    // } else {
    //   return true;
    // }
    return true;
  }

  create() {
    //   for (let i = 0; i < 10000; i++) {
    //     new Pump(
    //       this.canvas,
    //       this.waterCycle,
    //       this.electricalGrid,
    //       this.electricalGrid2,
    //       this.electricalGrid3
    //     );
    //   }
  }

  delete() {
    //   for (let pump of this.waterCycle.pumps) {
    //     pump.delete();
    //   }
  }
}
