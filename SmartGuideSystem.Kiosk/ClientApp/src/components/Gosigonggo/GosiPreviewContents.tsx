import { ISGGosigonggo } from "@shares/ISGGosigonggo";
import PdfViewer from "../ui/pdf/PdfViewer";

interface Props {
  gosiInfo: ISGGosigonggo;
  onClick?: () => void;
  className?: string;
  gosiHeight: number;
  gosiWidth: number;
  isThumbnail?: boolean;
}

const GosiPreviewContents: React.FC<Props> = ({
  gosiInfo,
  onClick,
  className,
  gosiHeight,
  gosiWidth,
  isThumbnail,
}) => {
  return (
    <div onClick={onClick} className={` rounded-[15px] ${className} `}>
      {/* <p className=" text-sm font-bold  text-black pb-4 mt-[50%] ml-[64px]  mr-[64px]">
        타이틀{gosiInfo.title}
      </p> */}
      <PdfViewer
        className="h-full w-full mt-0 rounded-[30px] p-3 "
        contentsUrl="/sample.pdf"
        contentsHeight={gosiHeight}
        contentsWidth={gosiWidth}
        isThumbnail={isThumbnail}
      />
    </div>
  );
};
export default GosiPreviewContents;
