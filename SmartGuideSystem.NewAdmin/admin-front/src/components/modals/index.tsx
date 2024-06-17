import { IDialogContextData } from "src/contexts/DialogContext";
import DialogModal from "../ui/modal/DialogModal";
import { ReactNode } from "react";

export { showSelectDepartmentDialog } from "./SelectDepartmentModal";
export { showSelectDeviceDialog } from "./SelectDeviceModal";
export { showSelectMember } from "./SelectTeamMemerModal";
export { showAddNewDevice, showEditDeviceModal } from "./DeviceInfoModal";

export { showAddNewFloorDialog } from "./AddNewFloorModal";

export function showMessageOkCancelDialog(
  ctx: IDialogContextData,
  title: string,
  message: string,
  onOk: () => void,
  onCancel?: () => void,
  okButtonTitle?: string,
  closeMode?: boolean,
  showDeleteBtn?: boolean,
  deleteBtnTitle?: string,
  onDelete?: () => void
): void {
  ctx?.pushDialog(
    <DialogModal
      key="showDeleteFloorDialog"
      isOpen={true}
      title={title}
      okButtonTitle={okButtonTitle}
      closeMode={closeMode}
      showDeleteBtn={showDeleteBtn}
      deleteButtonTitle={deleteBtnTitle}
      onDelete={() => {
        ctx!.popDialog();
        onDelete?.();
      }}
      onOk={() => {
        ctx!.popDialog();
        onOk();
      }}
      onCancel={() => {
        ctx!.popDialog();
        onCancel?.();
      }}
      onClose={() => {
        ctx!.popDialog();
        onCancel?.();
      }}
    >
      <div className="overflow-auto max-w-[800px]  max-h-[700px]">
        {message}
      </div>
    </DialogModal>
  );
}

export function showListItemDialog<T>(
  ctx: IDialogContextData,
  title: string,
  items: T[],
  renderItem: (
    item: T,
    index: number,
    items: T[],
    onClick: (it: T, idx?: number) => void
  ) => ReactNode,
  onClickItem: (item: T, index?: number) => void,
  className?: string
): void {
  ctx?.pushDialog(
    <DialogModal
      key="showListItemDialog"
      isOpen={true}
      title={title}
      closeMode={true}
      onOk={() => {
        ctx!.popDialog();
      }}
      onCancel={() => {
        ctx!.popDialog();
      }}
      onClose={() => {
        ctx!.popDialog();
      }}
    >
      <div
        className={`${className} overflow-y-auto min-w-[600px] max-h-[800px]`}
      >
        {items.map((it, idx, arr) => renderItem(it, idx, arr, onClickItem))}
      </div>
    </DialogModal>
  );
}
