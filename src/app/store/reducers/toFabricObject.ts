import { fabric } from 'fabric';
import { CanvasAspect } from '../models/aspects/canvas';

export function toFabricObject(canvasAspect: CanvasAspect): fabric.Object {
  switch (canvasAspect.type) {
    case 'rectangle':
      return new fabric.Rect({
        name: canvasAspect.id,
        top: canvasAspect.top,
        left: canvasAspect.left,
        width: canvasAspect.width,
        height: canvasAspect.height,
        strokeWidth: canvasAspect.strokeWidth,
        fill: canvasAspect.fill
      });
      break;
    default:
      return null;
      break;
  }
}
