import { IUndoRedoCommand } from "@/commands/IUndoRedoCommand";
import { BaseSeatingPlaceViewModel } from "../BaseSeatingPlaceViewModel";
import { runInAction } from "mobx";
import { PosType } from "./MoveNodeCommand";

// type PosType = {
//   x: number;
//   y: number;
// };

export class ChangePosNodeCommand implements IUndoRedoCommand {
  name: string = "ChangePosNodeCommand";
  nodes: Array<BaseSeatingPlaceViewModel>;
  srcPositions: Array<PosType>;
  dstPositions: Array<PosType>;

  constructor(
    items: Array<BaseSeatingPlaceViewModel>,
    dstPositions: Array<PosType>
  ) {
    this.nodes = [...items];

    this.srcPositions = this.nodes.map((it) => {
      const pos: PosType = {
        x: it.posX,
        y: it.posY,
      };
      return pos;
    });
    this.dstPositions = dstPositions;
  }

  canExecute(state?: any) {
    return true;
  }
  execute(state?: any) {
    this.redo();
  }
  redo() {
    runInAction(() => {
      this.nodes.forEach((node, index) => {
        const dstPos = this.dstPositions[index];
        node.posX = dstPos.x;
        node.posY = dstPos.y;
      });
    });
  }
  undo(state?: any) {
    runInAction(() => {
      this.nodes.forEach((node, index) => {
        const srcPos = this.srcPositions[index];

        node.posX = srcPos.x;
        node.posY = srcPos.y;
      });
    });
  }
}
