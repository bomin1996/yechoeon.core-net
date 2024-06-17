import { MemberStatusType } from "./MemberStatusType";
export interface ISGUser {
  sid: string;
  name: string;
  photo?: string;
  deptCode: string;
  deptName: string;

  deptDescription: string;

  teamName?: string;
  teamPosition?: string;
  // organizationChartId?: number;
  orgChartId?: number;
  orgChartName?: string;
  positionName?: string;
  officeTel?: string;
  officeFax?: string;
  jobDescription: string;

  status?: MemberStatusType;

  useYn: boolean;

  modifiedTime?: string;
  modifier?: string;

  chartId?: number;
  chartName?: string;

  profileGrade?: string;
  profileJobDescription?: string;

  createType?: string;

  workerType?: string;
}

export interface ISGEditUser {
  sid: string;
}

export interface ISGEditUserData extends ISGUser {
  photoDataBase64?: string;
  photoFileName?: string;
}
