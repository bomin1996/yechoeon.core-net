import { ISGFloorItem } from "./ISGFloorItem";

export interface ISGFloor {
  id: number;
  buildingId: number;
  title: string;
  buttonName: string;
  floorImage: string;
  order: number;
  items?: Array<ISGFloorItem>;

  modifiedTime?: string;
  modifier?:string;

  floorMapType?: number;
}
