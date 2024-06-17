import { IYCSchedule } from "@shares/*";
import { useContext, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import DialogContext, { IDialogContextData } from "@/contexts/DialogContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DateTime } from "luxon";
import LabelFormik from "../ui/LabelFormik";

interface Props {
  scheduleInfo: IYCSchedule;
  onCancel: () => void;
  enableEdit: boolean;
  onOk: (watcherInfo: IYCSchedule) => void;
}

interface InputData extends IYCSchedule {
  // editStartTime: string;
  // editEndTime: string;
  // editMeetingDate: string;
}

export default function EditYCScheduleModal({
  scheduleInfo,
  onOk,
  onCancel,
  enableEdit,
}: Props) {
  const startTimeDate = DateTime.fromISO(scheduleInfo.scheduleDate);
  const [scheduleDate, setScheduleDate] = useState(
    startTimeDate.toFormat("yyyy-MM-dd")
  );

  const formik = useFormik<InputData>({
    initialValues: {
      ...scheduleInfo,
      // editStartTime: DateTime.fromISO(meetingInfo.startTime).toFormat("HH:mm"),
      // editEndTime: DateTime.fromISO(meetingInfo.endTime).toFormat("HH:mm"),
      // editMeetingDate: DateTime.fromISO(meetingInfo.startTime).toFormat(
      //   "yyyy-MM-dd"
      // ),
    },
    validationSchema: Yup.object({
      contents: Yup.string().required("필수항목입니다."),
      scheduleDate: Yup.string().required("필수항목입니다."),
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
      const mdt = DateTime.fromFormat(scheduleDate, "yyyy-MM-dd");
      const year = mdt.year;
      const month = mdt.month;
      const day = mdt.day;
      const scheduleInfo: IYCSchedule = {
        ...values,

        scheduleDate: mdt
          .set({ hour: 0, minute: 0, second: 0 })
          .toUTC()
          .toISO()!,
        modifiedTime: DateTime.now().toUTC().toISO()!,
      };
      onOk(scheduleInfo);
    },
  });

  const dialogCtx = useContext(DialogContext);

  return (
    <DialogModal
      isOpen={true}
      title="일정 정보"
      onOk={() => formik.handleSubmit()}
      canOk={true}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}>
      <div className="w-[800px] h-full flex flex-col text-[#221e1f] p-8 gap-4 ">
        <form
          className="flex flex-col space-y-[8px] text-sm text-left"
          onSubmit={(ev) => {
            ev.preventDefault();
          }}>
          <LabelFormik
            name="contents"
            title="내용"
            errors={formik.errors.contents}
          />
          <input
            name="contents"
            type="text"
            placeholder="내용 입력"
            readOnly={!enableEdit}
            onChange={formik.handleChange}
            value={formik.values.contents}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline  disabled:bg-black/5 read-only:bg-black/5"
          />

          <LabelFormik name="desc" title="비고" errors={formik.errors.desc} />
          <input
            name="desc"
            type="text"
            placeholder="비고 입력"
            readOnly={!enableEdit}
            onChange={formik.handleChange}
            value={formik.values.desc}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline  disabled:bg-black/5 read-only:bg-black/5"
          />

          <LabelFormik
            name="scheduleDate"
            title="일시 날짜"
            errors={formik.errors.scheduleDate}
          />

          <input
            name="editMeetingDate"
            type="date"
            readOnly={!enableEdit}
            value={scheduleDate}
            onChange={(ev) => setScheduleDate(ev.target.value)}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline  disabled:bg-black/5 read-only:bg-black/5"
          />
        </form>
      </div>
    </DialogModal>
  );
}

export function showEditYCScheduleDialog(
  ctx: IDialogContextData,
  scheduleInfo: IYCSchedule,
  enableEdit: boolean,
  onOk: (scheduleInfo: IYCSchedule) => void
): void {
  ctx?.pushDialog(
    <EditYCScheduleModal
      key="showEditYCScheduleDialog"
      scheduleInfo={scheduleInfo}
      enableEdit={enableEdit}
      onCancel={() => ctx!.popDialog()}
      onOk={(scheduleInfo) => {
        ctx!.popDialog();
        onOk(scheduleInfo as IYCSchedule);
      }}
    />
  );
}
