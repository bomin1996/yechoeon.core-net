import { useEffect, useState } from "react";
import { ISGGosigonggo } from "@shares/*";
import CircleIconToggleButton from "../buttons/CircleIconToggleButton";
import speakBtnImg from "src/assets/button/tts/speker.svg";
import dontSpeakBtnImg from "src/assets/button/tts/dont-speker.svg";
import { speak, speakCancel } from "src/tts/speak";
import { ImageMagnifiers } from "src/components/image-magnifiers/ImageMagnifiers";
import FullPageNavigator from "../FullPageNavigator";
import SimplePageNumber from "../SimplePageNumber";
import closeBtnImg from "src/assets/button/닫기.svg";
import magnifyBtnImg from "src/assets/button/gosi/돋보기.png";

interface Props {
  className?: string;
  pageCount: number;
  initPageIndex: number;
  isTTSButtonVisible?: boolean;
  isMagnifiers?: boolean;
  gosi: ISGGosigonggo;
  onClose: () => void;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  // onChangeTTSStatus?: (isTTSEnable: boolean) => void;
  // onChangePage?: (pageIndex: number) => void;
  //   children: (pageIndex: number) => ReactNode;
}

type ImageSizeType = {
  width: number;
  height: number;
};

// export function GosiContentPopupLayout___({ gosi, pageCount, onClose }: Props) {
//   const [isRunningTTS, setIsRunningTTS] = useState(false);
//   const [pageIndex, setPageIndex] = useState(0);

//   console.log("input Gosi:", gosi.fileInfo?.imageList);

//   useEffect(() => {
//     console.log("pageIndex", pageIndex);
//     setIsRunningTTS(false);
//     speakCancel(window.speechSynthesis);
//     console.log("ContentPopupLayout", gosi, "pageCount", pageCount);
//     return () => {
//       speakCancel(window.speechSynthesis);
//     };
//   }, [pageIndex, gosi]);

//   //   function speakNewpage(isRunningSpeak: boolean, text: string) {
//   //     speakCancel(window.speechSynthesis);
//   //     if (isRunningSpeak) {
//   //       speak(text, window.speechSynthesis, () => {
//   //         setIsRunningTTS(false);
//   //         console.log("End");
//   //       });
//   //     }
//   //   }

//   const handleTTS = (isTTS: boolean) => {
//     console.log("handleTTS", isTTS, pageIndex);
//     setIsRunningTTS(isTTS);

//     console.log(gosi);
//     if (isTTS) {
//       if (gosi.fileInfo && gosi.fileInfo.ttsTextList) {
//         console.log(gosi.fileInfo.ttsTextList[pageIndex]);
//         speak(
//           gosi.fileInfo.ttsTextList[pageIndex],
//           window.speechSynthesis,
//           () => {
//             setIsRunningTTS(false);
//             console.log("End");
//           }
//         );
//       }
//     } else {
//       console.log("speakCancel");
//       speakCancel(window.speechSynthesis);
//     }
//   };

//   return (
//     <div className="fixed w-screen h-screen left-0 top-0  z-50">
//       <ContentPopupLayout
//         pageCount={pageCount ?? 0}
//         // initPageIndex={1}
//         //   gosiInfo={gosiInfo}
//         initPageIndex={0}
//         //   isTTSButtonVisible={true}
//         onChangePage={(pIdx) => setPageIndex(pIdx)}
//         onClose={onClose}
//       >
//         {(itemIndex: number) => (
//           // <GosiContents
//           //   activePageNum={itemIndex + 1}
//           //   gosiInfo={gosi}
//           //   isPreview={true}
//           //   className="m-auto w-[790px] h-[1035px] box-border border-[25px] border-[#1d232f]"
//           //   onChangePage={(pn) => {}}
//           // />

//           // <ImageMagnifiers
//           //   src={"/gosiimages/" + gosi.fileInfo?.imageList[itemInnpmdex]}
//           //   className="m-auto w-[790px] h-[1035px] box-border border-[25px] border-[#1d232f]"
//           // >
//           //   <img
//           //     src={"/gosiimages/" + gosi.fileInfo?.imageList[itemIndex]}
//           //     className="m-auto w-[790px] h-[1035px] box-border border-[25px] border-[#1d232f]"
//           //   />
//           // </ImageMagnifiers>
//         )}
//       </ContentPopupLayout>

//       <CircleIconToggleButton
//         className="absolute z-50 left-[50%] translate-x-[-50%] top-[238px] rounded-full p-1 w-[90px] h-[90px]"
//         selectedImage={speakBtnImg}
//         unSelectedImage={dontSpeakBtnImg}
//         isSelected={isRunningTTS}
//         onClick={() => {
//           setIsRunningTTS((prev) => !prev);
//           handleTTS(!isRunningTTS);
//         }}
//       />
//     </div>
//   );
// }

