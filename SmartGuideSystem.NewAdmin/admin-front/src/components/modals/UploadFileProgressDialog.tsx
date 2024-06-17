import { useContext, useEffect, useState } from "react";
import DialogContext from "@/contexts/DialogContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  
} from "@/shad-components/ui/dialog";
import axios, { CancelTokenSource } from "axios";

interface Props {
  formData: FormData;
  onCancel: () => void;
  onComplete: (uploadedFileName: string) => void;
  onOpenClose: (open: boolean) => void;
}
export default function UploadFileProgressDialog({
  formData,
  onOpenClose,
  onComplete,
  onCancel,
}: Props) {
  const [, setProgress] = useState(0);
  const [source, setSource] = useState<CancelTokenSource>();
  // const fileName = formData.get("FileName");

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
    <Dialog
      defaultOpen={true}
      onOpenChange={(open) => {
        handleCancle();
        onOpenClose(open);
      }}
    >
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

// export function showFileUploadDialog(
//     ctx: IDialogContextData,
//     formData: FormData,
//     onCancel: () => void,
//     onComplete: (url: string) => void
//   ): void {
//     ctx?.pushDialog(
//       <FileUploadDialog
//         key={"showFileUploadDialog"}
//         formData={formData}
//         onCancel={() => {
//           ctx?.popDialog();
//           onCancel();
//         }}
//         onComplete={(url) => {
//           ctx?.popDialog();
//           onComplete(url);
//         }}
//       />
//     );
//   }

export function useUploadFileProgressDialog(formData: FormData) {
  const dialogCtx = useContext(DialogContext);
  const showDialog = (onClose: (isOk: boolean) => void) => {
    dialogCtx?.pushDialog(
      <UploadFileProgressDialog
        key={"useUploadFileProgressDialog"}
        formData={formData}
        onOpenClose={(open) => {
          alert(`open:${open}`);
          if (!open) {
            dialogCtx?.popDialog();
          }

          onClose(false);
        }}
        onCancel={() => {
          dialogCtx?.popDialog();
        }}
        onComplete={() => {
          dialogCtx?.popDialog();
        }}
      />
    );
  };

  return { showDialog };
}

export function useOkDialog(onOk: () => void) {
  const dialogCtx = useContext(DialogContext);
  dialogCtx?.pushDialog(
    <Dialog
      defaultOpen={true}
      onOpenChange={(open) => {
        dialogCtx?.popDialog();
        onOk();
      }}
    >
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
