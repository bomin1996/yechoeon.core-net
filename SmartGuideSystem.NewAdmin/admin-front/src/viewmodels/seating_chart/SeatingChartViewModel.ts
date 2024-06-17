import { UndoRedoStack } from "./../../commands/UndoRedoStack";
import {
  ISGDepartment,
  ISGSCChartEntranceNode,
  ISGSCChartTitleNode,
  ISGSCLinkNode,
  ISGSCMemberNode,
  ISGSCNode,
  ISGSCTeamBannerNode,
  ISGSeatPosChart,
  ISGUser,
  MemberCardColor,
  MemberCardSize,
} from "@shares/*";
import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseSeatingPlaceViewModel } from "./BaseSeatingPlaceViewModel";
import SgsRect from "@/helpers/SgsRect";
import { AreaDragger } from "./AreaDragger";
import { MemberSeatingPlaceViewModel } from "./place-viewmodels/MemberSeatingPlaceViewModel";
import { TeamBannerPlaceViewModel } from "./place-viewmodels/TeamBannerPlaceViewModel";
import { ChartTitlePlaceViewModel } from "./place-viewmodels/ChartTitlePlaceViewModel";
import { TemplateNames } from "./TempateNames";
import { EntrancePlaceViewModel } from "./place-viewmodels/EntrancePlaceViewModel";
import { SeatChartLinkPlaceViewModel } from "./place-viewmodels/SeatChartLinkPlaceViewModel";
import { MoveNodeCommand, PosType } from "./commands/MoveNodeCommand";
import { AddNodeCommand } from "./commands/AddNodeCommand";
import { RemoveNodeCommand } from "./commands/RemoveNodeCommand";
import { ChangePosNodeCommand } from "./commands/ChangePosNodeCommand";

interface OptionData {
  teamColor: MemberCardColor;
  memberSize: MemberCardSize;
  leaderSize: MemberCardSize;
  leaderTemplate: string;
  addTemplate: string;
}

export class SeatingChartViewModel {
  // width: number = 1920;
  // height: number = 1080;
  width: number = 1920 - 20;
  height: number = 1080 - 20 - 120;
  // width: number = 1080;
  // height: number = 1920;
  snapSize: number = 10;
  placeItems: Array<BaseSeatingPlaceViewModel> = [];
  selectedItems: Array<BaseSeatingPlaceViewModel> = [];

  activeItem?: BaseSeatingPlaceViewModel;
  lastSelectedItem?: BaseSeatingPlaceViewModel;
  areaDragger: AreaDragger = new AreaDragger();

  seatPosChart?: ISGSeatPosChart;
  name: string = "";
  desc?: string;
  deptCode: string = "";
  deptName: string = "";
  title?: string = "";

  officeTel: string = "";
  officeFax: string = "";
  jobDescription: string = "";

  department?: ISGDepartment;

  moveWithSnap: boolean = true;
  enableUserMove: boolean = true;
  showGrid: boolean = true;

  optionData?: OptionData;

  undoRedoStack = new UndoRedoStack();

  constructor() {
    makeObservable(this, {
      width: observable,
      height: observable,
      snapSize: observable,
      placeItems: observable,
      activeItem: observable,
      lastSelectedItem: observable,
      name: observable,
      desc: observable,
      title: observable,
      moveWithSnap: observable,
      enableUserMove: observable,
      showGrid: observable,

      officeTel: observable,
      officeFax: observable,
      jobDescription: observable,

      selectedItems: observable,
    });
  }

  setMoveWithSnap(moveWithSnap: boolean) {
    runInAction(() => {
      this.moveWithSnap = moveWithSnap;
    });
  }

  setEnableUserMove(enableUserMove: boolean) {
    runInAction(() => {
      this.enableUserMove = enableUserMove;
    });
  }

  setSnapSize(snapSize: number) {
    runInAction(() => {
      this.snapSize = snapSize;
      this.title = `${snapSize}`;
    });
  }

  selection(): Array<BaseSeatingPlaceViewModel> {
    return this.placeItems.filter((item) => item.isSelected);
  }

  addSelection(item: BaseSeatingPlaceViewModel, beforeClearAll: boolean) {
    runInAction(() => {
      if (beforeClearAll) {
        this.resetSelection();
      }
      item.setSelected(true);
      this.lastSelectedItem = item;
      this.selectedItems.push(item);
    });
  }

