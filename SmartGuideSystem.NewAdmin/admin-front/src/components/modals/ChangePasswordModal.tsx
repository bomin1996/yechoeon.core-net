import { ISGLoginUser } from "@shares/*";
import  { useContext, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import DialogContext, { IDialogContextData } from "@/contexts/DialogContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { descForRole } from "@/helpers/desc-helpers";
import LabelFormik from "../ui/LabelFormik";

interface Props {
  loginUser: ISGLoginUser;
  onCancel: () => void;
  onOk: (oldPassword: string, newPassword: string) => void;
}

interface InputData extends ISGLoginUser {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}

export default function ChangePasswordModal({
  loginUser,
  onOk,
  onCancel,
}: Props) {
  // const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  const formik = useFormik<InputData>({
    initialValues: {
      loginId: loginUser.loginId,
      name: loginUser.name,
      role: loginUser.role,
      deptName: loginUser.deptName,
      oldPassword: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("필수항목입니다."),
      password: Yup.string()
        .required("필수항목입니다.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "대/소문자와 숫자, 특수문자를 포함하는 8자 이상 입력하세요."
        ),
      passwordConfirm: Yup.string()
        .required("필수항목입니다.")
        .oneOf([Yup.ref("password")], "Passwords must match"),

      role: Yup.string().required("필수항목입니다."),
    }),
    onSubmit: (values) => {
      onOk(values.oldPassword, values.password);
    },
  });

  // const dialogCtx = useContext(DialogContext);

  //formik.errors.userId

  return (
    <DialogModal
      isOpen={true}
      title="암호변경"
      onOk={() => formik.handleSubmit()}
      canOk={formik.isValid}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}
    >
      <div className="w-[500px] h-full flex flex-col text-[#221e1f] p-8 gap-4 ">
        <form
          className="flex flex-col space-y-[8px] text-sm text-left"
          onSubmit={(ev) => {
            ev.preventDefault();
            //formik.handleSubmit(ev);
          }}
        >
          <label title="로그인아이디">로그인아이디</label>
          <input
            name="loginId"
            readOnly={true}
            value={formik.values.loginId}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />
          <label title="이름">이름</label>
          <input
            name="name"
            type="text"
            readOnly={true}
            value={formik.values.name}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />
          <label title="권한">권한</label>
          <input
            name="name"
            type="text"
            readOnly={true}
            value={descForRole(formik.values.role)}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <LabelFormik
            name="oldPassword"
            title="이전 패스워드"
            errors={formik.errors.oldPassword}
          />
          <input
            name="oldPassword"
            type="password"
            autoComplete="off"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />
          <LabelFormik
            name="password"
            title="변경할 패스워드"
            errors={formik.errors.password}
          />
          <input
            name="password"
            type="password"
            autoComplete="off"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />
          <LabelFormik
            name="passwordConfirm"
            title="패스워드(확인)"
            errors={formik.errors.passwordConfirm}
          />

          <input
            name="passwordConfirm"
            type="password"
            autoComplete="off"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />
          <label htmlFor="">관련부서</label>
          <input
            name="name"
            type="text"
            readOnly={true}
            value={formik.values.role}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />
          <label htmlFor="">설명</label>
          <textarea
            name="desc"
            value={formik.values.desc}
            readOnly={true}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />
        </form>
      </div>
    </DialogModal>
  );
}

// function LabelFormik({
//   name,
//   title,
//   errors,
//   className,
// }: {
//   name: string;
//   title: string;
//   errors: string | undefined;
//   className?: string;
// }) {
//   return (
//     <label
//       htmlFor={name}
//       className={`${errors ? "text-red-600" : ""} ${className}`}
//     >
//       {errors ? errors : title}
//     </label>
//   );
// }

export function showChangePasswordDialog(
  ctx: IDialogContextData,
  user: ISGLoginUser,
  onOk: (oldPassword: string, newPassword: string) => void
): void {
  ctx?.pushDialog(
    <ChangePasswordModal
      key="showAddNewUserDialog"
      loginUser={user}
      onCancel={() => ctx!.popDialog()}
      onOk={(oldPassword, newPassword) => {
        ctx!.popDialog();
        onOk(oldPassword, newPassword);
      }}
    />
  );
}
