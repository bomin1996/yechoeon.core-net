import { ISGDepartment } from "./ISGDepartment";
import { ISGEditTeam, ISGTeam } from "./ISGTeam";
import { ISGEditUser, ISGUser } from "./ISGUser";
export interface ISGOrganizationChart {
  id: number;
  deptCode: string;
  title: string;
  chartType: string;
  useYn: boolean;

  name: string;
  desc: string;

  //////////////
  topDeptLeader?: ISGUser;
  deptLeader?: ISGUser;
  teams?: Array<ISGTeam>;
  department?: ISGDepartment;

  /////// 과정보
  officeTel?: string;
  officeFax?: string;
  departJob?: string;

  dontShowTeamDetailButton?: boolean;


  modifiedTime?: string;
  modifier?:string;
}

export interface ISGEditOrganizationChart {
  id: number;
  deptCode: string;
  deptName: string;
  title: string;
  chartType: string;

  name: string;
  desc: string;

  /////// 편집된 과정보
  officeTel?: string;
  officeFax?: string;
  departJob?: string;

  dontShowTeamDetailButton?: boolean;

  topDeptLeader?: ISGEditUser;
  deptLeader?: ISGEditUser;
  teams?: Array<ISGEditTeam>;
}
