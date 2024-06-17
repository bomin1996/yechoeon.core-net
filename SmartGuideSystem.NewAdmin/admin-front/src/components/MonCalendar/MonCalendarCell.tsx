// import React from "react";
import { IDateInfo } from "./MonCalendarUtils";
import { IMonCalenderEvent } from "./MonCalender";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface CellProps {
  cellDate: IDateInfo;
  inMonthDay: boolean;
  dayIndex: number;
  items: Array<IMonCalenderEvent>;
  className: string;
  onClick: (ev: IMonCalenderEvent) => void;
  maxItemViewCount?: number;
  onClickMore?: (items: Array<IMonCalenderEvent>) => void;
}

export default function CCell({
  cellDate,
  inMonthDay,
  dayIndex,
  items,
  className,
  onClick,
  maxItemViewCount = 4,
  onClickMore,
}: CellProps) {
  let now = new Date();
  const isToday: boolean =
    cellDate.date.toLocaleDateString() === now.toLocaleDateString();

  let dayColor = "text-black/90";

  let bg = "bg-white";

  if (!inMonthDay) {
    bg = "bg-gray-100";
    dayColor = "text-black/60";
    switch (dayIndex) {
      case 0:
        dayColor = "text-red-500/50";
        break;
      case 6:
        dayColor = "text-blue-600/50";
        break;
    }
  } else {
    switch (dayIndex) {
      case 0:
        dayColor = "text-red-500";
        break;
      case 6:
        dayColor = "text-blue-600";
        break;
    }
  }

  if (isToday) {
    bg = "bg-yellow-200";
  }

  const copyItems = items ? [...items] : [];
  const sortedItems = copyItems?.sort(
    (a, b) => a.time.getTime() - b.time.getTime()
  );

  let moreCount = 0;
  if (sortedItems?.length > maxItemViewCount) {
    const startIdx = maxItemViewCount - 1;
    const deleteCount = sortedItems.length - maxItemViewCount;
    sortedItems?.splice(startIdx, deleteCount);
    moreCount = deleteCount;
  }

  return (
    <div
      className={` ${bg} border relative pl-[4px] pr-[4px] pt-[34px] pb-[8px] cursor-pointer ${className} `}
    >
      <div
        className={`absolute ${dayColor} right-[8px] top-[4px] font-bold text-[16px]`}
      >
        {cellDate.desc}
      </div>
      {moreCount > 0 && (
        <span
          onClick={() => {
            onClickMore?.(items);
          }}
          className="absolute left-[32px] top-[4px] px-2 py-1 bg-red-500 text-xs rounded-full hover:bg-red-500/80"
        >
          +{moreCount}
        </span>
      )}

      {sortedItems.length > 0 && (
        <InformationCircleIcon
          className="absolute left-[8px] top-[6px] w-5 h-5 text-gray-700 hover:text-gray-700/50"
          onClick={() => {
            onClickMore?.(items);
          }}
        />
      )}
      <div className="flex flex-col items-start space-y-[2px] overflow-y-auto scrollbar ">
        {sortedItems?.map((ev, index) => (
          <span
            key={index}
            className="bg-blue-600 truncate hover:bg-blue-600/80 text-[11px] py-1 px-1 text-left leading-none w-full text-white rounded-sm  "
            onClick={() => {
              onClick(ev);
            }}
          >
            {ev.title}
          </span>
        ))}
      </div>
    </div>
  );
}
