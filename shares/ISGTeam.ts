import { ISGEditUser, ISGUser } from "./ISGUser";
export interface ISGTeam {
  name: string;
  title?: string;

  officeTel?: string;
  officeFax?: string;
  jobDescription?: string;
  useYn: boolean;
  dontAddTeamWord?: boolean;
  dontShowTeamDetailButton?: boolean;

  leader?: ISGUser;
  //members?: Array<ISGUser | null>;
  lines: Array<Array<ISGUser>>;
}

export interface ISGEditTeam {
  name: string;
  title?: string;
  leader?: ISGEditUser;
  //members?: Array<ISGEditUser | null>;
  lines: Array<Array<ISGEditUser>>;
  dontAddTeamWord?: boolean;
  dontShowTeamDetailButton?: boolean;

  /////// 편집된 팀정보
  officeTel?: string;
  officeFax?: string;
  jobDescription?: string;
}
