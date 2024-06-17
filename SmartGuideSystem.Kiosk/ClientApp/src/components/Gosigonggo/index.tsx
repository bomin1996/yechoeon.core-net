import React, { useContext, useEffect, useMemo, useState } from "react";
import KioskContext from "src/contexts/KioskContext";
import GosiContents from "./GosiContents";
import GosiListItem from "./GosiListItem";
import { ISGGosigonggo } from "@shares/ISGGosigonggo";
import listTypeIcon from "src/assets/button/gosi/리스트버튼_blue.svg";
import squreTypeIcon from "src/assets/button/gosi/이미지버튼_blue.svg";
// import listTypeIcon from "src/assets/button/gosi/리스트버튼_green.svg";
// import squreTypeIcon from "src/assets/button/gosi/이미지버튼_green.svg";
import IconImageButton from "../ui/buttons/IconImageButton";
import RoundedButtonSegmented from "../ui/RoundedButtonSegmented";
import SimplePageNumber from "../ui/SimplePageNumber";
import { RightTitleLayout3NoImage } from "../RightTitleLayout";
import FullPageNavigator from "../ui/FullPageNavigator";
import useHorizontalScreen from "src/hooks/useHorizontalScreen";
import TitleSegmented from "../ui/TitleSegmented";
import DialogContext from "src/contexts/DialogContext";
import ContentPopupLayout from "../ui/Layouts/ContentPopupLayout";
import plusIcon from "src/assets/button/gosi/ic-gosi-plus.svg";
import { speak, speakCancel } from "src/tts/speak";
import GosiContentPopupLayout from "../ui/Layouts/GosiContentPopupLayout";
import { USE_GOSI_MAGNIF, USE_GOSI_TTS } from "src/const";

enum GosiFilterType {
  all,
  gosi,
  bid,
  employ,
}

const titles = ["모두보기", "공고", "고시", "채용공고"];

interface Props {
  layoutTypeItemCountByLayout: number;
  listTypeItemCountByPage: number;
  className?: string;
}

interface QueryProps {
  currentPageGosiList: ISGGosigonggo[];
  filterdGosiInfo: ISGGosigonggo[];
  totalPageCount: number;
}

export default function Gosigonggo(props: Props) {
  const isHorizontal = useHorizontalScreen();
  const kioskCtx = useContext(KioskContext);
  const gosiList = kioskCtx?.gosigonggoInfo;
  const settingGositypeTitle =
    kioskCtx?.deviceInfo?.extraSettings?.gosiOption?.gosiType;
  const initFilterIndex = settingGositypeTitle
    ? titles.indexOf(settingGositypeTitle)
    : 0;
  const [selectedFilterIndex, setSelectedFilterIndex] =
    useState(initFilterIndex);

  const filteredList = useMemo(() => {
    switch (titles[selectedFilterIndex]) {
      case "모두보기":
        return gosiList;
      case "고시":
        return gosiList?.filter((g) => g.gosiType === "01");
      case "공고":
        return gosiList?.filter(
          (g) =>
            g.gosiType === "03" || g.gosiType === "04" || g.gosiType === "02"
        );
      case "채용공고":
        return gosiList?.filter((g) => g.gosiType === "05");
    }
    gosiList?.filter((go) => go.gosiType === "");
  }, [selectedFilterIndex, gosiList]);

  if (isHorizontal) {
    return (
      <HorizontalGosigonggo
        filteredList={filteredList ?? []}
        selectedFilterTabIndex={selectedFilterIndex}
        onSelectedFilterTab={(index) => setSelectedFilterIndex(index)}
        {...props}
      />
    );
  } else {
    return (
      <VerticalGosigonggo
        filteredList={filteredList ?? []}
        selectedFilterTabIndex={selectedFilterIndex}
        onSelectedFilterTab={(index) => setSelectedFilterIndex(index)}
        {...props}
      />
    );
  }
}

interface SubProps {
  className?: string;
  selectedFilterTabIndex: number;
  filteredList: Array<ISGGosigonggo>;
  onSelectedFilterTab: (tabIndex: number) => void;
}

