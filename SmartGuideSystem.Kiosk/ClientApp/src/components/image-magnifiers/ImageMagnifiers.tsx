import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props extends PropsWithChildren {
  zoom?: number;
  className?: string;
  src?: string;
  showMagnify: boolean;
  imageWideth?: number;
  imageHeight?: number;
  onCloseMagify?: () => void;
}
type PositionInfoType = {
  x: number;
  y: number;
};
export function ImageMagnifiers({
  className,
  children,
  src,
  showMagnify,

  imageWideth = 0,
  imageHeight = 0,
  zoom = 2,
  onCloseMagify,
}: Props) {
  const [posInfo, setPosInfo] = useState<PositionInfoType>({ x: 200, y: 200 });
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (ev: MouseEvent) => {
      if (divRef.current && ev.buttons === 1) {
        const brect = divRef.current.getBoundingClientRect();
        const x = ev.clientX - brect.left;
        const y = ev.clientY - brect.top;
        const aw = divRef.current.clientWidth;
        const ah = divRef.current.clientHeight;

        setPosInfo({ x: x, y: y });
      }
      ev.preventDefault();
    },
    [children]
  );

  const handleTouchMove = useCallback(
    (ev: TouchEvent) => {
      if (divRef.current) {
        const brect = divRef.current.getBoundingClientRect();
        const w = brect.width;
        const h = brect.height;
        const x = ev.touches[0].clientX - brect.left;
        const y = ev.touches[0].clientY - brect.top;
        const aw = divRef.current.clientWidth;
        const ah = divRef.current.clientHeight;

        setPosInfo({
          x: Math.min(Math.max(0, x), w),
          y: Math.min(Math.max(0, y), h),
        });
      }
      ev.preventDefault();
    },
    [children]
  );

  const handleMouseUp = useCallback(
    (ev: MouseEvent) => {
      //viewModel.mouseUp(ev.clientX, ev.clientY);
    },
    [children]
  );

  const handleMouseDown = useCallback(
    (ev: MouseEvent) => {
      //viewModel.mouseUp(ev.clientX, ev.clientY);
    },
    [children]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      console.log("clean up events");
    };
  }, []);

  let tx = 0;
  let ty = 0;

  if (posInfo) {
    tx = posInfo.x;
    ty = posInfo.y;
  }

  // const encodedUrl = encodeURI(src ?? "");

  return (
    <div ref={divRef} className={`${className} relative`}>
      {children}

      {/* <div className="absolute right-4 top-4 text-right bg-black/5 z-40">
        X:{Math.floor(posInfo?.x ?? 0)} / Y:{Math.floor(posInfo?.y ?? 0)} IW:{" "}
        {imageWideth} / IH: {imageHeight}
      </div> */}

      {showMagnify && (
        <div
          style={{
            left: posInfo?.x,
            top: posInfo?.y,
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            //calculate zoomed image size
            backgroundSize: `${imageWideth * zoom}px ${imageHeight * zoom}px`,

            //calculete position of zoomed image.
            backgroundPositionX: `${-tx * zoom + 200}px`,
            backgroundPositionY: `${-ty * zoom + 200}px`,
          }}
          className="absolute border-[5px] shadow-2xl rounded-full border-[#607FBD] w-[400px] h-[400px]   translate-x-[-50%] translate-y-[-50%] z-[5000]"
        >
          <XMarkIcon
            onClick={onCloseMagify}
            className="absolute w-[60px] h-[60px] bg-[#607FBD] stroke-[2px] p-2 rounded-full stroke-white right-[37px] bottom-[13px]"
          />
        </div>
      )}
    </div>
  );
}

// export function ImageMagnifier({
//   src,
//   width,
//   height,
//   magnifierHeight = 100,
//   magnifieWidth = 100,
//   zoomLevel = 1.5,
// }: {
//   src: string;
//   width?: string;
//   height?: string;
//   magnifierHeight?: number;
//   magnifieWidth?: number;
//   zoomLevel?: number;
// }) {
//   const [[x, y], setXY] = useState([0, 0]);
//   const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
//   const [showMagnifier, setShowMagnifier] = useState(false);
//   return (
//     <div
//       style={{
//         position: "relative",
//         height: height,
//         width: width,
//       }}
//     >
//       <img
//         src={src}
//         style={{ height: height, width: width }}
//         onMouseEnter={(e) => {
//           // update image size and turn-on magnifier
//           const elem = e.currentTarget;
//           const { width, height } = elem.getBoundingClientRect();
//           setSize([width, height]);
//           setShowMagnifier(true);
//         }}
//         onMouseMove={(e) => {
//           // update cursor position
//           const elem = e.currentTarget;
//           const { top, left } = elem.getBoundingClientRect();

