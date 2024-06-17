import { observer } from "mobx-react";
import React, { useContext } from "react";
import withModal from "../ui/modal/withModal";
import title_logo from "@/assets/admin-text-logo.svg";
import ColorButton from "../ui/button/ColorButton";
import DialogContext from "@/contexts/DialogContext";
import LeftContentLibraryBar from "./LeftContentLibraryBar";
import RightPropertyBar from "./RightPropertyBar";
import EditSceneArea from "./EditSceneArea";
import TopToolbar from "./TopToolbar";
import { ContentLayoutViewModel } from "@/viewmodels/cms/ContentLayoutViewModel";
import { ContentLayoutEditProvider } from "@/contexts/ContentLayoutEditContext";
import AccordionPanelBar from "../ui/panel/AccordionPanelBar";
import PreviewScene from "./PreviewScene";
import { ImageMenuButton } from "../ui/button";
import 미리보기아이콘 from "@/assets/buttons/menus/미리보기.svg";
import 저장아이콘 from "@/assets/buttons/menus/저장.svg";
import 취소아이콘 from "@/assets/buttons/menus/취소.svg";

interface Props {
  contentLayoutVM: ContentLayoutViewModel;
  onSave: (contentLayoutVM: ContentLayoutViewModel) => void;
}
const CMSLayoutEditPopup: React.FC<Props> = ({ contentLayoutVM, onSave }) => {
  const dialogCtx = useContext(DialogContext);

  return (
    <ContentLayoutEditProvider contentLayout={contentLayoutVM}>
      <div
        onContextMenuCapture={(ev) => {
          //ev.stopPropagation();
          //ev.preventDefault();
        }}
        className="flex h-screen w-screen pt-[60px]  bg-[#252627] text-sm"
      >
        <div className="absolute w-screen h-[60px] left-0 right-0 top-0 flex items-center bg-[#464344] shadow">
          <img
            className="absolute left-5 top-[50%] translate-y-[-50%] h-4"
            src={title_logo}
            alt=""
          />
          <span className="text-white font-bold text-xl absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] ">
            {contentLayoutVM.name} ({contentLayoutVM.category1})
          </span>

        
          <div className="absolute right-0 top-[50%] translate-y-[-50%] flex divide-x space-x-2 ">
            <ImageMenuButton
              imageSrc={미리보기아이콘}
              title="미리보기"
              onClick={() => {
                dialogCtx?.pushDialog(
                  <div
                    key={"prev_cms"}
                    className="fixed left-0 top-0 z-[500] w-screen h-screen bg-black"
                  >
                    <PreviewScene sceneVM={contentLayoutVM.activeScene!} />
                    <ColorButton
                      className="absolute right-3 top-3"
                      colorStyle="cancel"
                      title="Close"
                      onClick={() => dialogCtx?.popDialog()}
                    />
                  </div>
                );
              }}
            />
            <ImageMenuButton
              title={"취소"}
              imageSrc={취소아이콘}
              onClick={() => dialogCtx?.popDialog()}
            />
            <ImageMenuButton
              title={"저장"}
              colorType="yellow"
              imageSrc={저장아이콘}
              onClick={() => onSave(contentLayoutVM)}
            />
          </div>
        </div>

        <AccordionPanelBar barType="Left" className=" h-full">
          <LeftContentLibraryBar className=" w-[320px] bg-[#e8e6da] h-full  flex-shrink-0" />
        </AccordionPanelBar>

        <div className="relative flex-1 h-full pt-[60px]  bg-[#252627]">
          <TopToolbar className="absolute w-full  top-0 bg-[#464344]/50 h-[60px] " />
          <EditSceneArea
            contentLayoutVM={contentLayoutVM}
            sceneVM={contentLayoutVM.sceneItems[0]!}
            className=" w-full h-full "
          />
        </div>
        <AccordionPanelBar barType="Right" className="">
          <RightPropertyBar
            className="h-full w-[320px]"
            contentLayout={contentLayoutVM}
          />
        </AccordionPanelBar>
      </div>
    </ContentLayoutEditProvider>
  );
};

export default withModal(observer(CMSLayoutEditPopup));
