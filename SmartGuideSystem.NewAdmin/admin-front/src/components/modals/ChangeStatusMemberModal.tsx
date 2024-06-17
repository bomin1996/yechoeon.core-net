import { ISGUser } from "@shares/*";
import { useEffect, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import { IDialogContextData } from "@/contexts/DialogContext";

import SimpleComboBox from "../ui/dropdown/SimpleComboBox";
import { MemberStatusType } from "@shares/MemberStatusType";

interface Props {
  member: ISGUser;
  onCancel: () => void;
  onOk: (member: ISGUser, status: string) => void;
}

//const roles: MemberStatusType[] = ["일정없음", "휴가", "출장", "교육"];
const statusList: MemberStatusType[] = [
  "일정없음",
  "연가",
  "출장",
  "병가",
  "휴가",
  "회의중",
];

export default function ChangeStatusMemberModal({
  member,
  onOk,
  onCancel,
}: Props) {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  useEffect(() => {
    if (member.status) {
      const idx = statusList.indexOf(member.status);
      setSelectedRoleIndex(idx);
    }
  }, [member]);

  return (
    <DialogModal
      isOpen={true}
      title={`상태 변경`}
      onOk={() => onOk(member, statusList[selectedRoleIndex])}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}
    >
      <div className="w-full h-full flex flex-col text-[#221e1f] pl-8 pr-8 gap-4 ">
        <p>출장, 교육, 휴가등의 상태를 변경하세요.</p>

        <div className="grid-col-2"></div>
        <p className="text-[18px] mr-auto"> 부서: {member.deptName}</p>
        <p className="text-[18px]  mr-auto"> 이름 : {member.name}님</p>

        <div className="flex flex-row  mr-auto">
          <p className="text-[18px]  "> 상태 :</p>
          <SimpleComboBox
            items={statusList}
            selectedIdx={selectedRoleIndex}
            onSelectedItem={(name, index) => {
              setSelectedRoleIndex(index);
              //member.status = roles[index];
            }}
            className="w-[200px] ml-2"
          />
        </div>
      </div>
    </DialogModal>
  );
}

export function showChangeStatusMemberPopup(
  ctx: IDialogContextData,
  member: ISGUser,
  onOk: (member: ISGUser, status: string) => void
): void {
  ctx?.pushDialog(
    <ChangeStatusMemberModal
      key="ChangeStatusMemberModal"
      member={member}
      onCancel={() => ctx!.popDialog()}
      onOk={(newUser, status) => {
        ctx!.popDialog();
        onOk(newUser, status);
      }}
    />
  );
}
