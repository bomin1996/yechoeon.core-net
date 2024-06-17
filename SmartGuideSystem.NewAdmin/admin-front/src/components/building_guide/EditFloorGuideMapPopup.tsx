import React, { FormEvent, useContext } from "react";
import withModal from "@/components/ui/modal/withModal";

import title_logo from "@/assets/admin-text-logo.svg";
// import ColorButton from "@/components/ui/button/ColorButton";

import deprtIcon from "@/assets/icons/icon-small-department.svg";
import deviceIcon from "@/assets/icons/icon-small-device.svg";

import EditFloorAreaView from "./floor_edit/EditFloorAreaView";
import { FloorMapViewModel } from "@/viewmodels/floor_map/FloorMapViewModel";
import { observer } from "mobx-react";
import { DepartmentMarkerViewModel } from "@/viewmodels/floor_map/DepartmentMarkerViewModel";
// import SelectDepartmentModal, {
//   showSelectDepartmentDialog,
// } from "../modals/SelectDepartmentModal";
import { showSelectDeviceDialog } from "../modals/SelectDeviceModal";
import SimpleComboBox from "../ui/dropdown/SimpleComboBox";
import { KioskDeviceMarkerViewModel } from "@/viewmodels/floor_map/KioskDeviceMarkerViewModel";
import DialogContext from "@/contexts/DialogContext";
// import { showSelectOrgChartPopup } from "../modals/SelectOrgChartModal";
// import { useLocation } from "react-router-dom";
import { FloorApis } from "@/server/floorApis";
import toast from "react-hot-toast";
import { showMessageOkCancelDialog } from "../modals";
import { showSelectSeatPosChartPopup } from "../modals/SelectSeatPosChartModal";
import { ImageMenuButton } from "../ui/button";
import 미리보기아이콘 from "@/assets/buttons/menus/미리보기.svg";
import 저장아이콘 from "@/assets/buttons/menus/저장.svg";
import 취소아이콘 from "@/assets/buttons/menus/취소.svg";
import PreviewFloorGuideMap from "./preview/PreviewFloorGuideMap";

interface Props {
  viewModel: FloorMapViewModel;
  onCancle: () => void;
  onOk: (viewModel: FloorMapViewModel) => void;
}

interface SubProps {
  viewModel: FloorMapViewModel;
}

