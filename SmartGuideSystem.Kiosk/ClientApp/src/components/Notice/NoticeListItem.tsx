import { ISGNoticeInfo } from "@shares/*";
import React, { useState } from "react";
import { descDate } from "src/helpers/dateTime";

interface Props {
  noticeInfo: ISGNoticeInfo;
  onClick: () => void;
  className?: string;
  isSelected: boolean;
}

const NoticeListItem: React.FC<Props> = ({
  noticeInfo,
  onClick,
  isSelected,
  className = "",
}) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className={`${className} h-[92px] flex items-center ${
        isSelected
          ? "text-[#607FBD] font-[600] bg-[#607FBD]/10"
          : "text-black font-[400]"
      }`}>
      <span className="flex-1 px-[16px] py-[20px] text-ellipsis overflow-hidden">
        {noticeInfo.title}
      </span>
      <span className="w-[180px] text-center ">{noticeInfo.deptName}</span>
      <span className="w-[170px] text-center ">
        {descDate(noticeInfo.writeDate)}
      </span>
    </div>
  );
};

export default NoticeListItem;
