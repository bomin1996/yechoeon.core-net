import { observer } from "mobx-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MarkerAreaProvider } from "@/contexts/MarkerAreaContext";
import { BaseMarkerViewModel } from "@/viewmodels/floor_map/BaseMarkerViewModel";
import { DepartmentMarkerViewModel } from "@/viewmodels/floor_map/DepartmentMarkerViewModel";
import { FloorMapViewModel } from "@/viewmodels/floor_map/FloorMapViewModel";
import { KioskDeviceMarkerViewModel } from "@/viewmodels/floor_map/KioskDeviceMarkerViewModel";
import DepartmentMarkerView from "./DepartmentMarkerView";
import KioskMarkerView from "./KioskMarkerView";

interface Props {
  width?: number;
  height?: number;
  viewModel: FloorMapViewModel;
  className?: string;
}

interface MoveInfo {
  isDown: boolean;
  px: number;
  py: number;
  x: number;
  y: number;
}

export default observer(function EditFloorAreaView({
  viewModel,
  width = 1920,
  height = 1080,
  className,
}: Props) {
  const [mouseInfo, setMouseInfo] = useState("");
  const [moveInfo, setMoveInfo] = useState<MoveInfo>({
    isDown: false,
    px: 0,
    py: 0,
    x: 0,
    y: 0,
  });
  // const [moveX, setMoveX] = useState(0);
  // const [moveY, setMoveY] = useState(0);

  const handleSelectMarker = useCallback(
    (
      pointName: string,
      clientX: number,
      clientY: number,
      item: BaseMarkerViewModel
    ) => {
      viewModel.mouseDown(pointName, clientX, clientY, item);
    },
    []
  );

  const handleMouseMove = useCallback(
    (ev: MouseEvent) => {
      // if (moveInfo.isDown) {
      //   const px = ev.clientX;
      //   const py = ev.clientY;
      //   const x = ev.clientX;
      //   const y = ev.clientY;

      //   moveInfo.px = px;
      //   moveInfo.py = py;
      //   moveInfo.x = x;
      //   moveInfo.y = y;

      //   setMoveInfo({
      //     isDown: true,
      //     px: px,
      //     py: py,
      //     x: x,
      //     y: y,
      //   });
      // }

      if (ev.target == divRef.current) {
        setMouseInfo(
          // `x[${ev.clientX}]-y[${ev.clientY}] px[${ev.pageX}]-py[${ev.pageY}] ox[${ev.offsetX}]-oy[${ev.offsetY}] `
          `x[${ev.offsetX}] / y[${ev.offsetY}] `
        );
      }

      setMouseInfo(
        // `x[${ev.clientX}]-y[${ev.clientY}] px[${ev.pageX}]-py[${ev.pageY}] ox[${ev.offsetX}]-oy[${ev.offsetY}] `
        `x[${ev.offsetX}] / y[${ev.offsetY}] `
      );

      viewModel.mouseMove(ev.clientX, ev.clientY);
      // viewModel.mouseMove2(ev.offsetX, ev.offsetY);

      //viewModel.mouseMove2(ev.movementX, ev.movementY);
      // viewModel.mouseMove3(
      //   ev.clientX * window.devicePixelRatio,
      //   ev.clientY * window.devicePixelRatio
      // );
    },
    [viewModel]
  );

  const handleMouseUp = useCallback(
    (ev: MouseEvent) => {
      viewModel.mouseUp(ev.clientX, ev.clientY);
      moveInfo.isDown = false;
      setMoveInfo({
        isDown: false,
        px: 0,
        py: 0,
        x: moveInfo.x,
        y: moveInfo.y,
      });
    },
    [viewModel]
  );

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // window.addEventListener("mousemove", (ev) => {
    //   console.log("EditFloorAreaView:mousemove");
    //   viewModel.mouseMove(ev.clientX, ev.clientY);
    // });

    if (divRef.current) {
      divRef.current.addEventListener("mousemove", handleMouseMove);
      divRef.current.addEventListener("mouseup", handleMouseUp);

      return () => {
        if (divRef.current) {
          divRef.current.removeEventListener("mousemove", handleMouseMove);
          divRef.current.removeEventListener("mouseup", handleMouseUp);
          console.log("clean up events");
        }
      };
    }

    // document.addEventListener("mousemove", handleMouseMove);
    // document.addEventListener("mouseup", handleMouseUp);

    // return () => {
    //   document.removeEventListener("mousemove", handleMouseMove);
    //   document.removeEventListener("mouseup", handleMouseUp);
    //   console.log("clean up events");
    // };
  }, []);

  return (
    <MarkerAreaProvider onMouseDown={handleSelectMarker}>
      <div
        style={{
          width: width * viewModel.zoom,
          height: height * viewModel.zoom,
        }}
        className={`relative  p-0 h-full w-full bg-white rounded-2xl ${className}`}
        draggable={false}
        // onMouseMove={(ev) => {
        //   const di = ev.target as HTMLDivElement;
        //   const rrr = di.getBoundingClientRect();

        //   const scale = window.devicePixelRatio;

        //   const offx = (ev.pageX - rrr.left) * scale;
        //   const offy = (ev.pageY - rrr.top) * scale;

        //   setMouseInfo(
        //     `${scale} : ${ev.screenX} / ${ev.screenY} -> ${ev.clientX} / ${ev.clientY} -> ${ev.pageX} / ${ev.pageY} -> ${offx}/${offy} `
        //   );
        //   setMoveX(offx);
        //   setMoveY(offy);
        // }}
      >
        <div
          ref={divRef}
          className="flex overflow-hidden h-full w-full bg-repeat bg-[url('assets/grid.svg')] bg-center"
        >
          {/* <div className="h-full w-full bg-green-700"></div> */}

          {/* <h1
            style={{
              left: 190,
              top: 120,
              textShadow: "1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue",
              transform: "rotate3d(0, 0deg, 60deg)",
              transformStyle: "flat",
            }}
            className="absolute bg-green-500 font-black text-[120px] text-gray-500"
          >
            Hellow2
          </h1> */}

          <img
            draggable={false}
            onDragStart={(ev) => ev.preventDefault()}
            className="absolute w-full h-full object-contain object-center my-auto select-none"
            src={viewModel.floorImageUrl}
            alt=""
          />

          {/* <h1 className="text-4xl bg-blue-600">{viewModel.floorImageUrl}</h1> */}

          {/* {viewModel.markers.map((markerVM, index) => (
            <MarkerSelector viewModel={markerVM} index={index} />
          ))} */}

          {viewModel.markers.map((vm, index) => {
            if (vm.markerType === "Department") {
              return (
                <DepartmentMarkerView
                  viewModel={vm as DepartmentMarkerViewModel}
                  areaViewModel={viewModel}
                  key={index}
                />
              );
            } else {
              return (
                <KioskMarkerView
                  areaViewModel={viewModel}
                  viewModel={vm as KioskDeviceMarkerViewModel}
                  key={index}
                />
              );
            }
          })}

          <span className="w-[400px] text-white absolute left-2 bottom-2 bg-gray-700 p-2 m-2 text-sm font-bold">
            {mouseInfo}
          </span>
        </div>

        {/* <div
          onMouseDown={(ev) => {
            moveInfo.isDown = true;
            moveInfo.px = ev.clientX;
            moveInfo.py = ev.clientY;

            setMoveInfo({
              isDown: true,
              px: ev.clientX,
              py: ev.clientY,
              x: moveInfo.x,
              y: moveInfo.y,
            });

            ev.stopPropagation();
          }}
          style={{
            // left: `310px`,
            // top: `${moveY}px`,
            transform: `translate3d(${moveX}px, ${moveY}px, 0)`,
          }}
          className={`absolute select-none cursor-pointer left-0 top-0  hover:bg-purple-600 w-[50px] h-[50px] bg-green-500 text-[10px] text-black z-30 ${
            moveInfo.isDown ? "opacity-70" : ""
          } `}
        >
          {moveX}-{moveY}
        </div> */}

        {/* <span className="absolute bg-yellow-300 p-4 left-[310px] top-[580px]">
          Fixed String
        </span> */}
      </div>
    </MarkerAreaProvider>
  );
});