const EditFloorGuideMapPopup: React.FC<Props> = ({
  viewModel,
  onOk,
  onCancle,
}) => {
  // const location = useLocation();
  // const { floorViewModel } = location.state as {
  //   floorViewModel: FloorMapViewModel;
  // };
  const dialogCtx = useContext(DialogContext);

  const handlePreview = () => {
    dialogCtx?.pushDialog(<PreviewFloorGuideMap viewModel={viewModel} />);
  };

  return (
    <div className="h-screen w-screen  pt-16 text-[#221e1f]">
      <div className="absolute left-0 top-0 w-full h-16 bg-[#464344]">
        <span className="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] text-2xl font-bold text-white">
          조직도 : {viewModel.title}
        </span>
        <img
          className="absolute left-5 h-3 top-[50%] translate-y-[-50%]"
          src={title_logo}
          alt=""
        />
        <div className="absolute right-0 top-[50%] translate-y-[-50%] flex divide-x space-x-2 ">
          <ImageMenuButton
            imageSrc={미리보기아이콘}
            title="미리보기"
            onClick={handlePreview}
          />
          <ImageMenuButton
            title={"취소"}
            imageSrc={취소아이콘}
            onClick={onCancle}
          />
          <ImageMenuButton
            title={"저장"}
            colorType="yellow"
            imageSrc={저장아이콘}
            disabled={
              !viewModel.title ||
              !viewModel.buttonName ||
              !viewModel.floorImageUrl
            }
            onClick={() => {
              showMessageOkCancelDialog(
                dialogCtx!,
                "층별안내도 변경",
                "경고) 안내도를 변경하면 모든장치에서 화면이 동시에 변경됩니다.",
                async () => {
                  if (viewModel.id !== 0) {
                    onOk(viewModel);
                  } else {
                    const res = await FloorApis.existFloorName(
                      viewModel.buildingId,
                      viewModel.buttonName,
                      viewModel.floorMapType
                    );

                    if (res?.status === 200) {
                      if (res.data.exist === false) {
                        onOk(viewModel);
                      } else {
                        toast("층이름이 이미 존재합니다.");
                      }
                    }
                  }
                }
              );
            }}
          />
        </div>
      </div>
      <div className="flex flex-row h-full w-full">
        <LeftTeamListPanel viewModel={viewModel} />
        {/* 헤더 */}
        <div className="flex-1 w-0 bg-[#231F20] flex flex-col ">
          {/* 타이틀편집 버튼네임편집 */}
          <div className="h-20 bg-gray-800 flex-shrink-0 flex items-center px-4 gap-2 ">
            <span className="font-bold text-white/90">버튼이름:</span>
            <input
              value={viewModel.buttonName}
              onChange={(ev) => (viewModel.buttonName = ev.target.value)}
              className="rounded-md font-bold w-[120px] px-3 py-1 focus:shadow outline-green-500/50 focus:outline"
            />
            <span className="ml-[10px] font-bold text-white/90">층제목:</span>
            <input
              value={viewModel.title}
              onChange={(ev) => (viewModel.title = ev.target.value)}
              className="rounded-md font-bold w-[240px] px-3 py-1 focus:shadow outline-green-500/50 focus:outline"
            />
            <span className="ml-[10px] font-bold text-white/90">층순서:</span>
            <input
              value={viewModel.order}
              type="number"
              min={-99}
              max={99}
              onChange={(ev) => (viewModel.order = parseInt(ev.target.value))}
              className="rounded-md font-bold w-[80px] px-3 py-1 focus:shadow outline-green-500/50 focus:outline"
            />
            <span className="ml-[10px] font-bold text-white/90">층타입:</span>
            <SimpleComboBox
              className="col-span-4"
              items={["정방향", "역방향"]}
              selectedIdx={viewModel.floorMapType}
              onSelectedItem={(it, index) => {
                viewModel.floorMapType = index;
              }}
            />
            {/* <ColorButton
              className="ml-auto"
              colorStyle="cancel"
              title="취소"
              onClick={onCancle}
            /> */}
            {/* <ColorButton
              colorStyle="save"
              disable={
                !viewModel.title ||
                !viewModel.buttonName ||
                !viewModel.floorImageUrl
              }
              title="저장"


              onClick={() => {
                showMessageOkCancelDialog(
                  dialogCtx!,
                  "층별안내도 변경",
                  "경고) 안내도를 변경하면 모든장치에서 화면이 동시에 변경됩니다.",
                  async () => {
                    if (viewModel.id !== 0) {
                      onOk(viewModel);
                    } else {
                      const res = await FloorApis.existFloorName(
                        viewModel.buildingId,
                        viewModel.buttonName,
                        viewModel.floorMapType
                      );

                      if (res?.status === 200) {
                        if (res.data.exist === false) {
                          onOk(viewModel);
                        } else {
                          toast("층이름이 이미 존재합니다.");
                        }
                      }
                    }
                  }
                );
              }}
            /> */}
          </div>
          <div className="p-2 flex-1 h-0 overflow-auto bg=[#231F20] flex">
            <EditFloorAreaView
              className="m-auto flex-shrink-0 flex-grow-0"
              viewModel={viewModel}
              width={viewModel.width}
              height={viewModel.height}
            />
            {/* <img src={backImageUrl} alt="" /> */}
          </div>

          {/* <BottomPanel onChangedUrl={(url) => setBackImageUrl(url)} /> */}
          <BottomPanel
            viewModel={viewModel}
            onChangedUrl={(url) => (viewModel.floorImageUrl = url)}
          />
        </div>

        {viewModel.selectedMarkerVM &&
          (viewModel.selectedMarkerVM.markerType === "Department" ? (
            <DepartMarkerPropertyPanel viewModel={viewModel} />
          ) : (
            <KioskDeviceMarkerPropertyPanel viewModel={viewModel} />
          ))}

        {!viewModel.selectedMarkerVM && (
          <div className="w-72 h-full px-2 flex-col bg-[#e8e6da]"></div>
        )}
      </div>
    </div>
  );
};

export default withModal(observer(EditFloorGuideMapPopup));

