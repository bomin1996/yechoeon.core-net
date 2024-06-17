import React, { useContext, useEffect, useState } from "react";
import {
  ISGScene,
  ISGSceneSegment,
  ISGSegmentContent,
} from "@shares/ISGContentLayout";
import placeHolderImage from "src/assets/gangseo_logo.svg";
import { motion } from "framer-motion";
import FirstClickContext from "src/contexts/FirstClickContext";
import KioskContext from "src/contexts/KioskContext";
import SvgCanvasNode from "../ui/svg/SvgCanvasNode";
import MultiLayoutContext from "src/contexts/MultiLayoutContext";

interface Props {
  scene: ISGScene;
  className?: string;
}

export default function PreviewScene({ scene, className }: Props) {
  // const [clicked, setClicked] = useState(false);
  const firstClickCtx = useContext(FirstClickContext);
  const viewBox = `0 0 ${scene.width} ${scene.height}`;
  const visibleSegmentList = scene.segments.filter((sg) => sg.isVisible);
  return (
    <div
      className={`${className}`}
      // onClick={() => setClicked(true)}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        //viewBox={viewBox}
        className="h-full object-center  "
        preserveAspectRatio="xMidYMid ">
        {visibleSegmentList.map((seg, index) => (
          <PreviewSegment
            key={index}
            segment={seg}
            segmentIndex={index}
            clickedByUser={firstClickCtx?.isClicked ?? false}
          />
        ))}
      </svg>
      {/* <PlayTimeLabel className="absolute right-2 bottom-2 text-2xl font-bold" /> */}
    </div>
  );
}

interface Props2 {
  segment: ISGSceneSegment;
  clickedByUser: boolean;
  segmentIndex: number;
}
function PreviewSegment({ segment, segmentIndex, clickedByUser }: Props2) {
  const [curContent, setCurContent] = useState<ISGSegmentContent>();
  const kioskInfoCtx = useContext(KioskContext);
  const multiLayoutCtx = useContext(MultiLayoutContext);
  const videoVolume = kioskInfoCtx?.deviceInfo?.extraSettings?.volume ?? 0.4;

  const changeNextContent = () => {
    if (contentsCount > 1) {
      const index = segment.contents.findIndex((it) => it === curContent);
      const nextIndex = (index + 1) % segment.contents.length;
      setCurContent(segment.contents[nextIndex]);
      multiLayoutCtx?.onEndContent(segmentIndex, nextIndex);
    } else {
      multiLayoutCtx?.onEndContent(segmentIndex, 0);
    }
  };

  useEffect(() => {
    if (curContent && curContent.contentType === "image") {
      const tm = setTimeout(() => changeNextContent(), curContent.duration);
      return () => {
        clearTimeout(tm);
      };
    }
  }, [curContent]);

  useEffect(() => {
    setCurContent(segment.contents[0]);
  }, [segment]);

  if (!curContent) {
    return null;
  }

  const contentsCount = segment.contents?.length;
  const isSignageDevice = kioskInfoCtx?.deviceInfo?.kioskType === "Signage";
  const cn = isSignageDevice ? "" : "rounded-[40px]";
  const fromPos = isSignageDevice ? "0%" : "100%";
  const curContentFit =
    curContent?.contentFit === "object-fill"
      ? "fill"
      : curContent?.contentFit === "object-contain"
      ? "contain"
      : "cover";

  return (
    <SvgCanvasNode
      x={segment.x}
      y={segment.y}
      width={segment.width}
      height={segment.height}>
      <div className={`h-full w-full ${cn} overflow-hidden `}>
        <motion.div
          key={curContent?.url}
          className="w-full h-full"
          initial={{ x: fromPos, opacity: 1.0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0.3 }}
          transition={{
            duration: 0,
          }}>
          {curContent?.contentType === "video" ? (
            <video
              //className={`w-full h-full ${curContent?.contentFit}`}
              className={`w-full h-full `}
              style={{
                objectFit: curContentFit,
              }}
              autoPlay
              // muted={!clickedByUser}

              placeholder={placeHolderImage}
              poster={curContent?.thumbnail}
              controls={false}
              loop={contentsCount === 1}
              onEnded={() => {
                if (contentsCount > 1) {
                  changeNextContent();
                }
              }}
              onLoadStart={(ev) => {
                ev.currentTarget.volume = videoVolume;
              }}
              src={curContent?.url}>
              <div className="bg-blue-400 w-full h-full ">
                <span>d</span>
              </div>
            </video>
          ) : (
            <img
              // className={`w-full h-full ${curContent?.contentFit}  `}
              className={`w-full h-full   `}
              style={{
                objectFit: curContentFit,
              }}
              src={curContent?.url}
              alt=""
            />
          )}
        </motion.div>
      </div>
    </SvgCanvasNode>
  );
}
