import { ISGNoticeInfo } from "@shares/*";
import React, { useEffect, useMemo, useState } from "react";
import NoticeListItem from "./NoticeListItem";

interface Props {
  className?: string;
  itemCountPerOnePage: number;
  noticeList?: ISGNoticeInfo[];
  currentPageIndex: number;
  onClick: (selectedNotice: ISGNoticeInfo) => void;
}
const NoticeListView: React.FC<Props> = ({
  className = "w-full",
  noticeList,
  itemCountPerOnePage,
  currentPageIndex,
  onClick,
}) => {
  const [selectedContents, setSelectedContents] = useState<ISGNoticeInfo>();
  const currentPageNoticeList = useMemo(() => {
    if (noticeList) {
      const startIndex = currentPageIndex * itemCountPerOnePage;

      const endIndex = Math.min(
        startIndex + itemCountPerOnePage,
        noticeList?.length
      );

      const noticePerPageList = noticeList.slice(startIndex, endIndex);
      setSelectedContents(noticePerPageList[0]);
      return noticePerPageList;
    } else {
      return [];
    }
  }, [noticeList, currentPageIndex]);
  return (
    <div className={` ${className} flex-col flex w-full  `}>
      <div className="flex h-[92px] items-center text-[24px] w-full border-b border-t border-[#CACACA] font-[600]">
        <span className="flex-1 text-center ">제목</span>
        <span className="w-[180px] text-center ">작성자</span>
        <span className="w-[170px] text-center ">작성일</span>
      </div>
      {currentPageNoticeList?.map((notice, index) => (
        <NoticeListItem
          className="h-[92px] w-full border-b text-[24px] border-[#CACACA]"
          noticeInfo={notice}
          key={index + notice.title}
          isSelected={notice === selectedContents ? true : false}
          onClick={() => {
            setSelectedContents(notice);
            console.log(notice);
            onClick(notice!);
          }}
        />
      ))}

      {/* <HorizontalPageControl
        className="rounded-xl ml-2 mr-4 "
        pageCount={totalPageCount}
        activeIndex={currentPageIndex}
        isVisibleIndicator={true}
        visibleButtonText={false}
        onClickPrev={handelPrev}
        onClickNext={handelNext}
      /> */}
    </div>
  );
};
export default NoticeListView;