const LeftTeamListPanel = observer(({ viewModel }: SubProps) => {
  // const [isSelectDeviceModal, setIsSelectDeviceModal] = useState(false);

  const DialogCtx = useContext(DialogContext);

  return (
    <div className="relative w-72 flex-shrink-0 h-full  px-4 py-2 flex flex-col bg-[#e8e6da]">
      <p className="font-black text-xl border-b pb-1 border-[#bebaae]">
        층안내 정보들
      </p>
      <ul className="py-2">
        {viewModel.markers.map((t, i) => (
          <li
            className={`hover:bg-[#bebaae] text-sm px-2 py-2 my-1 rounded-md font-bold flex ${
              t.isSelected ? "bg-green-400/50 " : ""
            }`}
            key={i}
            onClick={() => {
              viewModel.selectedMarkerVM = t;
            }}
          >
            <img
              className="h-5 mr-1"
              src={t.markerType === "Department" ? deprtIcon : deviceIcon}
              alt=""
            />{" "}
            {t.title}
          </li>
        ))}
      </ul>

      <div className="flex-1"></div>
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => viewModel.addDepartmentMarker("부서정보입력")}
          className="btn-normal2 w-full"
        >
          부서위치 추가하기
        </button>
        <button
          onClick={() => {
            showSelectDeviceDialog(DialogCtx!, (device) => {
              viewModel.addKioskDeviceMarker(
                device.deviceId,
                device.deptCode ?? ""
              );
            });
          }}
          className="btn-normal2 w-full "
        >
          장치위치 추가하기
        </button>
        <button
          onClick={() => {
            viewModel.removeMarker(viewModel.selectedMarkerVM);
          }}
          disabled={viewModel.selectedMarkerVM === null}
          className="btn-normal2 w-full bg-[#f44278]"
        >
          선택정보 삭제하기
        </button>
      </div>

      {/* {isSelectDeviceModal && (
        <SelectDeviceModal
          isOpen={isSelectDeviceModal}
          onCancel={() => setIsSelectDeviceModal(false)}
          onOk={(device) => {
            viewModel.addKioskDeviceMarker(
              device.deviceId,
              device.deptCode ?? ""
            );
          }}
        />
      )} */}
    </div>
  );
});

const DepartMarkerPropertyPanel = observer(({ viewModel }: SubProps) => {
  //const [clickActionIndex, setClickActionIndex] = useState(0);

  const marker = viewModel._selectedMarkerVM as DepartmentMarkerViewModel;
  const dialogCtx = useContext(DialogContext);
  return (
    <div className="w-[360px] h-full px-4 text-sm font-bold flex flex-col gap-2 bg-[#e8e6da]">
      <div className="flex border-b h-12 items-center font-black text-2xl border-[#bebaae]">
        세부정보
      </div>

      <div className="grid grid-cols-5 gap-2 items-center text-left">
        <span>표시:</span>
        <input
          type="text"
          value={marker.title}
          onChange={(ev) => (marker.title = ev.target.value)}
          className="col-span-4 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
        ></input>

        <span>관련부서:</span>
        <input
          type="text"
          readOnly={true}
          value={marker.deptName}
          className="col-span-4 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
        ></input>
        {/* <span>조직도:</span>
        <input
          type="text"
          readOnly={true}
          value={marker.orgChartName}
          className="col-span-3 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"></input>
        <button
          onClick={() => {
            showSelectOrgChartPopup(dialogCtx!, (orgChart) => {
              marker.deptCode = orgChart.department?.deptCode ?? "";
              marker.deptName = orgChart.department?.name ?? "";
              marker.orgChartId = orgChart.id;
              marker.orgChartName = orgChart.name;
              marker.title = orgChart.name;
            });
          }}
          className="btn-normal py-2 col-span-1">
          변경
        </button> */}
        <span>배치도:</span>
        <input
          type="text"
          readOnly={true}
          value={marker.orgChartName}
          className="col-span-3 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
        ></input>
        <button
          onClick={() => {
            showSelectSeatPosChartPopup(dialogCtx!, (orgChart) => {
              marker.deptCode = orgChart.department?.deptCode ?? "";
              marker.deptName = orgChart.department?.name ?? "";
              marker.orgChartId = orgChart.id;
              marker.orgChartName = orgChart.name;
              marker.title = orgChart.name;
            });
          }}
          className="btn-normal py-2 col-span-1"
        >
          변경
        </button>

        <span className="">클릭동작:</span>
        <SimpleComboBox
          selectedIdx={marker.actionIndex}
          items={["부서조직도표시", "입력내용표시"]}
          className="col-span-4 w-full"
          onSelectedItem={(_, idx) => {
            marker.actionIndex = idx;
          }}
        />
        <span className="row-span-4">내용:</span>
        {/* <input
          type="text"
          className="col-span-3 row-span-3 h-24 px-4 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
        /> */}

        <textarea
          className="col-span-4 row-span-4 h-[240px] px-4 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          value={marker.content}
          onChange={(ev) => (marker.content = ev.target.value)}
        />
      </div>
    </div>
  );
});

