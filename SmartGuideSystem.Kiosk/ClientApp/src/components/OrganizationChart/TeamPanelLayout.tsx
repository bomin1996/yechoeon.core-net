import { ISGTeam } from "@shares/*";
import { useEffect, useState } from "react";
import { Virtual, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/virtual";
import "swiper/css/effect-coverflow";
import TeamPanel from "./TeamPanel";
import { getSizeStyle } from "./Profile/util";

export default function TeamPanelLayout({
  teams,
  selectedPageIndex,
  onSelectedPage,
  pageCount,
  className,
}: {
  selectedPageIndex: number;
  teams: ISGTeam[];
  onSelectedPage: (pageIndex: number) => void;
  pageCount: number;
  className?: string;
}) {
  const [swiper, setSw] = useState<any>();

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(selectedPageIndex);
    }
  }, [selectedPageIndex]);

  // console.log("render Teams Layout2:", JSON.stringify(teams));
  // let spaceBetween = pageCount > 3 ? 30 : 60;

  const spaceBetweens = [0, 0, 20, 40, 0, 30, 0];
  const spaceBetween = spaceBetweens[(pageCount - 1) % spaceBetweens.length];

  // let spaceBetween = 0;

  const sizeStyle = getSizeStyle(teams.length);

  return (
    <div
      className={`${className} px-[16px] flex justify-center bg-blue-400 overflow-auto scrollbar`}
    >
      <Swiper
        // className="w-full mt-[50px] ml-auto mr-auto"
        // effect={"coverflow"}
        // coverflowEffect={{
        //   rotate: 0,
        //   stretch: 10,
        //   depth: 500,
        //   modifier: 1,
        //   slideShadows: true,
        // }}
        className=" mt-[30px] bg-purple-500 items-center"
        direction="horizontal"
        // spaceBetween={60}
        // spaceBetween={0}
        spaceBetween={spaceBetween}
        grabCursor={true}
        initialSlide={selectedPageIndex}
        slidesPerView={pageCount}
        onSlideChange={(swp) => {
          console.log("slide change");
          onSelectedPage(swp.activeIndex);
        }}
        modules={[Virtual, EffectCoverflow]}
        onSwiper={(swiper) => setSw(swiper)}
        pagination={true}
      >
        {teams.map((team, index) => (
          <SwiperSlide key={index} virtualIndex={index}>
            <TeamPanel team={team} sizeStyle={sizeStyle} teamIndex={index} />
            {/* {pageCount > 3 ? (
            <TeamPanel2 team={team} />
          ) : (
            <TeamPanel team={team} />
          )} */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export function NoSwipeTeamPanelLayout({
  teams,
  pageCount,
  className,
}: {
  teams: ISGTeam[];
  pageCount: number;
  className?: string;
}) {
  const sizeStyle = getSizeStyle(teams.length);

  return (
    <div
      className={`${className} px-[16px] pt-[20px] flex justify-evenly scrollbar overflow-auto`}
    >
      {teams.map((team, index) => (
        <TeamPanel
          key={index}
          team={team}
          sizeStyle={sizeStyle}
          teamIndex={index}
        />
      ))}
    </div>
  );
}
