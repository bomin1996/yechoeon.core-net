import {
  UserIcon,
  CheckCircleIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import { observer } from "mobx-react";
import { BaseSeatingPlaceViewModel } from "@/viewmodels/seating_chart/BaseSeatingPlaceViewModel";
import { MemberSeatingPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/MemberSeatingPlaceViewModel";
import React from "react";
import { TeamBannerPlaceViewModel } from "@/viewmodels/seating_chart/place-viewmodels/TeamBannerPlaceViewModel";

interface Props {
  className?: string;
  viewModel: SeatingChartViewModel;
}
export default observer(function NodeListPanel({
  className,
  viewModel,
}: Props) {
  const nodes = [...viewModel.placeItems];

  return (
    <div className={`${className} p-4 flex flex-col`}>
      <div className="overflow-auto gap-1 flex flex-col text-white/90">
        {nodes.map((node, index) => {
          if (node.seatingType === "Member") {
            return (
              <MemberNodeItem key={index} viewModel={viewModel} nodeVm={node} />
            );
          } else {
            return (
              <TeamBannerNodeItem
                key={index}
                viewModel={viewModel}
                nodeVm={node}
              />
            );
          }
        })}
      </div>
    </div>
  );
});

interface NodeProps {
  viewModel: SeatingChartViewModel;
  nodeVm: BaseSeatingPlaceViewModel;
}

const MemberNodeItem: React.FC<NodeProps> = observer(
  ({ viewModel, nodeVm }) => {
    const member = (nodeVm as MemberSeatingPlaceViewModel).member;

    return (
      <div
        onClick={() => {
          viewModel.addSelection(nodeVm, true);
        }}
        className="flex items-center hover:bg-white/30 bg-white/5 px-1 py-1 rounded-sm "
      >
        <input
          type="checkbox"
          checked={nodeVm.isSelected}
          onClick={(ev) => {
            //ev.currentTarget.value
            //nodeVm.isSelected = !nodeVm.isSelected;
            nodeVm.setSelected(!nodeVm.isSelected);
            ev.stopPropagation();
          }}
          className="checkbox checkbox-sm mr-2"
        />
        <UserIcon className="h-5 w-5" />
        <span className="flex-1 ml-3 text-xs ">
          {member.name}{" "}
          <i>
            <strong>{member.teamPosition ?? member.positionName}</strong>
            <strong> {member.teamName}</strong>
          </i>
        </span>
        {nodeVm.isSelected && <CheckCircleIcon className="h-5 w-5" />}
      </div>
    );
  }
);

const TeamBannerNodeItem: React.FC<NodeProps> = observer(
  ({ viewModel, nodeVm }) => {
    const teamBannerVm = nodeVm as TeamBannerPlaceViewModel;

    return (
      <div
        onClick={() => {
          viewModel.addSelection(nodeVm, true);
        }}
        className="flex items-center hover:bg-white/30 bg-white/5 px-1 py-1 rounded-sm "
      >
        <input
          type="checkbox"
          checked={nodeVm.isSelected}
          onClick={(ev) => {
            //ev.currentTarget.value
            //nodeVm.isSelected = !nodeVm.isSelected;
            nodeVm.setSelected(!nodeVm.isSelected);

            ev.stopPropagation();
          }}
          className="checkbox checkbox-sm mr-2"
        />
        <PuzzlePieceIcon className="h-5 w-5" />
        <span className="flex-1 ml-3 text-xs ">{teamBannerVm.title} </span>
        {nodeVm.isSelected && <CheckCircleIcon className="h-5 w-5" />}
      </div>
    );
  }
);
