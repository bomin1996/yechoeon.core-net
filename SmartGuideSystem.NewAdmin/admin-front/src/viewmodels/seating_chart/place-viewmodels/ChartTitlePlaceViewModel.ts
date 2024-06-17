import { ISGSCChartTitleNode, ISGSCNode, SCNodeType } from "@shares/*";
import { BaseSeatingPlaceViewModel } from "../BaseSeatingPlaceViewModel";
import { makeObservable, observable, runInAction } from "mobx";

export class ChartTitlePlaceViewModel extends BaseSeatingPlaceViewModel {
  title: string = "noname";

  fontWeight: number = 400;
  fontSize: number = 20;

  get seatingType(): SCNodeType {
    return "ChartTitle";
  }

  override toNode(): ISGSCNode {
    // const node: ISGSCChartTitleNode = {
    //   x: this.posX,
    //   y: this.posY,
    //   w: this.width,
    //   h: this.height,
    //   id: this.id,
    //   nodeType: this.seatingType,
    //   templateName: this.templateName,
    //   title: this.title,
    //   fontSize: this.fontSize,
    //   fontWeight: this.fontWeight,
    // };

    const node = super.toNode();
    const node2: ISGSCChartTitleNode = {
      ...node,
      title: this.title,
      fontSize: this.fontSize,
      fontWeight: this.fontWeight,
    };
    node2.w = this.title?.length * this.fontSize;
    node2.h = this.fontSize * 1.5;
    return node2;
  }

  setTemplateName(templateName: string): void {
    runInAction(() => {
      this.templateName = templateName;
    });
  }

  setTitleFontSize(fontSize: number): void {
    runInAction(() => {
      this.fontSize = fontSize;
    });
  }

  setTitleFontWeight(fontWeight: number): void {
    runInAction(() => {
      this.fontWeight = fontWeight;
    });
  }

  constructor(node?: ISGSCChartTitleNode) {
    super(node);
    if (!node) {
    } else {
      this.title = node.title;
      this.fontSize = node.fontSize;
      this.fontWeight = node.fontWeight;
    }
    makeObservable(this, {
      title: observable,
      fontWeight: observable,
      fontSize: observable,
    });
  }
}
