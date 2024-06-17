import { useContext, useEffect, useMemo, useState } from "react";
import ColorButton from "../ui/button/ColorButton";
import TableList from "../TableList";
import SearchInput2 from "../ui/input/SearchInput2";
import DialogContext from "@/contexts/DialogContext";
import BlockUIContext from "@/contexts/BlockUIContext";
import { showEditMeetingDialog } from "../modals/EditMeetingInfoModal";
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
import { IYCSchedule } from "@shares/YC/IYCSchedule";
import { scheduleApis } from "@/server/YCWScheduleApis";
import { showEditYCScheduleDialog } from "../modals/EditYCScheduleModal";

const columnNames = [
  "id",
  "scheduleDate",
  "contents",
  "desc",
  "modifier",
  "modifiedTime",
];

const columnTitles = ["아이디", "일시", "내용", "비고", "등록자", "수정날짜"];

export default function ScheduleMain() {
  const [schedules, setSchedules] = useState<Array<IYCSchedule>>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const dialogCtx = useContext(DialogContext);
  const [searchText, setSearchText] = useState("");
  const blockUICtx = useContext(BlockUIContext);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const [currentDate, setCurrentDate] = useState(new Date());
  const { start, end } = getStartEndDateInOnePageCalendar(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1
  );
  const authCtx = useContext(AuthContext);

  const query = async () => {
    blockUICtx?.setBlock(true);
    const meetingInfos = await scheduleApis.schedules(
      start.toISOString(),
      end.toISOString()
    );
    blockUICtx?.setBlock(false);
    setSchedules(meetingInfos);
  };

  const handleAddSchedule = () => {
    const now = DateTime.now();

    const mm: IYCSchedule = {
      id: 0,
      contents: "",
      scheduleDate: now.set({ hour: 0, minute: 0, second: 0 }).toISO()!,
      desc: "",
      modifiedTime: now.toISO()!,
      modifier: "",
    };

    showEditYCScheduleDialog(dialogCtx!, mm, true, async (mi) => {
      const msg = `일시: ${mi.contents}\n내용: ${mi.contents}\n비고: ${mi.desc}`;

      showMessageOkCancelDialog(dialogCtx!, "일정 추가", msg, async () => {
        blockUICtx?.setBlock(true);
        const { result, error } = await scheduleApis.addSchedule(mi);
        blockUICtx?.setBlock(false);
        if (!error) {
          setSchedules((prev) => [...prev, result]);
          toast(`추가완료`);
        } else {
          toast(`오류발생: ${error}`);
        }
      });
    });
  };

  const handleEditSchedule = (scheduleInfo: IYCSchedule) => {
    const canEdit = true;

    showEditYCScheduleDialog(
      dialogCtx!,
      scheduleInfo,
      canEdit,
      (editedInfo) => {
        if (!canEdit) {
          return;
        }

        const msg = `일시:[${descDate(editedInfo.scheduleDate)}]\내용: [${
          editedInfo.contents
        }]\n비고:[${editedInfo.desc}]`;

        showMessageOkCancelDialog(dialogCtx!, "일정 수정", msg, async () => {
          blockUICtx?.setBlock(true);
          const { result, error } = await scheduleApis.updateSchedule(
            editedInfo
          );
          blockUICtx?.setBlock(false);

          if (!error) {
            setSchedules((pv) => {
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
      }
    );
  };

  const handleDeleteSchedule = (mm: IYCSchedule) => {
    const msg = `일시: [${descDate(mm.scheduleDate)}]\n내용: [${
      mm.contents
    }]\n비고: [${mm.desc}]`;

    showMessageOkCancelDialog(dialogCtx!, "일정 삭제", msg, async () => {
      blockUICtx?.setBlock(true);

      const { error } = await scheduleApis.deleteSchedule(mm);
      blockUICtx?.setBlock(false);

      if (!error) {
        setSchedules((pv) => {
          const editedMeetins = [...pv];
          const fi = editedMeetins.findIndex((mmi) => mmi.id === mm.id);
          editedMeetins.splice(fi, 1);
          return editedMeetins;
        });
        toast("삭제되었습니다.");
      }
    });
  };

  const handleViewSchedule = (scheduleInfo: IYCSchedule) => {
    const msg =
      `일시:${descDate(scheduleInfo.scheduleDate)}\n` +
      `내용:${scheduleInfo.contents}\n` +
      `비고:${scheduleInfo.desc}\n`;

    showMessageOkCancelDialog(
      dialogCtx!,
      scheduleInfo.contents,
      msg,
      () => {
        handleEditSchedule(scheduleInfo);
      },
      undefined,
      "수정",
      false,
      true,
      "삭제",
      () => {
        handleDeleteSchedule(scheduleInfo);
      }
    );
  };

  useEffect(() => {
    query();
  }, [currentDate]);

  const filterdSchedules = searchText
    ? schedules.filter(
        (m) => m.contents.includes(searchText) || m.desc?.includes(searchText)
      )
    : schedules;

  const calendarSrc = useMemo(() => {
    const convertedEvents = filterdSchedules.map((m, index) => {
      const event = {
        id: m.id.toString(),
        title: `${m.contents}/${m.desc}`,
        time: new Date(m.scheduleDate),
        src: m,
      };

      return event;
    });
    return convertedEvents;
  }, [schedules, searchText]);

  let canEditCurrentItem = false;
  let canDeleteCurrentItem = false;
  if (
    authCtx?.user?.role === "Admin" ||
    authCtx?.user?.role === "SystemAdmin"
  ) {
    canEditCurrentItem = filterdSchedules[selectedRowIndex] !== undefined;
    canDeleteCurrentItem = filterdSchedules[selectedRowIndex] !== undefined;
  } else {
    const currentItem = filterdSchedules[selectedRowIndex];
    if (currentItem) {
      canEditCurrentItem = filterdSchedules[selectedRowIndex] !== undefined;
      canDeleteCurrentItem = filterdSchedules[selectedRowIndex] !== undefined;
    }
  }

  return (
    <div
      className="h-full w-full relative flex flex-col items-stretch
     text-white bg-[#231f20] ">
      <span className="absolute top-5 left-5 text-2xl font-bold ">
        일정 관리
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
            placeholder="내용, 비고로 검색"
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
              handleDeleteSchedule(filterdSchedules[selectedRowIndex]);
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
              handleEditSchedule(filterdSchedules[selectedRowIndex]);
            }}
          />
        )}

        <ColorButton
          className="ml-auto mb-1"
          colorStyle="save"
          title="추가"
          onClick={handleAddSchedule}
        />
      </div>
      {selectedTabIndex === 0 ? (
        <MonCalender
          year={currentDate.getFullYear()}
          month={currentDate.getMonth() + 1}
          events={calendarSrc}
          className="h-full  flex-1 p-2 bg-[#231f20] overflow-auto"
          onClickEvent={(evt) => {
            handleViewSchedule((evt as any).src);
          }}
          onClickMoreEvent={(events) => {
            showListItemDialog(
              dialogCtx!,
              "모든 일정 보기",
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
                handleViewSchedule((item as any).src);
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
          rowItems={filterdSchedules}
          onDoubleClickRow={(index) => console.log("인덱스", index)}
          renderForColumn={(colData, colIndex) => {
            if (colIndex === 1) {
              return descDate(colData);
            } else if (colIndex === 5) {
              return descTime24(colData);
            } else {
              return colData;
            }
          }}
        />
      )}
    </div>
  );
}
