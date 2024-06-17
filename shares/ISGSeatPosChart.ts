import { ISGDepartment } from "./ISGDepartment";
import { ISGSCNode } from "./ISGSCNode";
export interface ISGSeatPosChart {
  id: number;

  name: string;
  desc?: string;

  deptCode: string;
  deptName: string;

  title?: string;
  officeTel?: string;
  officeFax?: string;
  jobDescription?: string;

  chartType: string;
  useYn: boolean;

  //////////////
  department?: ISGDepartment;
  nodes: Array<ISGSCNode>;

  modifiedTime?: string;
  modifier?: string;

  width?: number;
  height?: number;
}

export interface ISGMultiSeatPosChart {
  id: number;

  name: string;
  desc?: string;

  deptCode: string;
  deptName: string;

  title?: string;
  officeTel?: string;
  officeFax?: string;
  jobDescription?: string;

  chartType: string;
  useYn: boolean;

  //////////////
  department?: ISGDepartment;

  modifiedTime?: string;
  modifier?: string;

  chartNodes: Array<ISGSeatPosChartNode>;
}

export interface ISGSeatPosChartNode {
  keyName: string;
  width: number;
  height: number;
  nodes: Array<ISGSCNode>;
}
