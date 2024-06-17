import {
  ISGSCNode,
  ISGSCTeamBannerNode,
  MemberCardColor,
  SCNodeType,
} from "@shares/*";
import { BaseSeatingPlaceViewModel } from "../BaseSeatingPlaceViewModel";
import { makeObservable, observable, runInAction } from "mobx";

export class TeamBannerPlaceViewModel extends BaseSeatingPlaceViewModel {
  title: string = "noname";

  officeTel?: string;
  officeFax?: string;
  jobDescription?: string;

  color: MemberCardColor = "Yellow";
  setCardColor(color: MemberCardColor): void {
    runInAction(() => {
      this.color = color;
    });
  }

  get seatingType(): SCNodeType {
    return "TeamBanner";
  }

  override toNode(): ISGSCNode {
    const node = super.toNode();
    const node2: ISGSCTeamBannerNode = {
      ...node,
      title: this.title,
      officeTel: this.officeTel,
      officeFax: this.officeFax,
      color: this.color,
      jobDescription: this.jobDescription,
    };
    return node2;
  }

  setTemplateName(templateName: string): void {
    runInAction(() => {
      this.templateName = templateName;
    });
  }

  constructor(node?: ISGSCTeamBannerNode) {
    super(node);
    if (node) {
      this.title = node.title;
      this.officeTel = node.officeTel;
      this.officeFax = node.officeFax;
      this.jobDescription = node.jobDescription;
      this.color = node.color;
    }
    makeObservable(this, {
      title: observable,
      officeTel: observable,
      officeFax: observable,
      jobDescription: observable,
      color: observable,
    });
  }
}
