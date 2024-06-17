import { useState } from "react";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import SimpleComboBox from "../ui/dropdown/SimpleComboBox";
import { TrashIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react";

const snapsValues = [10, 20, 40, 50, 100, 8, 16, 32, 64, 128];
const snapsTitles = snapsValues.map((v) => v.toString());
//const ratioTitles = ["20", "40", "60", "80", "100", "120", "140"];
const ratioValues = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.5, 2.0];
const ratioTitles = ratioValues.map((v) => (v * 100).toString());

interface Props {
  className?: string;
  viewModel: SeatingChartViewModel;
  showGrid: boolean;
  onChangeRatio: (w: number, h: number) => void;
  onChangeShowGrid: (showGrid: boolean) => void;
  onChangeBackgroundImage: (imageBase64: string) => void;
  onChangeBackgroundClassName: (className: string) => void;
  onChangeMemberNode: () => void;
}

export default observer(function NodeToolbar({
  className,
  viewModel,
  onChangeRatio,
  showGrid,
  onChangeShowGrid,
  onChangeBackgroundImage,
  onChangeBackgroundClassName,
  onChangeMemberNode,
}: Props) {
  const [zoomIndex, setZoomIndex] = useState(1);
  const [snapIndex, setSnapIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  const canChangeSwapMember =
    viewModel.lastSelectedItem?.seatingType === "Member" &&
    viewModel.selectedItems.length === 1;

  return (
    <div
      className={`px-[32px] py-[8px] shadow bg-slate-700 text-white flex items-center space-x-3 text-sm ${className}`}
    >
      <span>배경:</span>
      <SimpleComboBox
        className="w-[80px] text-sm"
        items={["메인", "팝업", "화이트", "블랙"]}
        selectedIdx={bgIndex}
        onSelectedItem={(it, index) => {
          setBgIndex(index);
          switch (index) {
            case 0:
              onChangeBackgroundClassName(
                `bg-[url("@/assets/seat_chart/main-placeholder.png")]`
              );
              break;
            case 1:
              onChangeBackgroundClassName(
                `bg-[url("@/assets/seat_chart/search-placeholder.png")]`
              );
              break;
            case 2:
              onChangeBackgroundClassName(`bg-white`);
              break;
            case 3:
              onChangeBackgroundClassName(`bg-black`);
              break;
          }
        }}
      />

      <span>Zoom:</span>
      <SimpleComboBox
        className="w-[80px] text-sm"
        items={ratioTitles}
        selectedIdx={zoomIndex}
        onSelectedItem={(it, index) => {
          setZoomIndex(index);
          const w = ratioValues[index] * viewModel.width;
          const h = ratioValues[index] * viewModel.height;
          console.log("change size ratio : ", w, h);
          onChangeRatio(w, h);
        }}
      />
      <span>Snap:</span>
      <SimpleComboBox
        className="w-[80px]"
        items={snapsTitles}
        selectedIdx={snapIndex}
        onSelectedItem={(it, index) => {
          setSnapIndex(index);
          viewModel.setSnapSize(snapsValues[index]);
        }}
      />
      <Squares2X2Icon
        className={`h-10 w-10 p-2 cursor-pointer hover:bg-black/30 active:bg-black/50 rounded ${
          showGrid ? "bg-black/50 fill-white" : "fill-white/80"
        }`}
        onClick={() => {
          onChangeShowGrid(!showGrid);
        }}
      />

      <span
        onClick={() => viewModel.setMoveWithSnap(!viewModel.moveWithSnap)}
        className={` cursor-pointer  p-2 ${
          viewModel.moveWithSnap ? "bg-black/50" : ""
        } hover:bg-black/30 fill-white active:bg-black/50`}
      >
        눈금간격이동
      </span>

      <span
        onClick={() => viewModel.setEnableUserMove(!viewModel.enableUserMove)}
        className={` cursor-pointer  p-2 ${
          viewModel.enableUserMove ? "bg-black/50" : ""
        } hover:bg-black/30 fill-white active:bg-black/50`}
      >
        마우스로이동
      </span>

      

      <div className="flex-1"></div>
      <TrashIcon
        className="h-10 w-10  cursor-pointer p-2 stroke-red-500 hover:bg-black/30 active:bg-black/50 rounded"
        onClick={() => {
          viewModel.removeSelection();
        }}
      />

      <button
        onClick={() => viewModel.alignLeft()}
        className=" cursor-pointer h-10 w-10 p-2 hover:bg-black/30 fill-white active:bg-black/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff"
          height="24"
          viewBox="0 96 960 960"
          width="24"
        >
          <path d="M80 976V176h80v800H80Zm160-200V656h400v120H240Zm0-280V376h640v120H240Z" />
        </svg>
      </button>

      <button
        onClick={() => viewModel.alignRight()}
        className=" cursor-pointer h-10 w-10 p-2 hover:bg-black/30 fill-white active:bg-black/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 96 960 960"
          width="24"
        >
          <path d="M800 976V176h80v800h-80ZM320 776V656h400v120H320ZM80 496V376h640v120H80Z" />
        </svg>
      </button>

      <button
        onClick={() => viewModel.alignTop()}
        className=" cursor-pointer h-10 w-10 p-2 hover:bg-black/30 fill-white active:bg-black/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 96 960 960"
          width="24"
        >
          <path d="M280 976V336h120v640H280Zm280-240V336h120v400H560ZM80 256v-80h800v80H80Z" />
        </svg>
      </button>

      <button
        onClick={() => viewModel.alignBottom()}
        className=" cursor-pointer h-10 w-10 p-2 hover:bg-black/30 fill-white active:bg-black/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 96 960 960"
          width="24"
        >
          <path d="M80 976v-80h800v80H80Zm200-160V176h120v640H280Zm280 0V416h120v400H560Z" />
        </svg>
      </button>

      <button
        onClick={() => viewModel.arrangeHorizontalRight()}
        className=" cursor-pointer h-10 p-2 enabled:hover:bg-black/30 fill-white enabled:active:bg-black/50 disabled:text-gray-500"
      >
        오른쪽배치
      </button>
      <button
        onClick={() => viewModel.arrangeVerticalBottom()}
        className="h-10 p-2 enabled:hover:bg-black/30 fill-white enabled:active:bg-black/50 disabled:text-gray-500"
      >
        아래배치
      </button>

      <button
        disabled={!canChangeSwapMember}
        onClick={() => {
          onChangeMemberNode();
        }}
        className=" cursor-pointer h-10 p-2 enabled:hover:bg-black/30 fill-white enabled:active:bg-black/50 disabled:text-gray-500"
      >
        멤버변경
      </button>
    </div>
  );
});
