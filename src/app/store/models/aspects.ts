import { CanvasAspect } from './aspects/canvas';
import { ElectricalAspect } from './aspects/electrical';
import { MetaAspect } from './aspects/meta';
import { WaterAspect } from './aspects/water';

export interface Aspects {
  canvas?: CanvasAspect;
  electrical?: ElectricalAspect;
  meta?: MetaAspect;
  water?: WaterAspect;
}
