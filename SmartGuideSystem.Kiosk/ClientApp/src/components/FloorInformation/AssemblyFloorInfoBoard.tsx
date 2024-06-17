import React from "react";
import FloorInfoBoradItem from "./FloorInfoBoradItem";
import { useNavigate } from "react-router-dom";
interface Props {
  className?: string;
}
export default function AssemblyFloorInfoBoard({ className }: Props) {
  const navigate = useNavigate();

  // const handleClick = (floorNo: number) => {
  //   navigate(`/floor_guidemap/1/${floorNo - 1}`);
  // };
  const navigateFloor = (floorTitle: string) => {
    navigate(`/floor_guidemap/1?floorname=${floorTitle}`);
  };
  return (
    <div className={`${className} `}>
      <div className="flex flex-col w-full">
        <FloorInfoBoradItem
          className="border-t-[2px]"
          floorTitle="2F"
          childclassName="table-fixed"
          onClick={() => navigateFloor("2F")}
        >
          <tr>
            <td>본회의장</td>
            <td>의장실</td>
            <td>부의장실</td>
            <td>의회사무국장실</td>
          </tr>
          <tr>
            <td>의원연구실</td>
            <td>전문위원실</td>
            <td>회의실</td>
            <td>의정자료실</td>
          </tr>
        </FloorInfoBoradItem>
        <FloorInfoBoradItem
          childclassName="table-fixed"
          floorTitle="1F"
          onClick={() => navigateFloor("1F")}
        >
          <tr>
            <td>의회운영위원장실</td>
            <td>기획문화위원장실</td>
            <td>도시환경위원장실</td>
            <td>경제복지위원장실</td>
          </tr>
          <tr>
            <td>윤리특별위원장실</td>
            <td>의회운영(특별)위원회실</td>
            <td>기획문화위원회실</td>
            <td>도시환경위원회실</td>
          </tr>
          <tr>
            <td>경제복지위원회실</td>
            <td>의회사무국</td>
            <td>정책지원관실</td>
          </tr>
        </FloorInfoBoradItem>
      </div>
    </div>
  );
}
