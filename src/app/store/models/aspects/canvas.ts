export interface CanvasAspect {
  id: string; // UUID
  type: string; // Representation type: rectangle, SVG, circle

  top: number; // The offset from the top
  left: number; // The offset from the left
  width: number; // The width of the object
  height: number; // The height of the object

  url?: string; // The asset location of a bitmap or SVG

  strokeWidth?: number; // Width of the stroke
  fill?: string; // Color of the fill
}
