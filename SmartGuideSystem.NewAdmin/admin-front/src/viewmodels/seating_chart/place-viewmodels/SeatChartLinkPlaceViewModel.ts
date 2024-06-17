import {
  ISGSCNode,
  MemberCardColor,
  MemberCardSize,
  ISGSCLinkNode,
  SCNodeType,
  LinkClickAction,
} from "@shares/*";
import { BaseSeatingPlaceViewModel } from "../BaseSeatingPlaceViewModel";
import { makeObservable, observable, runInAction } from "mobx";
import { memberSizeTable } from "../MemberSizeTable";

export class SeatChartLinkPlaceViewModel extends BaseSeatingPlaceViewModel {
  title: string = "noname";
  size: MemberCardSize = "Large"; //
  color: MemberCardColor = "Yellow";
  clickAction: LinkClickAction = "ShowSeatPosChart";
  chartId?: number;
  chartName?: string;

  setCardSize(size: MemberCardSize): void {
    runInAction(() => {
      this.size = size;
      //this.updateCardSize();
    });
  }

  setCardColor(color: MemberCardColor): void {
    runInAction(() => {
      this.color = color;
    });
  }

  updateCardSize() {
    const sizeTable = memberSizeTable.get(this.templateName);
    const memberSize = sizeTable?.get(this.size);
    this.width = memberSize?.w ?? 297;
    this.height = memberSize?.h ?? 89;
  }

  get seatingType(): SCNodeType {
    return "Link";
  }

  override toNode(): ISGSCNode {
    const node = super.toNode();
    const node2: ISGSCLinkNode = {
      ...node,
      title: this.title,
      color: this.color,
      size: this.size,
      clickAction: this.clickAction,
      chartId: this.chartId,
      chartName: this.chartName,
    };
    return node2;
  }

  setTemplateName(templateName: string): void {
    runInAction(() => {
      this.templateName = templateName;
    });
  }

  constructor(node?: ISGSCLinkNode) {
    super(node);
    if (node) {
      this.title = node.title;
      this.color = node.color;
      this.size = node.size;
      this.clickAction = node.clickAction;
      this.chartId = node.chartId;
      this.chartName = node.chartName;
    }
    makeObservable(this, {
      title: observable,
      color: observable,
      size: observable,
      clickAction: observable,
      chartId: observable,
      chartName: observable,
    });
  }
}
