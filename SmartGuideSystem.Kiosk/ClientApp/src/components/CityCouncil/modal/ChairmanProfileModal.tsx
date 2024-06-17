import { withModal2 } from "src/components/ui/modal/withModal";
import ModalFrameLayout from "src/components/ui/modal/ModalFrameLayout";
import RightTitlePopupLayout from "src/components/RightTitlePopupLayout";
import { ServerConsts } from "src/server/serverConsts";
import placeHolder from "src/assets/user-photo-placeholder.svg";

interface Props {
  dialogTitle?: string;
  greeting?: string;
  photo?: string;
  profile?: string;
}
const TeamInfoModal: React.FC<Props> = ({
  dialogTitle,
  greeting,
  photo,
  profile,
}) => {
  const photoPath = ServerConsts.photoServerUrl(photo, placeHolder);
  return (
    <ModalFrameLayout>
      <RightTitlePopupLayout
        title={dialogTitle ?? ""}
        className="flex w-[911px] h-[830px] relative"
        modalStyle="Team"
        visibleLogo={false}
      >
        <div className="absolute  left-[60px] right-[60px] top-[81px] bottom-[60px] text-[18px] flex flex-col">
          <p className="pl-[30px]">열린의회 바른의정, 진주시의회</p>
          <p className="border-b-[1px] border-[#111111] px-[30px] py-[18px] leading-none  text-[#171c31] text-[43px] font-extrabold">
            {greeting}
          </p>

          <div className=" relative pl-[30px] pr-[30px] mt-[0px] text-[18px] text-black leading-[36px] mb-[0px] font-normal flex-1 w-full h-0 py-4 ">
            <img
              width={200}
              className="float-right m-2 w-[200px] bg-[#d9d9d9] rounded-lg  shadow"
              src={photoPath}
              alt=""
              onError={(ev) => {
                ev.currentTarget.src = placeHolder;
              }}
            />
            <div className="whitespace-pre-wrap">{profile}</div>
          </div>
        </div>

        <div className="absolute top-[81px] left-[50px] h-[133px] w-[10px] bg-[#131834]"></div>
      </RightTitlePopupLayout>
    </ModalFrameLayout>
  );
};

const ChairmanProfileModal = withModal2(TeamInfoModal);

export default ChairmanProfileModal;
