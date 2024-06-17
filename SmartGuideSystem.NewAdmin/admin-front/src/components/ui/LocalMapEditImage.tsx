import placeholderImage from "@/assets/placeholder.webp";

interface Props {
  src: string;
  height?: number;
  width?: number;
  className?: string;
}

export default function LocalMapEditImage({
  src,
  height,
  width,
  className,
}: Props) {
  return (
    <img
      className={className}
      src={src}
      width={width}
      height={height}
      onError={(ev) => {
        ev.currentTarget.src = placeholderImage;
      }}></img>
  );
}
