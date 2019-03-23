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
  itemId?: number;
  type: string; // Representation type: rectangle, SVG, circle

  top: number; // The offset from the top
  left: number; // The offset from the left
  width: number; // The width of the object
  height: number; // The height of the object

  url?: string; // The asset location of a bitmap or SVG

  strokeWidth?: number; // Width of the stroke
  fill?: string; // Color of the fill
}
