import ProfileCard from "../OrganizationChart/Profile/ProfileCard";
import DepartLeaderCard from "../OrganizationChart/Profile/DepartLeaderCard";
import LeaderCard from "../OrganizationChart/Profile/LeaderCard";
import { ISGSCMemberNode, ISGUser } from "@shares/*";
import { showUserProfileModal } from "../OrganizationChart/modal/MemberModal";
import { memo, useContext } from "react";
import DialogContext from "src/contexts/DialogContext";
import MemberStyle1PlaceHolder from "./Templates/MemberStyle1PlaceHolder";

interface Props {
  memberNode: ISGSCMemberNode;
}

export default function MemberNode({ memberNode }: Props) {
  const dialogCtx = useContext(DialogContext);

  // const modifiedMember: ISGUser = {
  //   ...memberNode.member,
  //   // teamPosition: memberNode.grade ?? memberNode.member.teamPosition,
  //   // jobDescription:
  //   //   memberNode.jobDescription ?? memberNode.member.jobDescription,
  //   // officeTel: memberNode.officeTel ?? memberNode.member.officeTel,
  //   // officeFax: memberNode.officeFax ?? memberNode.member.officeFax,
  // };

  if (memberNode.templateName === "member1") {
    return (
      <ProfileCard
        className="w-full h-full"
        member={memberNode.member}
        sizeStyle={memberNode.size}
        colorStyle={memberNode.color}
        onSelect={function (member: ISGUser): void {
          showUserProfileModal(dialogCtx!, member);
        }}
      />
    );
  } else if (memberNode.templateName === "leader_horizontal") {
    return (
      <LeaderCard
        className="w-full h-full"
        member={memberNode.member}
        sizeStyle={memberNode.size}
        colorStyle={memberNode.color}
        onSelect={function (member: ISGUser): void {
          showUserProfileModal(dialogCtx!, member);
        }}
      />
    );
  } else if (memberNode.templateName === "leader_vertical") {
    return (
      <DepartLeaderCard
        className="w-full h-full"
        member={memberNode.member}
        colorStyle={memberNode.color}
        onSelect={function (member: ISGUser): void {
          showUserProfileModal(dialogCtx!, member);
        }}
      />
    );
  } else if (memberNode.templateName === "member_style1_member" || memberNode.templateName === "member_style1_leader1" || memberNode.templateName === "member_style1_leader2" ) {
    return (
      <MemberStyle1PlaceHolder
        className="w-full h-full"
        member={memberNode.member}
        colorStyle={memberNode.color}
        templateName={memberNode.templateName}
        onSelect={function (member: ISGUser): void {
          showUserProfileModal(dialogCtx!, member);
        }}
      />
    );
  } else {
    return null;
  }
}
