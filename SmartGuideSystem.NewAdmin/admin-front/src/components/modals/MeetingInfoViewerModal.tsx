import { ISGMeetingInfo } from "@shares/*";
import { useContext, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import DialogContext, { IDialogContextData } from "@/contexts/DialogContext";
import { useFormik } from "formik";

import * as Yup from "yup";
import { showSelectDepartmentPopup } from "./SelectFindDepartmentModal";
import { DateTime } from "luxon";
import LabelFormik from "../ui/LabelFormik";

interface Props {
  meetingInfo: ISGMeetingInfo;
  onCancel: () => void;
  onOk: (meetingInfo: ISGMeetingInfo) => void;
}

interface InputData extends ISGMeetingInfo {
  // editStartTime: string;
  // editEndTime: string;
  // editMeetingDate: string;
}

export default function MeetingInfoViewerModal({
  meetingInfo,
  onOk,
  onCancel,
}: Props) {
  // const now = DateTime.now().setLocale("ko");
  const startTimeDate = DateTime.fromISO(meetingInfo.startTime);

  const [, setDeptName] = useState(meetingInfo.deptName);
  // const [startTime, setStartTime] = useState(now.toFormat("HH:00"));
  // const [endTime, setEndTime] = useState(now.toFormat("HH:mm"));
  const [meetingDate, setMeetingDate] = useState(
    startTimeDate.toFormat("yyyy-MM-dd")
  );

  DateTime.fromISO(meetingInfo.startTime).toFormat("HH:mm");
  const formik = useFormik<InputData>({
    initialValues: {
      ...meetingInfo,
      startTime: DateTime.fromISO(meetingInfo.startTime).toFormat("HH:mm"),
      endTime: DateTime.fromISO(meetingInfo.endTime).toFormat("HH:mm"),
      // editStartTime: DateTime.fromISO(meetingInfo.startTime).toFormat("HH:mm"),
      // editEndTime: DateTime.fromISO(meetingInfo.endTime).toFormat("HH:mm"),
      // editMeetingDate: DateTime.fromISO(meetingInfo.startTime).toFormat(
      //   "yyyy-MM-dd"
      // ),
    },
    validationSchema: Yup.object({
      //deptCode: Yup.string().required("필수항목입니다."),
      name: Yup.string().required("필수항목입니다."),
      subject: Yup.string().required("필수항목입니다."),
      meetingRoom: Yup.string().required("필수항목입니다."),
      deptName: Yup.string().required("필수항목입니다."),
      startTime: Yup.string().required(),
      endTime: Yup.string()
        .required()
        .test(
          "bigger than start time",
          "종료시간은 시작시간보다 크게 설정되어야 합니다.",
          (val) => {
            const start = DateTime.fromISO(formik.values.startTime);
            const end = DateTime.fromISO(val);
            return end > start;
          }
        ),
    }),
    validate: (values) => {
      // if (values.name.length < 5) {
      //   return { name: "too short name!!!" };
      // }
      // const start = DateTime.fromISO(startTime);
      // const end = DateTime.fromISO(endTime);
      // if (end < start) {
      //   return { endTime: "종료시간은 시작시간보다 크게 설정되어야 합니다." };
      // }
    },
    onSubmit: (values) => {
      const mdt = DateTime.fromFormat(meetingDate, "yyyy-MM-dd");
      const year = mdt.year;
      const month = mdt.month;
      const day = mdt.day;
      const meetingInfo: ISGMeetingInfo = {
        ...values,

        startTime: DateTime.fromFormat(values.startTime, "HH:mm")
          .set({ year, month, day })
          .toUTC()
          .toISO()!,
        endTime: DateTime.fromFormat(values.endTime, "HH:mm")
          .set({ year, month, day })
          .toUTC()
          .toISO()!,
        meetingDate: mdt
          .set({ hour: 0, minute: 0, second: 0 })
          .toUTC()
          .toISO()!,
        modifiedTime: DateTime.now().toUTC().toISO()!,
        status: "",
      };
      onOk(meetingInfo);
    },
  });

  // const dt = DateTime.fromFormat(startTime, "HH:mm");
  // dt.set({ year: 2023 });
  // dt.toJSDate();

  const dialogCtx = useContext(DialogContext);

  return (
    <DialogModal
      isOpen={true}
      title="회의정보"
      onOk={() => formik.handleSubmit()}
      canOk={true}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}
    >
      <div className="w-[800px] h-full flex flex-col text-[#221e1f] p-8 gap-4 ">
        {/* <h1 className="text-[64px]">{now.toFormat("a HH:mm")}</h1> */}
        <form
          className="flex flex-col space-y-[8px] text-sm text-left"
          onSubmit={(ev) => {
            ev.preventDefault();
            //formik.handleSubmit(ev);
          }}
        >
          <LabelFormik
            name="name"
            title="회의이름"
            errors={formik.errors.name}
          />
          <input
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <LabelFormik
            name="subject"
            title="주제"
            errors={formik.errors.subject}
          />
          <input
            name="subject"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.subject}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <LabelFormik
            name="meetingRoom"
            title="회의실"
            errors={formik.errors.meetingRoom}
          />
          <input
            name="meetingRoom"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.meetingRoom}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <LabelFormik
            name="meetingDate"
            // name="editMeetingDate"
            title="회의날짜"
            errors={formik.errors.meetingDate}
            // errors={formik.errors.editMeetingDate}
          />

          <input
            name="editMeetingDate"
            type="date"
            // onChange={formik.handleChange}
            // value={formik.values.editMeetingDate}
            value={meetingDate}
            onChange={(ev) => setMeetingDate(ev.target.value)}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <LabelFormik
            name="startTime"
            title="시작시간"
            errors={formik.errors.startTime}
          />
          <input
            name="startTime"
            type="time"
            min="10:00"
            // value={startTime}
            // onChange={(ev) => setStartTime(ev.currentTarget.value)}
            onChange={formik.handleChange}
            value={formik.values.startTime}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <LabelFormik
            name="endTime"
            title="종료시간"
            errors={formik.errors.endTime}
          />
          <input
            name="endTime"
            type="time"
            // value={endTime}
            // onChange={(ev) => {
            //   setEndTime(ev.currentTarget.value);
            // }}
            onChange={formik.handleChange}
            value={formik.values.endTime}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <label title="관련부서">관련부서</label>

          <div className="flex w-full">
            <input
              name="deptName"
              // readOnly
              // disabled={!isSelectedOrgChart}
              onChange={formik.handleChange}
              className="input-white-green mr-1 "
              placeholder="관련부서 선택"
              value={formik.values.deptName}
              type="text"
            />

            <button
              onClick={() => {
                showSelectDepartmentPopup(dialogCtx!, (department) => {
                  //setDepartment(department);
                  // setDeptCode(department.deptCode);
                  setDeptName(department.name);
                  // setParentDepth(department.depth);
                  // setDepth(department.depth + 1);
                  formik.values.deptName = department.name;
                  formik.values.deptCode = department.deptCode;
                });
              }}
              // disabled={!isSelectedOrgChart}
              className="btn-gray"
            >
              변경
            </button>
          </div>

          <LabelFormik
            name="contents"
            title="내용"
            errors={formik.errors.contents}
          />
          <textarea
            name="contents"
            value={formik.values.contents}
            onChange={formik.handleChange}
            className="col-span-4 row-span-3 h-[120px] p-2"
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
//       {errors ? `${title} : ${errors}` : title}
//     </label>
//   );
// }

export function showMeetingInfoDialog(
  ctx: IDialogContextData,
  meetingInfo: ISGMeetingInfo,
  onOk: (meetingInfo: ISGMeetingInfo) => void
): void {
  ctx?.pushDialog(
    <MeetingInfoViewerModal
      key="showMeetingInfoDialog"
      meetingInfo={meetingInfo}
      onCancel={() => ctx!.popDialog()}
      onOk={(meetingInfo) => {
        ctx!.popDialog();
        onOk(meetingInfo as ISGMeetingInfo);
      }}
    />
  );
}
