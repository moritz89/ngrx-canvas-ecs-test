import { fabric } from 'fabric';
import { CanvasAspect } from '../models/aspects/canvas';

export function toFabricObject(canvasAspect: CanvasAspect): fabric.Object {
  switch (canvasAspect.type) {
    case 'Rectangle':
      return new fabric.Rect({
        name: String(canvasAspect.id),
        top: canvasAspect.top,
        left: canvasAspect.left + 40 * canvasAspect.id,
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
