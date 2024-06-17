import  { useState } from "react";
import LeftMainMenuBar from "../LeftMainMenuBar";
import NoramlListBox from "../ui/listbox/NoramlListBox";
import DialogModal from "../ui/modal/DialogModal";
import dummyIcon from "@/assets/icons/icon-small-department.svg";
import SimpleComboBox from "../ui/dropdown/SimpleComboBox";
import {
  dummyAddNewOrgChartProps,
  dummyImportDeviceProps,
} from "@/types/dummy/dummy";
import ImportDevice from "../modals/ImportDevice";
import AddNewOrgChart from "../modals/AddNewOrgChart";

// interface AddNewDeviceModalProps {
//   deviceType: string;
//   deviceName: string;
//   buildingName: string;
//   deptName: string;
//   subDeptName: string;
// }

export default function GuideMapList() {
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  const titles = [
    "시장실",
    "부시장실",
    "공보관",
    "감사관",
    "항공우주사업단",
    "기획행정국",
    "기획행정국",
    "경제통상국",
    "문화관광체육국",
    "복지여성국",
  ];

  const [mnIndex, setMnIndex] = useState(0);

  const [_, setIsOpenAddNewDevice] = useState<boolean>(false);
  const [isOpenImportDevice, setIsOpenImportDevice] = useState<boolean>(false);
  const [isOpenAddNewOrgChart, setIsOpenAddNewOrgChart] =
    useState<boolean>(false);

  // const [addedItem, setAddedItem] = useState<AddNewDeviceModalProps | null>(
  //   null
  // );

  // const handelAddedNewDevcie = (
  //   deviceType: string,
  //   deviceName: string,
  //   buildingName: string,
  //   deptName: string,
  //   subDeptName: string
  // ) => {};

  return (
    <div className="h-full w-full flex flex-row bg-[#e8e6da]">
      <LeftMainMenuBar />

      <NoramlListBox
        className="w-[300px] h-[200px] m-10 "
        titles={titles}
        selectedIndex={mnIndex}
        icon={dummyIcon}
        onSelect={(title, index) => setMnIndex(index)}
      />

      <SimpleComboBox items={titles} className="m-4 w-[170px]" />

      {/* <button onClick={() => setIsOpen(true)}>Open</button> */}
      {/* <TableList /> */}
      {/* <DialogModal
        isOpen={isOpen}
        title="새로운 자리배치도 만들기"
        onClose={() => setIsOpen(false)}>
        문화예술과 자리배치도를 <br />
        저장 하시겠습니까?
      </DialogModal> */}

      <div className="flex flex-row gap-4 items-center">
        <button
          className="border-2 border-blue-800 p-2 w-32"
          onClick={() => setIsOpenAddNewDevice(true)}
        >
          새장치추가
        </button>
        <button
          className="border-2 border-blue-800 p-2 w-32"
          onClick={() => setIsOpenImportDevice(true)}
        >
          장치불러오기
        </button>
        <button
          className="border-2 border-blue-800 p-2 w-32"
          onClick={() => setIsOpenAddNewOrgChart(true)}
        >
          새로운자리배치도만들기
        </button>
      </div>

      {/* <TableList /> */}
      {/* <DialogModal
        isOpen={isOpenAddNewDevice}
        title="새장치 추가"
        onOk={() => setIsOpenAddNewDevice(false)}
        onClose={() => setIsOpenAddNewDevice(false)}>
        <AddNewDevice
          addNewDeviceProps={dummyaddNewDeviceProps}
          callback={handelAddedNewDevcie}
        />
      </DialogModal> */}

      <DialogModal
        isOpen={isOpenImportDevice}
        title="장치불러오기"
        onClose={() => setIsOpenImportDevice(false)}
      >
        <ImportDevice importDevice={dummyImportDeviceProps} />
      </DialogModal>

      <DialogModal
        isOpen={isOpenAddNewOrgChart}
        title="새로운자리배치도만들기"
        onClose={() => setIsOpenAddNewOrgChart(false)}
      >
        <AddNewOrgChart addNewOrgChartProps={dummyAddNewOrgChartProps} />
      </DialogModal>

      <div className="m-4 h-[120px] w-[300px] bg-[#e3e8ed] rounded-[4px] drop-shadow-[0_1px_2px_rgba(60,75,100,0.2)] bg-gradient-to-t from-[#e3e8ed] to-white "></div>

      <div className="m-4 h-[120px] w-[300px] bg-[#e3e8ed] rounded-[4px] drop-shadow-[0_1px_2px_rgba(60,75,100,0.2)] bg-gradient-to-t from-white via-[#e3e8ed] to-white"></div>
    </div>
  );
}
