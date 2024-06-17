import { GroupSeatType, ISGUser } from "@shares/*";
import { makeObservable, observable } from "mobx";
import { BaseGroupSeatViewModel } from "./BaseGroupSeatViewModel";
import { IGroupSeatViewModel } from "./IGroupSeatViewModel";
import { MemberSeatViewModel } from "./MemberSeatViewModel";

export abstract class TwoLineWithBossGroupSeatViewModel
  extends BaseGroupSeatViewModel
  implements IGroupSeatViewModel
{
  members1: Array<MemberSeatViewModel> = [];
  members2: Array<MemberSeatViewModel> = [];
  members3: Array<MemberSeatViewModel> = [];

  abstract get groupSeatType(): GroupSeatType;

  addSeat(seatVm: MemberSeatViewModel): void {
    throw new Error("Not supported.");
  }
  addGroupLeaderSeat(seatVm: MemberSeatViewModel): void {
    if (this.members3.length > 0) {
      this.members3[0] = seatVm;
    } else {
      this.members3.push(seatVm);
    }
  }
  removeMemberSeat(seatVm: MemberSeatViewModel): boolean {
    let foundIndex = -1;
    foundIndex = this.members3.findIndex((m) => m === seatVm);
    if (foundIndex !== -1) {
      this.members3.splice(foundIndex, 1);
      return true;
    }

    foundIndex = this.members1.findIndex((m) => m === seatVm);
    if (foundIndex !== -1) {
      this.members1.splice(foundIndex, 1);
      return true;
    }

    foundIndex = this.members2.findIndex((m) => m === seatVm);
    if (foundIndex !== -1) {
      this.members2.splice(foundIndex, 1);
      return true;
    }

    return false;
  }
  addMember(member: ISGUser): void {
    throw new Error("Not supported.");
  }
  addGroupLeader(leader: ISGUser): void {
    const seatVm = new MemberSeatViewModel(leader);
    this.addGroupLeaderSeat(seatVm);
  }

  removeMember(member: ISGUser): boolean {
    let foundIndex = -1;
    foundIndex = this.members3.findIndex((m) => m.member.sid === member.sid);
    if (foundIndex !== -1) {
      this.members3.splice(foundIndex, 1);
      return true;
    }

    foundIndex = this.members1.findIndex((m) => m.member.sid === member.sid);
    if (foundIndex !== -1) {
      this.members1.splice(foundIndex, 1);
      return true;
    }

    foundIndex = this.members2.findIndex((m) => m.member.sid === member.sid);
    if (foundIndex !== -1) {
      this.members2.splice(foundIndex, 1);
      return true;
    }

    return false;
  }

  addSeatToLine(lineIndex: number, seatVm: MemberSeatViewModel): void {
    if (lineIndex === 0) {
      this.members1.push(seatVm);
    } else if (lineIndex === 1) {
      this.members2.push(seatVm);
    } else if (lineIndex === 2) {
      this.addGroupLeaderSeat(seatVm);
    }
  }

  filterSeats(
    predicate: (msvm: MemberSeatViewModel) => boolean
  ): Array<MemberSeatViewModel> {
    const result1 = this.members1.filter(predicate);
    const result2 = this.members2.filter(predicate);
    const result3 = this.members3.filter(predicate);
    return [...result1, ...result2, ...result3];
  }
  findFirstSeatDefault(
    predicate: (msvm: MemberSeatViewModel) => boolean
  ): MemberSeatViewModel | null {
    let index = this.members1.findIndex((m, i) => predicate(m));
    if (index !== -1) {
      return this.members1[index];
    }
    index = this.members2.findIndex((m, i) => predicate(m));
    if (index !== -1) {
      return this.members2[index];
    }
    index = this.members3.findIndex((m, i) => predicate(m));
    if (index !== -1) {
      return this.members3[index];
    }

    return null;
  }

  addMemberToLine(lineIndex: number, member: ISGUser): void {
    const seatVm = new MemberSeatViewModel(member);
    this.addSeatToLine(lineIndex, seatVm);
  }

  getSeats(containLeader: boolean): MemberSeatViewModel[] {
    if (containLeader) {
      return [...this.members1, ...this.members2, ...this.members3];
    } else {
      return [...this.members1, ...this.members2];
    }
  }
  getLineSeats(lineIndex: number): MemberSeatViewModel[] {
    if (lineIndex === 0) {
      return this.members1;
    } else if (lineIndex === 1) {
      return this.members2;
    } else if (lineIndex === 2) {
      return this.members3;
    }

    throw new Error("Invalid lineIndex");
  }
  getMembers(containLeader: boolean): ISGUser[] {
    const allSeats = this.getSeats(containLeader);
    const users = allSeats.map((msvm) => msvm.member);
    return users;
  }
  getLineMembers(lineIndex: number): ISGUser[] {
    return this.getLineSeats(lineIndex).map((svm) => svm.member);
  }

  getLeaderSeat(): MemberSeatViewModel | null {
    if (this.members3.length > 0) {
      return this.members3[0];
    } else {
      return null;
    }
  }
  getLeaderMember(): ISGUser | null {
    const msvm = this.getLeaderSeat();
    if (msvm) {
      return msvm.member;
    } else {
      return null;
    }
  }

  get memberCount(): number {
    return this.members1.length + this.members2.length + this.members3.length;
  }

  constructor() {
    super();
    makeObservable(this, {
      members1: observable,
      members2: observable,
      members3: observable,
    });
  }
}
