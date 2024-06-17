import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import { observer } from "mobx-react";
// import { ImageMenuButton } from "../ui/button";
import showGridImage from "@/assets/buttons/show_grid.svg";
import moveSnapImage from "@/assets/buttons/move_snap.svg";
import snapGridImage from "@/assets/buttons/snap_grid.svg";

import alignLeftImage from "@/assets/buttons/왼쪽정렬.svg";
import alignRightImage from "@/assets/buttons/오른쪽정렬.svg";
import alignBottomImage from "@/assets/buttons/아래정렬.svg";
import alignTopImage from "@/assets/buttons/위로정렬.svg";

import 세로간격동일Image from "@/assets/buttons/세로간격동일.svg";
import 가로간격동일Image from "@/assets/buttons/가로간격동일.svg";

import 뒤로Image from "@/assets/buttons/뒤로.svg";
import 복사Image from "@/assets/buttons/복사.svg";
import 삭제Image from "@/assets/buttons/삭제.svg";

import 인사디비동기화Image from "@/assets/buttons/인사디비동기화.svg";
import 직원변경Image from "@/assets/buttons/직원변경.svg";
import { runInAction } from "mobx";
import { toast } from "react-hot-toast";
import { TopImageMenuButton } from "../ui/button/ImageMenuButton";

interface Props {
  className?: string;
  viewModel: SeatingChartViewModel;
  onChangeMemberNode: () => void;
  onSyncInsaDB: () => void;
}

export default observer(function SeatChartTopToolbar({
  className,
  viewModel,
  onChangeMemberNode,
  onSyncInsaDB,
}: Props) {
  const canChangeSwapMember =
    viewModel.lastSelectedItem?.seatingType === "Member" &&
    viewModel.selectedItems.length === 1;

  const undoCount = viewModel.undoRedoStack.undoStack.length;

  return (
    <div
      className={`px-[24px] py-[8px] shadow bg-[#334155] text-white flex flex-wrap space-x-4 text-sm ${className}`}
    >
      <TopImageMenuButton
        imageSrc={showGridImage}
        title="눈금&#10;&#13;보기"
        onClick={() => {
          runInAction(() => {
            viewModel.showGrid = !viewModel.showGrid;
          });
        }}
        isSelected={viewModel.showGrid}
      />

      <TopImageMenuButton
        buttonType="TopImage"
        imageSrc={moveSnapImage}
        title="눈금간격&#10;&#13;이동"
        isSelected={viewModel.moveWithSnap}
        onClick={() => {
          runInAction(() => {
            viewModel.moveWithSnap = !viewModel.moveWithSnap;
          });
        }}
      />

      <TopImageMenuButton
        buttonType="TopImage"
        imageSrc={snapGridImage}
        title="마우스로&#10;&#13;이동"
        isSelected={viewModel.enableUserMove}
        onClick={() => {
          runInAction(() => {
            viewModel.enableUserMove = !viewModel.enableUserMove;
          });
        }}
      />

      <div className="w-[1px] h-[60px] bg-white/50" />

      <TopImageMenuButton
        imageSrc={alignLeftImage}
        title="왼쪽&#10;&#13;정렬"
        onClick={() => viewModel.alignLeft()}
      />

      <TopImageMenuButton
        imageSrc={alignRightImage}
        title="오른쪽&#10;&#13;정렬"
        onClick={() => viewModel.alignRight()}
      />

      <TopImageMenuButton
        imageSrc={alignBottomImage}
        title="아래&#10;&#13;정렬"
        onClick={() => viewModel.alignBottom()}
      />
      <TopImageMenuButton
        imageSrc={alignTopImage}
        title="위로&#10;&#13;정렬"
        onClick={() => viewModel.alignTop()}
      />
      <div className="w-[1px] h-[60px] bg-white/50" />

      <TopImageMenuButton
        imageSrc={세로간격동일Image}
        title="세로 간격&#10;&#13;동일"
        onClick={() => viewModel.arrangeVerticalBottom()}
      />

      <TopImageMenuButton
        imageSrc={가로간격동일Image}
        onClick={() => viewModel.arrangeHorizontalRight()}
        title="가로 간격&#10;&#13;동일"
      />

      <div className="w-[1px] h-[60px] bg-white/50" />

      <TopImageMenuButton
        imageSrc={뒤로Image}
        title="뒤로&#10;&#13;가기"
        onClick={() => {
          viewModel.undoRedoStack.undo();
          toast("실행취소");
        }}
        disabled={viewModel.undoRedoStack.undoStack.length <= 0}
      />

      {/* <span>UndoCount:{viewModel.undoRedoStack.undoStack.length}</span> */}

      {/* <TopImageMenuButton imageSrc={복사Image} title="복사" /> */}

      <TopImageMenuButton
        imageSrc={삭제Image}
        title="삭제"
        onClick={() => {
          viewModel.removeSelection();
        }}
      />

      <div className="flex-1"></div>

      <div className="w-[1px] h-[60px] bg-white/50" />

      <TopImageMenuButton
        imageSrc={인사디비동기화Image}
        title="인사디비&#10;&#13;동기화"
        onClick={onSyncInsaDB}
      />

      <TopImageMenuButton
        imageSrc={직원변경Image}
        title="직원&#10;&#13;변경"
        disabled={!canChangeSwapMember}
        onClick={onChangeMemberNode}
      />
    </div>
  );
});
