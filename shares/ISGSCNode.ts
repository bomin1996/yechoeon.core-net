import { ISGUser } from "./ISGUser";

export type SCNodeType =
  | "Member"
  | "TeamBanner"
  | "ChartTitle"
  | "Entrance"
  | "Link";
export type SCMemberTemplateNames = "member01" | "leader01" | "leader02";
export type SCObjectTemplateNames = "team_banner" | "entrance" | "title_banner";

export type MemberCardSize = "Large" | "Medium" | "Small";
export type MemberCardColor =
  | "Yellow"
  | "Blue"
  | "Green"
  | "Mint"
  | "Orange"
  | "Red";
// export type SeatingType = "Member" | "TeamBanner" | "ChartTitle";

export type LinkClickAction = "ShowSeatPosChart" | "ShowFloorGuideMap";

export interface ISGSCNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  nodeType: SCNodeType;
  templateName: string;
}

export interface ISGSCMemberNode extends ISGSCNode {
  member: ISGUser;
  // templateName: SCMemberTemplateNames;
  //templateName: string;

  title?: string;
  // grade?: string;
  // officeTel?: string;
  // officeFax?: string;
  // jobDescription?: string;

  size: MemberCardSize; //
  color: MemberCardColor;
}

export interface ISGSCTeamBannerNode extends ISGSCNode {
  // templateName: SCObjectTemplateNames;
  //templateName: string;

  title: string;
  officeTel?: string;
  officeFax?: string;
  jobDescription?: string;
  clickAction?: string;

  color: MemberCardColor;
}

export interface ISGSCChartTitleNode extends ISGSCNode {
  //templateName: string;
  title: string;
  fontSize: number;
  fontWeight: number;
}

export interface ISGSCChartEntranceNode extends ISGSCNode {
  //templateName: string;
  title: string;
  fontSize: number;
  fontWeight: number;
  iconName?: string;
}

export interface ISGSCLinkNode extends ISGSCNode {
  title: string;
  clickAction: LinkClickAction;
  color: MemberCardColor;
  size: MemberCardSize;
  chartName?: string;
  chartId?: number;
}
