import placeHolder from "src/assets/user-photo-placeholder.svg";
import { ISGUser, MemberCardColor } from "@shares/*";
import { ServerConsts } from "src/server/serverConsts";
import { DepartLeaderCardLayout } from "./ProfileCardLayout";
import { selectString } from "src/helpers/stringUtils";

interface Props {
  className?: string;
  member: ISGUser;
  colorStyle?: MemberCardColor;
  onSelect?: (member: ISGUser) => void;
}

export default function DepartLeaderCard({
  member,
  onSelect,
  className = "",
  colorStyle = "Red",
}: Props) {
  const jobs = selectString(
    member.profileJobDescription,
    member.jobDescription
  );
  const grade = selectString(member.profileGrade, member.positionName);
  const photoPath = ServerConsts.photoServerUrl(member.photo, placeHolder);

  return (
    <DepartLeaderCardLayout
      colorStyle={colorStyle}
      onClick={() => {
        if (onSelect) {
          onSelect(member);
        }
      }}
      className={`relative active:scale-95 flex-shrink-0 w-[150px] h-[194px]  flex flex-row items-center justify-start cursor-pointer   ${className}`}
    >
      <img
        height={121}
        className="absolute left-[10px] top-[14px] h-[121px] rounded-[20px] bg-[#dcdcdc] "
        src={photoPath}
        onError={(ev) => {
          ev.currentTarget.src = placeHolder;
        }}
        alt=""
      />

      <div className="text-black absolute left-[13px] top-[144px] flex flex-col font-medium  justify-bottom items-start">
        <p className="leading-none">
          <span className="text-[27px] ">{member.name ?? ""}</span>
          <span className="text-[12px] ml-[2px] ">{grade ?? ""}</span>
        </p>
        <div className="flex-1 mt-1 ml-[2px] font-light text-[11px] leading-[15px]  whitespace-pre-line">
          {jobs ?? ""}
        </div>
      </div>
    </DepartLeaderCardLayout>
  );
}
