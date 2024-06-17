import { ISGGosigonggo } from "@shares/ISGGosigonggo";
import MultiImagePageView from "../ui/imageView/MultiImagePageView";

interface Props {
  gosiInfo: ISGGosigonggo;
  onClick?: () => void;
  className?: string;
  isPreview?: boolean;
  onChangePage: (pageIndex: number) => void;
  activePageNum?: number;
}

const GosiContents: React.FC<Props> = ({
  gosiInfo,
  onClick,
  className = "mt-0 rounded-[15px] p-3",
  isPreview,
  onChangePage,
  activePageNum = 1,
}) => {
  console.log(gosiInfo);

  let fileList = gosiInfo.fileInfo != null ? gosiInfo.fileInfo.imageList : [""];

  return (
    <MultiImagePageView
      activePageNum={activePageNum}
      onClick={onClick}
      isPreview={isPreview}
      fileUrlList={fileList}
      className={`h-full w-full   ${className} relative`}
      onChangePage={(num) => {
        console.log("onChangePage:", num);
        onChangePage(num);
      }}
    />
  );
};
export default GosiContents;
