import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SimpleComboBox from "@/components/ui/dropdown/SimpleComboBox";
import NoramlListBox from "@/components/ui/listbox/NoramlListBox";
import DialogModal from "@/components/ui/modal/DialogModal";
import { DeviceApis } from "@/server/deviceApi";
import { IAddNewDeviceProps } from "@/types/dummy/dummy";

interface Props {
  addNewDeviceProps?: IAddNewDeviceProps;
  deviceTypeIdx?: number;
  deviceName_?: string;
  buildingNameIdx?: number;
  deptNameIdx?: number;
  subDeptNameIdx?: number;
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onOk: (
    deviceType: string,
    deviceName: string,
    buildingName: string,
    deptName: string,
    subDeptName: string
  ) => void;
}

interface QueryProps {
  buildingList: string[];
  deptList: string[];
  subDeptList: string[];
}

export default function AddNewDeviceModal({
  addNewDeviceProps,
  deviceTypeIdx,
  deviceName_,
  buildingNameIdx,
  deptNameIdx,
  subDeptNameIdx,
  isOpen,
  title,
  onCancel,
  onOk,
}: Props) {
  const [buildingSelectedIndex, setBuildingSelectedIndex] = useState(0);
  const [deptSelectedIndex, setDeptSelectedIndex] = useState(0);
  const [subDeptSelectedIndex, setSubDeptSelectedIndex] = useState(0);
  const [deviceSelectedIndex, setDeviceSelectedIndex] = useState(
    deviceTypeIdx ?? 0
  );
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");

  const result = queryListItems();
  const buildingList = result.buildingList;
  const deptList = result.deptList;
  const subDeptList = result.subDeptList;

  useEffect(() => {
    setBuildingSelectedIndex(buildingNameIdx ?? 0);
    setDeptSelectedIndex(deptNameIdx ?? 0);
    setSubDeptSelectedIndex(subDeptNameIdx ?? 0);
    setDeviceSelectedIndex(deviceTypeIdx ?? 0);
    setDeviceName(deviceName_ ?? "");
    setDeviceName(deviceType ?? addNewDeviceProps?.buildingList[0].name);
  }, [isOpen]);

  function queryListItems(): QueryProps {
    const bl: string[] = [];
    const dl: string[] = [];
    const sl: string[] = [];

    addNewDeviceProps?.buildingList.forEach((f) => {
      bl.push(f.name);
    });

    addNewDeviceProps?.buildingList[buildingSelectedIndex]?.topDeprts.forEach(
      (t) => {
        dl.push(t.name);
      }
    );

    addNewDeviceProps?.buildingList[buildingSelectedIndex]?.topDeprts[
      deptSelectedIndex
    ].departs.forEach((t) => {
      sl.push(t);
    });

    return { buildingList: bl, deptList: dl, subDeptList: sl! };
  }

  const hendleBuildingSelect = (title: string, index: number) => {
    setBuildingSelectedIndex(index);
    setDeptSelectedIndex(0);
    setSubDeptSelectedIndex(0);
  };

  const hendleDeptSelect = (title: string, index: number) => {
    setDeptSelectedIndex(index);
    setSubDeptSelectedIndex(0);
  };

  const hendleSubDeptSelect = (title: string, index: number) => {
    setSubDeptSelectedIndex(index);
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setDeviceName(e.currentTarget.value);
    // console.log("DeviceName", deviceName);
  };

  return (
    <DialogModal
      isOpen={isOpen}
      title={title}
      onOk={async () => {
        console.log(
          "오케이 ============",
          deviceType,
          deviceName,
          buildingList[buildingSelectedIndex],
          deptList[deptSelectedIndex],
          subDeptList[subDeptSelectedIndex]
        );

        const res = await DeviceApis.existDeviceId(deviceName);
        if (res?.status === 200) {
          if (res.data.exist === false) {
            onOk(
              deviceType,
              deviceName,
              buildingList[buildingSelectedIndex],
              deptList[deptSelectedIndex],
              subDeptList[subDeptSelectedIndex]
            );
          } else {
            toast("이미 존재하는 이름입니다.");
          }
        }
      }}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}
    >
      <div className="w-full h-full flex flex-col text-[#221e1f] p-8 gap-4">
        {/* 1열 */}
        <p className="">장치 정보와 위치정보를 입력해 주세요.</p>
        {/* 2열 */}
        <div className="flex justify-center gap-2">
          <div className="flex flex-col">
            <p className="text-sm">장치 타입 선택</p>
            <SimpleComboBox
              items={addNewDeviceProps?.deviceTypeList!}
              selectedIdx={deviceSelectedIndex}
              onSelectedItem={(it) => {
                setDeviceType(it);
              }}
              className=""
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm">장치명 입력</p>
            <input
              className="h-8 rounded-md px-2 text-sm font-semibold"
              placeholder="장치명 입력"
              onChange={onChange}
              value={deviceName}
              type="text"
            />
          </div>
        </div>
        {/* 3열 */}
        {deviceType === "조직도키오스크" && (
          <div className="flex flex-row gap-2 h-[300px] w-[900px]">
            <div className="basis-1/3">
              <p className="text-sm  ">건물선택</p>
              <NoramlListBox
                titles={buildingList!}
                selectedIndex={buildingSelectedIndex}
                onSelect={hendleBuildingSelect}
                className=""
              />
            </div>
            <div className="basis-1/3">
              <p className="text-sm whitespace-nowrap">
                1차 추가 위치 정보 선택
              </p>
              <NoramlListBox
                titles={deptList}
                selectedIndex={deptSelectedIndex}
                className=""
                onSelect={hendleDeptSelect}
              />
            </div>
            <div className="basis-1/3">
              <p className="text-sm whitespace-nowrap">
                2차 추가 위치 정보 선택
              </p>
              <NoramlListBox
                titles={subDeptList}
                selectedIndex={subDeptSelectedIndex}
                className=""
                onSelect={hendleSubDeptSelect}
              />
            </div>
          </div>
        )}
      </div>
    </DialogModal>
  );
}
