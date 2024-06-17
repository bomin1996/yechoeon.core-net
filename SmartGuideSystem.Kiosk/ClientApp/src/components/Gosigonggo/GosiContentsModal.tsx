import React, { useEffect, useState } from "react";
import { ISGGosigonggo } from "@shares/ISGGosigonggo";
import GosiContents from "./GosiContents";
import { speak, speakCancel } from "src/tts/speak";
import closeBtnImg from "src/assets/button/닫기.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { HorizontalPageControl } from "../ui/HorizontalPageNavigator";
import SimplePageNumber from "../ui/SimplePageNumber";

interface Props {
  content: ISGGosigonggo;
  ttsTextList?: string[];
  className?: string;
  onClose: () => void;
  onHome: () => void;
}

function GosiContentsModal({
  content,
  ttsTextList,
  className,
  onClose,
  onHome,
}: Props) {
  const [isRunningTTS, SetIsRunningTTS] = useState(false);
  const [pageNumber, SetPageNumber] = useState(1);
  let currentText = "";
  const pageCount = content.fileInfo?.imageList.length ?? 0;
  console.log("GosiContentsModa==========", ttsTextList, pageNumber);

  function speakNewpage(isRunningSpeak: boolean, text: string) {
    speakCancel(window.speechSynthesis);
    if (isRunningSpeak) {
      speak(text, window.speechSynthesis, () => {
        SetIsRunningTTS(false);
        console.log("End");
      });
    }
  }

  const hendleNextPage = (pageNum: number) => {
    console.log("onChangePage======================%%$%$");

    // 다음페이지 읽기
    SetPageNumber(pageNum);
    console.log("onChangePage======================%%$%$", pageNum);
    if (
      ttsTextList != null &&
      ttsTextList !== undefined &&
      ttsTextList.length >= pageNum
    ) {
      currentText = ttsTextList[pageNum - 1];
    } else {
      currentText = content.contents ?? "음성안내를 지원하지 않습니다.";
    }

    speakNewpage(isRunningTTS, currentText);
  };

  return (
    <div
      onMouseUp={() => {}}
      className={`fixed h-screen w-screen flex z-50 ${className} bg-black/50 pt-[127px] pb-[195px] `}>
      <div className="w-full h-full flex bg-[#292f3c] rounded-[100px] relative">
        <GosiContents
          activePageNum={pageNumber}
          gosiInfo={content}
          isPreview={true}
          className="m-auto w-[790px] h-[1035px] box-border border-[25px] border-[#1d232f]"
          onChangePage={hendleNextPage}
        />

        <button
          className="absolute left-[50%] translate-x-[-50%] top-[28px] rounded-full active:bg-white/5 active:scale-95"
          onClick={() => {
            if (onClose) {
              speakCancel(window.speechSynthesis);
              onClose();
            }
          }}>
          <img src={closeBtnImg} alt="" />
        </button>

        {pageCount > 1 && (
          <ChevronLeftIcon
            className={`text-white h-20 w-20 p-3 absolute left-8 top-[50%] translate-y-[-50%] active:text-[#7094DC]`}
            onClick={() => SetPageNumber((prev) => Math.max(1, prev - 1))}
          />
        )}

        {pageCount > 1 && (
          <ChevronRightIcon
            className=" text-white h-20 w-20 p-3 absolute right-8 top-[50%] translate-y-[-50%] active:text-[#7094DC]"
            onClick={() =>
              SetPageNumber((prev) => Math.min(pageCount, prev + 1))
            }
          />
        )}

        {pageCount > 1 && (
          <SimplePageNumber
            className="absolute bottom-[178px] left-[50%] translate-x-[-55%]"
            pageNum={pageNumber}
            pageTotalCount={pageCount}
          />
        )}
      </div>
    </div>
  );
}

export default GosiContentsModal;
