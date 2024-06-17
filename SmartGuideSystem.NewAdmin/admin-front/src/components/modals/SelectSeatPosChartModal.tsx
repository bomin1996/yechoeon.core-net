import { useEffect, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import NoramlListBox from "../ui/listbox/NoramlListBox";
import { ISGSeatPosChart } from "@shares/";
import { IDialogContextData } from "@/contexts/DialogContext";
import { seatPosChatApis } from "@/server/seatPosChatApis";

interface Props {
  isOpen: boolean;
  name?: string;
  description?: string;
  onCancel?: () => void;
  onOk: (seatPosChart: ISGSeatPosChart) => void;
}

export default function SelectSeatPosChartModal({
  isOpen,
  name,
  description,
  onCancel,
  onOk,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [inputFilter, setInputFilter] = useState("");
  const [seatPosCharts, setSeatPosCharts] = useState<ISGSeatPosChart[]>([]);

  const hendleSelect = (title: string, index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    seatPosChatApis
      .seatPosChatList()
      .then((charts) => setSeatPosCharts(charts))
      .catch((exc) => {});
  }, []);

  const filteredList = seatPosCharts.filter((o) =>
    o.name.includes(inputFilter)
  );
  const titles = filteredList.map((o) => o.name);

  return (
    <DialogModal
      isOpen={isOpen}
      title="배치도 검색"
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
        <p className="text-lg mb-2">배치도를 선택해주세요.</p>
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

export function showSelectSeatPosChartPopup(
  ctx: IDialogContextData,
  onOk: (seatPosChart: ISGSeatPosChart) => void,
  onCancel?: () => void
): void {
  ctx?.pushDialog(
    <SelectSeatPosChartModal
      isOpen={true}
      onCancel={() => {
        ctx?.popDialog();
        onCancel?.();
      }}
      onOk={(orgChart) => {
        ctx?.popDialog();
        onOk(orgChart);
      }}
    />
  );
}
