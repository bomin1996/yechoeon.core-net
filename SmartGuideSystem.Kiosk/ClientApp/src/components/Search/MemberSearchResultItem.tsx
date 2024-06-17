import React, { FC, useState } from "react";
import { ISGUser } from "@shares/ISGUser";
import placeHolder from "src/assets/user-photo-placeholder.svg";
import { ServerConsts } from "src/server/serverConsts";
import IconTitleInfoButton from "../ui/buttons/IconTitleInfoButton";
import ProfileCardLayout from "../OrganizationChart/Profile/ProfileCardLayout";

interface Props {
  user: ISGUser;
  onClick: (user: ISGUser) => void;
  className?: string;
  onClickLocationMap: (user: ISGUser) => void;
  onClickOrgChart: (user: ISGUser) => void;
  onClickGetDirections: (user: ISGUser) => void;
}

const MemberSearchResultItem: React.FC<Props> = ({
  user,
  onClick,
  className,
  onClickLocationMap,
  onClickOrgChart,
  onClickGetDirections,
}) => {
  const location = user.teamName
    ? `${user.deptName} - ${user.teamName}`
    : `${user.deptName}`;
  const photoPath = ServerConsts.photoServerUrl(user.photo, placeHolder);

  //bg-[url('assets/frame/search/SearchUserCard.svg')]
  return (
    <div
      className={`${className} flex relative flex-row items-center  text-black  bg-user-search-reaultitem  bg-left bg-no-repeat bg-contain `}>
      <img
        height={94}
        width={84}
        onClick={() => onClick(user)}
        className="absolute left-[15px] top-[23px] w-[84px] h-[94px]  object-cover rounded-[10px] "
        src={photoPath}
        alt=""
        onError={(ev) => {
          ev.currentTarget.src = placeHolder;
        }}
      />
      <div className="absolute left-[121px] h-full flex flex-col justify-center items-start ">
        <p className="text-[19px] font-[600] ">{user.deptName}</p>
        <p className="text-[16px] font-[400] ">{user.teamName}</p>
        <p className="flex items-baseline text-[31px] font-[500] ">
          {user.name}{" "}
          <span className="ml-1 text-[15px]">{user.positionName ?? ""}</span>
        </p>
      </div>

      <div className="absolute top-[50%] translate-y-[-50%] right-[21px] grid grid-cols-2 gap-[4px] mt-[-4px] ">
        <IconTitleInfoButton
          title="상세정보"
          titleClassName="underline"
          icon="information"
          onClick={() => onClick(user)}
        />
        <IconTitleInfoButton
          onClick={() => onClickLocationMap(user)}
          title="위치안내"
          icon="location_map"
        />
        <IconTitleInfoButton
          onClick={() => onClickOrgChart(user)}
          title="조직도"
          icon="organization_chart"
        />
        <IconTitleInfoButton
          onClick={() => onClickGetDirections(user)}
          title="길찾기"
          icon="GetDirections"
        />
      </div>
    </div>
  );
};

export default MemberSearchResultItem;
