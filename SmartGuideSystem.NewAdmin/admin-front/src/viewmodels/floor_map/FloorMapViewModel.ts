import { FloorItemActionType } from "@shares/FloorItemActionType";
import { makeObservable, observable, runInAction } from "mobx";
import { BaseMarkerViewModel } from "./BaseMarkerViewModel";
import { DepartmentMarkerViewModel } from "./DepartmentMarkerViewModel";
import { KioskDeviceMarkerViewModel } from "./KioskDeviceMarkerViewModel";
import { ISGFloor, ISGFloorItem } from "@shares/*";

export class FloorMapViewModel {
  removeMarker(markerVM: BaseMarkerViewModel | null) {
    if (markerVM) {
      const index = this.markers.findIndex((m) => m === markerVM);
      if (index !== -1) {
        this.markers.splice(index, 1);
        if (this.selectedMarkerVM === markerVM) {
          this.selectedMarkerVM = null;
        }
      }
    }
  }
  //private _selectedMarkerVM: BaseMarkerViewModel | null = null;
  _selectedMarkerVM: BaseMarkerViewModel | null = null;

  hasSelected: boolean = false;

  id: number = 0;
  buttonName: string = "";
  buildingId: number = -1;

  // width: number = 1920;
  // height: number = 1080;
  width: number = 1920 / 2;
  height: number = 1080 / 2;
  fontSize: number = 20;

  order: number = 0;

  floorMapType: number = 0;

  private _activeMarkerVM: BaseMarkerViewModel | null = null;
  markers: Array<BaseMarkerViewModel> = [];
  get selectedMarkerVM(): BaseMarkerViewModel | null {
    return this._selectedMarkerVM;
  }
  set selectedMarkerVM(item: BaseMarkerViewModel | null) {
    runInAction(() => {
      this._selectedMarkerVM?.setSelected(false);
      this._selectedMarkerVM = item;
      this._selectedMarkerVM?.setSelected(true);
    });
  }

  floorImageUrl: string = "";
  title: string = "";

  zoom: number = 1;

  setZoom(newZoom: number) {
    const ratio = this.zoom / newZoom;

    runInAction(() => {
      this.zoom = newZoom;

      this.markers.forEach((m) => {
        m.posX /= ratio;
        m.posY /= ratio;
        m.width /= ratio;
        m.height /= ratio;
      });
    });
  }

  constructor() {
    makeObservable(this, {
      markers: observable,
      floorImageUrl: observable,
      title: observable,
      _selectedMarkerVM: observable,
      hasSelected: observable,
      buttonName: observable,
      zoom: observable,
      fontSize: observable,
      order: observable,
      floorMapType: observable,
    });
  }

  mouseDown(
    pointName: string,
    clientX: number,
    clientY: number,
    item: BaseMarkerViewModel
  ) {
    console.log("FloorMapViewModel:mouseDown:pointname:", pointName);

    this.selectedMarkerVM = item;
    this._activeMarkerVM = item;
    this._activeMarkerVM.dragger.mouseDown(pointName, clientX, clientY);
    this.hasSelected = true;
  }
  mouseMove(clientX: number, clientY: number) {
    this._activeMarkerVM?.dragger.mouseMove(
      clientX,
      clientY,
      this.width,
      this.height,
      this.zoom
    );
  }
  mouseMove2(clientX: number, clientY: number) {
    //this._activeMarkerVM?.dragger.mouseMove2(clientX, clientY);
    const ox = Math.max(0, Math.min(this.width, clientX));
    const oy = Math.max(0, Math.min(this.height, clientY));

    const px = (ox / this.width) * 100;
    const py = (oy / this.height) * 100;

    this._activeMarkerVM?.move(px, py);
  }
  mouseMove3(offsetX: number, offsetY: number) {
    this._activeMarkerVM?.dragger.mouseMove3(offsetX, offsetY);
  }
  mouseUp(clientX: number, clientY: number) {
    this._activeMarkerVM = null;
    //this.selectedMarkerVM = null;
    this.hasSelected = false;
  }

  addDepartmentMarker(title: string) {
    runInAction(() => {
      const dm = new DepartmentMarkerViewModel();
      dm.title = title;
      this.markers.push(dm);
    });
  }

  addKioskDeviceMarker(deviceId: string, deptCode: string) {
    const kd = new KioskDeviceMarkerViewModel();
    kd.deviceId = deviceId;
    kd.title = deviceId;
    kd.deptCode = deptCode;
    this.markers.push(kd);
  }

  static actionIndex(action: FloorItemActionType) {
    // switch (action) {
    //   case "ShowOrganizationChart":
    //     return 0;
    //   case "ShowFloorMap":
    //     return 1;
    //   case "ShowInfoPopup":
    //   default:
    //     return 2;
    // }

    switch (action) {
      case "ShowOrganizationChart":
        return 0;
      case "ShowInfoPopup":
      default:
        return 1;
    }
  }
  static from(floor: ISGFloor): FloorMapViewModel {
    const vm = new FloorMapViewModel();
    vm.title = floor.title;
    vm.floorImageUrl = floor.floorImage;
    vm.id = floor.id;
    vm.order = floor.order;
    vm.buildingId = floor.buildingId;
    vm.buttonName = floor.buttonName;
    vm.floorMapType = floor.floorMapType ?? 0;

    if (floor.items) {
      floor.items.forEach((item, index) => {
        switch (item.itemType) {
          case "Department":
            // case 0:
            {
              const m = new DepartmentMarkerViewModel();
              m.title = item.title ?? "";
              m.posX = (item.x / 100) * vm.width;
              m.posY = (item.y / 100) * vm.height;
              m.width = (item.width / 100) * vm.width;
              m.height = (item.height / 100) * vm.height;
              m.deptCode = item.deptCode ?? "";
              m.deptName = item.deptName ?? "";
              m.content = item.content ?? "";
              m.actionIndex = FloorMapViewModel.actionIndex(item.action);
              // m.actionIndex = item.action;
              m.orgChartId = item.organizationChartId ?? 0;
              m.orgChartName = item.orgChartName ?? "";
              vm.markers.push(m);
            }
            break;
          case "KioskDevice":
            // case 1:
            {
              const m = new KioskDeviceMarkerViewModel();
              m.title = item.title ?? item.deviceId ?? "";
              m.posX = (item.x / 100) * vm.width;
              m.posY = (item.y / 100) * vm.height;
              m.width = item.width;
              m.height = item.height;
              m.deptCode = item.deptCode ?? "";
              m.deptName = item.deptName ?? "";
              m.content = item.content ?? "";
              m.deviceId = item.deviceId ?? "";
              vm.markers.push(m);
            }
            break;

          case "None":
            break;
        }
      });
    }

    return vm;
  }
}

const storeModel = new FloorMapViewModel();
export default storeModel;
