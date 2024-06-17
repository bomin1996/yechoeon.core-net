import React, { useEffect, useState } from "react";
import { SceneSegmentViewModel } from "@/viewmodels/cms/SceneSegmentViewModel";
import { SceneViewModel } from "@/viewmodels/cms/SceneViewModel";
import SvgCanvasNode from "./SvgCanvasNode";
import { BaseContentViewModel } from "@/viewmodels/cms/BaseContentViewModel";
import SvgGridBack from "../seating_chart/SvgGridBack";
import { motion } from "framer-motion";

interface Props {
  sceneVM: SceneViewModel;
}

export default function PreviewScene({ sceneVM }: Props) {
  const viewBox = `0 0 ${sceneVM.width} ${sceneVM.height}`;
  const visibleSegmentList = sceneVM.segments.filter((sg) => sg.isVisible);
  return (
    <div className="w-screen h-screen bg-white">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        //viewBox={viewBox}
        className="h-full object-center  "
        preserveAspectRatio="xMidYMid ">
        <SvgGridBack snapSize={20} />
        {visibleSegmentList.map((seg, index) => (
          <PreviewSegment key={index} segment={seg} />
        ))}
      </svg>
      <PlayTimeLabel className="absolute right-2 bottom-2 text-2xl font-bold" />
    </div>
  );
}

interface Props2 {
  segment: SceneSegmentViewModel;
}
function PreviewSegment({ segment }: Props2) {
  const [curContent, setCurContent] = useState<BaseContentViewModel>(
    segment.contents[0]
  );

  const changeNextContent = () => {
    const index = segment.contents.findIndex((it) => it === curContent);
    const nextIndex = (index + 1) % segment.contents.length;
    setCurContent(segment.contents[nextIndex]);
  };

  useEffect(() => {
    if (curContent && curContent.contentType === "image") {
      const tm = setTimeout(() => changeNextContent(), curContent.duration);
      return () => {
        clearTimeout(tm);
      };
    }
  }, [curContent]);

  console.log("current content is", curContent);

  if (!curContent) {
    return null;
  }

  return (
    <SvgCanvasNode
      x={segment.x}
      y={segment.y}
      width={segment.width}
      height={segment.height}>
      <div className="h-full w-full bg-white transition-all rounded-[40px] overflow-hidden">
        {curContent?.contentType === "video" ? (
          <motion.div
            key={curContent?.url}
            className="w-full h-full"
            exit={{ opacity: 1.0 }}
            initial={{ opacity: 1.0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0,
            }}>
            <video
              className={`w-full h-full ${curContent?.contentFit}`}
              autoPlay
              // muted
              onLoadStart={(ev) => {
                ev.currentTarget.volume = 0.1;
              }}
              controls={false}
              onEnded={() => changeNextContent()}
              poster={curContent?.thumbnail}
              src={`${curContent?.url}`}
            />
          </motion.div>
        ) : (
          <motion.div
            key={curContent?.url}
            className="w-full h-full"
            // animate={{ rotate: 180 }}
            // transition={{
            //   repeat: 1,
            //   repeatType: "reverse",
            //   duration: 2,
            // }}
            exit={{ opacity: 1.0 }}
            initial={{ opacity: 1.0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0,
            }}>
            <img
              className={`w-full h-full ${curContent?.contentFit}`}
              src={curContent?.url}
              alt=""
            />
          </motion.div>
        )}
      </div>
    </SvgCanvasNode>
  );
}

interface Props3 {
  className?: string;
}

function PlayTimeLabel({ className }: Props3) {
  const [time, setTime] = useState("");
  //const [startTime, setStartTime] = useState(new Date());
  useEffect(() => {
    const startTime = new Date();
    const tm = setInterval(() => {
      const now = new Date();
      const duration =
        Math.floor((now.getTime() - startTime.getTime()) / 100) / 10;
      setTime(`${duration}`);
    }, 100);

    return () => {
      clearInterval(tm);
    };
  }, []);

  return <div className={`${className}`}>{time}</div>;
}
