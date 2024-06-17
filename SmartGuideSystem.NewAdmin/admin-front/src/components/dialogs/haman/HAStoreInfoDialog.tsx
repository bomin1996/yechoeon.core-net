import { IDialogContextData } from "@/contexts/DialogContext";
import { useContext, useEffect, useState } from "react";

import BlockUIContext from "@/contexts/BlockUIContext";
import { IHAStoreInfo } from "@shares/*";
import DummyImage from "@/assets/placeholder.webp";

import { ColorButton } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LabelFormik2 } from "@/components/ui/LabelFormik";
import SimpleComboBox from "@/components/ui/dropdown/SimpleComboBox";

interface Props {
  onCancel?: () => void;
  storeInfo: IHAStoreInfo;
  onOk: (formData: FormData) => void;
}

function HAStoreInfoDialog({ onCancel, storeInfo, onOk }: Props) {
  const formik = useFormik<IHAStoreInfo>({
    initialValues: {
      ...storeInfo,
    },
    validateOnChange: true,
    validateOnBlur: true,

    validationSchema: Yup.object({
      name: Yup.string().min(3, "3자 이상입니다.").required("필수항목입니다."),
      address: Yup.string().min(3).required("필수항목입니다."),
      tel: Yup.string().min(3).required("필수항목입니다."),
      thumbnail: Yup.string().min(3).required("필수항목입니다."),
      storeDesc: Yup.string().min(3).required("필수항목입니다."),
      approval: Yup.string().oneOf(["0", "1"]).required("필수항목입니다."),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("thumbnail", file!);
      formData.append("name", values.name);
      formData.append("tel", values.tel);
      formData.append("address", values.address);
      formData.append("storeDesc", values.storeDesc);
      formData.append("approval", values.approval ?? "0");
      onOk(formData);
    },
  });

  const [localImage, setLocalImage] = useState<string>(storeInfo.thumbnail);
  const [photoFileName, setPhotoFileName] = useState<string>();
  const [file, setFile] = useState<File>();
  // const [approvalIndex, setApprovalIndex] = useState(
  //   storeInfo?.approval === "1" ? 1 : 0
  // );

  const handleCancle = () => {
    onCancel?.();
  };

  const handleOk = () => {
    formik.handleSubmit();
  };

  const photoUrl = storeInfo?.thumbnail
    ? `/serverimages/photo/${storeInfo?.thumbnail ?? ""}`
    : DummyImage;

  const approvalIndex = formik.values.approval === "1" ? 1 : 0;

  return (
    <div className="bg-gray-700/50 fixed h-screen w-screen flex z-[10] left-0 top-0">
      <div
        className="absolute bg-[#e8e6da] 
        p-5 pt-[80px] pb-[80px] px-5
        min-w-[1000px]
      left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl shadow-2xl"
      >
        <p className="absolute  top-0 left-0 w-full h-[80px] leading-[80px] px-5 text-xl font-bold border-b-2 border-black/50">
          상점등록
        </p>

        <form
          className="w-full py-4 font-medium text-de"
          onSubmit={(ev) => {
            ev.preventDefault();
          }}
        >
          <div className="flex flex-col w-full space-y-3">
            <LabelFormik2
              name="name"
              title="상점명"
              errors={formik.errors.name}
            />

            <input
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="input-white-green"
            />
            <LabelFormik2
              name="address"
              title="주소:"
              errors={formik.errors.address}
            />
            <input
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
              className="input-white-green"
            />
            <LabelFormik2
              name="tel"
              title="전화번호:"
              errors={formik.errors.tel}
            />

            <input
              className="input-white-green "
              name="tel"
              onChange={formik.handleChange}
              value={formik.values.tel}
            />

            <LabelFormik2
              name="storeDesc"
              title="상점소개:"
              errors={formik.errors.storeDesc}
            />

            <textarea
              name="storeDesc"
              onChange={formik.handleChange}
              value={formik.values.storeDesc}
              className="input-white-green h-14 "
            />

            <SimpleComboBox
              selectedIdx={approvalIndex}
              className="w-32"
              items={["미승인", "승인"]}
              onSelectedItem={(_, index) => {
                //alert(formik.values.approval);
                //setApprovalIndex(index);
                //formik.values.approval = index === 0 ? "0" : "1";

                formik.setFieldValue("approval", index === 0 ? "0" : "1");
              }}
            />

            <LabelFormik2
              name="thumbnail"
              title="대표이미지:"
              errors={formik.errors.thumbnail}
            />

            <input
              name="photo"
              type="file"
              accept=".jpg,.png,.webp"
              onChange={(ev) => {
                if (
                  ev.currentTarget.files &&
                  ev.currentTarget.files.length > 0
                ) {
                  const reader = new FileReader();
                  const fileName = ev.currentTarget.files[0].name;
                  reader.onload = (event) => {
                    if (event.target?.result) {
                      setLocalImage(String(event.target.result));

                      formik.values.thumbnail = fileName;
                      formik.validateField("thumbnail");
                    }
                  };
                  reader.readAsDataURL(ev.currentTarget.files[0]);
                  setPhotoFileName(fileName);
                  setFile(ev.currentTarget.files[0]);
                }
              }}
            />
            <img
              className="h-[300px] w-[400px] object-cover rounded-[24px] bg-blue-500/50"
              src={localImage ?? photoUrl}
            />
          </div>
        </form>

        <div className="absolute items-center px-4 space-x-3 bottom-0 left-0 w-full h-[80px] flex justify-end border-t-2 border-black/50">
          <ColorButton
            className="w-[120px] h-[50px]"
            title="취소"
            onClick={handleCancle}
            colorStyle="save"
          />
          <ColorButton
            className="w-[120px] h-[50px]"
            disable={!(formik.isValid && formik.dirty)}
            title="확인"
            onClick={handleOk}
            colorStyle="confirm"
          />
        </div>
      </div>
    </div>
  );
}

export default function showHAStoreInfoDialog(
  ctx: IDialogContextData,
  params: {
    onCancel?: () => void;
    storeInfo: IHAStoreInfo;
    onOk: (formData: FormData) => void;
  }
) {
  ctx.pushDialog(
    <HAStoreInfoDialog
      key={"showHAStoreInfoDialog"}
      storeInfo={params.storeInfo}
      onOk={(si) => {
        ctx?.popDialog();
        params.onOk(si);
      }}
      onCancel={() => {
        ctx?.popDialog();
        params.onCancel?.();
      }}
    />
  );
}
