import { fabric } from 'fabric';

declare module 'fabric' {
  namespace fabric {
    interface Object {
      id: number;
    }
  }
}
