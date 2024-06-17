import { NamePositionItem } from "./PositionCanvasViewModel";

export interface IPosition {
  tx: number;
  ty: number;
  status: string;
}

export interface IPositionNode {
  isSelected: boolean;
  dragger: Dragger;
  parent?: IPositionNode;
 
  get nodeType() : PositionNodeType;
}

export type PositionNodeType = "Member" | "Group" | "Placeholder" | "Empty";

export class Dragger {
  startX: number = 0;
  startY: number = 0;
  prevX: number = 0;
  prevY: number = 0;

  parentPositionItem: IPosition;

  constructor(parentPositionItem: IPosition) {
    this.parentPositionItem = parentPositionItem;
  }

  snapshot() {


    if (this.parentPositionItem instanceof NamePositionItem) {

      const np = this.parentPositionItem as NamePositionItem;
      if (np.divRef.current) {

        // const drr = np.divRef.current.getBoundingClientRect();
        // const drrp = np.divRef.current.parentElement!.getBoundingClientRect();
        // this.parentPositionItem.tx = (drrp.left - drr.left);
        // this.parentPositionItem.ty = (drrp.top - drr.top);
        const op = np.divRef.current.offsetParent as HTMLDivElement;
        const dv = np.divRef.current;

        
        // const pb = op.getBoundingClientRect();
        // const cb = dv.getBoundingClientRect();


        const fc = op.firstElementChild as HTMLElement;
        
        this.parentPositionItem.tx = dv.offsetLeft - fc.offsetLeft;
        this.parentPositionItem.ty = dv.offsetTop - fc.offsetTop;


        console.log('off h1', op.offsetHeight)
        console.log('off h2', dv.offsetHeight)
        console.log("snapshot Div:Rect", JSON.stringify(dv.getBoundingClientRect()) )
        console.log("snapshot OP:Rect", JSON.stringify(op.getBoundingClientRect()) )

        console.log("snapshot:" + np.divRef.current.offsetLeft + "/" +np.divRef.current.offsetTop)
      }


    }
  }

  mouseDown(x: number, y: number) {
    this.startX = x;
    this.startY = y;
    this.prevX = x;
    this.prevY = y;

    this.parentPositionItem.status = "startDragging";

    
  }

  mouseMove(x: number, y: number) {
    this.parentPositionItem.status = "dragging";

    const dx = x - this.prevX;
    const dy = y - this.prevY;

    this.parentPositionItem.tx += dx;
    this.parentPositionItem.ty += dy;

    this.prevX = x;
    this.prevY = y;
  }

  mouseUp(x: number, y: number) {
    this.parentPositionItem.status = "stopDragging";
  }

  get transformStyle() {
    return {
      transform: `translate3d(${this.parentPositionItem.tx}px, ${this.parentPositionItem.ty}px, 0)`,
      zIndex: this.parentPositionItem.status === "dragging" ? 4000 : 0,
    };
  }
}
