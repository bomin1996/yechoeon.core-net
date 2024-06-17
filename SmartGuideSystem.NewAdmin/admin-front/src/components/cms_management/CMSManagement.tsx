import { useContext, useEffect, useState } from "react";
import DialogContext from "@/contexts/DialogContext";
import CMSLayoutEditPopup from "./CMSLayoutEditPopup";
import { ContentLayoutViewModel } from "@/viewmodels/cms/ContentLayoutViewModel";
import TableList from "../TableList";
import { descTime24 } from "@/helpers/desc-helpers";
import BlockUIContext from "@/contexts/BlockUIContext";
import { ISGContentLayout } from "@shares/ISGContentLayout";
import { ContentApi } from "@/server/contentApi";
import toast from "react-hot-toast";
import { showMessageOkCancelDialog } from "../modals";
import AuthContext from "@/contexts/AuthContext";
import { showSelectDepartmentPopup } from "../modals/SelectFindDepartmentModal";

import TopTitlePanel from "../TopTitlePanel";
import { ImageMenuButton } from "../ui/button";
import 새로만들기아이콘 from "@/assets/buttons/menus/새로만들기.svg";
import 삭제아이콘 from "@/assets/buttons/menus/삭제.svg";
import 수정아이콘 from "@/assets/buttons/menus/수정.svg";

export default function CMSManagement() {
  const dialogCtx = useContext(DialogContext);

  const [contentLayouts, setContentLayouts] = useState<Array<ISGContentLayout>>(
    []
  );
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const blockUICtx = useContext(BlockUIContext);
  const authCtx = useContext(AuthContext)!;

  const queryContentLayouts = async () => {
    blockUICtx?.setBlock(true);
    const { result, error } = await ContentApi.contentLayoutList();
    blockUICtx?.setBlock(false);
    if (!error) {
      //console.log("queryContentLayouts", result);
      setContentLayouts(result);
    } else {
      toast(`오류발생: ${error}`);
    }
  };

  useEffect(() => {
    queryContentLayouts();
  }, []);

  let filteredList = contentLayouts;
  if (searchText) {
    filteredList = filteredList.filter((d) => d.name.includes(searchText));
  }

  const selectedContentLayout = filteredList[selectedRowIndex];

  const handleEditContentLayout = () => {
    if (selectedContentLayout) {
      const contentLayoutVM = new ContentLayoutViewModel(selectedContentLayout);
      dialogCtx?.pushDialog(
        <CMSLayoutEditPopup
          contentLayoutVM={contentLayoutVM}
          key={"CMSEditPopup"}
          onClose={() => dialogCtx?.popDialog()}
          isOpen={true}
          onSave={async (contentLayoutVM) => {
            dialogCtx.popDialog();

            blockUICtx?.setBlock(true);

            const { error } = await ContentApi.updateContentLayout(
              contentLayoutVM,
              "레이아웃수정",
              contentLayoutVM.category1
            );

            blockUICtx?.setBlock(false);

            if (!error) {
              await queryContentLayouts();
              toast(`수정완료`);
            } else {
              toast(`오류발생: ${error}`);
            }
          }}
        />
      );
    }
  };
  const handleDeleteContentLayout = () => {
    showMessageOkCancelDialog(
      dialogCtx!,
      "삭제",
      `[${selectedContentLayout.name}] 레이아웃을 삭제합니다.`,
      async () => {
        blockUICtx?.setBlock(true);
        const { error } = await ContentApi.deleteContentLayout(
          selectedContentLayout.id
        );
        blockUICtx?.setBlock(false);

        if (!error) {
          toast("삭제되었습니다.");
          setSelectedRowIndex(-1);
          queryContentLayouts();
        } else {
          toast(`서버오류:${error}`);
        }
      }
    );
  };
  const handleAddContentLayout = () => {
    if (
      authCtx.user?.role === "Admin" ||
      authCtx.user?.role === "SystemAdmin"
    ) {
      showSelectDepartmentPopup(dialogCtx!, (depart) => {
        handleAddNewLayouts(depart.name);
      });
    } else {
      const deptName = authCtx.user?.deptName;
      if (deptName) {
        handleAddNewLayouts(deptName);
      }
    }
  };
  const handleAddNewLayouts = async (deptName: string) => {
    const contentLayoutVM = new ContentLayoutViewModel();
    contentLayoutVM.initNew();
    contentLayoutVM.setName(deptName);
    contentLayoutVM.setCategory1(deptName);
    dialogCtx?.pushDialog(
      <CMSLayoutEditPopup
        contentLayoutVM={contentLayoutVM}
        key={"CMSEditPopup"}
        onClose={() => dialogCtx?.popDialog()}
        isOpen={true}
        onSave={async (contentLayoutVM) => {
          dialogCtx.popDialog();

          blockUICtx?.setBlock(true);

          const { error } = await ContentApi.updateContentLayout(
            contentLayoutVM,
            contentLayoutVM.name,
            deptName
          );

          blockUICtx?.setBlock(false);

          if (!error) {
            await queryContentLayouts();
            toast(`추가완료`);
          } else {
            toast(`오류발생: ${error}`);
          }
        }}
      />
    );
  };

  return (
    <div className="h-full w-full pt-topMenuBarHeight  flex-shrink-0  relative text-white bg-[#231f20] ">
      <TopTitlePanel
        title="컨텐츠관리"
        className="absolute left-0 top-0 w-full h-topMenuBarHeight"
        searchText={searchText}
        onChangedSearchText={(st) => setSearchText(st)}
      >
        <div className="flex absolute right-[32px] bottom-0 divide-x space-x-[12px] py-[12px]">
          <ImageMenuButton
            title={"수정"}
            imageSrc={수정아이콘}
            disabled={!selectedContentLayout}
            onClick={handleEditContentLayout}
          />
          <ImageMenuButton
            title={"삭제"}
            imageSrc={삭제아이콘}
            disabled={!selectedContentLayout}
            onClick={handleDeleteContentLayout}
          />
          <ImageMenuButton
            title={"새 레이아웃 추가"}
            colorType="yellow"
            imageSrc={새로만들기아이콘}
            onClick={handleAddContentLayout}
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
          "category1",
          "desc",
          "modifiedTime",
          "modifier",
        ]}
        columnTitles={[
          "아이디",
          "레이아웃명",
          "카테고리",
          "설명",
          "수정날짜",
          "수정자",
        ]}
        rowItems={filteredList}
        onDoubleClickRow={handleEditContentLayout}
        renderForColumn={(colData, colIndex) => {
          if (colIndex === 4) {
            return descTime24(colData);
          } else {
            return colData;
          }
        }}
      />
    </div>
  );
}
