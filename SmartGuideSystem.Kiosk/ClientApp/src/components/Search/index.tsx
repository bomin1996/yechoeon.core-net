import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ISGOrganizationChart,
  ISGSeatPosChart,
  ISGUser,
} from "@shares/ISGUser";
import SearchInput from "./SearchInput";
import SearchUserResultList from "./SearchUserResultList";
import SquareKeyboard from "../ui/keyboard/SquareKeyboard";
import DialogContext, { IDialogContextData } from "src/contexts/DialogContext";
import { showUserProfileModal } from "../OrganizationChart/modal/MemberModal";
import SearchOrganizationChart from "./SearchOrganizationChart";
import SearchFloorGuideMapModal from "./SearchFloorGuideMapModal";
import { SearchApi } from "src/server/searchApi";
import TeamModal from "../OrganizationChart/modal/TeamModal";
import CircleTitleSegmented from "../ui/CircleTitleSegmented";
import RightTitleLayout, {
  RightTitleLayout2NoImage,
} from "../RightTitleLayout";
import SeatPosChartResultList from "./SeatPosChartResultList";
import SearchSeatPosChart from "./SearchSeatPosChart";
import GetDirectionFloorGuideMapModal from "./GetDirectionFloorGuideMapModal";

interface Props {
  searchButtonClassName?: string;
}

export default function Index({}: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState<Array<ISGUser>>([]);
  const [orgCharts, setOrgCharts] = useState<Array<ISGOrganizationChart>>([]);
  const [seatPosCharts, setSeatPosCharts] = useState<Array<ISGSeatPosChart>>(
    []
  );
  const navigate = useNavigate();
  const dialogCtx = useContext(DialogContext);

  const handleSearch = async (searchText: string) => {
    if (tabIndex === 0) {
      // 직원검색
      const result = await SearchApi.searchUser(searchText);
      setUsers(result);
    } else if (tabIndex === 1) {
      // 배치도 검색
      const result = await SearchApi.searchSeatPosChart(searchText);
      setSeatPosCharts(result);
    }
  };

  const handleTabChanged = (title: string, index: number) => {
    setTabIndex(index);
    setUsers([]);
    setOrgCharts([]);
    setSeatPosCharts([]);
  };

  const handleClearInputText = () => {
    setSearchText("");
    setUsers([]);
    setOrgCharts([]);
    setSeatPosCharts([]);
  };

  useEffect(() => {
    handleSearch(searchText);
  }, [tabIndex]);

  //
  return (
    <div
      className="w-full h-full 
    max-2xl:pt-vertical-topbar-height max-2xl:pb-vertical-bottombar-height 
    2xl:pt-mainTopSpacing 2xl:pb-horizontal-bottombar-height 2xl:pr-mainSecondRightSpacing  "
    >
      <RightTitleLayout2NoImage
        title={"검색"}
        className="w-full h-full flex  
        max-2xl:pt-[161px] max-2xl:px-[0px] max-2xl:flex-col max-2xl:items-center
        2xl:flex-row 2xl:pt-[100px] 2xl:pl-[96px] 2xl:pr-4"
      >
        <div className="absolute max-2xl:top-[100px] max-2xl:left-[35px] 2xl:top-[51px] 2xl:left-[96px] text-[24px] leading-[30px] underline underline-offset-8">
          {searchText && tabIndex === 0 && (
            <p className="">
              <strong className="text-[35px]">{users.length ?? 0}</strong>개의
              직원 검색 결과가 있습니다.
            </p>
          )}

          {searchText && tabIndex === 1 && (
            <p className="">
              <strong className="text-[35px]">{orgCharts.length ?? 0}</strong>
              개의 부서 검색 결과가 있습니다.
            </p>
          )}
        </div>

        <div
          className="flex-1 flex py-[30px] px-[17px] bg-[#f7f7f7] rounded-tr-[100px] 
        max-2xl:h-[650px] max-2xl:w-full
        2xl:w-[1100px] 2xl:h-full 2xl:mr-[54px] "
        >
          {tabIndex === 0 && (
            <SearchUserResultList
              className="h-full w-full"
              users={users}
              onClickInfo={(u) => showUserProfileModal(dialogCtx!, u)}
              onClickOrgChart={(u) => {
                showSeatPosChartModal(dialogCtx!, u.chartId);
              }}
              onClickFloorMap={(u) =>
                showFloorGuideMapModal(
                  dialogCtx!,
                  u.deptCode,
                  u.deptName,
                  u.orgChartName ?? u.deptName
                )
              }
              onClickGetDirections={(u) =>
                showGetDirectionModal(dialogCtx!, u.chartName ?? u.deptName)
              }
            />
          )}

          {/* {tabIndex === 1 && (
            <SearchDepartResultList
              className="h-full w-full"
              orgCharts={orgCharts}
              onClickInfo={(orgChart) =>
                showOrganizationInfoModal(dialogCtx!, orgChart, handleToHome)
              }
              onClickOrgChart={(orgChart) =>
                showOrganizationChartModal(
                  dialogCtx!,
                  "Horizontal",
                  handleToHome,
                  orgChart.id,
                  orgChart
                )
              }
              onClickFloorMap={(orgChart) =>
                showFloorGuideMapModal(
                  dialogCtx!,
                  orgChart.deptCode,
                  orgChart.name,
                  orgChart.name,
                  handleToHome,

                  "Horizontal"
                )
              }
            />
          )} */}
          {tabIndex === 1 && (
            <SeatPosChartResultList
              className="h-full w-full"
              charts={seatPosCharts}
              onClickInfo={(chart) =>
                showSeatPosChartInfoModal(dialogCtx!, chart)
              }
              onClickChart={(chart) =>
                showSeatPosChartModal(dialogCtx!, chart.id, chart)
              }
              onClickFloorMap={(chart) =>
                showFloorGuideMapModal(
                  dialogCtx!,
                  chart.deptCode,
                  chart.name,
                  chart.name
                )
              }
              onClickGetDirections={(chart) =>
                showGetDirectionModal(dialogCtx!, chart.name)
              }
            />
          )}
        </div>

        <div className="relative h-full max-2xl:h-[784px] w-[535px] max-2xl:w-full pt-[24px] flex flex-col items-center">
          <CircleTitleSegmented
            className="max-2xl:absolute max-2xl:top-[126px] max-2xl:left-0 max-2xl:w-full max-2xl:space-x-[550px]"
            selectedIndex={tabIndex}
            titles={["직원검색", "부서검색"]}
            onSelected={handleTabChanged}
          />

          <SearchInput
            inputText={searchText}
            onClickClear={handleClearInputText}
            className="w-[535px] mt-[18px] h-[70px] "
          />
          <SquareKeyboard
            inputText={searchText}
            className="mt-[12px] w-full 2xl:max-w-[440px] max-2xl:max-w-[500px] z-10"
            onChangedInputText={(input) => {
              setSearchText(input);
              handleSearch(input);
            }}
          />
        </div>
      </RightTitleLayout2NoImage>
    </div>
  );
}