//           // calculate cursor position on the image
//           const x = e.pageX - left - window.pageXOffset;
//           const y = e.pageY - top - window.pageYOffset;
//           setXY([x, y]);
//         }}
//         onMouseLeave={() => {
//           // close magnifier
//           setShowMagnifier(false);
//         }}
//         alt={"img"}
//       />

//       <div
//         style={{
//           display: showMagnifier ? "" : "none",
//           position: "absolute",

//           // prevent maginier blocks the mousemove event of img
//           pointerEvents: "none",
//           // set size of magnifier
//           height: `${magnifierHeight}px`,
//           width: `${magnifieWidth}px`,
//           // move element center to cursor pos
//           top: `${y - magnifierHeight / 2}px`,
//           left: `${x - magnifieWidth / 2}px`,
//           opacity: "1", // reduce opacity so you can verify position
//           border: "1px solid lightgray",
//           backgroundColor: "white",
//           backgroundImage: `url('${src}')`,
//           backgroundRepeat: "no-repeat",

//           //calculate zoomed image size
//           backgroundSize: `${imgWidth * zoomLevel}px ${
//             imgHeight * zoomLevel
//           }px`,

//           //calculete position of zoomed image.
//           backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
//           backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
//         }}
//       ></div>
//     </div>
//   );
// }

// export function ImageMagnifier2({
//   src,
//   className,
//   width,
//   height,
//   magnifierHeight = 100,
//   magnifieWidth = 100,
//   zoomLevel = 1.5,
// }: {
//   src: string;
//   className?: string;
//   width?: string;
//   height?: string;
//   magnifierHeight?: number;
//   magnifieWidth?: number;
//   zoomLevel?: number;
// }) {
//   const [[x, y], setXY] = useState([0, 0]);
//   const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
//   const [showMagnifier, setShowMagnifier] = useState(false);
//   return (
//     <div className={`${className} relative`}>
//       <img
//         src={src}
//         style={{ height: height, width: width }}
//         onMouseEnter={(e) => {
//           // update image size and turn-on magnifier
//           const elem = e.currentTarget;
//           const { width, height } = elem.getBoundingClientRect();
//           setSize([width, height]);
//           setShowMagnifier(true);
//         }}
//         onMouseMove={(e) => {
//           // update cursor position
//           const elem = e.currentTarget;
//           const { top, left } = elem.getBoundingClientRect();

//           // calculate cursor position on the image
//           const x = e.pageX - left - window.pageXOffset;
//           const y = e.pageY - top - window.pageYOffset;
//           setXY([x, y]);
//         }}
//         onMouseLeave={() => {
//           // close magnifier
//           setShowMagnifier(false);
//         }}
//         alt={"img"}
//       />

//       <div
//         style={{
//           display: showMagnifier ? "" : "none",
//           position: "absolute",

//           // prevent maginier blocks the mousemove event of img
//           pointerEvents: "none",
//           // set size of magnifier
//           height: `${magnifierHeight}px`,
//           width: `${magnifieWidth}px`,
//           // move element center to cursor pos
//           top: `${y - magnifierHeight / 2}px`,
//           left: `${x - magnifieWidth / 2}px`,
//           opacity: "1", // reduce opacity so you can verify position
//           border: "1px solid lightgray",
//           backgroundColor: "white",
//           backgroundImage: `url('${src}')`,
//           backgroundRepeat: "no-repeat",

//           //calculate zoomed image size
//           backgroundSize: `${imgWidth * zoomLevel}px ${
//             imgHeight * zoomLevel
//           }px`,

//           //calculete position of zoomed image.
//           backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
//           backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
//         }}
//       ></div>
//     </div>
//   );
// }
