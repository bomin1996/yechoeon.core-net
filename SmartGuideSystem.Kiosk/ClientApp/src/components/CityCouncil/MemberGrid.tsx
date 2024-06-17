import React, { useContext, useState } from "react";
import ProfileCard from "../OrganizationChart/Profile/ProfileCard";
import { ISGUser } from "../../../../../shares/ISGUser";
import KioskContext from "src/contexts/KioskContext";
interface Props {
  className?: string;
  members: Array<ISGUser>;
  onClick: (user: ISGUser) => void;
}
export default function MemberGrid({ className, members, onClick }: Props) {
  return (
    <div
      className={`grid grid-cols-5 gap-[10px] justify-items-center ${className}`}>
      {members.map((it, index) => (
        <ProfileCard
          key={index}
          sizeStyle="Medium"
          colorStyle="Yellow"
          member={{ ...it, positionName: "의원" }}
          onSelect={(m) => {
            onClick(it);
          }}
        />
      ))}
    </div>
  );
}
