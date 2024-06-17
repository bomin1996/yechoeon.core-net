import { useEffect, useRef } from "react";
interface Props {
  titles: Array<string>;
  onSelect?: (title: string, index: number) => void;
  selectedIndex: number;
  className?: string;
  icon?: string;
}

export default function NoramlListBox({
  titles,
  selectedIndex,
  onSelect,
  className,
  icon,
}: Props) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const child = listRef.current.children[selectedIndex];
      if (child) {
        child.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    }
  }, [selectedIndex, titles]);

  return (
    <ul
      ref={listRef}
      className={` w-full select-none appearance-none selection:bg-yellow-400  overflow-y-scroll text-[#85827c] bg-[#e8e6da] text-sm border border-[#bebaae] focus:outline outline-none  ${className}`}
    >
      {titles &&
        titles.map((title, index) => (
          <li
            onClick={() => {
              if (onSelect) {
                onSelect(title, index);
              }
            }}
            className={`flex m-2 px-2 h-[30px] rounded-[5px] selection:bg-purple-500 items-center justify-start hover:bg-[#bebaae] ${
              index === selectedIndex
                ? "bg-[#bebaae] text-[#221e1f] font-semibold"
                : ""
            }`}
            key={index}
          >
            {icon && <img className="h-[18px] w-[18px] mr-2" src={icon} />}
            <span className="whitespace-nowrap ">{title}</span>
          </li>
        ))}
    </ul>
  );
}
