import { ISGSCChartEntranceNode, ISGSCNode, SCNodeType } from "@shares/*";
import { BaseSeatingPlaceViewModel } from "../BaseSeatingPlaceViewModel";
import { makeObservable, observable, runInAction } from "mobx";

export class EntrancePlaceViewModel extends BaseSeatingPlaceViewModel {
  title: string = "출입문";

  fontWeight: number = 500;
  fontSize: number = 18;
  iconName: string = "";

  get seatingType(): SCNodeType {
    return "Entrance";
  }

  override toNode(): ISGSCNode {
    const node = super.toNode();
    const node2: ISGSCChartEntranceNode = {
      ...node,
      title: this.title,
      fontSize: this.fontSize,
      fontWeight: this.fontWeight,
      iconName: this.iconName,
    };

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

  constructor(node?: ISGSCChartEntranceNode) {
    super(node);
    if (!node) {
    } else {
      this.title = node.title;
      this.fontSize = node.fontSize;
      this.fontWeight = node.fontWeight;
      this.iconName = node.iconName ?? "";
    }
    makeObservable(this, {
      title: observable,
      fontWeight: observable,
      fontSize: observable,
      iconName: observable,
    });
  }
}
