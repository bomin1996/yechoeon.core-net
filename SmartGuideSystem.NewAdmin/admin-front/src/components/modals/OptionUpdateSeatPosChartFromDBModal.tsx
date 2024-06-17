import { useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import { MemberCardColor, MemberCardSize } from "@shares/ISGDevice";

import { IDialogContextData } from "@/contexts/DialogContext";
import TitleCheckButton from "../ui/button/TitleCheckButton";

interface ResultData {
  isUpdateAll: boolean;

  isUpdatePhoto: boolean;
  isUpdateGrade: boolean;
  isUpdateTeamName: boolean;

  isUpdateOfficeTel: boolean;
  isUpdateOfficeFax: boolean;
  isUpdateJobDescription: boolean;
}

interface Props {
  title: string;
  onCancel?: () => void;
  onOk: (result: ResultData) => void;
}

export default function OptionUpdateSeatPosChartFromDBModal({
  title,
  onCancel,
  onOk,
}: Props) {
  const [isUpdateAll, setIsUpdateAll] = useState(true);

  const [isUpdatePhoto, setIsUpdatePhoto] = useState(true);
  const [isUpdateGrade, setIsUpdateGrade] = useState(true);
  const [isUpdateTeamName, setIsUpdateTeamName] = useState(true);

  const [isUpdateOfficeTel, setIsUpdateOfficeTel] = useState(true);
  const [isUpdateOfficeFax, setIsUpdateOfficeFax] = useState(true);
  const [isUpdateJobDescription, setIsUpdateJobDescription] = useState(true);

  return (
    <DialogModal
      isOpen={true}
      title={title}
      onOk={() => {
        onOk({
          isUpdateAll: isUpdateAll,
          isUpdatePhoto: isUpdatePhoto,
          isUpdateGrade: isUpdateGrade,
          isUpdateTeamName: isUpdateTeamName,
          isUpdateOfficeTel: isUpdateOfficeTel,
          isUpdateOfficeFax: isUpdateOfficeFax,
          isUpdateJobDescription: isUpdateJobDescription,
        });
      }}
      onCancel={() => onCancel?.()}
      onClose={() => onCancel?.()}
    >
      <div className="w-full h-full flex flex-col text-[#221e1f] p-8 gap-4 text-left">
        <TitleCheckButton
          isSelected={isUpdateAll}
          title={"모든직원 동기화"}
          onClick={() => setIsUpdateAll((pv) => !pv)}
        />

        <TitleCheckButton
          isSelected={isUpdatePhoto}
          title={"프로필사진 동기화"}
          onClick={() => setIsUpdatePhoto((pv) => !pv)}
        />
        <TitleCheckButton
          isSelected={isUpdateGrade}
          title={"직급 동기화"}
          onClick={() => setIsUpdateGrade((pv) => !pv)}
        />
        <TitleCheckButton
          isSelected={isUpdateTeamName}
          title={"팀이름 동기화"}
          onClick={() => setIsUpdateTeamName((pv) => !pv)}
        />
        <TitleCheckButton
          isSelected={isUpdateOfficeTel}
          title={"전화번호 동기화"}
          onClick={() => setIsUpdateOfficeTel((pv) => !pv)}
        />
        <TitleCheckButton
          isSelected={isUpdateOfficeFax}
          title={"팩스 동기화"}
          onClick={() => setIsUpdateOfficeFax((pv) => !pv)}
        />
        <TitleCheckButton
          isSelected={isUpdateJobDescription}
          title={"업무 동기화"}
          onClick={() => setIsUpdateJobDescription((pv) => !pv)}
        />
      </div>
    </DialogModal>
  );
}

function ColorItem({
  isSelected,
  color,
  title,
  onClick,
}: {
  isSelected: boolean;
  color: MemberCardColor;
  title: string;
  onClick: () => void;
}) {
  let cn1 = "bg-red-600";
  let cn2 = "bg-red-400";

  switch (color) {
    case "Blue":
      cn1 = "bg-[#607FBD]";
      cn2 = "bg-[#C4D5F8]";
      break;
    case "Yellow":
      cn1 = "bg-[#FCB004]";
      cn2 = "bg-[#FFEBC2]";
      break;
    case "Mint":
      cn1 = "bg-[#7FBFC7]";
      cn2 = "bg-[#C3EFF4]";
      break;
    case "Red":
      cn1 = "bg-[#FF3F5E]";
      cn2 = "bg-[#FFDEE4]";
      break;
    case "Orange":
      cn1 = "bg-[#FD865B]";
      cn2 = "bg-[#FFE8DF]";
      break;
    case "Green":
      cn1 = "bg-[#60BD9B]";
      cn2 = "bg-[#C2EFDF]";
      break;
  }

  return (
    <div
      onClick={onClick}
      className={`flex px-2 py-1 rounded-sm cursor-pointer hover:${cn2} ${
        isSelected ? `font-bold border-black border ${cn1}` : `${cn2}`
      } `}
    >
      <span className="m-auto ">{title}</span>
    </div>
  );
}

// function SizeItem({
//   isSelected,
//   size,
//   title,
//   onClick,
// }: {
//   isSelected: boolean;
//   size: MemberCardSize;
//   title: string;
//   onClick: () => void;
// }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`flex px-2 py-1 rounded-sm cursor-pointer hover:bg-black/5 ${
//         isSelected ? "font-bold border-black border bg-black/20 " : ""
//       } `}
//     >
//       <span className="m-auto ">{title}</span>
//     </div>
//   );
// }

// function TitleItem({
//   isSelected,
//   title,
//   onClick,
// }: {
//   isSelected: boolean;
//   title: string;
//   onClick: () => void;
// }) {
//   return (
//     <div
//       onClick={onClick}
//       className={`flex px-2 py-1 rounded-sm cursor-pointer hover:bg-black/5 ${
//         isSelected ? "font-bold border-sky-500 border-2 bg-black/20 " : ""
//       } `}
//     >
//       <span className="m-auto ">{title}</span>
//     </div>
//   );
// }

export function showUpdateSeatPosChartNodeOption(
  ctx: IDialogContextData,
  onOk: (result: ResultData) => void
) {
  ctx?.pushDialog(
    <OptionUpdateSeatPosChartFromDBModal
      title="인사디비동기화 옵션"
      key="showUpdateSeatPosChartNodeOption"
      onCancel={() => ctx?.popDialog()}
      onOk={(result) => {
        ctx?.popDialog();
        onOk(result);
      }}
    />
  );
}
