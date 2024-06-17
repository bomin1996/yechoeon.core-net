import {
    FC,
  } from "react";
  
  interface Props {
    activeColor: string;
    title: string;
    isChecked: boolean;
    onClick: () => void;
  }

  const RoundedOutlineButton: FC<Props> = ({
    activeColor = '#e1358a',
    title,
    isChecked,
    onClick,
  }) => {

    const classText = isChecked ? `border-[#e1358a] text-[#e1358a]` : 'border-white/30 text-white/50';

    return (
        <button onClick={()=>onClick()} 
            className={`min-w-[185px] px-[32px] py-[8px] font-bold text-[24px] active:text-[#e1358a] active:border-[#e1358a] border-[2px] rounded-[11px] ${classText}`}
            >
            {title}
        </button>
    );
  }

  export default RoundedOutlineButton;
   