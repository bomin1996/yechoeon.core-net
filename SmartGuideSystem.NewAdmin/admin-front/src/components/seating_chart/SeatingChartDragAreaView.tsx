import { observer } from "mobx-react";
import { AreaDragger } from "@/viewmodels/seating_chart/AreaDragger";
interface Props {
  dragger: AreaDragger;
  className?: string;
}
export default observer(function SeatingChartDragAreaView({
  dragger,
  className,
}: Props) {
  const rect = dragger.rectangle();
  console.log(rect);
  // const areaWidth = Math.round(rect.width);
  // const areaHeight = Math.round(rect.height);
  // const startPosX = Math.round(rect.x);
  // const startPosY = Math.round(rect.y);
  // const areaWidth = rect.width;
  // const areaHeight = rect.height;
  // const startPosX = rect.x;
  // const startPosY = rect.y;
  // const str = `${areaWidth}x${areaHeight}`;
  return (
    <foreignObject
      x={rect.x}
      y={rect.y}
      width={rect.width}
      height={rect.height}
      className={`p-[0px] absolute  z-10`}
    >
      <div
        className={`${className} relative h-full w-full bg-green-600/30 border-[1px]`}
      >
        {/* <span className="absolute right-0 bottom-0 px-2 py-1 font-light text-[7px] bg-green-800/70 m-[2px]">
          {str}
        </span>
        <span className="absolute left-0 top-0 px-2 py-1 font-light text-[7px] border border-black text-black bg-yellow-400 m-[2px]">
          {startPosX}x{startPosY}
        </span> */}
      </div>
      {/* <div className="w-full h-full relative  z-10 border-2 box-border border-black bg-green-600/30 bg-red-500/30 border-[1px]"></div> */}
    </foreignObject>
  );
});
