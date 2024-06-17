import { useContext, useEffect, useMemo, useState } from "react";
import ColorButton from "../ui/button/ColorButton";
import TableList from "../TableList";
import { IYCWatcher } from "@shares/ISGMeetingInfo";
import SearchInput2 from "../ui/input/SearchInput2";
import DialogContext from "@/contexts/DialogContext";
import BlockUIContext from "@/contexts/BlockUIContext";
import {
  descDate,
  descTime,
  descTime24,
  descTimeOnly,
} from "@/helpers/desc-helpers";
import { DateTime } from "luxon";
import toast from "react-hot-toast";
import { showListItemDialog, showMessageOkCancelDialog } from "../modals";
import RoundedTabSegmented from "../ui/RoundedTabSegmented";
import MonCalender from "../MonCalendar/MonCalender";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { getStartEndDateInOnePageCalendar } from "../MonCalendar/MonCalendarUtils";
import AuthContext from "@/contexts/AuthContext";
import { showEditYCWatcherDialog } from "../modals/EditYCWatcherModal";
import { watcherApis } from "@/server/YCWatcherApis";

const columnNames = [
  "id",
  "offDutyDate",
  "location",
  "watcherName",
  "division",
  "desc",
  "modifier",
  "modifiedTime",
];

const columnTitles = [
  "아이디",
  "당직일",
  "장소",
  "성명",
  "구분",
  "설명",
  "등록자",
  "수정날짜",
];

