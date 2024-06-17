import React, { useContext, useEffect, useMemo, useState } from "react";
import image인사말 from "src/assets/icon/city-council/ico_chair1 1.svg";
import image프로필 from "src/assets/icon/city-council/ico_chair2 1.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import WeeklyScheduleNavigator, {
  oneDayTimes,
  oneWeekTimes,
} from "src/components/CityCouncil/WeeklyScheduleNavigator";
import { descDate, descMonthDayOnly } from "src/helpers/dateTime";
// import dummyGreeting from "src/assets/dummy/Group 14.png";
import dummyGreeting from "src/assets/placeholder.webp";

import KioskContext from "src/contexts/KioskContext";
import { showMeetingInfoModal } from "src/components/FloorInformation/modal/MeetingInfoModal";
import DialogContext from "src/contexts/DialogContext";
import { showMultipleMeetingInfoModal } from "src/components/FloorInformation/modal/MultipleMeetingInfoModal";
import { ISGMeetingInfo } from "../../../../../shares/ISGMeetingInfo";
import { motion } from "framer-motion";

interface Props {
  className?: string;
  onClickGreeting?: () => void;
  onClickProfile?: () => void;
}

export default function RightSchedulePanel({
  className,
  onClickGreeting,
  onClickProfile,
}: Props) {
  const kioskInfo = useContext(KioskContext);
  const meetingInfo = kioskInfo?.meetingInfo ?? [];
  const chairManPhotoUrl =
    kioskInfo?.councilConfig?.profileImageUrl ?? dummyGreeting;
  console.log(meetingInfo);

  const dialogCtx = useContext(DialogContext);

  const [startDate, setStartDate] = useState<Date>(() => {
    //return new Date();
    const today = new Date();
    const startDateInWeek = new Date(
      today.getTime() - today.getDay() * oneDayTimes
    );
    startDateInWeek.setHours(0, 0);
    return startDateInWeek;
  });

  const todayDesc = descDate(new Date());
  const todayDescMonthDayOnly = descMonthDayOnly(new Date());

  const now = new Date();
  const { minDate, maxDate } = useMemo(() => {
    const current = new Date();
    current.setHours(0, 0);
    const oneWeekBefore = new Date(current.getTime() - oneWeekTimes);
    const minDate = new Date(
      oneWeekBefore.getTime() - oneWeekBefore.getDay() * oneDayTimes
    );
    const maxDate = new Date(minDate.getTime() + 3 * oneWeekTimes);
    maxDate.setHours(23, 59);
    return { minDate, maxDate };
  }, [now.getDate()]);

  // const handleClickGreeting = () => {};

  // const handleClickProfile = () => {};

  const todayMeetingInfos = useMemo(() => {
    return meetingInfo.filter((mmm) => {
      const startTime = new Date(mmm.startTime);
      const todayDate = new Date().getDate();
      const meetingDate = startTime.getDate();
      return todayDate === meetingDate;
    });
  }, [meetingInfo]);

  // const todayMeetingInfos = meetingInfo.filter((mmm) => {
  //   const startTime = new Date(mmm.startTime);
  //   const todayDate = new Date().getDate();
  //   const meetingDate = startTime.getDate();
  //   return todayDate === meetingDate;
  // });

  return (
    <div className={`${className} w-full h-full rounded-l-[30px] bg-[#484848]`}>
      <div className="bg-[#A98E49] rounded-l-[30px] h-[500px] relative">
        <img
          className="absolute bottom-0 right-0 h-[438px] object-cover w-[604px]"
          src={chairManPhotoUrl}
          alt=""
        />
        <div className="absolute left-[40px] bottom-[80px] flex space-x-[10px] font-[200] text-[16px] text-white">
          <div>
            <div
              onClick={onClickGreeting}
              className="p-[0px] h-[120px] w-[120px] bg-white flex rounded-full active:bg-white/90"
            >
              <img width={35} src={image인사말} className="m-auto" />
            </div>
            <p className="w-full text-center mt-[10px]">인사말</p>
          </div>

          <div>
            <div
              onClick={onClickProfile}
              className="p-[0px] h-[120px] w-[120px] bg-white flex rounded-full active:bg-white/90"
            >
              <img width={48} src={image프로필} className="m-auto" />
            </div>
            <p className="w-full text-center mt-[10px]">프로필</p>
          </div>
        </div>
      </div>
      <div className=" text-white px-[20px] py-[40px]">
        <p className="font-[500] text-[33px]">오늘의 의사일정</p>
        <div className="font-[600] text-[33px] mt-[28px] flex items-center space-x-2 ">
          <span className="border border-white text-[16px] font-[200] flex-shrink-0">
            오늘
          </span>
          <span className=" flex-shrink-0">{todayDesc}</span>
          <WeeklyScheduleNavigator
            className=""
            startDate={startDate}
            meetingInfos={meetingInfo}
            onPrevClick={() => {
              setStartDate((prev) => {
                const startTime = new Date(prev.getTime() - oneDayTimes);
                return startTime > minDate ? startTime : minDate;
              });
            }}
            onNextClick={() => {
              setStartDate((prev) => {
                const maxStart = new Date(maxDate.getTime() - oneWeekTimes);
                maxStart.setHours(0, 0);
                const startTime = new Date(prev.getTime() + oneDayTimes);
                return startTime < maxStart ? startTime : maxStart;
              });
            }}
            onClickInfo={(meetings, date) => {
              // showMeetingInfoModal(dialogCtx!, meetings![0], () => {});
              if (meetings && meetings.length > 0) {
                showMultipleMeetingInfoModal(
                  dialogCtx!,
                  `${todayDescMonthDayOnly} 의사일정`,
                  meetings
                );
              }
            }}
          />
        </div>

        {/* <p className="mt-[32px] font-[300] text-[20px]">
          제245회 임시회 폐회중 제2차 의회운영위원회 활동
        </p> */}
        {/* {todayMeetingInfos.map((tmi) => (
          <p>{tmi.name}</p>
        ))} */}

        <MeetingNameBanner meetingInfo={todayMeetingInfos} />
      </div>
    </div>
  );
}

interface Props2 {
  meetingInfo?: ISGMeetingInfo[];
}

function MeetingNameBanner({ meetingInfo }: Props2) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const tm = setInterval(() => {
      setIndex((prv) => (prv + 1) % (meetingInfo?.length ?? 1));
    }, 5000);
    return () => clearInterval(tm);
  }, [meetingInfo]);

  const hasEvents = meetingInfo && meetingInfo.length > 0;

  if (!hasEvents) {
    return null;
  }

  return (
    // <div className="mt-[32px] font-[300] text-[20px] opacity-100 transition-opacity">
    //   {hasEvents && <p>{meetingInfo![index].name}</p>}
    // </div>

    <div className="mt-[32px]  text-center font-[300] text-[20px] opacity-100 transition-opacity">
      {hasEvents && (
        <motion.p
          // key={index}
          key={meetingInfo![index]?.name}
          exit={{ opacity: 0, y: "100%" }}
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: "0%" }}
        >
          {meetingInfo![index]?.name}
        </motion.p>
      )}
    </div>
  );
}
