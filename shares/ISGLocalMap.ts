export interface ISGLocalMap {
  id: number;

  name: string;
  desc?: string;

  createTime?: string;
  url?: string;

  uploadFileName?: string;
  contentType?: string;
  width?: number;
  height?: number;
  size?: number;

  modifiedTime?: string;
  modifier?: string;

  photoDataBase64?: string;
  photoFileName?: string;
}

export interface ISGEditLocalMapData extends ISGLocalMap {
  photoDataBase64?: string;
  photoFileName?: string;
}
