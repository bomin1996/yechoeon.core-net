import { useContext, useState } from "react";
import DialogModal from "../ui/modal/DialogModal";
import { IDialogContextData } from "@/contexts/DialogContext";
import toast, { Toaster } from "react-hot-toast";
import SimpleComboBox from "../ui/dropdown/SimpleComboBox";
import ColorButton from "../ui/button/ColorButton";
import BlockUIContext from "@/contexts/BlockUIContext";
import { DeviceApis } from "@/server/deviceApi";
import { availableKioskTypeTitls, availableKioskTypes } from "@/const";

interface Props {
  onCancel: () => void;
  onOk: () => void;
}

export default function RefreshGroupDeviceModal({ onOk, onCancel }: Props) {
  const [selectedKioskTypeIndex, setSelectedKioskTypeIndex] = useState(0);
  const blockUICtx = useContext(BlockUIContext);
  return (
    <DialogModal
      isOpen={true}
      title="새로고침"
      onOk={() => {
        onOk();
      }}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}
    >
      <div className="w-[500px] h-full flex flex-col text-[#221e1f] p-8 gap-4 ">
        <div className="flex justify-between items-center">
          <span className="text-left">장비타입선택</span>
          <ColorButton
            className="ml-auto mb-2 w-24"
            colorStyle="open"
            title="업데이트"
            onClick={async () => {
              const kiType = availableKioskTypes[selectedKioskTypeIndex];

              blockUICtx?.setBlock(true);
              await DeviceApis.updateKioskType(kiType);
              toast("업데이트 했습니다.");
              blockUICtx?.setBlock(false);
            }}
          />
          <ColorButton
            className="ml-2 mb-2 w-24"
            colorStyle="modify"
            title="새로고침"
            onClick={async () => {
              const kiType = availableKioskTypes[selectedKioskTypeIndex];

              blockUICtx?.setBlock(true);
              await DeviceApis.refreshKioskType(kiType);
              toast("새로고침 했습니다.");
              blockUICtx?.setBlock(false);
            }}
          />
        </div>

        <SimpleComboBox
          className="col-span-4"
          items={availableKioskTypeTitls}
          selectedIdx={selectedKioskTypeIndex}
          onSelectedItem={(it, index) => {
            setSelectedKioskTypeIndex(index);
          }}
        />
      </div>
      <Toaster />
    </DialogModal>
  );
}

export function showRefreshGroupDeviceDialog(
  ctx: IDialogContextData,
  onOk: () => void
): void {
  ctx?.pushDialog(
    <RefreshGroupDeviceModal
      key="showResetPasswordDialog"
      onCancel={() => ctx!.popDialog()}
      onOk={() => {
        ctx!.popDialog();
        onOk();
      }}
    />
  );
}
