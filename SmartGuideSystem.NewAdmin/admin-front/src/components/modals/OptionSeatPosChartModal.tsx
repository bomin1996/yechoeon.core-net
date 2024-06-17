import  {  useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import {

  MemberCardColor,
  MemberCardSize,
} from "@shares/ISGDevice";

import { IDialogContextData } from "@/contexts/DialogContext";
import { TemplateNames } from "@/viewmodels/seating_chart/TempateNames";

const Colors: Array<MemberCardColor> = [
  "Yellow",
  "Blue",
  "Green",
  "Mint",
  "Orange",
  "Red",
];
const Sizes: Array<MemberCardSize> = ["Large", "Medium", "Small"];

const LeaderTemplates = [
  TemplateNames.template_leader_horizontal,
  TemplateNames.template_leader_vertical,
];
const AddTemplates = ["1Rows", "1Columns", "2Rows", "2Columns"];

interface ResultData {
  teamColor: MemberCardColor;
  memberSize: MemberCardSize;
  leaderSize: MemberCardSize;
  leaderTemplate: string;
  addTemplate: string;
}

interface Props {
  title: string;
  initData?: ResultData;
  onCancel?: () => void;
  onOk: (result: ResultData) => void;
}

export default function OptionSeatPosChartModal({
  title,
  initData,
  onCancel,
  onOk,
}: Props) {
  let initColorIndex = 0;
  let initSizeIndex = 0;
  let initSize2Index = 0;
  let initLeaderTempIndex = 0;
  let initAddTempIndex = 0;

  if (initData) {
    initColorIndex = Colors.indexOf(initData.teamColor);
    initSizeIndex = Sizes.indexOf(initData.memberSize);
    initSize2Index = Sizes.indexOf(initData.leaderSize);
    initLeaderTempIndex = LeaderTemplates.indexOf(initData.leaderTemplate);
    initAddTempIndex = AddTemplates.indexOf(initData.addTemplate);
  }

  const [colorIndex, setColorIndex] = useState(initColorIndex);
  const [sizeIndex, setSizeIndex] = useState(initSizeIndex);
  const [size2Index, setSize2Index] = useState(initSize2Index);
  const [leaderTempIndex, setLeaderTempIndex] = useState(initLeaderTempIndex);
  const [addTempIndex, setAddTempIndex] = useState(initAddTempIndex);

  return (
    <DialogModal
      isOpen={true}
      title={title}
      onOk={() => {
        const result: ResultData = {
          teamColor: Colors[colorIndex],
          memberSize: Sizes[sizeIndex],
          leaderSize: Sizes[size2Index],
          leaderTemplate: LeaderTemplates[leaderTempIndex],
          addTemplate: AddTemplates[addTempIndex],
        };
        onOk(result);
      }}
      onCancel={() => onCancel?.()}
      onClose={() => onCancel?.()}
    >
      <div className="w-full h-full flex flex-col text-[#221e1f] p-8 gap-4 text-left">
        <p className="">팀색상선택.</p>
        {/* <SimpleComboBox
          className="col-span-4"
          items={Colors}
          selectedIdx={colorIndex}
          onSelectedItem={(it, index) => setColorIndex(index)}
        /> */}

        <div className="flex flex-row space-x-2 text-sm select-none">
          {Colors.map((c, i) => (
            <ColorItem
              isSelected={i === colorIndex}
              color={c}
              title={c}
              onClick={() => {
                setColorIndex(i);
              }}
            />
          ))}
        </div>
        <p className="">팀멤버 카드 사이즈선택</p>
        <div className="flex flex-row space-x-2 text-sm">
          {Sizes.map((s, i) => (
            <SizeItem
              isSelected={i === sizeIndex}
              size={s}
              title={s}
              onClick={() => {
                setSizeIndex(i);
              }}
            />
          ))}
        </div>
        <p className="">팀리더 카드 사이즈선택</p>
        <div className="flex flex-row space-x-2 ">
          {Sizes.map((s, i) => (
            <SizeItem
              isSelected={i === size2Index}
              size={s}
              title={s}
              onClick={() => {
                setSize2Index(i);
              }}
            />
          ))}
        </div>
        <p className="">팀리더 템플릿 선택</p>
        <div className="flex flex-row space-x-2 ">
          {["가로형", "세로형"].map((s, i) => (
            <TitleItem
              isSelected={i === leaderTempIndex}
              title={s}
              onClick={() => {
                setLeaderTempIndex(i);
              }}
            />
          ))}
        </div>
        <p className="">팀추가 방식 선택</p>
        <div className="flex flex-row space-x-2 ">
          {["가로1행", "세로1열", "가로2행", "세로2열"].map((s, i) => (
            <TitleItem
              isSelected={i === addTempIndex}
              title={s}
              onClick={() => {
                setAddTempIndex(i);
              }}
            />
          ))}
        </div>
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

function SizeItem({
  isSelected,
  size,
  title,
  onClick,
}: {
  isSelected: boolean;
  size: MemberCardSize;
  title: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex px-2 py-1 rounded-sm cursor-pointer hover:bg-black/5 ${
        isSelected ? "font-bold border-black border bg-black/20 " : ""
      } `}
    >
      <span className="m-auto ">{title}</span>
    </div>
  );
}

function TitleItem({
  isSelected,
  title,
  onClick,
}: {
  isSelected: boolean;
  title: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex px-2 py-1 rounded-sm cursor-pointer hover:bg-black/5 ${
        isSelected ? "font-bold border-sky-500 border-2 bg-black/20 " : ""
      } `}
    >
      <span className="m-auto ">{title}</span>
    </div>
  );
}

export function showSeatPosChartOption(
  ctx: IDialogContextData,
  onOk: (result: ResultData) => void,
  initData?: ResultData
) {
  ctx?.pushDialog(
    <OptionSeatPosChartModal
      title="팀추가 옵션"
      key="showSeatPosChartOption"
      initData={initData}
      onCancel={() => ctx?.popDialog()}
      onOk={(result) => {
        ctx?.popDialog();
        onOk(result);
      }}
    />
  );
}

// export function showEditDeviceModal(
//   ctx: IDialogContextData,
//   selectedDevice: ISGDevice,
//   onOk: (
//     deviceId: string,
//     kioskType: KioskType,
//     deptCode?: string,
//     deptName?: string,
//     orgChartId?: number,
//     orgChartName?: string,
//     desc?: string,
//     extraSettings?: IDeviceExtraSettings
//   ) => void
// ) {
//   ctx?.pushDialog(
//     <DeviceInfoModal
//       title="장치정보수정"
//       isOpen={true}
//       device={selectedDevice}
//       onCancel={() => ctx?.popDialog()}
//       onOk={(
//         deviceId,
//         kioskType,
//         deptCode,
//         deptName,
//         orgChartId,
//         orgChartName,
//         desc,
//         extraSettings
//       ) => {
//         ctx?.popDialog();
//         onOk(
//           deviceId,
//           kioskType,
//           deptCode,
//           deptName,
//           orgChartId,
//           orgChartName,
//           desc,
//           extraSettings
//         );
//       }}
//     />
//   );
// }
