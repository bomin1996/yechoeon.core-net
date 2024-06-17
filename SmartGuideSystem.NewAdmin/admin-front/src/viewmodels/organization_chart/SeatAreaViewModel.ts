import {
  GroupSeatType,
  ISGOrganizationChart,
  ISGUser,
} from "@shares/ISGDepartment";
import { makeObservable, observable, runInAction } from "mobx";
import { DropResult } from "react-beautiful-dnd";
// import {
//   DraggableGroupSeatViewModel,
//   TwoLineWithBossGroupSeatViewModel,
// } from "./AbstractGroupSeatViewModels";
import { IGroupSeatViewModel } from "./IGroupSeatViewModel";
import { MemberSeatViewModel } from "./MemberSeatViewModel";
import { TopBossTwoColumnsGroupSeatViewModel } from "./TopBossTwoColumnsGroupSeatViewModel";
import { TwoLineWithBossGroupSeatViewModel } from "./TwoLineWithBossGroupSeatViewModel";
import { splitAB } from "./utils";

export class SeatAreaViewModel {
  totalUserCount(): number {
    const totalMemberCount = this.groupSeats.reduce(
      (sum, group, index) => sum + group.memberCount,
      0
    );
    return totalMemberCount;
  }
  get chartType(): GroupSeatType {
    return "TopBoss_TwoColumns";
  }
  private _selectedGroupSeatViewModel: IGroupSeatViewModel | null = null;

  groupSeats: Array<IGroupSeatViewModel> = [];

  selectedGroup: IGroupSeatViewModel | null = null;
  setSelectedGroup(groupVm: IGroupSeatViewModel | null) {
    this.selectedGroup?.setSelected(false);
    this.selectedGroup = groupVm;
    this.selectedGroup?.setSelected(true);
  }

  get selectedGroupSeatViewModel(): IGroupSeatViewModel | null {
    return this._selectedGroupSeatViewModel;
  }
  set selectedGroupSeatViewModel(item: IGroupSeatViewModel | null) {
    this._selectedGroupSeatViewModel?.setSelected(false);
    this._selectedGroupSeatViewModel = item;
    this._selectedGroupSeatViewModel?.setSelected(true);
  }

  // id:number = 0;
  /////// 편집된 과정보
  officeTel?: string;
  officeFax?: string;
  departJob?: string;

  deptCode: string;
  deptName: string;
  title: string = "";

  name: string = "";
  desc: string = "";

  orgChart?: ISGOrganizationChart;

  deptLeader: ISGUser | null = null;
  topDeptLeader: ISGUser | null = null;

  dontShowTeamDetailButton: boolean = false;

  constructor(
    deptCode: string,
    deptName: string,
    orgChart?: ISGOrganizationChart
  ) {
    this.deptCode = deptCode;
    this.deptName = deptName;
    this.title = deptName;
    this.name = deptName;

    this.orgChart = orgChart;

    makeObservable(this, {
      groupSeats: observable,
      selectedGroup: observable,
      title: observable,
      deptLeader: observable,
      topDeptLeader: observable,
      officeTel: observable,
      officeFax: observable,
      departJob: observable,
      name: observable,
      desc: observable,
      dontShowTeamDetailButton: observable,
    });
  }

  // mouseDown(
  //   clientX: number,
  //   clientY: number,
  //   item: IGroupSeatViewModel
  // ) {
  //   this.selectedGroupSeatViewModel = item;
  //   this.selectedGroup = item;
  //   this._activeItemGroupSeatViewModel = item;
  //   this._activeItemGroupSeatViewModel?.dragger.mouseDown(clientX, clientY);
  // }
  // mouseMove(clientX: number, clientY: number) {
  //   this._activeItemGroupSeatViewModel?.dragger.mouseMove(clientX, clientY);
  // }
  // mouseUp(clientX: number, clientY: number) {
  //   this._activeItemGroupSeatViewModel = null;
  // }

  findGroupSeat(id: string): IGroupSeatViewModel | null {
    const parts = id.split("_");
    if (parts.length > 0) {
      const indexStr = parts[0];
      const index = Number.parseInt(indexStr);
      return this.groupSeats[index];
    }
    return null;
  }

  onDragEnd(result: DropResult) {
    if (result.type === "SeatAreaGroups") {
      if (result.source && result.destination) {
        const srcGroup = this.groupSeats[result.source.index];

        this.groupSeats.splice(result.source.index, 1);
        this.groupSeats.splice(result.destination.index, 0, srcGroup);
      }
      // } else if (result.source && result.destination) {
    } else if (result.destination) {
      const srcGroupVm = this.findGroupSeat(result.source.droppableId);
      const dstGroupVm = this.findGroupSeat(result.destination.droppableId);
      if (srcGroupVm === null || dstGroupVm === null) {
        return;
      }
      const srcMemberArray = SeatAreaViewModel.findMemberSourceArray(
        srcGroupVm,
        result.source.droppableId
      );
      const dstMemberArray = SeatAreaViewModel.findMemberSourceArray(
        dstGroupVm,
        result.destination.droppableId
      );

      // console.log("srcGroup:", srcGroupVm);
      // console.log("srcMemeberArray:", srcMemberArray);
      // console.log("dstMemberArray:", dstMemberArray);

      if (srcMemberArray != dstMemberArray) {
        const srcMember = srcMemberArray[result.source.index];
        // console.log("srcMemeber:", srcMember);
        srcMemberArray.splice(result.source.index, 1);
        dstMemberArray.splice(result.destination.index, 0, srcMember);
      } else {
        const srcMember = srcMemberArray[result.source.index];
        // const dstMember = dstMemberArray[result.destination.index];
        srcMemberArray.splice(result.source.index, 1);
        dstMemberArray.splice(result.destination.index, 0, srcMember);
      }
      console.log("Changed Member!!!");
    } else {
      const srcGroupVm = this.findGroupSeat(result.source.droppableId);
      if (srcGroupVm === null) {
        return;
      }

      const srcMemberArray = SeatAreaViewModel.findMemberSourceArray(
        srcGroupVm,
        result.source.droppableId
      );
      srcMemberArray.splice(result.source.index, 1);
      console.log("Remove Member!!!");
    }
  }

