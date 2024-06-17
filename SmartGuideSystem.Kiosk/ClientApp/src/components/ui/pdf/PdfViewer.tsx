import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Props {
  className?: string;
  contentsUrl: string;

  contentsHeight: number;
  contentsWidth: number;
  ttsText?: string;
  isThumbnail?: boolean;
}

export default function PdfViewer({
  contentsHeight,
  contentsUrl,
  contentsWidth,
  className = "",
  ttsText,
  isThumbnail = false,
}: Props) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfText, setPdfText] = useState("");

  const canPrev = pageNumber > 1 && numPages > 2;
  const canNext = pageNumber + 1 <= numPages && numPages > 2;

  function OnDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prePageNumber) => prePageNumber + offset);
  }

  function changePageBack() {
    changePage(-1);
  }

  function changePageNext() {
    changePage(1);
  }

  return (
    <div className={`bg-white ${className} relative flex flex-col`}>
      <Document file={contentsUrl} onLoadSuccess={OnDocumentLoadSuccess}>
        <Page
          height={contentsHeight}
          width={contentsWidth}
          pageNumber={pageNumber}
          onGetTextSuccess={({ items, styles }) =>
            items.map((it) => {
              setPdfText((preText) => preText + it.str);
            })
          }
        />
      </Document>

      {!isThumbnail && (
        <button
          onClick={changePageBack}
          disabled={!canPrev}
          className="absolute mt-[50%] left-0 font-bold  p-4 rounded-full text-black/90 stroke-black/90 disabled:text-black/30 disabled:stroke-black/30">
          <ChevronLeftIcon className="w-24 h-40" />
        </button>
      )}

      {!isThumbnail && (
        <button
          onClick={changePageNext}
          disabled={!canNext}
          className="absolute mt-[50%] right-0 font-bold p-4 rounded-full text-black/90 stroke-black/90 disabled:text-black/30 disabled:stroke-black/30">
          <ChevronRightIcon className="w-24 h-40" />
        </button>
      )}

      {!isThumbnail && (
        <div className=" mb-[24px] text-black/70 text-[20px] m-auto ">
          Page : {pageNumber} / {numPages}{" "}
        </div>
      )}
    </div>
  );
}
