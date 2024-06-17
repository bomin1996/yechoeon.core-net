import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title?: string;
  className?: string;
  onClick: () => void;
}
export default function SecondaryNormalButton({
  title,
  className,
  onClick,
  children,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex round_primary active:outline-none active:scale-95 focus:outline-none  active:selected ${className}`}
    >
      {children && <div className="m-auto">{children}</div>}
      {title && <span className="m-auto">{title}</span>}
    </button>
  );
}
