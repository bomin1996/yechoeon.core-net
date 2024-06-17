import { ISGMeetingInfo } from "@shares/*";
import React from "react";
import { descTimeOnly } from "src/helpers/dateTime";

interface Props {
  meetingInfos: Array<ISGMeetingInfo>;
  selectedIndex: number;
  className?: string;
  onClickItem?: (index: number, info: ISGMeetingInfo) => void;
}

const dummyList = [
  {
    time: "09:00",
    place: "제1회의실",
  },
  {
    time: "09:00",
    place: "제1회의실",
  },
  {
    time: "09:00",
    place: "제1회의실",
  },
  {
    time: "09:00",
    place: "제1회의실",
  },
  {
    time: "09:00",
    place: "제1회의실",
  },
  {
    time: "09:00",
    place: "제1회의실",
  },
  {
    time: "09:00",
    place: "제1회의실",
  },
];

export default function RightMeetingList({
  className,
  meetingInfos,
  selectedIndex,
  onClickItem,
}: Props) {
  return (
    <div
      className={`${className}  bg-right bg-no-repeat bg-contain bg-[url('assets/frame/conference-main/right_back.png')]`}
    >
      <div className="w-[271px] text-white text-center items-center flex flex-col ml-auto ">
        <div className="text-[43px] font-[600] py-[47px] border-b-[10px] border-white mb-[47px] mt-[146px]">
          <span>
            오늘의
            <br />
            회의일정
          </span>
        </div>
        {meetingInfos?.map((it, index) => (
          <p
            className={`text-[24px] mt-[26px] px-[24px]  w-full text-left ${
              index === selectedIndex ? "font-[700] underline" : ""
            }`}
            key={index}
            onClick={() => {
              onClickItem?.(index, it);
            }}
          >
            {descTimeOnly(it.startTime)} - {it.deptName}
          </p>
        ))}
      </div>
    </div>
  );
}
