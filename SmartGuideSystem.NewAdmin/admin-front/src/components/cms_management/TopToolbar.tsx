import { useContext } from "react";
import ContentLayoutEditContext from "@/contexts/ContentLayoutEditContext";
import ColorButton from "../ui/button/ColorButton";
import DialogContext from "@/contexts/DialogContext";
import { showListItemDialog } from "../modals";
import { showInputDialog } from "../modals/InputModal";

import iconLayout1 from "@/assets/cms/3분할 세로.svg";
import iconLayout2 from "@/assets/cms/상단분할 세로.svg";
import iconLayout3 from "@/assets/cms/전면세로.svg";
import iconLayout4 from "@/assets/cms/중앙분할 세로.svg";
import iconLayout5 from "@/assets/cms/하단분할 세로.svg";
import { SceneType } from "@shares/ISGContentLayout";
import { CURRENT_SITE } from "@/const";

const iconLayouts = [
  iconLayout3,
  iconLayout1,
  iconLayout2,
  iconLayout4,
  iconLayout5,
];

// 강서
const titleLayouts = [
  "전면세로",
  "3분할 세로",
  "상단분할 세로",
  "중앙분할 세로",
  "하단분할 세로",
];

const layoutTypes: SceneType[] = [
  "FullScreen",
  "3Div",
  "2Div(1:2)",
  "2Div",
  "2Div(2:1)",
];

const iconLayouts2 = [
  iconLayout3,
  iconLayout1,
  iconLayout2,
  iconLayout4,
  iconLayout5,
];

// 사이니지
const titleLayouts2 = [
  "3분할 (8,192 x 2,160)",
  "4분할 (8,192 x 2,160)",
  "1분할 (7,680 x 1,080)",
  "2분할 (3,840 x 2,160)",
  "2분할 (1,080 x 1,920)",
];

const layoutTypes2: SceneType[] = [
  "3Div_1_4_1_(8192x2160)",
  "4Div_1_1_1_1_(8192x2160)",
  "1Div_1_(7680x1080)",
  "2Div_2_1_(3840x2160)",
  "2Div_2_1_(1080x1920)",
];

// 함안
const titleLayouts3 = [
  "전체화면 (1000x1160)",
  "2분할(1:1) (1000x1160)",
  "2분할(2:1) (1000x1160)",
];

const layoutTypes3: SceneType[] = [
  "FullScreen_(1000x1160)",
  "2Div_1_1_(1000x1160)",
  "2Div_2_1_(1000x1160)",
];

// 함안
const titleLayouts4 = ["전체화면 (1920x1080)", "전체화면 (2160x3840)"];

const layoutTypes4: SceneType[] = [
  "FullScreen_(1920x1080)",
  "FullScreen_(2160x3840)",
];