  resetSelection() {
    this.placeItems.forEach((it) => it.setSelected(false));
    this.lastSelectedItem = undefined;
    this.selectedItems.splice(0, this.selectedItems.length);
  }

  removeSelection() {
    runInAction(() => {
      const selection = this.selection();
      this.resetSelection();
      // selection.forEach((item) => {
      //   const index = this.placeItems.findIndex((it) => it === item);
      //   this.placeItems.splice(index, 1);
      // });
      this.undoRedoStack.execute(new RemoveNodeCommand(this, [...selection]));
    });
  }

  mouseDownItem(item: BaseSeatingPlaceViewModel, x: number, y: number) {
    //this.clearSelection();

    runInAction(() => {
      this.activeItem = item;

      if (!item.isSelected) {
        // this.resetSelection();
        // item.setSelected(true);
        this.addSelection(item, true);
      }

      this.selection().forEach((item) => item.mouseDown(x, y));
    });
  }

  mouseMove(x: number, y: number) {
    if (this.activeItem) {
      if (!this.enableUserMove) {
        return;
      }
      const { dx, dy } = this.activeItem.mouseMove(x, y);
      this.selection().forEach((item) => {
        if (item !== this.activeItem) {
          item.mouseMoveBy(dx, dy);
        }
        // item.mouseMove(x, y);
      });
    } else if (this.areaDragger.isDragging) {
      this.areaDragger.dragging(x, y);
    }
  }
  mouseUp(x: number, y: number) {
    if (this.activeItem) {
      this.activeItem.mouseUp(x, y);
      this.activeItem = undefined;

      if (this.selection().length > 0) {
        const command = new MoveNodeCommand(this.selection());
        if (command.hasDeltaPosition()) {
          this.undoRedoStack.addCommand(command);
        }
      }
    }
    if (this.areaDragger.isDragging) {
      this.areaDragger.endDragging(x, y);
      this.resetSelection();
      const dragRect = this.areaDragger.rectangle();
      this.placeItems.forEach((item) => {
        const rect = item.rectangle();
        // if (dragRect.containsRect(rect)) {
        if (dragRect.intersectRect(rect)) {
          item.setSelected(true);
          runInAction(() => {
            this.selectedItems.push(item);
          });
        } else {
          item.setSelected(false);
        }
      });

      if (this.selectedItems.length > 0) {
        runInAction(() => {
          this.lastSelectedItem = this.selectedItems[0];
        });
      }
    }
  }

  startDrag(x: number, y: number) {
    this.resetSelection();
    this.areaDragger.startDragging(x, y);
  }

  addItem(item: BaseSeatingPlaceViewModel) {
    this.placeItems.push(item);
    item.setParentChartViewModel(this);
  }

  addMemberItem(
    user: ISGUser,
    dir?: "left" | "right" | "up" | "down"
  ): MemberSeatingPlaceViewModel {
    runInAction(() => {
      const memberSVm = new MemberSeatingPlaceViewModel(user);
      memberSVm.setCardColor("Yellow");
      memberSVm.setCardSize("Small");
      memberSVm.setTemplateName(TemplateNames.template_member1);

      memberSVm.title = user.name;

      let x = 100;
      let y = 100;

      //const selection = this.selection();
      //const last = selection[selection.length - 1];
      const last = this.lastSelectedItem;
      const snap = this.moveWithSnap ? this.snapSize : 0;
      if (last) {
        if (dir) {
          if (last.seatingType === "Member") {
            const lastMemvm = last as MemberSeatingPlaceViewModel;
            memberSVm.setTemplateName(lastMemvm.templateName);
            memberSVm.setCardColor(lastMemvm.color);
            memberSVm.setCardSize(lastMemvm.size);
          }
          switch (dir) {
            case "left":
              x = last.posX - memberSVm.width - snap;
              y = last.posY;
              break;
            case "right":
              x = last.posX + last.width + snap;
              y = last.posY;
              break;
            case "up":
              x = last.posX;
              y = last.posY - memberSVm.height - snap;
              break;
            case "down":
              x = last.posX;
              y = last.posY + last.height + snap;
              break;
          }
        } else {
          x = last.posX + 50;
          y = last.posY + 50;
        }
      }

      memberSVm.posX = x;
      memberSVm.posY = y;

      // memberSVm.setParentChartViewModel(this);
      // this.placeItems.push(memberSVm);
      this.undoRedoStack.execute(new AddNodeCommand(this, [memberSVm]));

      this.addSelection(memberSVm, false);
    });

    const memberVm = this.lastSelectedItem as MemberSeatingPlaceViewModel;
    return memberVm;
  }

