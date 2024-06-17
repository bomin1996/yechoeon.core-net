import "react-slideshow-image/dist/styles.css";
import { Slide, Fade } from "react-slideshow-image";
import { IBannerImageInfo, IBannerItemInfo } from "@shares/*";

interface Props {
  imageUrls: string[];
  className: string;
  width: number;
  height: number;
  duration: number;
  onClick?: (url: string) => void;
  useLink: boolean;
  backgroudSize?: string;
}

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "100px",
};

function BannerImageSlider({
  imageUrls,
  className,
  width,
  height,
  duration,
  onClick,
  useLink,
  backgroudSize,
}: Props) {
  divStyle.height = height + "px";
  divStyle.backgroundSize = backgroudSize ? backgroudSize : "cover";
  let currentImage: string = imageUrls[0];

  const handleChanges = (from: number, to: number) => {
    if (useLink) {
      currentImage = imageUrls[to];
    }
  };

  return (
    <div
      className={`${className} rounded-lg overflow-clip`}
      onClick={() => {
        onClick && useLink === true && onClick(currentImage);
      }}>
      <Fade
        arrows={false}
        autoplay={true}
        infinite={true}
        duration={duration}
        transitionDuration={3000}
        pauseOnHover={true}
        easing="ease-out"
        onChange={handleChanges}
        indicators={false}>
        {imageUrls.map((url, index) => (
          <div
            key={index}
            style={{
              ...divStyle,
              backgroundImage: `url(${url})`,
            }}
          />
        ))}
      </Fade>
    </div>
  );
}

export default BannerImageSlider;
