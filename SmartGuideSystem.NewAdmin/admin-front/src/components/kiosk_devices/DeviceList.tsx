import { useContext, useEffect, useState } from "react";
import { ISGDevice } from "@shares/ISGDevice";
import { DeviceApis } from "@/server/deviceApi";
import TableList from "../TableList";
import ColorButton from "../ui/button/ColorButton";
import {
  showAddNewDevice,
  showEditDeviceModal,
  showMessageOkCancelDialog,
} from "@/components/modals";
import DialogContext from "@/contexts/DialogContext";
import BlockUIContext from "@/contexts/BlockUIContext";
import { descTime } from "@/helpers/desc-helpers";
import { showRefreshGroupDeviceDialog } from "../modals/RefreshGroupDeviceModal";
import { toast } from "react-hot-toast";
import { getKioskTypeDesc } from "@/const";

import 새로만들기아이콘 from "@/assets/buttons/menus/새로만들기.svg";
import 삭제아이콘 from "@/assets/buttons/menus/삭제.svg";
import 수정아이콘 from "@/assets/buttons/menus/수정.svg";
import 새로고침아이콘 from "@/assets/buttons/menus/새로고침.svg";
import 장치새로고침아이콘 from "@/assets/buttons/menus/새로고침화이트.svg";

import TopTitlePanel from "../TopTitlePanel";
import { ImageMenuButton } from "../ui/button";

const queryFilteredList = (tapIndex: number, devices: Array<ISGDevice>) => {
  switch (tapIndex) {
    case 0:
      return devices; // 모두
    case 1:
      return devices.filter((d) => d.kioskType === "OrganizationChart"); //조직도키오스크
    // case 2:
    //   return devices.filter(
    //     (d) => d.kioskType === "BuildingGuideHorizontalChart"
    //   ); //청사안내가로
    case 2:
      return devices.filter((d) => d.kioskType === "FloorInformation"); //층별안내도
    case 3:
      return devices.filter((d) => d.kioskType === "Gosigonggo"); //고시공고
    case 4:
      return devices.filter((d) => d.kioskType === "CityCouncil"); //의회안내
    case 5:
      return devices.filter((d) => d.kioskType === "MeetingRoomInformation"); //회의실안내
    case 6:
      return devices.filter((d) => d.kioskType === "Yecheon"); //예천
  }

  return [];
};

type DeviceStatus = {
  deviceId: string;
  updateTime: string;
};