  addSeatGroup(
    groupName: string,
    users: Array<ISGUser>,
    option?: "1Rows" | "1Columns" | "2Rows" | "2Columns"
  ) {
    if (!option) {
      option = "1Rows";
    }
    this.resetSelection();

    runInAction(() => {
      const addedItems: Array<BaseSeatingPlaceViewModel> = [];

      const snapSize = this.moveWithSnap ? this.snapSize : 0;
      const index = users.findIndex((user) => user.teamPosition);
      const teamLeader = index !== -1 ? users[index] : undefined;
      const teamMembers = users.filter((user) => !user.teamPosition);
      const color = "Yellow";
      const size = "Small";

      const tvm = new TeamBannerPlaceViewModel();
      tvm.templateName = TemplateNames.template_banner1;
      tvm.posX = 200;
      tvm.posY = 200;
      tvm.width = 157;
      tvm.height = 42;
      tvm.title = groupName;

      // tvm.setParentChartViewModel(this);
      // this.placeItems.push(tvm);
      // this.addSelection(tvm, false);
      addedItems.push(tvm);

      let current: BaseSeatingPlaceViewModel = tvm;

      if (teamLeader) {
        const lvm = new MemberSeatingPlaceViewModel(teamLeader);
        lvm.color = color;
        lvm.size = size;
        lvm.templateName = TemplateNames.template_leader_horizontal;

        // lvm.setParentChartViewModel(this);
        // this.placeItems.push(lvm);
        // this.addSelection(lvm, false);
        addedItems.push(lvm);

        lvm.updateCardSize();
        lvm.arrangeWith(current, "down", snapSize);

        current = lvm;
      }

      for (let index = 0; index < teamMembers.length; index++) {
        const m = teamMembers[index];
        const mvm = new MemberSeatingPlaceViewModel(m);
        mvm.color = color;
        mvm.size = size;
        mvm.templateName = TemplateNames.template_member1;
        // mvm.setParentChartViewModel(this);
        // this.placeItems.push(mvm);
        mvm.updateCardSize();
        // this.addSelection(mvm, false);
        addedItems.push(mvm);

        const columnIndex = index % 2;

        if (option === "1Columns") {
          mvm.arrangeWith(current, "down", snapSize);
          current = mvm;
        } else if (option === "1Rows") {
          mvm.arrangeWith(current, "right", snapSize);
          current = mvm;
        } else if (option === "2Columns") {
          if (columnIndex === 0) {
            mvm.arrangeWith(current, "down", snapSize);
            current = mvm;
          } else if (columnIndex === 1) {
            mvm.arrangeWith(current, "right", snapSize);
          }
        } else if (option === "2Rows") {
          if (columnIndex === 0) {
            mvm.arrangeWith(current, "right", snapSize);
            current = mvm;
          } else if (columnIndex === 1) {
            mvm.arrangeWith(current, "down", snapSize);
          }
        }
      }

      if (addedItems.length > 0) {
        this.undoRedoStack.execute(new AddNodeCommand(this, addedItems));
        addedItems.forEach((m) => this.addSelection(m, false));
      }
    });
  }

