import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
interface Props {
  items: Array<string>;
  selectedIdx?: number;
  className?: string;
  onSelectedItem?: (selectedItem: string, index: number) => void;
}

export default function SimpleComboBox({
  items,
  className,
  selectedIdx,
  onSelectedItem,
}: Props) {
  //const [selectedIndex, setSelectedIndex] = useState(selectedIdx ?? 0);
  const selectedIndex = selectedIdx ?? 0;
  const [isOpen, setIsOpen] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  useEscapeKey(() => {
    setIsOpen(false);
  });

  useOutsideClick(() => {
    setIsOpen(false);
  }, divRef);

  const handleItemClick = (item: string, index: number) => {
    //setSelectedIndex(index);
    setIsOpen(false);
    if (onSelectedItem !== undefined) {
      onSelectedItem(item, index);
    }
  };

  const currentItem = items[selectedIndex];

  return (
    <div
      ref={divRef}
      className={`relative  h-[30px] text-sm text-white font-bold ${className}`}>
      <button
        className="w-full h-full bg-[#231f20] flex items-center justify-between rounded-[5px]"
        onClick={() => setIsOpen(!isOpen)}>
        <span className="ml-3">{currentItem}</span>
        <ChevronUpIcon
          className={`h-4 w-4 ml-auto mr-2 stroke-white transition-all ${
            isOpen ? "rotate-180" : ""
          } `}
        />
      </button>
      {isOpen && (
        <ul
          className={`absolute z-50 select-none w-full rounded-xl  text-[#85827c] border-[#bebaae] border drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)] left-0 bottom-[-2px] translate-y-[100%] bg-[#e8e6da] transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}>
          {items.map((it, index) => (
            <li
              className={`flex m-2 px-2 h-[30px] rounded-[5px]  selection:bg-purple-500 items-center hover:bg-[#bebaae] ${
                index === selectedIndex
                  ? "bg-[#bebaae] text-[#221e1f] font-semibold"
                  : ""
              }`}
              onClick={() => handleItemClick(it, index)}
              key={index}>
              {it}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const KEY_NAME_ESC = "Escape";
const KEY_EVENT_TYPE = "keyup";

function useEscapeKey(handleClose: () => void) {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
}

const MOUSE_UP = "mouseup";

function useOutsideClick(
  handleClose: () => void,
  ref: React.RefObject<HTMLDivElement>
) {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (
        ref?.current?.contains &&
        !ref.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    },
    [handleClose, ref]
  );

  useEffect(() => {
    document.addEventListener(MOUSE_UP, handleClick);

    return () => {
      document.removeEventListener(MOUSE_UP, handleClick);
    };
  }, [handleClick]);
}

// export default function SimpleComboBox() {
//   return (
//     <div class="dropdown">
//       <button
//         class="btn btn-secondary dropdown-toggle"
//         type="button"
//         data-bs-toggle="dropdown"
//         aria-expanded="false"
//       >
//         Dropdown button
//       </button>
//       <ul class="dropdown-menu">
//         <li>
//           <a class="dropdown-item" href="#">
//             Action
//           </a>
//         </li>
//         <li>
//           <a class="dropdown-item" href="#">
//             Another action
//           </a>
//         </li>
//         <li>
//           <a class="dropdown-item" href="#">
//             Something else here
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// }
