import { IYCWatcher } from "@shares/*";
import { useContext, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import DialogContext, { IDialogContextData } from "@/contexts/DialogContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DateTime } from "luxon";
import LabelFormik from "../ui/LabelFormik";

interface Props {
  watcherInfo: IYCWatcher;
  onCancel: () => void;
  enableEdit: boolean;
  onOk: (watcherInfo: IYCWatcher) => void;
}

interface InputData extends IYCWatcher {
  // editStartTime: string;
  // editEndTime: string;
  // editMeetingDate: string;
}

export default function EditYCWatcherModal({
  watcherInfo,
  onOk,
  onCancel,
  enableEdit,
}: Props) {
  const startTimeDate = DateTime.fromISO(watcherInfo.offDutyDate);
  const [offDutyDate, setOffDutyDate] = useState(
    startTimeDate.toFormat("yyyy-MM-dd")
  );

  const formik = useFormik<InputData>({
    initialValues: {
      ...watcherInfo,
    },
    validationSchema: Yup.object({
      watcherName: Yup.string().required("필수항목입니다."),
      offDutyDate: Yup.string().required("필수항목입니다."),
    }),
    validate: (values) => {},
    onSubmit: (values) => {
      const mdt = DateTime.fromFormat(offDutyDate, "yyyy-MM-dd");
      const year = mdt.year;
      const month = mdt.month;
      const day = mdt.day;
      const watcherInfo: IYCWatcher = {
        ...values,

        offDutyDate: mdt
          .set({ hour: 0, minute: 0, second: 0 })
          .toUTC()
          .toISO()!,
        modifiedTime: DateTime.now().toUTC().toISO()!,
      };
      onOk(watcherInfo);
    },
  });

  const dialogCtx = useContext(DialogContext);

  return (
    <DialogModal
      isOpen={true}
      title="당직자 정보"
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
            name="watcherName"
            title="당직자이름"
            errors={formik.errors.watcherName}
          />
          <input
            name="watcherName"
            type="text"
            readOnly={!enableEdit}
            placeholder="당직자 이름 입력"
            onChange={formik.handleChange}
            value={formik.values.watcherName}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline disabled:bg-black/5 read-only:bg-black/5"
          />

          <LabelFormik
            name="location"
            title="장소"
            errors={formik.errors.location}
          />
          <input
            name="location"
            type="text"
            placeholder="장소 입력"
            readOnly={!enableEdit}
            onChange={formik.handleChange}
            value={formik.values.location}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline  disabled:bg-black/5 read-only:bg-black/5"
          />

          <LabelFormik
            name="division"
            title="구분"
            errors={formik.errors.division}
          />
          <input
            name="division"
            type="text"
            placeholder="구분 입력"
            readOnly={!enableEdit}
            onChange={formik.handleChange}
            value={formik.values.division}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline  disabled:bg-black/5 read-only:bg-black/5"
          />

          <LabelFormik
            name="offDutyDate"
            title="당직 날짜"
            errors={formik.errors.offDutyDate}
          />

          <input
            name="editMeetingDate"
            type="date"
            readOnly={!enableEdit}
            value={offDutyDate}
            onChange={(ev) => setOffDutyDate(ev.target.value)}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline  disabled:bg-black/5 read-only:bg-black/5"
          />

          <LabelFormik name="desc" title="비고" errors={formik.errors.desc} />
          <textarea
            name="desc"
            readOnly={!enableEdit}
            value={formik.values.desc}
            onChange={formik.handleChange}
            className="col-span-4 row-span-3 h-[120px] p-2 disabled:bg-black/5 read-only:bg-black/5"
          />
        </form>
      </div>
    </DialogModal>
  );
}

export function showEditYCWatcherDialog(
  ctx: IDialogContextData,
  watcherInfo: IYCWatcher,
  enableEdit: boolean,
  onOk: (watcherInfo: IYCWatcher) => void
): void {
  ctx?.pushDialog(
    <EditYCWatcherModal
      key="showEditYCWatcherDialog"
      watcherInfo={watcherInfo}
      enableEdit={enableEdit}
      onCancel={() => ctx!.popDialog()}
      onOk={(watcherInfo) => {
        ctx!.popDialog();
        onOk(watcherInfo as IYCWatcher);
      }}
    />
  );
}
