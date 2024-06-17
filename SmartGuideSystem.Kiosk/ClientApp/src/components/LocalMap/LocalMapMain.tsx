import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import KioskContext from "src/contexts/KioskContext";
import { RightTitleAdaptiveLayout } from "../RightTitleLayout";
import { ServerConsts } from "src/server/serverConsts";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

type ImageSizeType = {
  width: number;
  height: number;
};

const MAX_ZOOM = 5;
const MIN_ZOOM = 1;
const STEP_ZOOM = 1;

const scrollEnableInfo = {
  canLeft: false,
  canRight: false,
  canUp: false,
  canDown: false,
};

export default function LocalMapMain() {
  const kioskInfoCtx = useContext(KioskContext);
  const localMapInfo = kioskInfoCtx?.localmap;
  const mapUrl = ServerConsts.photoServerUrl(localMapInfo?.url);
  const [imageSizeInfo, setImageSizeInfo] = useState<ImageSizeType>();
  const [zoomRatio, setZoomRatio] = useState(1.0);

  const [scrollCanInfo, setScrollCanInfo] =
    useState<typeof scrollEnableInfo>(scrollEnableInfo);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setZoomRatio(1.0);
    // setTransX(0);
    // setTransY(0);
  }, [imageSizeInfo]);

  const updateScrollCanInfo = () => {
    if (divRef.current) {
      const target = divRef.current;
      const canUp = target.scrollTop > 0;
      const canDown =
        Number(target.clientHeight) + Number(target.scrollTop) <
        target.scrollHeight;

      const canLeft = target.scrollLeft > 0;
      const canRight =
        Number(target.clientWidth) + Number(target.scrollLeft) <
        target.scrollWidth;

      setScrollCanInfo({
        canUp: canUp,
        canDown: canDown,
        canLeft: canLeft,
        canRight: canRight,
      });
    }
  };

  const handleScrollEvent = (ev: Event) => {
    updateScrollCanInfo();
  };

  useEffect(updateScrollCanInfo, [zoomRatio]);

  useEffect(() => {
    if (divRef.current) {
      const target = divRef.current;
      target.addEventListener("scroll", handleScrollEvent);
      return () => {
        target.removeEventListener("scroll", handleScrollEvent);
      };
    }
  }, [divRef.current]);

  const handleScroll = (direction: "Up" | "Down" | "Left" | "Right") => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const step_scroll_vertical = rect.height / 10;
      const step_scroll_horizontal = rect.width / 10;
      switch (direction) {
        case "Up":
          divRef.current.scrollBy(0, -step_scroll_vertical);
          break;
        case "Down":
          divRef.current.scrollBy(0, step_scroll_vertical);
          break;
        case "Left":
          divRef.current.scrollBy(-step_scroll_horizontal, 0);
          break;
        case "Right":
          divRef.current.scrollBy(step_scroll_horizontal, 0);
          break;
      }
    }
  };
  //scrollbar-hide

  const canZoomIn = !(zoomRatio >= MAX_ZOOM);
  const canZoomOut = zoomRatio > MIN_ZOOM;
  // let canScrollLeft = false;
  // let canScrollRight = false;
  // let canScrollUp = false;
  // let canScrollDown = false;
  // if (divRef.current) {
  //   canScrollLeft = divRef.current.scrollLeft > 0;
  //   canScrollUp = divRef.current.offsetTop > 0;
  // }

  return (
    <RightTitleAdaptiveLayout title="관내도" className="">
      <div className=" w-full h-full px-[32px] pt-[140px] pb-[60px] ">
        {/* <h1>
          {divRef.current?.scrollWidth} / {divRef.current?.scrollLeft}
        </h1> */}
        <div className="relative w-full h-full border-2 border-black rounded-[40px]  overflow-hidden">
          <div
            ref={divRef}
            className="w-full h-full  overflow-auto flex scrollbar-hide ">
            <img
              src={mapUrl}
              className="m-auto "
              style={{
                transformOrigin: "center",
                transform: `scale(${zoomRatio}) `,
              }}
            />
          </div>

          <PlusCircleIcon
            onClick={() =>
              setZoomRatio((p) => Math.min(p + STEP_ZOOM, MAX_ZOOM))
            }
            className={`absolute left-[43px] bottom-[325px] h-20 w-20 p-2 stroke-2 stroke-white rounded-[20px]  ${
              canZoomIn ? "bg-[#004098] active:scale-90" : "bg-[#004098]/50"
            } `}
          />
          <MinusCircleIcon
            onClick={() =>
              setZoomRatio((p) => Math.max(p - STEP_ZOOM, MIN_ZOOM))
            }
            className={`absolute left-[43px] bottom-[222px] h-20 w-20 p-2 stroke-2 stroke-white  rounded-[20px] ${
              canZoomOut ? "bg-[#004098] active:scale-90" : "bg-[#004098]/50"
            }`}
          />
          <ChevronUpIcon
            onClick={() => handleScroll("Up")}
            className={`absolute right-[145px] bottom-[372px] h-20 w-20 p-5 stroke-[4px] stroke-white  rounded-full ${
              scrollCanInfo.canUp
                ? "bg-black/70 active:scale-90"
                : "bg-black/30"
            }  `}
          />
          <ChevronDownIcon
            onClick={() => handleScroll("Down")}
            className={`absolute right-[145px] bottom-[192px] h-20 w-20 p-5 stroke-[4px] stroke-white  rounded-full ${
              scrollCanInfo.canDown
                ? "bg-black/70 active:scale-90"
                : "bg-black/30"
            }  `}
          />

          <ChevronLeftIcon
            onClick={() => handleScroll("Left")}
            className={`absolute right-[243px] bottom-[282px] h-20 w-20 p-5 stroke-[4px] stroke-white  rounded-full ${
              scrollCanInfo.canLeft
                ? "bg-black/70 active:scale-90"
                : "bg-black/30"
            }  `}
          />
          <ChevronRightIcon
            onClick={() => handleScroll("Right")}
            className={`absolute right-[51px] bottom-[282px] h-20 w-20 p-5 stroke-[4px] stroke-white  rounded-full ${
              scrollCanInfo.canRight
                ? "bg-black/70 active:scale-90"
                : "bg-black/30"
            }  `}
          />
        </div>
      </div>
    </RightTitleAdaptiveLayout>
  );
}

interface ButtonProps extends PropsWithChildren {
  className?: string;
  onClick: () => void;
}
