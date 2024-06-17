import { ISGDepartment } from "@shares/*";
import { useContext, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import DialogContext, { IDialogContextData } from "@/contexts/DialogContext";
import { useFormik } from "formik";

import * as Yup from "yup";
import { showSelectDepartmentPopup } from "./SelectFindDepartmentModal";
import SimpleComboBox from "../ui/dropdown/SimpleComboBox";
import LabelFormik from "../ui/LabelFormik";

interface Props {
  department: ISGDepartment;
  onCancel: () => void;
  onOk: (department: ISGDepartment) => void;
}

interface InputData extends ISGDepartment {
  // deptFullName: string;
  // depth: number;
  // useYn: boolean;
}

function EditDepartmentModal({ department, onOk, onCancel }: Props) {
  const [deptCode, setDeptCode] = useState(department.parentDeptCode);
  const [deptName, setDeptName] = useState(department.parentDeptName);
  const [, setParentDepth] = useState(department.depth);
  // const [parentDept, setParentDept] = useState<ISGDepartment>();
  const [depth, setDepth] = useState(department.depth);
  // const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const formik = useFormik<InputData>({
    initialValues: {
      ...department,
    },
    validationSchema: Yup.object({
      deptCode: Yup.string().required("필수항목입니다."),
      name: Yup.string().required("필수항목입니다."),
      // depth: Yup.number().min(2).max(parentDepth).required(),
      //   oldPassword: Yup.string().required("필수항목입니다."),
      //   password: Yup.string()
      //     .required("필수항목입니다.")
      //     .matches(
      //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      //       "대/소문자와 숫자, 특수문자를 포함하는 8자 이상 입력하세요."
      //     ),
      //   passwordConfirm: Yup.string()
      //     .required("필수항목입니다.")
      //     .oneOf([Yup.ref("password")], "Passwords must match"),
      //   role: Yup.string().required("필수항목입니다."),
    }),

    onSubmit: (values) => {
      const dept: ISGDepartment = {
        ...values,
        parentDeptCode: deptCode,
        parentDeptName: deptName,
        depth: depth,
      };
      onOk(dept);
    },
  });

  const dialogCtx = useContext(DialogContext);

  return (
    <DialogModal
      isOpen={true}
      title="부서정보변경"
      onOk={() => formik.handleSubmit()}
      canOk={formik.isValid && formik.dirty}
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
          <LabelFormik
            name="deptCode"
            title="부서코드"
            errors={formik.errors.deptCode}
          />
          <input
            name="deptCode"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.deptCode}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <LabelFormik
            name="name"
            title="부서이름"
            errors={formik.errors.name}
          />
          <input
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <label title="상위부서">상위부서</label>

          <div className="flex w-full">
            <input
              readOnly
              // disabled={!isSelectedOrgChart}
              className="input-white-green mr-1 "
              placeholder="상위부서 선택"
              value={deptName ?? deptCode}
              type="text"
            />

            <button
              onClick={() => {
                showSelectDepartmentPopup(dialogCtx!, (department) => {
                  //setDepartment(department);
                  setDeptCode(department.deptCode);
                  setDeptName(department.name);
                  setParentDepth(department.depth);
                  setDepth(department.depth + 1);
                });
              }}
              // disabled={!isSelectedOrgChart}
              className="btn-gray"
            >
              변경
            </button>
          </div>

          <label title="부서레벨">부서레벨</label>
          <SimpleComboBox
            className=""
            items={["2", "3", "4", "5"]}
            selectedIdx={Math.max(0, depth - 2)}
            onSelectedItem={(it, index) => {
              setDepth(index + 2);
            }}
          />

          <LabelFormik
            name="officeTel"
            title="전화번호"
            errors={formik.errors.officeTel}
          />
          <input
            name="officeTel"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.officeTel}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <LabelFormik
            name="officeFax"
            title="팩스"
            errors={formik.errors.officeFax}
          />
          <input
            name="officeFax"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.officeFax}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <LabelFormik
            name="jobDescription"
            title="업무"
            errors={formik.errors.jobDescription}
          />
          <textarea
            name="jobDescription"
            value={formik.values.jobDescription}
            onChange={formik.handleChange}
            className="col-span-4 row-span-3 h-[120px] p-2"
          />
        </form>
      </div>
    </DialogModal>
  );
}

export function showEditDepartmentDialog(
  ctx: IDialogContextData,
  department: ISGDepartment,
  onOk: (department: ISGDepartment) => void
): void {
  ctx?.pushDialog(
    <EditDepartmentModal
      key="showEditDepartmentDialog"
      department={department}
      onCancel={() => ctx!.popDialog()}
      onOk={(department) => {
        ctx!.popDialog();
        onOk(department);
      }}
    />
  );
}
