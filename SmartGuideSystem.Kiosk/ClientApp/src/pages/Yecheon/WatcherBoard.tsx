import React, { useContext, useRef, useState } from "react";
import { IYCWatcher } from "@shares/YC/IYCWatcher";
import { twMerge } from "tailwind-merge";
import { useIdleCheckerFireEvent2 } from "src/hooks/useIdleCheckerFireEvent2";
import KioskContext from "src/contexts/KioskContext";

interface Props {
  watcherInfos?: Array<IYCWatcher>;
  selectedRoomIndex: number;
  className?: string;
}

export default function WatcherBoard({
  className,
  selectedRoomIndex,
  watcherInfos,
}: Props) {
  const scrollViewRef = useRef<HTMLDivElement>(null);
  let index = 0;
  const count = 2;
  const kioskCtx = useContext(KioskContext);
  const intervalTimeMS = kioskCtx?.deviceInfo?.extraSettings?.refreshMS ?? 5000;
  useIdleCheckerFireEvent2(intervalTimeMS, () => {
    const ln = watcherInfos?.length ?? 0;
    index = index + count;
    if (index >= ln) {
      index = 0;
    }
    const lastChildElement = scrollViewRef.current?.children[index];
    lastChildElement?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div
      className={`h-full flex flex-col ${className} border-[#d2d2d2] border-t-[2px] border-b-[1px] relative `}>
      <div
        className={`grid grid-cols-3  items-center text-center h-[30px] text-[15px] text-black font-[400] bg-[#FFEFF2] `}>
        <p className="col-span-1">장소</p>
        <p className="col-span-1">성명</p>
        <p className="col-span-1 ">구분</p>
      </div>

      <div
        className="overflow-y-auto flex-1 scrollbar divide-y divide-[#d2d2d2]"
        ref={scrollViewRef}>
        {watcherInfos?.map((m, index) => (
          <ScheduleBoardItem
            key={index}
            watcherInfo={m}
            className={`grid grid-cols-3  items-center text-center`}
            isSelected={false}
          />
        ))}
      </div>
    </div>
  );
}

interface Props2 {
  watcherInfo: IYCWatcher;
  className: string;
  isSelected: boolean;
  onClick?: () => void;
}
const ScheduleBoardItem: React.FC<Props2> = ({
  watcherInfo: meetingInfo,
  className,
  isSelected,
  onClick,
}) => {
  const classText = isSelected
    ? `text-[#00589b] font-[600]`
    : "text-[#2f2f2f] font-[400]";

  return (
    <div
      className={twMerge("text-[16px] h-[50px] ", classText, className)}
      onClick={onClick}>
      <p className="col-span-1">{meetingInfo.location}</p>
      <p className="col-span-1 truncate ">{meetingInfo.watcherName}</p>
      <p className="col-span-1 truncate ">{meetingInfo.division}</p>
    </div>
  );
};
