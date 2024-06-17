import { useContext, useMemo, useState } from "react";
import SearchInput2 from "../ui/input/SearchInput2";
import { ISGDepartment, ISGUser } from "@shares/*";
import {
  UsersIcon,
  MinusCircleIcon,
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/outline";
import ColorButton from "../ui/button/ColorButton";
import { SeatingChartViewModel } from "@/viewmodels/seating_chart/SeatingChartViewModel";
import { observer } from "mobx-react";
import { showSeatPosChartOption } from "../modals/OptionSeatPosChartModal";
import DialogContext from "@/contexts/DialogContext";

interface Props {
  className?: string;
  viewModel: SeatingChartViewModel;
  depart: ISGDepartment;
  teamUsers?: Map<string, Array<ISGUser>>;
}
export default observer(function MemberListPanel({
  className,
  depart,
  teamUsers,
  viewModel,
}: Props) {
  const [searchText, setSearchText] = useState("");
  const dialogCtx = useContext(DialogContext);
  const existMap = useMemo(() => {
    const map = viewModel.createMap();
    console.log("existMap", map);
    return map;
  }, [viewModel.placeItems.length]);

  let teamRender: any[] = [];
  teamUsers?.forEach((users, groupName, map) => {
    teamRender.push(
      <div key={groupName} className="text-white/90 rounded shadow p-3 py-2">
        <div
          draggable={true}
          className="flex select-none cursor-pointer items-center"
        >
          <UsersIcon className="h-5 w-5" />
          <span className="font-bold text-base">{groupName}</span>{" "}
          <span className="flex-1"></span>
          <div className="grid grid-cols-2 gap-1">
            <ColorButton
              className="px-2 py-1 text-xs font-normal"
              colorStyle="open"
              onClick={() => {
                showSeatPosChartOption(
                  dialogCtx!,
                  (result) => {
                    viewModel.addTeamByOption(groupName, users, result);
                  },
                  viewModel.optionData
                );
              }}
              title="팀추가"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-2 ">
          {users &&
            users
              .filter((u) => searchText === "" || u.name.includes(searchText))
              .map((user, i) => (
                <p
                  className="flex items-center hover:bg-white/30 bg-white/5 px-1 py-1 rounded-sm "
                  key={i}
                >
                  <span className="flex-1 ml-3 text-xs ">
                    {user.name}{" "}
                    <i>
                      <strong>{user.teamPosition ?? user.positionName}</strong>
                    </i>
                  </span>
                  {/* <PlusCircleIcon className="h-6 w-6 active:opacity-70" /> */}
                  {existMap.has(user.sid) ? (
                    <MinusCircleIcon
                      className="h-6 w-6 stroke-red-500 active:opacity-70"
                      onClick={() => {
                        viewModel.removeMember(user);
                      }}
                    />
                  ) : (
                    <div className="flex">
                      <ArrowLeftCircleIcon
                        className="h-6 w-6 stroke-blue-500 active:opacity-70"
                        onClick={() => {
                          viewModel.addMemberItem(user, "left");
                        }}
                      />
                      <ArrowRightCircleIcon
                        className="h-6 w-6 stroke-blue-500 active:opacity-70"
                        onClick={() => {
                          viewModel.addMemberItem(user, "right");
                        }}
                      />
                      <ArrowUpCircleIcon
                        className="h-6 w-6 stroke-blue-500 active:opacity-70"
                        onClick={() => {
                          viewModel.addMemberItem(user, "up");
                        }}
                      />
                      <ArrowDownCircleIcon
                        className="h-6 w-6 stroke-blue-500 active:opacity-70"
                        onClick={() => {
                          viewModel.addMemberItem(user, "down");
                        }}
                      />
                    </div>
                  )}
                </p>
              ))}
        </div>
      </div>
    );
  });

  console.log("render --> LeftToolBar");

  return (
    <div className={`${className} p-4 flex flex-col`}>
      <SearchInput2
        className="ml-auto mb-2 w-[100%]"
        placeholder="장비명, 조직도명, 설명 검색"
        inputText={searchText}
        onChange={(text) => {
          setSearchText(text);
        }}
      />
      <div className="overflow-auto">{teamRender}</div>
    </div>
  );
});
