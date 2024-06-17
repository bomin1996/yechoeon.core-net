import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  title?:string;
}

const NewMenuButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function MenuButton({ className,title = "새로만들기", ...props }: ButtonProps, ref) {
    return (
      <button
        ref={ref}
        {...props}
        className={`${className} items-center flex justify-center text-[#FFB800] hover:text-[#FFB800]/90 disabled:text-[#FFB800]/50 font-[600]`}
      ></button>
    );
  }
);

const EditMenuButton = forwardRef<HTMLButtonElement, ButtonProps>(
    function MenuButton({ className, title = "수정",...props }: ButtonProps, ref) {
      return (
        <button
          ref={ref}
          {...props}
          className={`${className} items-center flex justify-center text-[#FFB800] hover:text-[#FFB800]/90 disabled:text-[#FFB800]/50 font-[600]`}
        ></button>
      );
    }
  );

  const DeleteTrashMenuButton = forwardRef<HTMLButtonElement, ButtonProps>(
    function MenuButton({ className, title = "삭제",...props }: ButtonProps, ref) {
      return (
        <button
          ref={ref}
          {...props}
          className={`${className} items-center flex justify-center text-[#FFB800] hover:text-[#FFB800]/90 disabled:text-[#FFB800]/50 font-[600]`}
        ></button>
      );
    }
  );

  const DeleteXMenuButton = forwardRef<HTMLButtonElement, ButtonProps>(
    function MenuButton({ className, title = "삭제",...props }: ButtonProps, ref) {
      return (
        <button
          ref={ref}
          {...props}
          className={`${className} items-center flex justify-center text-[#FFB800] hover:text-[#FFB800]/90 disabled:text-[#FFB800]/50 font-[600]`}
        ></button>
      );
    }
  );


export {NewMenuButton, EditMenuButton, DeleteTrashMenuButton, DeleteXMenuButton}