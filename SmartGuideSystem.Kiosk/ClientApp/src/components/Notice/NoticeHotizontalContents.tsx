import { ISGNoticeInfo } from "@shares/*";
import React, { useEffect, useState } from "react";
import NoticeContentItem from "./NoticeListContent";

interface Props {
  className?: string;
  content?: ISGNoticeInfo;
  selectedIndex: number;
}

const NoticeHotizontalContents: React.FC<Props> = ({
  className = "h-full w-full",
  content,
}) => {
  return (
    <div className={` w-full ${className} `}>
      <NoticeContentItem
        className="flex-1 overflow-auto "
        content={content!}
        isNoticeHorizontal={true}
      />
    </div>
  );
};
export default NoticeHotizontalContents;
