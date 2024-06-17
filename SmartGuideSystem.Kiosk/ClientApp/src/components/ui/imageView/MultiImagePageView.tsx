import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import placeHolder from "src/assets/placeholder.webp";

interface Props {
  className?: string;
  isPreview?: boolean;
  fileUrlList: string[];
  activePageNum?: number;
  onClick?: () => void;
  onChangePage: (pageNumber: number) => void;
}

export default function MultiImagePageView({
  activePageNum = 1,
  className = "",
  isPreview = false,
  fileUrlList,
  onClick,
  onChangePage,
}: Props) {
  const [pageCount, setPageCount] = useState(0);
  const pageNumber = activePageNum;
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [isWidthFull, setIsWidthFull] = useState(false);

  useEffect(() => {
    console.log(fileUrlList);
    if (fileUrlList.length >= 1) {
      setPageCount(fileUrlList.length);
      setCurrentImageUrl(fileUrlList[0]);
    }
  }, []);

  useEffect(() => {
    console.log("useEffect", pageNumber);
    onChangePage(pageNumber);
  }, [pageNumber]);

  const canPrev = pageNumber > 1 && pageCount > 2;
  const canNext = pageNumber + 1 <= pageCount && pageCount > 2;

  function changePage(offset: number) {
    console.log(pageNumber);
    // setPageNumber((prePageNumber) => prePageNumber + offset);
  }

  function changePageBack() {
    changePage(-1);

    if (fileUrlList != null) {
      setCurrentImageUrl(fileUrlList[pageNumber - 1]);
      console.log(fileUrlList[pageNumber - 1]);
    }
  }

  function changePageNext() {
    changePage(1);

    if (fileUrlList != null) {
      setCurrentImageUrl(fileUrlList[pageNumber]);
      console.log(pageNumber, fileUrlList[pageNumber]);
    }
  }

  let imageUrl = "";
  if (pageNumber > 1 && fileUrlList.length > 1) {
    imageUrl = "/gosiimages" + fileUrlList[pageNumber - 1];
  } else {
    imageUrl = "/gosiimages" + fileUrlList[0];
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white ${className} relative flex flex-col`}>
      <img
        alt=""
        src={imageUrl}
        onLoad={(ev) => {
          if (ev.currentTarget.naturalHeight < ev.currentTarget.naturalWidth) {
            setIsWidthFull(true);
          } else {
            setIsWidthFull(false);
          }
        }}
        onError={(ev) => (ev.currentTarget.src = placeHolder)}
        className={`${
          isWidthFull ? "w-full my-auto" : "h-full"
        } object-contain ${isPreview ? "p-1" : "p-2"}`}
      />

      {!isPreview && (
        <ChevronLeftIcon
          onClick={() => {
            if (canPrev) {
              changePageBack();
            }
          }}
          className={`absolute top-[50%] translate-y-[-50%]  left-[-15px] w-[140px] h-[140px] py-[10px] pr-[40px] ${
            canPrev
              ? "active:outline-none active:scale-95 focus:outline-none stroke-black/90 "
              : "stroke-gray-400 fill-gray-400  "
          } select-none  outline-0`}
        />
      )}

      {!isPreview && (
        <ChevronRightIcon
          onClick={() => {
            if (canNext) {
              changePageNext();
            }
          }}
          className={`absolute top-[50%] translate-y-[-50%]  right-[-15px] w-[140px] h-[140px] py-[10px] pl-[40px] ${
            canNext
              ? "active:outline-none active:scale-95 focus:outline-none stroke-black/90 "
              : "stroke-gray-400 fill-gray-400  "
          } select-none  outline-0`}
        />
      )}

      {!isPreview && (
        <div className=" mb-[24px] text-black/70 text-[20px] m-auto  ">
          Page : {pageNumber} / {pageCount}{" "}
        </div>
      )}
    </div>
  );
}
