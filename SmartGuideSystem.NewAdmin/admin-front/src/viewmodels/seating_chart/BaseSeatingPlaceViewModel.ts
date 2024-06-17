import { makeObservable, observable, runInAction } from "mobx";
import { SeatingChartViewModel } from "./SeatingChartViewModel";
import SgsRect from "@/helpers/SgsRect";
import { ISGSCNode, SCNodeType } from "@shares/*";
import { genPassword } from "@/helpers/genPassword";

export abstract class BaseSeatingPlaceViewModel {
  id: string;
  posX: number = 0;
  posY: number = 0;
  width: number = 200;
  height: number = 200;
  isSelected: boolean = false;
  isActive: boolean = false;
  templateName: string = "none";

  abstract get seatingType(): SCNodeType;

  private _x: number = 0;
  private _y: number = 0;
  private _posX: number = 0;
  private _posY: number = 0;
  startPosX: number = 0;
  startPosY: number = 0;
  private _parentChartViewModel?: SeatingChartViewModel;

  abstract setTemplateName(templateName: string): void;

  toNode(): ISGSCNode {
    const node: ISGSCNode = {
      x: this.posX,
      y: this.posY,
      w: this.width,
      h: this.height,
      id: this.id,
      nodeType: this.seatingType,
      templateName: this.templateName,
    };

    return node;
  }

  setParentChartViewModel(parentChartViewModel?: SeatingChartViewModel) {
    this._parentChartViewModel = parentChartViewModel;
  }

  get snapSize(): number {
    if (this._parentChartViewModel) {
      return this._parentChartViewModel.moveWithSnap
        ? this._parentChartViewModel.snapSize
        : 1;
    } else {
      return 8;
    }
  }

  rectangle(): SgsRect {
    return new SgsRect(this.posX, this.posY, this.width, this.height);
  }

  constructor(node?: ISGSCNode) {
    if (node) {
      this.id = node.id;
      this.posX = node.x;
      this.posY = node.y;
      this.width = node.w;
      this.height = node.h;
      this.templateName = node.templateName;
    } else {
      const uuid = genPassword();
      this.id = uuid;
    }

    makeObservable(this, {
      posX: observable,
      posY: observable,
      width: observable,
      height: observable,
      isSelected: observable,
      templateName: observable,
      isActive: observable,
    });
  }

  mouseDown(x: number, y: number) {
    this._x = x;
    this._y = y;
    this._posX = this.posX;
    this._posY = this.posY;

    this.startPosX = this.posX;
    this.startPosY = this.posY;
  }

  mouseMove(x: number, y: number): { dx: number; dy: number } {
    const dx = x - this._x;
    const dy = y - this._y;

    this._posX += dx;
    this._posY += dy;

    const oldX = this.posX;
    const oldY = this.posY;

    runInAction(() => {
      this.posX = Math.floor(this._posX / this.snapSize) * this.snapSize;
      this.posY = Math.floor(this._posY / this.snapSize) * this.snapSize;
    });

    this._x = x;
    this._y = y;

    return { dx: this.posX - oldX, dy: this.posY - oldY };
  }

  mouseMove2(x: number, y: number) {
    runInAction(() => {
      this.posX += x;
      this.posY += y;
    });
  }

  mouseMoveBy(dx: number, dy: number) {
    runInAction(() => {
      this.posX += dx;
      this.posY += dy;
    });
  }

  mouseUp(x: number, y: number) {}

  setSize(w: number, h: number) {
    runInAction(() => {
      this.width = w;
      this.height = h;
    });
  }

  setSelected(selected: boolean) {
    runInAction(() => {
      this.isSelected = selected;
    });
  }

  setTemplateType(templateType: string) {
    runInAction(() => {});
  }

  arrangeWith(
    target: BaseSeatingPlaceViewModel,
    dir: "left" | "right" | "up" | "down",
    snapSize: number
  ) {
    switch (dir) {
      case "left":
        this.posX = target.posX - this.width - snapSize;
        this.posY = target.posY;
        break;
      case "right":
        this.posX = target.posX + target.width + snapSize;
        this.posY = target.posY;
        break;

      case "up":
        this.posX = target.posX;
        this.posY = target.posY - target.height - snapSize;
        break;

      case "down":
        this.posX = target.posX;
        this.posY = target.posY + target.height + snapSize;
        break;
    }
  }

  swapPosition(target: BaseSeatingPlaceViewModel) {
    const x1 = this.posX;
    const y1 = this.posY;
    const x2 = target.posX;
    const y2 = target.posY;

    runInAction(() => {
      this.posX = x2;
      this.posY = y2;
      target.posX = x1;
      target.posY = y1;
    });
  }

  movePosition(x: number, y: number) {
    runInAction(() => {
      this.posX = x;
      this.posY = y;
    });
  }
}
