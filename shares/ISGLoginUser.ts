import { LoginUserRoleType } from "./LoginUserRoleType";

export interface ISGLoginUser {
  loginId: string;
  name: string;
  password?: string;
  deptCode?: string;
  deptName?: string;

  deptFullName?: string;
  desc?: string;

  role: LoginUserRoleType;
  lastLoggedInTime?: string;
  modifiedTime?: string;
  modifier?: string;

  extraSettings?: ISGLoginUserExtraSettings;
}

export interface ISGLoginUserExtraSettings {
  useSignageMenu?: boolean;
  useCouncilMenu?: boolean;
  useMenus?: Array<String>;
}
