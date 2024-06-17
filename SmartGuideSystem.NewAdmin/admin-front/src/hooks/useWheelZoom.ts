import { useEffect, useRef, useState } from "react";

type ParamType = {
  initZoomRatio: number;
  zoomStep: number;
  minimumZoomRatio?: number;
  maximumZoomRatio?: number;
};
export default function useWheelZoom({
  initZoomRatio,
  zoomStep,
  minimumZoomRatio = 0.5,
  maximumZoomRatio = 3,
}: ParamType) {
  const [zoom, setZoom] = useState(initZoomRatio);
  const divRef = useRef<HTMLDivElement>(null);
  const handleZoom = (event: WheelEvent) => {
    if (event.ctrlKey) {
      event.preventDefault();
      if (event.deltaY > 0) {
        setZoom((p) => Math.max(p - zoomStep, minimumZoomRatio));
      } else {
        setZoom((p) => Math.min(p + zoomStep, maximumZoomRatio));
      }
    }
  };
  useEffect(() => {
    if (divRef.current) {
      divRef.current.addEventListener("wheel", handleZoom);
      return () => {
        divRef.current?.removeEventListener("wheel", handleZoom);
      };
    }
  }, []);

  return { divRef, zoom, setZoom };
}
