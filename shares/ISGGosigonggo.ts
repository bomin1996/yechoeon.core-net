import { ISGFileInfo } from "./ISGFileInfo";

export interface ISGGosigonggo {
  id: number;
  notAncmtMgtNo: string;
  title?: string;
  gosibunho?: string;
  postDate?: string;
  deptCode?: string;
  deptName?: string;
  subject?: string;
  contents?: string;
  startPeriod?: string;
  endPeriod?: string;
  fileId?: string;
  updateDate?: string;
  gosiType?: string;
  gosiRegNo?: string;
  tel?: string;
  mail?: string;
  fileInfo?: ISGFileInfo;
}
