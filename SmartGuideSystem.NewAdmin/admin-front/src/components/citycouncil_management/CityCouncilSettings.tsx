import { useContext, useEffect, useState } from "react";
import ColorButton from "../ui/button/ColorButton";
import placeHolderImage from "@/assets/placeholder.webp";
import { ISGCouncilConfig, ISGUser } from "@shares/ISGUser";
import ProfileCardLayout from "../seating_chart/place_holder_views/ProfileCardLayout";
import { UserApis } from "@/server/userApis";
import { showSelectMember } from "../modals/SelectTeamMemerModal";
import DialogContext from "@/contexts/DialogContext";
import axios from "axios";
import { ManageApi } from "@/server/manageApi";
import BlockUIContext from "@/contexts/BlockUIContext";
import { showMessageOkCancelDialog } from "../modals";
import toast from "react-hot-toast";

export default function CityCouncilSettings() {
  const [localImage, setLocalImage] = useState(placeHolderImage);
  const [greeting, setGreeting] = useState("");
  const [profile, setProfile] = useState("");
  const [members, setMembers] = useState<Array<ISGUser>>([]);
  const [allMembers, setAllMembers] = useState<Array<ISGUser>>([]);
  const [chairman, setChairman] = useState<ISGUser>();
  const [config, setConfig] = useState<ISGCouncilConfig>();
  // const [selectedMember, setSelectedMember] = useState<ISGUser>();
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(-1);

  const dialogCtx = useContext(DialogContext);
  const blockUI = useContext(BlockUIContext);

  const queryCouncilMembers = async () => {
    blockUI?.setBlock(true);
    const { result, error } = await UserApis.councilUserList();
    blockUI?.setBlock(false);
    if (!error) {
      setAllMembers(result);
    } else {
      toast(`오류발생: ${error}`);
    }
  };

  const queryCouncilConfig = async () => {
    blockUI?.setBlock(true);
    const res = (await ManageApi.councilSettings()) as ISGCouncilConfig;
    blockUI?.setBlock(false);
    console.log("queryCouncilConfig:", res);
    setConfig(res);

    if (res) {
      setGreeting(res.greeting ?? "");
      setProfile(res.profile ?? "");
      setLocalImage(res.profileImageUrl ?? "");

      // const idArray: Array<string> = res.memberIds as Array<string>;

      // if (idArray && idArray.length) {
      //   const arrangeMembers: Array<ISGUser> = [];
      //   idArray.forEach((mid) => {
      //     const fidx = allMembers.findIndex((v) => v.sid === mid);
      //     if (fidx !== -1) {
      //       arrangeMembers.push(allMembers[fidx]);
      //     }
      //   });
      //   setMembers(arrangeMembers);
      // } else {
      //   setMembers([]);
      // }
    }
  };

  useEffect(() => {
    queryCouncilMembers();
    queryCouncilConfig();
  }, []);

  useEffect(() => {
    const idArray: Array<string> = config?.memberIds as Array<string>;

    if (idArray && idArray.length) {
      const arrangeMembers: Array<ISGUser> = [];
      idArray.forEach((mid) => {
        const fidx = allMembers.findIndex((v) => v.sid === mid);
        if (fidx !== -1) {
          arrangeMembers.push(allMembers[fidx]);
        }
      });
      setMembers(arrangeMembers);

      if (config?.chairmanId) {
        const fidx = allMembers.findIndex((v) => v.sid === config?.chairmanId);
        if (fidx !== -1) {
          setChairman(allMembers[fidx]);
        }
      }
    } else {
      setMembers([]);
    }
  }, [config]);

  if (!config) {
    return <h1>Loading...Config</h1>;
  }

  // const selectedSid = selectedMember?.sid ?? "";

  return (
    <form
      className="h-full w-full relative flex flex-col gap-4 text-white bg-[#231f20] overflow-y-scroll p-[16px] "
      //   action="/api/manage-server/council-settings"
      //   method="POST"
      //   encType="multipart/form-data"
      onSubmit={async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        showMessageOkCancelDialog(
          dialogCtx!,
          "의회설정변경",
          "경고) 변경된 의회설정을 업데이트 합니다.",
          async () => {
            try {
              const data = new FormData(ev.target as HTMLFormElement);
              data.append("greeting", greeting);
              data.append("profile", profile);
              data.append("arrange", JSON.stringify(members.map((m) => m.sid)));
              //          data.append("arrange", members.map((m) => m.sid));
              data.append("chairmanId", chairman?.sid ?? "");

              await axios.post("/api/council/council-settings", data);

              toast("저장되었습니다.");
            } catch (exc) {
              toast(JSON.stringify(exc));
            }
          }
        );
      }}
    >
      <div className="flex items-center space-x-4">
        <span className="text-2xl font-bold ">의회설정</span>
        <button
          className="rounded-md px-4 py-2 bg-pink-500 w-40 font-bold hover:bg-pink-500/80 active:bg-pink-500/50"
          type="submit"
        >
          저장하기
        </button>
      </div>

      <div className="bg-white/5 min-w-[400px] min-h-[200px] p-2">
        {chairman && (
          <ProfileCard
            member={chairman}
            isSelected={false}
            onSelectItem={() => {}}
          />
        )}
        <ColorButton
          title="의장설정"
          className="mt-2"
          onClick={() => {
            showSelectMember(dialogCtx!, allMembers, (u) => {
              setChairman(u);
            });
          }}
          colorStyle={"confirm"}
        />
      </div>

      <p>시의회 의장 인사이미지 설정</p>
      <div>
        <div className="bg-[#A98E49] rounded-l-[30px] w-[647px] h-[500px] relative">
          <img
            src={localImage}
            className="absolute bottom-0 right-0 h-[438px] object-contain w-[604px] "
          />
        </div>
        <input
          name="file"
          type="file"
          onChange={(ev) => {
            if (ev.currentTarget.files && ev.currentTarget.files.length > 0) {
              const reader = new FileReader();
              reader.onload = (event) => {
                //document.getElementById("divOutput").src = event.target.result;

                if (event.target?.result) {
                  setLocalImage(String(event.target.result));
                }
              };
              reader.readAsDataURL(ev.currentTarget.files[0]);
            }
          }}
          // value={formik.values.photo}
          className="h-[50px] px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
        />
      </div>
      <p>시의회 의장 인사말 설정</p>
      <textarea
        name="greeting"
        placeholder="인사말"
        value={greeting}
        onChange={(ev) => {
          setGreeting(ev.target.value);
        }}
        className="col-span-4 rouned-full text-sm text-black min-h-[200px] max-w-[647px] px-4 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
        maxLength={1000}
      />
      <p>시의회 의장 프로필 설정</p>
      <textarea
        name="profile"
        placeholder="프로필"
        value={profile}
        onChange={(ev) => {
          setProfile(ev.target.value);
        }}
        className="col-span-4 rouned-full text-sm text-black min-h-[200px] max-w-[647px] px-4 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline"
        maxLength={1000}
      />
      <p>시의회 의원 정렬 설정</p>
      <div className="flex space-x-2">
        <ColorButton
          className="w-24"
          colorStyle="confirm"
          title="추가"
          onClick={() => {
            showSelectMember(dialogCtx!, allMembers, (u) => {
              setMembers((prev) => [...prev, u]);
            });
          }}
        />
        <ColorButton
          className="w-24"
          colorStyle="delete"
          title="제거"
          onClick={() => {
            // const findex = members.findIndex((m) => m === selectedMember);
            // if (findex !== -1) {
            //   const editedMemebers = members.splice(findex, 1);
            //   setMembers(editedMemebers);
            // }
            const targetIndex = selectedMemberIndex;
            if (selectedMemberIndex !== -1) {
              // const arr = [...members];
              // arr.splice(selectedMemberIndex, 1);
              setMembers(members.filter((m, idx) => idx !== targetIndex));
              setSelectedMemberIndex(-1);
              // setMembers((prev) => {
              //   const arr = [...prev];
              //   arr.splice(selectedMemberIndex, 1);
              //   return arr;
              // });
            }
          }}
        />
        <ColorButton
          className="w-24"
          colorStyle="delete"
          title="전체제거"
          onClick={() => {
            setMembers([]);
          }}
        />
      </div>
      <div
        className=" w-[770px] min-h-[600px] p-2 bg-white/5"
        onClick={() => {}}
      >
        {/* <h1>{selectedMember?.sid}</h1> */}
        <div className="grid grid-cols-5 gap-2 ">
          {members.map((m, index) => (
            <ProfileCard
              key={index}
              member={m}
              isSelected={index === selectedMemberIndex}
              onSelectItem={(mm) => {
                //setSelectedMember(mm);
                setSelectedMemberIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </form>
  );
}

function ProfileCard({
  member,
  isSelected,
  onSelectItem,
}: {
  member: ISGUser;
  isSelected: boolean;
  onSelectItem: (member: ISGUser) => void;
}) {
  if (!member) {
    return null;
  }
  return (
    <ProfileCardLayout
      colorStyle="Yellow"
      sizeStyle="Medium"
      style={{ width: `150px`, height: `77px` }}
      onMouseDown={(ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        onSelectItem(member);
      }}
      className={`text-black relative flex flex-col border-black hover:bg-sky-500/30 select-none hover:border-dashed hover:border-2 ${
        isSelected ? "bg-sky-500 opacity-40" : " "
      }`}
    >
      <div className=" absolute left-[69px] top-[50%] translate-y-[-50%]">
        <p className="font-[500] text-[22px]">{member.name}</p>
        <p className="font-[500] text-[11px]">
          {member.positionName ?? member.teamPosition}
        </p>
      </div>
    </ProfileCardLayout>
  );
}
