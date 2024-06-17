import { ISGNoticeInfo } from "@shares/*";
import React from "react";
import { descDate } from "src/helpers/dateTime";

interface Props {
  content: ISGNoticeInfo;
  className?: string;
  isNoticeHorizontal?: boolean;
}

const NoticeListContent: React.FC<Props> = ({
  content,
  className = "rounded-xl",
  isNoticeHorizontal = false,
}) => {
  const htmlCode = content?.content;
  return (
    <div
      className={`w-full h-full bg-white text-black rounded-lg p-6 ${className} scrollbar`}
    >
      <p className="text-[24px] leading-[29px] py-[16px] border-b-2">
        {content?.title}
      </p>
      <p className="text-[20px] leading-[24px] py-[16px]  ">
        게시일자 : {descDate(content?.writeDate)} 담당부서 : {content?.deptName}
      </p>

      {content.imgList?.length !== 0 && (
        <div className="bg-[#f7f7f7] rounded-lg flex-row text-sm pt-3 pb-3 pl-2 pr-2 mt-4 mb-2 ">
          {content.imgList?.map((f, index) => (
            <img
              key={index}
              className="w-[100%] m-auto object-cover "
              src={f.url}
              alt=""
            />
          ))}
          <div className="h-[3px]" />
        </div>
      )}
      <div
        className="bg-[#f7f7f7] p-1  text-[14px] mt-5  whitespace-pre-line pointer-events-none"
        dangerouslySetInnerHTML={{ __html: htmlCode }}
      ></div>
    </div>
  );
};
export default NoticeListContent;