function VerticalGosigonggo({
  className,
  selectedFilterTabIndex,
  filteredList,
  onSelectedFilterTab,
}: SubProps) {
  const dialogCtx = useContext(DialogContext);
  const [isListTypeLayout, setIsListTypeLayout] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    setCurrentPageIndex(0);
  }, [filteredList, selectedFilterTabIndex, isListTypeLayout]);

  const itemCountPerOnePage = isListTypeLayout ? 10 : 4; // 화면에 보이는 아이템수 리스트일 경우10개 // 미리보기일경우 4개
  const pageCount = Math.ceil(filteredList.length / itemCountPerOnePage);
  const startIndex = currentPageIndex * itemCountPerOnePage;
  const currentGosiList = filteredList.slice(
    startIndex,
    startIndex + itemCountPerOnePage
  );

  const handleViewContentByPopup = (gosi: ISGGosigonggo) => {
    dialogCtx?.pushDialog(
      <GosiContentPopupLayout
        isTTSButtonVisible={USE_GOSI_TTS}
        isMagnifiers={USE_GOSI_MAGNIF}
        key={"ContentPopupLayout-Gosigonggo"}
        pageCount={gosi.fileInfo?.imageList.length ?? 0}
        // initPageIndex={1}
        gosi={gosi}
        initPageIndex={0}
        onClose={() => {
          dialogCtx.popDialog();
        }}
      />
    );
  };

  return (
    <div
      className={`w-full h-full pt-vertical-topbar-height pb-vertical-bottombar-height ${className}`}>
      <RightTitleLayout3NoImage
        title="고시공고"
        className="pt-[187px] pl-[80px] pr-[90px] w-full h-full flex flex-col">
        <div className="absolute left-[50%] translate-x-[-50%] top-[46px] flex space-x-[35px]">
          <IconImageButton
            buttonType="Circle"
            className="m-0 active:bg-accent-default"
            src={squreTypeIcon}
            onClick={function (): void {
              setIsListTypeLayout(false);
            }}
          />
          <IconImageButton
            buttonType="Circle"
            className="m-0 active:bg-accent-default"
            src={listTypeIcon}
            onClick={function (): void {
              setIsListTypeLayout(true);
            }}
          />
        </div>

        <RoundedButtonSegmented
          className="mb-[24px]"
          titles={titles}
          selectedIndex={selectedFilterTabIndex}
          onSelected={(title, tabIndex) => onSelectedFilterTab(tabIndex)}
        />

        <div
          className={`h-[1240px] w-full border-t-[1px] border-b-[1px] border-[#171c31] ${
            isListTypeLayout ? "pb-[0px] pt-[0px]" : "pb-[16px] pt-[16px]"
          } `}>
          {isListTypeLayout ? (
            <div className="w-full h-full overflow-hidden relative ">
              {currentGosiList?.map((gosi, index) => (
                <GosiListItem
                  onClick={() => handleViewContentByPopup(gosi)}
                  gosiInfo={gosi}
                  key={index}
                />
              ))}
            </div>
          ) : (
            <div className="h-full px-[8px] grid grid-cols-2 grid-rows-2 gap-x-[18px] gap-y-[15px] ">
              {currentGosiList?.map((gosi, index) =>
                gosi ? (
                  <GosiContents
                    gosiInfo={gosi}
                    key={index}
                    className="rounded-none border-[1px] border-[#cfcfcf] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.1)]"
                    isPreview={true}
                    onClick={() => handleViewContentByPopup(gosi)}
                    onChangePage={() => {}}
                  />
                ) : null
              )}
            </div>
          )}
        </div>

        {pageCount > 0 && (
          <SimplePageNumber
            className="mt-[31px] h-8 mx-auto space-x-3 text-[#062B2A] "
            totalCountClassName="text-[#CACACA]"
            pageNum={currentPageIndex + 1}
            pageTotalCount={pageCount}
          />
        )}

        <FullPageNavigator
          navigatorType="Dark"
          className="mt-16"
          pageNum={currentPageIndex + 1}
          pageTotalCount={pageCount}
          onClickPrev={() => setCurrentPageIndex((p) => p - 1)}
          onClickNext={() => setCurrentPageIndex((p) => p + 1)}
        />
      </RightTitleLayout3NoImage>
    </div>
  );
}

