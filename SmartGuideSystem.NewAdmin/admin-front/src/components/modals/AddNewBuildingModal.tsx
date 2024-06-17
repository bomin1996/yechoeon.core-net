import React, { useEffect, useState } from "react";
import DialogModal from "@/components/ui/modal/DialogModal";
import { IDialogContextData } from "@/contexts/DialogContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import LabelFormik from "../ui/LabelFormik";

interface InputData {
  name?: string;
  deptCode?: string;
}

interface Props {
  title: string;
  onCancel: () => void;
  building?: InputData;
  onOk: (buildingName: string, buildingCode: string) => void;
}

function AddNewBuildingModal({ title, onOk, onCancel, building }: Props) {
  const formik = useFormik<InputData>({
    initialValues: {
      ...building,
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2).required("필수항목입니다."),
      deptCode: Yup.string().min(4).required("필수항목입니다."),
    }),

    onSubmit: (values) => {
      onOk(values.name!, values.deptCode!);
    },
  });

  return (
    <DialogModal
      isOpen={true}
      title={title}
      onOk={() => formik.handleSubmit()}
      canOk={formik.isValid}
      onCancel={() => onCancel()}
      onClose={() => onCancel()}
    >
      <form
        className="w-full h-full flex flex-col text-[#221e1f] p-8 gap-4 "
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
        <LabelFormik
          name={"name"}
          title={"빌딩명"}
          errors={formik.errors.name}
        />
        <input
          className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <LabelFormik
          name={"deptCode"}
          title={"빌딩코드"}
          errors={formik.errors.deptCode}
        />
        <input
          className="px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
          name="deptCode"
          value={formik.values.deptCode}
          onChange={formik.handleChange}
        />
      </form>
    </DialogModal>
  );
}

export function showAddNewBuildingDialog(
  ctx: IDialogContextData,
  onOk: (buildingName: string, buildingCode: string) => void
): void {
  ctx?.pushDialog(
    <AddNewBuildingModal
      key="showAddNewBuildingDialog"
      title="빌딩추가"
      onCancel={() => ctx!.popDialog()}
      onOk={(buildingName, buildingCode) => {
        ctx!.popDialog();
        onOk(buildingName, buildingCode);
      }}
    />
  );
}
