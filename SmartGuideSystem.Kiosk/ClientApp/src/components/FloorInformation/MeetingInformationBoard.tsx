import { ISGMeetingInfo } from "@shares/*";
import React from "react";
import { descTimeOnly } from "src/helpers/dateTime";

interface Props {
  meetingRoomInfo?: ISGMeetingInfo;
  className: string;
  onClick?: () => void;
}

export default function MeetingInformationBoard({
  className,
  meetingRoomInfo,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`${className} py-[10px] flex flex-col  h-full  border-black/20 text-center `}
    >
      <div className="grid grid-cols-3 h-[42px] text-[20px] font-[400] bg-[#def1ff] items-center border-b-[2px] border-[#00599b]">
        <span>시간</span>
        <span>장소</span>
        <span>주최</span>
      </div>
      <div className="grid grid-cols-3 h-[52px] items-center justify-items-center text-[22px]">
        <MeetingDateTimeDesc
          start={descTimeOnly(meetingRoomInfo?.startTime)}
          end={descTimeOnly(meetingRoomInfo?.endTime)}
        />
        <span>{meetingRoomInfo?.meetingRoom}</span>
        <span className="bg-[#00589b] rounded-full px-[16px] py-[3px] text-white text-[18px] font-[200]">
          {meetingRoomInfo?.deptName}
        </span>
      </div>

      <div className="h-[260px] flex flex-col px-[20px] bg-[#f7f7f7] border-t-[2px] border-[#d2d2d2]">
        <p className="text-black text-[28px] font-[700] py-[18px]">
          {meetingRoomInfo?.subject}
        </p>
        <p className="text-[26px] text-black font-[400] h-[215px]  overflow-auto scrollbar">
          {meetingRoomInfo?.contents}
        </p>
      </div>
    </div>
  );
}

export const MeetingDateTimeDesc: React.FC<{
  start?: string;
  end?: string;
}> = ({ start, end }) => {
  return (
    <div>
      <span>{start}</span>
      <span> ~ </span>
      <span>{end}</span>
    </div>
  );
};