export function showOrganizationChartModal(
  dialogCtx: IDialogContextData,
  orgChartId?: number,
  orgChart?: ISGOrganizationChart
) {
  if (!orgChartId) return;
  dialogCtx.pushDialog(
    <SearchOrganizationChart
      key={`showOrganizationChartModal_${orgChartId}`}
      orgChartId={orgChartId!}
      orgChart={orgChart}
      onClose={() => dialogCtx.popDialog()}
    />
  );
}

export function showSeatPosChartModal(
  dialogCtx: IDialogContextData,
  chartId?: number,
  chart?: ISGSeatPosChart
) {
  if (!chartId) return;
  dialogCtx.pushDialog(
    // className="max-2xl:pb-[180px] max-2xl:pt-[128px] max-2xl:pr-[0px] 2xl:pt-[20px] 2xl:pr-[24px] 2xl:pb-[120px]"
    <SearchSeatPosChart
      className="2xl:pb-[120px] max-2xl:pb-[196px] max-2xl:pt-[0px]"
      key={`showOrganizationChartModal_${chartId}`}
      chartId={chartId!}
      chart={chart}
      onClose={() => dialogCtx.popDialog()}
    />
  );
}

function showFloorGuideMapModal(
  dialogCtx: IDialogContextData,
  deptCode: string,
  deptName: string,
  orgChartName: string
) {
  dialogCtx.pushDialog(
    <SearchFloorGuideMapModal
      key="SearchFloorGuideMapModal"
      deptCode={deptCode}
      deptName={deptName}
      orgChartName={orgChartName}
      onClose={() => dialogCtx.popDialog()}
    />
  );
}

export function showOrganizationInfoModal(
  dialogCtx: IDialogContextData,
  orgChart: ISGOrganizationChart
) {
  dialogCtx.pushDialog(
    <TeamModal
      key="TeamModal"
      teamInfo={{
        name: orgChart.name,
        officeTel: orgChart.officeTel ?? "",
        officeFax: orgChart.officeFax ?? "",
        jobDescription: orgChart.departJob ?? "",
      }}
      onClose={() => dialogCtx.popDialog()}
    />
  );
}

export function showSeatPosChartInfoModal(
  dialogCtx: IDialogContextData,
  chart: ISGSeatPosChart
) {
  dialogCtx.pushDialog(
    <TeamModal
      key="TeamModal"
      teamInfo={{
        name: chart.name,
        officeTel: chart.officeTel ?? "",
        officeFax: chart.officeFax ?? "",
        jobDescription: chart.jobDescription ?? "",
      }}
      onClose={() => dialogCtx.popDialog()}
    />
  );
}

function showGetDirectionModal(
  dialogCtx: IDialogContextData,
  destination: string
) {
  dialogCtx.pushDialog(
    <GetDirectionFloorGuideMapModal
      key="GetDirectionFloorGuideMapModal"
      destination={destination}
      onClose={() => dialogCtx.popDialog()}
    />
  );
}
