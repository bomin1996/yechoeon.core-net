import { useContext, useEffect, useState } from "react";
import KioskContext from "src/contexts/KioskContext";
import TitleSegmented from "../ui/TitleSegmented";
import { ViewDirectionType } from "src/types/Defines";
import NoticeListView from "./NoticeListView";
import { ISGNoticeInfo } from "@shares/*";
import { useParams } from "react-router-dom";
import NoticeContentItem from "./NoticeListContent";
import RightTitleLayout, {
  RightTitleAdaptiveLayout,
  RightTitleLayout2NoImage,
  RightTitleLayout3NoImage,
} from "../RightTitleLayout";
import useHorizontalScreen from "src/hooks/useHorizontalScreen";
import SimplePageNumber from "../ui/SimplePageNumber";
import FullPageNavigator from "../ui/FullPageNavigator";
import ContentPopupLayout from "../ui/Layouts/ContentPopupLayout";
import DialogContext from "src/contexts/DialogContext";

const ITEM_COUNT_PER_PAGE_HORIZONTAL = 7;
const ITEM_COUNT_PER_PAGE_VERTICAL = 13;

interface Props {}

export default function Notice({}: Props) {
  const isHorizontal = useHorizontalScreen();
  const kioskCtx = useContext(KioskContext);
  const dialogCtx = useContext(DialogContext);

  let noticeList = kioskCtx?.noticeInfo?.sort((a, b) => {
    let aa = a.writeDate ?? "";
    let bb = b.writeDate ?? "";
    return aa > bb ? -1 : 1;
  });

  console.log("after sort", noticeList);
  const [selectedContents, setSelectedContents] = useState<ISGNoticeInfo>();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    if (noticeList) {
      const index = currentPageIndex * ITEM_COUNT_PER_PAGE_HORIZONTAL;
      const firstItemOnPage = noticeList[index];
      setSelectedContents(firstItemOnPage);
    }
  }, [currentPageIndex, noticeList]);

  if (isHorizontal) {
    const totalPageCount = Math.ceil(
      (noticeList?.length ?? 0) / ITEM_COUNT_PER_PAGE_HORIZONTAL
    );
    return (
      <div className="relative w-full h-full flex pt-mainTopSpacing pb-horizontal-bottombar-height pr-mainSecondRightSpacing">
        <RightTitleLayout2NoImage
          title="새소식"
          className="flex space-x-[30px] w-full h-full px-[36px] pt-[120px] pb-[30px]">
          <div className="flex flex-col items-center w-full ">
            {/* <TitleSegmented
              className="w-[40%] "
              titles={titles}
              selectedIndex={0}
              onSelected={() => {}}
            /> */}
            <NoticeListView
              className="pl-[10px] pt-[0px]  flex flex-1 "
              noticeList={noticeList}
              onClick={(selectedItem) => {
                console.log("NoticeListView", selectedItem);
                setSelectedContents(selectedItem);
              }}
              itemCountPerOnePage={ITEM_COUNT_PER_PAGE_HORIZONTAL}
              currentPageIndex={currentPageIndex}
            />
            <SimplePageNumber
              className="text-black"
              pageNum={currentPageIndex + 1}
              totalCountClassName="text-black"
              pageTotalCount={totalPageCount}
              showButtons={true}
              onClickPrev={() => setCurrentPageIndex((p) => p - 1)}
              onClickNext={() => setCurrentPageIndex((p) => p + 1)}
            />
          </div>

          <div className="h-full w-[755px] flex-shrink-0 flex-grow-0 pt-[0px] pb-[0px]">
            {selectedContents && (
              <NoticeContentItem
                className=" overflow-auto "
                content={selectedContents}
                isNoticeHorizontal={true}
              />
            )}
          </div>
        </RightTitleLayout2NoImage>
      </div>
    );
  } else {
    const totalPageCount = Math.ceil(
      (noticeList?.length ?? 0) / ITEM_COUNT_PER_PAGE_VERTICAL
    );
    return (
      <div className="relative w-full h-full flex pt-vertical-topbar-height pb-vertical-bottombar-height ">
        <RightTitleLayout3NoImage
          title="새소식"
          className=" w-full h-full pt-[168px] pb-[85px] px-[50px]">
          <NoticeListView
            className="pl-[10px] flex  "
            noticeList={noticeList}
            currentPageIndex={currentPageIndex}
            onClick={(selectedItem) => {
              console.log("NoticeListView", selectedItem);
              setSelectedContents(selectedItem);
              const indexOfSelectedItem =
                noticeList?.findIndex((it) => it === selectedItem) ?? 0;
              dialogCtx?.pushDialog(
                <ContentPopupLayout
                  key={"ContentPopupLayout-NewNotice"}
                  pageCount={noticeList?.length ?? 0}
                  initPageIndex={indexOfSelectedItem}
                  onClose={() => {
                    dialogCtx.popDialog();
                  }}>
                  {(itemIndex: number) => (
                    <NoticeContentItem
                      className="flex-1 overflow-auto "
                      content={noticeList![itemIndex]}
                      isNoticeHorizontal={true}
                    />
                    // <span className="text-3xl text-black">{itemIndex}</span>
                  )}
                </ContentPopupLayout>
              );
            }}
            itemCountPerOnePage={ITEM_COUNT_PER_PAGE_VERTICAL}
          />
          <SimplePageNumber
            className="absolute text-[24px] space-x-3 bottom-[58px] left-[50%] translate-x-[-50%] text-[#062B2A]"
            pageNum={currentPageIndex + 1}
            totalCountClassName="text-[#cacaca]"
            pageTotalCount={totalPageCount}
          />
          <FullPageNavigator
            navigatorType="Dark"
            pageNum={currentPageIndex + 1}
            pageTotalCount={totalPageCount}
            onClickPrev={() => setCurrentPageIndex((p) => p - 1)}
            onClickNext={() => setCurrentPageIndex((p) => p + 1)}
          />
        </RightTitleLayout3NoImage>
      </div>
    );
  }
}
