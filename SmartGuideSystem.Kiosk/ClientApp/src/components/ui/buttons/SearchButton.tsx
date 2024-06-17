import React from "react";
import SearchIcon from "src/assets/icon-search.svg";
interface Props {
  placeholder?: string;
  onClick: () => void;
  className?: string;
}

export default function SearchButton({
  placeholder = "검색어를 입력하세요.",
  onClick,
  className = " ",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-black/50 flex flex-row justify-start rounded-[33px] text-white/90 font-bold text-[24px] px-[20px] items-center opacity-100 active:opacity-70`}
    >
      <img className="m-4" width={21} height={21} src={SearchIcon} alt="" />
      <span>{placeholder}</span>
    </button>
  );
}
