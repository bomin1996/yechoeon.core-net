import { IPositionNode } from './IPositionNode';
import { IPositionItem } from "./IPositionItem";
export interface IGroupContainer extends IPositionNode {
  groupType: GroupType;
  items: Array<IPositionItem>;
}
export type GroupType =
  | "Single"
  | "Vertical"
  | "Horizontal"
  | "TopBoss_TwoColumns"
  | "RightBos_TwoRows"
  | "Horizontal_LeftDirection"
  | "LeftBoss_TowRows";
