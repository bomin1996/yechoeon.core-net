import { FC } from "react";

interface Props {
  activeColor: string;
  title: string;
  isChecked: boolean;
  onClick: () => void;
}

const CircleTitleButton: FC<Props> = ({
  activeColor = "#e1358a",
  title,
  isChecked,
  onClick,
}) => {
  const classText = isChecked
    ? `bg-[#e1358a] text-white`
    : "bg-black/50 text-white/50";

  return (
    <button
      onClick={() => onClick()}
      className={`min-w-[185px] px-[32px] py-[8px] font-bold text-[24px] active:text-[#e1358a]  rounded-full ${classText}`}
    >
      {title}
    </button>
  );
};

export default CircleTitleButton;
