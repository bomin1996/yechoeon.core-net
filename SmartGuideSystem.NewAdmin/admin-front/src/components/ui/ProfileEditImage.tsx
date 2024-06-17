import placeholderImage from "@/assets/profile_placeholder.png";

interface Props {
  src: string;
  height?: number;
  width?: number;
  className?: string;
}

export default function ProfileEditImage({
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
      }}
    ></img>
  );
}
