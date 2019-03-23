import { fabric } from 'fabric';
import '../../../utils/fabric-id';

/**
 * The aspect of models to be rendered on an HTML5 canvas.
 *
 * The fabric.Object type has been extended to include the item ID which is the
 * ID of the parent item. This allows the item to be accessed via fabric
 * callbacks.
 */
export interface CanvasAspect {
  id: number;
  object: fabric.Rect;
}
