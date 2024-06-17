import React, { useEffect, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import NoramlListBox from "../ui/listbox/NoramlListBox";
import { ISGDepartment, ISGDevice } from "@shares/";
import { IDialogContextData } from "@/contexts/DialogContext";
import { DeptApis } from "@/server/deptApis";
import { meetingApis } from "@/server/meetingApis";

interface Props {
  onCancel?: () => void;
  onOk: (meetingRoomName: string) => void;
}

export default function SelectFindMeetingRoomModal({ onOk, onCancel }: Props) {
  const [devices, setDevices] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [inputFilter, setInputFilter] = useState("");

  const queryMeetingRooms = async () => {
    const { result, error } = await meetingApis.meetingRooms();
    if (!error) {
      setDevices(result);
    }
  };

  useEffect(() => {
    queryMeetingRooms();
  }, []);

  const hendleDeprtSelect = (title: string, index: number) => {
    setSelectedIndex(index);
  };

  const filtedMeetingRoomList =
    inputFilter.length > 0
      ? devices.filter((d) => d.includes(inputFilter))
      : devices;

  const titles = filtedMeetingRoomList.map((d) => d);

  return (
    <DialogModal
      isOpen={true}
      title="회의실안내 키오스크 검색"
      onOk={() => {
        const roomName = filtedMeetingRoomList[selectedIndex];
        onOk(roomName);
      }}
      onCancel={() => onCancel?.()}
      onClose={() => onCancel?.()}
      canOk={selectedIndex !== -1}
    >
      <div className="w-full h-full flex flex-col text-[#221e1f] items-center ">
        {/* 1열 */}
        <p className="text-lg mb-2">회의실을 선택해주세요.</p>
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
            onSelect={hendleDeprtSelect}
            className="h-[370px]"
          />
        </div>
      </div>
    </DialogModal>
  );
}

export function showSelectMeetingRoomPopup(
  ctx: IDialogContextData,
  onOk: (meetingRoomName: string) => void,
  onCancel?: () => void
): void {
  ctx?.pushDialog(
    <SelectFindMeetingRoomModal
      key={"showSelectMeetingRoomPopup"}
      onCancel={() => {
        ctx?.popDialog();
        onCancel?.();
      }}
      onOk={(meetingRoomName) => {
        ctx?.popDialog();
        onOk(meetingRoomName);
      }}
    />
  );
}
