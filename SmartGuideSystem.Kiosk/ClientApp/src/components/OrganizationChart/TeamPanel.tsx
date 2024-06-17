import React, { useContext } from "react";
import OrganizationChartContext from "src/contexts/OrganizationChartContext";
import LeaderCard from "./Profile/LeaderCard";
import {
  ISGTeam,
  ISGUser,
  MemberCardColor,
  MemberCardSize,
} from "@shares/ISGTeam";
import ProfileCard from "./Profile/ProfileCard";
import ColorInfoButton from "../ui/buttons/ColorInfoButton";

const colorStyles: MemberCardColor[] = [
  "Yellow",
  "Blue",
  "Green",
  "Mint",
  "Orange",
  "Red",
];

interface Props {
  team: ISGTeam;
  teamIndex: number;
  sizeStyle: MemberCardSize;
}
export default function TeamPanel({ team, teamIndex, sizeStyle }: Props) {
  const oragizationContext = useContext(OrganizationChartContext);
  const handleSelectMember = (member: ISGUser) => {
    oragizationContext?.onSelectedMember(member);
  };
  const handleTeamMember = (teamInfo: ISGTeam) => {
    oragizationContext?.onSelectedTeam(teamInfo);
  };
  const mergeUsers: Array<ISGUser> = [];
  for (
    let i = 0;
    i < Math.max(team.lines[0]?.length ?? 0, team.lines[1]?.length ?? 0);
    i++
  ) {
    if (team.lines[0] && team.lines[0].length > i) {
      mergeUsers.push(team.lines[0][i]);
    }
    if (team.lines[1] && team.lines[1].length > i) {
      mergeUsers.push(team.lines[1][i]);
    }
  }

  const leftMembers = team.lines[0] ?? [];
  const rightMembers = team.lines[1] ?? [];

  const colorStyle = colorStyles[teamIndex % colorStyles.length];

  return (
    <div className="">
      <ColorInfoButton
        colorStyle={colorStyle}
        title={team.dontAddTeamWord ? team.name : team.name + "팀"}
        onClick={() => {
          handleTeamMember(team);
        }}
      />
      <div className="w-full  justify-items-start mt-[16px] grid grid-cols-2 gap-y-[16px] gap-x-[12px] ">
        {team.leader && (
          <LeaderCard
            className=" col-span-2"
            teamIndex={teamIndex}
            sizeStyle={sizeStyle}
            onSelect={() => handleSelectMember(team.leader!)}
            member={team.leader!}
          />
        )}

        <div className="flex flex-col space-y-[12px] ">
          {leftMembers.map((member, index) => (
            <ProfileCard
              key={member.sid}
              teamIndex={teamIndex}
              sizeStyle={sizeStyle}
              onSelect={() => handleSelectMember(member)}
              className=""
              member={member}
            />
          ))}
        </div>

        <div className="flex flex-col space-y-[12px] ">
          {rightMembers.map((member, index) => (
            <ProfileCard
              key={member.sid}
              teamIndex={teamIndex}
              sizeStyle={sizeStyle}
              onSelect={() => handleSelectMember(member)}
              className=""
              member={member}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
