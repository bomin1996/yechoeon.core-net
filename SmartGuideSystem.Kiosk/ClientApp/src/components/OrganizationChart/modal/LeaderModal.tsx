import { withModal2 } from "src/components/ui/modal/withModal";
import placeHolder from "src/assets/user-photo-placeholder.svg";
import { ISGUser } from "@shares/ISGOrganizationChart";
import { ServerConsts } from "src/server/serverConsts";
import ModalFrameLayout from "src/components/ui/modal/ModalFrameLayout";
import { IDialogContextData } from "src/contexts/DialogContext";
import { getDeptTeamInfoDesc } from "../Profile/util";
import iconTel from "src/assets/icon/mainmenu/전화@2x.webp";
import iconFax from "src/assets/icon/mainmenu/팩스@2x.webp";
import RightTitlePopupLayout from "src/components/RightTitlePopupLayout";
import { selectString } from "src/helpers/stringUtils";

interface Props {
  dialogTitle: string;
  photoUrl?: string;
  displayName: string;
  displayGrade?: string;
  displayJobs?: string;
  officeTel?: string;
  officeFax?: string;
}

const UserProfileModal: React.FC<Props> = ({
  dialogTitle,
  photoUrl,
  displayName,
  displayGrade,
  displayJobs,
  officeTel,
  officeFax,
}) => {
  const jobs = displayJobs?.split("\n");
  const photoPath = ServerConsts.photoServerUrl(photoUrl, placeHolder);

  return (
    <ModalFrameLayout className="">
      <RightTitlePopupLayout
        className="relative flex 2xl:w-[1226px] 2xl:h-[614px]  md:max-2xl:w-[1030px] md:max-2xl:h-[614px] pt-[82px] pb-[92px] pl-[82px] pr-[92px] "
        title={dialogTitle}
        modalStyle="Leader"
      >
        <img
          height={440}
          className="  h-[440px] bg-[#d9d9d9]  rounded-tl-[50px] rounded-bl-[50px] rounded-br-[50px] "
          src={photoPath}
          alt=""
          onError={(ev) => {
            ev.currentTarget.src = placeHolder;
          }}
        />
        <div className="w-[10px] h-[134px] bg-[#131834]"></div>
        <div className="my-[0px] ml-[0px] mr-[0px] flex flex-1 flex-col justify-start">
          <div className="pl-[49px] py-[18px] leading-none flex items-baseline">
            <span className="text-[49px] font-bold text-black">
              {displayName}
            </span>
            <span className="ml-[12px] text-[#777777] text-[28px] font-[600]">
              {displayGrade}
            </span>
          </div>

          <div className="border-b border-[1px] mb-[22px] border-[#111111] "></div>

          <div className=" h-[240px]   overflow-auto scrollbar">
            {jobs?.map((job, index) => (
              <p
                className="text-[18px] pl-[64px] font-normal text-[#111111] leading-[22px]"
                key={index}
              >
                {job}
              </p>
            ))}
          </div>

          <div className="ml-[64px] border-b-[4px]  w-[88px] flex-1  mb-[38px] border-[#111111] "></div>

          <p className="ml-[64px] w-full flex space-x-[12px] text-[#111111] font-[500]">
            <img src={iconTel} height={16} className="inline h-[16px]" />
            <span>전화</span>
            <span>{officeTel}</span>
          </p>
          <p className="ml-[64px] w-full flex space-x-[12px] mt-[16px] text-[#111111] font-[500]">
            <img src={iconFax} height={18} className="inline h-[18px]" />
            <span>팩스</span>
            <span>{officeFax}</span>
          </p>
        </div>
      </RightTitlePopupLayout>
    </ModalFrameLayout>
  );
};

const LeaderModal = withModal2(UserProfileModal);
export default LeaderModal;
export function showLeaderUserProfileModal(
  dialogCtx: IDialogContextData,
  user: ISGUser
) {
  dialogCtx.pushDialog(
    <LeaderModal
      key="showUserProfileModal"
      className="bg-black/70 left-0 top-0 pb-0"
      dialogTitle={getDeptTeamInfoDesc(user)}
      photoUrl={user.photo}
      displayName={user.name}
      displayGrade={selectString(
        user.profileGrade,
        user.positionName,
        "주무관"
      )}
      displayJobs={user.jobDescription}
      officeTel={user.officeTel}
      officeFax={user.officeFax}
      onClose={() => {
        dialogCtx.popDialog();
      }}
    />
  );
}
