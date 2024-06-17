import { ISGMeetingInfo } from "@shares/*";
import React from "react";
import { withModal4 } from "src/components/ui/modal/withModal";
import { IDialogContextData } from "src/contexts/DialogContext";
import LeftTitlePopupLayout from "src/components/LeftTitlePopupLayout";
import { descTimeOnly } from "src/helpers/dateTime";
interface Props {
  // meetingInfo: IConferenceRoomInfo;
  timeTitle?: string;
  rightTitle: string;
  mainTitle?: string;
  contents?: string;
  status?: string;
  className?: string;
}

const MeetingInfoModal: React.FC<Props> = ({
  timeTitle,
  rightTitle,
  mainTitle,
  contents,
  status,
  className,
}) => {
  return (
    <LeftTitlePopupLayout className="w-[1400px] h-[700px]" title={rightTitle}>
      <div className="w-full h-full">
        <p className="pt-[40px] h-[90px] pl-[30px] border-b-[1px] border-black absolute w-[435px] top-0 right-[177px] text-[#00589b] text-[24px] font-[700]">
          {timeTitle}
        </p>
        <div className="flex h-full flex-col items-center px-[132px] pt-[120px] pb-[60px]">
          <p className="text-[40px] font-[300] w-full text-center">
            {mainTitle}
          </p>
          <div className="w-full flex-1 text-center whitespace-pre-wrap bg-[#f7f7f7] py-[44px] px-[44px] font-[300] text-[23px] border-t-[1px] border-[#111111]">
            {contents}
          </div>
          {/* <span className="text-[18px] font-[700]  text-white text-center px-[42px] py-[7px] bg-[#131834] mt-[22px]">
            dfdsf
          </span> */}
        </div>
      </div>
    </LeftTitlePopupLayout>
  );
};

const MeetingModal = withModal4(MeetingInfoModal);

export default MeetingModal;

export function showMeetingInfoModal(
  dialogCtx: IDialogContextData,
  meetingInfo: ISGMeetingInfo,
  onHome: () => void
) {
  dialogCtx.pushDialog(
    <MeetingModal
      key="showMeetingInfoModal"
      className="bg-black/70 left-0 top-0 pb-0 flex w-screen h-screen items-center justify-center"
      // meetingInfo={meetingInfo}
      timeTitle={`${descTimeOnly(meetingInfo.startTime)} ~ ${descTimeOnly(
        meetingInfo.endTime
      )}`}
      rightTitle="오늘의 회의일정"
      mainTitle={meetingInfo.name}
      contents={meetingInfo.contents}
      onHome={() => {
        dialogCtx.popDialog();
        onHome();
      }}
      onClose={() => {
        dialogCtx.popDialog();
      }}
    />
  );
}
