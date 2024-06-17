import { ISGContent } from "@shares/*";
import axios from "axios";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ContentLayoutViewModel } from "src/viewmodels/cms/ContentLayoutViewModel";
import DialogContext from "./DialogContext";
import showUploadContentDialog from "@/components/dialogs/UploadContentDialog";
import { showMessageOkCancelDialog } from "@/components/modals";
import { ContentApi } from "@/server/contentApi";
import BlockUIContext from "./BlockUIContext";
import toast from "react-hot-toast";

interface ISelectedItem {
  itemType: "Segment" | "None";
  item: any;
}

interface IContentLayoutEdit {
  selectedItem?: ISelectedItem;
  selectItem: (item?: ISelectedItem) => void;
  scaleRatio: number;
  setScaleRatio: (scaleRatio: number) => void;
  setScaleDelta: (scaleDelta: number) => void;
  contentLayout: ContentLayoutViewModel;
  contents: ISGContent[];
  addFileToContentLibrary: (formData: FormData, category: string) => void;
  removeContent: (content: ISGContent) => void;
}

const ContentLayoutEditContext = createContext<IContentLayoutEdit | null>(null);

export default ContentLayoutEditContext;

interface Props extends PropsWithChildren {
  contentLayout: ContentLayoutViewModel;
}

export function ContentLayoutEditProvider({ contentLayout, children }: Props) {
  const [selectedItem, setSelectedItem] = useState<ISelectedItem>();
  const [scaleRatio, setScaleRatio] = useState(0.2);
  // const [contents, setContents] = useState<VideoContentViewModel[]>([]);
  const [contents, setContents] = useState<ISGContent[]>([]);

  const queryContents = async () => {
    const category = contentLayout.category1;
    const res = await axios.get(`/api/content/${category}`);
    console.log("contents:", res.data);
    const data: ISGContent[] = res.data;
    // setContents(data.map((it) => VideoContentViewModel.from(it)));
    setContents(data);
  };

  const dialogCtx = useContext(DialogContext);
  const blockUICtx = useContext(BlockUIContext);

  useEffect(() => {
    queryContents();
  }, [contentLayout]);

  const addFileToContentLibrary = (formData: FormData, category: string) => {
    showUploadContentDialog(dialogCtx!, {
      categoryName: category,
      formData: formData,
      onCancel: () => {},
      onComplete: (url) => {
        queryContents();
      },
    });
  };

  return (
    <ContentLayoutEditContext.Provider
      value={{
        contentLayout: contentLayout,
        selectedItem: selectedItem,
        //selectedItemType: itemType,
        // onSelectItem: (item, itemType) => {
        //   setItem(item);
        //   setItemType(itemType);
        // },
        addFileToContentLibrary,
        contents,
        selectItem: (item) => {
          setSelectedItem(item);
        },
        removeContent: (content) => {
          showMessageOkCancelDialog(
            dialogCtx!,
            "컨텐츠 삭제",
            `[${content.id}] ${content.uploadFileName} 삭제합니다? `,
            async () => {
              blockUICtx?.setBlock(true);
              const { error } = await ContentApi.deleteContent(content.id);
              blockUICtx?.setBlock(false);
              if (!error) {
                toast(`삭제완료`);
                queryContents();
              } else {
                toast(`오류발생: ${error}`);
              }
            }
          );
        },
        scaleRatio: scaleRatio,
        setScaleRatio: setScaleRatio,
        setScaleDelta: (scaleDelta: number) =>
          setScaleRatio((pv) => Math.min(2.0, Math.max(0.1, pv + scaleDelta))),
      }}
    >
      {children}
    </ContentLayoutEditContext.Provider>
  );
}
