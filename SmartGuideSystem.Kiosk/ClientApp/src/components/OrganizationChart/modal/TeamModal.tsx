import { withModal2 } from "src/components/ui/modal/withModal";
import ModalFrameLayout from "src/components/ui/modal/ModalFrameLayout";
import iconTel from "src/assets/icon/mainmenu/전화@2x.webp";
import iconFax from "src/assets/icon/mainmenu/팩스@2x.webp";
import RightTitlePopupLayout from "src/components/RightTitlePopupLayout";
type TeamProperties = {
  name: string;
  headTitle?: string;
  officeTel: string;
  officeFax: string;
  jobDescription: string;
};

interface Props {
  teamInfo: TeamProperties;
}
const TeamInfoModal: React.FC<Props> = ({ teamInfo }) => {
  // console.log("teamInfo:", teamInfo);
  const jobs = teamInfo.jobDescription?.split("\n");

  return (
    <ModalFrameLayout>
      {/* <div className="flex w-[911px] h-[830px] relative ">
        <img
          src={backImage}
          alt=""
          className="absolute h-[830px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
        />
        <p className="absolute top-[18px] right-0 text-center text-[40px] text-white font-medium w-[480px]">
          {teamInfo.headTitle}
        </p>
        <div className="absolute left-[60px] right-[60px] top-[81px] bottom-[60px] text-[18px] flex flex-col">
          <p className="border-b-[1px] border-[#111111] px-[70px] py-[18px] leading-none  text-[#171c31] text-[43px] font-extrabold">
            {teamInfo.name}
          </p>

          <div className="px-[70px] mt-[16px] text-[18px] text-black leading-[36px] mb-[90px] font-normal flex-1 w-full h-0 py-4 ">
            {jobs?.map((job, index) => (
              <p key={index}>{job}</p>
            ))}
          </div>
          <div className="mx-[70px] w-[89px] h-[4px] bg-[#111111]"></div>
          <p className="w-full font-medium px-[70px] flex space-x-[12px] mt-[20px]">
            <img src={iconTel} height={16} className="inline h-[16px]" />
            <span>전화</span>
            <span>{teamInfo.officeTel}</span>
          </p>
          <p className="w-full px-[70px] font-medium flex space-x-[12px] mt-[16px]">
            <img src={iconFax} height={18} className="inline h-[18px]" />
            <span>팩스</span>
            <span>{teamInfo.officeFax}</span>
          </p>
        </div>

        <div className="absolute top-[81px] left-[50px] h-[133px] w-[10px] bg-[#131834]"></div>


      </div> */}
      <RightTitlePopupLayout
        title={teamInfo.headTitle ?? ""}
        className="flex w-[911px] h-[830px] relative"
        modalStyle="Team"
      >
        <div className="absolute left-[60px] right-[60px] top-[81px] bottom-[60px] text-[18px] flex flex-col">
          <p className="border-b-[1px] border-[#111111] px-[70px] py-[18px] leading-none  text-[#171c31] text-[43px] font-extrabold">
            {teamInfo.name}
          </p>

          <div className="h-0 overflow-auto scrollbar px-[70px] mt-[16px] text-[18px] text-black leading-[36px] mb-[90px] font-normal flex-1 w-full  py-4 ">
            {jobs?.map((job, index) => (
              <p key={index}>{job}</p>
            ))}
          </div>
          <div className="mx-[70px] w-[89px] h-[4px] bg-[#111111]"></div>
          <p className="w-full font-medium px-[70px] flex space-x-[12px] mt-[20px]">
            <img src={iconTel} height={16} className="inline h-[16px]" />
            <span>전화</span>
            <span>{teamInfo.officeTel}</span>
          </p>
          <p className="w-full px-[70px] font-medium flex space-x-[12px] mt-[16px]">
            <img src={iconFax} height={18} className="inline h-[18px]" />
            <span>팩스</span>
            <span>{teamInfo.officeFax}</span>
          </p>
        </div>

        <div className="absolute top-[81px] left-[50px] h-[133px] w-[10px] bg-[#131834]"></div>
      </RightTitlePopupLayout>
    </ModalFrameLayout>
  );
};

const TeamModal = withModal2(TeamInfoModal);

export default TeamModal;
