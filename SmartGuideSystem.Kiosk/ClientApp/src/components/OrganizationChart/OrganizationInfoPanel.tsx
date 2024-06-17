import { useContext } from "react";
import DepartLeaderCard from "./Profile/DepartLeaderCard";
import { ISGOrganizationChart, ISGUser } from "@shares/*";
import DialogContext, { IDialogContextData } from "src/contexts/DialogContext";
import MemberModal from "./modal/MemberModal";
import TeamModal from "./modal/TeamModal";
import { useNavigate } from "react-router-dom";
import ColorInfoButton from "../ui/buttons/ColorInfoButton";
import TeamBannerFrame from "../ui/TeamBannerFrame";

interface Props {
  direction: "Horizontal" | "Vertical";
  isSearchMode: boolean;
  className?: string;
  selectedPageIndex: number;
  teamCount: number;
  organizationInfo: ISGOrganizationChart;
  onSelectedTeamIndex: (index: number) => void;
  onSelectMember: (member: ISGUser) => void;
}

export default function OrganizationInfoPanel({
  direction,
  isSearchMode,
  organizationInfo,
  selectedPageIndex,
  teamCount,
  className = "w-[430px] ",
  onSelectedTeamIndex,
  onSelectMember,
}: Props) {
  const dialogCtx = useContext(DialogContext);
  const navigate = useNavigate();
  const handleClickHome = () => {
    dialogCtx?.popAllDialogs();
    navigate("/");
  };

  return (
    <div
      className={`flex flex-col justify-start items-center  text-black   ${className}`}
    >
      <ColorInfoButton
        colorStyle="Red"
        onClick={() => {
          showDetailDepartmentModal(
            dialogCtx!,
            organizationInfo,
            handleClickHome
          );
        }}
        title={organizationInfo.name}
      />

      {organizationInfo.topDeptLeader && (
        <DepartLeaderCard
          className="mt-[21px] "
          member={organizationInfo.topDeptLeader}
          onSelect={(m) => onSelectMember(m)}
        />
      )}

      {organizationInfo.deptLeader && (
        <DepartLeaderCard
          className="mt-[21px] "
          member={organizationInfo.deptLeader}
          onSelect={(m) => onSelectMember(m)}
        />
      )}

      <ul className="mt-[45px] select-none cursor-pointer  px-[20px]">
        {organizationInfo?.teams?.map((team, index) => (
          <TeamLabel key={index} title={team.name} />
        ))}
      </ul>
    </div>
  );
}

export function showMemberModal(dialogCtx: IDialogContextData, user: ISGUser) {
  dialogCtx.pushDialog(
    <MemberModal
      className="bg-black/70 left-0 top-0 pb-0"
      member={user}
      onHome={() => {}}
      onClose={() => {
        dialogCtx.popDialog();
      }}
    />
  );
}

function showDetailDepartmentModal(
  dialogCtx: IDialogContextData,
  organizationChart: ISGOrganizationChart,
  onHome: () => void
) {
  dialogCtx.pushDialog(
    <TeamModal
      className="bg-black/70 left-0 top-0 pb-0"
      teamInfo={{
        name: organizationChart.department?.name ?? "",
        officeTel: organizationChart.officeTel ?? "",
        officeFax: organizationChart.officeFax ?? "",
        jobDescription: organizationChart.departJob ?? "",
      }}
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

function TeamLabel({ title }: { title: string }) {
  return (
    <TeamBannerFrame className={` w-[157px] h-[42px] mb-[8px] relative `}>
      <div className="w-full h-full  flex items-center">
        <span
          className={`font-medium m-auto z-10 text-[#898989] ${
            title.length < 10 ? "text-[18px]" : "text-[14px]"
          }`}
        >
          {title}
        </span>
      </div>
    </TeamBannerFrame>
  );
}