export default function WatcherMain() {
  const [watchers, setWatchers] = useState<Array<IYCWatcher>>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const dialogCtx = useContext(DialogContext);
  const [searchText, setSearchText] = useState("");
  const blockUICtx = useContext(BlockUIContext);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const currentUser = useContext(AuthContext)?.user;

  const [currentDate, setCurrentDate] = useState(new Date());
  const { start, end } = getStartEndDateInOnePageCalendar(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );
  const authCtx = useContext(AuthContext);

  const query = async () => {
    blockUICtx?.setBlock(true);
    const meetingInfos = await watcherApis.watchers(
      start.toISOString(),
      end.toISOString()
    );
    blockUICtx?.setBlock(false);
    setWatchers(meetingInfos);
  };

  const handleAddWatcher = () => {
    const now = DateTime.now();
    const mm: IYCWatcher = {
      id: 0,
      offDutyDate: now.set({ hour: 0, minute: 0, second: 0 }).toISO()!,
      location: "",
      watcherName: "",
      division: "",
      desc: "",
      modifiedTime: now.toISO()!,
      modifier: currentUser?.loginId ?? "",
    };

    showEditYCWatcherDialog(dialogCtx!, mm, true, async (mi) => {
      const msg = `장소: ${mi.location}\n당직일: ${descDate(
        mi.offDutyDate
      )}\n구분: ${mi.division}`;

      showMessageOkCancelDialog(dialogCtx!, "당직자 추가", msg, async () => {
        blockUICtx?.setBlock(true);
        const { result, error } = await watcherApis.addWatcher(mi);
        blockUICtx?.setBlock(false);
        if (!error) {
          setWatchers((prev) => [...prev, result]);
          toast(`추가완료`);
        } else {
          toast(`오류발생: ${error}`);
        }
      });
    });
  };

  const handleEditWatcher = (meetingInfo: IYCWatcher) => {
    const canEdit = true;

    showEditYCWatcherDialog(dialogCtx!, meetingInfo, canEdit, (editedInfo) => {
      if (!canEdit) {
        return;
      }

      const msg = `장소:[${editedInfo.location}]\n당직일: [${descDate(
        editedInfo.offDutyDate
      )}]\n구분:[${editedInfo.division}]`;

      showMessageOkCancelDialog(dialogCtx!, "당직자 수정", msg, async () => {
        blockUICtx?.setBlock(true);
        const { result, error } = await watcherApis.updateWatcher(editedInfo);
        blockUICtx?.setBlock(false);

        if (!error) {
          setWatchers((pv) => {
            const editedMeetins = [...pv];
            const fi = editedMeetins.findIndex((mmi) => mmi.id === result.id);
            editedMeetins[fi] = result;
            return editedMeetins;
          });
          toast(`수정완료`);
        } else {
          toast(`오류발생: ${error}`);
        }
      });
    });
  };

  const handleDeleteWatcher = (mm: IYCWatcher) => {
    const msg = `장소: [${mm.location}]\n당직일: [${descDate(
      mm.offDutyDate
    )}]\n구분: [${mm.division}]`;

    showMessageOkCancelDialog(dialogCtx!, "당직자 삭제", msg, async () => {
      blockUICtx?.setBlock(true);

      const { error } = await watcherApis.deleteWatcher(mm);
      blockUICtx?.setBlock(false);

      if (!error) {
        setWatchers((pv) => {
          const editedMeetins = [...pv];
          const fi = editedMeetins.findIndex((mmi) => mmi.id === mm.id);
          editedMeetins.splice(fi, 1);
          return editedMeetins;
        });
        toast("삭제되었습니다.");
      }
    });
  };

  const handleViewWatcher = (watcher: IYCWatcher) => {
    const msg =
      `당직일:${descDate(watcher.offDutyDate)}\n` +
      `장소:${watcher.location}\n` +
      `이름:${watcher.watcherName}\n` +
      `구분:${watcher.division}\n`;

    const canEdit = true;

    showMessageOkCancelDialog(
      dialogCtx!,
      watcher.watcherName,
      msg,
      () => {
        handleEditWatcher(watcher);
      },
      undefined,
      "수정",
      false,
      true,
      "삭제",
      () => {
        handleDeleteWatcher(watcher);
      }
    );
  };

  useEffect(() => {
    query();
  }, [currentDate]);

  const filterdWatchers = searchText
    ? watchers.filter(
        (m) =>
          m.watcherName.includes(searchText) ||
          m.division?.includes(searchText) ||
          m.location?.includes(searchText)
      )
    : watchers;

  const calendarSrc = useMemo(() => {
    const convertedEvents = filterdWatchers.map((m, index) => {
      const event = {
        id: m.id.toString(),
        title: ` ${m.watcherName}/${m.location}/${m.division}`,
        time: new Date(m.offDutyDate),
        src: m,
      };

      return event;
    });
    return convertedEvents;
  }, [watchers, searchText]);

  let canEditCurrentItem = false;
  let canDeleteCurrentItem = false;
  if (
    authCtx?.user?.role === "Admin" ||
    authCtx?.user?.role === "SystemAdmin"
  ) {
    canEditCurrentItem = filterdWatchers[selectedRowIndex] !== undefined;
    canDeleteCurrentItem = filterdWatchers[selectedRowIndex] !== undefined;
  } else {
    canEditCurrentItem = filterdWatchers[selectedRowIndex] !== undefined;
    canDeleteCurrentItem = filterdWatchers[selectedRowIndex] !== undefined;
  }

  return (
    <div
      className="h-full w-full relative flex flex-col items-stretch
     text-white bg-[#231f20] ">
      <span className="absolute top-5 left-5 text-2xl font-bold ">
        당직자 관리
      </span>
      <div className="absolute top-5 right-5 flex items-center">
        <ChevronLeftIcon
          className="h-10 w-10 p-2  hover:opacity-90 active:opacity-70 cursor-pointer"
          onClick={() => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            setCurrentDate(new Date(currentDate.getTime()));
          }}
        />
        <span className="mx-2 font-[500] text-center w-[140px]">
          {currentDate.getFullYear()}년 - {currentDate.getMonth() + 1}월
        </span>
        <ChevronRightIcon
          className="h-10 w-10 p-2  hover:opacity-90 active:opacity-70 cursor-pointer"
          onClick={() => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            setCurrentDate(new Date(currentDate.getTime()));
          }}
        />
      </div>
      <div className="h-32 bg-[#464344] flex flex-wrap flex-row items-end gap-2 pb-0 pl-8 pr-8 flex-shrink-0 flex-grow-0">
        <RoundedTabSegmented
          titles={["달력", "목록"]}
          onSelected={(index) => setSelectedTabIndex(index)}
          selectedIndex={selectedTabIndex}
        />

        <div className="flex flex-row mb-1 pl-4">
          <SearchInput2
            placeholder="이름으로 검색"
            inputText={searchText}
            onChange={(text) => {
              setSearchText(text);
            }}
          />
        </div>
        <div className="flex-1"></div>
        {selectedTabIndex === 1 && (
          <ColorButton
            className="ml-auto mb-1"
            colorStyle="delete"
            title="삭제"
            disable={!canDeleteCurrentItem}
            onClick={() => {
              handleDeleteWatcher(filterdWatchers[selectedRowIndex]);
            }}
          />
        )}
        {selectedTabIndex === 1 && (
          <ColorButton
            className="ml-auto mb-1"
            colorStyle="modify"
            title="수정"
            disable={!canEditCurrentItem}
            onClick={() => {
              handleEditWatcher(filterdWatchers[selectedRowIndex]);
            }}
          />
        )}

        <ColorButton
          className="ml-auto mb-1"
          colorStyle="save"
          title="추가"
          onClick={handleAddWatcher}
        />
      </div>
      {selectedTabIndex === 0 ? (
        <MonCalender
          year={currentDate.getFullYear()}
          month={currentDate.getMonth() + 1}
          events={calendarSrc}
          className="h-full  flex-1 p-2 bg-[#231f20] overflow-auto"
          onClickEvent={(evt) => {
            handleViewWatcher((evt as any).src);
          }}
          onClickMoreEvent={(events) => {
            showListItemDialog(
              dialogCtx!,
              "모든 당직자 보기",
              events,
              (it, idx, items, onClick) => {
                return (
                  <div
                    className="px-4 py-2 rounded-lg hover:bg-black/5 cursor-pointer"
                    onClick={() => onClick(it)}>
                    <span className="cursor-pointer">{it.title}</span>
                  </div>
                );
              },
              (item) => {
                dialogCtx?.popDialog();
                handleViewWatcher((item as any).src);
              },
              "space-y-3"
            );
          }}
        />
      ) : (
        <TableList
          selectedRowIndex={selectedRowIndex}
          onSelectRow={(idx) => {
            setSelectedRowIndex(idx);
          }}
          className="w-full flex-1 px-[33px] overflow-auto "
          columnNames={columnNames}
          columnTitles={columnTitles}
          rowItems={filterdWatchers}
          onDoubleClickRow={(index) => console.log("인덱스", index)}
          renderForColumn={(colData, colIndex) => {
            if (colIndex === 1) {
              return descDate(colData);
            } else if (colIndex === 7) {
              return descTime(colData);
            } else {
              return colData;
            }
          }}
        />
      )}
    </div>
  );
}
