import { useState } from "react";
import { IDialogContextData } from "@/contexts/DialogContext";
import DialogModal from "../ui/modal/DialogModal";

interface Props {
  title: string;
  inputText?: string;
  onOk: (input: string) => void;
  onCancel: () => void;
}

export default function InputModal({
  title,
  inputText = "",
  onCancel,
  onOk,
}: Props) {
  const [text, setText] = useState(inputText);

  return (
    <DialogModal
      isOpen={true}
      title={title}
      canOk={text !== ""}
      onOk={() => {
        onOk(text);
      }}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}>
      <div className="w-full h-full flex flex-col text-[#221e1f] p-8 gap-4">
        <input
          className="text-lg px-2 py-2 rounded-md"
          type="text"
          value={text}
          onChange={(ev) => setText(ev.target.value)}
        />
      </div>
    </DialogModal>
  );
}

export function showInputDialog(
  ctx: IDialogContextData,
  title: string,
  onOk: (input: string) => void,
  onCancel?: () => void,
  initText: string = ""
) {
  ctx?.pushDialog(
    <InputModal
      inputText={initText}
      title={title}
      onOk={(input) => {
        ctx!.popDialog();
        onOk(input);
      }}
      onCancel={() => {
        ctx!.popDialog();
        if (onCancel) {
          onCancel();
        }
      }}
    />
  );
}
