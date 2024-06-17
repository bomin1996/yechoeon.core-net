import { useContext, useEffect, useState } from "react";
import SimpleComboBox from "@/components/ui/dropdown/SimpleComboBox";
import DialogModal from "@/components/ui/modal/DialogModal";
import { ISGDevice, ISGLocationOption } from "@shares/ISGDevice";
import { KioskType } from "@shares/KioskType";
import DialogContext, { IDialogContextData } from "@/contexts/DialogContext";
import { DeviceApis } from "@/server/deviceApi";
import { showSelectDepartmentPopup } from "./SelectFindDepartmentModal";
import { IDeviceExtraSettings } from "@shares/IDeviceExtraSettings";
import toast from "react-hot-toast";
import { showSelectSeatPosChartPopup } from "./SelectSeatPosChartModal";
import {
  CURRENT_SITE,
  availableKioskTypeTitls,
  availableKioskTypes,
  floorMapTypeTitls,
  gosiTypeTitls,
} from "@/const";

import showSelectLocalMapPopup from "./SelectLocalMapModal";
import { showSelectContentLayoutPopup } from "./SelectContentLayoutModal";

interface Props {
  isOpen: boolean;
  title: string;
  device?: ISGDevice;
  onCancel?: () => void;
  onOk: (
    deviceId: string,
    kioskType: KioskType,
    deptCode?: string,
    deptName?: string,
    orgChartId?: number,
    orgChartName?: string,
    chartId?: number,
    chartName?: string,
    desc?: string,
    extraSettings?: IDeviceExtraSettings
  ) => void;
}

type IdNameType = {
  id: number;
  name: string;
};

