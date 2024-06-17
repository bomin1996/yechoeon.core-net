import { makeObservable, observable, runInAction } from "mobx";
import { FloorItemType } from "@shares/";
import { MarkerDragger } from "./MarkerDragger";

export abstract class BaseMarkerViewModel {
  abstract get markerType(): FloorItemType;
  posX: number = 0;
  posY: number = 0;
  width: number = 200;
  height: number = 200;
  title: string = "";
  isSelected: boolean = false;

  deviceId: string = "";
  content: string = "";
  deptCode: string = "";
  deptName: string = "";
  actionIndex: number = 0;

  orgChartId:number = 0;
  orgChartName:string = "";

  _dragger?: MarkerDragger;
  get dragger(): MarkerDragger {
    if (!this._dragger) {
      this._dragger = new MarkerDragger(this);
    }
    return this._dragger!;
  }

  moveBy(dx: number, dy: number) {
    runInAction(() => {
      this.posX += dx;
      this.posY += dy;
    });
  }

  move(x: number, y: number) {
    runInAction(() => {
      this.posX = x;
      this.posY = y;
    });
  }

  sizeBy(dx: number, dy: number) {
    runInAction(() => {
      this.width += dx;
      this.height += dy;
    });
  }

  setSelected(selected: boolean) {
    runInAction(() => {
      this.isSelected = selected;
    });
  }

  abstract get style(): object;

  constructor() {
    makeObservable(this, {
      title: observable,
      posX: observable,
      posY: observable,
      width: observable,
      height: observable,
      isSelected: observable,
      content: observable,
      deptCode: observable,
      deptName: observable,
      actionIndex: observable,
      orgChartName: observable,
      orgChartId: observable,
    });
  }
}
