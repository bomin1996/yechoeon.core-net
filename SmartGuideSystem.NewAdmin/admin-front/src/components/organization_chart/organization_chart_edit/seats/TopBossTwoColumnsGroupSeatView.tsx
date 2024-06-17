import { observer } from "mobx-react";
import React, { useContext } from "react";
import SeatAreaContext from "@/contexts/SeatAreaContext";
import { TopBossTwoColumnsGroupSeatViewModel } from "@/viewmodels/organization_chart/TopBossTwoColumnsGroupSeatViewModel";
import {
  // HorizontalDropContainer,
  SingleDropContainer,
  VerticalDropContainer,
} from "./DropContainer";

interface Props {
  viewModel: TopBossTwoColumnsGroupSeatViewModel;
  droppableId: string;
  className?: string;
}

const TopBossTwoColumnsGroupSeatView: React.FC<Props> = ({
  viewModel,
  droppableId,
  className,
}) => {
  const seatAreaContext = useContext(SeatAreaContext);
  const droppableId_TopRow = droppableId + "_0";
  const droppableId_BottomRow = droppableId + "_1";
  const droppableId_Boss = droppableId + "_2";

  return (
    <div
      onMouseDown={(ev) => {
        seatAreaContext?.onMouseDown(ev.clientX, ev.clientY, viewModel);
        ev.stopPropagation();
      }}
      className={`flex flex-col items-center w-[200px] p-2 absolute bg-[#838081] rounded-[10px] ${
        viewModel.isSelected
          ? "bg-[#838081] border-2  z-20 border-[#00b4bf]"
          : ""
      } ${className}`}
    >
      <p className="mb-2 select-none w-[150px] h-[30px] px-3 py-1 text-center font-bold text-sm text-white bg-black/50 rounded-md">
        {viewModel.title} {!viewModel.dontAddTeamWord && "팀"}
      </p>

      <div className="flow flow-col items-center">
        <div className="ml-auto mr-auto my-1">
          <SingleDropContainer
            droppableId={droppableId_Boss}
            items={viewModel.members3}
            onAddClick={() =>
              seatAreaContext?.addMemberFromGroupSeat(viewModel, 2)
            }
          />
        </div>

        <div className="flex flex-row gap-3">
          <VerticalDropContainer
            droppableId={droppableId_TopRow}
            items={viewModel.members1}
            onAddClick={() =>
              seatAreaContext?.addMemberFromGroupSeat(viewModel, 0)
            }
          />
          <VerticalDropContainer
            droppableId={droppableId_BottomRow}
            items={viewModel.members2}
            onAddClick={() =>
              seatAreaContext?.addMemberFromGroupSeat(viewModel, 1)
            }
          />
        </div>
      </div>

      {!viewModel.dontShowTeamDetailButton && (
        <div className="w-full mt-2 flex flex-col p-2 rounded-lg bg-black/50 text-white/90 text-sm">
          <p>전화:{viewModel.officeTel}</p>
          <p>팩스:{viewModel.officeFax}</p>
          <p>업무:</p>
          <p className="mt-1 whitespace-pre-line">{viewModel.job}</p>
        </div>
      )}
    </div>
  );
};

export default observer(TopBossTwoColumnsGroupSeatView);
