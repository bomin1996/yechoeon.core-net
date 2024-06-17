import { ISGUser } from "@shares/*";
import { IGroupSeatViewModel } from "./IGroupSeatViewModel";
import { SeatType } from "./SeatType";

export class MemberSeatViewModel {
  seatPositionType: SeatType = "Member";
  member: ISGUser;
  parentGroupSeat?: IGroupSeatViewModel;
  constructor(member: ISGUser) {
    this.member = member;
  }
}
