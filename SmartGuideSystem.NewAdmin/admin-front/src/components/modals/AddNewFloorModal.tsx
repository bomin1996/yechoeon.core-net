import React, { useEffect, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import { IDialogContextData } from "@/contexts/DialogContext";

interface Props {
  isOpen: boolean;
  name?: string;
  description?: string;
  onCancel: () => void;
  onOk: (floorName: string, floorDescription: string) => void;
}

export default function AddNewFloorModal({
  isOpen,
  name,
  description,
  onOk,
  onCancel,
}: Props) {
  const [floorName, setfloorName] = useState("");
  const [floorDescription, setfloorDescription] = useState("");

  const onChangeFfoorDescription = (e: React.FormEvent<HTMLInputElement>) => {
    setfloorDescription(e.currentTarget.value);
    // onCallback(floorName!, floorDescription!);
  };

  const onChangeFloorName = (e: React.FormEvent<HTMLInputElement>) => {
    setfloorName(e.currentTarget.value);
    // onCallback(floorName!, floorDescription!);
  };

  useEffect(() => {
    setfloorName(name ?? "");
    setfloorDescription(description ?? "");
  }, [isOpen]);

  return (
    <DialogModal
      isOpen={isOpen}
      title="층 추가"
      onOk={() => onOk(floorName!, floorDescription!)}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}
    >
      <div className="w-full h-full flex flex-col text-[#221e1f] p-8 gap-4 ">
        {/* 1열 */}
        <p className="text-lg ">층 추가 정보를 입력하세요.</p>
        {/* 2열 */}
        <div className="flex flex-row gap-2 ">
          <div className="basis-1/2">
            <div className="flex flex-col">
              <p className="text-sm">층이름 입력</p>
              <input
                className="h-8 rounded-md px-2 text-sm font-semibold"
                placeholder="층이름"
                onChange={onChangeFloorName}
                value={floorName}
                type="text"
              />
            </div>
          </div>
          <div className="basis-1/2">
            <div className="flex flex-col">
              <p className="text-sm">층설명 입력</p>
              <input
                className="h-8 rounded-md px-2 text-sm font-semibold"
                placeholder="층설명"
                onChange={onChangeFfoorDescription}
                value={floorDescription}
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    </DialogModal>
  );
}

// 층추가
export function showAddNewFloorDialog(
  ctx: IDialogContextData,
  onOk: (nf: string, desc: string) => void
): void {
  ctx?.pushDialog(
    <AddNewFloorModal
      key="AddNewFloorModal"
      name=""
      isOpen={true}
      description=""
      onCancel={() => ctx!.popDialog()}
      onOk={(nf, desc) => {
        ctx!.popDialog();
        onOk(nf, desc);
      }}
    />
  );
}
