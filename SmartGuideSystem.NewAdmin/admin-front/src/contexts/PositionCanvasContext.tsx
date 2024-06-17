import { createContext, PropsWithChildren } from "react";
import { IPositionNode } from "@/types/organization_chart/IPositionNode";

export interface IPositionContextData {
  onMouseDown: (clientX: number, clientY: number, item: IPositionNode) => void;
}

const PositionCanvasContext = createContext<IPositionContextData | null>(null);

export default PositionCanvasContext;
interface Props extends PropsWithChildren {
  onMouseDown: (clientX: number, clientY: number, item: IPositionNode) => void;
}
export function PositionCanvasProvider({ children, onMouseDown }: Props) {
  return (
    <PositionCanvasContext.Provider value={{ onMouseDown: onMouseDown }}>
      {children}
    </PositionCanvasContext.Provider>
  );
}