  addTeamByOption(
    groupName: string,
    users: Array<ISGUser>,
    option: OptionData
  ) {
    this.resetSelection();

    runInAction(() => {
      const addedItems: Array<BaseSeatingPlaceViewModel> = [];

      const snapSize = this.moveWithSnap ? this.snapSize : 0;
      const teamMembers = users.filter((user) => !user.teamPosition);
      const index = users.findIndex((user) => user.teamPosition);
      const teamLeader = index !== -1 ? users[index] : undefined;
      const color = option.teamColor;
      // const size = "Small";

      const tvm = new TeamBannerPlaceViewModel();
      tvm.templateName = TemplateNames.template_banner1;
      tvm.posX = 200;
      tvm.posY = 200;
      tvm.width = 157;
      tvm.height = 42;
      tvm.title = groupName;
      tvm.color = option.teamColor;

      // tvm.setParentChartViewModel(this);
      // this.placeItems.push(tvm);
      // this.addSelection(tvm, false);
      addedItems.push(tvm);

      let current: BaseSeatingPlaceViewModel = tvm;

      if (teamLeader) {
        const lvm = new MemberSeatingPlaceViewModel(teamLeader);
        lvm.color = color;
        lvm.size = option.leaderSize;
        lvm.templateName = option.leaderTemplate;

        // lvm.setParentChartViewModel(this);
        // this.placeItems.push(lvm);
        // this.addSelection(lvm, false);
        addedItems.push(lvm);

        lvm.updateCardSize();
        lvm.arrangeWith(current, "down", snapSize);
        current = lvm;
      }

      for (let index = 0; index < teamMembers.length; index++) {
        const m = teamMembers[index];
        const mvm = new MemberSeatingPlaceViewModel(m);
        mvm.color = color;
        mvm.size = option.memberSize;
        mvm.templateName = TemplateNames.template_member1;

        // mvm.setParentChartViewModel(this);
        // this.placeItems.push(mvm);
        // this.addSelection(mvm, false);
        addedItems.push(mvm);

        mvm.updateCardSize();
        const columnIndex = index % 2;

        if (option.addTemplate === "1Columns") {
          mvm.arrangeWith(current, "down", snapSize);
          current = mvm;
        } else if (option.addTemplate === "1Rows") {
          mvm.arrangeWith(current, "right", snapSize);
          current = mvm;
        } else if (option.addTemplate === "2Columns") {
          if (columnIndex === 0) {
            mvm.arrangeWith(current, "down", snapSize);
            current = mvm;
          } else if (columnIndex === 1) {
            mvm.arrangeWith(current, "right", snapSize);
          }
        } else if (option.addTemplate === "2Rows") {
          if (columnIndex === 0) {
            mvm.arrangeWith(current, "right", snapSize);
            current = mvm;
          } else if (columnIndex === 1) {
            mvm.arrangeWith(current, "down", snapSize);
          }
        }
      }

      if (addedItems.length > 0) {
        this.undoRedoStack.execute(new AddNodeCommand(this, addedItems));
        addedItems.forEach((m) => this.addSelection(m, false));
      }

      this.optionData = option;
    });
  }

  addTeamBannerItem(tempName?: string): TeamBannerPlaceViewModel {
    runInAction(() => {
      let x = 100;
      let y = 100;

      const last = this.placeItems[this.placeItems.length - 1];
      if (last) {
        x = last.posX + 50;
        y = last.posY + 50;
      }

      const memberSVm = new TeamBannerPlaceViewModel();
      memberSVm.setTemplateName(tempName ?? TemplateNames.template_banner1);
      memberSVm.posX = x;
      memberSVm.posY = y;
      memberSVm.width = 270;
      memberSVm.height = 60;
      memberSVm.setParentChartViewModel(this);
      this.placeItems.push(memberSVm);

      this.addSelection(memberSVm, false);
    });

    const vm = this.lastSelectedItem as TeamBannerPlaceViewModel;
    return vm;
  }

  addTitleBannerItem() {
    runInAction(() => {
      let x = 100;
      let y = 100;

      const last = this.placeItems[this.placeItems.length - 1];
      if (last) {
        x = last.posX + 50;
        y = last.posY + 50;
      }

      const itemVm = new ChartTitlePlaceViewModel();
      itemVm.setTemplateName(TemplateNames.template_title1_horizontal);
      itemVm.posX = x;
      itemVm.posY = y;
      itemVm.width = 157;
      itemVm.height = 42;
      itemVm.title = this.department?.name ?? "부서이름";
      itemVm.setParentChartViewModel(this);
      this.placeItems.push(itemVm);
      this.addSelection(itemVm, false);
    });
  }

  addEntranceItem(templateName: string) {
    runInAction(() => {
      let x = 100;
      let y = 100;

      const last = this.placeItems[this.placeItems.length - 1];
      if (last) {
        x = last.posX + 50;
        y = last.posY + 50;
      }

      const itemVm = new EntrancePlaceViewModel();
      itemVm.setTemplateName(templateName);
      itemVm.posX = x;
      itemVm.posY = y;
      itemVm.width = 100;
      itemVm.height = 100;
      itemVm.setParentChartViewModel(this);
      this.placeItems.push(itemVm);
    });
  }

