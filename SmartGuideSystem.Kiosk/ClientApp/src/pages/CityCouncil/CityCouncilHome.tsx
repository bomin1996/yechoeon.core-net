import React, { useContext, useEffect, useState } from "react";
import TitleAndQRPanel from "./TitleAndQRPanel";
import RightSchedulePanel from "./RightSchedulePanel";
import BannerImageSlider from "src/components/ui/imgaeSlider/BannerImageSlider";
import MemberGrid from "src/components/CityCouncil/MemberGrid";
import { ISGUser } from "@shares/*";
import MemberModal, {
  showUserProfileModal,
} from "src/components/OrganizationChart/modal/MemberModal";
import DialogContext from "src/contexts/DialogContext";
import SeatPositionChart from "src/components/SeatPositionChart";
import KioskContext from "src/contexts/KioskContext";
import LeaderModal from "src/components/OrganizationChart/modal/LeaderModal";
import ChairmanModal from "src/components/CityCouncil/modal/ChairmanModal";
import ChairmanProfileModal from "src/components/CityCouncil/modal/ChairmanProfileModal";

const imageUrls = [
  "serverimages/council_banners/1.jpg",
  "serverimages/council_banners/2.jpg",
  "serverimages/council_banners/1.jpg",
];

export default function CityCouncilHome() {
  const kioskInfo = useContext(KioskContext);

  const idArray = kioskInfo?.councilConfig?.memberIds ?? [];
  const allMembers = kioskInfo?.councilConfig?.members ?? [];
  const arrangeMembers: Array<ISGUser> = [];
  let chairman: ISGUser;
  const cindex = allMembers.findIndex(
    (v) => kioskInfo?.councilConfig?.chairmanId === v.sid
  );
  if (cindex !== -1) {
    chairman = allMembers[cindex];
  }

  if (idArray && idArray.length) {
    idArray.forEach((mid) => {
      const fidx = allMembers.findIndex((v) => v.sid === mid);
      if (fidx !== -1) {
        arrangeMembers.push(allMembers[fidx]);
      }
    });
  } else {
  }

  const dialogCtx = useContext(DialogContext);

  return (
    <div className="flex flex-row  w-full h-full pt-[85px]  pb-[230px] pl-[44px]">
      <div className="w-[386px] flex-shrink-0">
        <TitleAndQRPanel className="mt-[115px]" />
      </div>
      <div className="flex-1 w-[0px] ml-[46px] mr-[26px]">
        <BannerImageSlider
          imageUrls={imageUrls}
          duration={3000}
          onClick={(url) => {}}
          width={545}
          height={400}
          className=" bg-[#FFF0F3] h-[400px] rounded-none"
          useLink={false}
        />
        <MemberGrid
          className="w-full mt-[34px]"
          members={arrangeMembers}
          onClick={(user) => {
            // showUserProfileModal(dialogCtx!, user, () => {});

            dialogCtx?.pushDialog(
              <MemberModal
                key="showUserProfileModal"
                className="bg-black/70 left-0 top-0 pb-0"
                visibleLogo={false}
                member={user}
                // onHome={() => {
                //   dialogCtx.popDialog();
                //   onHome();
                // }}
                onClose={() => {
                  dialogCtx.popDialog();
                }}
              />
            );
          }}
        />
      </div>
      <div className="w-[650px] flex-shrink-0">
        <RightSchedulePanel
          className="h-[763px]"
          onClickGreeting={() => {
            dialogCtx?.pushDialog(
              <ChairmanModal
                key="showUserProfileModal"
                className="bg-black/70 left-0 top-0 pb-0"
                dialogTitle="진주시의회 의장 인사말"
                photoUrl={chairman.photo}
                displayName={chairman.name}
                displayGrade="진주시의회 의장"
                displayJobs={kioskInfo?.councilConfig?.greeting}
                onClose={() => {
                  dialogCtx.popDialog();
                }}
              />
            );
          }}
          onClickProfile={() => {
            dialogCtx?.pushDialog(
              <ChairmanProfileModal
                key="showUserProfileModal"
                className="bg-black/70 left-0 top-0 pb-0"
                dialogTitle="의장 프로필"
                greeting={`${chairman.name} 의장입니다.`}
                photo={chairman.photo}
                profile={kioskInfo?.councilConfig?.profile}
                onClose={() => {
                  dialogCtx.popDialog();
                }}
              />
            );
          }}
        />
      </div>
    </div>
  );
}