  addSeatGroup(teamName: string, users: Array<ISGUser | null>) {
    const group = new TopBossTwoColumnsGroupSeatViewModel();
    group.title = teamName;
    group.name = teamName;
    let arrayIndex = 0;
    for (let i = 0; i < users.length; i++) {
      const u = users[i];
      if (u !== null) {
        if (u.teamPosition) {
          group.addGroupLeader(u);
        } else {
          group.addMemberToLine(arrayIndex, u);

          if (arrayIndex === 0) {
            arrayIndex = 1;
          } else {
            arrayIndex = 0;
          }
        }
      } else {
        if (arrayIndex === 0) {
          arrayIndex = 1;
        } else {
          arrayIndex = 0;
        }
      }
    }
    runInAction(() => {
      this.groupSeats.push(group);
    });

    return group;
  }

  addSeatToAnyGroup(user: ISGUser, orgGroupName: string) {
    const index = this.groupSeats.findIndex((g) => g.name === orgGroupName);
    if (index != -1) {
      //this.addSeatGroup(orgGroupName, [user]);
      const group = this.groupSeats[index];
      if (user.teamPosition && !group.getLeaderSeat()) {
        group.addGroupLeader(user);
      } else {
        group.addMemberToLine(0, user);
      }
    } else {
      this.addSeatGroup(user.name, [user]);
    }
  }

  removeSeatGroup(groupName: string) {
    const index = this.groupSeats.findIndex((g) => g.name === groupName);
    runInAction(() => {
      this.groupSeats.splice(index, 1);
    });
  }

  removeUserFromGroup(groupName: string, user: ISGUser): boolean {
    const index = this.groupSeats.findIndex((g) => g.name === groupName);
    const group = this.groupSeats[index];
    return group.removeMember(user);
  }

  removeUser(user: ISGUser): boolean {
    // const index = this.groupSeats.findIndex((g)=>{
    //   return null !== g.findFirstSeatDefault((msvm)=>msvm.member.sid === user.sid);
    // })

    // if (index != -1) {
    //   const group = this.groupSeats[index];
    //   group.removeMember()
    // }
    const index = this.groupSeats.findIndex((g) => g.removeMember(user));
    return index !== -1;
  }

  addEmptySeatGroup(teamName: string) {
    const group = new TopBossTwoColumnsGroupSeatViewModel();
    group.title = teamName;
    group.name = teamName;

    runInAction(() => {
      this.groupSeats.push(group);
    });

    return group;
  }

  removeGroup(group: IGroupSeatViewModel) {
    if (this.selectedGroup === group) {
      this.setSelectedGroup(null);
    }

    const index = this.groupSeats.findIndex((g) => g.name === group.name);
    if (index >= 0) {
      this.groupSeats.splice(index, 1);
    }
  }

  createMap() {
    const map = new Set<string>();
    this.groupSeats.forEach((g, i) => {
      map.add(g.name);
      g.getMembers(true).forEach((u) => map.add(u.sid));
    });

    return map;
  }

  static from(organizationChart: ISGOrganizationChart) {
    const vm = new SeatAreaViewModel(
      organizationChart.deptCode,
      organizationChart.title
    );
    // vm.id = organizationChart.id;
    vm.orgChart = organizationChart;

    vm.topDeptLeader = organizationChart.topDeptLeader ?? null;
    vm.deptLeader = organizationChart.deptLeader ?? null;
    vm.title = organizationChart.title;
    vm.officeFax = organizationChart.officeFax;
    vm.deptName = organizationChart.department?.name ?? "";
    vm.deptCode = organizationChart.deptCode;
    vm.officeTel = organizationChart.officeTel;
    vm.departJob = organizationChart.departJob ?? "";

    vm.name = organizationChart.name;
    vm.desc = organizationChart.desc;

    vm.dontShowTeamDetailButton =
      organizationChart.dontShowTeamDetailButton ?? false;

    organizationChart.teams?.forEach((team, idx) => {
      const group = new TopBossTwoColumnsGroupSeatViewModel();
      group.name = team.name;
      group.title = team.title ?? "";
      group.officeFax = team.officeFax ?? "";
      group.officeTel = team.officeTel ?? "";
      group.job = team.jobDescription ?? "";
      group.dontAddTeamWord = team.dontAddTeamWord ?? false;
      group.dontShowTeamDetailButton = team.dontShowTeamDetailButton ?? false;
      team.lines.forEach((users, index) => {
        users.forEach((u) => group.addMemberToLine(index, u));
      });

      if (team.leader) {
        group.addGroupLeader(team.leader);
      }

      vm.groupSeats.push(group);
    });

    return vm;
  }

  static findMemberSourceArray(
    groupSeatViewModel: IGroupSeatViewModel,
    droppableId: string
  ): Array<MemberSeatViewModel> {
    const [_, b] = splitAB(droppableId);
    if (b === "0") {
      return groupSeatViewModel.getLineSeats(0);
    } else if (b === "1") {
      return groupSeatViewModel.getLineSeats(1);
    } else {
      return groupSeatViewModel.getLineSeats(2);
    }
  }
}
