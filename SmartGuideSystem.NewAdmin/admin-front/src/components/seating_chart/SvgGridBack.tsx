import { observer } from "mobx-react";

interface Props {
  snapSize: number;
  color?: string;
  minorStrokeWidth?: number;
  majorStrokeWidth?: number;
}
export default observer(function SvgGridBack({
  snapSize,
  color = "gray",
  minorStrokeWidth = 0.5,
  majorStrokeWidth = 1,
}: Props) {
  return (
    <>
      <defs>
        <pattern
          id="smallGrid"
          width={snapSize}
          height={snapSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${snapSize} 0 L 0 0 0 ${snapSize}`}
            fill="none"
            stroke={color}
            // stroke-width="0.5"
            strokeWidth={minorStrokeWidth}
          />
        </pattern>
        <pattern
          id="grid"
          width={snapSize * 10}
          height={snapSize * 10}
          patternUnits="userSpaceOnUse"
        >
          <rect
            width={snapSize * 10}
            height={snapSize * 10}
            fill="url(#smallGrid)"
          />
          <path
            d={`M ${snapSize * 10} 0 L 0 0 0 ${snapSize * 10}`}
            fill="none"
            stroke={color}
            // stroke-width="1"
            strokeWidth={majorStrokeWidth}
          />
        </pattern>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill="url(#grid)"
        stroke="black"
        strokeWidth="1"
      />
    </>
  );
});
