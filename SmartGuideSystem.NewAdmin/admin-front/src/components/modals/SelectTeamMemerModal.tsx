import { ISGUser } from "@shares/*";
import { useState } from "react";
import { IDialogContextData } from "@/contexts/DialogContext";
import NoramlListBox from "../ui/listbox/NoramlListBox";
import DialogModal from "../ui/modal/DialogModal";

interface Props {
  title: string;
  members: Array<ISGUser>;
  onOk: (user: ISGUser) => void;
  onCancel: () => void;
}

export default function SelectTeamMemberModal({
  title,
  members,
  onCancel,
  onOk,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  //   const users = useMemo(() => {
  //     const userList: Array<ISGUser> = [];
  //     members.forEach((v, k, m) => {
  //       v.forEach((u, i) => userList.push(u));
  //     });
  //     return userList;
  //   }, [members]);

  const [filter, setFilter] = useState("");

  const users =
    filter.length > 0
      ? members.filter((u, idx) => u.name.includes(filter))
      : members;

  const titles = users?.map(
    (u) =>
      u.name + " " + (u.positionName ?? "") + " (" + (u.teamName ?? "") + ") "
  );

  return (
    <DialogModal
      isOpen={true}
      title={title}
      canOk={selectedIndex >= 0}
      onOk={() => {
        onOk(users[selectedIndex]);
      }}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}>
      <div className="w-full h-full flex flex-col text-[#221e1f] p-8 gap-4">
        <p className="">멤버를 선택하세요.</p>
        <input
          value={filter}
          onChange={(ev) => setFilter(ev.target.value)}
          className="px-3 py-1 rounded-md text-lg focus:shadow outline-green-500/50 focus:outline"
        />
        <NoramlListBox
          className="h-[320px]"
          titles={titles}
          selectedIndex={selectedIndex}
          onSelect={(title, index) => {
            setSelectedIndex(index);
          }}
        />
      </div>
    </DialogModal>
  );
}

export function showSelectMember(
  ctx: IDialogContextData,
  members: Array<ISGUser>,
  onOk: (user: ISGUser) => void,
  onCancel?: () => void
) {
  ctx?.pushDialog(
    <SelectTeamMemberModal
      title="멤버선택"
      onOk={(u) => {
        ctx!.popDialog();
        onOk(u);
      }}
      onCancel={() => {
        ctx!.popDialog();
        if (onCancel) {
          onCancel();
        }
      }}
      members={members}
    />
  );
}
