import { ISGMeetingInfo } from "@shares/*";
import React, { useState } from "react";
import { withModal4 } from "src/components/ui/modal/withModal";
import { IDialogContextData } from "src/contexts/DialogContext";
import LeftTitlePopupLayout from "src/components/LeftTitlePopupLayout";
import { descTimeOnly } from "src/helpers/dateTime";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { HorizontalPageControl } from "src/components/ui/HorizontalPageNavigator";
import RightTitlePopupLayout from "src/components/RightTitlePopupLayout";

interface Props {
  // meetingInfo: IConferenceRoomInfo;
  // timeTitle?: string;
  rightTitle: string;
  // mainTitle?: string;
  // contents?: string;
  // status?: string;
  meetingInfos: Array<ISGMeetingInfo>;
  selectedIndex?: number;
  className?: string;
}

const ContentModal: React.FC<Props> = ({
  // timeTitle,
  rightTitle,
  // mainTitle,
  // contents,
  // status,
  meetingInfos,
  selectedIndex = 0,
  className,
}) => {
  let totalPageCount = meetingInfos.length;

  const [currentPageIndex, setCurrentPageIndex] = useState(selectedIndex);
  const handelPrev = (index: number) => {
    const i = Math.max(0, index);
    setCurrentPageIndex(i);
  };

  const handelNext = (index: number) => {
    const i = Math.min(totalPageCount, index);
    setCurrentPageIndex(i);
  };

  const current = meetingInfos[currentPageIndex];

  const timeTitle = `${descTimeOnly(current.startTime)} ~ ${descTimeOnly(
    current.endTime
  )}`;
  const mainTitle = current.name;
  const contents = current.contents;

  const canPrev = currentPageIndex > 0;
  const canNext = currentPageIndex < totalPageCount - 1;

  return (
    <RightTitlePopupLayout
      className="w-[1400px] h-[700px]"
      title={rightTitle}
      modalStyle="MeetingInfo"
      visibleLogo={false}
    >
      <div className="w-full h-full ">
        <p className="pt-[40px] h-[90px] pl-[30px] border-b-[1px] border-black absolute w-[435px] top-0 right-[177px] text-[#00589b] text-[24px] font-[700]">
          {timeTitle}
        </p>
        <div className="flex h-full flex-col items-center px-[132px] pt-[120px] pb-[60px]">
          <p className="text-[52px] font-[300] w-full text-center">
            {mainTitle}
          </p>
          <div className="overflow-auto scrollbar text-center w-full flex-1 whitespace-pre-wrap bg-[#f7f7f7] mb-[100px] py-[44px] px-[44px] font-[400] text-[32px] border-t-[1px] border-[#111111]">
            {contents}
          </div>
          {/* <span className="text-[18px] font-[700]  text-white text-center px-[42px] py-[7px] bg-[#131834] mt-[22px]">
            dfdsf
          </span> */}
        </div>

        <HorizontalPageControl
          pageCount={totalPageCount}
          activeIndex={currentPageIndex}
          className="absolute bottom-[60px] left-[50%] translate-x-[-50%] h-8 "
          isVisibleIndicator={true}
          visibleButtonText={false}
          visibleButton={false}
          onClickPrev={handelPrev}
          onClickNext={handelNext}
        />

        <ChevronLeftIcon
          className={` bg-black/0 h-20 w-20 p-3 absolute left-0 top-[50%] translate-y-[-50%] ${
            canPrev ? "stroke-[#131834] active:scale-95" : "stroke-[#D9D9D9]"
          }`}
          onClick={() => {
            handelPrev(Math.max(currentPageIndex - 1, 0));
          }}
        />

        <ChevronRightIcon
          className={`stroke-[#131834] bg-black/0 h-20 w-20 p-3 absolute right-0 top-[50%] translate-y-[-50%] ${
            canNext ? "stroke-[#131834] active:scale-95" : "stroke-[#D9D9D9]"
          }`}
          onClick={() => {
            handelNext(Math.min(currentPageIndex + 1, totalPageCount - 1));
          }}
        />
      </div>
    </RightTitlePopupLayout>
  );
};

const MultipleMeetingInfoModal = withModal4(ContentModal);

export default MultipleMeetingInfoModal;

export function showMultipleMeetingInfoModal(
  dialogCtx: IDialogContextData,
  title: string,
  meetingInfos: Array<ISGMeetingInfo>,
  selectedIndex?: number

  // onHome: () => void
) {
  dialogCtx.pushDialog(
    <MultipleMeetingInfoModal
      key="showMeetingInfoModal"
      className="bg-black/70 left-0 top-0 pb-0 flex w-screen h-screen items-center justify-center"
      // meetingInfo={meetingInfo}
      // timeTitle={`${descTimeOnly(meetingInfo.startTime)} ~ ${descTimeOnly(
      //   meetingInfo.endTime
      // )}`}
      meetingInfos={meetingInfos}
      selectedIndex={selectedIndex}
      rightTitle={title}
      // mainTitle={meetingInfo.name}
      // contents={meetingInfo.contents}
      // onHome={() => {
      //   dialogCtx.popDialog();
      //   onHome();
      // }}
      onClose={() => {
        dialogCtx.popDialog();
      }}
    />
  );
}
