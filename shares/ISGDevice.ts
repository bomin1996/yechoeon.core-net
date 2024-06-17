import { IDeviceExtraSettings } from "./IDeviceExtraSettings";
import { KioskType } from "./KioskType";
export interface ISGDevice {
  id: number;
  deviceId: string;
  kioskType: KioskType;
  deptCode?: string;
  deptName?: string;
  updatedTime: string;
  modifierId: string;
  desc?: string;
  use: boolean;
  orgChartId?: number;
  orgChartName?: string;
  modifiedTime?: string;
  modifier?: string;
  extraSettings?: IDeviceExtraSettings;

  chartId?: number;
  chartName?: string;
}
