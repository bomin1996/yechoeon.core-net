import {
  ISGBuildingInfo,
  ISGDevice,
  ISGGosigonggo,
  ISGOrganizationChart,
  KioskType,
} from "@shares/*";
import { DeviceInfo } from "./DeviceInfo";
import { IGroupPosition } from "./OrganizationChart";

export interface KioskInfo {
  // deviceId: string;
  // kioskType: KioskType;
  // deviceInfo: IDeviceInfo;
  // buildingInfos?: IBuildingInfo[];
  // organizationChart?: IOrganizationChart;
  // gosigonggoInfos?: IGosigonggoInfo[];
  // noticeInfo?: INoticeInfo[];
  localDeviceId: string;
  status: string;
  deviceInfo?: ISGDevice;
  buildingInfo?: ISGBuildingInfo[];
  organizationChart?: ISGOrganizationChart;
  gosigonggoInfo?: ISGGosigonggo[];
}

export interface IDeviceInfo {
  deviceId: string;
  kioskType: KioskType;
}

export interface IBuildingInfo {
  // "id":1,
  // "name":"시청사",
  // "title":"진주시청사",
  // "floorInfos":

  id: number;
  name: string;
  title: string;
  floorInfos?: IFloorInfo[];
}

export interface IFloorInfo {
  // "id":2,
  //            "name":"2F",
  //            "title":"시청사 2층",
  //            "backgroundUrl":null,
  //            "organiztionPartLocationInfoJSON":null,
  //            "deviceLocationInfoJSON":null
  id: number;
  name: string;
  title: string;
  backgourndUrl?: string;
}

export interface IOrganizationChart {
  GroupPositionInfos: IGroupPositionInfo[];
}

export interface IGroupPositionInfo extends IGroupPosition {
  // Title: string;
  // GroupType?:string;
  // X:number;
  // Y:number;
  Items: IMemberItem[];
}
export interface IMemberItem {
  Member: IMember;
}
export interface IMember {
  name: string;
  grade: string;
  status?: string;
  jobDescription: string;
  address?: string;
  tel: string;
  fax?: string;
  imageUrl?: string;
  teaminfo?: ITeamInfo;
}

export interface ITeamInfo {
  Type: string;
  Name: string;
  JobDescription: string;
  Depth: number;
  Contact: string;
  Tel: string;
  Fax: string;
}

export interface IGosigonggoInfo {
  title: string;
  gosiNumber: string;
  postDate: String;
  startPeriod: string;
  endPeriod: string;
  dept: string;
  contact: string;
  attachmentFiles: string[];
  contents: string;
  gosigonggoType: number;
}

// export interface INoticeInfo {
//   title: string;
//   postDate: String;
//   dept: string;
//   contact: string;
//   attachmentFiles: string[];
//   imageFiles: string[];
//   contents: string;
//   views: number;
// }
