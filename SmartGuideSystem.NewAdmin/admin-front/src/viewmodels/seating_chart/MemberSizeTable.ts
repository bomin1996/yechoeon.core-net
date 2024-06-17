import { MemberCardSize } from "@shares/ISGSCNode";
import { TemplateNames } from "./TempateNames";

type SizeWidthHeight = {
  w: number;
  h: number;
};

const memberSizeTable = new Map<String, Map<MemberCardSize, SizeWidthHeight>>();

const template_member1 = new Map<MemberCardSize, SizeWidthHeight>();
template_member1.set("Large", { w: 169, h: 86 });
template_member1.set("Medium", { w: 150, h: 77 });
template_member1.set("Small", { w: 105, h: 53 });

const template_leader_horizontal = new Map<MemberCardSize, SizeWidthHeight>();
template_leader_horizontal.set("Large", { w: 264, h: 129 });
template_leader_horizontal.set("Medium", { w: 235, h: 115 });
template_leader_horizontal.set("Small", { w: 208, h: 100 });

const template_leader_vertical = new Map<MemberCardSize, SizeWidthHeight>();
template_leader_vertical.set("Large", { w: 154, h: 198 });
template_leader_vertical.set("Medium", { w: 154, h: 198 });
template_leader_vertical.set("Small", { w: 154, h: 198 });

const template_member_style1_member = new Map<
  MemberCardSize,
  SizeWidthHeight
>();
template_member_style1_member.set("Large", { w: 250, h: 130 });
template_member_style1_member.set("Medium", { w: 200, h: 100 });
template_member_style1_member.set("Small", { w: 150, h: 80 });

const template_member_style1_leader1 = new Map<
  MemberCardSize,
  SizeWidthHeight
>();
template_member_style1_leader1.set("Large", { w: 250, h: 130 });
template_member_style1_leader1.set("Medium", { w: 200, h: 100 });
template_member_style1_leader1.set("Small", { w: 150, h: 80 });

const template_member_style1_leader2 = new Map<
  MemberCardSize,
  SizeWidthHeight
>();
template_member_style1_leader2.set("Large", { w: 250, h: 130 });
template_member_style1_leader2.set("Medium", { w: 235, h: 115 });
template_member_style1_leader2.set("Small", { w: 150, h: 80 });

// >> member style2

const template_member_style2_member = new Map<
  MemberCardSize,
  SizeWidthHeight
>();
template_member_style2_member.set("Large", { w: 146, h: 200 });
template_member_style2_member.set("Medium", { w: 129, h: 177 });
template_member_style2_member.set("Small", { w: 100, h: 137 });

const template_member_style2_leader1 = new Map<
  MemberCardSize,
  SizeWidthHeight
>();
template_member_style2_leader1.set("Large", { w: 372, h: 180 });
template_member_style2_leader1.set("Medium", { w: 272, h: 136 });
template_member_style2_leader1.set("Small", { w: 220, h: 121 });

const template_member_style2_leader2 = new Map<
  MemberCardSize,
  SizeWidthHeight
>();
template_member_style2_leader2.set("Large", { w: 440, h: 212 });
template_member_style2_leader2.set("Medium", { w: 372, h: 180 });
template_member_style2_leader2.set("Small", { w: 340, h: 160 });
// << member style2

memberSizeTable.set(TemplateNames.template_member1, template_member1);
memberSizeTable.set(
  TemplateNames.template_leader_horizontal,
  template_leader_horizontal
);
memberSizeTable.set(
  TemplateNames.template_leader_vertical,
  template_leader_vertical
);
memberSizeTable.set(
  TemplateNames.template_member_style1_member,
  template_member_style1_member
);
memberSizeTable.set(
  TemplateNames.template_member_style1_leader1,
  template_member_style1_leader1
);
memberSizeTable.set(
  TemplateNames.template_member_style1_leader2,
  template_member_style1_leader2
);

// >>>
memberSizeTable.set(
  TemplateNames.template_member_style2_member,
  template_member_style2_member
);
memberSizeTable.set(
  TemplateNames.template_member_style2_leader1,
  template_member_style2_leader1
);
memberSizeTable.set(
  TemplateNames.template_member_style2_leader2,
  template_member_style2_leader2
);

export { memberSizeTable };
