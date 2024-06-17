export interface ISGContentLayout {
  id: number;
  name: string;
  desc?: string;
  category1?: string;
  layoutType?: string;
  modifiedTime?: string;
  modifier?: string;
  sceneItems: Array<ISGScene>;
}

export interface ISGScene {
  width: number;
  height: number;
  sceneType?: SceneType;
  segments: Array<ISGSceneSegment>;
}

export interface ISGSceneSegment {
  x: number;
  y: number;
  width: number;
  height: number;
  contents: Array<ISGSegmentContent>;
  isVisible: boolean;
  segmentType?: string;
}

export interface ISGSegmentContent {
  url: string;
  name: string;
  fileName: string;
  duration: number;
  thumbnail?: string;
  id: number;
  contentFit: string;
  contentType: string;
  width: number;
  height: number;
  size: number;
}

export type SceneType =
  | "FullScreen_(1000x1160)"
  | "2Div_1_1_(1000x1160)"
  | "2Div_2_1_(1000x1160)"
  | "3Div_1_4_1_(8192x2160)"
  | "4Div_1_1_1_1_(8192x2160)"
  | "1Div_1_(7680x1080)"
  | "2Div_2_1_(3840x2160)"
  | "2Div_2_1_(1080x1920)"
  | "FullScreen"
  | "3Div"
  | "2Div"
  | "2Div(1:2)"
  | "2Div(2:1)"
  | "FullScreen_(1920x1080)"
  | "FullScreen_(2160x3840)";
