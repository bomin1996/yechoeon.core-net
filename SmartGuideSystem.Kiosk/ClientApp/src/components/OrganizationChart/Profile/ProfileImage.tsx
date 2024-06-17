import React, { memo, useEffect, useState } from "react";

interface Props {
  src: string | undefined;
  placeholder: string;
  width?: number;
  height?: number;
  className?: string;
}
const ProfileImage: React.FC<Props> = ({
  src,
  placeholder,
  width,
  height,
  className,
}) => {
  return (
    <img
      // width={width}
      // height={height}
      className={className}
      src={src}
      onError={(ev) => {
        ev.currentTarget.src = placeholder;
      }}
      alt=""
    />
  );
};

export default memo(ProfileImage);
