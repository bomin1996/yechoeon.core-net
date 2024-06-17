import React from "react";
import { ISGGosigonggo } from "@shares/ISGGosigonggo";

interface Props {
  gosiInfo: ISGGosigonggo;
  className?: string;
  onClickFile?: (fileName: string, index: number) => void;
  onClick: () => void;
}

const GosiListItem: React.FC<Props> = ({
  gosiInfo,
  className = "",
  onClickFile,
  onClick,
}: Props) => {
  return (
    <div
      onClick={onClick}
      className={` flex flex-col px-[10px] justify-center border-b-[1px] border-[#171c31] ${className} h-[124px] active:bg-button-default/10 `}
    >
      <p className="text-black active:text-[#607fbd] text-[24px] font-[500] leading-[29px] ">
        {gosiInfo.title}
      </p>
      <p className="text-[#7c7c7c] text-[19px] font-[200] leading-[23px]">
        <span>고시번호 : </span>
        <span>{gosiInfo.gosibunho}</span>
        <span>게시일자 : </span>
        <span>{gosiInfo.postDate}</span>
        <span>공고기간 : </span>
        <span>{gosiInfo.startPeriod}</span>
        <span>~</span>
        <span>{gosiInfo.endPeriod}</span>
        <span>담당부서: </span>
        <span>{gosiInfo.deptName}</span>
      </p>
    </div>
  );
};

export default GosiListItem;
