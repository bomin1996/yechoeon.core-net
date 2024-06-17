import  { useContext, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import SearchInput2 from "../ui/input/SearchInput2";
import DialogContext from "@/contexts/DialogContext";
import ColorButton from "../ui/button/ColorButton";
import TableList from "../TableList";
import { descTime24 } from "@/helpers/desc-helpers";

const columnNames = [
  "notAncmtMgtNo",
  "title",
  "postDate",
  "startPeriod",
  "endPeriod",
  "deptName",
  "delete_yn",
];

const columnTitles = [
  "ID(고시번호)",
  "제목",
  "게시일자",
  "시작일",
  "종료일",
  "부서이름",
  "삭제",
];

export default function GosiList() {
  // const dialogCtx = useContext(DialogContext);
  const [searchText, setSearchText] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  const query = async () => {};

  useEffect(() => {
    query();
  }, [currentDate]);

  return (
    <div
      className="h-full w-full relative flex flex-col
   text-white bg-[#231f20] overflow-auto"
    >
      <span className="absolute top-5 left-5 text-2xl font-bold ">
        고시공고 관리
      </span>
      <div className="h-32 bg-[#464344] flex flex-row items-end gap-2 pb-0 pl-8 pr-16 flex-shrink-0">
        <div className="flex items-center">
          <ChevronLeftIcon
            className="h-10 w-10 p-2  hover:opacity-90 active:opacity-70 cursor-pointer"
            onClick={() => {
              currentDate.setMonth(currentDate.getMonth() - 1);
              setCurrentDate(new Date(currentDate.getTime()));
            }}
          />
          <span className="mx-2 font-[500] text-center w-20">
            {currentDate.getFullYear()} - {currentDate.getMonth() + 1}
          </span>
          <ChevronRightIcon
            className="h-10 w-10 p-2  hover:opacity-90 active:opacity-70 cursor-pointer"
            onClick={() => {
              currentDate.setMonth(currentDate.getMonth() + 1);
              setCurrentDate(new Date(currentDate.getTime()));
            }}
          />
        </div>

        <div className="flex flex-row mb-3 pl-4">
          <SearchInput2
            placeholder="회의명, 회의실, 부서명으로 검색"
            inputText={searchText}
            onChange={(text) => {
              setSearchText(text);
            }}
          />
        </div>

        <div className="flex-1"></div>
        <ColorButton
          className="ml-auto mb-3"
          colorStyle="delete"
          title="삭제"
          onClick={() => {}}
        />
        <ColorButton
          className="ml-auto mb-3"
          colorStyle="modify"
          title="수정"
          onClick={() => {}}
        />

        <ColorButton
          className="ml-auto mb-3"
          colorStyle="save"
          title="추가"
          onClick={() => {}}
        />
      </div>
      <TableList
        selectedRowIndex={selectedRowIndex}
        onSelectRow={(idx) => {
          setSelectedRowIndex(idx);
        }}
        className="w-full px-[33px] overflow-auto "
        columnNames={columnNames}
        columnTitles={columnTitles}
        rowItems={[]}
        onDoubleClickRow={(index) => console.log("인덱스", index)}
        renderForColumn={(colData, colIndex) => {
          if (colIndex === 3 || colIndex === 4 || colIndex === 8) {
            return descTime24(colData);
          } else {
            return colData;
          }
        }}
      />
    </div>
  );
}
