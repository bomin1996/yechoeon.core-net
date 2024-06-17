import React, { useEffect, useState } from "react";
import { DeviceApis } from "@/server/deviceApi";
import { ISGDevice, KioskType } from "@shares/ISGDevice";

import DialogModal from "@/components/ui/modal/DialogModal";
import NoramlListBox from "../ui/listbox/NoramlListBox";
import { IDialogContextData } from "@/contexts/DialogContext";

const kioskTypeTitls = [
  "조직도키오스크",
  // "청사안내가로",
  // "청사안내세로",
  "고시공고",
  "층별청사안내",
  "의회안내",
  "회의실안내",
];

const kioskTypes: Array<KioskType> = [
  "OrganizationChart",
  // "BuildingGuideHorizontalChart",
  // "BuildingGuideVerticalChart",
  "Gosigonggo",
  "FloorInformation",
  "CityCouncil",
  "MeetingRoomInformation",
];

interface Props {
  isOpen: boolean;
  onOk: (device: ISGDevice) => void;
  onCancel: () => void;
}

export default function SelectDeviceModal({ isOpen, onOk, onCancel }: Props) {
  const [devices, setDevices] = useState<ISGDevice[]>([]);
  const [deviceTypeSelectedIndex, setDeviceTypeSelectedIndex] = useState(0);
  const [deviceNameSelectedIndex, setDeviceNameSelectedIndex] = useState(-1);

  const queryDevices = async () => {
    const devices = await DeviceApis.deviceList();
    setDevices(devices);
  };

  useEffect(() => {
    queryDevices();
  }, []);

  const filteredList = devices.filter(
    (d) => d.kioskType === kioskTypes[deviceTypeSelectedIndex]
  );
  const deviceNameList = filteredList.map((d) => d.deviceId);

  const hendleDeviceTypeSelect = (title: string, index: number) => {
    setDeviceTypeSelectedIndex(index);
    setDeviceNameSelectedIndex(0);
  };

  const hendleDeviceNameSelect = (title: string, index: number) => {
    setDeviceNameSelectedIndex(index);
  };

  return (
    <DialogModal
      isOpen={isOpen}
      title="장치불러오기"
      onClose={() => onCancel()}
      onCancel={() => onCancel()}
      onOk={() => {
        if (deviceNameSelectedIndex >= 0) {
          onOk(filteredList[deviceNameSelectedIndex]);
        }
      }}
    >
      <div className="w-full h-full flex flex-col text-[#221e1f] p-8 gap-4 ">
        {/* 1열 */}
        <p className="text-lg ">
          불러오고자 장치 타입과 장치명을 선택해 주세요.
        </p>
        {/* 2열 */}
        <div className="flex flex-row gap-2 h-[300px] w-[600px] ml-10 mr-10">
          <div className="basis-1/2">
            <p className="text-sm  ">장치 타입</p>
            <NoramlListBox
              titles={kioskTypeTitls}
              selectedIndex={deviceTypeSelectedIndex}
              onSelect={hendleDeviceTypeSelect}
              className=""
            />
          </div>
          <div className="basis-1/2">
            <p className="text-sm whitespace-nowrap">장치명</p>
            <NoramlListBox
              titles={deviceNameList}
              selectedIndex={deviceNameSelectedIndex}
              className=""
              onSelect={hendleDeviceNameSelect}
            />
          </div>
        </div>
      </div>
    </DialogModal>
  );
}

export function showSelectDeviceDialog(
  ctx: IDialogContextData,
  onOk: (device: ISGDevice) => void,
  onCancel?: () => void
) {
  ctx?.pushDialog(
    <SelectDeviceModal
      isOpen={true}
      onCancel={() => ctx!.popDialog()}
      onOk={(device) => {
        ctx!.popDialog();
        onOk(device);
      }}
    />
  );
}