  addLinkItem(templateName: string) {
    runInAction(() => {
      let x = 100;
      let y = 100;

      const last = this.placeItems[this.placeItems.length - 1];
      if (last) {
        x = last.posX + 50;
        y = last.posY + 50;
      }

      const itemVm = new SeatChartLinkPlaceViewModel();
      itemVm.setTemplateName(templateName);
      itemVm.posX = x;
      itemVm.posY = y;
      itemVm.width = 300;
      itemVm.height = 90;
      itemVm.setParentChartViewModel(this);
      this.placeItems.push(itemVm);
    });
  }

  removeItem(item: BaseSeatingPlaceViewModel) {
    const index = this.placeItems.findIndex((it) => it === item);
    if (index !== -1) {
      item.setParentChartViewModel(undefined);
      this.placeItems.splice(index, 1);
    }
  }

  removeMember(member: ISGUser) {
    const index = this.placeItems.findIndex((it) => {
      if (it.seatingType === "Member") {
        const memberVm = it as MemberSeatingPlaceViewModel;
        if (memberVm.member.sid === member.sid) {
          return true;
        }
      }

      return false;
    });

    if (index !== -1) {
      // runInAction(() => {
      //   this.placeItems[index].setParentChartViewModel(undefined);
      //   this.placeItems.splice(index, 1);
      // });
      this.undoRedoStack.execute(
        new RemoveNodeCommand(this, [this.placeItems[index]])
      );
    }
  }

  alignLeft() {
    const selection = this.selection();
    if (selection.length < 2) {
      return;
    }

    runInAction(() => {
      let min = 9999;
      selection.forEach((node) => {
        min = Math.min(min, node.posX);
      });

      const positions: Array<PosType> = [];
      selection.forEach((node) => {
        //node.posX = min;
        positions.push({ x: min, y: node.posY });
      });

      this.undoRedoStack.execute(
        new ChangePosNodeCommand([...selection], positions)
      );
    });
  }

  alignRight() {
    const selection = this.selection();
    if (selection.length < 2) {
      return;
    }

    runInAction(() => {
      let max = 0;
      selection.forEach((node) => {
        max = Math.max(max, node.posX + node.width);
      });

      const positions: Array<PosType> = [];
      selection.forEach((node) => {
        const right = node.posX + node.width;
        // node.posX = node.posX + (max - right);
        positions.push({ x: node.posX + (max - right), y: node.posY });
      });

      this.undoRedoStack.execute(
        new ChangePosNodeCommand([...selection], positions)
      );
    });
  }

  alignTop() {
    const selection = this.selection();
    if (selection.length < 2) {
      return;
    }

    runInAction(() => {
      let min = 9999;
      selection.forEach((node) => {
        min = Math.min(min, node.posY);
      });
      const positions: Array<PosType> = [];
      selection.forEach((node) => {
        //node.posY = min;
        positions.push({ x: node.posX, y: min });
      });

      this.undoRedoStack.execute(
        new ChangePosNodeCommand([...selection], positions)
      );
    });
  }

  alignBottom() {
    const selection = this.selection();
    if (selection.length < 2) {
      return;
    }

    runInAction(() => {
      let max = 0;
      selection.forEach((node) => {
        max = Math.max(max, node.posY + node.height);
      });
      const positions: Array<PosType> = [];
      selection.forEach((node) => {
        const bottom = node.posY + node.height;
        //node.posY = node.posY + (max - bottom);
        positions.push({ x: node.posX, y: node.posY + (max - bottom) });
      });
      this.undoRedoStack.execute(
        new ChangePosNodeCommand([...selection], positions)
      );
    });
  }

  arrangeHorizontalRight() {
    const selection = this.selection();
    if (selection.length < 2) {
      return;
    }

    const snap = this.moveWithSnap ? this.snapSize : 0;
    runInAction(() => {
      selection.sort((a, b) => a.posX - b.posX);
      let startX = selection[0].posX;
      const posY = selection[0].posY;
      const positions: Array<PosType> = [];
      selection.forEach((node) => {
        // node.posX = startX;
        // node.posY = posY;
        positions.push({ x: startX, y: posY });
        startX += node.width;
        startX += snap;
      });

      this.undoRedoStack.execute(
        new ChangePosNodeCommand([...selection], positions)
      );
    });
  }

