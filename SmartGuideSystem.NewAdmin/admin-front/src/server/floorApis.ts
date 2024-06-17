import axios from "axios";

import { FloorMapViewModel } from "@/viewmodels/floor_map/FloorMapViewModel";
import { ISGBuildingInfo, ISGFloor } from "@shares/ISGFloor";
import { ISGFloorItem } from "@shares/ISGFloorItem";
import { FloorItemActionType } from "@shares/FloorItemActionType";

export namespace FloorApis {
  // function indexForFloorItemAction(index: number): FloorItemActionType {
  //   switch (index) {
  //     case 0:
  //       return "ShowOrganizationChart";
  //     case 1:
  //       return "ShowFloorMap";
  //     case 2:
  //     default:
  //       return "ShowInfoPopup";
  //   }
  // }

  function indexForFloorItemAction(index: number): FloorItemActionType {
    switch (index) {
      case 0:
        return "ShowOrganizationChart";
      case 1:
      default:
        return "ShowInfoPopup";
    }
  }

  export async function updateFloor_old(vm: FloorMapViewModel) {
    try {
      const w = vm.width * vm.zoom;
      const h = vm.height * vm.zoom;
      const items: Array<ISGFloorItem> = [];
      vm.markers.forEach((it, index) => {
        const mitem: ISGFloorItem = {
          itemType: it.markerType,
          //   itemType: 0,

          title: it.title,
          content: it.content,

          x: (it.posX / w) * 100,
          y: (it.posY / h) * 100,
          width: (it.width / w) * 100,
          height: (it.height / h) * 100,
          //   deviceId:
          //     it.markerType === "KioskDevice"
          //       ? (it as KioskDeviceMarkerViewModel).deviceId
          //       : "",
          //   deptCode:
          //     it.markerType === "Department"
          //       ? (it as DepartmentMarkerViewModel).departmentCode
          //       : "",
          deviceId: it.deviceId,
          deptCode: it.deptCode,
          deptName: it.deptName,

          action: indexForFloorItemAction(it.actionIndex),
          //   action: it.actionIndex,
        };
        items.push(mitem);
      });

      // console.log("request floor items:", items);
      //https://localhost:7130/api/SharedApi/UpdateFloorItems?floorId=9&title=adsfsdfdddddfsdf
      const res = await fetch(
        `/api/SharedApi/UpdateFloorItems?floorId=${vm.id}&imageUrl=${vm.floorImageUrl}&title=${vm.title}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(items),
        }
      );

      const resultJson = await res.json();
      return resultJson;
    } catch (exc) {
      console.log("floorApi.updateitems", exc);
      return null;
    }
  }

  export async function buildings() {
    // const res = await fetch("/api/floors/buildings");
    //   const json = await res.json();
    try {
      const res = await axios.get("/api/floors/buildings");
      if (res.status === 200) {
        return res.data;
      } else {
        console.log("status:", res);
      }
    } catch (exc) {}
  }

  export async function updateFloor(vm: FloorMapViewModel) {
    try {
      const w = vm.width * vm.zoom;
      const h = vm.height * vm.zoom;
      const items: Array<ISGFloorItem> = [];
      vm.markers.forEach((it, index) => {
        const mitem: ISGFloorItem = {
          itemType: it.markerType,
          //   itemType: 0,
          title: it.title,
          content: it.content,
          x: (it.posX / w) * 100,
          y: (it.posY / h) * 100,

          width: (it.width / w) * 100,
          height: (it.height / h) * 100,
          deviceId: it.deviceId,
          deptCode: it.deptCode,
          deptName: it.deptName,
          organizationChartId: it.orgChartId,
          orgChartName: it.orgChartName,
          action: indexForFloorItemAction(it.actionIndex),
        };
        items.push(mitem);
      });

      const body = {
        id: vm.id,
        order: vm.order,
        floorMapType: vm.floorMapType,
        buildingId: vm.buildingId,
        buttonName: vm.buttonName,
        title: vm.title,
        floorImage: vm.floorImageUrl,
        items: items,
      };
      console.log("request floor items:", body);
      const res = await axios.post("/api/floors", body);

      console.log("response floor items:", res);
      return res;
    } catch (exc) {
      console.log("floorApi.updateitems exception:", exc);
      //return null;
      window.location.replace("/");
    }
  }

  export async function deleteFloor_old(floor: ISGFloor) {
    try {
      const res = await fetch(`/api/SharedApi/floor?floorId=${floor.id}`, {
        method: "DELETE",
      });

      const resultJson = await res.json();
      return resultJson;
    } catch (exc) {
      console.log(exc);
      return null;
    }
  }

  export async function deleteFloor(floor: ISGFloor) {
    try {
      const res = await axios.delete(`/api/floors/${floor.id}`);
      return res;
    } catch (exc) {
      console.log("exception:", exc);
      return null;
    }
  }

  export async function existFloorName(
    buildingId: number,
    floorName: string,
    floorMapType: number = 0
  ) {
    try {
      const res = await axios.get(
        `/api/floors/buildings/${buildingId}/${floorName}/${floorMapType}/exist`
      );
      return res;
    } catch (exc) {
      console.log(exc);
    }
  }

  export async function addBuilding(buildingInfo: ISGBuildingInfo) {
    try {
      const res = await axios.post("/api/floors/buildings", buildingInfo);
      if (res) {
        const resultJson = res.data;
        return { result: resultJson };
      } else {
        return { error: "서버오류" };
      }
    } catch (exc) {
      console.log(exc);
      return { error: exc };
    }
  }

  export async function deleteBuilding(id: number) {
    try {
      const res = await axios.delete(`/api/floors/buildings/${id}`);
      if (res) {
        const resultJson = res.data;
        return { result: resultJson };
      } else {
        return { error: "서버오류" };
      }
    } catch (exc) {
      console.log(exc);
      return { error: exc };
    }
  }
}
