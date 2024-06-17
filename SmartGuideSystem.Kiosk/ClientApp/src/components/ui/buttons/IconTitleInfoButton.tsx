import iconInformation from "src/assets/icon/search/상세정보아이콘.svg";
import iconLocationMap from "src/assets/icon/search/위치안내아이콘.svg";
import iconOrganizationChart from "src/assets/icon/search/조직도아이콘.svg";
import iconGetDirections from "src/assets/icon/search/길찾기.svg";

type IconStyle =
  | "information"
  | "location_map"
  | "organization_chart"
  | "GetDirections";

interface Props {
  title: string;
  className?: string;
  titleClassName?: string;
  icon: IconStyle;
  onClick?: () => void;
}

export default function IconTitleInfoButton({
  title,
  className,
  titleClassName,
  icon,
  onClick,
}: Props) {
  let iconImg = iconInformation;

  switch (icon) {
    case "information":
      iconImg = iconInformation;
      break;
    case "location_map":
      iconImg = iconLocationMap;
      break;
    case "organization_chart":
      iconImg = iconOrganizationChart;
      break;
    case "GetDirections":
      iconImg = iconGetDirections;
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`flex flex-col justify-center items-center space-y-[5px] active:opacity-75 bg-[#f3f3f3] rounded-[20px] w-[65px] h-[65px] ${className}  `}
    >
      <img width={20} height={20} src={iconImg} alt="" />
      <p className={`text-[13px] ${titleClassName}`}>{title}</p>
    </button>
  );
}
