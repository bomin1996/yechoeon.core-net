import {
  ISGEditUserData,
  // ISGLoginUser,
  ISGUser,
  // LoginUserRoleType,
} from "@shares/*";
import { useContext, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import DialogContext, { IDialogContextData } from "@/contexts/DialogContext";
import { useFormik } from "formik";

import * as Yup from "yup";
import { showSelectDepartmentPopup } from "./SelectFindDepartmentModal";
import { showSelectSeatPosChartPopup } from "./SelectSeatPosChartModal";
import { showSelectOrgChartPopup } from "./SelectOrgChartModal";
import TitleCheckButton from "../ui/button/TitleCheckButton";
import LabelFormik from "../ui/LabelFormik";
import ProfileEditImage from "../ui/ProfileEditImage";

interface Props {
  user: ISGUser;
  onCancel: () => void;
  onOk: (user: ISGEditUserData) => void;
  canChangeDept?: boolean;
}

export default function EditMemberModal({
  user,
  onOk,
  onCancel,
  canChangeDept = true,
}: Props) {
  // const [deptCode, setDeptCode] = useState(user?.deptCode);
  // const [deptName, setDeptName] = useState(user?.deptName);
  // const [seatPosChartId, setSeatPosChartId] = useState(user?.chartId);
  // const [seatPosChartName, setSeatPosChartName] = useState(user?.chartName);
  // const [orgChartId, setOrgChartId] = useState(user?.orgChartId);
  // const [orgChartName, setOrgChartName] = useState(user?.orgChartName);

  const [localImage, setLocalImage] = useState<string>();
  //   `/serverimages/photo/${user?.photo ?? ""}`
  // );
  const [photoFileName, setPhotoFileName] = useState<string>();

  // const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const formik = useFormik<ISGEditUserData>({
    initialValues: {
      ...user,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("필수항목입니다."),
      deptName: Yup.string().required("필수항목입니다."),

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
      values.photoDataBase64 = localImage;
      values.photoFileName = photoFileName;
      onOk(values);
    },
  });

  const photoUrl = `/serverimages/photo/${user?.photo ?? ""}`;
  const dialogCtx = useContext(DialogContext);

  return (
    <DialogModal
      isOpen={true}
      title="직원정보변경"
      onOk={() => formik.handleSubmit()}
      canOk={formik.isValid}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}
    >
      <form
        className="text-sm text-left flex flex-row space-x-[32px]"
        onSubmit={(ev) => {
          ev.preventDefault();
          //formik.handleSubmit(ev);
        }}
      >
        <div className="space-y-2 flex flex-col w-[280px]">
          <LabelFormik name="name" title="이름" errors={formik.errors.name} />
          <input
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />
          <label title="사진">사진</label>
          {/* <img
            height={100}
            src={localImage ?? photoUrl}
            className="rounded-md bg-black/25"
          /> */}
          <ProfileEditImage
            height={100}
            src={localImage ?? photoUrl}
            className="rounded-md bg-black/25 "
          />
          <input
            name="photo"
            type="file"
            accept=".jpg,.png,.webp"
            onChange={(ev) => {
              if (ev.currentTarget.files && ev.currentTarget.files.length > 0) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  //document.getElementById("divOutput").src = event.target.result;

                  if (event.target?.result) {
                    setLocalImage(String(event.target.result));
                  }
                };
                reader.readAsDataURL(ev.currentTarget.files[0]);
                setPhotoFileName(ev.currentTarget.files[0].name);
              }
            }}
            // value={formik.values.photo}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <LabelFormik
            name="deptName"
            title="부서"
            errors={formik.errors.deptName}
          />

          <div className="flex space-x-2 w-full">
            <input
              readOnly
              name="deptName"
              // disabled={!isSelectedOrgChart}
              className="input-white-green flex-1"
              placeholder="부서 선택"
              value={formik.values.deptName}
              type="text"
            />

            <button
              disabled={!canChangeDept}
              onClick={() => {
                showSelectDepartmentPopup(dialogCtx!, (department) => {
                  // setDeptCode(department.deptCode);
                  // setDeptName(department.name);

                  formik.values.deptCode = department.deptCode;
                  formik.values.deptName = department.name;

                  formik.validateField("deptName");
                });
              }}
              // disabled={!isSelectedOrgChart}
              className="btn-gray"
            >
              변경
            </button>
          </div>

          <LabelFormik
            name="teamName"
            title="팀"
            errors={formik.errors.teamName}
          />
          <input
            name="teamName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.teamName}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <LabelFormik
            name="teamPosition"
            title="팀직급"
            errors={formik.errors.teamPosition}
          />
          <input
            name="teamPosition"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.teamPosition}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <LabelFormik
            name="positionName"
            title="직급"
            errors={formik.errors.positionName}
          />
          <input
            name="positionName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.positionName}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />
        </div>
        <div className="space-y-2 flex flex-col w-[500px]">
          <LabelFormik
            name="profileGrade"
            title="프로필직급"
            errors={formik.errors.profileGrade}
          />
          <input
            name="profileGrade"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.profileGrade}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />
          <LabelFormik
            name="profileJobDescription"
            title="프로필업무"
            errors={formik.errors.profileJobDescription}
          />
          <textarea
            name="profileJobDescription"
            value={formik.values.profileJobDescription}
            onChange={formik.handleChange}
            className="col-span-4 row-span-3 h-[60px] p-2"
          />

          <LabelFormik
            name="officeTel"
            title="업무전화번호"
            errors={formik.errors.officeTel}
          />
          <input
            name="officeTel"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.officeTel ?? ""}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <LabelFormik
            name="officeFax"
            title="업무팩스번호"
            errors={formik.errors.officeFax}
          />
          <input
            name="officeFax"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.officeFax ?? ""}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <LabelFormik
            name="jobDescription"
            title="업무"
            errors={formik.errors.jobDescription}
          />
          <textarea
            name="jobDescription"
            value={formik.values.jobDescription ?? ""}
            onChange={formik.handleChange}
            className="col-span-4 row-span-3 h-[150px] p-2"
          />

          <label title="배치도">배치도</label>
          <div className="flex space-x-2 w-full">
            <input
              readOnly
              name="chartId"
              // disabled={!isSelectedOrgChart}
              className="input-white-green flex-1"
              placeholder="배치도 선택"
              value={formik.values.chartName}
              type="text"
            />

            <button
              onClick={() => {
                showSelectSeatPosChartPopup(dialogCtx!, (seatPosChart) => {
                  // setSeatPosChartId(seatPosChart.id);
                  // setSeatPosChartName(seatPosChart.name);
                  formik.values.chartId = seatPosChart.id;
                  formik.values.chartName = seatPosChart.name;
                });
              }}
              // disabled={!isSelectedOrgChart}
              className="btn-gray"
            >
              변경
            </button>
          </div>

          <label title="조직도">조직도</label>
          <div className="flex space-x-2 w-full">
            <input
              readOnly
              name="orgChartName"
              // disabled={!isSelectedOrgChart}
              className="input-white-green flex-1"
              placeholder="조직도 선택"
              value={formik.values.orgChartName}
              type="text"
            />

            <button
              onClick={() => {
                showSelectOrgChartPopup(dialogCtx!, (orgChart) => {
                  // setOrgChartId(orgChart.id);
                  // setOrgChartName(orgChart.name);

                  formik.values.orgChartId = orgChart.id;
                  formik.values.orgChartName = orgChart.name;
                });
              }}
              // disabled={!isSelectedOrgChart}
              className="btn-gray"
            >
              변경
            </button>
          </div>

          <TitleCheckButton
            title="유효한직원정보"
            className="w-[150px]"
            isSelected={formik.values.useYn}
            onClick={() => {
              //formik.values.useYn = !formik.values.useYn;
              formik.setFieldValue("useYn", !formik.values.useYn);
            }}
          />
        </div>
      </form>
    </DialogModal>
  );
}

export function showEditUserDialog(
  ctx: IDialogContextData,
  user: ISGUser,
  onOk: (user: ISGEditUserData) => void,
  canChangeDept?: boolean
): void {
  ctx?.pushDialog(
    <EditMemberModal
      key="showAddNewUserDialog"
      user={user}
      onCancel={() => ctx!.popDialog()}
      onOk={(user) => {
        ctx!.popDialog();
        onOk(user);
      }}
      canChangeDept={canChangeDept ?? true}
    />
  );
}
