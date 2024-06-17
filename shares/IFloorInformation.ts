export interface IFloorInformation {
  cityHallItems: IFloorInformationItem[];
  cityCouncilItems: IFloorInformationItem[];
}

export interface IFloorInformationItem {
  name: string;
  contents: string;
  title?: string;
  fullRow?: boolean;
}
