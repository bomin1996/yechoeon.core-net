import { FloorItemType } from "@shares/*";
import { makeObservable, observable, runInAction } from "mobx";
import { BaseMarkerViewModel } from "./BaseMarkerViewModel";

export class DepartmentMarkerViewModel extends BaseMarkerViewModel {
  get markerType(): FloorItemType {
    return "Department";
  }

  // departmentCode: string = "";
  // departmentName: string = "";

  skew: number = 0;
  xAngle: number = 0;

  // content: string = "";

  override get style(): object {
    return {
      left: this.posX * 1,
      top: this.posY * 1,
      // left: `${this.posX}%`,
      // top: `${this.posY}%`,

      width: this.width * 1,
      height: this.height * 1,
      transform: `rotateX(${this.xAngle}deg) skew(${this.skew}deg)`,
    };
  }

  constructor() {
    super();
    makeObservable(this, {
      skew: observable,
      xAngle: observable,
      // content: observable,
      // actionIndex: observable,
    });
  }

  setTitle(title: string) {
    // runInAction(() => {
    //   this.title = title;
    // });

    this.title = title;
  }
}
