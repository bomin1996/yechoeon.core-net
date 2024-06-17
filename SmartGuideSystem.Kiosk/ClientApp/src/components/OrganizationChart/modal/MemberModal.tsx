import { withModal2 } from "src/components/ui/modal/withModal";
import placeHolder from "src/assets/user-photo-placeholder.svg";
import { ISGUser } from "@shares/ISGOrganizationChart";
import { ServerConsts } from "src/server/serverConsts";
import ModalFrameLayout from "src/components/ui/modal/ModalFrameLayout";
import { IDialogContextData } from "src/contexts/DialogContext";
import { getDeptTeamInfoDesc } from "../Profile/util";
import iconTel from "src/assets/icon/mainmenu/전화@2x.webp";
import iconFax from "src/assets/icon/mainmenu/팩스@2x.webp";
import { showLeaderUserProfileModal } from "./LeaderModal";
import RightTitlePopupLayout from "src/components/RightTitlePopupLayout";
import { selectString } from "src/helpers/stringUtils";

interface Props {
  member: ISGUser;
  visibleLogo?: boolean;
}

const UserProfileModal: React.FC<Props> = ({ member, visibleLogo = true }) => {
  const jobs = member.jobDescription?.split("\n");
  const photoPath = ServerConsts.photoServerUrl(member.photo, placeHolder);

  let grade = selectString(member.profileGrade, member.positionName, "주무관");

  //의령 9월 7일 요구사항
  // if (
  //   member &&
  //   member.officeTel?.endsWith("1") &&
  //   member.teamName?.endsWith("담당")
  // ) {
  //   grade = "팀장";
  // }
  if (member && member.teamName?.endsWith("팀장")) {
    grade = "팀장";
  }

  return (
    <ModalFrameLayout>
      <RightTitlePopupLayout
        className="flex w-[745px] h-[415px] relative "
        title={getDeptTeamInfoDesc(member)}
        visibleLogo={visibleLogo}>
        <div className="pl-[52px] px-[39px] pt-[50px]  text-[#111111] font-medium text-[15px] z-10 ">
          <img
            height={234}
            className="  h-[234px] bg-[#d6d6d6]  rounded-tl-[30px] rounded-bl-[30px] rounded-br-[30px]"
            src={photoPath}
            alt=""
            onError={(ev) => {
              ev.currentTarget.src = placeHolder;
            }}
          />
          <p className="w-full flex space-x-[12px] mt-[20px]">
            <img src={iconTel} height={16} className="inline h-[16px]" />
            <span>전화</span>
            <span>{member.officeTel}</span>
          </p>
          <p className="w-full flex space-x-[12px] mt-[16px]">
            <img src={iconFax} height={18} className="inline h-[18px]" />
            <span>팩스</span>
            <span>{member.officeFax}</span>
          </p>
        </div>
        <div className="my-[58px] ml-[28px] mr-[58px] flex flex-1 flex-col z-10 ">
          <div className="px-[12px] py-[18px] leading-none flex items-baseline">
            <span className="text-[42px] font-medium text-[#171c31]">
              {member.name}
            </span>
            <span className="ml-[16px] text-[#777777] text-[23px]">
              {grade}
            </span>
            {member.status && (
              <div className="ml-auto flex w-[84px] h-[22px] leading-none font-light text-[12px] text-white bg-[#00589b] rounded-[10px]">
                <span className="m-auto">{member.status}</span>
              </div>
            )}
          </div>
          <div className="border-b border-[1px] mb-[22px] border-[#111111] " />

          <div className="h-[200px]  overflow-auto scrollbar">
            {jobs?.map((job, index) => (
              <p
                className="text-[15px] px-[12px] font-normal text-[#111111]"
                key={index}>
                {job}
              </p>
            ))}
          </div>
        </div>
      </RightTitlePopupLayout>
    </ModalFrameLayout>
  );
};

const MemberModal = withModal2(UserProfileModal);
export default MemberModal;

export function showUserProfileModal(
  dialogCtx: IDialogContextData,
  user: ISGUser
) {
  if (user.positionName || user.teamPosition) {
    showLeaderUserProfileModal(dialogCtx, user);
  } else {
    dialogCtx.pushDialog(
      <MemberModal
        key="showUserProfileModal"
        className="bg-black/70 left-0 top-0 pb-0"
        member={user}
        onClose={() => {
          dialogCtx.popDialog();
        }}
      />
    );
  }
}
