import React, { FormEvent, useContext, useState } from "react";
import axios from "axios";
import ColorButton from "../ui/button/ColorButton";
import BlockUIContext from "@/contexts/BlockUIContext";
import { ManageApi } from "@/server/manageApi";
import { showMessageOkCancelDialog } from "../modals";
import DialogContext from "@/contexts/DialogContext";
// import { showVideoUploadDialog } from "../modals/VideoUploadDialog";
import toast from "react-hot-toast";
export default function Index() {
  // const [data, setData] = useState<number[]>([]);
  const blockUICtx = useContext(BlockUIContext);
  const dialogCtx = useContext(DialogContext);

  const [_, setProgress] = useState(0);

  // const [uploadFileName, setUploadFileName] = useState("");
  // const [videoUrl, setVideoUrl] = useState("");

  const handleImportUserAndDepartData = () => {
    showMessageOkCancelDialog(
      dialogCtx!,
      "부서와 사용자 업데이트",
      "경고) 시스템관리자만이 사용가능합니다. 많은 시간이 걸리고, 전체시스템이 정지될 수 있습니다.\r\n사용자를 업데이트한 후 조직도 재저장 및 변경해야 합니다.\r\n퇴근시간이외에 업데이트 하는 것을 권장합니다.",
      async () => {
        blockUICtx?.setBlock(true);
        const {  error } = await ManageApi.migrateDB();
        blockUICtx?.setBlock(false);
        if (!error) {
          toast(`업데이트완료`);
        } else {
          toast(`오류발생: ${error}`);
        }
      }
    );
  };

  const handleUploadVideoSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    blockUICtx?.setBlock(true);
    setProgress(0);

    const data = new FormData(ev.target as HTMLFormElement);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    try {
      const res = await axios.post("/api/images/videos", data, {
        cancelToken: source.token,
        onUploadProgress: (e) => {
          if (e.total) {
            const percent = (e.loaded / e.total) * 100;
            setProgress(percent);
          }
        },
      });
    } catch (exc) {
      alert(JSON.stringify(exc));
    }

    blockUICtx?.setBlock(false);
  };

  const handleUploadVideoSubmit2 = async (ev: FormEvent) => {
    ev.preventDefault();
    const data = new FormData(ev.target as HTMLFormElement);
    // showVideoUploadDialog(
    //   dialogCtx!,
    //   data,
    //   () => {
    //     console.log("Cancel Upload Video");
    //   },
    //   (url) => {
    //     setVideoUrl(url);
    //   }
    // );
  };

  return (
    <div className="h-full w-full relative flex flex-col gap-4 text-white bg-[#231f20] overflow-y-scroll p-[16px] ">
      <span className="text-2xl font-bold ">서버관리</span>
      <p className="flex items-center gap-2">
        부서와 사용자 업데이트{" "}
        <ColorButton
          colorStyle="confirm"
          title="업데이트"
          onClick={handleImportUserAndDepartData}
        />
      </p>

      {/* <p className="flex items-center gap-2">
        부서와 사용자 업데이트 <ColorButton colorStyle="confirm" title="업데이트" onClick={()=>{}} />
      </p> */}

      {/* <form
        encType="multipart/form-data"
        onSubmit={handleUploadVideoSubmit2}
        className="flex items-center gap-2"
      >
        <label htmlFor="upload_file">
          <div className="px-2 text-black/75 py-1 font-sm bg-slate-100 hover:bg-slate-300 active:bg-slate-400 rounded-lg">
            선택파일:[{uploadFileName}]
          </div>
        </label>
        <input
          id="upload_file"
          className="hidden"
          name="File"
          type="file"
          multiple={false}
          onChange={(ev) => {
            setUploadFileName(ev.target.value);
          }}
          accept=".mp4"
        />
        <button
          className="px-2 text-black/75 py-1 font-sm bg-slate-100 hover:bg-slate-300 active:bg-slate-400 rounded-lg"
          type="submit"
        >
          선택파일 업로드
        </button>
        <span>{progress}%</span>
      </form> */}

      {/* <ColorButton
        colorStyle="delete"
        title="Read Cookies"
        onClick={() => {
          alert(document.cookie);
        }}
      /> */}

      {/* <video src={videoUrl} className="w-[600px] h-[400px] outline" autoPlay /> */}
    </div>
  );
}
