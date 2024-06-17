import React, { useContext, useEffect, useState } from "react";
import SeatingChart from "./SeatingChart";
import { observer } from "mobx-react";
import LeftToolBar from "./LeftToolBar";
import RightToolBar from "./RightToolBar";
import withModal from "../ui/modal/withModal";
// import ColorButton from "../ui/button/ColorButton";
import { ISGDepartment, ISGUser } from "@shares/*";
import { showMessageOkCancelDialog, showSelectMember } from "../modals";
import DialogContext from "@/contexts/DialogContext";
import { UserApis } from "@/server/userApis";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
// import NodeToolbar from "./NodeToolbar";
import title_logo from "@/assets/admin-text-logo.svg";
import { seatPosChatApis } from "@/server/seatPosChatApis";
import toast from "react-hot-toast";
import { showUpdateSeatPosChartNodeOption } from "../modals/OptionUpdateSeatPosChartFromDBModal";
import BlockUIContext from "@/contexts/BlockUIContext";
import { MemberSeatingPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/MemberSeatingPlaceViewModel";
import AccordionPanelBar from "@/components/ui/panel/AccordionPanelBar";
import useWheelZoom from "@/hooks/useWheelZoom";
import { ImageMenuButton, MenuButton } from "@/components/ui/button";

import 미리보기아이콘 from "@/assets/buttons/menus/미리보기.svg";
import 저장아이콘 from "@/assets/buttons/menus/저장.svg";
import 취소아이콘 from "@/assets/buttons/menus/취소.svg";

import SeatChartTopToolbar from "./SeatChartTopToolbar";
import SeatChartTopSubToolbar from "./SeatChartTopSubToolbar";
// import useKeyboardShortCutKey from "@/hooks/useKeyboardShortCutKey";
import { useHotkeys } from "react-hotkeys-hook";
import PreviewWindow from "../ui/windows/PreviewWindow";
import PreviewSeatPosChart from "./preview/PreviewSeatPosChart";

interface Props {
  seatingViewModel: SeatingChartViewModel;
  depart: ISGDepartment;
  onCancle: () => void;
  onOk: () => void;
}

const SeatingChartMain: React.FC<Props> = ({
  seatingViewModel,
  depart,
  onOk,
  onCancle,
}) => {
  const dialogCtx = useContext(DialogContext);
  const blockUICtx = useContext(BlockUIContext);
  const [teamMembers, setTeamMembers] = useState<Map<string, Array<ISGUser>>>();
  const [allMembers, setAllMembers] = useState<Array<ISGUser>>([]);
  // const [showGrid, setShowGrid] = useState(true);
  // const [realSizeClassName, setRealSizeClassName] = useState({
  //   w: seatingViewModel.width * 0.4,
  //   h: seatingViewModel.height * 0.4,
  // });
  const [backImageData, _] = useState<string>();
  const [backGroundClassName, setBackGroundClassName] =
    useState<string>(`bg-black`);

  const queryTeamMembers = async () => {
    blockUICtx?.setBlock(true);
    const result = await UserApis.teamUsers(depart.deptCode);
    setTeamMembers(new Map(Object.entries(result)));
    const allMembers = await UserApis.userList(depart.deptCode);
    setAllMembers(allMembers);
    blockUICtx?.setBlock(false);
  };

  useEffect(() => {
    queryTeamMembers();
  }, []);

  //bg-[url("@/assets/seat_chart/search-placeholder.png")]

  const { zoom, divRef, setZoom } = useWheelZoom({
    initZoomRatio: 0.6,
    zoomStep: 0.2,
    minimumZoomRatio: 0.2,
    maximumZoomRatio: 2.0,
  });

  // useKeyboardShortCutKey({
  //   callBackKey: (name) => {
  //     seatingViewModel.undoRedoStack.undo();
  //   },
  // });

  useHotkeys(
    "ctrl+z",
    () => {
      seatingViewModel.undoRedoStack.undo();
    },
    [seatingViewModel]
  );
  useHotkeys(
    "ctrl+y",
    () => {
      seatingViewModel.undoRedoStack.redo();
    },
    [seatingViewModel]
  );
  useHotkeys(
    "ctrl+c",
    () => {
      seatingViewModel.copyToClipboard();
    },
    [seatingViewModel]
  );

  const handleInsaDBSync = () => {
    showMessageOkCancelDialog(
      dialogCtx!,
      "인사디비동기화",
      "업데이트된 인사디비 정보를 멤버카드에 적용합니다.",
      () => {
        showUpdateSeatPosChartNodeOption(dialogCtx!, async (result) => {
          if (!result.isUpdateAll) {
            const count = seatingViewModel.selectedItems.reduce((acc, vm) => {
              if (vm.seatingType === "Member") {
                return acc + 1;
              } else {
                return acc;
              }
            }, 0);
            if (count === 0) {
              toast(
                "선택된 멤버가 없습니다. 동기화를 진행하려면 멤버를 선택하거나 전체옵션을 선택해야 합니다."
              );
              return;
            }
          }

          seatingViewModel.updateMemberByDB(allMembers, result);
          toast("동기화 완료");
        });
      }
    );
  };

  const handleSaveSeatingChart = () => {
    showMessageOkCancelDialog(
      dialogCtx!,
      "조직도 변경",
      "경고) 조직도를 변경하면 사용자 검색 및 조직도 화면이 동시에 변경됩니다.",
      async () => {
        if (seatingViewModel.seatPosChart) {
          onOk();
        } else {
          const res = await seatPosChatApis.existChartName(
            seatingViewModel.name
          );
          if (res?.status === 200) {
            if (res.data.exist === false) {
              onOk();
            } else {
              toast("이미 존재하는 이름입니다.");
            }
          }
        }

        // onOk();
      }
    );
  };

  const handlePreview = () => {
    dialogCtx?.pushDialog(<PreviewSeatPosChart chart={seatingViewModel} />);
  };

  return (
    <div className="flex h-screen w-screen pt-[60px]">
      <div className="absolute w-screen h-[60px] left-0 right-0 top-0 flex items-center bg-[#464344] shadow">
        <img
          className="absolute left-5 top-[50%] translate-y-[-50%] h-4"
          src={title_logo}
          alt=""
        />
        <span className="text-white font-bold text-2xl absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] ">
          {seatingViewModel.name}
        </span>

        {/* <ColorButton
          className="ml-auto mr-10  px-10 h-10"
          colorStyle="modify"
          title="인사디비동기화"
          onClick={handleInsaDBSync}
        /> */}

        {/* <ColorButton
          className="ml-2 px-10 h-10"
          colorStyle="cancel"
          title="취소"
          onClick={onCancle}
        /> */}
        {/* <ColorButton
          className="ml-2 mr-4  px-10 h-10"
          colorStyle="save"
          disable={!seatingViewModel.name}
          title="저장"
         
          onClick={handleSaveSeatingChart}
        /> */}

        <div className="ml-auto flex divide-x space-x-2 ">
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
            disabled={!seatingViewModel.name}
            onClick={handleSaveSeatingChart}
          />
        </div>
      </div>

      <AccordionPanelBar barType="Left" className=" h-full">
        <LeftToolBar
          depart={depart}
          teamUsers={teamMembers}
          viewModel={seatingViewModel}
          className="w-[400px] h-full flex-shrink-0 shadow bg-[#252627]"></LeftToolBar>
      </AccordionPanelBar>

      <div
        ref={divRef}
        className="bg-slate-600 flex-1 h-full  flex p-[32px] relative overflow-auto">
        <div className="p-[60px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <SeatingChart
            viewModel={seatingViewModel}
            snapSize={8}
            chartWidth={seatingViewModel.width}
            chartHeight={seatingViewModel.height}
            className={`${backGroundClassName}   `}
            // showGrid={showGrid}
            backImageData={backImageData}
            // actualWidth={realSizeClassName.w}
            // actualHeight={realSizeClassName.h}
            actualWidth={seatingViewModel.width * zoom}
            actualHeight={seatingViewModel.height * zoom}
          />
        </div>

        <SeatChartTopToolbar
          className="px-[32px] absolute w-full shadow top-0 left-0 "
          viewModel={seatingViewModel}
          // showGrid={showGrid}
          // onChangeShowGrid={(showGrid) => setShowGrid(showGrid)}
          // onChangeRatio={(w, h) => {
          //   setRealSizeClassName({ w: w, h: h });
          // }}
          // onChangeBackgroundImage={(imageBase64) => {
          //   setBackImageData(imageBase64);
          // }}
          // onChangeBackgroundClassName={(cn) => {
          //   setBackGroundClassName(cn);
          // }}
          onChangeMemberNode={() => {
            if (
              seatingViewModel.selectedItems.length === 1 &&
              seatingViewModel.lastSelectedItem?.seatingType === "Member"
            ) {
              const srcMemberVm =
                seatingViewModel.lastSelectedItem as MemberSeatingPlaceViewModel;
              showSelectMember(dialogCtx!, allMembers, (u) => {
                const msg = `${srcMemberVm.member.name}을 ${u.name}으로 교체합니다.`;
                showMessageOkCancelDialog(dialogCtx!, "멤버교체", msg, () => {
                  seatingViewModel.changeNodeMember(srcMemberVm, u);
                  toast("교체되었습니다.");
                });
              });
            }
          }}
          onSyncInsaDB={handleInsaDBSync}
        />

        <SeatChartTopSubToolbar
          className="absolute right-0 2xl:top-[96px] top-[140px]"
          viewModel={seatingViewModel}
          zoom={zoom}
          onChangeZoom={(newZoom) => setZoom(newZoom)}
          onChangeBackgroundClassName={(cn) => {
            setBackGroundClassName(cn);
          }}
        />
      </div>

      {/* <NodeToolbar
        className=" px-[32px] absolute left-[400px] right-[400px] shadow top-[60px] bg-slate-700   text-white flex flex-wrap items-center space-x-3 text-sm"

        viewModel={seatingViewModel}
        showGrid={showGrid}
        onChangeShowGrid={(showGrid) => setShowGrid(showGrid)}
        onChangeRatio={(w, h) => {
          setRealSizeClassName({ w: w, h: h });
        }}
        onChangeBackgroundImage={(imageBase64) => {
          setBackImageData(imageBase64);
        }}
        onChangeBackgroundClassName={(cn) => {
          setBackGroundClassName(cn);
        }}
        onChangeMemberNode={() => {
          if (
            seatingViewModel.selectedItems.length === 1 &&
            seatingViewModel.lastSelectedItem?.seatingType === "Member"
          ) {
            const srcMemberVm =
              seatingViewModel.lastSelectedItem as MemberSeatingPlaceViewModel;
            showSelectMember(dialogCtx!, allMembers, (u) => {
              const msg = `${srcMemberVm.member.name}을 ${u.name}으로 교체합니다.`;
              showMessageOkCancelDialog(dialogCtx!, "멤버교체", msg, () => {
                seatingViewModel.changeNodeMember(srcMemberVm, u);
                toast("교체되었습니다.");
              });
            });
          }
        }}
      /> */}
      <AccordionPanelBar barType="Right" className=" h-full">
        <RightToolBar
          viewModel={seatingViewModel}
          // className="w-[400px] h-full flex-shrink-0 bg-[#252627]"
          className="w-[600px] h-full flex-shrink-0 bg-[#e8e6da] text-black"></RightToolBar>
      </AccordionPanelBar>
    </div>
  );
};

export default withModal(observer(SeatingChartMain));
