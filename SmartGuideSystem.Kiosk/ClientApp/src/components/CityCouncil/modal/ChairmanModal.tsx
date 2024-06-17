import { withModal2 } from "src/components/ui/modal/withModal";
import placeHolder from "src/assets/user-photo-placeholder.svg";
import { ServerConsts } from "src/server/serverConsts";
import ModalFrameLayout from "src/components/ui/modal/ModalFrameLayout";
import RightTitlePopupLayout from "src/components/RightTitlePopupLayout";

interface Props {
  dialogTitle: string;
  photoUrl?: string;
  displayName: string;
  displayGrade?: string;
  displayJobs?: string;
}

const UserProfileModal: React.FC<Props> = ({
  dialogTitle,
  photoUrl,
  displayName,
  displayGrade,
  displayJobs,
}) => {
  //const jobs = displayJobs?.split("\n");
  const photoPath = ServerConsts.photoServerUrl(photoUrl, placeHolder);

  return (
    <ModalFrameLayout>
      <RightTitlePopupLayout
        className="flex w-[1226px] h-[614px] relative pt-[82px] pb-[92px] pl-[82px] pr-[92px] "
        title={dialogTitle}
        modalStyle="Leader"
        visibleLogo={false}
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

          {/* {jobs?.map((job, index) => (
            <p
              className="text-[18px] pl-[64px] font-normal text-[#111111] leading-[22px]"
              key={index}
            >
              {job}
            </p>
          ))} */}

          <div className="text-[18px] pl-[64px] font-normal text-[#111111] leading-[22px] whitespace-pre-line">
            {displayJobs}
          </div>
        </div>
      </RightTitlePopupLayout>
    </ModalFrameLayout>
  );
};

const ChairmanModal = withModal2(UserProfileModal);
export default ChairmanModal;
