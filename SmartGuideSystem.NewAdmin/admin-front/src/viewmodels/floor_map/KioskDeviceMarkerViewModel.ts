import { makeObservable, observable } from "mobx";
import { FloorItemType } from "@shares/FloorItemType";
import { BaseMarkerViewModel } from "./BaseMarkerViewModel";

export class KioskDeviceMarkerViewModel extends BaseMarkerViewModel {
  // deviceId:string = "";
  // deptCode:string = "";
  // content: string = "";
  deviceTypeName: string = "";
  get markerType(): FloorItemType {
    return "KioskDevice";
  }

  override get style(): object {
    return {
      left: this.posX,
      top: this.posY,
    };
  }

  constructor() {
    super();
    makeObservable(this, {
      // deviceId:observable,
      // deptCode:observable,
      // content:observable,
      deviceTypeName: observable,
    });
  }
}
