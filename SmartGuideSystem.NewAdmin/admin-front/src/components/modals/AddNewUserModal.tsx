import { ISGLoginUser, LoginUserRoleType } from "@shares/*";
import { useContext, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import DialogContext, { IDialogContextData } from "@/contexts/DialogContext";
import { useFormik } from "formik";
import SimpleComboBox from "../ui/dropdown/SimpleComboBox";
import ColorButton from "../ui/button/ColorButton";
import * as Yup from "yup";
import { showSelectDepartmentPopup } from "./SelectFindDepartmentModal";
import AuthContext from "@/contexts/AuthContext";
import LabelFormik from "../ui/LabelFormik";

interface Props {
  onCancel: () => void;
  onOk: (loginUser: ISGLoginUser) => void;
}

interface RegisterLoginUser extends ISGLoginUser {
  passwordConfirm: string;
}

const roles: LoginUserRoleType[] = ["DepartManager", "Admin", "SystemAdmin"];

export default function AddNewUserModal({ onOk, onCancel }: Props) {
  const authCtx = useContext(AuthContext);

  const roleTitles =
    authCtx?.user?.role === "SystemAdmin"
      ? ["부서관리자", "전체부서관리자", "시스템관리자"]
      : ["부서관리자", "전체부서관리자"];

  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  const formik = useFormik<RegisterLoginUser>({
    initialValues: {
      loginId: "",
      name: "",
      password: "",
      passwordConfirm: "",
      role: "SystemAdmin",
      deptCode: undefined,
      deptName: undefined,
    },
    validationSchema: Yup.object({
      loginId: Yup.string()
        .required()
        // .matches(
        //   /^(?=.*[a-zA-Z])[A-Za-z0-9]{8,20}$/,
        //   "8자이상 20자이하 문자와 숫자만 입력하세요."
        // ),
        .min(3, "3자 이상입력해야 합니다."),
      name: Yup.string().max(20, "20자 미만입니다.").required("필수입력"),
      password: Yup.string()
        .min(5, "5자 이상입력해야 합니다.")
        .required("필수항목입니다."),
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      //   "대/소문자와 숫자, 특수문자를 포함하는 8자 이상 입력하세요."
      // ),
      passwordConfirm: Yup.string()
        .required("필수항목입니다.")
        .oneOf([Yup.ref("password")], "Passwords must match"),

      role: Yup.string().required("필수항목입니다."),
    }),
    onSubmit: (values) => {
      onOk(values);
    },
  });

  const dialogCtx = useContext(DialogContext);

  //formik.errors.userId

  return (
    <DialogModal
      isOpen={true}
      title="새 사용자 추가"
      onOk={() => formik.handleSubmit()}
      canOk={formik.isValid}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}>
      <div className="w-[500px] h-full flex flex-col text-[#221e1f] p-8 gap-4 ">
        <form
          className="flex flex-col space-y-[8px] text-sm text-left"
          onSubmit={(ev) => {
            ev.preventDefault();
            //formik.handleSubmit(ev);
          }}>
          <LabelFormik
            name="loginId"
            title="로그인아이디"
            errors={formik.errors.loginId}
          />
          <input
            name="loginId"
            type="text"
            value={formik.values.loginId}
            onChange={formik.handleChange}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />
          <LabelFormik
            name="name"
            title="표시이름"
            errors={formik.errors.name}
          />
          <input
            name="name"
            type="text"
            autoComplete="off"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />
          {/* <LabelFormik name="role" title="권한" errors={formik.errors.role} />
          <SimpleComboBox
            items={roleTitles}
            selectedIdx={selectedRoleIndex}
            onSelectedItem={(name, index) => {
              setSelectedRoleIndex(index);
              formik.values.role = roles[index];
            }}
            className=""
          /> */}
          <LabelFormik
            name="password"
            title="패스워드"
            errors={formik.errors.password}
          />

          <input
            name="password"
            type="password"
            autoComplete="chrome-off"
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
          {/* <label htmlFor="">관련부서</label>
          <div className="flex flex-row space-x-2 items-center">
            <input
              readOnly
              type="text"
              value={formik.values.deptName}
              className="flex-1 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
            />
            <ColorButton
              title="변경"
              colorStyle="confirm"
              onClick={() => {
                showSelectDepartmentPopup(dialogCtx!, (department) => {
                  formik.values.deptCode = department.deptCode;
                  formik.values.deptName = department.name;
                });
              }}
            />
          </div> */}
          <LabelFormik name="name" title="설명" errors={formik.errors.name} />
          <textarea
            name="desc"
            value={formik.values.desc}
            onChange={formik.handleChange}
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

export function showAddNewUserDialog(
  ctx: IDialogContextData,
  onOk: (user: ISGLoginUser) => void
): void {
  ctx?.pushDialog(
    <AddNewUserModal
      key="showAddNewUserDialog"
      onCancel={() => ctx!.popDialog()}
      onOk={(newUser) => {
        ctx!.popDialog();
        onOk(newUser);
      }}
    />
  );
}
