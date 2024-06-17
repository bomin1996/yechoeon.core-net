import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from "react";
import FullPageNavigator from "../FullPageNavigator";
import SimplePageNumber from "../SimplePageNumber";
import closeBtnImg from "src/assets/button/닫기.svg";
import speakBtnImg from "src/assets/button/tts/speker.svg";
import dontSpeakBtnImg from "src/assets/button/tts/dont-speker.svg";
import CircleIconToggleButton from "../buttons/CircleIconToggleButton";
import { speak, speakCancel } from "src/tts/speak";
import { ISGGosigonggo } from "@shares/*";

interface Props {
  className?: string;
  pageCount: number;
  initPageIndex: number;
  // isTTSButtonVisible?: boolean;
  // gosiInfo?: ISGGosigonggo;
  onClose: () => void;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  // onChangeTTSStatus?: (isTTSEnable: boolean) => void;
  onChangePage?: (pageIndex: number) => void;
  children: (pageIndex: number) => ReactNode;
}

export default function ContentPopupLayout({
  className,
  children,
  pageCount,
  initPageIndex,
  // isTTSButtonVisible = false,
  // gosiInfo,
  onClose,
  onClickNext,
  onClickPrev,
  onChangePage,
}: // onChangeTTSStatus,
//
Props) {
  const [pageIndex, setPageIndex] = useState(initPageIndex);
  // const [isRunningTTS, setIsRunningTTS] = useState(false);

  // useEffect(() => {
  //   console.log("pageIndex", pageIndex);
  //   setIsRunningTTS(false);
  //   speakCancel(window.speechSynthesis);
  //   console.log("ContentPopupLayout", gosiInfo, "pageCount", pageCount);
  // }, [pageIndex, gosiInfo]);

  // function speakNewpage(isRunningSpeak: boolean, text: string) {
  //   speakCancel(window.speechSynthesis);
  //   if (isRunningSpeak) {
  //     speak(text, window.speechSynthesis, () => {
  //       setIsRunningTTS(false);
  //       console.log("End");
  //     });
  //   }
  // }

  // const handleTTS = (isTTS: boolean, gosi: ISGGosigonggo) => {
  //   console.log("handleTTS", isTTS, pageIndex);
  //   setIsRunningTTS(isTTS);

  //   console.log(gosi);
  //   if (isTTS) {
  //     if (gosi.fileInfo && gosi.fileInfo.ttsTextList) {
  //       console.log(gosi.fileInfo.ttsTextList[pageIndex]);
  //       speak(
  //         gosi.fileInfo.ttsTextList[pageIndex],
  //         window.speechSynthesis,
  //         () => {
  //           setIsRunningTTS(false);
  //           console.log("End");
  //         }
  //       );
  //     }
  //   } else {
  //     console.log("speakCancel");
  //     speakCancel(window.speechSynthesis);
  //   }
  // };

  return (
    <div
      className={`fixed w-screen h-screen bg-black/50 
    max-2xl:pt-vertical-topbar-height max-2xl:pb-vertical-bottombar-height 
    2xl:px-[10%] 2xl:pt-[20px] 2xl:pb-[20px] 
    z-50 left-0 top-0 ${className}`}>
      <div className={`w-full h-full `}>
        <div className="relative flex w-full h-full rounded-[100px] bg-layout-border  pt-5">
          <div
            className="overflow-y-auto  mx-auto  scrollbar 
           2xl:max-w-[900px] 2xl:max-h-[95%] 2xl:mb-auto
           max-2xl:min-w-[1000px] max-2xl:max-w-[900px] max-2xl:h-[1414px] max-2xl:my-auto">
            {children(pageIndex)}
          </div>

          <FullPageNavigator
            navigatorType="Light"
            classNameLeftButton="2xl:ml-[15%] max-2xl:ml-[2%]"
            classNameRightButton="2xl:mr-[15%] max-2xl:mr-[2%]"
            // canNext={pageIndex < pageCount}
            // canPrev={pageIndex > 0}
            pageNum={pageIndex + 1}
            pageTotalCount={pageCount}
            onClickNext={() => {
              setPageIndex((p) => p + 1);
              onClickNext?.();
              onChangePage?.(pageIndex + 1);
            }}
            onClickPrev={() => {
              setPageIndex((p) => p - 1);
              onClickPrev?.();
              onChangePage?.(pageIndex - 1);
            }}
          />
          <SimplePageNumber
            className="absolute left-[50%] translate-x-[-50%] max-2xl:bottom-[34px] 2xl:bottom-[12px] text-[#265595] space-x-3 text-[24px]"
            totalCountClassName="text-white"
            pageNum={pageIndex + 1}
            pageTotalCount={pageCount}
          />
          <button
            className="absolute right-[70px] max-2xl:top-[32px] 2xl:top-[74px] rounded-full    active:bg-white/5 active:scale-95"
            onClick={onClose}>
            <img src={closeBtnImg} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
