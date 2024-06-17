import { useContext, useEffect, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import NoramlListBox from "../ui/listbox/NoramlListBox";
import { ISGLocalMap } from "@shares/";
import { IDialogContextData } from "@/contexts/DialogContext";
import BlockUIContext from "@/contexts/BlockUIContext";
import { LocalMapApi } from "@/server/localMapApi";

interface Props {
  onCancel: () => void;
  onOk: (localMap: ISGLocalMap) => void;
}

function SelectLocalMapModal({ onOk, onCancel }: Props) {
  const [maps, setMaps] = useState<ISGLocalMap[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedMap, setSelectedMap] = useState<ISGLocalMap>();
  const [inputFilter, setInputFilter] = useState("");
  const blockUICtx = useContext(BlockUIContext);

  const queryLocalMaps = async () => {
    blockUICtx?.setBlock(true);
    const { result, error } = await LocalMapApi.localMapList();
    blockUICtx?.setBlock(false);
    if (!error) {
      setMaps(result);
    }
  };

  useEffect(() => {
    queryLocalMaps();
  }, []);

  const filtedMapList =
    inputFilter.length > 0
      ? maps.filter((d) => d.name.includes(inputFilter))
      : maps;

  const titles = filtedMapList.map((d) => d.name);

  return (
    <DialogModal
      isOpen={true}
      title="관내도 선택"
      onOk={() => {
        onOk(selectedMap!);
      }}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}
      canOk={selectedMap !== undefined}
    >
      <div className="w-full h-full flex flex-col text-[#221e1f] items-center ">
        {/* 1열 */}
        <p className="text-lg mb-2">관내도를 선택해주세요.</p>
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
            onSelect={(title, index) => {
              setSelectedIndex(index);
              setSelectedMap(filtedMapList[index]);
            }}
            className="h-[370px]"
          />
        </div>
      </div>
    </DialogModal>
  );
}

export default function showSelectLocalMapPopup(
  ctx: IDialogContextData,
  onOk: (localMap: ISGLocalMap) => void,
  onCancel?: () => void
): void {
  ctx?.pushDialog(
    <SelectLocalMapModal
      key={"showSelectDepartmentPopup"}
      onCancel={() => {
        ctx?.popDialog();
        onCancel?.();
      }}
      onOk={(map) => {
        ctx?.popDialog();
        onOk(map);
      }}
    />
  );
}
