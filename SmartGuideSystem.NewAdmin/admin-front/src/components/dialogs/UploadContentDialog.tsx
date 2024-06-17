import { IDialogContextData } from "@/contexts/DialogContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shad-components/ui/dialog";

import { Button } from "@/shad-components/ui/button";
import { useContext, useEffect, useState } from "react";
import axios, { CancelTokenSource } from "axios";
import { Progress } from "@/shad-components/ui/progress";
import { Label } from "@/shad-components/ui/label";
import BlockUIContext from "@/contexts/BlockUIContext";

interface Props {
  onCancel?: () => void;
  formData: FormData;
  categoryName: string;
  onComplete: (uploadedFileName: string) => void;
}

// function UploadContentDialog({
//   onCancel,
//   formData,
//   categoryName,
//   onComplete,
// }: Props) {
//   const [progress, setProgress] = useState(0);
//   const [source, setSource] = useState<CancelTokenSource>();
//   const fileName = formData.get("FileName");

//   useEffect(() => {
//     const CancelToken = axios.CancelToken;
//     const source = CancelToken.source();
//     setSource(source);
//     try {
//       const uploadUrl = `/api/content/uploadcontent/${categoryName}`;
//       axios
//         .post(uploadUrl, formData, {
//           cancelToken: source.token,
//           onUploadProgress: (e) => {
//             if (e.total) {
//               const percent = (e.loaded / e.total) * 100;
//               setProgress(Math.floor(percent));
//             }
//           },
//         })
//         .then((res) => {
//           // const { path } = res.data;
//           // onComplete("/serverimages/" + path);
//           onComplete(JSON.stringify(res.data));
//         })
//         .catch((ex) => onCancel?.());
//     } catch (exc) {
//       alert(JSON.stringify(exc));
//     }
//   }, []);

//   const handleCancle = () => {
//     if (source) {
//       source.cancel();
//       onCancel?.();
//     }
//   };

//   return (
//     <Dialog defaultOpen={true} onOpenChange={onCancel}>
//       <DialogContent className="w-[500px] bg-[#e8e6da]">
//         <DialogHeader>
//           <DialogTitle className="text-sm">
//             업로드파일: {`${fileName}`}
//           </DialogTitle>
//           <DialogDescription>
//             <div className="">
//               <div className="flex h-10">
//                 <Progress value={progress} className="flex-1" />
//                 <Label className="w-[100px] text-right">{progress}%</Label>
//               </div>
//               <Button onClick={handleCancle} variant={"default"}>
//                 Cancel
//               </Button>
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// }

function UploadContentDialog({
  onCancel,
  formData,
  categoryName,
  onComplete,
}: Props) {
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [source, setSource] = useState<CancelTokenSource>();
  const fileName = formData.get("FileName");
  const fileSize = formData.get("FileSize");
  const blockUICtx = useContext(BlockUIContext);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setSource(source);
    try {
      const uploadUrl = `/api/content/uploadcontent/${categoryName}`;
      axios
        .post(uploadUrl, formData, {
          cancelToken: source.token,
          onUploadProgress: (e) => {
            if (e.total) {
              const percent = (e.loaded / e.total) * 100;
              setProgress(Math.floor(percent));
              if (percent >= 100) {
                blockUICtx?.setBlock(true);
                setUploaded(true);
              }
            }
          },
        })
        .then((res) => {
          blockUICtx?.setBlock(false);
          onComplete(JSON.stringify(res.data));
        })
        .catch((ex) => onCancel?.());
    } catch (exc) {
      alert(JSON.stringify(exc));
    }
  }, []);

  const handleCancle = () => {
    if (source) {
      source.cancel();
      onCancel?.();
    }
  };

  return (
    <div className="bg-black/30 fixed h-screen w-screen flex z-[10] left-0 top-0">
      <div
        className="absolute bg-[#e8e6da] w-[600px] h-[240px] 
      left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl shadow-2xl"
      >
        <div className="p-5">
          <p className="font-bold">파일이름: {`${fileName}`}</p>
          <p className="font-bold text-black/90">
            파일크기: {`${fileSize ?? 0}`} bytes
          </p>
          <div className="flex items-center h-10 mt-2">
            <Progress value={progress} className="flex-1 h-5" />
            <Label className="w-[70px] font-bold text-lg text-right">
              {progress}%
            </Label>
          </div>
          {uploaded && (
            <p className="text-lg text-center w-full p-2">완료중...</p>
          )}
          <Button
            className="absolute left-[50%] bottom-[20px] translate-x-[-50%]"
            onClick={handleCancle}
            variant={"default"}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function showUploadContentDialog(
  ctx: IDialogContextData,
  params: {
    onCancel?: () => void;
    formData: FormData;
    categoryName: string;
    onComplete: (uploadedFileName: string) => void;
  }
) {
  ctx.pushDialog(
    <UploadContentDialog
      key={"showUploadContentDialog"}
      categoryName={params.categoryName}
      formData={params.formData}
      onCancel={() => {
        ctx?.popDialog();
        params.onCancel?.();
      }}
      onComplete={(url) => {
        ctx?.popDialog();
        params.onComplete(url);
      }}
    />
  );
}
