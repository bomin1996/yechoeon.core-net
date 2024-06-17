import BlockUIContext from "@/contexts/BlockUIContext";
import  { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import TableList from "../TableList";
import { descTime24 } from "@/helpers/desc-helpers";
import { LocalMapApi } from "@/server/localMapApi";
import { ISGLocalMap } from "@shares/*";
import DialogContext from "@/contexts/DialogContext";
import { showEditLocalMapDialog } from "../modals/EditLocalMapModal";
import { showMessageOkCancelDialog } from "../modals";
import 새로만들기아이콘 from "@/assets/buttons/menus/새로만들기.svg";
import 삭제아이콘 from "@/assets/buttons/menus/삭제.svg";
import 수정아이콘 from "@/assets/buttons/menus/수정.svg";
import TopTitlePanel from "../TopTitlePanel";
import { ImageMenuButton } from "../ui/button";

function LocalMapInfoList() {
  const [localMapList, setLocalMapList] = useState<Array<ISGLocalMap>>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const dialogCtx = useContext(DialogContext);
  const [searchText, setSearchText] = useState("");
  const blockUICtx = useContext(BlockUIContext);

  const queryLocalMapList = async () => {
    blockUICtx?.setBlock(true);
    const { result, error } = await LocalMapApi.localMapList();
    blockUICtx?.setBlock(false);
    if (!error) {
      setLocalMapList(result);
    }
  };

  useEffect(() => {
    queryLocalMapList();
  }, []);

  let filteredList = localMapList;
  if (searchText) {
    filteredList = filteredList.filter((d) => d.name.includes(searchText));
  }
  const selectedLocalMap = filteredList[selectedRowIndex];

  console.log("selectedLocalMap", selectedLocalMap);

  const handleAddLocalMap = () => {
    const newLocalMap: ISGLocalMap = {
      id: 0,
      name: "신규",
      desc: "",
      url: "",
    };
    showEditLocalMapDialog(dialogCtx!, newLocalMap, (localmap) => {
      showMessageOkCancelDialog(
        dialogCtx!,
        "신규 관내도 추가",
        `알림) ${localmap.name} 관내도를 추가합니다. `,
        async () => {
          blockUICtx?.setBlock(true);
          const { error } = await LocalMapApi.addLocalMap(localmap);
          blockUICtx?.setBlock(false);
          if (!error) {
            toast(`추가완료`);
            queryLocalMapList();
          } else {
            toast(`오류발생: ${error}`);
          }
        }
      );
    });
  };

  const handleEditLocalMap = () => {
    showEditLocalMapDialog(dialogCtx!, selectedLocalMap, (localmap) => {
      showMessageOkCancelDialog(
        dialogCtx!,
        "관내도 수정",
        `알림) ${localmap.name} 관내도를 업데이트합니다. `,

        async () => {
          console.log("관내도업데이트", localmap);
          blockUICtx?.setBlock(true);
          const { error } = await LocalMapApi.updateLocalMap(localmap);
          blockUICtx?.setBlock(false);
          if (!error) {
            toast(`추가완료`);
            queryLocalMapList();
          } else {
            toast(`오류발생: ${error}`);
          }
        }
      );
    });
  };

  const handleDeleteLocalMap = () => {
    const selectLocalMap = filteredList[selectedRowIndex];

    showMessageOkCancelDialog(
      dialogCtx!,
      "관내도 삭제",
      `${selectLocalMap.name} / ${selectLocalMap.desc} 삭제?`,
      async () => {
        blockUICtx?.setBlock(true);
        const { result, error } = await LocalMapApi.removeLocalMap(
          selectLocalMap
        );
        blockUICtx?.setBlock(false);
        if (!error) {
          const idx = localMapList.findIndex((u) => u.id === selectLocalMap.id);
          localMapList.splice(idx, 1);
          setLocalMapList([...localMapList]);
          toast(`삭제완료`);
        } else {
          toast(`오류발생: ${error}`);
        }
      }
    );
  };

  return (
    <div className="h-full w-full pt-topMenuBarHeight  flex-shrink-0  relative text-white bg-[#231f20] ">
      {/* <span className="absolute top-5 left-5 text-2xl font-bold ">
        관내도 관리
      </span> */}
      {/* <div className="h-32 bg-[#464344]  flex flex-row items-end gap-2 pb-0 px-4 flex-shrink-0">
        <SearchInput2
          className=" mb-2"
          placeholder="관내도이름"
          inputText={searchText}
          onChange={(text) => {
            setSearchText(text);
          }}
        />

        <ColorButton
          className=" mb-2"
          colorStyle="delete"
          title="삭제"
          onClick={handleDeleteLocalMap}
        />
        <ColorButton
          className="mb-2"
          colorStyle="modify"
          title="수정"
          onClick={handleEditLocalMap}
        />
        <ColorButton
          className="mb-2"
          colorStyle="add"
          title="새관내도만들기"
          onClick={handleAddLocalMap}
        />
      </div> */}
      <TopTitlePanel
        title="관내도 관리"
        className="absolute left-0 top-0 w-full h-topMenuBarHeight"
        searchText={searchText}
        placeholder="관내도이름"
        onChangedSearchText={(st) => setSearchText(st)}
      >
        <div className="flex absolute right-[32px] bottom-0 divide-x space-x-[12px] py-[12px]">
          <ImageMenuButton
            title={"수정"}
            imageSrc={수정아이콘}
            disabled={!selectedLocalMap}
            onClick={handleEditLocalMap}
          />
          <ImageMenuButton
            title={"삭제"}
            imageSrc={삭제아이콘}
            disabled={!selectedLocalMap}
            onClick={handleDeleteLocalMap}
          />
          <ImageMenuButton
            title={"새로만들기"}
            colorType="yellow"
            onClick={handleAddLocalMap}
            imageSrc={새로만들기아이콘}
          />
        </div>
      </TopTitlePanel>
      <TableList
        selectedRowIndex={selectedRowIndex}
        onSelectRow={(idx) => {
          setSelectedRowIndex(idx);
        }}
        className="w-full h-full px-[33px] bg-[#231f20] overflow-auto  "
        columnNames={["id", "name", "desc", "modifiedTime", "modifier"]}
        columnTitles={["아이디", "관내도명", "설명", "수정날짜", "수정자"]}
        rowItems={filteredList}
        onDoubleClickRow={handleEditLocalMap}
        renderForColumn={(colData, colIndex) => {
          if (colIndex === 3) {
            return descTime24(colData);
          } else {
            return colData;
          }
        }}
      />
    </div>
  );
}

export default LocalMapInfoList;