const KioskDeviceMarkerPropertyPanel = observer(({ viewModel }: SubProps) => {
  const marker = viewModel._selectedMarkerVM as KioskDeviceMarkerViewModel;
  const DialogCtx = useContext(DialogContext);

  return (
    <div className="w-[360px]  h-full px-4 text-sm font-bold  flex-col bg-[#e8e6da]">
      <div className="flex border-b h-12 items-center font-black text-2xl border-[#bebaae]">
        세부정보
      </div>

      <div className="grid grid-cols-5 py-2 gap-2 items-center text-left">
        <span className="col-span-1">장비:</span>
        <input
          type="text"
          value={marker.title}
          onChange={(ev) => (marker.title = ev.target.value)}
          className="col-span-3 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
        ></input>
        <button
          onClick={() => {
            showSelectDeviceDialog(DialogCtx!, (device) => {
              marker.deptCode = device.deptCode ?? "";
              marker.deviceId = device.deviceId;
              marker.title = device.deviceId;
            });
          }}
          className="btn-normal py-2 col-span-1"
        >
          변경
        </button>

        <span>부서:</span>
        <input
          type="text"
          readOnly={true}
          className="col-span-4 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
        ></input>

        <span className="row-span-4">내용:</span>

        <textarea
          className="col-span-4 row-span-4 h-[120px] px-4 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          value={marker.content}
          onChange={(ev) => (marker.content = ev.target.value)}
        />
      </div>
    </div>
  );
});

const BottomPanel = observer(
  ({
    onChangedUrl,
    viewModel,
  }: {
    onChangedUrl: (url: string) => void;
    viewModel: FloorMapViewModel;
  }) => {
    const requestSaveImage = async (ev: FormEvent) => {
      ev.preventDefault();

      try {
        // console.log("request uploadimages /api/images");
        const data = new FormData(ev.target as HTMLFormElement);
        const res = await fetch("/api/Images", {
          method: "POST",
          body: data,
        });
        // console.log("res:", res);
        const json = await res.json();
        // console.log("json:", json);
        onChangedUrl("/serverimages/" + json.path);
      } catch (ex) {
        console.log("exception:", ex);
      }
    };

    const handleSubmit = (ev: FormEvent) => {
      requestSaveImage(ev);
    };

    return (
      <div className="h-16 flex-shrink-0 bg-[#464344] px-4 flex justify-between items-center">
        <form
          action="/api/Images"
          method="Post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className=" flex items-center text-white px-2 gap-2"
        >
          <p className="text-sm">층이미지</p>
          <input
            className="w-[400px] text-black h-8 rounded-md px-2 text-sm font-semibold"
            placeholder="이미지파일"
            readOnly={true}
            value={viewModel.floorImageUrl}
            type="text"
          />
          <label htmlFor="upload_file">
            <div className="px-2 text-black/75 py-1 font-sm bg-slate-100 hover:bg-slate-300 active:bg-slate-400 rounded-lg">
              파일 선택
            </div>
          </label>
          <input
            id="upload_file"
            className="hidden"
            name="File"
            type="file"
            multiple={false}
            onChange={(ev) => {}}
            accept=".png,.jpg,.webp"
          />
          <button
            className="px-2 text-black/75 py-1 font-sm bg-slate-100 hover:bg-slate-300 active:bg-slate-400 rounded-lg"
            type="submit"
          >
            선택파일 업로드
          </button>
        </form>
        <div className="px-2 text-white flex items-center gap-2">
          <span>폰트크기:</span>
          <input
            type="range"
            min={14}
            max={64}
            className="input-normal"
            value={viewModel.fontSize}
            onChange={(ev) => (viewModel.fontSize = parseInt(ev.target.value))}
          />
          <span>{viewModel.fontSize}</span>
          <span>확대보기:</span>
          <input
            type="range"
            className="w-[120px]"
            min={0.5}
            max={2.0}
            step={0.1}
            value={viewModel.zoom}
            onChange={(ev) => {
              const newZoom = parseFloat(ev.target.value);
              viewModel.setZoom(newZoom);
            }}
          />
          <span>{Math.floor(viewModel.zoom * 100)}%</span>
        </div>
      </div>
    );
  }
);
