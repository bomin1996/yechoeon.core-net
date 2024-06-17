import { ISGLoginUser } from "@shares/*";
import { useState } from "react";
import { genPassword } from "@/helpers/genPassword";
import DialogModal from "../ui/modal/DialogModal";
import {
  ClipboardDocumentCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { IDialogContextData } from "@/contexts/DialogContext";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  loginUser: ISGLoginUser;
  onCancel: () => void;
  onOk: (newPassword: string) => void;
}

export default function ResetPasswordModal({
  loginUser,
  onOk,
  onCancel,
}: Props) {
  const [genPwd, setGenPwd] = useState(genPassword());

  return (
    <DialogModal
      isOpen={true}
      title="암호변경"
      onOk={() => {
        onOk(genPwd);
      }}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}
    >
      <div className="w-[500px] h-full flex flex-col text-[#221e1f] p-8 gap-4 ">
        <p className="text-left">로그인아이디</p>
        <input
          readOnly={true}
          value={loginUser.loginId}
          className="px-3 py-2 text-black/70 rounded-md focus:shadow outline-green-500/50 focus:outline"
        />
        <p className="text-left">이름</p>
        <input
          readOnly={true}
          value={loginUser.name}
          className="px-3 py-2 text-black/70  rounded-md focus:shadow outline-green-500/50 focus:outline"
        />
        <p className="text-left">관련부서</p>
        <input
          readOnly={true}
          value={loginUser.deptName}
          className="px-3 py-2  text-black/70 rounded-md focus:shadow outline-green-500/50 focus:outline"
        />
        <p className="text-left">임시암호 </p>
        <div className="flex items-center px-4 py-4 border rounded border-black">
          <ArrowPathIcon
            onClick={() => setGenPwd(genPassword())}
            className="h-6 w-6 mr-3 active:scale-95 hover:opacity-80"
          />
          <span className="flex-1 text-left text-lg">{genPwd}</span>
          <span
            onClick={() => {
              window.navigator.clipboard.writeText(genPwd);
              toast("클립보드에 복사됨");
            }}
            className="text-base flex font-medium cursor-pointer active:scale-95 hover:opacity-80"
          >
            클립보드복사
            <ClipboardDocumentCheckIcon className="ml-2 h-6 w-6 " />
          </span>
        </div>
      </div>
      <Toaster />
    </DialogModal>
  );
}

export function showResetPasswordDialog(
  ctx: IDialogContextData,
  user: ISGLoginUser,
  onOk: (newPassword: string) => void
): void {
  ctx?.pushDialog(
    <ResetPasswordModal
      key="showResetPasswordDialog"
      loginUser={user}
      onCancel={() => ctx!.popDialog()}
      onOk={(newPassword) => {
        ctx!.popDialog();
        onOk(newPassword);
      }}
    />
  );
}
