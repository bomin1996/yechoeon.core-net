import { ISGUser, MemberCardSize } from "@shares/*";
import {
  COUNCIL_POSITION_NAME,
  COUNCIL_TITLE as COUNCIL_POPUP_TITLE,
} from "src/const";
import { selectString } from "src/helpers/stringUtils";

//99999999999
const COUNCIL_DEPT_CODE = "99999999999";
export function getNormalGradeDesc(user: ISGUser): string {
  if (user.deptCode === COUNCIL_DEPT_CODE) {
    //return user.profileGrade ?? user.positionName ?? "의원";
    return selectString(user.profileGrade, user.positionName, "의원");
  } else {
    //return user.profileGrade ?? user.teamPosition ?? "주무관";
    return selectString(user.profileGrade, user.positionName, "주무관");
  }
}

export function getDeptTeamInfoDesc(user: ISGUser): string {
  // if (user.deptCode === COUNCIL_DEPT_CODE) {
  //   return `${user.deptName} ${user.teamName ? user.teamName : ""}`;
  // } else {
  //   return `${user.deptName} ${user.teamName ? user.teamName + "팀" : ""}`;
  // }
  if (user.positionName === COUNCIL_POSITION_NAME) {
    // 의원
    //return "의령군의회";
    return COUNCIL_POPUP_TITLE;
  }

  return user.deptName;
}

export function getSizeStyle(teamCount: number): MemberCardSize {
  if (teamCount < 5) {
    return "Large";
  } else if (teamCount === 5) {
    return "Medium";
  } else {
    return "Small";
  }
}
