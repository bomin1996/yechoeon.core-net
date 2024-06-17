import { GroupSeatType, ISGUser } from "@shares/*";
import { MemberSeatViewModel } from "./MemberSeatViewModel";

export interface IGroupSeatProperties {
  title: string;
  name: string;

  officeTel: string;
  officeFax: string;
  job: string;

  isSelected: boolean;

  dontAddTeamWord?: boolean;
  dontShowTeamDetailButton?: boolean;

  setSelected(selected: boolean): void;

  get groupSeatType(): GroupSeatType;
}

export interface IGroupSeatMember {
  addSeat(seatVm: MemberSeatViewModel): void;
  addGroupLeaderSeat(seatVm: MemberSeatViewModel): void;
  removeMemberSeat(seatVm: MemberSeatViewModel): boolean;

  addMember(member: ISGUser): void;
  addGroupLeader(leader: ISGUser): void;
  removeMember(member: ISGUser): boolean;

  addSeatToLine(lineIndex: number, seatVm: MemberSeatViewModel): void;
  addMemberToLine(lineIndex: number, member: ISGUser): void;

  /////////////////////////////////////////////////////////////
  filterSeats(
    predicate: (msvm: MemberSeatViewModel) => boolean
  ): Array<MemberSeatViewModel>;
  findFirstSeatDefault(
    predicate: (msvm: MemberSeatViewModel) => boolean
  ): MemberSeatViewModel | null;

  getSeats(cotainLeader: boolean): Array<MemberSeatViewModel>;
  getLineSeats(lineIndex: number): Array<MemberSeatViewModel>;
  getLeaderSeat(): MemberSeatViewModel | null;

  getMembers(cotainLeader: boolean): Array<ISGUser>;
  getLineMembers(lineIndex: number): Array<ISGUser>;
  getLeaderMember(): ISGUser | null;

  get memberCount(): number;
}

export interface IGroupSeatViewModel
  extends IGroupSeatMember,
    IGroupSeatProperties {}
