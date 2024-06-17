export type MarkerType = "Department" | "KioskDevice";
export type MarkerActionType = "GotoOrganizationChart";
export interface IMarker {
    get markerType(): MarkerType;
    posX:number;
    posY:number;
    isSelected: boolean;
}

