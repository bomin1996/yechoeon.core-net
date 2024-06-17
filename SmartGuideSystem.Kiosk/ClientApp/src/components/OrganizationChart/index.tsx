import React, { memo, useContext, useEffect, useState } from "react";
import KioskContext from "src/contexts/KioskContext";
import OrganizationInfoPanel from "./OrganizationInfoPanel";
import HorizontalPageNavigator, {
  HorizontalPageControl,
} from "../ui/HorizontalPageNavigator";
import { OrganizationChartProvider } from "src/contexts/OrganizationChartContext";
import MemberModal, { showUserProfileModal } from "./modal/MemberModal";
import TeamModal from "./modal/TeamModal";
import { ISGOrganizationChart, ISGTeam, ISGUser } from "@shares/*";
// import TypeIt from "typeit-react";
import TeamPanelLayout, { NoSwipeTeamPanelLayout } from "./TeamPanelLayout";
import { useNavigate } from "react-router-dom";
import DialogContext, { IDialogContextData } from "src/contexts/DialogContext";
import { BlackRightTitleLayout } from "../RightTitleLayout";

const VERTICAL_TEAMPANEL_PAGE_COUNT = 2;

export default function Index({
  inputOrgChart,
}: {
  inputOrgChart?: ISGOrganizationChart;
}) {
  const kioskCtx = useContext(KioskContext);
  const orgchart = inputOrgChart ?? kioskCtx?.organizationChart;
  const isSearchMode = inputOrgChart !== undefined;

  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const navigate = useNavigate();
  const dialogCtx = useContext(DialogContext);

  const handleClickMember = (member: ISGUser) => {
    showUserProfileModal(dialogCtx!, member);
  };

  const handleClickTeam = (team: ISGTeam) => {
    showTeamInfoModal(
      dialogCtx!,
      team,
      orgchart?.department?.name ?? "",
      () => {
        dialogCtx?.popAllDialogs();
        navigate("/");
      }
    );
  };

  let HORIZONTAL_TEAMPANEL_PAGE_COUNT = 3;
  // if (orgchart?.teams && orgchart.teams.length > 3) {
  //   HORIZONTAL_TEAMPANEL_PAGE_COUNT = 4;
  // }
  if (orgchart?.teams && orgchart.teams.length > 3) {
    HORIZONTAL_TEAMPANEL_PAGE_COUNT = Math.min(orgchart.teams.length, 7);
  }

  const pagePerMaxCount = HORIZONTAL_TEAMPANEL_PAGE_COUNT;
  const showPageNavigator = (orgchart?.teams?.length ?? 0) > pagePerMaxCount;
  const pageCount = Math.max(0, orgchart?.teams?.length ?? 1);
  const pageIndicatorCount = Math.max(1, pageCount - (pagePerMaxCount - 1));

  if (!orgchart) {
    return null;
  }

  return (
    <OrganizationChartProvider
      onSelectedMember={handleClickMember}
      onSelectedTeam={handleClickTeam}
    >
      {/* <div className="h-full w-full pt-[20px] pr-[20px] pb-[120px] flex flex-row bg-no-repeat bg-center bg-contain bg-[url('assets/background/zzz.webp')]">
        <OrganizationInfoPanel
          direction="Horizontal"
          isSearchMode={isSearchMode}
          organizationInfo={orgchart!}
          selectedPageIndex={selectedPageIndex}
          teamCount={HORIZONTAL_TEAMPANEL_PAGE_COUNT}
          onSelectedTeamIndex={(teamIndex) => {
            setSelectedPageIndex(Math.min(pageIndicatorCount - 1, teamIndex));
          }}
          onSelectMember={handleClickMember}
          className="w-[260px] mt-[140px]  "
        />

        <div className="w-[1px] mt-[140px] h-[670px] bg-white  z-10"></div>

        <span className="absolute text-center  w-[470px] top-[41px] right-[51px] font-bold text-[40px] text-white ">
          {orgchart.name}
        </span>

        <div className="flex flex-col w-0 flex-1 mt-[120px] ">
          <NoSwipeTeamPanelLayout
            className="w-full flex flex-1"
            pageCount={HORIZONTAL_TEAMPANEL_PAGE_COUNT}
            teams={orgchart.teams ?? []}
          />
        </div>
      </div> */}

      <BlackRightTitleLayout
        className="h-full w-full flex flex-row pt-[20px] pr-[20px] pb-[120px]"
        title={orgchart.name}
      >
        <OrganizationInfoPanel
          direction="Horizontal"
          isSearchMode={isSearchMode}
          organizationInfo={orgchart!}
          selectedPageIndex={selectedPageIndex}
          teamCount={HORIZONTAL_TEAMPANEL_PAGE_COUNT}
          onSelectedTeamIndex={(teamIndex) => {
            setSelectedPageIndex(Math.min(pageIndicatorCount - 1, teamIndex));
          }}
          onSelectMember={handleClickMember}
          className="w-[260px] mt-[140px]  "
        />

        <div className="w-[1px] mt-[140px] h-[670px] bg-white  z-10"></div>

        <div className="flex flex-col w-0 flex-1 mt-[120px] ">
          <NoSwipeTeamPanelLayout
            className="w-full flex flex-1"
            pageCount={HORIZONTAL_TEAMPANEL_PAGE_COUNT}
            teams={orgchart.teams ?? []}
          />
        </div>
      </BlackRightTitleLayout>
    </OrganizationChartProvider>
  );
}

function showTeamInfoModal(
  dialogCtx: IDialogContextData,
  team: ISGTeam,
  title: string,
  onHome: () => void
) {
  dialogCtx.pushDialog(
    <TeamModal
      key="TeamModal"
      teamInfo={{
        name: team.name,
        headTitle: title,
        officeTel: team.officeTel ?? "",
        officeFax: team.officeFax ?? "",
        jobDescription: team.jobDescription ?? "",
      }}
      onHome={() => {
        dialogCtx.popDialog();
        onHome();
      }}
      onClose={() => dialogCtx.popDialog()}
    />
  );
}
