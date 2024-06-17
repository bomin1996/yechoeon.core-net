import { useState, useContext, useEffect } from "react";
import DialogContext, { IDialogContextData } from "@/contexts/DialogContext";
import { ISGNotice } from "@shares/ISGNoticeInfo";
import TableList from "../TableList";
import EditNoticePopup from "./EditNoticePopup";
import BlockUIContext from "@/contexts/BlockUIContext";
import { noticegApis } from "@/server/noticeApis";
import toast from "react-hot-toast";

// const deviceTypeTitls = ["공지사항 목록"];

import TopTitlePanel from "../TopTitlePanel";
import { ImageMenuButton } from "../ui/button";

import 직원추가아이콘 from "@/assets/buttons/menus/직원변경.svg";
import 삭제아이콘 from "@/assets/buttons/menus/삭제.svg";
import 수정아이콘 from "@/assets/buttons/menus/수정.svg";
// import 인사디비동기화아이콘 from "@/assets/buttons/menus/인사디비동기화.svg";

export default function NoticeListMain() {
  const dialogCtx = useContext(DialogContext);
  const blockUICtx = useContext(BlockUIContext);

  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  // const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [noticeList, setNoticeList] = useState<Array<ISGNotice>>([]);
  const [searchText, setSearchText] = useState("");

  const query = async () => {
    blockUICtx?.setBlock(true);
    const noticeInfos = await noticegApis.noticeInfos();
    blockUICtx?.setBlock(false);
    setNoticeList(noticeInfos);
  };

  useEffect(() => {
    query();
  }, []);

  const handleEdit = () => {
    const selectedItem = filterdNoticeList[selectedRowIndex];
    if (!selectedItem) {
      return;
    }

    showEditNoticeDialog(dialogCtx!, selectedItem, async (noticeInfo) => {
      blockUICtx?.setBlock(true);
      const { result, error } = await noticegApis.addNoticeInfo(noticeInfo);
      blockUICtx?.setBlock(false);
      if (!error) {
        setNoticeList((prev) => [...prev, result]);
        toast(`추가완료`);
      } else {
        toast(`오류발생: ${error}`);
      }
    });
  };

  const handleNew = () => {
    const notiInfo: ISGNotice = {
      id: 0,
      title: "",
      deptName: "",
      contents: "",
      postDate: new Date().toISOString(),
      deptCode: "",
      views: 0,
      noticeType: "",
    };

    showEditNoticeDialog(dialogCtx!, notiInfo, async (noticeInfo) => {
      blockUICtx?.setBlock(true);
      const { result, error } = await noticegApis.addNoticeInfo(noticeInfo);
      blockUICtx?.setBlock(false);
      if (!error) {
        setNoticeList((prev) => [...prev, result]);
        toast(`추가완료`);
      } else {
        toast(`오류발생: ${error}`);
      }
    });
  };

  const filterdNoticeList = searchText
    ? noticeList.filter(
        (n) => n.title.includes(searchText) || n.deptName.includes(searchText)
      )
    : noticeList;

  return (
    <div className="h-full w-full relative pt-topMenuBarHeight text-white bg-[#231f20] overflow-y-scroll ">
      {/* <span className="absolute top-5 left-5 text-2xl font-bold ">
        공지사항관리
      </span> */}
      {/* <div className="h-32 bg-[#464344] flex flex-row items-end gap-2 pb-0 px-4">
        <RoundedTabSegmented
          titles={deviceTypeTitls}
          onSelected={(index) => setSelectedTabIndex(index)}
          selectedIndex={selectedTabIndex}
        />

        <ColorButton
          className="ml-auto mb-2"
          colorStyle="normal"
          title="삭제"
          onClick={() => {
            console.log("삭제");
          }}
        />
        <ColorButton
          className="mb-2"
          colorStyle="normal"
          title="수정"
          onClick={() => {
            const selectedItem = noticeList[selectedRowIndex];
            if (!selectedItem) {
              return;
            }

            showEditNoticeDialog(
              dialogCtx!,
              selectedItem,
              async (noticeInfo) => {
                blockUICtx?.setBlock(true);
                const { result, error } = await noticegApis.addNoticeInfo(
                  noticeInfo
                );
                blockUICtx?.setBlock(false);
                if (!error) {
                  setNoticeList((prev) => [...prev, result]);
                  toast(`추가완료`);
                } else {
                  toast(`오류발생: ${error}`);
                }
              }
            );
          }}
        />

        <ColorButton
          colorStyle="cancel"
          className="mb-2"
          title="공지사항 만들기"
          onClick={() => {
            const notiInfo: ISGNotice = {
              id: 0,
              title: "",
              deptName: "",
              contents: "",
              postDate: new Date().toISOString(),
              deptCode: "",
              views: 0,
              noticeType: "",
            };

            showEditNoticeDialog(dialogCtx!, notiInfo, async (noticeInfo) => {
              blockUICtx?.setBlock(true);
              const { result, error } = await noticegApis.addNoticeInfo(
                noticeInfo
              );
              blockUICtx?.setBlock(false);
              if (!error) {
                setNoticeList((prev) => [...prev, result]);
                toast(`추가완료`);
              } else {
                toast(`오류발생: ${error}`);
              }
            });
          }}
        />
      </div> */}

      <TopTitlePanel
        title="공지사항관리"
        className="absolute left-0 top-0 w-full h-topMenuBarHeight"
        searchText={searchText}
        placeholder="제목,부서명으로 검색"
        onChangedSearchText={(st) => setSearchText(st)}
      >
        <div className="flex absolute right-[32px] bottom-0 divide-x space-x-[12px] py-[12px]">
          <ImageMenuButton
            title={"수정"}
            imageSrc={수정아이콘}
            disabled={!filterdNoticeList[selectedRowIndex]}
            onClick={handleEdit}
          />

          <ImageMenuButton
            title={"삭제"}
            imageSrc={삭제아이콘}
            disabled={!filterdNoticeList[selectedRowIndex]}
            onClick={() => {}}
          />
          <ImageMenuButton
            title={"추가"}
            imageSrc={직원추가아이콘}
            colorType="yellow"
            onClick={handleNew}
          />
        </div>
      </TopTitlePanel>
      <TableList
        selectedRowIndex={selectedRowIndex}
        onSelectRow={(idx) => {
          setSelectedRowIndex(idx);
        }}
        className="w-full h-full px-[33px] "
        columnNames={[
          "title",
          "deptName",
          // "contents",
          "postDate",
          "views",
          "noticeType",
        ]}
        columnTitles={["제목", "부서", "작성일", "조회수", "타입"]}
        rowItems={filterdNoticeList}
        onDoubleClickRow={(index) => handleEdit()}
      />
    </div>
  );
}

function showEditNoticeDialog(
  ctx: IDialogContextData,
  notice: ISGNotice,
  onOk: (noticeInfo: ISGNotice) => void
): void {
  ctx?.pushDialog(
    <EditNoticePopup
      key="showEditNoticeDialog"
      noticeInfo={notice}
      onClose={() => ctx!.popDialog()}
      isOpen={true}
      onOk={(noticeInfo) => {
        ctx!.popDialog();
        onOk(noticeInfo);
      }}
      onCancel={() => ctx!.popDialog()}
    />
  );
}
