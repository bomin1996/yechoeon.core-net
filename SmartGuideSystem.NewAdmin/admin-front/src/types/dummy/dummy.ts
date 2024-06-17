export interface IAddNewDeviceProps {
  deviceTypeList: string[];
  deviceNameList: string[];
  buildingList: IBuildingInfo[];
}

export interface IDepartmentInfo {
  name: string;
  departs: string[];
}

export interface IBuildingInfo {
  name: string;
  topDeprts: IDepartmentInfo[];
}

const dummyDeviceTypeList: string[] = [
  "조직도키오스크",
  "청사안내가로",
  "청사안내세로",
  "고시공고",
];

const dummyDeviceNameList: string[] = [
  "Devce_32_01",
  "Devce_32_02",
  "Devce_32_03",
  "Devce_32_04",
  "Devce_32_05",
  "Devce_32_06",
  "Devce_32_07",
  "Devce_32_08",
  "Devce_57_01",
  "Devce_57_02",
  "Devce_57_03",
  "Devce_57_04",
  "Devce_57_05",
  "Devce_57_06",
  "Devce_57_07",
];

const jinjuBuildings: IBuildingInfo[] = [
  {
    name: "시청사",
    topDeprts: [
      {
        name: "기획행정국",
        departs: ["기획예산과", "행정과", "민원여권과"],
      },
      {
        name: "경제통상국",
        departs: ["일자리경제과", "기업통상과"],
      },
      {
        name: "문화관광국",
        departs: ["문화예술과", "관좡징흥과"],
      },
    ],
  },
  {
    name: "시의회",
    topDeprts: [
      {
        name: "의회사무국",
        departs: ["총무팀", "의사팀", "의정홍보팀"],
      },
      {
        name: "특별위원회",
        departs: ["윤리특별위원회", "예산결산특별위원회"],
      },
    ],
  },
];

export const dummyaddNewDeviceProps: IAddNewDeviceProps = {
  deviceTypeList: dummyDeviceTypeList,
  deviceNameList: dummyDeviceNameList,
  buildingList: jinjuBuildings,
};

export interface IDeviceType {
  name: string;
  deviceList: string[];
}

export interface IImportDeviceProps {
  deviceTypeList: IDeviceType[];
}

const dummyImportDeviceTypeList: IDeviceType[] = [
  {
    name: "조직도키오스크",
    deviceList: [
      "Devce_32_01",
      "Devce_32_02",
      "Devce_32_03",
      "Devce_32_04",
      "Devce_32_05",
      "Devce_32_06",
      "Devce_32_07",
      "Devce_32_08",
    ],
  },
  {
    name: "청사안내가로",
    deviceList: ["Devce_72_01"],
  },
  {
    name: "청사안내새로",
    deviceList: ["Devce_54_01"],
  },
  {
    name: "고시공고키오스크",
    deviceList: ["Devce_54_01", "Devce_54_02", "Devce_54_03"],
  },
];

export const dummyImportDeviceProps: IImportDeviceProps = {
  deviceTypeList: dummyImportDeviceTypeList,
};

export interface IAddNewOrgChartProps {
  topDeprts: IDepartmentInfo[];
}

const dummyDeprtList: IDepartmentInfo[] = [
  {
    name: "기획행정국",
    departs: ["기획예산과", "행정과", "민원여권과"],
  },
  {
    name: "경제통상국",
    departs: ["일자리경제과", "기업통상과"],
  },
  {
    name: "문화관광국",
    departs: ["문화예술과", "관좡징흥과"],
  },
];

export const dummyAddNewOrgChartProps: IAddNewOrgChartProps = {
  topDeprts: dummyDeprtList,
};
