import { BaseMarkerViewModel } from "./BaseMarkerViewModel";

export class MarkerDragger {
  startX: number = 0;
  startY: number = 0;
  prevX: number = 0;
  prevY: number = 0;

  markerViewModel: BaseMarkerViewModel;

  private _pointName: string = "";

  flag: boolean = false;

  constructor(markerViewModel: BaseMarkerViewModel) {
    this.markerViewModel = markerViewModel;
  }

  mouseDown(pointName: string, x: number, y: number) {
    this.startX = this.markerViewModel.posX;
    this.startY = this.markerViewModel.posY;
    this.prevX = x;
    this.prevY = y;

    this._pointName = pointName;

    this.flag = true;
  }

  mouseMove(x: number, y: number, w: number, h: number, z: number) {
    const dx = x - this.prevX;
    const dy = y - this.prevY;
    this.prevX = x;
    this.prevY = y;

    if (this._pointName === "move") {
      this.markerViewModel.moveBy(dx, dy);

      //this.markerViewModel.move(dx, dy);
    } else if (this._pointName === "size") {
      this.markerViewModel.sizeBy(dx, dy);
    }
  }

  mouseMove2(dx: number, dy: number) {
    if (this._pointName === "move") {
      this.markerViewModel.moveBy(dx, dy);
    } else if (this._pointName === "size") {
      this.markerViewModel.sizeBy(dx, dy);
    }
  }
  mouseMove3(offsetX: number, offsetY: number) {
    if (this._pointName === "move") {
      this.markerViewModel.move(offsetX - this.prevX, offsetY - this.prevY);
    } else if (this._pointName === "size") {
      //this.markerViewModel.sizeBy(dx, dy);
    }
  }

  mouseUp(x: number, y: number) {
    // this.parentPositionItem.status = "stopDragging";
  }

  // get style() {
  //   if (this.markerViewModel.markerType === "Department") {
  //     const departmentMarker = this
  //       .markerViewModel as DepartmentMarkerViewModel;
  //     return {
  //       // transform: `translate3d(${this.groupSeatViewModel.tx}px, ${this.groupSeatViewModel.ty}px, 0)`,
  //       left: this.markerViewModel.posX,
  //       top: this.markerViewModel.posY,
  //       transform: `rotateX(${departmentMarker.xAngle}deg) skew(${departmentMarker.skew}deg)`,
  //       //transform: "rotate3d(1, 0, 0, 45deg)",
  //       // transform: `translate3d(${this.markerViewModel.posX}px, ${this.markerViewModel.posY}px, 0)`,
  //       // transform: `translate3d(${this.groupSeatViewModel.tx}px, ${this.groupSeatViewModel.ty}px, 0)`,
  //     };
  //   } else {
  //     return {
  //       // transform: `translate3d(${this.groupSeatViewModel.tx}px, ${this.groupSeatViewModel.ty}px, 0)`,
  //       left: this.markerViewModel.posX,
  //       top: this.markerViewModel.posY,
  //       //transform: "rotate3d(1, 0, 0, 45deg)",
  //       // transform: `translate3d(${this.markerViewModel.posX}px, ${this.markerViewModel.posY}px, 0)`,
  //       // transform: `translate3d(${this.groupSeatViewModel.tx}px, ${this.groupSeatViewModel.ty}px, 0)`,
  //     };
  //   }
  // }
}
