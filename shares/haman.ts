import { ISGContentLayout } from "./ISGContentLayout";
import { ISGDevice } from "./ISGDevice";

export interface IHACycleParkingLotInfo {
  parkingLotId: number;
  name: string;
  place: string;
  // usedCount: number;
  // totalCount: number;
  // lat: number;
  // lng: number;
  holder: number;
  currentBikeCount: number;
  latitude: number;
  longitude: number;

  memo?: string;
  useYn: string;
}

export interface IHACycleParkingInfo {
  parkingLots: Array<IHACycleParkingLotInfo>;
  mapImageUrl: string;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface IHAStoreInfo {
  id: number;
  name: string;
  address: string;
  tel: string;
  storeDesc: string;
  thumbnail: string;
  contents?: Array<string>;

  startPubTime?: string;
  endPubTime?: string;

  useYn: boolean;
  modifiedTime?: string;
  modifier?: string;
  approval?: string;
}

export interface IHAStoreData {
  stores: Array<IHAStoreInfo>;
}

export interface IHAKioskInfo {
  deviceInfo?: ISGDevice;
  promotion?: ISGContentLayout;
  cycleParkingInfo: IHACycleParkingInfo;
  storeData: IHAStoreData;
  busData: Array<IHABusData>;
  cycleparking?: Array<IHACycleParkingLotInfo>;
}

// export interface IHABusData {
//   busTypes: Array<IHABusInfo>;
// }

export interface IHABusData {
  title: string;
  routes: Array<IHABusInfo>;
}

export interface IHABusInfo {
  id: number;
  dataType?: string;
  busRouteViewType?: string;
  busTypeName?: string;
  busRouteName?: string;
  imageUrl?: string;
  desc?: string;
  useYn?: boolean;
  modifiedTime?: string;
  modifier?: string;
}

// export interface IHABusInfo {
//   id: number;
//   name: string;
//   busFareImageUrl?: string;
//   subTitleType?: number;
//   busRoutes?: Array<IHABusRouteInfo>;
// }

// export interface IHABusRouteInfo {
//   id: number;
//   name: string;
//   routeImageUrl?: string;
//   useYn?: boolean;
//   modifiedTime?: string;
//   modifier?: string;
//   desc?: string;
// }
