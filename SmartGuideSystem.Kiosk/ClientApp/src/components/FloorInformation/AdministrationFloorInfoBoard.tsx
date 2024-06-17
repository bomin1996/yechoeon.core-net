import React from "react";
import FloorInformationHeader, {
  FloorInformationHeaderItem,
} from "./FloorInformationHeader";
import FloorInfoBoradItem from "./FloorInfoBoradItem";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string;
}

export default function AdministrationFloorInfoBoard({ className }: Props) {
  const navigate = useNavigate();

  // const handleClick = (floorNo: number) => {
  //   navigate(`/floor_guidemap/0/${floorNo - 1}`);
  // };

  const navigateFloor = (floorTitle: string) => {
    navigate(`/floor_guidemap/0?floorname=${floorTitle}`);
  };

  return (
    <div className={`${className} `}>
      <FloorInformationHeader
        className="w-full"
        title1="홀수층 E/V 이용 ↓"
        title2="짝수층 E/V 이용 ↓"
      />

      <div className="grid grid-cols-12">
        <FloorInfoBoradItem
          floorTitle="9F"
          className="col-span-6"
          onClick={() => navigateFloor("9F")}>
          <tr>
            <td>맑은물사업소장실</td>
            <td>건축과</td>
            <td>주택경관과</td>
          </tr>
          <tr>
            <td>산림과</td>
            <td>수도과</td>
            <td>공원관리과</td>
          </tr>
          <tr>
            <td>G.I.S실</td>
          </tr>
        </FloorInfoBoradItem>
        <FloorInfoBoradItem
          floorTitle="10F"
          className="col-span-6"
          onClick={() => navigateFloor("10F")}>
          <tr>
            <td>스마트도시과</td>
            <td>도시관제센터</td>
          </tr>
          <tr>
            <td>전산교육장</td>
            <td>총괄계획가 집무실</td>
          </tr>
          <td colSpan={2}>민주평화통일자문회의 진주시협의회</td>
        </FloorInfoBoradItem>
        <FloorInfoBoradItem
          floorTitle="7F"
          className="col-span-6"
          onClick={() => navigateFloor("7F")}>
          <tr>
            <td>도시건설국장실</td>
            <td>도시계획과</td>
          </tr>
          <tr>
            <td>공공시설추진단</td>
            <td>도로과</td>
          </tr>
          <tr>
            <td>시민안전과</td>
            <td>건설하천과</td>
          </tr>
        </FloorInfoBoradItem>
        <FloorInfoBoradItem
          floorTitle="8F"
          className="col-span-6"
          onClick={() => navigateFloor("8F")}>
          <tr>
            <td>문화관광체육국장실</td>
            <td>공보관실</td>
          </tr>
          <tr>
            <td>문화예술과</td>
            <td>관광진흥과</td>
            <td>도시재생과</td>
          </tr>
          <tr>
            <td>환경관리과</td>
            <td>청소과</td>
            <td>차량지원실</td>
          </tr>
          <tr>
            <td colSpan={3}>전국공무원노동조합 진주시지부</td>
          </tr>
        </FloorInfoBoradItem>
        <FloorInfoBoradItem
          floorTitle="5F"
          className="col-span-6"
          onClick={() => navigateFloor("5F")}>
          <tr>
            <td>시장실</td>
            <td>부시장실</td>
            <td>기획행정국장실</td>
          </tr>
          <tr>
            <td>기획예산과</td>
            <td>행정과</td>
            <td>열린시장실</td>
          </tr>
          <tr>
            <td>소회의실</td>
            <td>기업인의방</td>
          </tr>
        </FloorInfoBoradItem>
        <FloorInfoBoradItem
          floorTitle="6F"
          className="col-span-6"
          onClick={() => navigateFloor("6F")}>
          <tr>
            <td>감사관실</td>
            <td>정보통신과</td>
            <td>위생과</td>
          </tr>
          <tr>
            <td>행정자료실</td>
          </tr>
        </FloorInfoBoradItem>
        <FloorInfoBoradItem
          floorTitle="3F"
          className="col-span-6"
          onClick={() => navigateFloor("3F")}>
          <tr>
            <td>경제통상국장실</td>
            <td>교통환경국장실</td>
          </tr>
          <tr>
            <td>일자리경제과</td>
            <td>기업통상과</td>
          </tr>
          <tr>
            <td>항공우주사업단</td>
            <td>교통행정과</td>
          </tr>
          <tr>
            <td>문화강좌실</td>
          </tr>
        </FloorInfoBoradItem>
        <FloorInfoBoradItem
          floorTitle="4F"
          className="col-span-6"
          onClick={() => navigateFloor("4F")}>
          <tr>
            <td>복지여성국장실</td>
            <td>회계과</td>
          </tr>
          <tr>
            <td>복지정책과</td>
            <td>노인장애인과</td>
          </tr>
          <tr>
            <td>여성가족과</td>
            <td>아동보육과</td>
          </tr>
          <tr>
            <td>진주복지콜센터</td>
          </tr>
        </FloorInfoBoradItem>
      </div>
      <FloorInformationHeader
        className="w-full border-t-[0px]"
        title1="E/V 공통 이용 ↓"
      />

      <div className="grid grid-cols-5">
        <FloorInfoBoradItem
          floorTitle="2F"
          className="col-span-5"
          childclassName="table-fixed"
          onClick={() => navigateFloor("2F")}>
          <tr>
            <td>시민홀</td>
            <td>장난감은행</td>
            <td>브리핑룸</td>
            <td>후생관</td>
            <td>어린이집</td>
            <td>시청각(카페)</td>
          </tr>
        </FloorInfoBoradItem>
        <FloorInfoBoradItem
          floorTitle="1F"
          className="col-span-5"
          childclassName="table-fixed"
          onClick={() => navigateFloor("1F")}>
          <tr>
            <td>민원여권과</td>
            <td>세무과</td>
            <td>징수과</td>
            <td>토지정보과</td>
            <td>농협</td>
            <td>경남은행</td>
          </tr>
        </FloorInfoBoradItem>
        <FloorInfoBoradItem
          floorTitle="B1"
          className="col-span-3 "
          onClick={() => navigateFloor("B1")}>
          <tr>
            <td>1 주차장</td>
            <td>민방위대피소</td>
            <td>청사관리사무소</td>
          </tr>
        </FloorInfoBoradItem>
        <FloorInfoBoradItem floorTitle="B2" onClick={() => navigateFloor("B2")}>
          <tr>
            <td>2 주차장</td>
          </tr>
        </FloorInfoBoradItem>
        <FloorInfoBoradItem floorTitle="B3" onClick={() => navigateFloor("B3")}>
          <tr>
            <td>3 주차장</td>
          </tr>
        </FloorInfoBoradItem>
      </div>
    </div>
  );
}
