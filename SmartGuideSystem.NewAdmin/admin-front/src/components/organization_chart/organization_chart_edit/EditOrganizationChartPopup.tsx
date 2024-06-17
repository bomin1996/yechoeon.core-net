import React, { useContext, useEffect, useMemo, useState } from "react";
import withModal from "@/components/ui/modal/withModal";

import title_logo from "@/assets/admin-text-logo.svg";
import SeatAreaView from "./SeatAreaView";
import ColorButton from "@/components/ui/button/ColorButton";

import deprtIcon from "@/assets/icons/icon-small-department.svg";
import { ISGDepartment, ISGUser } from "@shares/ISGDepartment";
import { UserApis } from "@/server/userApis";
import { SeatAreaViewModel } from "@/viewmodels/organization_chart/SeatAreaViewModel";
import { observer } from "mobx-react";
import DialogContext from "@/contexts/DialogContext";
import { showSelectMember } from "@/components/modals/SelectTeamMemerModal";
import { showInputDialog } from "@/components/modals/InputModal";
// import { DraggableGroupSeatViewModel } from "@/viewmodels/organization_chart/AbstractGroupSeatViewModels";

import { UsersIcon } from "@heroicons/react/24/solid";
import { IGroupSeatViewModel } from "@/viewmodels/organization_chart/IGroupSeatViewModel";
import { OrganizationApis } from "@/server/organizationApis";
import toast from "react-hot-toast";
import { showMessageOkCancelDialog } from "@/components/modals";