interface Props {
  className?: string;
}
export default function TopToolbar({ className }: Props) {
  const layoutEditCtx = useContext(ContentLayoutEditContext);
  const layoutVM = layoutEditCtx?.contentLayout;
  const dialogCtx = useContext(DialogContext);

  return (
    <div className={`${className} flex p-2  bg-slate-500  `}>
      {/* 강서 */}
      {CURRENT_SITE === "gangseo" && (
        <ColorButton
          className=""
          title={"레이아웃 타입 변경"}
          onClick={() => {
            showListItemDialog(
              dialogCtx!,

              "레이아웃선택",
              titleLayouts,
              (it, idx, items, onClickItem) => {
                return (
                  <div
                    onClick={() => onClickItem(it, idx)}
                    className="w-[160px] flex flex-col items-center space-y-2 m-2 font-normal rounded-lg hover:bg-[#292424]/50 text-white px-3 py-4 text-lg bg-[#292424] cursor-pointer"
                  >
                    <img className="h-[64px]" src={iconLayouts[idx]} />
                    <p>{it}</p>
                  </div>
                );
              },
              (item, index) => {
                dialogCtx?.popDialog();
                //layoutVM?.testLayoutStyle(index ?? 0);
                if (index !== undefined) {
                  layoutVM?.activeScene?.setSceneType(layoutTypes[index]);
                }
              },
              "flex flex-row "
            );
          }}
          colorStyle="confirm"
        />
      )}
      {/* 함안 */}
      {CURRENT_SITE === "haman" && (
        <ColorButton
          className="ml-2"
          title={"레이아웃 변경"}
          onClick={() => {
            showListItemDialog(
              dialogCtx!,
              "레이아웃선택",
              titleLayouts3,
              (it, idx, items, onClickItem) => {
                return (
                  <div
                    onClick={() => onClickItem(it, idx)}
                    className="w-[160px] flex flex-col items-center space-y-2 m-2 font-normal rounded-lg hover:bg-[#292424]/50 text-white px-3 py-4 text-lg bg-[#292424] cursor-pointer"
                  >
                    {/* <img className="h-[64px]" src={iconLayouts2[idx]} /> */}
                    <p>{it}</p>
                  </div>
                );
              },
              (item, index) => {
                dialogCtx?.popDialog();
                if (index !== undefined) {
                  layoutVM?.activeScene?.setSceneType(layoutTypes3[index]);
                }
              },
              "flex flex-row "
            );
          }}
          colorStyle="confirm"
        />
      )}

      {/* 진주 */}
      {CURRENT_SITE === "jinju" && (
        <ColorButton
          className="ml-2"
          title={"레이아웃 변경"}
          onClick={() => {
            showListItemDialog(
              dialogCtx!,
              "레이아웃선택",
              titleLayouts2,
              (it, idx, items, onClickItem) => {
                return (
                  <div
                    onClick={() => onClickItem(it, idx)}
                    className="w-[160px] flex flex-col items-center space-y-2 m-2 font-normal rounded-lg hover:bg-[#292424]/50 text-white px-3 py-4 text-lg bg-[#292424] cursor-pointer"
                  >
                    <p>{it}</p>
                  </div>
                );
              },
              (item, index) => {
                dialogCtx?.popDialog();
                if (index !== undefined) {
                  layoutVM?.activeScene?.setSceneType(layoutTypes2[index]);
                }
              },
              "flex flex-row "
            );
          }}
          colorStyle="confirm"
        />
      )}

      {/* 의령 */}
      {CURRENT_SITE === "uiryeong" && (
        <ColorButton
          className="ml-2"
          title={"레이아웃 변경"}
          onClick={() => {
            showListItemDialog(
              dialogCtx!,
              "레이아웃선택",
              titleLayouts4,
              (it, idx, items, onClickItem) => {
                return (
                  <div
                    onClick={() => onClickItem(it, idx)}
                    className="w-[160px] flex flex-col items-center space-y-2 m-2 font-normal rounded-lg hover:bg-[#292424]/50 text-white px-3 py-4 text-lg bg-[#292424] cursor-pointer"
                  >
                    <p>{it}</p>
                  </div>
                );
              },
              (item, index) => {
                dialogCtx?.popDialog();
                if (index !== undefined) {
                  layoutVM?.activeScene?.setSceneType(layoutTypes4[index]);
                }
              },
              "flex flex-row "
            );
          }}
          colorStyle="confirm"
        />
      )}

      <ColorButton
        className="ml-2"
        title={"레이아웃 이름 변경"}
        onClick={() => {
          if (layoutVM) {
            showInputDialog(
              dialogCtx!,
              "레이아웃 이름 변경",
              (input) => {
                layoutVM.setName(input);
              },
              undefined,
              layoutVM.name
            );
          }
        }}
        colorStyle="confirm"
      />

      <div className="flex ml-auto my-auto text-white/90 rounded-3xl  h-full px-6 items-center space-x-1  ">
        <span>Zoom : </span>
        <input
          type="range"
          className="w-[220px] "
          min={0.1}
          max={2.0}
          step={0.1}
          value={layoutEditCtx!.scaleRatio}
          onChange={(ev) => {
            const newZoom = parseFloat(ev.target.value);
            layoutEditCtx?.setScaleRatio(newZoom);
          }}
        />
        <span className="w-[100px]">
          배율: {Math.floor((layoutEditCtx?.scaleRatio ?? 0) * 100)}%
        </span>
      </div>
    </div>
  );
}