export default function DeviceList() {
  const [devices, setDevices] = useState<Array<ISGDevice>>([]);
  const [statusList, setStatusList] = useState<Array<DeviceStatus>>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [selectedTabIndex] = useState(0);
  const [, setSelectedItem] = useState<ISGDevice>();
  const [searchText, setSearchText] = useState("");
  const blockUICtx = useContext(BlockUIContext);
  const requestDevice = () => {
    blockUICtx?.setBlock(true);
    DeviceApis.deviceList()
      .then((result) => setDevices(result))
      .catch((exc) => console.log(exc))
      .finally(() => blockUICtx?.setBlock(false));
  };

  const requestDeviceStatus = () => {
    DeviceApis.activeDeviceStatus().then((result) => {
      setStatusList(result);
    });
  };
  useEffect(() => {
    requestDevice();
  }, []);

  useEffect(() => {
    requestDeviceStatus();
    const tm = setInterval(requestDeviceStatus, 1000 * 30);
    return () => {
      clearInterval(tm);
    };
  }, []);

  let filteredList = queryFilteredList(selectedTabIndex, devices);
  if (searchText) {
    filteredList = filteredList.filter(
      (d) =>
        d.deviceId.includes(searchText) ||
        d.orgChartName?.includes(searchText) ||
        d.desc?.includes(searchText) ||
        getKioskTypeDesc(d.kioskType)?.includes(searchText)
    );
  }

  const selectedDevice = filteredList[selectedRowIndex];
  const dialogCtx = useContext(DialogContext);

  const handleEditDevice = () => {
    showEditDeviceModal(
      dialogCtx!,
      selectedDevice,
      async (
        deviceId,
        kioskType,
        deptCode,
        deptName,
        orgChartId,
        orgChartName,
        chartId,
        chartName,
        desc,
        extrasettings
      ) => {
        blockUICtx?.setBlock(true);
        const { result, error } = await DeviceApis.updateDevice({
          id: selectedDevice.id,
          deviceId: deviceId,
          kioskType: kioskType,
          deptCode: deptCode,
          deptName: deptName,
          orgChartId: orgChartId,
          orgChartName: orgChartName,
          chartId: chartId,
          chartName: chartName,
          desc: desc,
          updatedTime: "20230214121212",
          modifierId: "developer",
          use: true,
          extraSettings: extrasettings,
        });
        blockUICtx?.setBlock(false);
        if (!error) {
          toast("수정되었습니다.");
          setSelectedRowIndex(-1);
          requestDevice();
        } else {
          toast(`서버오류:${error}`);
        }
      }
    );
  };

  const handleDeleteDevice = () => {
    showMessageOkCancelDialog(
      dialogCtx!,
      "삭제",
      `[${selectedDevice.deviceId}] 장비를 삭제합니다.`,
      async () => {
        blockUICtx?.setBlock(true);
        const { error } = await DeviceApis.removeDevice(selectedDevice);
        blockUICtx?.setBlock(false);

        if (!error) {
          toast("삭제되었습니다.");
          setSelectedRowIndex(-1);
          requestDevice();
        } else {
          toast(`서버오류:${error}`);
        }
      }
    );
  };

  const handleAddNewDevice = () => {
    showAddNewDevice(
      dialogCtx!,
      async (
        deviceId,
        kioskType,
        deptCode,
        deptName,
        orgChartId,
        orgChartName,
        chartId,
        chartName,
        desc,
        extrasettings
      ) => {
        blockUICtx?.setBlock(true);
        const { error } = await DeviceApis.addDevice({
          id: 0,
          deviceId: deviceId,
          kioskType: kioskType,
          deptCode: deptCode,
          deptName: deptName,
          orgChartId: orgChartId,
          orgChartName: orgChartName,
          chartId: chartId,
          chartName: chartName,
          updatedTime: "20230214121212",
          modifierId: "developer",
          desc: desc,
          use: true,
          extraSettings: extrasettings,
        });
        blockUICtx?.setBlock(false);

        if (!error) {
          toast("추가되었습니다.");
          setSelectedRowIndex(-1);
          requestDevice();
        } else {
          toast(`서버오류:${error}`);
        }
      }
    );
  };

  return (
    <div className="h-full w-full  flex-shrink-0  relative flex flex-col text-white bg-[#231f20] pt-topMenuBarHeight">
      <TopTitlePanel
        title="장치관리"
        className="absolute left-0 top-0 w-full h-[120px]"
        searchText={searchText}
        placeholder="장비명, 조직도명, 설명 검색"
        onChangedSearchText={(st) => setSearchText(st)}>
        <div className="flex absolute right-[32px] bottom-0 divide-x space-x-[12px] py-[12px]">
          <ImageMenuButton
            title={"상태 새로고침"}
            imageSrc={새로고침아이콘}
            colorType="red"
            onClick={() => {}}
          />
          <ImageMenuButton
            title={"장치그룹 새로고침"}
            imageSrc={새로고침아이콘}
            colorType="red"
            onClick={() => {
              showRefreshGroupDeviceDialog(dialogCtx!, () => {});
            }}
          />
          <ImageMenuButton
            title={"수정"}
            imageSrc={수정아이콘}
            disabled={!selectedDevice}
            onClick={handleEditDevice}
          />
          <ImageMenuButton
            title={"삭제"}
            imageSrc={삭제아이콘}
            disabled={!selectedDevice}
            onClick={handleDeleteDevice}
          />
          <ImageMenuButton
            title={"새 장치 만들기"}
            colorType="yellow"
            imageSrc={새로만들기아이콘}
            onClick={handleAddNewDevice}
          />
        </div>
      </TopTitlePanel>

      <TableList
        selectedRowIndex={selectedRowIndex}
        onSelectRow={(idx) => {
          setSelectedRowIndex(idx);
        }}
        className="w-full h-full px-[33px] bg-[#231f20] overflow-auto  "
        columnNames={[
          "kioskType",
          "deviceId",
          "deptName",
          "location2",
          "updatedTime",
          "modifierId",
          "modifier",
          "state",
        ]}
        columnTitles={[
          "장치타입",
          "장치명",
          "조직도부서명",
          "조직도명",
          "업데이트",
          "수정날짜",
          "수정자",
          "설명",
          "",
        ]}
        rowItems={filteredList}
        onDoubleClickRow={(index) => {
          setSelectedItem(filteredList[index]);
          handleEditDevice();
        }}
        columnsForRow={(rowIndex) => {
          if (rowIndex < 0) {
            return <></>;
          }
          return (
            <>
              <td className="pl-4 text-left ">
                {getKioskTypeDesc(filteredList[rowIndex].kioskType)}
              </td>
              <td className="pl-4 text-left ">
                {filteredList[rowIndex].deviceId}
              </td>
              <td className="pl-4 text-left ">
                {filteredList[rowIndex].deptName}
              </td>
              <td className="pl-4 text-left ">
                {filteredList[rowIndex].orgChartName}
              </td>
              <td className="pl-4 text-left ">
                {renderStatus(filteredList[rowIndex], statusList)}
              </td>
              <td className="pl-4 text-left ">
                {descTime(filteredList[rowIndex].modifiedTime)}
              </td>
              <td className="pl-4 text-left ">
                {filteredList[rowIndex].modifier}
              </td>
              <td className="pl-4 text-left ">{filteredList[rowIndex].desc}</td>
              <td>
                {/* <ColorButton
                  onClick={() => {
                    showMessageOkCancelDialog(
                      dialogCtx!,
                      "새로고침",
                      `${filteredList[rowIndex].deviceId} 장치를 새로고침합니다`,
                      async () => {
                        blockUICtx?.setBlock(true);
                        await DeviceApis.refresh(
                          filteredList[rowIndex].deviceId
                        );
                        blockUICtx?.setBlock(false);
                      }
                    );
                  }}
                  title="새로고침"
                  colorStyle="cancel"
                  className="z-0 py-1 font-light"
                ></ColorButton> */}

                <ImageMenuButton
                  title={"새로고침"}
                  imageSrc={장치새로고침아이콘}
                  colorType="white"
                  onClick={() => {
                    showMessageOkCancelDialog(
                      dialogCtx!,
                      "새로고침",
                      `${filteredList[rowIndex].deviceId} 장치를 새로고침합니다`,
                      async () => {
                        blockUICtx?.setBlock(true);
                        await DeviceApis.refresh(
                          filteredList[rowIndex].deviceId
                        );
                        blockUICtx?.setBlock(false);
                      }
                    );
                  }}
                />
              </td>
              <td></td>
            </>
          );
        }}
      />
    </div>
  );
}

function renderStatus(device: ISGDevice, statusList: Array<DeviceStatus>) {
  if (!statusList || !device || statusList.length === 0) {
    return <span className="">[-]</span>;
  }
  try {
    const index = statusList.findIndex((s) => s.deviceId === device.deviceId);
    if (index !== -1) {
      const status = statusList[index];
      const now = new Date();
      const updateTime = new Date(status.updateTime);
      const dt = now.getTime() - updateTime.getTime();
      const dtSeconds = dt / 1000;
      return (
        <span
          className={`${dtSeconds > 60 ? "text-red-600" : "text-green-600"}`}>
          {Math.floor(dtSeconds)}초전에 업데이트
        </span>
      );
    } else {
      return null;
    }
  } catch (exc) {
    console.log("renderStatus-error:", exc);
    return null;
  }
}
