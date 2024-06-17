import { GroupSeatType } from "@shares/*";
import { TwoLineWithBossGroupSeatViewModel } from "./TwoLineWithBossGroupSeatViewModel";

export class TopBossTwoColumnsGroupSeatViewModel extends TwoLineWithBossGroupSeatViewModel {
  override get groupSeatType(): GroupSeatType {
    return "TopBoss_TwoColumns";
  }
}
