import { ISGUser, MemberCardColor, MemberCardSize } from "@shares/*";
import { ServerConsts } from "src/server/serverConsts";
import placeHolder from "src/assets/user-photo-placeholder.svg";
import { LeaderCardLayout } from "./ProfileCardLayout";
import { selectString } from "src/helpers/stringUtils";

const Colors: MemberCardColor[] = [
  "Blue",
  "Green",
  "Mint",
  "Orange",
  "Red",
  "Yellow",
];

interface Props {
  className?: string;
  member: ISGUser;
  onSelect: (member: ISGUser) => void;
  teamIndex?: number;
  colorStyle?: MemberCardColor;
  sizeStyle?: MemberCardSize;
}

export default function LeaderCard({
  member,
  onSelect,
  className = "",
  teamIndex = 2,
  colorStyle,
  sizeStyle = "Medium",
}: Props) {
  const photoPath = ServerConsts.photoServerUrl(member.photo, placeHolder);
  const grade = selectString(
    member.profileGrade,
    member.positionName,
    "주무관"
  );
  const jobs = selectString(
    member.profileJobDescription,
    member.jobDescription
  );
  if (!colorStyle) {
    colorStyle = Colors[teamIndex % Colors.length];
  }

  if (sizeStyle === "Large") {
    return (
      <BigCard
        member={member}
        className={className}
        onSelect={onSelect}
        photoPath={photoPath}
        grade={grade}
        jobs={jobs}
        colorStyle={colorStyle}
        sizeStyle={sizeStyle}
      />
    );
  } else if (sizeStyle === "Medium") {
    return (
      <MediumCard
        member={member}
        className={className}
        onSelect={onSelect}
        photoPath={photoPath}
        grade={grade}
        jobs={jobs}
        colorStyle={colorStyle}
        sizeStyle={sizeStyle}
      />
    );
  } else {
    return (
      <SmallCard
        member={member}
        className={className}
        onSelect={onSelect}
        photoPath={photoPath}
        grade={grade}
        jobs={jobs}
        colorStyle={colorStyle}
        sizeStyle={sizeStyle}
      />
    );
  }
}

interface CardProps {
  className?: string;
  member: ISGUser;
  photoPath?: string;
  grade?: string;
  jobs?: string;
  colorStyle?: MemberCardColor;
  sizeStyle?: MemberCardSize;
  onSelect: (member: ISGUser) => void;
}

function BigCard({
  className,
  member,
  photoPath,
  grade,
  jobs,
  onSelect,
  colorStyle,
  sizeStyle,
}: CardProps) {
  return (
    <LeaderCardLayout
      colorStyle={colorStyle}
      sizeStyle={sizeStyle}
      onClick={() => {
        if (onSelect) {
          onSelect(member);
        }
      }}
      className={`w-[264px] h-[129px] relative active:scale-95 flex  flex-row items-center justify-start  cursor-pointer  ${className}`}
    >
      <img
        onError={(ev) => {
          ev.currentTarget.src = placeHolder;
        }}
        height={92}
        className="absolute left-[10px] top-[11px] h-[92px] rounded-[10px] shadow flex-shrink-0"
        src={photoPath}
        alt=""
      />

      <div className="absolute left-[115px] right-[30px] top-[23px] flex flex-col justify-center items-start ">
        <p className="flex-1 mt-1 flex items-baseline leading-none font-black text-black ">
          <span className="text-[27px] font-medium flex-shrink-0 ">
            {member.name}
          </span>
          <span className="text-[12px] font-medium ml-1  whitespace-nowrap">
            {grade}
          </span>
        </p>
        <div className="truncate w-full mt-[6px] h-[26px]  text-[11px] leading-[13px] whitespace-pre-wrap  ">
          {jobs}
        </div>
      </div>
    </LeaderCardLayout>
  );
}

function MediumCard({
  className = "",
  member,
  photoPath,
  grade,
  jobs,
  onSelect,
  colorStyle,
  sizeStyle,
}: CardProps) {
  return (
    <LeaderCardLayout
      colorStyle={colorStyle}
      sizeStyle={"Large"}
      onClick={() => {
        if (onSelect) {
          onSelect(member);
        }
      }}
      className={`w-[235px] h-[115px] relative active:scale-95 flex flex-row items-center justify-start  cursor-pointer  ${className}`}
    >
      <img
        onError={(ev) => {
          ev.currentTarget.src = placeHolder;
        }}
        height={82}
        className="absolute left-[9px] top-[10px] h-[82px] shadow rounded-[8px] flex-shrink-0"
        src={photoPath}
        alt=""
      />

      <div className="absolute left-[99px] top-[50%] translate-y-[-50%]">
        <div className="font-[500] text-[22px]">
          <span className="font-[500] text-[27px]">{member.name}</span>
          <span className="font-[500] text-[12px]">{grade}</span>
        </div>
        <div className="font-[300] text-[11px] truncate h-[30px] w-[110px] whitespace-pre-wrap">
          {jobs}
        </div>
      </div>
    </LeaderCardLayout>
  );
}

function SmallCard({
  className = "",
  member,
  photoPath,
  grade,
  jobs,
  onSelect,
  colorStyle,
  sizeStyle,
}: CardProps) {
  return (
    <LeaderCardLayout
      colorStyle={colorStyle}
      sizeStyle={sizeStyle}
      onClick={() => {
        if (onSelect) {
          onSelect(member);
        }
      }}
      className={`w-[208px] h-[100px] relative active:scale-95 flex flex-row items-center justify-start  cursor-pointer  ${className}`}
    >
      <img
        onError={(ev) => {
          ev.currentTarget.src = placeHolder;
        }}
        height={72}
        className="absolute left-[5%] top-[7%] h-[75%] shadow rounded-[6px] flex-shrink-0"
        src={photoPath}
        alt=""
      />

      <div className="absolute left-[85px] top-[50%] translate-y-[-50%]">
        <div className="font-[500] text-[22px]">
          <span className="font-[500] text-[23px]">{member.name}</span>
          <span className="font-[500] text-[12px]">{grade}</span>
        </div>
        <div className="font-[300] text-[11px] truncate h-[30px] w-[110px] whitespace-pre-wrap">
          {jobs}
        </div>
      </div>
    </LeaderCardLayout>
  );
}
