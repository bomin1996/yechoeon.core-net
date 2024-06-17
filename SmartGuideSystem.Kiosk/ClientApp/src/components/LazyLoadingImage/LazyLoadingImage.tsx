import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  url?: string;
  className?: string;
  placeHolder: string;
  alt?: string;
}

function LazyLoadingImage({ url, className, placeHolder, alt }: Props) {
  return (
    <div>
      {/* effect={`blur`} */}
      <LazyLoadImage
        placeholderSrc={placeHolder}
        className={`${className}`}
        src={url}
        alt={alt}
      />
      <span></span>
    </div>
  );
}

export default LazyLoadingImage;
