import { createContext, PropsWithChildren } from "react";
import { BaseMarkerViewModel } from "@/viewmodels/floor_map/BaseMarkerViewModel";

export interface IMarkerAreaContextData {
  onMouseDown: (
    pointName: string,
    clientX: number,
    clientY: number,
    item: BaseMarkerViewModel
  ) => void;
}

const MarkerAreaContext = createContext<IMarkerAreaContextData | null>(null);

export default MarkerAreaContext;

interface Props extends PropsWithChildren {
  onMouseDown: (
    pointName: string,
    clientX: number,
    clientY: number,
    item: BaseMarkerViewModel
  ) => void;
}

export function MarkerAreaProvider({ children, onMouseDown }: Props) {
  return (
    <MarkerAreaContext.Provider
      value={{
        onMouseDown: onMouseDown,
      }}
    >
      {children}
    </MarkerAreaContext.Provider>
  );
}
function usetState(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}
