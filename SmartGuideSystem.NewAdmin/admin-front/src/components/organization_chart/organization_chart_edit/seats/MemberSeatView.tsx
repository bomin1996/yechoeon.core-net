import  { memo } from "react";
import { MemberSeatViewModel } from "@/viewmodels/organization_chart/MemberSeatViewModel";

interface Props {
  viewModel?: MemberSeatViewModel | null;
  className?: string;
}

// export default function MemberSeatView({ viewModel }: Props) {
//   return (
//     <div className="p-4 bg-white text-[#222529] flex h-[68px] w-[140px] text-sm  rounded-[10px] ">
//       <span className="m-auto text-[18px] font-bold">
//         {viewModel?.member.name}
//       </span>
//     </div>
//   );
// }

export default memo(function MemberSeatView({
  viewModel,
  className = " h-[100px] w-[100px] ",
}: Props) {
  return (
    <div
      className={`bg-white text-[#222529] rounded-md flex flex-col items-center justify-center text-[12px] font-black ${className}`}
    >
      <span className="text-[14px]">{viewModel?.member.name}</span>
      <span className="text-[10px]">{viewModel?.member.teamPosition}</span>
    </div>
  );
});
