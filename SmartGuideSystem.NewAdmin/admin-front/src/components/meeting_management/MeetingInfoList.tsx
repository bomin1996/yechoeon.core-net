import  {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { meetingApis } from "@/server/meetingApis";
import ColorButton from "../ui/button/ColorButton";
import TableList from "../TableList";
import { ISGMeetingInfo } from "@shares/ISGMeetingInfo";
import SearchInput2 from "../ui/input/SearchInput2";
import DialogContext from "@/contexts/DialogContext";
import BlockUIContext from "@/contexts/BlockUIContext";
import { showEditMeetingDialog } from "../modals/EditMeetingInfoModal";
import { descTime, descTime24, descTimeOnly } from "@/helpers/desc-helpers";
import { DateTime } from "luxon";
import toast from "react-hot-toast";
import { showListItemDialog, showMessageOkCancelDialog } from "../modals";
import RoundedTabSegmented from "../ui/RoundedTabSegmented";
import MonCalender from "../MonCalendar/MonCalender";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { getStartEndDateInOnePageCalendar } from "../MonCalendar/MonCalendarUtils";
import AuthContext from "@/contexts/AuthContext";

const columnNames = [
  "id",
  "name",
  "meetingRoom",
  "startTime",
  "endTime",
  "subject",
  "deptName",
  "modifier",
  "modifiedTime",
];

const columnTitles = [
  "아이디",
  "이름",
  "회의실",
  "시작",
  "종료",
  "회의주제",
  "부서이름",
  "등록자",
  "수정날짜",
];

export default function MeetingInfoList() {
  const [meetings, setMeetings] = useState<Array<ISGMeetingInfo>>([]);
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
    const meetingInfos = await meetingApis.meetingInfos(
      start.toISOString(),
      end.toISOString()
    );
    blockUICtx?.setBlock(false);
    //alert(JSON.stringify(meetingInfos));
    setMeetings(meetingInfos);
  };

  const handleAddMeeting = () => {
    //const now = new Date();
    const now = DateTime.now();

    // const nnn = new Date();
    // nnn.setDate(5);
    // alert(nnn);

    const mm: ISGMeetingInfo = {
      id: 0,
      name: "",
      endTime: now.plus({ hour: 1 }).set({ minute: 0, second: 0 }).toISO()!,
      startTime: now.set({ minute: 0, second: 0 }).toISO()!,
      meetingDate: now.set({ hour: 0, minute: 0, second: 0 }).toISO()!,
      deptName: currentUser?.deptName ?? "",
      deptCode: currentUser?.deptCode ?? "",
      meetingRoom: "",
      subject: "",
      contents: "",
      modifiedTime: now.toISO()!,
      modifier: "",
    };

    const canChangeDept =
      currentUser?.role === "Admin" || currentUser?.role === "SystemAdmin";

    showEditMeetingDialog(dialogCtx!, mm, canChangeDept, true, async (mi) => {
      const msg = `회의이름:[${mi.name}]\n회의시작: [${descTime(
        mi.startTime
      )}]\n회의종료:[${descTime(mi.endTime)}]\n관련부서:[${
        mi.deptName
      }]\n회의실:[${mi.meetingRoom}]\n주제:[${mi.subject}]`;

      showMessageOkCancelDialog(dialogCtx!, "회의 추가", msg, async () => {
        blockUICtx?.setBlock(true);
        const { result, error } = await meetingApis.addMeetingInfo(mi);
        blockUICtx?.setBlock(false);
        if (!error) {
          setMeetings((prev) => [...prev, result]);
          toast(`추가완료`);
        } else {
          toast(`오류발생: ${error}`);
        }
      });
    });
  };

  const handleEditMeeting = (meetingInfo: ISGMeetingInfo) => {
    const canChangeDept =
      currentUser?.role === "Admin" || currentUser?.role === "SystemAdmin";

    const canEdit =
      currentUser?.role === "Admin" ||
      currentUser?.role === "SystemAdmin" ||
      authCtx?.user?.deptName === meetingInfo.deptName;

    showEditMeetingDialog(
      dialogCtx!,
      meetingInfo,
      canChangeDept,
      canEdit,
      (editedInfo) => {
        if (!canEdit) {
          return;
        }

        const msg = `회의이름:[${editedInfo.name}]\n회의시작: [${descTime(
          editedInfo.startTime
        )}]\n회의종료:[${descTime(editedInfo.endTime)}]\n관련부서:[${
          editedInfo.deptName
        }]\n회의실:[${editedInfo.meetingRoom}]\n주제:[${editedInfo.subject}]`;

        showMessageOkCancelDialog(dialogCtx!, "회의 수정", msg, async () => {
          blockUICtx?.setBlock(true);
          const { result, error } = await meetingApis.updateMeetingInfo(
            editedInfo
          );
          blockUICtx?.setBlock(false);

          if (!error) {
            setMeetings((pv) => {
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

  const handleDeleteMeeting = (mm: ISGMeetingInfo) => {
    const msg = `회의이름:[${mm.name}]\n회의시작: [${descTime(
      mm.startTime
    )}]\n회의종료:[${descTime(mm.endTime)}]\n회의실:\t[${
      mm.meetingRoom
    }]\n주제:[${mm.subject}]`;

    showMessageOkCancelDialog(dialogCtx!, "회의 삭제", msg, async () => {
      blockUICtx?.setBlock(true);

      const { error } = await meetingApis.deleteMeetingInfo(mm);
      blockUICtx?.setBlock(false);

      if (!error) {
        setMeetings((pv) => {
          const editedMeetins = [...pv];
          const fi = editedMeetins.findIndex((mmi) => mmi.id === mm.id);
          editedMeetins.splice(fi, 1);
          return editedMeetins;
        });
        toast("삭제되었습니다.");
      }
    });
  };

  const handleViewMeeting = (meetingInfo: ISGMeetingInfo) => {
    const msg =
      `주제:${meetingInfo.subject}\n` +
      `회의실:${meetingInfo.meetingRoom}\n` +
      `회의시작:${descTime(meetingInfo.startTime)}\n` +
      `회의종료:${descTime(meetingInfo.endTime)}\n` +
      `관련부서:${meetingInfo.deptName}\n` +
      `내용:${meetingInfo.contents}\n`;

    const canEdit =
      currentUser?.role === "Admin" ||
      currentUser?.role === "SystemAdmin" ||
      authCtx?.user?.deptName === meetingInfo.deptName;

    if (canEdit) {
      showMessageOkCancelDialog(
        dialogCtx!,
        meetingInfo.name,
        msg,
        () => {
          handleEditMeeting(meetingInfo);
        },
        undefined,
        "수정",
        false,
        true,
        "삭제",
        () => {
          handleDeleteMeeting(meetingInfo);
        }
      );
    } else {
      showMessageOkCancelDialog(
        dialogCtx!,
        meetingInfo.name,
        msg,
        () => {},
        undefined,
        undefined,
        true
      );
    }
  };

  useEffect(() => {
    query();
  }, [currentDate]);

  const filterdMeetings = searchText
    ? meetings.filter(
        (m) =>
          m.name.includes(searchText) ||
          m.deptName.includes(searchText) ||
          m.subject.includes(searchText) ||
          m.meetingRoom.includes(searchText)
      )
    : meetings;

  const calendarSrc = useMemo(() => {
    const convertedEvents = filterdMeetings.map((m, index) => {
      const event = {
        id: m.id.toString(),
        title: `[${descTimeOnly(m.startTime)}][${m.deptName}][${
          m.meetingRoom
        }] ${m.name}/[${m.subject}]`,
        time: new Date(m.startTime),
        src: m,
      };

      return event;
    });
    return convertedEvents;
  }, [meetings, searchText]);

  let canEditCurrentItem = false;
  let canDeleteCurrentItem = false;
  if (
    authCtx?.user?.role === "Admin" ||
    authCtx?.user?.role === "SystemAdmin"
  ) {
    canEditCurrentItem = filterdMeetings[selectedRowIndex] !== undefined;
    canDeleteCurrentItem = filterdMeetings[selectedRowIndex] !== undefined;
  } else {
    const currentItem = filterdMeetings[selectedRowIndex];
    if (currentItem) {
      canEditCurrentItem = authCtx?.user?.deptName === currentItem.deptName;
      canDeleteCurrentItem = authCtx?.user?.deptName === currentItem.deptName;
    }
  }

  return (
    <div
      className="h-full w-full relative flex flex-col items-stretch
     text-white bg-[#231f20] "
    >
      <span className="absolute top-5 left-5 text-2xl font-bold ">
        회의 관리
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
            placeholder="회의명, 회의실, 부서명으로 검색"
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
              handleDeleteMeeting(filterdMeetings[selectedRowIndex]);
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
              handleEditMeeting(filterdMeetings[selectedRowIndex]);
            }}
          />
        )}

        <ColorButton
          className="ml-auto mb-1"
          colorStyle="save"
          title="추가"
          onClick={handleAddMeeting}
        />
      </div>
      {selectedTabIndex === 0 ? (
        <MonCalender
          year={currentDate.getFullYear()}
          month={currentDate.getMonth() + 1}
          events={calendarSrc}
          className="h-full  flex-1 p-2 bg-[#231f20] overflow-auto"
          onClickEvent={(evt) => {
            handleViewMeeting((evt as any).src);
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
                    onClick={() => onClick(it)}
                  >
                    <span className="cursor-pointer">{it.title}</span>
                  </div>
                );
              },
              (item) => {
                dialogCtx?.popDialog();
                handleViewMeeting((item as any).src);
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
          rowItems={filterdMeetings}
          onDoubleClickRow={(index) => console.log("인덱스", index)}
          renderForColumn={(colData, colIndex) => {
            if (colIndex === 3 || colIndex === 4 || colIndex === 8) {
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
