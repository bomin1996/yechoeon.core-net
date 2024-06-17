import {  ISGLocalMap } from "@shares/*";
import { useContext, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import DialogContext, { IDialogContextData } from "@/contexts/DialogContext";
import { useFormik } from "formik";

import * as Yup from "yup";
import LabelFormik from "../ui/LabelFormik";
import LocalMapEditImage from "../ui/LocalMapEditImage";

interface Props {
  localMap: ISGLocalMap;
  onCancel: () => void;
  onOk: (user: ISGLocalMap) => void;
}

export default function EditLocalMapModal({ localMap, onOk, onCancel }: Props) {
  const [localImage, setLocalImage] = useState<string>();
  const [photoFileName, setPhotoFileName] = useState<string>();

  const formik = useFormik<ISGLocalMap>({
    initialValues: {
      ...localMap,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("필수항목입니다."),
    }),
    onSubmit: (values) => {
      values.photoDataBase64 = localImage;
      values.photoFileName = photoFileName;
      onOk(values);
    },
  });

  const photoUrl = `/serverimages/photo/${localMap?.url ?? ""}`;
  const dialogCtx = useContext(DialogContext);

  return (
    <DialogModal
      isOpen={true}
      title="관내도정보"
      onOk={() => formik.handleSubmit()}
      canOk={formik.isValid && formik.dirty}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}
    >
      <form
        className="text-sm text-left flex flex-row space-x-[32px] w-[680px]"
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="space-y-2 flex flex-col w-full">
          <LabelFormik name="name" title="이름" errors={formik.errors.name} />
          <input
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />
          <LabelFormik name="desc" title="설명" errors={formik.errors.desc} />
          <textarea
            name="desc"
            onChange={formik.handleChange}
            value={formik.values.desc}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />
          <label title="사진">사진</label>
          <LocalMapEditImage
            height={400}
            src={localImage ?? photoUrl}
            className="rounded-md bg-black/25 h-[400px] object-contain "
          />
          <input
            name="photo"
            type="file"
            accept=".jpg,.png,.webp"
            onChange={(ev) => {
              if (ev.currentTarget.files && ev.currentTarget.files.length > 0) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  if (event.target?.result) {
                    setLocalImage(String(event.target.result));
                  }
                };
                reader.readAsDataURL(ev.currentTarget.files[0]);
                setPhotoFileName(ev.currentTarget.files[0].name);
              }
            }}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />
        </div>
      </form>
    </DialogModal>
  );
}

export function showEditLocalMapDialog(
  ctx: IDialogContextData,
  localmap: ISGLocalMap,
  onOk: (user: ISGLocalMap) => void
): void {
  ctx?.pushDialog(
    <EditLocalMapModal
      key="showAddNewLocalMapDialog"
      localMap={localmap}
      onCancel={() => ctx!.popDialog()}
      onOk={(user) => {
        ctx!.popDialog();
        onOk(user);
      }}
    />
  );
}
