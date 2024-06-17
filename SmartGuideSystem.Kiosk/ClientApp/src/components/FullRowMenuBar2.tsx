import { isHorizontalScreen } from "src/helpers/layoutHelper";
import DateAndTimeDayperiodLabel from "./DateAndTimeDayperiodLabel";
import WeatherAirBar2 from "./WeatherAirBar2";
import { useLocation, useNavigate } from "react-router-dom";
import useHorizontalScreen from "src/hooks/useHorizontalScreen";
import { KIOSK_VERSION } from "src/const";

export interface IFullRowMenuBarItem {
  title: string;
  key: string;
  icon: string;
  navigatePath: string;
  isIndexPath?: boolean;
}

interface Props {
  className?: string;
  currentPathName?: string;
  onDidSelect?: (key: string, index: number, title: string) => void;
  visibleDateTime?: boolean;
  visibleWeather?: boolean;
  visibleAir?: boolean;
  menuItems: Array<IFullRowMenuBarItem>;
  logoImage?: string;
}

export default function FullRowMenuBar2({
  className,
  onDidSelect,
  currentPathName,
  visibleDateTime = true,
  visibleWeather = true,
  visibleAir = true,
  menuItems,
  logoImage,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedIndex = menuItems.findIndex((mitem) => {
    if (mitem.isIndexPath !== undefined && mitem.isIndexPath === true) {
      return location.pathname === "/";
    } else {
      const path = mitem.navigatePath ?? "";
      const firstRoutePath = path.match(/\/\w+/)?.input ?? "";
      return new RegExp(firstRoutePath).test(location.pathname);
    }
  });

  const isHorizontal = useHorizontalScreen();

  return (
    <div
      className={`${className} h-[120px] px-[22px] flex flex-row max-2xl:justify-between justify-between items-center w-full `}>
      {visibleDateTime && isHorizontal && (
        <DateAndTimeDayperiodLabel className="mr-[0px] flex-shrink-0" />
      )}

      {menuItems.map((it, index) => (
        <MenuItem
          key={it.key}
          isSelected={selectedIndex === index}
          title={it.title}
          icon={it.icon}
          onClick={() => {
            if (it.navigatePath) {
              navigate(it.navigatePath);
            } else {
              onDidSelect?.(it.key, index, it.title);
            }
          }}
        />
      ))}

      {visibleWeather && isHorizontal && (
        <WeatherAirBar2 className="flex-shrink-0" />
      )}
      {logoImage && <img className=" h-[74px]" src={logoImage} />}

      <span className="absolute bottom-[2px] right-[2px] text-white/40 text-xs ">
        {KIOSK_VERSION}
      </span>
    </div>
  );
}

interface MenuItemProps {
  className?: string;
  title: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
}
function MenuItem({
  className,
  title,
  icon,
  onClick,
  isSelected = false,
}: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className={`${className} flex max-2xl:flex-col  2xl:flex-row justify-center items-center 
      hover:opacity-80 active:opacity-90 active:scale-95 text-[25px] max-2xl:space-y-[12px] 2xl:space-x-[12px] `}>
      <img src={icon} className=" w-[37px] h-[37px]" width={37} height={37} />
      <span
        className={` text-center w-full ${
          isSelected
            ? "underline-offset-4 text-center font-bold underline"
            : "font-medium "
        } leading-none whitespace-nowrap`}>
        {title}
      </span>
    </div>
  );
}
