import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { PropsWithChildren, useState } from "react";
interface Props extends PropsWithChildren {
  className?: string;
  barType: "Left" | "Right";
}

export default function AccordionPanelBar({
  children,
  className,
  barType,
}: Props) {
  const [isOpen, setIsOpen] = useState(true);

  if (barType === "Left") {
    return (
      <div className={`${className}  pr-[0px] relative`}>
        <div className={`${isOpen ? "w-full" : "w-0"} h-full overflow-hidden`}>
          {children}
        </div>
        <div
          onClick={() => setIsOpen((pv) => !pv)}
          className="absolute  w-[20px] h-[46px] right-[-20px] top-[50%] z-30 rounded-tr-[12px] rounded-br-[12px] translate-y-[-50%] shadow-md hover:bg-[#e8e6da]/80  bg-[#e8e6da] flex"
        >
          {isOpen ? (
            <ChevronLeftIcon className="h-4 w-4 m-auto" />
          ) : (
            <ChevronRightIcon className="h-4 w-4 m-auto" />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className={`${className}  pr-[0px] relative`}>
        <div className={`${isOpen ? "w-full" : "w-0"} h-full  overflow-hidden`}>
          {children}
        </div>
        <div
          onClick={() => setIsOpen((pv) => !pv)}
          className="absolute  w-[20px] h-[46px] left-[-20px] top-[50%] z-30 rounded-tl-[12px] rounded-bl-[12px] translate-y-[-50%] shadow-md hover:bg-[#e8e6da]/80 bg-[#e8e6da] flex"
        >
          {isOpen ? (
            <ChevronRightIcon className="h-4 w-4 m-auto" />
          ) : (
            <ChevronLeftIcon className="h-4 w-4 m-auto" />
          )}
        </div>
      </div>
    );
  }
}
