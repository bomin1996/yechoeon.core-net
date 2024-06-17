import React, { useContext, useState } from "react";
import LeftTitleLayout from "src/components/LeftTitleLayout";
import RightMeetingList from "./RightMeetingList";
import KioskContext from "src/contexts/KioskContext";
import { descTimeOnly } from "src/helpers/dateTime";

export default function MeetingInformationHome() {
  const kioskCtx = useContext(KioskContext);
  const mi = kioskCtx?.meetingInfo ?? [];

  const meetingRoomName =
    kioskCtx?.deviceInfo?.extraSettings?.meetingRoomInfoOption
      ?.meetingRoomName ?? "회의실";

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedInfo = mi[selectedIndex];

  const timeDesc = selectedInfo
    ? `[ ${descTimeOnly(selectedInfo?.startTime)} - ${descTimeOnly(
        selectedInfo?.endTime
      )} ]`
    : "";

  return (
    <div className="w-full h-full pt-[20px] pl-[70px] pb-[120px] relative">
      <LeftTitleLayout
        title="회의 진행중"
        className="w-full h-full flex pt-[152px] "
      >
        <div className="absolute top-[52px] right-[270px] flex text-[43px] border-b-[1px] border-[#cacaca] py-[8px] px-[50px]">
          <span className="font-[600] mr-[67px]">장소</span>
          <span className="font=[200]">{meetingRoomName}</span>
        </div>

        <div className=" w-[364px] h-full ">
          <p className="py-[20px] w-full text-center text-[48px] font-[500] border-b-[1px] border-[#344C58] mb-[20px]">
            {selectedInfo?.deptName}
          </p>
          <p className="text-center w-full text-[27px] text-[#00589B] font-[700]">
            {timeDesc}
          </p>
        </div>
        <div className="bg-[#f7f7f7] rounded-tl-[100px] w-[1233px] h-full text-[#171C31] pr-[20px]">
          <div className="w-full h-full rounded-tl-[100px]  px-[140px] py-[120px]   scrollbar  overflow-auto flex flex-col items-center ">
            <span className="text-center text-[60px] font-bold text-[#00589B]  border-b-[2px] border-[#171C31]">
              {selectedInfo?.subject}
            </span>
            <div className="font-normal text-[40px] whitespace-pre-wrap mt-[48px]">
              {selectedInfo?.contents}
            </div>
          </div>
        </div>
      </LeftTitleLayout>

      <RightMeetingList
        className="absolute h-full w-[364px] right-0 bottom-0 z-50 "
        meetingInfos={mi}
        selectedIndex={selectedIndex}
        onClickItem={(index, item) => setSelectedIndex(index)}
      />
    </div>
  );
}