  arrangeVerticalBottom() {
    const selection = this.selection();
    if (selection.length < 2) {
      return;
    }

    const snap = this.moveWithSnap ? this.snapSize : 0;
    runInAction(() => {
      selection.sort((a, b) => a.posY - b.posY);
      const posX = selection[0].posX;
      let startY = selection[0].posY;
      const positions: Array<PosType> = [];

      selection.forEach((node) => {
        // node.posX = posX;
        // node.posY = startY;
        positions.push({ x: posX, y: startY });
        startY += node.height;
        startY += snap;
      });

      this.undoRedoStack.execute(
        new ChangePosNodeCommand([...selection], positions)
      );
    });
  }

  createMap() {
    const map = new Set<string>();
    this.placeItems.forEach((item, index) => {
      if (item.seatingType === "Member") {
        const memberSeatingChartVM = item as MemberSeatingPlaceViewModel;
        map.add(memberSeatingChartVM.member.sid);
      }
    });

    return map;
  }

  static from(seatChart: ISGSeatPosChart) {
    const vm = new SeatingChartViewModel();

    vm.seatPosChart = seatChart;
    vm.name = seatChart.name;
    vm.desc = seatChart.desc;
    vm.department = seatChart.department;
    vm.deptCode = seatChart.deptCode;
    vm.deptName = seatChart.deptName;
    vm.title = seatChart.title;

    vm.officeTel = seatChart.officeTel ?? "";
    vm.officeFax = seatChart.officeFax ?? "";
    vm.jobDescription = seatChart.jobDescription ?? "";

    vm.width = seatChart.width ?? 1920;
    vm.height = seatChart.height ?? 1080;

    seatChart.nodes?.forEach((node) => {
      // if (node.nodeType === "Member") {
      //   const memberNode = node as ISGSCMemberNode;
      //   const memberVM = new MemberSeatingPlaceViewModel(
      //     memberNode.member,
      //     memberNode
      //   );
      //   vm.addItem(memberVM);
      // } else if (node.nodeType === "TeamBanner") {
      //   const bannerNode = node as ISGSCTeamBannerNode;
      //   const bnodeVm = new TeamBannerPlaceViewModel(bannerNode);
      //   vm.addItem(bnodeVm);
      // } else if (node.nodeType === "ChartTitle") {
      //   const titleNode = node as ISGSCChartTitleNode;
      //   const titleVM = new ChartTitlePlaceViewModel(titleNode);
      //   vm.addItem(titleVM);
      // } else if (node.nodeType === "Entrance") {
      //   const entranceNode = node as ISGSCChartEntranceNode;
      //   const entranceVM = new EntrancePlaceViewModel(entranceNode);
      //   vm.addItem(entranceVM);
      // } else if (node.nodeType === "Link") {
      //   const linkNode = node as ISGSCLinkNode;
      //   const linkVm = new SeatChartLinkPlaceViewModel(linkNode);
      //   vm.addItem(linkVm);
      // }
      const nodeVM = SeatingChartViewModel.createNodeViewModel(node);
      if (nodeVM) {
        vm.addItem(nodeVM);
      }
    });

    return vm;
  }

  static createNodeViewModel(
    node: ISGSCNode
  ): BaseSeatingPlaceViewModel | undefined {
    if (node.nodeType === "Member") {
      const memberNode = node as ISGSCMemberNode;
      const memberVM = new MemberSeatingPlaceViewModel(
        memberNode.member,
        memberNode
      );
      return memberVM;
    } else if (node.nodeType === "TeamBanner") {
      const bannerNode = node as ISGSCTeamBannerNode;
      const bnodeVm = new TeamBannerPlaceViewModel(bannerNode);
      return bnodeVm;
    } else if (node.nodeType === "ChartTitle") {
      const titleNode = node as ISGSCChartTitleNode;
      const titleVM = new ChartTitlePlaceViewModel(titleNode);
      return titleVM;
    } else if (node.nodeType === "Entrance") {
      const entranceNode = node as ISGSCChartEntranceNode;
      const entranceVM = new EntrancePlaceViewModel(entranceNode);
      return entranceVM;
    } else if (node.nodeType === "Link") {
      const linkNode = node as ISGSCLinkNode;
      const linkVm = new SeatChartLinkPlaceViewModel(linkNode);
      return linkVm;
    }
  }

