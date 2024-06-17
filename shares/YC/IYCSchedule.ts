export interface IYCSchedule {
  id: number;
  scheduleDate: string;
  contents: string;
  desc?: string;
  status?: string;
  modifiedTime: string;
  modifier: string;
  useYn?: boolean;
}
