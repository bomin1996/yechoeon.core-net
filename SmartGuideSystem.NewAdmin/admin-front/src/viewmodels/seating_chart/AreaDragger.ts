import { makeObservable, observable, runInAction } from "mobx";
import SgsRect from "@/helpers/SgsRect";

export class AreaDragger {
  isDragging: boolean = false;
  startX: number = 0;
  startY: number = 0;
  moveX: number = 0;
  moveY: number = 0;

  constructor() {
    makeObservable(this, {
      isDragging: observable,
      startX: observable,
      startY: observable,
      moveX: observable,
      moveY: observable,
    });
  }

  rectangle(): SgsRect {
    const x1 = Math.min(this.startX, this.moveX);
    const x2 = Math.max(this.startX, this.moveX);
    const y1 = Math.min(this.startY, this.moveY);
    const y2 = Math.max(this.startY, this.moveY);

    return new SgsRect(x1, y1, x2 - x1, y2 - y1);
  }

  startDragging(x: number, y: number) {
    runInAction(() => {
      this.isDragging = true;
      this.startX = x;
      this.startY = y;
      this.moveX = x;
      this.moveY = y;
    });
  }

  dragging(x: number, y: number) {
    runInAction(() => {
      this.moveX = x;
      this.moveY = y;
    });
  }

  endDragging(x: number, y: number) {
    runInAction(() => {
      this.isDragging = false;
    });
  }
}
