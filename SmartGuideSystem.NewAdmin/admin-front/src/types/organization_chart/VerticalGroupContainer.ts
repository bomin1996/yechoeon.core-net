import { makeObservable, observable } from "mobx";
import React from "react";
import { GroupType, IGroupContainer } from "./IGroupContainer";
import { IPositionItem } from "./IPositionItem";
import { Dragger, PositionNodeType } from "./IPositionNode";
import { NamePositionItem } from "./PositionCanvasViewModel";

export class VerticalGroupContainer implements IGroupContainer {
    tx: number;
    ty: number;
    status: string;
    groupType: GroupType;
    items: IPositionItem[];
    dragger: Dragger;
    isSelected: boolean = false;
    divRef: React.RefObject<HTMLDivElement>;

    placeHolder: NamePositionItem | null = null;
    activeItem: NamePositionItem | null = null;
    pindex: number | null = null;


    get nodeType() : PositionNodeType {
      return "Group";
    }
  
    constructor(
      tx: number,
      ty: number,
      groupType: GroupType,
      status: string = ""
    ) {
      this.tx = tx;
      this.ty = ty;
      this.groupType = groupType;
      this.status = status;
      this.items = [];
      this.dragger = new Dragger(this);
      this.divRef = React.createRef<HTMLDivElement>();
      //makeAutoObservable(this);
      makeObservable(this, {
        tx: observable,
        ty: observable,
        isSelected: observable,
        status: observable,
        items: observable,
      });
    }

    keep (item: NamePositionItem) {

        this.activeItem = item;

        const ph = new NamePositionItem(0, 0, "PlaceHolder");

        this.placeHolder = ph;

        const idx = this.items.indexOf(item);
        this.pindex = idx;

        this.activeItem = item;

        this.items[idx] = ph;
        this.items.push(item);



    }

    close (item: NamePositionItem) {

        this.items.pop();
        this.items[this.pindex!] = item;

        this.activeItem = null;
        this.pindex = null;
        this.placeHolder = null;
    }

}