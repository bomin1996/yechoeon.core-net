import { createContext, PropsWithChildren } from "react";
import { ISGTeam, ISGUser } from "@shares/ISGUser";

interface IContextData {
  onSelectedMember: (member: ISGUser) => void;
  onSelectedTeam: (team: ISGTeam) => void;
}

const OrganizationChartContext = createContext<IContextData | null>(null);

interface Props extends PropsWithChildren {
  onSelectedMember: (member: ISGUser) => void;
  onSelectedTeam: (team: ISGTeam) => void;
}

export function OrganizationChartProvider({
  children,
  onSelectedMember,
  onSelectedTeam,
}: Props) {
  return (
    <OrganizationChartContext.Provider
      value={{
        onSelectedMember: onSelectedMember,
        onSelectedTeam: onSelectedTeam,
      }}
    >
      {children}
    </OrganizationChartContext.Provider>
  );
}

export default OrganizationChartContext;
