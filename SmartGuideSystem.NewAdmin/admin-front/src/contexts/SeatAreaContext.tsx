import React, { createContext, PropsWithChildren, useState } from "react";
import { IGroupSeatViewModel } from "@/viewmodels/organization_chart/IGroupSeatViewModel";

export interface IPlaceHolderInfo {
  clientX: number;
  clientY: number;
  clientWidth: number;
  clientHeight: number;
  srcIndex?: number;
  dstIndex?: number;
}
export interface IPositionContextData {
  placeHolderInfo?: IPlaceHolderInfo;
  onMouseDown: (
    clientX: number,
    clientY: number,
    item: IGroupSeatViewModel
  ) => void;
  setPlaceHolderInfo?: (placeHolderInfo: IPlaceHolderInfo) => void;
  addMemberFromGroupSeat: (
    group: IGroupSeatViewModel,
    lineIndex: number
  ) => void;
}

const SeatAreaContext = createContext<IPositionContextData | null>(null);

export default SeatAreaContext;
interface Props extends PropsWithChildren {
  onMouseDown: (
    clientX: number,
    clientY: number,
    item: IGroupSeatViewModel
  ) => void;
  placeHolderInfo?: IPlaceHolderInfo;
  addMemberFromGroupSeat: (
    group: IGroupSeatViewModel,
    lineIndex: number
  ) => void;
}
export function SeatAreaProvider({
  children,
  onMouseDown,
  placeHolderInfo,
  addMemberFromGroupSeat,
}: Props) {
  // const [placeHolderInfo, setPlaceHolderInfo] = useState<IPlaceHolderInfo>();
  return (
    <SeatAreaContext.Provider
      value={{
        onMouseDown: onMouseDown,
        placeHolderInfo: placeHolderInfo,
        addMemberFromGroupSeat: addMemberFromGroupSeat,
      }}
    >
      {children}
    </SeatAreaContext.Provider>
  );
}