export default function DeviceInfoModal({
  isOpen,
  title,
  device,
  onCancel,
  onOk,
}: Props) {
  const [selectedKioskTypeIndex, setSelectedKioskTypeIndex] = useState(0);
  const [inputDeviceId, setInputDeviceId] = useState("");
  const [desc, setDesc] = useState(device?.desc);
  const [deptCode, setDeptCode] = useState(device?.deptCode);
  const [deptName, setDeptName] = useState(device?.deptName);
  const [orgChartId, setOrgChartId] = useState(device?.orgChartId);
  const [orgChartName, setOrgChartName] = useState(device?.orgChartName);
  const [seatPosChartId, setSeatPosChartId] = useState(device?.chartId);
  const [seatPosChartName, setSeatPosChartName] = useState(device?.chartName);

  const gosiType = device?.extraSettings?.gosiOption?.gosiType ?? "공고";
  const [selectedGosiTypeIndex, setSelectedGosiTypeIndex] = useState(
    gosiTypeTitls.indexOf(gosiType)
  );

  const initFloorMapTypeIndex = device?.extraSettings?.floorMapType ?? 0;
  const [selectedFloorMapTypeIndex, setSelectedFloorMapTypeIndex] = useState(
    initFloorMapTypeIndex
  );

  const [meetingRoomName, setMeetingRoomName] = useState(
    device?.extraSettings?.meetingRoomInfoOption?.meetingRoomName
  );

  const [autoUpdateDataSeconds] = useState(
    Math.floor((device?.extraSettings?.autoUpdateMS ?? 0) / 1000)
  );

  const [autoRefreshUISeconds, setAutoRefreshUISeconds] = useState(
    Math.floor((device?.extraSettings?.refreshMS ?? 60000) / 1000)
  );

  const [localMapInfo, setLocalMapInfo] = useState<IdNameType>();
  const [contentLayoutInfo, setLayoutInfo] = useState<IdNameType>();
  const [subContentLayoutInfo, setSubLayoutInfo] = useState<IdNameType>();

  const [deviceVolume, setDeviceVolume] = useState(
    device?.extraSettings?.volume ?? 0.4
  );

  const [noticeFilter, setNoticeFilter] = useState(
    device?.extraSettings?.noticeFilter
  );

  const [locationOption, setLocationOption] = useState<ISGLocationOption>(
    device?.extraSettings?.locationOption ?? {
      latitude: 35,
      longitude: 128,
      ipAddress: "127.0.0.1",
    }
  );

  const [gosiFilter, setGosiFilter] = useState(
    device?.extraSettings?.gosiFilter
  );

  useEffect(() => {
    if (device) {
      const kIndex = availableKioskTypes.indexOf(device.kioskType);
      setSelectedKioskTypeIndex(kIndex);

      setInputDeviceId(device.deviceId);

      if (device?.extraSettings?.localMapOption) {
        const { id, name } = device.extraSettings?.localMapOption;
        setLocalMapInfo({ id, name });
      }
      if (device?.extraSettings?.contentLayoutOption) {
        const { id, name } = device.extraSettings?.contentLayoutOption;
        setLayoutInfo({ id, name });
        const { subId, subName } = device.extraSettings.contentLayoutOption;
        if (subId && subName) {
          setSubLayoutInfo({ id: subId, name: subName });
        }
      }
    }
  }, [device]);

  const selectedKioskType = availableKioskTypes[selectedKioskTypeIndex];
  const isSelectedOrgChart = selectedKioskTypeIndex === 0;
  const dialogCtx = useContext(DialogContext);

  const visibleFloorguideMapSetting =
    selectedKioskType === "OrganizationChart" ||
    selectedKioskType === "FloorInformation";
  const visibleGosiSetting = selectedKioskType === "Gosigonggo";
  const visibleDeptSetting = selectedKioskType === "OrganizationChart";
  const visibleMeetingRoomSetting =
    selectedKioskType === "MeetingRoomInformation";

  const visibleContentsLayout =
    selectedKioskType === "GangseoGosiNotice" ||
    selectedKioskType === "Signage" ||
    selectedKioskType === "HamanCycleKioskGuide";

  const visibleSubContentsLayout = selectedKioskType === "GangseoGosiNotice";

  const visibleLocalMap = selectedKioskType === "GangseoGosiNotice";

  const visibleNoticeFilter =
    selectedKioskType === "OrganizationChart" && CURRENT_SITE === "uiryeong";

  const visibleHamanSetting = selectedKioskType === "HamanCycleKioskGuide";

  const visibleGosifilter =
    selectedKioskType === "GangseoGosiNotice" && CURRENT_SITE === "gangseo";

  return (
    <DialogModal
      isOpen={isOpen}
      title={title}
      canOk={inputDeviceId !== undefined && inputDeviceId !== ""}
      onOk={async () => {
        let extraSettings: IDeviceExtraSettings = {
          gosiOption: {
            gosiType: gosiTypeTitls[selectedGosiTypeIndex],
          },
          floorMapType: selectedFloorMapTypeIndex,
          seatPosChartOption: {
            seatPosChartId: seatPosChartId,
            seatPosChartName: seatPosChartName,
          },
          meetingRoomInfoOption: {
            meetingRoomName: meetingRoomName,
          },
          autoUpdateMS: autoUpdateDataSeconds * 1000,
          refreshMS: autoRefreshUISeconds * 1000,
          localMapOption: localMapInfo,
          contentLayoutOption: contentLayoutInfo,
          volume: deviceVolume,
          noticeFilter: noticeFilter,
          gosiFilter: gosiFilter,
          locationOption: locationOption,
        };

        if (subContentLayoutInfo) {
          if (extraSettings.contentLayoutOption) {
            extraSettings.contentLayoutOption.subId = subContentLayoutInfo.id;
            extraSettings.contentLayoutOption.subName =
              subContentLayoutInfo.name;
          } else {
            extraSettings.contentLayoutOption = {
              id: -1,
              name: "",
              subId: subContentLayoutInfo.id,
              subName: subContentLayoutInfo.name,
            };
          }
        }

        if (device?.id) {
          // 수정
          onOk(
            inputDeviceId,
            selectedKioskType,
            deptCode,
            deptName,
            orgChartId,
            orgChartName,
            seatPosChartId,
            seatPosChartName,
            desc,
            extraSettings
          );
        } else {
          // 신규
          const res = await DeviceApis.existDeviceId(inputDeviceId);
          if (res?.status === 200) {
            if (res.data.exist === false) {
              onOk(
                inputDeviceId,
                selectedKioskType,
                deptCode,
                deptName,
                orgChartId,
                orgChartName,
                seatPosChartId,
                seatPosChartName,
                desc,
                extraSettings
              );
            } else {
              toast("이미 존재하는 이름입니다.");
            }
          }
        }
      }}
      onCancel={() => onCancel?.()}
      onClose={() => onCancel?.()}>
      <div className="w-full h-full flex flex-col text-[#221e1f] p-8 gap-4">
        {/* 1열 */}
        <p className="">장치 정보를 입력해 주세요.</p>
        {/* 2열 */}

        <div className="grid grid-cols-5 gap-[12px] text-sm items-center">
          <span className="font-bold text-right">장치 타입 선택</span>
          <SimpleComboBox
            className="col-span-4"
            items={availableKioskTypeTitls}
            selectedIdx={selectedKioskTypeIndex}
            onSelectedItem={(it, index) => {
              setSelectedKioskTypeIndex(index);
            }}
          />
          <span className="font-bold text-right">장치아이디</span>

          <input
            className="input-white-green col-span-4"
            placeholder="장치명 입력"
            onChange={(ev) => {
              setInputDeviceId(ev.target.value);
            }}
            readOnly={device?.id ? true : false}
            value={inputDeviceId}
            type="text"
          />

          {visibleFloorguideMapSetting && (
            <div className="col-span-5 grid grid-cols-5 items-center gap-4">
              <span className="font-bold text-right ">층안내도타입</span>
              <SimpleComboBox
                className="col-span-4"
                items={floorMapTypeTitls}
                selectedIdx={selectedFloorMapTypeIndex}
                onSelectedItem={(it, index) => {
                  setSelectedFloorMapTypeIndex(index);
                }}
              />
            </div>
          )}

          {visibleGosiSetting && (
            <div className="col-span-5 grid grid-cols-5 items-center gap-4">
              <span className="font-bold text-right ">고시공고타입</span>
              <SimpleComboBox
                className="col-span-4"
                items={gosiTypeTitls}
                selectedIdx={selectedGosiTypeIndex}
                onSelectedItem={(it, index) => {
                  setSelectedGosiTypeIndex(index);
                }}
              />
            </div>
          )}

          {visibleDeptSetting && (
            <div className="col-span-5 grid grid-cols-5 items-center gap-4">
              <span className="font-bold text-right">관련부서 선택</span>
              <input
                readOnly
                disabled={!isSelectedOrgChart}
                className="input-white-green col-span-3"
                placeholder="관련부서 선택"
                value={deptName}
                type="text"
              />

              <button
                disabled={!isSelectedOrgChart}
                className="btn-gray"
                onClick={() => {
                  showSelectDepartmentPopup(dialogCtx!, (department) => {
                    //setDepartment(department);
                    setDeptCode(department.deptCode);
                    setDeptName(department.name);
                  });
                }}>
                변경
              </button>
              <span className="font-bold text-right">배치도 선택</span>
              <input
                readOnly
                disabled={!isSelectedOrgChart}
                className="input-white-green col-span-3"
                placeholder="배치도 선택"
                value={seatPosChartName}
                type="text"
              />
              <button
                onClick={() => {
                  showSelectSeatPosChartPopup(dialogCtx!, (seatPosChart) => {
                    setSeatPosChartId(seatPosChart.id);
                    setSeatPosChartName(seatPosChart.name);
                  });
                }}
                disabled={!isSelectedOrgChart}
                className="btn-gray">
                변경
              </button>
            </div>
          )}

          {visibleMeetingRoomSetting && (
            <div className="col-span-5 grid grid-cols-5 items-center gap-4">
              <span className="font-bold text-right ">회의실이름</span>
              <input
                className="input-white-green col-span-4"
                placeholder="회의실 입력"
                onChange={(ev) => {
                  setMeetingRoomName(ev.target.value);
                }}
                value={meetingRoomName}
                type="text"
              />
            </div>
          )}
          <span className="font-bold text-right">이미지 인터벌(초)</span>
          <input
            value={autoRefreshUISeconds}
            onChange={(ev) => {
              setAutoRefreshUISeconds(ev.currentTarget.valueAsNumber);
            }}
            className="input-white-green col-span-4"
            placeholder="시간입력(초)"
            min={0}
            step={1}
            max={3600}
            type="number"
          />
          <span className="font-bold text-right">설명</span>
          <textarea
            value={desc}
            onChange={(ev) => setDesc(ev.target.value)}
            className="col-span-4 row-span-3 h-[120px] p-2"
          />
        </div>
        {/* 강서구청 */}
        <div className="col-span-5 grid grid-cols-5 items-center gap-4">
          {visibleLocalMap && (
            <>
              <span className="font-bold text-sm text-right">관내도 선택</span>
              <input
                readOnly
                className="input-white-green col-span-3"
                placeholder="관내도 선택"
                value={localMapInfo?.name}
                type="text"
              />

              <button
                onClick={() => {
                  showSelectLocalMapPopup(dialogCtx!, (map) => {
                    setLocalMapInfo({ id: map.id, name: map.name });
                  });
                }}
                disabled={!(selectedKioskType === "GangseoGosiNotice")}
                className="btn-gray">
                변경
              </button>
            </>
          )}
          {visibleContentsLayout && (
            <>
              <span className="font-bold text-right">메인컨텐츠레이아웃</span>
              <input
                readOnly
                className="input-white-green col-span-2"
                placeholder="메인 컨텐츠레이아웃 선택"
                value={contentLayoutInfo?.name}
                type="text"
              />
              <button
                onClick={() => {
                  showSelectContentLayoutPopup(dialogCtx!, (layout) => {
                    setLayoutInfo({ id: layout.id, name: layout.name });
                  });
                }}
                className="btn-gray">
                변경
              </button>
              <button
                onClick={() => {
                  setLayoutInfo({ id: -1, name: "" });
                }}
                className="btn-gray">
                제거
              </button>

              {visibleSubContentsLayout && (
                <>
                  <span className="font-bold text-right">
                    서브컨텐츠레이아웃
                  </span>
                  <input
                    readOnly
                    className="input-white-green col-span-2"
                    placeholder="서브 컨텐츠레이아웃 선택"
                    value={subContentLayoutInfo?.name}
                    type="text"
                  />
                  <button
                    onClick={() => {
                      showSelectContentLayoutPopup(dialogCtx!, (layout) => {
                        setSubLayoutInfo({ id: layout.id, name: layout.name });
                      });
                    }}
                    className="btn-gray">
                    변경
                  </button>
                  <button
                    onClick={() => {
                      setSubLayoutInfo({ id: -1, name: "" });
                    }}
                    className="btn-gray">
                    제거
                  </button>
                </>
              )}

              {/* 강서 고시필터 */}
              {visibleGosifilter && (
                <div className="col-span-5 grid grid-cols-5 items-center gap-4">
                  <span className="font-bold text-right">고시공고 필터</span>
                  <input
                    disabled={!isSelectedOrgChart}
                    className="input-white-green col-span-3"
                    placeholder="고시공고 필터 (필터 없을 경우 전체 표시)"
                    value={gosiFilter}
                    onChange={(ev) => {
                      setGosiFilter(ev.currentTarget.value);
                    }}
                    type="text"
                  />

                  <button
                    disabled={!isSelectedOrgChart}
                    className="btn-gray"
                    onClick={() => {
                      showSelectDepartmentPopup(dialogCtx!, (department) => {
                        setGosiFilter(department.name);
                      });
                    }}>
                    필터명설정
                  </button>
                </div>
              )}

              <span className="font-bold text-right">장비볼륨</span>
              <input
                min={0}
                max={1}
                step={0.1}
                className="input-white-green col-span-3"
                type="range"
                value={deviceVolume}
                onChange={(ev) =>
                  setDeviceVolume(ev.currentTarget.valueAsNumber)
                }
              />
              <input
                readOnly
                className="input-white-green min-w-[50px] w-[100px]"
                type="text"
                value={deviceVolume * 100}
              />
            </>
          )}
        </div>

        {/* 의령 새소식필터 */}
        {visibleNoticeFilter && (
          <div className="col-span-5 grid grid-cols-5 items-center gap-4">
            <span className="font-bold text-right">새소식 필터</span>
            <input
              disabled={!isSelectedOrgChart}
              className="input-white-green col-span-3"
              placeholder="새소식 필터 입력 (필터 없을 경우 전체 표시)"
              value={noticeFilter}
              onChange={(ev) => {
                setNoticeFilter(ev.currentTarget.value);
              }}
              type="text"
            />

            <button
              disabled={!isSelectedOrgChart}
              className="btn-gray"
              onClick={() => {
                showSelectDepartmentPopup(dialogCtx!, (department) => {
                  setNoticeFilter(department.name);
                });
              }}>
              부서명설정
            </button>
          </div>
        )}

        {visibleHamanSetting && (
          <div className="col-span-5 grid grid-cols-5 items-center gap-4">
            <span className="font-bold text-right">장치 위경도</span>
            <input
              className="input-white-green col-span-2"
              placeholder="위도"
              type="number"
              value={locationOption?.latitude}
              onChange={(ev) => {
                setLocationOption((pv) => {
                  return {
                    ...pv,
                    latitude: ev.target.valueAsNumber,
                  };
                });
              }}
            />
            <input
              className="input-white-green col-span-2"
              placeholder="경도"
              type="number"
              value={locationOption?.longitude}
              onChange={(ev) => {
                setLocationOption((pv) => {
                  return {
                    ...pv,
                    longitude: ev.target.valueAsNumber,
                  };
                });
              }}
            />
            <span className="font-bold text-right">장치 IP</span>
            <input
              className="input-white-green col-span-4"
              placeholder="장치아이피주소 127.0.0.1 "
              type="text"
              value={locationOption?.ipAddress}
              onChange={(ev) => {
                setLocationOption((pv) => {
                  return {
                    ...pv,
                    ipAddress: ev.target.value,
                  };
                });
              }}
            />
          </div>
        )}

        {/* 3열 */}
      </div>
    </DialogModal>
  );
}