function HorizontalGosigonggo({
  className,
  selectedFilterTabIndex,
  filteredList,
  onSelectedFilterTab,
}: SubProps) {
  const dialogCtx = useContext(DialogContext);

  const [selectedContents, setSelectedContents] =
    useState<ISGGosigonggo | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const itemCountPerOnePage = 6; // 화면에 보이는 아이템수 6개 정도가 딱인듯
  const pageCount = Math.round(filteredList.length / itemCountPerOnePage);
  const startIndex = currentPageIndex * itemCountPerOnePage;
  const currentGosiList = filteredList.slice(
    startIndex,
    startIndex + itemCountPerOnePage
  );

  useEffect(() => {
    setCurrentPageIndex(0);
  }, [filteredList, selectedFilterTabIndex]);
  useEffect(() => {
    setSelectedContents(currentGosiList[0]);
  }, [currentPageIndex, selectedFilterTabIndex]);

  return (
    <div
      className={`relative w-full h-full flex pt-mainTopSpacing pb-horizontal-bottombar-height pr-mainSecondRightSpacing ${className}`}>
      {/* <RightTitleLayout3NoImage
        title="고시공고"
        className="w-full h-full flex flex-row justify-between space-x-4 px-[34px] pt-[120px] pb-[30px]"> */}
      <div className="w-full h-full flex flex-row justify-between space-x-4 px-[34px] pt-[36px] pb-[30px] bg-white rounded-r-[100px]">
        <div className="w-full flex flex-col">
          <div className="w-full h-full flex-1 overflow-hidden relative pt-[80px] ">
            {currentGosiList?.map((gosi, index) => (
              <GosiListItem
                onClick={() => {
                  setSelectedContents(gosi);
                }}
                className={`h-[118px] ${
                  gosi === selectedContents
                    ? "bg-[#00908D1A]/10 text-accent-text font-bold"
                    : ""
                }`}
                gosiInfo={gosi}
                key={index}
              />
            ))}
          </div>

          {pageCount > 0 && (
            <SimplePageNumber
              className="h-8 mx-auto  text-[#062B2A]"
              totalCountClassName="text-[#CACACA]"
              pageNum={currentPageIndex + 1}
              pageTotalCount={pageCount}
              showButtons={true}
              onClickPrev={() => setCurrentPageIndex((p) => p - 1)}
              onClickNext={() => setCurrentPageIndex((p) => p + 1)}
            />
          )}
        </div>
        <TitleSegmented
          className="absolute top-[28px] left-[30px]"
          titles={titles}
          selectedIndex={selectedFilterTabIndex}
          onSelected={(title, index) => onSelectedFilterTab(index)}
        />

        <div className=" flex-shrink-0 flex-grow-0 relative left-3">
          {selectedContents && (
            <GosiContents
              gosiInfo={selectedContents}
              className="w-[725px] right-3   rounded-none border-[1px] border-[#cfcfcf] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.1)]"
              isPreview={true}
              onClick={() => {
                dialogCtx?.pushDialog(
                  <ContentPopupLayout
                    key={"ContentPopupLayout-SelectedContent"}
                    pageCount={selectedContents.fileInfo?.imageList.length ?? 0}
                    initPageIndex={0}
                    onClose={() => {
                      dialogCtx.popDialog();
                    }}>
                    {(itemIndex: number) => (
                      // <GosiContents
                      //   activePageNum={itemIndex}
                      //   gosiInfo={selectedContents}
                      //   isPreview={true}
                      //   className="m-auto   box-border border-[25px] border-[#1d232f] overflow-y-auto"
                      //   onChangePage={(pn) => {}}
                      // />
                      // <h1 className="text-4xl font-bold">
                      //   {itemIndex}/
                      //   {selectedContents.fileInfo?.imageList.length}
                      // </h1>

                      <img
                        src={
                          "/gosiimages/" +
                          selectedContents.fileInfo?.imageList[itemIndex]
                        }
                        className="w-full h-full"
                      />
                    )}
                  </ContentPopupLayout>
                );
              }}
              onChangePage={() => {}}
            />
          )}

          <img
            src={plusIcon}
            alt=""
            width={80}
            className="absolute bottom-2 pointer-events-none right-2 "
          />
        </div>
      </div>
      {/* </RightTitleLayout3NoImage> */}
    </div>
  );
}
