import {
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx";

import { GroupType, IGroupContainer } from "./IGroupContainer";
import { IPositionItem } from "./IPositionItem";
import { Dragger, IPositionNode, PositionNodeType } from "./IPositionNode";
import { VerticalGroupContainer } from "./VerticalGroupContainer";
import React from "react";

export class NamePositionItem implements IPositionItem {
  positionType: string;
  tx: number;
  ty: number;
  content: string;
  status: string;
  dragger: Dragger;
  parent?: IGroupContainer;
  isSelected: boolean = false;
  divRef: React.RefObject<HTMLDivElement>;

  get nodeType() : PositionNodeType {
    return "Member";
  }

  constructor(
    tx: number,
    ty: number,
    content: string,
    positionType: string = "",
    status: string = ""
  ) {
    this.tx = tx;
    this.ty = ty;
    this.content = content;
    this.positionType = positionType;
    this.status = status;
    this.dragger = new Dragger(this);

    this.divRef = React.createRef<HTMLDivElement>();
    //makeAutoObservable(this);
    makeObservable(this, {
      tx: observable,
      ty: observable,
      isSelected: observable,
      status: observable,
      content: observable,
    });
  }

  keep() {
    const vg = this.parent as VerticalGroupContainer;
    vg.keep(this);
  }

  close() {
    const vg = this.parent as VerticalGroupContainer;
    vg.close(this);
  }
}

export class GroupContainer implements IGroupContainer {
  tx: number;
  ty: number;
  status: string;
  groupType: GroupType;
  items: IPositionItem[];
  dragger: Dragger;
  isSelected: boolean = false;

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
    makeAutoObservable(this);
  }
}

export class PositionCanvasViewModel {
  groups: Array<IGroupContainer> = [];

  private _selectedItem: IPositionNode | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addGroup(groupType: GroupType) {
    const groupContainer = new VerticalGroupContainer(0, 0, groupType);
    this.groups.push(groupContainer);

    const p1 = new NamePositionItem(0, 0, "T1");
    const p2 = new NamePositionItem(0, 0, "T2");
    const p3 = new NamePositionItem(0, 0, "T3");

    groupContainer.items.push(p1);

    groupContainer.items.push(p2);
    groupContainer.items.push(p3);

    p1.parent = groupContainer;
    p2.parent = groupContainer;
    p3.parent = groupContainer;
  }

  get selectedItem(): IPositionNode | null {
    return this._selectedItem;
  }
  set selectedItem(item: IPositionNode | null) {
    const oldItem = this._selectedItem;
    if (oldItem) {
      oldItem.isSelected = false;
    }
    this._selectedItem = item;
    if (this._selectedItem) {
      this._selectedItem.isSelected = true;
    }
  }

  mouseDown(clientX: number, clientY: number) {
    this.selectedItem?.dragger.mouseDown(clientX, clientY);
  }
  mouseMove(clientX: number, clientY: number) {
    this.selectedItem?.dragger.mouseMove(clientX, clientY);
  }
  mouseMove2(ev: MouseEvent) {
    if (this.selectedItem ) {
      const cx = ev.clientX;
      const cy = ev.clientY;
  
      this.selectedItem.dragger.mouseMove(cx, cy);


      if (this.selectedItem instanceof NamePositionItem) {
        const namePos = this.selectedItem as NamePositionItem;

        if (namePos.divRef && namePos.divRef.current) {
          const div = namePos.divRef.current;
          // const parent = div.parentNode as HTMLDivElement;
  
          const r1 = div.getBoundingClientRect();
          // const r2 = parent.getBoundingClientRect();
    
          //console.log(`clientRect:${JSON.stringify(r1)} / parentRect:${JSON.stringify(r2)}`);

          this.groups.forEach((g, i, arr) => {

            const vg = g as VerticalGroupContainer;

            if (vg.divRef.current) {

              const rrr = vg.divRef.current.getBoundingClientRect();
              if (intersect(r1, rrr)) {
                vg.status = "fly node";
              } else {
                vg.status = "no no no"
              }

            }



          })



        }
      } else {

      }

      



      

      // console.log(`client width:${parent.clientWidth} - height:${parent.clientHeight} clientX:${parent.clientLeft} - clientY:${parent.clientTop}`);
      // console.log(`chidl width:${div.clientWidth} - height:${div.clientHeight} clientX:${div.clientLeft} - clientY:${div.clientTop}`);



      

    }
    
  }
  mouseUp(clientX: number, clientY: number) {
    if (this.selectedItem instanceof NamePositionItem) {
      this.selectedItem.tx = 0;
      this.selectedItem.ty = 0;
      const np = this.selectedItem as NamePositionItem;
      np.close();
    } else if (this.selectedItem instanceof VerticalGroupContainer) {
      const vg = this.selectedItem as VerticalGroupContainer;
      const idx = this.groups.indexOf(vg);

      // loadash 라이브러리를 사용해볼까??


      this.groups.splice(idx, 1);
      this.groups.push(vg);

      this.selectedItem?.dragger.mouseUp(clientX, clientY);
    }
    
    this.selectedItem = null;
  }
}

const canvasViewModel = new PositionCanvasViewModel();
export default canvasViewModel;


function intersect(r1: DOMRect, r2: DOMRect) : boolean {
  if(r1.bottom > r2.top 
    && r1.right > r2.left 
    && r1.top < r2.bottom 
    && r1.left < r2.right) {
        return true;
    }

    return false;
}