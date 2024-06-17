import { makeObservable, observable, runInAction } from "mobx";
import { GroupSeatType } from "@shares/GroupSeatType";
import { IGroupSeatProperties } from "./IGroupSeatViewModel";

export abstract class BaseGroupSeatViewModel implements IGroupSeatProperties {
  title: string = "";
  name: string = "";
  officeTel: string = "";
  officeFax: string = "";
  job: string = "";
  isSelected: boolean = false;
  dontAddTeamWord: boolean = false;
  dontShowTeamDetailButton: boolean = false;

  setSelected(selected: boolean): void {
    runInAction(() => {
      this.isSelected = selected;
    });
  }
  abstract get groupSeatType(): GroupSeatType;

  constructor() {
    makeObservable(this, {
      isSelected: observable,
      title: observable,
      officeTel: observable,
      officeFax: observable,
      job: observable,
      dontAddTeamWord: observable,
      dontShowTeamDetailButton: observable,
    });
  }
}
