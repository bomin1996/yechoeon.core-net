import { IDialogContextData } from "@/contexts/DialogContext";
import { useContext, useEffect, useState } from "react";
import BlockUIContext from "@/contexts/BlockUIContext";
import { IHABusInfo } from "@shares/*";
import { ColorButton } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import LabelFormik from "@/components/ui/LabelFormik";

interface Props {
  title: string;
  onCancel?: () => void;
  busRouteInfo: IHABusInfo;
  onOk: (formData: FormData) => void;
}

function HABusFareDialog({ title, onCancel, busRouteInfo, onOk }: Props) {
  //const [localImage, setLocalImage] = useState<string>();
  const [file, setFile] = useState<File>();

  const formik = useFormik<IHABusInfo>({
    initialValues: {
      ...busRouteInfo,
    },

    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("dataType", "BusFare");
      formData.append("busTypeName", values.busTypeName!);
      formData.append("busRouteName", "");
      formData.append("desc", values.desc!);
      formData.append("file", file!);
      onOk(formData);
    },
  });

  const blockUICtx = useContext(BlockUIContext);

  const handleCancle = () => {
    onCancel?.();
  };

  const handleOk = () => {
    formik.handleSubmit();
  };
  title;

  const photoUrl = busRouteInfo?.imageUrl
    ? `${busRouteInfo?.imageUrl ?? ""}`
    : undefined;

  return (
    <div className="bg-black/50 fixed h-screen w-screen flex z-[10] left-0 top-0 ">
      <div
        className="absolute bg-[#e8e6da] p-6 
       left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl shadow-2xl flex flex-col ">
        {/* 타이틀 */}
        <span className="text-lg text-[#221e1f] font-bold border-b-2 border-black mb-3">
          {title}
        </span>

        {/* 폼데이터 */}
        <form
          className="w-full flex flex-col gap-y-1 text-md"
          onSubmit={(ev) => {
            ev.preventDefault();
          }}>
          <LabelFormik
            name="busTypeName"
            title="버스타입명:"
            className="pt-2"
            errors=""
          />

          <input
            readOnly={true}
            name="busTypeName"
            placeholder="버스타입명 입력하세요"
            value={busRouteInfo.busTypeName}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline bg-slate-100"
          />

          <LabelFormik
            name="desc"
            title="설명:"
            className="pt-2"
            errors={formik.errors.desc}
          />
          <input
            name="desc"
            placeholder="버스경로 설명을 입력하세요"
            onChange={formik.handleChange}
            value={formik.values.desc}
            className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          />

          <LabelFormik
            name="imageUrl"
            title="버스노선도이미지:"
            errors={formik.errors.imageUrl}
            className="pt-2"
          />

          <input
            name="photo"
            type="file"
            className="pb-2 pt-2 text-sm"
            accept=".jpg,.png,.webp"
            onChange={(ev) => {
              if (ev.currentTarget.files && ev.currentTarget.files.length > 0) {
                const reader = new FileReader();
                const fileName = ev.currentTarget.files[0].name;
                reader.onload = (event) => {
                  if (event.target?.result) {
                    //setLocalImage(String(event.target.result));
                    formik.setFieldValue(
                      "imageUrl",
                      String(event.target.result)
                    );
                  }
                };
                reader.readAsDataURL(ev.currentTarget.files[0]);
                setFile(ev.currentTarget.files[0]);
              }
            }}
          />

          <img
            className="h-[300px] w-[500px] object-contain rounded-[8px] bg-gray-400/50"
            //src={localImage ?? photoUrl}
            src={formik.values.imageUrl}
          />
        </form>

        <div className=" gap-2 bottom-4 right-4 w-full h-[66px] flex justify-end pt-[20px]">
          <ColorButton
            className="w-[120px]"
            title="취소"
            onClick={handleCancle}
            colorStyle="save"
          />
          <ColorButton
            className="w-[120px]"
            title="확인"
            disable={!formik.isValid || !formik.dirty}
            onClick={handleOk}
            colorStyle="confirm"
          />
        </div>
      </div>
    </div>
  );
}

export default function showHABusFareInfoDialog(
  ctx: IDialogContextData,
  params: {
    title: string;
    onCancel?: () => void;
    busRouteInfo: IHABusInfo;
    onOk: (formData: FormData) => void;
  }
) {
  ctx.pushDialog(
    <HABusFareDialog
      title={params.title}
      key={"showHAStoreInfoDialog"}
      busRouteInfo={params.busRouteInfo}
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
