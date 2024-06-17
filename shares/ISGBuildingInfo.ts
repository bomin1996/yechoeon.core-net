import { ISGFloor } from "./ISGFloor";

export interface ISGBuildingInfo {
    id: number;
    deptCode: string;
    name: string;
    floorIds:Array<number>;
    floors?: Array<ISGFloor>;
}