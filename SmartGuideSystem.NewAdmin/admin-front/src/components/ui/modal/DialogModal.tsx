import { PropsWithChildren } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import withModal from "./withModal";
import ColorButton from "../button/ColorButton";

interface Props extends PropsWithChildren {
  title: string;
  canOk?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  closeMode?: boolean;
  okButtonTitle?: string;
  showDeleteBtn?: boolean;
  deleteButtonTitle?: string;
  onDelete?: () => void;
}

// function DialogModal({ title, onOk, onCancel, children, canOk = true }: Props) {
//   return (
//     <div className="flex flex-col min-w-[406px] min-h-[240px] rounded-[10px] bg-[#e8e6da] shadow-[0_5px_5px_0px_rgba(0,0,0,0.5)]">
//       <div className="flex h-[60px] pl-[20px] pr-[8px] justify-between items-center">
//         <span className="text-lg text-[#221e1f] font-bold">{title}</span>
//         <XMarkIcon
//           onClick={() => {
//             if (onCancel) {
//               onCancel();
//             }
//           }}
//           className="h-12 w-12 p-3 fill-[#221e1f] stroke-[#221e1f] hover:bg-black/30 active:scale-95 rounded-lg"
//         />
//       </div>
//       <div className="flex-1 border-t p-[20px] border-[#bebaae] whitespace-pre-line text-base text-[#221e1f] font-semibold text-center">
//         {children}
//       </div>
//       <div className="h-[90px] flex mr-[20px] gap-4 justify-end items-center">
//         <ColorButton
//           title="확인"
//           onClick={() => {
//             if (onOk) {
//               onOk();
//             }
//           }}
//           disable={!canOk}
//           colorStyle="cancel"
//         />
//         <ColorButton
//           title="취소"
//           onClick={() => {
//             if (onCancel) {
//               onCancel();
//             }
//           }}
//           colorStyle="confirm"
//         />
//       </div>
//     </div>
//   );
// }

function DialogModal({
  title,
  onOk,
  onCancel,
  children,
  canOk = true,
  closeMode = false,
  okButtonTitle = "확인",
  showDeleteBtn = false,
  deleteButtonTitle = "삭제",
  onDelete,
}: Props) {
  return (
    <div className="flex flex-col min-w-[406px] min-h-[240px] rounded-lg shadow-xl bg-[#e8e6da] ">
      <div className="flex h-[60px] pl-[20px] pr-[8px] justify-between items-center">
        <span className="text-lg text-[#221e1f] font-bold">{title}</span>
        <XMarkIcon
          onClick={() => {
            if (onCancel) {
              onCancel();
            }
          }}
          className="h-12 w-12 p-3 fill-[#221e1f] stroke-[#221e1f] hover:bg-black/30 active:scale-95 rounded-lg"
        />
      </div>
      {/* <div className="flex-1 border-t p-[20px] border-[#bebaae] whitespace-pre-line text-base text-[#221e1f] font-semibold text-center">
        {children}
      </div> */}
      <div className="flex-1 border-t p-[20px] border-[#bebaae] whitespace-pre-line text-base text-[#221e1f] font-semibold text-left">
        {children}
      </div>
      {!closeMode && (
        <div className="h-[90px] flex mr-[20px] gap-4 justify-end items-center">
          {showDeleteBtn && (
            <ColorButton
              title={deleteButtonTitle}
              onClick={() => {
                onDelete?.();
              }}
              disable={!canOk}
              colorStyle="delete"
            />
          )}
          <ColorButton
            title={okButtonTitle}
            onClick={() => {
              if (onOk) {
                onOk();
              }
            }}
            disable={!canOk}
            colorStyle="open"
          />
          <ColorButton
            title="취소"
            onClick={() => {
              if (onCancel) {
                onCancel();
              }
            }}
            colorStyle="confirm"
          />
        </div>
      )}
      {closeMode && (
        <div className="h-[90px] flex mr-[20px] gap-4 justify-end items-center">
          <ColorButton
            title="닫기"
            onClick={() => {
              if (onCancel) {
                onCancel();
              }
            }}
            colorStyle="confirm"
          />
        </div>
      )}
    </div>
  );
}

export default withModal(DialogModal);
