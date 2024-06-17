import React, { FC, useState } from "react";
import { ISGSeatPosChart } from "@shares/ISGDepartment";
import SeatPosChartSearchResultItem from "./SeatPosChartSearchResultItem";

interface Props {
  charts: Array<ISGSeatPosChart>;
  className?: string;
  onClickInfo: (chart: ISGSeatPosChart) => void;
  onClickChart: (chart: ISGSeatPosChart) => void;
  onClickFloorMap: (chart: ISGSeatPosChart) => void;
  onClickGetDirections: (chart: ISGSeatPosChart) => void;
}

const SeatPosChartResultList: React.FC<Props> = ({
  charts,
  onClickInfo,
  onClickChart,
  onClickFloorMap,
  onClickGetDirections,
  className,
}) => {
  return (
    <div className={`${className} overflow-auto  scrollbar`}>
      {charts && charts.length > 0 && (
        <div className="grid grid-cols-2 gap-x-[17px] gap-y-[17px]">
          {charts.map((chart) => (
            <SeatPosChartSearchResultItem
              chart={chart}
              key={chart.name}
              className="w-[512px] h-[148px]"
              onClick={() => onClickInfo(chart)}
              onClickLocationMap={onClickFloorMap}
              onClickChart={onClickChart}
              onClickGetDirections={onClickGetDirections}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeatPosChartResultList;
