import { ISGBuildingInfo } from "@shares/*";

// function findFloorIndex( buildingInfos: ISGBuildingInfo[], orgChartName : string) : (bindex:number, findex:number) {

//     for (let i = 0; i < bui)

//     return (3, 2)
// }

// const findFloorIndex = (buildingInfos: ISGBuildingInfo[], orgChartName : string) => (bindex:number, findex:number) = {

// }

export function findFloorIndexByOrgchartName(
  buildingInfo?: ISGBuildingInfo[],
  orgChartName?: string
) {
  if (orgChartName && buildingInfo) {
    for (let i = 0; i < buildingInfo!.length; i++) {
      const fs = buildingInfo![i].floors;
      const idx =
        fs?.findIndex((fr) => {
          const itemIdx =
            fr.items?.findIndex((it) => it.orgChartName === orgChartName) ?? -1;
          return itemIdx !== -1;
        }) ?? -1;
      if (idx !== -1) {
        return { bindex: i, findex: idx };
      }
    }
  }

  return { bindex: 0, findex: 0 };
}

export function findFloorIndexByDeviceId(
  buildingInfo?: ISGBuildingInfo[],
  deviceId?: string
) {
  if (deviceId && buildingInfo) {
    for (let i = 0; i < buildingInfo!.length; i++) {
      const fs = buildingInfo![i].floors;
      const idx =
        fs?.findIndex((fr) => {
          const itemIdx =
            fr.items?.findIndex((it) => it.deviceId === deviceId) ?? -1;
          return itemIdx !== -1;
        }) ?? -1;
      if (idx !== -1) {
        return { bindex: i, findex: idx };
      }
    }

    // 청별안내에 등록되지않은 장비는 1층 1F
    if (buildingInfo.length > 0) {
      const bii = buildingInfo![0];
      const ffindex = bii.floors?.findIndex(
        (f) => f.buttonName === "1F" || f.buttonName === "1층"
      );
      if (ffindex !== -1) {
        return { bindex: 0, findex: ffindex };
      }
    }
  }

  return { bindex: 0, findex: 0 };
}
