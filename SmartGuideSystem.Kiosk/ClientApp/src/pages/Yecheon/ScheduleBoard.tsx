import React, { useContext, useRef, useState } from "react";
import { descDate, descDate2, descTimeOnly } from "src/helpers/dateTime";
import { IYCSchedule } from "@shares/YC/IYCSchedule";
import { twMerge } from "tailwind-merge";
import { useIdleCheckerFireEvent2 } from "src/hooks/useIdleCheckerFireEvent2";
import KioskContext from "src/contexts/KioskContext";

interface Props {
  scheduls?: Array<IYCSchedule>;
  selectedRoomIndex: number;
  className?: string;
}

export default function ScheduleBoard({
  className,
  selectedRoomIndex,
  scheduls,
}: Props) {
  const scrollViewRef = useRef<HTMLDivElement>(null);
  let index = 0;
  const count = 8;
  const kioskCtx = useContext(KioskContext);
  const intervalTimeMS = kioskCtx?.deviceInfo?.extraSettings?.refreshMS ?? 5000;

  useIdleCheckerFireEvent2(intervalTimeMS, () => {
    const ln = scheduls?.length ?? 0;
    index = index + count;

    if (index >= ln) {
      index = 0;
    }
    const lastChildElement = scrollViewRef.current?.children[index];
    lastChildElement?.scrollIntoView({ behavior: "smooth" });
  });

  const gridStyle = " grid grid-cols-5  items-center text-center  ";

  return (
    <div
      className={twMerge(
        "h-full flex flex-col  border-[#d2d2d2] border-t-[2px] border-b-[1px] relative",
        className
      )}>
      <div
        className={`grid grid-cols-5  items-center text-center h-[30px] w-full text-[15px] text-black font-[400] bg-[#DEF1FF] `}>
        <p className="col-span-1 ">일시</p>
        <p className="col-span-2 ">내용</p>
        <p className="col-span-2 ">비고</p>
      </div>

      <div
        className="overflow-y-auto flex-1 scrollbar divide-y divide-[#d2d2d2]"
        ref={scrollViewRef}>
        {scheduls?.map((m, index) => (
          <ScheduleBoardItem
            key={index}
            schedules={m}
            className={` grid grid-cols-5  items-center text-center`}
            isSelected={false}
          />
        ))}
      </div>
    </div>
  );
}

interface Props2 {
  schedules: IYCSchedule;
  className: string;
  isSelected: boolean;
  onClick?: () => void;
}
const ScheduleBoardItem: React.FC<Props2> = ({
  schedules,
  className,
  isSelected,
  onClick,
}) => {
  const classText = isSelected
    ? `text-[#00589b] font-[600]`
    : "text-[#2f2f2f] font-[400]";

  return (
    <div
      className={`${className} ${classText} text-[16px] h-[53px] `}
      onClick={onClick}>
      <p className="col-span-1 truncate ">
        {descDate2(schedules.scheduleDate)}
      </p>
      <p className="col-span-2 truncate ">{schedules.contents}</p>
      <p className="col-span-2 truncate ">{schedules.desc}</p>
    </div>
  );
};
