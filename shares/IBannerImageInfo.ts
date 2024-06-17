export interface IBannerImageInfo {
  mainBannerList?: IBannerItemInfo[];
  mainBannerIntervalSec?: number;
  subBannerList?: ISubBannerItemInfo[];
  subBannerIntervalSec?: number;
}

export interface IBannerItemInfo {
  imgUrl?: string;
  imgLink?: string;
  imgAlt?: string;
}

export interface ISubBannerItemInfo {
  mainImgUrl?: string;
  link?: string;
  boardVO?: ISubBannerItemBoardVOInfo;
}

export interface ISubBannerItemBoardVOInfo {
  idx?: Number;
  title?: string;
  deptName?: string;
  writeDate?: string;
  content?: string;
}
