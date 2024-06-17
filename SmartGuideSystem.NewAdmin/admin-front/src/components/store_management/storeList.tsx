import BlockUIContext from "@/contexts/BlockUIContext";
import React, { useContext, useEffect, useState } from "react";
import { IHAStoreInfo } from "@shares/haman";
import TopTitlePanel from "../TopTitlePanel";
import ImageMenuButton from "../ui/button/ImageMenuButton";
import 새로만들기아이콘 from "@/assets/buttons/menus/새로만들기.svg";
import 삭제아이콘 from "@/assets/buttons/menus/삭제.svg";
import 수정아이콘 from "@/assets/buttons/menus/수정.svg";
import 새로고침아이콘 from "@/assets/buttons/menus/새로고침.svg";
import 장치새로고침아이콘 from "@/assets/buttons/menus/새로고침화이트.svg";
import TableList from "../TableList";
import DialogContext from "@/contexts/DialogContext";
import showHAStoreInfoDialog from "../dialogs/haman/HAStoreInfoDialog";
import { HAStoreApis } from "@/server/HAStoreApis";
import { descTime24 } from "@/helpers/desc-helpers";
import toast from "react-hot-toast";
import { showMessageOkCancelDialog } from "../modals";

export default function storeList() {
  const [storeList, setStoreList] = useState<Array<IHAStoreInfo>>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  //const [, setSelectedItem] = useState<IHAStoreInfo>();
  const [searchText, setSearchText] = useState("");
  const blockUICtx = useContext(BlockUIContext);
  const dialogCtx = useContext(DialogContext);

  useEffect(() => {
    requestStores();
  }, []);

  let filteredList = storeList;
  if (searchText) {
    filteredList = filteredList.filter((d) => d.name.includes(searchText));
  }
  const selectedStore = filteredList[selectedRowIndex];

  const requestStores = async () => {
    blockUICtx?.setBlock(true);
    const storeList = await HAStoreApis.storeList();
    setStoreList(storeList);
    blockUICtx?.setBlock(false);
  };

  const handleAddStore = () => {
    showHAStoreInfoDialog(dialogCtx!, {
      storeInfo: {
        id: 0,
        name: "",
        address: "",
        tel: "",
        storeDesc: "",
        thumbnail: "",
        approval: "0",
        useYn: true,
      },
      onOk: async (formData) => {
        blockUICtx?.setBlock(true);
        const { result, error } = await HAStoreApis.addStore(formData);
        blockUICtx?.setBlock(false);
        if (!error) {
          requestStores();
          toast(`추가완료`);
        } else {
          toast(`오류발생: ${error}`);
        }
      },
    });
  };

  const handleEditStore = () => {
    showHAStoreInfoDialog(dialogCtx!, {
      storeInfo: selectedStore,
      onOk: async (formData) => {
        blockUICtx?.setBlock(true);
        const { result, error } = await HAStoreApis.editStore(
          formData,
          selectedStore
        );
        blockUICtx?.setBlock(false);
        if (!error) {
          requestStores();
          toast(`수정완료`);
        } else {
          toast(`오류발생: ${error}`);
        }
      },
    });
  };

  const handleDeleteStore = () => {
    showMessageOkCancelDialog(
      dialogCtx!,
      "상점 삭제",
      `${selectedStore.name} / ${selectedStore.address} 삭제?`,
      async () => {
        blockUICtx?.setBlock(true);
        const { result, error } = await HAStoreApis.removeStore(selectedStore);
        blockUICtx?.setBlock(false);
        if (!error) {
          requestStores();
          toast(`삭제완료`);
        } else {
          toast(`오류발생: ${error}`);
        }
      }
    );
  };

  return (
    <div className="h-full w-full  flex-shrink-0  relative flex flex-col text-white bg-[#231f20] pt-topMenuBarHeight">
      <TopTitlePanel
        title="상점홍보관리"
        className="absolute left-0 top-0 w-full h-[120px]"
        searchText={searchText}
        placeholder="상호명, 주소, 전화번호"
        onChangedSearchText={(st) => setSearchText(st)}
      >
        <div className="flex absolute right-[32px] bottom-0 divide-x space-x-[12px] py-[12px]">
          <ImageMenuButton
            title={"수정"}
            imageSrc={수정아이콘}
            disabled={!selectedStore}
            onClick={handleEditStore}
          />
          <ImageMenuButton
            title={"삭제"}
            imageSrc={삭제아이콘}
            disabled={!selectedStore}
            onClick={handleDeleteStore}
          />
          <ImageMenuButton
            title={"상점 등록"}
            colorType="yellow"
            imageSrc={새로만들기아이콘}
            onClick={handleAddStore}
          />
        </div>
      </TopTitlePanel>

      <TableList
        selectedRowIndex={selectedRowIndex}
        onSelectRow={(idx) => {
          setSelectedRowIndex(idx);
        }}
        className="w-full h-full px-[33px] bg-[#231f20] overflow-auto  "
        columnNames={[
          "id",
          "name",
          "address",
          "tel",
          "storeDesc",
          "approval",
          // "startPubTime",
          // "endPubTime",
          "modifiedTime",
          "modifier",
        ]}
        columnTitles={[
          "아아디",
          "상호명",
          "주소",
          "전화번호",
          "소개글",
          "승인",
          // "게시시작",
          // "게시종료",
          "수정날짜",
          "수정자",
        ]}
        rowItems={filteredList}
        onDoubleClickRow={(index) => {
          //setSelectedItem(filteredList[index]);
          handleEditStore();
        }}
        renderForColumn={(colData, colIndex) => {
          if (colIndex === 6) {
            // || colIndex === 7 || colIndex === 8) {
            return descTime24(colData);
          } else if (colIndex === 5) {
            return colData === "1" ? "승인" : "미승인";
          } else {
            return colData;
          }
        }}
      />
    </div>
  );
}