interface Props {
  // depart: IEditOrganizationItem;
  viewModel: SeatAreaViewModel;
  depart: ISGDepartment;
  onCancle: () => void;
  onOk: () => void;
}
const EditOrganizationChartPopup: React.FC<Props> = ({
  depart,
  onOk,
  onCancle,
  viewModel,
}) => {
  const dialogCtx = useContext(DialogContext);
  const [teamMembers, setTeamMembers] = useState<Map<string, Array<ISGUser>>>();

  const queryTeamMembers = async () => {
    const result = await UserApis.teamUsers(depart.deptCode);
    setTeamMembers(new Map(Object.entries(result)));
  };

  useEffect(() => {
    queryTeamMembers();
  }, []);

  const handleAddMemberToGroup = (
    group: IGroupSeatViewModel,
    lineIndex: number
  ) => {
    const userMap = new Map<string, ISGUser>();
    teamMembers?.forEach((v, k, m) => {
      v.forEach((user, index) => userMap.set(user.sid, user));
    });

    viewModel.groupSeats.forEach((g, index) => {
      const mappedUsers = g.getMembers(true);
      mappedUsers.forEach((user, index) => {
        if (userMap.has(user.sid)) {
          userMap.delete(user.sid);
        }
      });
    });

    const availableUsers = Array.from(userMap.values());

    // console.log("availableUsers:", availableUsers);

    showSelectMember(dialogCtx!, availableUsers, (u) => {
      if (lineIndex < 2) {
        group.addMemberToLine(lineIndex, u);
      } else {
        group.addGroupLeader(u);
      }
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col text-[#221e1f]">
      {/* Title Header */}
      <div className="relative h-16  flex-shrink-0 flex items-center bg-[#464344]">
        <span className="m-auto text-2xl font-bold text-white">
          조직도 : {viewModel.name}
        </span>
        <img
          className="absolute left-5 top-[50%] translate-y-[-50%] h-4"
          src={title_logo}
          alt=""
        />

        <ColorButton
          className="ml-auto  px-10 h-10"
          colorStyle="cancel"
          title="취소"
          onClick={onCancle}
        />
        <ColorButton
          className="ml-2 mr-4 px-10 h-10"
          colorStyle="save"
          title="저장"
          // onClick={async () => {
          //   if (viewModel.orgChart) {
          //     onOk();
          //   } else {
          //     const res = await OrganizationApis.existOrgChartName(
          //       viewModel.name
          //     );
          //     if (res?.status === 200) {
          //       if (res.data.exist === false) {
          //         onOk();
          //       } else {
          //         toast("이미 존재하는 이름입니다.");
          //       }
          //     }
          //   }
          // }}
          onClick={() => {
            showMessageOkCancelDialog(
              dialogCtx!,
              "조직도 변경",
              "경고) 조직도를 변경하면 사용자 검색 및 조직도 화면이 동시에 변경됩니다.",
              async () => {
                if (viewModel.orgChart) {
                  onOk();
                } else {
                  const res = await OrganizationApis.existOrgChartName(
                    viewModel.name
                  );
                  if (res?.status === 200) {
                    if (res.data.exist === false) {
                      onOk();
                    } else {
                      toast("이미 존재하는 이름입니다.");
                    }
                  }
                }
              }
            );
          }}
        />
      </div>
      <div className="flex-1 flex flex-row h-0">
        <LeftTeamListPanel
          depart={depart}
          teamUsers={teamMembers}
          viewModel={viewModel}
        />
        <div className="flex-1 w-0 bg-[#231f20] flex flex-col">
          {/* 조직도정보 */}
          <div className="py-4 flex-shrink-0 flex items-center px-4 gap-2 ">
            <div className="grid grid-cols-5 items-center gap-2">
              <span className="font-bold text-white/90 text-left">
                조직도이름
              </span>
              <input
                value={viewModel.name}
                readOnly={viewModel.orgChart !== undefined}
                onChange={(ev) => (viewModel.name = ev.target.value)}
                className="col-span-4 min-w-[300px] rounded-md h-8 font-bold px-2 text-xl text-[#221f1f]  bg-white w-[40%]"
              />
              <span className="font-bold text-white/90 text-left">
                조직도제목
              </span>
              <input
                value={viewModel.title}
                onChange={(ev) => (viewModel.title = ev.target.value)}
                className="col-span-4 min-w-[600px] rounded-md h-8 font-bold px-2 text-xl text-[#221f1f]  bg-white w-[40%]"
              />
              <span className="font-bold text-white/90 text-left">설명</span>
              <input
                value={viewModel.desc}
                onChange={(ev) => (viewModel.desc = ev.target.value)}
                className="col-span-4 min-w-[600px] rounded-md h-8 font-bold px-2 text-xl text-[#221f1f]  bg-white w-[40%]"
              />
            </div>

            {/* <ColorButton
              className="ml-auto"
              colorStyle="cancel"
              title="취소"
              onClick={onCancle}
            />
            <ColorButton
              colorStyle="save"
              title="저장"
              onClick={async () => {
                if (viewModel.orgChart) {
                  onOk();
                } else {
                  const res = await OrganizationApis.existOrgChartName(
                    viewModel.name
                  );
                  if (res?.status === 200) {
                    if (res.data.exist === false) {
                      onOk();
                    } else {
                      toast("이미 존재하는 이름입니다.");
                    }
                  }
                }
              }}
            /> */}
          </div>
          <div className="flex-1 h-0  p-4 flex  overflow-auto">
            <SeatAreaView
              viewModel={viewModel}
              onAddMember={handleAddMemberToGroup}
              className="rounded-[15px] border-[#635d5f] border-2 m-auto flex-shrink-0 flex-grow-0 "
            />

            {/* <div className="m-auto bg-red-700 flex-shrink-0 flex-grow-0 rounded-2xl w-[600px] h-[300px] "></div> */}
          </div>

          {/* <BottomPanel viewModel={viewModel} /> */}
        </div>

        <RightPropertyPanel
          viewModel={viewModel}
          teamUsers={teamMembers}
          depart={depart}
        />
      </div>
    </div>
  );
};

export default withModal(observer(EditOrganizationChartPopup));

const LeftTeamListPanel = observer(
  ({
    depart,
    teamUsers,
    viewModel,
  }: {
    depart: ISGDepartment;
    teamUsers?: Map<string, Array<ISGUser>>;
    viewModel: SeatAreaViewModel;
  }) => {
    const existMap = viewModel.createMap();
    const users = useMemo(() => {
      const userList: Array<ISGUser> = [];
      teamUsers?.forEach((v, k, m) => {
        v.forEach((u, i) => userList.push(u));
      });
      return userList;
    }, [teamUsers]);

    let teamRender: any[] = [];

    teamUsers?.forEach((users, groupName, map) => {
      teamRender.push(
        <div key={groupName} className=" bg-white/30 rounded shadow p-3 py-2">
          <div
            draggable={true}
            className="flex select-none cursor-pointer items-center"
          >
            {/* <img src={deprtIcon} alt="" /> */}
            <UsersIcon className="h-5 w-5" />
            <span className="font-bold text-base">{groupName}</span>{" "}
            <span className="flex-1"></span>
            {existMap.has(groupName) ? (
              <ColorButton
                colorStyle="cancel"
                onClick={() => {
                  viewModel.removeSeatGroup(groupName);
                }}
                title="제거"
              />
            ) : (
              <ColorButton
                colorStyle="open"
                onClick={() => {
                  viewModel.addSeatGroup(groupName, users);
                }}
                title="추가"
              />
            )}
          </div>
          <div className="flex flex-col gap-1 mt-2 ">
            {users &&
              users.map((user, i) => (
                <p className="flex" key={i}>
                  <span className="flex-1 ml-3 font-medium text-base">
                    {user.name} {user.teamPosition ?? user.positionName}
                  </span>
                  {existMap.has(user.sid) ? (
                    <ColorButton
                      colorStyle="cancel"
                      onClick={() => {
                        //viewModel.removeUserFromGroup(groupName, user);
                        viewModel.removeUser(user);
                      }}
                      title="제거"
                    />
                  ) : (
                    <ColorButton
                      colorStyle="open"
                      onClick={() => {
                        //viewModel.addSeatGroup(user.name, [user]);
                        viewModel.addSeatToAnyGroup(user, groupName);
                      }}
                      title="추가"
                    />
                  )}
                </p>
              ))}
          </div>
        </div>
      );
    });

    const ctx = useContext(DialogContext);

    return (
      <div className="w-96 h-full px-2 pb-2  flex flex-col gap-1  bg-[#e8e6da]">
        <div className="flex border-b h-12 items-center font-black text-2xl border-[#bebaae]">
          <img className="h-5 mr-1" src={deprtIcon} alt="" /> 관련부서:
          {depart.name}
        </div>
        <div className=" p-3 shadow py-3 rounded bg-white/50 flex justify-between gap-1 items-center">
          <span className="font-bold text-lg ">상위조직장</span>
          <span className="font-bold text-xl ml-4 mr-auto">
            {viewModel.topDeptLeader?.name}
          </span>
          <ColorButton
            colorStyle="open"
            onClick={() => {
              showSelectMember(ctx!, users, (u) => {
                viewModel.topDeptLeader = u;
              });
            }}
            title="추가"
            disable={viewModel.topDeptLeader !== null}
          />
          <ColorButton
            colorStyle="confirm"
            onClick={() => (viewModel.topDeptLeader = null)}
            title="제거"
            disable={!viewModel.topDeptLeader}
          />
        </div>
        <div className=" p-3 shadow py-3 rounded bg-white/50 flex justify-between gap-1 items-center">
          <span className="font-bold text-lg ">조직장</span>
          <span className="font-bold text-xl ml-4 mr-auto">
            {viewModel.deptLeader?.name}
          </span>
          <ColorButton
            colorStyle="open"
            onClick={() => {
              showSelectMember(ctx!, users, (u) => {
                viewModel.deptLeader = u;
              });
            }}
            disable={viewModel.deptLeader !== null}
            title="추가"
          />
          <ColorButton
            colorStyle="confirm"
            onClick={() => {
              viewModel.deptLeader = null;
            }}
            title="제거"
            disable={!viewModel.deptLeader}
          />
        </div>

        <div className="flex flex-col gap-2 overflow-auto">{teamRender}</div>
        <div className="flex-1 "></div>
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => {
              showInputDialog(ctx!, "자리명입력", (input) => {
                viewModel.addEmptySeatGroup(input);
              });
            }}
            className="btn-normal2 w-full"
          >
            빈팀추가
          </button>
          <button
            onClick={() => {
              if (viewModel.selectedGroup) {
                const index = viewModel.groupSeats.findIndex(
                  (v) => v == viewModel.selectedGroup
                );
                viewModel.groupSeats.splice(index, 1);
              }
            }}
            disabled={!viewModel.selectedGroup}
            className="btn-normal2 w-full disabled:opacity-75"
          >
            자리삭제
          </button>
        </div>
      </div>
    );
  }
);

const RightPropertyPanel = observer(
  ({
    depart,
    viewModel,
    teamUsers,
  }: {
    depart: ISGDepartment;
    viewModel: SeatAreaViewModel;
    teamUsers?: Map<string, Array<ISGUser>>;
  }) => {
    const existMap = viewModel.createMap();
    const users = useMemo(() => {
      const userList: Array<ISGUser> = [];
      teamUsers?.forEach((v, k, m) => {
        v.forEach((u, i) => {
          if (!existMap.has(u.sid)) {
            userList.push(u);
          }
        });
      });
      return userList;
    }, [teamUsers]);

    // let teamRender: any[] = [];

    // if (viewModel.selectedGroup) {
    //   teamRender.push(
    //     <div
    //       key={viewModel.selectedGroup.title}
    //       className=" rounded-lg bg-slate-100 shadow p-3 py-2"
    //     >
    //       <div
    //         draggable={true}
    //         className="flex select-none cursor-pointer items-center"
    //       >
    //         <img src={deprtIcon} alt="" />{" "}
    //         <span className="font-bold text-xl">
    //           {viewModel.selectedGroup?.title}
    //         </span>{" "}
    //         <span className="flex-1"></span>
    //         <ColorButton
    //           colorStyle="save"
    //           onClick={() => {
    //             viewModel.removeGroup(viewModel.selectedGroup!);
    //           }}
    //           title="제거"
    //         />
    //       </div>
    //       <div className="flex flex-col gap-1 mt-2 ">
    //         {viewModel.selectedGroup?.getMembers(true).map((u, i) => (
    //           <p className="flex" key={i}>
    //             <span className="flex-1 ml-3 font-bold text-lg">{u.name}</span>
    //             <ColorButton
    //               colorStyle="save"
    //               onClick={() => {
    //                 //viewModel.selectedGroup?.removeMemberSeatViewModel(u)
    //               }}
    //               title="제거"
    //             />
    //           </p>
    //         ))}
    //       </div>
    //     </div>
    //   );
    // }

    const ctx = useContext(DialogContext);

    return (
      <div className="w-96 h-full px-3 py-2 flex flex-col gap-1 bg-[#e8e6da]">
        <div className="flex border-b h-12 items-center font-black text-2xl border-[#bebaae]">
          선택그룹정보
        </div>

        <div className="grid grid-cols-5 font-bold mt-3 text-sm gap-2 items-center">
          <span className="col-span-">속성</span>
          <p className="col-span-4 flex items-center">
            <input
              className="col-span-1 mx-2 text-left rounded-md focus:shadow outline-green-500/50 focus:outline"
              type="checkbox"
              checked={viewModel.selectedGroup?.dontAddTeamWord}
              onChange={(ev) => {
                if (viewModel.selectedGroup) {
                  viewModel.selectedGroup!.dontAddTeamWord = ev.target.checked;
                }
              }}
            />
            팀붙이지 않음
            <input
              className="col-span-1 ml-6 mr-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
              type="checkbox"
              checked={viewModel.selectedGroup?.dontShowTeamDetailButton}
              onChange={(ev) => {
                if (viewModel.selectedGroup) {
                  viewModel.selectedGroup!.dontShowTeamDetailButton =
                    ev.target.checked;
                }
              }}
            />
            자세히 표시 안함
          </p>

          <span>그룹명</span>
          <input
            className="col-span-4 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
            type="text"
            value={viewModel.selectedGroup?.title}
            onChange={(ev) => {
              if (viewModel.selectedGroup) {
                viewModel.selectedGroup.title = ev.target.value;
              }
            }}
          />
          <span>전화</span>
          <input
            value={viewModel.selectedGroup?.officeTel}
            onChange={(ev) => {
              if (viewModel.selectedGroup) {
                viewModel.selectedGroup.officeTel = ev.target.value;
              }
            }}
            className="col-span-4 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
            type="text"
          />
          <span>팩스</span>
          <input
            value={viewModel.selectedGroup?.officeFax}
            onChange={(ev) => {
              if (viewModel.selectedGroup) {
                viewModel.selectedGroup.officeFax = ev.target.value;
              }
            }}
            className="col-span-4 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
            type="text"
          />
          <span>업무</span>
          <textarea
            value={viewModel.selectedGroup?.job}
            onChange={(ev) => {
              if (viewModel.selectedGroup) {
                viewModel.selectedGroup.job = ev.target.value;
              }
            }}
            className="col-span-4 rouned-full text-sm min-h-[200px] px-4 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
            maxLength={200}
          />
        </div>

        <div className="flex border-b h-12 items-center font-black text-2xl border-[#bebaae]">
          {viewModel.deptName}정보
        </div>
        <div className="grid grid-cols-5 font-bold mt-3 text-sm gap-2 items-center">
          <span className="col-span-">속성</span>
          <p className="col-span-4 flex items-center">
            <input
              className="col-span-1 ml-6 mr-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
              type="checkbox"
              checked={viewModel.dontShowTeamDetailButton}
              onChange={(ev) => {
                viewModel.dontShowTeamDetailButton = ev.target.checked;
              }}
            />
            자세히 표시 안함
          </p>

          <span>전화</span>
          <input
            value={viewModel.officeTel}
            onChange={(ev) => {
              viewModel.officeTel = ev.target.value;
            }}
            className="col-span-4 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
            type="text"
          />
          <span>팩스</span>
          <input
            value={viewModel.officeFax}
            onChange={(ev) => {
              viewModel.officeFax = ev.target.value;
            }}
            className="col-span-4 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
            type="text"
          />
          <span>업무</span>
          <textarea
            value={viewModel.departJob}
            onChange={(ev) => {
              viewModel.departJob = ev.target.value;
            }}
            className="col-span-4 rouned-full text-sm min-h-[200px] px-4 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
            maxLength={200}
          />
        </div>

        <div className="flex-1" />
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => {
              showSelectMember(ctx!, users, (u) => {
                viewModel.selectedGroup?.addMemberToLine(0, u);
                viewModel.setSelectedGroup(null);
              });
            }}
            className="btn-normal2 w-full"
          >
            멤버추가
          </button>
          {/* <button
            onClick={() => {
              if (viewModel.selectedGroup) {
                const index = viewModel.groupSeats.findIndex(
                  (v) => v == viewModel.selectedGroup
                );
                viewModel.groupSeats.splice(index, 1);
              }
            }}
            disabled={!viewModel.selectedGroup}
            className="btn-normal2 w-full disabled:opacity-75"
          >
            자리삭제
          </button> */}
        </div>
      </div>
    );
  }
);

const BottomPanel = observer(
  ({ viewModel }: { viewModel: SeatAreaViewModel }) => {
    return (
      <div className="h-[200px] w-full flex flex-col justify-start flex-shrink-0 p-[12px] bg-[#e8e6da]/50 text-black/50">
        <h1 className="text-white text-xl m-2">과정보입력</h1>
        <div className="h-full w-[600px] grid grid-cols-10 text-white/90 font-bold text-sm gap-1 items-start justify-self-start">
          <span>TEL</span>
          <input
            value={viewModel.officeTel}
            onChange={(ev) => {
              viewModel.officeTel = ev.target.value;
            }}
            className="col-span-4 text-black/50 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
            type="text"
          />
          {/* <input
          type="text"
          value={marker.title}
          onChange={(ev) => (marker.title = ev.target.value)}
          className="col-span-4 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
        ></input> */}
          <span>FAX</span>
          <input
            value={viewModel.officeFax}
            onChange={(ev) => {
              viewModel.officeFax = ev.target.value;
            }}
            className="col-span-4 text-black/50 px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
            type="text"
          />
          <span>Job</span>
          <textarea
            value={viewModel.departJob}
            onChange={(ev) => {
              viewModel.departJob = ev.target.value;
            }}
            className="col-span-4 rouned-full text-sm min-h-[100px] bg-white text-[#231f20]  px-2 py-2"
            maxLength={200}
          />
        </div>
      </div>
    );
  }
);
