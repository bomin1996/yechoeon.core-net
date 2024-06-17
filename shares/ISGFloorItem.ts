import { FloorItemActionType } from "./FloorItemActionType";
import { FloorItemType } from "./FloorItemType";

export interface ISGFloorItem {
  itemType: FloorItemType;
  //   itemType: number;

  title?: string;

  x: number;
  y: number;
  width: number;
  height: number;

  deviceId?: string;
  deptCode?: string;
  deptName?: string;

  organizationChartId?: number;
  orgChartName?: string;

  action: FloorItemActionType;
  //   action: number;

  content?: string;
}
