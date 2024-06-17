import { IBannerImageInfo } from "./IBannerImageInfo";
import { ISGNoticeInfo } from "./ISGNoticeInfo";
import {
  ISGBuildingInfo,
  ISGDevice,
  ISGGosigonggo,
  IConferenceScheduleInfo,
  ISGOrganizationChart,
  IWeatherInfo,
  ISGSeatPosChart,
  ISGCouncilConfig,
  ISGMeetingInfo,
  ISGContentLayout,
  ISGLocalMap,
  IYCWatcher,
  IYCSchedule,
} from ".";

export interface ISGKioskInfo {
  deviceInfo?: ISGDevice;
  buildingInfo?: ISGBuildingInfo[];
  organizationChart?: ISGOrganizationChart;
  gosigonggoInfo?: ISGGosigonggo[];
  noticeInfo?: ISGNoticeInfo[];
  bannerImageInfo?: IBannerImageInfo;
  conferenceScheduleInfo?: IConferenceScheduleInfo;
  weatherAndAirInfo?: IWeatherInfo;
  seatPosChart?: ISGSeatPosChart;
  councilConfig?: ISGCouncilConfig;
  meetingInfo?: ISGMeetingInfo[];
  promotion?: ISGContentLayout;
  localmap?: ISGLocalMap;
  contents?: ISGContentLayout[];
  watchers?: IYCWatcher[];
  schedules?: IYCSchedule[];
}
