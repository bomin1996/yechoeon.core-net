import React, { useContext, useState } from "react";
import { IConferenceRoomInfo, ISGMeetingInfo } from "@shares/*";

import BannerImageSlider from "src/components/ui/imgaeSlider/BannerImageSlider";
import MeetingInformationBoard from "src/components/FloorInformation/MeetingInformationBoard";
import MeetingScheduleBoard from "src/components/FloorInformation/MeetingScheduleBoard";
import { useNavigate } from "react-router-dom";
import WeatherPanel from "src/components/WeatherPanel";
import KioskContext from "src/contexts/KioskContext";
import DialogContext from "src/contexts/DialogContext";
import { showMeetingInfoModal } from "src/components/FloorInformation/modal/MeetingInfoModal";
import IconHeaderTitleLabel from "src/components/FloorInformation/IconHeaderTitleLabel";
import AdministrationFloorInfoBoard from "src/components/FloorInformation/AdministrationFloorInfoBoard";
import AssemblyFloorInfoBoard from "src/components/FloorInformation/AssemblyFloorInfoBoard";
import RightTitleLayout from "src/components/RightTitleLayout";
import { showMultipleMeetingInfoModal } from "src/components/FloorInformation/modal/MultipleMeetingInfoModal";

export default function FloorInformationHome() {
  const navigate = useNavigate();
  const kioskCtx = useContext(KioskContext);
  const dialogCtx = useContext(DialogContext);
  const bannerImageInfo = kioskCtx?.bannerImageInfo;
  const mainbannerInterval = bannerImageInfo?.mainBannerIntervalSec
    ? bannerImageInfo?.mainBannerIntervalSec * 1000
    : 1000;
  const subbannerInterval = bannerImageInfo?.subBannerIntervalSec
    ? bannerImageInfo?.subBannerIntervalSec * 1000
    : 1000;

  const mainUrls: string[] | undefined = bannerImageInfo?.mainBannerList
    ?.map((item) => (item.imgUrl ? item.imgUrl : ""))
    .filter((item) => item !== "");

  const subUrls: string[] | undefined = bannerImageInfo?.subBannerList
    ?.map((item) => (item.mainImgUrl ? item.mainImgUrl : ""))
    .filter((item) => item !== "");

  const meetingInfo = kioskCtx?.conferenceScheduleInfo;

  const [selectedMeetingInfo, setSelectedMeetingInfo] =
    useState<ISGMeetingInfo>();

  // const meetingInfo = {
  //   conferenceRooms: [
  //     {
  //       name: "제목 회의 제목",
  //       startTime: "13:00",
  //       meetingDate: "2023-05-05",
  //       endTime: "15:00",
  //       deptName: "테스트부서",
  //       subject: "회의부제목",
  //       contents: "회의내용내용내요내용ㅇ",
  //       status: "예약",
  //     },
  //     {
  //       name: "제목 회의 제목2",
  //       startTime: "14:00",
  //       meetingDate: "2023-05-05",
  //       endTime: "17:00",
  //       deptName: "테스트부서2",
  //       subject: "회의부제목2",
  //       contents: "회의내용내ㄴㅇㄻㄴㅇㄹ용내요내용ㅇ",
  //       status: "예약",
  //     },
  //   ],
  // };
  const meetingRoom =
    meetingInfo?.conferenceRooms !== undefined
      ? meetingInfo?.conferenceRooms[0]
      : undefined;

  const mi = kioskCtx?.meetingInfo ?? [];
  const [selectedMeetingInfoIndex, setSelectedMeetingInfoIndex] = useState(
    mi.length > 0 ? 0 : -1
  );

  // const handleClickMeetingRoomInfo = (meetingRoomInfo: IConferenceRoomInfo) => {
  //   showMeetingInfoModal(dialogCtx!, meetingRoomInfo, () => {
  //     dialogCtx?.popAllDialogs();
  //   });
  // };
  const handleClickMeetingRoomInfo = (meetingRoomInfo: ISGMeetingInfo) => {
    setSelectedMeetingInfo(meetingRoomInfo);
    // showMeetingInfoModal(dialogCtx!, meetingRoomInfo, () => {
    //   dialogCtx?.popAllDialogs();
    // });
    const index = mi.findIndex((m) => m.id === meetingRoomInfo.id);
    setSelectedMeetingInfoIndex(index);
    showMultipleMeetingInfoModal(dialogCtx!, "오늘의 회의일정", mi, index);
  };

  const handleSliderImageClick = (urls: string) => {
    console.log(urls);

    const clickedImage = bannerImageInfo?.subBannerList?.find(
      (item) => item.mainImgUrl === urls
    );

    console.log(clickedImage);

    const boardVo = clickedImage?.boardVO;
    if (boardVo !== null && boardVo?.deptName !== "") {
      const naviUrl = "/notice_list/" + boardVo?.idx;
      navigate(naviUrl);
    } else {
      const naviUrl = "/notice_list/";
      navigate(naviUrl);
    }
  };

  return (
    <div className="w-full h-full pt-[20px] pr-[70px] pb-[120px]">
      <RightTitleLayout
        className="w-full h-full"
        title={"종합안내 information"}>
        <div className="flex w-full h-full px-[37px] py-[27px] space-x-[28px]">
          <div className="flex-shrink-0 flex flex-col w-[640px]">
            <IconHeaderTitleLabel title="행정동" icon="행정동" />
            <AdministrationFloorInfoBoard className="w-full mt-[16px] mb-[16px]" />
            <IconHeaderTitleLabel title="의회동" icon="의회동" />
            <AssemblyFloorInfoBoard className="w-full mt-[12px]" />
          </div>
          <div className="grid grid-cols-2 w-[600px] gap-[16px]">
            <IconHeaderTitleLabel title="진주소식" icon="진주소식" />
            <BannerImageSlider
              imageUrls={mainUrls!}
              duration={mainbannerInterval}
              onClick={handleSliderImageClick}
              width={545}
              height={550}
              className="col-span-2  bg-[#FFF0F3]  h-[550px]"
              useLink={false}
            />
            <BannerImageSlider
              imageUrls={subUrls!}
              width={266}
              onClick={handleSliderImageClick}
              duration={subbannerInterval}
              height={266}
              className="col-span-1   bg-[#FFF0F3] h-[266px]"
              useLink={true}
            />
            <WeatherPanel className="col-span-1 border border-[#dfdfdf] h-[266px]" />
          </div>
          <div className="flex flex-col w-[562px] pt-[149px]">
            <IconHeaderTitleLabel title="오늘의 회의일정" icon="회의일정" />
            <MeetingInformationBoard
              onClick={() => {
                if (selectedMeetingInfo) {
                  handleClickMeetingRoomInfo(selectedMeetingInfo);
                }
              }}
              // meetingRoomInfo={selectedMeetingInfo}
              meetingRoomInfo={mi[selectedMeetingInfoIndex]}
              className=""
            />
            <MeetingScheduleBoard
              selectedRoomIndex={selectedMeetingInfoIndex}
              clickMeetingRoomInfo={handleClickMeetingRoomInfo}
              // meetingScheduleInfo={meetingInfo}
              // meetingScheduleInfo={mi}
              meetingInfos={mi}
              className=""
            />
          </div>
        </div>
      </RightTitleLayout>
    </div>
  );
}
