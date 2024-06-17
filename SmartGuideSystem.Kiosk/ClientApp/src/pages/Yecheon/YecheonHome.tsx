import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import KioskContext from "src/contexts/KioskContext";
import DialogContext from "src/contexts/DialogContext";
import IconHeaderTitleLabel from "src/components/FloorInformation/IconHeaderTitleLabel";
import RightTitleLayout from "src/components/RightTitleLayout";
import ScheduleBoard from "./ScheduleBoard";
import WatcherBoard from "./WatcherBoard";
import BannerImageSlider from "src/components/ui/imgaeSlider/BannerImageSlider";

const interval = 10000;
const bWidth = 1410;
const bHeight = 905;

export default function YecheonHome() {
  const navigate = useNavigate();
  const kioskCtx = useContext(KioskContext);
  const dialogCtx = useContext(DialogContext);

  const urls = kioskCtx?.deviceInfo?.extraSettings?.ycImageUrls;
  const intervalTimeMS =
    kioskCtx?.deviceInfo?.extraSettings?.refreshMS ?? interval;

  const watchers = kioskCtx?.watchers;
  const schedules = kioskCtx?.schedules;

  console.log("intervalTimeMS", intervalTimeMS);

  return (
    <div className="w-full h-full pt-[54px] pr-[50px] pb-[120px] relative">
      <p className="absolute  text-white text-[22px] font-[500] top-[10px] left-[50%] translate-x-[-50%]">
        예천군, (사)희망을나누는사람들과 희망나눔 업무협약
      </p>
      <RightTitleLayout className="w-full h-full" title={"예천군 농업기술센터"}>
        <div className="flex w-full h-full pl-[0px] py-0 ">
          <div className="w-[1410px]  ">
            <BannerImageSlider
              imageUrls={urls!}
              width={bWidth}
              onClick={() => {}}
              duration={intervalTimeMS}
              height={bHeight}
              className="col-span-1  h-full"
              useLink={false}
            />
          </div>
          <div className="flex ml-[40px] flex-col w-[382px] pt-[110px] ">
            <IconHeaderTitleLabel title="당직" icon="당직" className="pb-4 " />
            <WatcherBoard
              watcherInfos={watchers}
              className="h-[134px]"
              selectedRoomIndex={0}
            />
            <IconHeaderTitleLabel
              title="일정"
              icon="일정"
              className="pb-4 pt-[38px]"
            />
            <ScheduleBoard
              selectedRoomIndex={0}
              scheduls={schedules}
              className="h-[460px]"
            />
          </div>
        </div>
      </RightTitleLayout>
    </div>
  );
}
