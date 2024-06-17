import {
  IConferenceRoomInfo,
  IConferenceScheduleInfo,
  ISGMeetingInfo,
} from "@shares/*";
import React from "react";
import { descTimeOnly } from "src/helpers/dateTime";

interface Props {
  meetingInfos: Array<ISGMeetingInfo>;
  selectedRoomIndex: number;
  className?: string;
  clickMeetingRoomInfo: (meetingRoomInfo: ISGMeetingInfo) => void;
}

export default function MeetingScheduleBoard({
  className,
  selectedRoomIndex,
  meetingInfos,
  clickMeetingRoomInfo,
}: Props) {
  const gridStyle = " grid grid-cols-9  items-center text-center  ";

  return (
    <div
      className={`h-full flex flex-col ${className} border-[#d2d2d2] border-t-[2px] border-b-[1px] relative`}>
      <div
        className={`${gridStyle} h-[42px] text-[20px] text-black font-[400] bg-[#f7f7f7] `}>
        <p className="col-span-1">시간</p>
        <p className="col-span-4">행사명</p>
        <p className="col-span-2 ">장소</p>
        <p className="col-span-2">주최</p>
      </div>

      <div className="overflow-y-auto flex-1 scrollbar divide-y divide-[#d2d2d2]">
        {meetingInfos.map((m, index) => (
          <MeetingScheduleBoardItem
            key={index}
            clickMeetingRoomInfo={clickMeetingRoomInfo}
            onClick={() => clickMeetingRoomInfo(m)}
            meetingInfo={m}
            className={` ${gridStyle}`}
            isSelected={index === selectedRoomIndex}
          />
        ))}
      </div>
    </div>
  );
}

interface Props2 {
  meetingInfo: ISGMeetingInfo;
  className: string;
  isSelected: boolean;
  clickMeetingRoomInfo: (selectedItem: ISGMeetingInfo) => void;
  onClick?: () => void;
}

const MeetingScheduleBoardItem: React.FC<Props2> = ({
  meetingInfo,
  className,
  isSelected,
  onClick,
}) => {
  const classText = isSelected
    ? `text-[#00589b] font-[600]`
    : "text-[#2f2f2f] font-[400]";

  return (
    <div
      className={`${className} ${classText} text-[18px] h-[38px] `}
      onClick={onClick}
    >
      {/* <p className="col-span-1">{meetingRoomInfo.startTime}</p>
      <p className="col-span-4 truncate ">{meetingRoomInfo.subject}</p>
      <p className="col-span-2">{meetingRoomInfo.name}</p>
      <p className="col-span-2">{meetingRoomInfo.deptName}</p> */}
      <p className="col-span-1">{descTimeOnly(meetingInfo.startTime)}</p>
      <p className="col-span-4 truncate ">{meetingInfo.subject}</p>
      <p className="col-span-2 truncate ">{meetingInfo.meetingRoom}</p>
      <p className="col-span-2 truncate ">{meetingInfo.deptName}</p>
    </div>
  );
};
