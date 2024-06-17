import {
  ISGSCMemberNode,
  ISGSCNode,
  ISGUser,
  MemberCardColor,
  MemberCardSize,
  SCNodeType,
} from "@shares/*";
import { BaseSeatingPlaceViewModel } from "../BaseSeatingPlaceViewModel";
import { makeObservable, observable, runInAction } from "mobx";
import { memberSizeTable } from "../MemberSizeTable";

export class MemberSeatingPlaceViewModel extends BaseSeatingPlaceViewModel {
  title: string = "noname";
  member: ISGUser;

  size: MemberCardSize = "Large"; //
  color: MemberCardColor = "Yellow";

  // officeTel?: string;
  // officeFax?: string;
  // jobDescription?: string;
  // grade?: string;

  updateStatus: string = "";

  get seatingType(): SCNodeType {
    return "Member";
  }

  override toNode(): ISGSCNode {
    const node = super.toNode();
    const node2: ISGSCMemberNode = {
      ...node,
      member: this.member,
      color: this.color,
      size: this.size,
      title: this.title,
      // grade: this.grade,
      // officeTel: this.officeTel,
      // officeFax: this.officeFax,
      // jobDescription: this.jobDescription,
    };
    return node2;
  }

  setTemplateName(templateName: string): void {
    runInAction(() => {
      this.templateName = templateName;
      this.setCardSize(this.size);
    });
  }

  updateCardSize() {
    // switch (this.templateName) {
    //   case TemplateNames.template_member1:
    //     {
    //       switch (this.size) {
    //         case "Large":
    //           this.width = 169;
    //           this.height = 86;
    //           break;
    //         case "Medium":
    //           this.width = 150;
    //           this.height = 77;
    //           break;
    //         case "Small":
    //           this.width = 105;
    //           this.height = 53;
    //           break;
    //       }
    //     }
    //     break;
    //   case TemplateNames.template_leader_horizontal:
    //     {
    //       switch (this.size) {
    //         case "Large":
    //           this.width = 264;
    //           this.height = 129;
    //           break;
    //         case "Medium":
    //           this.width = 235;
    //           this.height = 115;
    //           break;
    //         case "Small":
    //           this.width = 208;
    //           this.height = 100;
    //           break;
    //       }
    //     }
    //     break;
    //   case TemplateNames.template_leader_vertical:
    //     {
    //       this.width = 154;
    //       this.height = 198;
    //     }
    //     break;
    // }
    const sizeTable = memberSizeTable.get(this.templateName);
    const memberSize = sizeTable?.get(this.size);

    this.width = memberSize?.w ?? 100;
    this.height = memberSize?.h ?? 100;
  }

  setCardSize(size: MemberCardSize): void {
    runInAction(() => {
      this.size = size;
      this.updateCardSize();
    });
  }
  setCardColor(color: MemberCardColor): void {
    runInAction(() => {
      this.color = color;
    });
  }

  setMemberSource(member: ISGUser) {
    runInAction(() => {
      this.member = { ...member };
      this.title = member.name;
    });
  }

  constructor(member: ISGUser, node?: ISGSCMemberNode) {
    super(node);
    if (!node) {
      this.member = member;
      this.title = member.name;
      // this.grade = member.teamPosition ?? member.positionName ?? "주무관";
      // this.officeTel = member.officeTel;
      // this.officeFax = member.officeFax;
      // this.jobDescription = member.jobDescription;
    } else {
      this.member = node.member;
      this.color = node.color;
      this.size = node.size;

      this.title = node.title ?? node.member.name;
      // this.grade = node.grade;
      // this.officeFax = node.officeFax;
      // this.officeTel = node.officeTel;
      // this.jobDescription = node.jobDescription;

      this.updateCardSize();
    }
    makeObservable(this, {
      title: observable,
      size: observable,
      color: observable,
      member: observable,
      // officeTel: observable,
      // officeFax: observable,
      // grade: observable,
      // jobDescription: observable,
      updateStatus: observable,
    });
  }
}
