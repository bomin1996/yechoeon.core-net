import React, { useState } from "react";
import NoramlListBox from "@/components/ui/listbox/NoramlListBox";
import { IImportDeviceProps } from "@/types/dummy/dummy";

interface Props {
  importDevice?: IImportDeviceProps;
}

interface QueryProps {
  deviceTypeList: string[];
  deviceNameList: string[];
}

function ImportDevice({ importDevice }: Props) {
  const [deviceTypeSelectedIndex, setDeviceTypeSelectedIndex] = useState(0);
  const [deviceNameSelectedIndex, setDeviceNameSelectedIndex] = useState(0);

  const result = queryListItems();

  const deviceTypeList = result.deviceTypeList;
  const deviceNameList = result.deviceNameList;

  function queryListItems(): QueryProps {
    const bl: string[] = [];
    const dl: string[] = [];

    importDevice?.deviceTypeList.forEach((f) => {
      bl.push(f.name);
    });

    importDevice?.deviceTypeList[deviceTypeSelectedIndex].deviceList.forEach(
      (t) => {
        dl.push(t);
      }
    );

    return { deviceTypeList: bl, deviceNameList: dl };
  }

  const hendleDeviceTypeSelect = (title: string, index: number) => {
    setDeviceTypeSelectedIndex(index);
    setDeviceNameSelectedIndex(0);
  };

  const hendleDeviceNameSelect = (title: string, index: number) => {
    setDeviceNameSelectedIndex(index);
  };

  return (
    <div className="w-full h-full flex flex-col text-[#221e1f] p-8 gap-4 ">
      {/* 1열 */}
      <p className="text-lg ">불러오고자 장치 타입과 장치명을 선택해 주세요.</p>
      {/* 2열 */}
      <div className="flex flex-row gap-2 h-[300px] w-[600px] ml-10 mr-10">
        <div className="basis-1/2">
          <p className="text-sm  ">장치 타입</p>
          <NoramlListBox
            titles={deviceTypeList}
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
  );
}

export default ImportDevice;
