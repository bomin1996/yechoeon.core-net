import React from "react";

interface Props {
  title: string;
  className?: string;
  onClick: () => void;
}
export default function PrimaryNormalButton({
  title,
  className,
  onClick,
}: Props) {
  return (
    <button onClick={onClick} className={`round_primary active:outline-none active:scale-95 focus:outline-none selected ${className}`}>
      {title}
    </button>
  );
}
