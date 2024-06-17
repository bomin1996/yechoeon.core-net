export interface ISGNoticeInfo {
  idx: number;
  title: string;
  deptName: string;
  content: string;
  writeDate?: string;
  imgList?: ISGNoticeImageInfo[];
}

export interface ISGNotice {
  id: number;
  title: string;
  postDate: string;

  deptName: string;
  deptCode: string;
  contents: string;
  views: number;
  imageFiles?: string[];
  attachmentFiles?: string[];
  noticeType: string;

  modifiedTime?: string;
  modifier?: string;
}

export interface ISGNoticeImageInfo {
  idx: number;
  title?: string;
  alt?: string;
  url?: string;
}
