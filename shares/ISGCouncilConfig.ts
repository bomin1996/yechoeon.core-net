import { ISGUser } from "./ISGUser";

export interface ISGCouncilConfig {
  // json.Add("Greeting", "");
  // json.Add("Profile", "");
  // json.Add("MemberIds", new JsonArray());
  profileImageUrl?: string;
  greeting?: string;
  profile?: string;
  memberIds?: string[];
  members?: Array<ISGUser>;
  chairmanId?: string;
}