export default function GosiContentPopupLayout({
  className,
  pageCount,
  gosi,
  isTTSButtonVisible = false,
  isMagnifiers = false,
  onClose,
  onClickNext,
  onClickPrev,
}: // onChangeTTSStatus,
//
Props) {
  const [pageIndex, setPageIndex] = useState(0);
  const [isRunningTTS, setIsRunningTTS] = useState(false);
  const [imageSizeInfo, setImageSizeInfo] = useState<ImageSizeType>();
  const [showMagnify, setShowMagnify] = useState(false);

  console.log("input Gosi:", gosi.fileInfo?.imageList);

  useEffect(() => {
    console.log("pageIndex", pageIndex);
    setIsRunningTTS(false);
    speakCancel(window.speechSynthesis);
    console.log("ContentPopupLayout", gosi, "pageCount", pageCount);
    return () => {
      speakCancel(window.speechSynthesis);
    };
  }, [pageIndex, gosi]);

  const handleTTS = (isTTS: boolean) => {
    console.log("handleTTS", isTTS, pageIndex);
    setIsRunningTTS(isTTS);

    console.log(gosi);
    if (isTTS) {
      if (gosi.fileInfo && gosi.fileInfo.ttsTextList) {
        console.log(gosi.fileInfo.ttsTextList[pageIndex]);
        speak(
          gosi.fileInfo.ttsTextList[pageIndex],
          window.speechSynthesis,
          () => {
            setIsRunningTTS(false);
            console.log("End");
          }
        );
      }
    } else {
      console.log("speakCancel");
      speakCancel(window.speechSynthesis);
    }
  };

  const encodedSrc = encodeURI(
    "/gosiimages/" + gosi.fileInfo?.imageList[pageIndex]
  );

  return (
    <div
      className={`fixed w-screen h-screen bg-black/50 
    max-2xl:pt-vertical-topbar-height max-2xl:pb-vertical-bottombar-height 
    2xl:px-[10%] 2xl:pt-[20px] 2xl:pb-[20px] 
    z-50 left-0 top-0 ${className}`}
    >
      <div className={`w-full h-full `}>
        <div className="relative flex w-full h-full rounded-[100px] bg-layout-border  ">
          <ImageMagnifiers
            showMagnify={showMagnify}
            imageWideth={imageSizeInfo?.width}
            imageHeight={imageSizeInfo?.height}
            zoom={2}
            onCloseMagify={() => setShowMagnify(false)}
            //src={"/gosiimages/" + gosi.fileInfo?.imageList[pageIndex]}
            src={encodedSrc}
            className="border-[#002120] border-[0px]   mx-auto  scrollbar 
           2xl:max-w-[1000px] 2xl:max-h-[95%] 2xl:mb-auto
           overflow-visible
           max-2xl:min-w-[790px] max-2xl:max-w-[1000px] max-2xl:h-[1414px] max-2xl:my-auto"
          >
            <img
              src={"/gosiimages/" + gosi.fileInfo?.imageList[pageIndex]}
              onLoad={(ev) => {
                setImageSizeInfo({
                  width: ev.currentTarget.width,
                  height: ev.currentTarget.height,
                });
                console.log(
                  "img size w=",
                  ev.currentTarget.width,
                  " h = ",
                  ev.currentTarget.height
                );
              }}
              className="w-full h-full"
            />
          </ImageMagnifiers>

          <FullPageNavigator
            navigatorType="Dark"
            classNameLeftButton="2xl:ml-[15%] max-2xl:ml-[2%]"
            classNameRightButton="2xl:mr-[15%] max-2xl:mr-[2%]"
            // canNext={pageIndex < pageCount}
            // canPrev={pageIndex > 0}
            pageNum={pageIndex + 1}
            pageTotalCount={pageCount}
            onClickNext={() => {
              setPageIndex((p) => p + 1);
              onClickNext?.();
            }}
            onClickPrev={() => {
              setPageIndex((p) => p - 1);
              onClickPrev?.();
            }}
          />
          <SimplePageNumber
            className="absolute left-[50%] translate-x-[-50%] max-2xl:bottom-[34px] 2xl:bottom-[12px] text-accent-text space-x-3 text-[24px]"
            totalCountClassName="text-white"
            pageNum={pageIndex + 1}
            pageTotalCount={pageCount}
          />

          <button
            className="absolute left-[50%] translate-x-[-50%] top-[28px] rounded-full  active:bg-white/5 active:scale-95"
            onClick={onClose}
          >
            <img src={closeBtnImg} alt="" />
          </button>

          {isTTSButtonVisible && (
            <CircleIconToggleButton
              className="absolute z-50 bottom-[262px] right-[64px] rounded-full p-1 w-[90px] h-[90px]"
              selectedImage={speakBtnImg}
              unSelectedImage={dontSpeakBtnImg}
              isSelected={isRunningTTS}
              onClick={() => {
                setIsRunningTTS((prev) => !prev);
                handleTTS(!isRunningTTS);
              }}
            />
          )}

          {isMagnifiers && (
            <CircleIconToggleButton
              className="absolute z-50 bottom-[383px] right-[64px] rounded-full p-1 w-[90px] h-[90px]"
              selectedImage={magnifyBtnImg}
              unSelectedImage={magnifyBtnImg}
              isSelected={showMagnify}
              onClick={() => {
                setShowMagnify((prev) => !prev);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
