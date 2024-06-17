import { IUndoRedoCommand } from "@/commands/IUndoRedoCommand";
import { BaseSeatingPlaceViewModel } from "../BaseSeatingPlaceViewModel";
import { runInAction } from "mobx";

export type PosType = {
  x: number;
  y: number;
};

export class MoveNodeCommand implements IUndoRedoCommand {
  name: string = "MoveNodeCommand";
  nodes: Array<BaseSeatingPlaceViewModel>;
  srcPositions: Array<PosType>;
  dstPositions: Array<PosType>;

  constructor(items: Array<BaseSeatingPlaceViewModel>) {
    this.nodes = [...items];

    this.srcPositions = this.nodes.map((it) => {
      const pos: PosType = {
        x: it.startPosX,
        y: it.startPosY,
      };
      return pos;
    });

    this.dstPositions = this.nodes.map((it) => {
      const pos: PosType = {
        x: it.posX,
        y: it.posY,
      };
      return pos;
    });
  }

  canExecute(state?: any) {
    return true;
  }
  execute(state?: any) {
    this.redo();
  }
  redo() {
    this.nodes.forEach((node, index) => {
      const dstPos = this.dstPositions[index];
      node.movePosition(dstPos.x, dstPos.y);
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

  hasDeltaPosition(): boolean {
    for (let i = 0; i < this.srcPositions.length; i++) {
      const srcPos = this.srcPositions[i];
      const dstPos = this.dstPositions[i];

      if (srcPos.x !== dstPos.x || srcPos.y != dstPos.y) {
        return true;
      }
    }

    return false;
  }
}