  static createEmptyMember(): ISGUser {
    return {
      sid: "",
      name: "홍길동",
      deptCode: "",
      deptName: "",
      deptDescription: "",
      jobDescription: "",
      useYn: true,
    };
  }
  // static createNode(member:ISGUser, templateName:string, x: number, y:number): MemberSeatingPlaceViewModel {
  //   const mvm = new MemberSeatingPlaceViewModel(member);
  //   mvm.posX = x;
  //   mvm.posY = y;
  //   mvm.templateName = templateName;

  // }

  updateMemberByDB(source: ISGUser[], option: UpdateOption) {
    runInAction(() => {
      const memberItems = (
        option.isUpdateAll ? this.placeItems : this.selectedItems
      ).filter((it) => it.seatingType === "Member");

      for (let i = 0; i < memberItems.length; i++) {
        const mvm = memberItems[i] as MemberSeatingPlaceViewModel;
        const idx = source.findIndex((user) => user.sid === mvm.member.sid);
        if (idx === -1) {
          mvm.updateStatus = "Deleted";
          continue;
        }
        const user = source[idx];
        const modifiedMember = { ...mvm.member };
        let isModified = false;
        if (option.isUpdatePhoto && modifiedMember.photo !== user.photo) {
          modifiedMember["photo"] = user.photo;
          isModified = true;
        }

        if (
          option.isUpdateGrade &&
          modifiedMember.teamPosition !== user.teamPosition
        ) {
          modifiedMember["teamPosition"] = user.teamPosition;
          isModified = true;
        }

        if (
          option.isUpdateGrade &&
          modifiedMember.positionName !== user.positionName
        ) {
          modifiedMember["positionName"] = user.positionName;
          isModified = true;
        }

        if (
          option.isUpdateGrade &&
          modifiedMember.profileGrade !== user.profileGrade
        ) {
          modifiedMember["profileGrade"] = user.profileGrade;
          isModified = true;
        }

        if (
          option.isUpdateTeamName &&
          modifiedMember.teamName !== user.teamName
        ) {
          modifiedMember["teamName"] = user.teamName;
          isModified = true;
        }

        if (
          option.isUpdateOfficeTel &&
          modifiedMember.officeTel !== user.officeTel
        ) {
          modifiedMember["officeTel"] = user.officeTel;
          isModified = true;
        }
        if (
          option.isUpdateOfficeFax &&
          modifiedMember.officeFax !== user.officeFax
        ) {
          modifiedMember["officeFax"] = user.officeFax;
          isModified = true;
        }
        if (
          option.isUpdateJobDescription &&
          modifiedMember.jobDescription !== user.jobDescription
        ) {
          modifiedMember["jobDescription"] = user.jobDescription;
          isModified = true;
          modifiedMember["profileJobDescription"] = user.profileJobDescription;
        }
        if (
          option.isUpdateJobDescription &&
          modifiedMember.profileJobDescription !== user.profileJobDescription
        ) {
          isModified = true;
          modifiedMember["profileJobDescription"] = user.profileJobDescription;
        }

        mvm.member = modifiedMember;
        mvm.updateStatus = isModified ? "Updated" : "";
      }
    });
  }

  changeNodeMember(source: MemberSeatingPlaceViewModel, user: ISGUser) {
    source.setMemberSource(user);
  }

  copyToClipboard() {
    throw new Error("Method not implemented.");
  }

  copyFrom(vm: SeatingChartViewModel) {
    runInAction(() => {
      this.width = vm.width;
      this.height = vm.height;

      vm.placeItems.forEach((item) => {
        const iNode = item.toNode();
        const nodeVM = SeatingChartViewModel.createNodeViewModel(iNode);
        if (nodeVM) {
          if (nodeVM.seatingType === "Member") {
            const memberVM = nodeVM as MemberSeatingPlaceViewModel;
            memberVM.member = SeatingChartViewModel.createEmptyMember();
          }

          this.addItem(nodeVM);
        }
      });
    });
  }
}

interface UpdateOption {
  isUpdateAll: boolean;
  isUpdatePhoto: boolean;
  isUpdateGrade: boolean;
  isUpdateTeamName: boolean;

  isUpdateOfficeTel: boolean;
  isUpdateOfficeFax: boolean;
  isUpdateJobDescription: boolean;
}
// const seatingViewModel = new SeatingChartViewModel();
// seatingViewModel.test();
// export { seatingViewModel };
