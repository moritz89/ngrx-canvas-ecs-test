import { fabric } from "fabric";

declare module "fabric" {
  namespace fabric {
    interface Object {
      itemId: number;
    }
  }
}
