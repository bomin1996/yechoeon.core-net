import { IOrgChartOption } from "./IOrgChartOption";
import { IGosiOption } from "./IGosiOption";
import { ISGSeatPosChartOption } from "./ISGSeatPosChartOption";
import { ISGMeetingRoomOption } from "./ISGMeetingRoomOption";

export interface IDeviceExtraSettings {
  gosiOption?: IGosiOption;
  orgChartOption?: IOrgChartOption;
  floorMapType?: number;
  autoUpdateMS?: number;
  refreshMS?: number;
  seatPosChartOption?: ISGSeatPosChartOption;
  meetingRoomInfoOption?: ISGMeetingRoomOption;

  localMapOption?: ISGLocalMapOption;
  contentLayoutOption?: ISGContentLayoutOption;

  volume?: number;
  noticeFilter?: string;
  gosiFilter?: string; //강서

  locationOption?: ISGLocationOption;

  ycImageUrls?: Array<string>;
}

export interface ISGLocalMapOption {
  id: number;
  name: string;
}
export interface ISGContentLayoutOption {
  id: number;
  name: string;
  subId?: number;
  subName?: string;
}

export interface ISGLocationOption {
  longitude?: number;
  latitude?: number;
  ipAddress?: string;
}
