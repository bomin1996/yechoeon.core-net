import { useEffect, useState, Fragment } from "react";
import { IDialogContextData } from "src/contexts/DialogContext";
import axios, { CancelToken, CancelTokenSource } from "axios";
import ColorButton from "../ui/button/ColorButton";
import DialogModal from "../ui/modal/DialogModal";

interface Props {
  formData: FormData;
  onCancel: () => void;
  onComplete: (uploadedFileName: string) => void;
}

export default function FileUploadDialog({
  formData,
  onCancel,
  onComplete,
}: Props) {
  const [progress, setProgress] = useState(0);
  const [source, setSource] = useState<CancelTokenSource>();

  const fileName = formData.get("FileName");
  console.log("fileName", fileName);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setSource(source);
    try {
      const categoryName = "test";
      const uploadUrl = `/api/content/uploadcontent/${categoryName}`;
      axios
        .post(uploadUrl, formData, {
          cancelToken: source.token,
          onUploadProgress: (e) => {
            if (e.total) {
              const percent = (e.loaded / e.total) * 100;
              setProgress(Math.floor(percent));
            }
          },
        })
        .then((res) => {
          // const { path } = res.data;
          // onComplete("/serverimages/" + path);
          onComplete(JSON.stringify(res.data));
        })
        .catch((ex) => onCancel());
    } catch (exc) {
      alert(JSON.stringify(exc));
    }
  }, []);

  const handleCancle = () => {
    if (source) {
      source.cancel();
      onCancel();
    }
  };

  return (
    <DialogModal
      isOpen={true}
      onClose={onCancel}
      onCancel={onCancel}
      title={""}
    >
      <div className="m-auto w-[400px] h-[300px] ">
        <h1>Upload Video File</h1>
        <p>FileName: {fileName?.toString()}</p>
        <progress
          value={progress}
          max={100}
          className="w-full h-10 rounded-md"
        />
        <div className="w-full h-full flex flex-col text-[#221e1f] items-center ">
          Progress : {progress}
        </div>
        <ColorButton
          colorStyle="cancel"
          title="cancle"
          onClick={handleCancle}
        />
      </div>
    </DialogModal>
  );
}

export function showFileUploadDialog(
  ctx: IDialogContextData,
  formData: FormData,
  onCancel: () => void,
  onComplete: (url: string) => void
): void {
  ctx?.pushDialog(
    <FileUploadDialog
      key={"showFileUploadDialog"}
      formData={formData}
      onCancel={() => {
        ctx?.popDialog();
        onCancel();
      }}
      onComplete={(url) => {
        ctx?.popDialog();
        onComplete(url);
      }}
    />
  );
}
