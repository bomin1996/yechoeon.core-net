import { useEffect, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import NoramlListBox from "@/components/ui/listbox/NoramlListBox";
import { ISGContentLayout } from "@shares/";
import { IDialogContextData } from "@/contexts/DialogContext";
import { ContentApi } from "@/server/contentApi";

interface Props {
  onCancel?: () => void;
  onOk: (contentLayout: ISGContentLayout) => void;
}

export default function SelectContentLayoutModal({ onCancel, onOk }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [inputFilter, setInputFilter] = useState("");
  const [contentLayouts, setContentLayouts] = useState<ISGContentLayout[]>([]);

  const hendleSelect = (title: string, index: number) => {
    setSelectedIndex(index);
  };

  const queryLayouts = async () => {
    const { result, error } = await ContentApi.contentLayoutList();
    if (!error) {
      setContentLayouts(result);
    }
  };

  useEffect(() => {
    queryLayouts();
  }, []);

  const filteredList = contentLayouts.filter((o) =>
    o.name.includes(inputFilter)
  );
  const titles = filteredList.map((o) => o.name);

  return (
    <DialogModal
      isOpen={true}
      title="레이아웃 검색"
      onOk={() => {
        const chart = filteredList[selectedIndex];
        onOk(chart);
      }}
      onCancel={() => onCancel?.()}
      onClose={() => onCancel?.()}
      canOk={selectedIndex !== -1}
    >
      <div className="w-full h-full flex flex-col text-[#221e1f] items-center ">
        {/* 1열 */}
        <p className="text-lg mb-2">레이아웃을 선택해주세요.</p>
        {/* 2열 */}
        <div className="flex flex-col h-[430px] w-[300px] ">
          <input
            autoFocus
            type="text"
            value={inputFilter}
            onChange={(ev) => {
              setInputFilter(ev.target.value);
            }}
            className="px-3 py-1 mb-4 rounded-md text-lg focus:shadow outline-green-500/50 focus:outline"
          />
          <NoramlListBox
            titles={titles}
            selectedIndex={selectedIndex}
            onSelect={hendleSelect}
            className="h-[370px]"
          />
        </div>
      </div>
    </DialogModal>
  );
}

export function showSelectContentLayoutPopup(
  ctx: IDialogContextData,
  onOk: (contentLayout: ISGContentLayout) => void,
  onCancel?: () => void
): void {
  ctx?.pushDialog(
    <SelectContentLayoutModal
      onCancel={() => {
        ctx?.popDialog();
        onCancel?.();
      }}
      onOk={(contentLayout) => {
        ctx?.popDialog();
        onOk(contentLayout);
      }}
    />
  );
}
