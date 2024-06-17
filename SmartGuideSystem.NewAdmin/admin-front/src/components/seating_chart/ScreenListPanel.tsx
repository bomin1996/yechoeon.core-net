
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import { observer } from "mobx-react";
import React from "react";

interface Props {
  className?: string;
  viewModel: SeatingChartViewModel;
}
export default observer(function ScreenListPanel({
  className,
  viewModel,
}: Props) {
  const nodes = [...viewModel.placeItems];

  return (
    <div className={`${className} p-4 flex flex-col`}>
      <div className="overflow-auto gap-1 flex flex-col text-white/90">
        {nodes.map((node, index) => {
          return (
            <ScreenNodeItem key={index} viewModel={viewModel} title={"aaaaa"} />
          );
        })}
      </div>
    </div>
  );
});

interface NodeProps {
  viewModel: SeatingChartViewModel;
  title: string;
}

const ScreenNodeItem: React.FC<NodeProps> = observer(({ viewModel, title }) => {
  return (
    <div
      onClick={() => {
        //viewModel.addSelection(nodeVm, true);
      }}
      className="flex items-center hover:bg-white/30 bg-white/5 px-1 py-1 rounded-sm "
    >
      <p>{title}</p>
    </div>
  );
});
