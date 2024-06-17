import React, { FC, useContext, useState } from "react";
// import { IMember, ITeamInfo } from "src/types/KioskInfo";
import { ISGUser } from "@shares/ISGUser";
import MemberSearchResultItem from "./MemberSearchResultItem";
import SearchResultActionButtons from "./SearchResultActionButtons";
import TeamSearchResultItem from "./TeamSearchResultItem";
import DialogContext, { IDialogContextData } from "src/contexts/DialogContext";
import MemberModal from "../OrganizationChart/modal/MemberModal";
import SearchOrganizationChart from "./SearchOrganizationChart";
import SearchFloorGuideMapModal from "./SearchFloorGuideMapModal";

// import dummyData, {
//   IOrganizationChart2,
//   ITeam,
// } from "src/types/OrganizationChart/dummy";

interface Props {
  users: Array<ISGUser>;
  className?: string;
  onClickInfo: (user: ISGUser) => void;
  onClickOrgChart: (user: ISGUser) => void;
  onClickFloorMap: (user: ISGUser) => void;
  onClickGetDirections: (user: ISGUser) => void;
}

const SearchUserResultList: React.FC<Props> = ({
  users,
  onClickInfo,
  onClickOrgChart,
  onClickFloorMap,
  onClickGetDirections,
  className,
}) => {
  const [selectedUser, setSelectedUser] = useState<ISGUser>();
  const handleClickItem = (member: ISGUser) => {
    setSelectedUser(member);
  };

  // console.log("search result user is :", users);

  const dialogCtx = useContext(DialogContext);

  return (
    <div className={`${className}  overflow-auto scrollbar`}>
      {users && users.length > 0 && (
        <div className="grid grid-cols-2 justify-items-center gap-y-[17px] ">
          {users.map((user, index) => (
            <MemberSearchResultItem
              key={user.sid}
              className="w-[508px] h-[144px]"
              user={user}
              onClick={() => {
                onClickInfo(user);
              }}
              onClickLocationMap={onClickFloorMap}
              onClickOrgChart={onClickOrgChart}
              onClickGetDirections={onClickGetDirections}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUserResultList;

// export function showInputDialog(
//   ctx: IDialogContextData,
//   title: string,
//   onOk: (input: string) => void,
//   onCancel?: () => void,
//   initText: string = ""
// ) {
//   ctx?.setDialog(
//     <InputModal
//       inputText={initText}
//       title={title}
//       onOk={(input) => {
//         ctx!.setDialog(null);
//         onOk(input);
//       }}
//       onCancel={() => {
//         ctx!.setDialog(null);
//         if (onCancel) {
//           onCancel();
//         }
//       }}
//     />
//   );
// }
