//import "./grid.css";

import MockupScreen from "@/components/ui/MockupScreen";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import { PropsWithChildren, useContext, useState } from "react";
import DialogContext from "@/contexts/DialogContext";
import { XIcon } from "lucide-react";
import { ColorButton, NormalColorButton } from "@/components/ui/button";
import {
  SITE_HOR_FLOOR_GUIDE_PREVIEW_IMAGE,
  SITE_VER_FLOOR_GUIDE_PREVIEW_IMAGE,
} from "@/const";
import SimpleComboBox from "@/components/ui/dropdown/SimpleComboBox";
import { FloorMapViewModel } from "@/viewmodels/floor_map/FloorMapViewModel";
import { BaseMarkerViewModel } from "@/viewmodels/floor_map/BaseMarkerViewModel";

interface MainProps {
  viewModel: FloorMapViewModel;
}
export default function PreviewFloorGuideMap({ viewModel }: MainProps) {
  const dialogCtx = useContext(DialogContext);

  const [modeIndex, setModeIndex] = useState(0);

  const mockWidth = modeIndex === 0 ? 1920 : 1080;
  const mockHeight = modeIndex === 0 ? 1080 : 1920;

  return (
    <div className="left-0 top-0 w-screen h-screen z-30 fixed bg-black/70 p-[20px] flex">
      <div className="relative w-[90%] h-[90%] bg-[#e8e6da] shadow-lg m-auto rounded-[10px] px-4 pt-20 pb-20 ">
        <div className="absolute w-full h-16 left-0 top-0 flex items-center justify-between px-5 border-b border-black/20 space-x-3">
          <span>미리보기</span>
          <SimpleComboBox
            selectedIdx={modeIndex}
            items={["가로(1920x1080)", "세로(1080x1920)"]}
            onSelectedItem={(title, index) => {
              setModeIndex(index);
            }}
          />
          <XIcon
            onClick={() => dialogCtx?.popDialog()}
            className="ml-auto h-10 w-10 p-2 hover:bg-black/5 active:bg-black/20 rounded-md"
          />
        </div>
        <MockupScreen
          className="w-full h-full  pt1"
          mockupWidth={mockWidth}
          mockupHeight={mockHeight}
        >
          <div
            className="w-full h-full pt-[100px] pl-[0px] flex flex-row"
            style={{
              backgroundImage: `url("${
                modeIndex === 0
                  ? SITE_HOR_FLOOR_GUIDE_PREVIEW_IMAGE
                  : SITE_VER_FLOOR_GUIDE_PREVIEW_IMAGE
              }")`,
            }}
          >
            <div className="absolute bottom-[53%] translate-y-[50%] w-full ">
              <div className=" h-full  flex">
                <FloorArea
                  className="m-auto mb-[40px] max-w-[1700px]  "
                  floor={viewModel}
                />
              </div>
            </div>
          </div>
        </MockupScreen>

        <ColorButton
          className="absolute bottom-4 right-4"
          colorStyle="confirm"
          title="닫기"
          onClick={() => dialogCtx?.popDialog()}
        />
      </div>
    </div>
  );
}

interface Props {
  floor?: FloorMapViewModel;
  className?: string;
}
function FloorArea({ floor, className }: Props) {
  return (
    <div className={`  ${className}  relative  `}>
      <img
        className=" object-contain object-center h-[600px] rounded-3xl"
        src={floor?.floorImageUrl}
        alt=""
      />

      {floor?.markers?.map((marker, index) => {
        if (marker.markerType === "Department") {
          return (
            <DepartmentMarker
              key={marker.title}
              onClick={() => {}}
              marker={marker}
            />
          );
        } else if (marker.markerType === "KioskDevice") {
          return (
            <KioskDeviceMarker
              key={marker.deviceId}
              marker={marker}
              onClick={() => {}}
            />
          );
        }
      })}
    </div>
  );
}

interface Props2 {
  marker: BaseMarkerViewModel;
  onClick: () => void;
}
function DepartmentMarker({ marker, onClick }: Props2) {
  const x = 50;
  const y = 50;

  return (
    <div
      onClick={onClick}
      className="absolute  active:bg-black/10 flex cursor-pointer    "
      style={{
        // left: `${x}%`,
        // top: `${y}%`,
        left: `${marker.posX}px`,
        top: `${marker.posY}px`,
        width: `${marker.width}px`,
        height: `${marker.height}px`,
      }}
    >
      {/* <span className="animate-ping m-auto inline-flex h-[30px] w-[30px] rounded-full bg-sky-500 opacity-90"></span> */}
      <span
        className={`animate-pulse m-auto px-[18px] py-[6px] border-[1px] border-white text-[14px] font-[600] text-white rounded-full  ${
          marker.actionIndex === 0 ? "bg-[#014da2]" : "bg-[#5aa947]"
        }`}
      >
        {marker.actionIndex === 0 ? marker.title : "안내"}
      </span>
    </div>
  );
}

function KioskDeviceMarker({ marker }: Props2) {
  return (
    <div
      className="absolute  translate-x-[0%] translate-y-[0%] w-[50px] h-[50px] cursor-pointer"
      style={{
        //   left: `${marker.posX}%`,
        //   top: `${marker.posY}%`,
        left: `${marker.posX}px`,
        top: `${marker.posY}px`,
      }}
    >
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-800 opacity-90"></span>
      <div className="bg-red-600 h-[10px] w-[10px] rounded-full absolute left-[50%] top-[50%]  translate-x-[-50%] translate-y-[-50%]"></div>
    </div>
  );
}