export function showAddNewDevice(
  ctx: IDialogContextData,
  onOk: (
    did: string,
    kioskType: KioskType,
    deptCode?: string,
    deptName?: string,
    orgChartId?: number,
    orgChartName?: string,
    chartId?: number,
    chartName?: string,
    desc?: string,
    extraSettings?: IDeviceExtraSettings
  ) => void
) {
  ctx?.pushDialog(
    <DeviceInfoModal
      title="새장치만들기"
      key="showAddNewDevice"
      isOpen={true}
      onCancel={() => ctx?.popDialog()}
      onOk={(
        did,
        kt,
        dc,
        dn,
        oid,
        oname,
        chartId,
        chartName,
        desc,
        extraSettings
      ) => {
        ctx?.popDialog();
        onOk(
          did,
          kt,
          dc,
          dn,
          oid,
          oname,
          chartId,
          chartName,
          desc,
          extraSettings
        );
      }}
    />
  );
}

export function showEditDeviceModal(
  ctx: IDialogContextData,
  selectedDevice: ISGDevice,
  onOk: (
    deviceId: string,
    kioskType: KioskType,
    deptCode?: string,
    deptName?: string,
    orgChartId?: number,
    orgChartName?: string,
    chartId?: number,
    chartName?: string,
    desc?: string,
    extraSettings?: IDeviceExtraSettings
  ) => void
) {
  ctx?.pushDialog(
    <DeviceInfoModal
      key={"showEditDeviceModal"}
      title="장치정보수정"
      isOpen={true}
      device={selectedDevice}
      onCancel={() => ctx?.popDialog()}
      onOk={(
        deviceId,
        kioskType,
        deptCode,
        deptName,
        orgChartId,
        orgChartName,
        chartId,
        chartName,
        desc,
        extraSettings
      ) => {
        ctx?.popDialog();
        onOk(
          deviceId,
          kioskType,
          deptCode,
          deptName,
          orgChartId,
          orgChartName,
          chartId,
          chartName,
          desc,
          extraSettings
        );
      }}
    />
  );
}
