import React, { FC, ComponentType, useState, useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import PrimaryToggleButton from "../buttons/PrimaryToggleButton";
import PrimaryNormalButton from "../buttons/PrimaryNormalButton";
import closeBtnImage from "src/assets/button/modal_close.svg";
import DialogContext from "src/contexts/DialogContext";

interface Props extends Object {
  onClose: () => void;
}

function withModal<T extends object>(
  Component: ComponentType<T>
): FC<T & Props> {
  return function HOC({ onClose, ...props }: Props) {
    return (
      <div
        onClick={() => {
          if (onClose) {
            onClose();
          }
        }}
        className="bg-black/60 fixed h-screen w-screen flex z-[300] left-0 top-0"
      >
        <div className="m-auto">
          <Component {...(props as T)} />
        </div>
      </div>
    );
  };
}

export default withModal;

interface Props2 extends Object {
  className?: string;
  onClose: () => void;
}

export function withModalOnParent<T extends object>(
  Component: ComponentType<T>
): FC<T & Props2> {
  return function HOC({
    onClose,
    className = "bg-black/50 left-0 top-0",
    ...props
  }: Props2) {
    return (
      <div
        onClick={() => {
          if (onClose) {
            onClose();
          }
        }}
        className={`${className} fixed h-screen w-screen flex z-[300]`}
      >
        <Component {...(props as T)} />
      </div>
    );
  };
}

interface Props3 extends Object {
  className?: string;
  onClose: () => void;
  onHome?: () => void;
}
export function withModalByCloseButton<T extends object>(
  Component: ComponentType<T>
): FC<T & Props3> {
  return function HOC({
    onClose,
    onHome,
    className = "bg-black/50 left-0 top-0",
    ...props
  }: Props3) {
    return (
      <div
        onMouseUp={() => {
          if (onClose) {
            onClose();
          }
        }}
        className={` fixed h-screen w-screen flex z-50 pb-[150px] ${className}`}
      >
        <Component {...(props as T)} />

        <div
          onMouseUp={(ev) => ev.stopPropagation()}
          className="absolute right-[20px] bottom-[20px] flex flex-row sapce-x-[10px]"
        >
          <PrimaryNormalButton
            className="w-[208px] h-[66px] text-[24px]"
            title="홈"
            onClick={() => {
              if (onHome) {
                onHome();
              }
            }}
          />
          <PrimaryNormalButton
            className="w-[208px] h-[66px] text-[24px] ml-[10px]"
            title="닫기"
            onClick={() => {
              if (onClose) {
                onClose();
              }
            }}
          />
        </div>
      </div>
    );
  };
}

export function withFullScreenModalByCloseButton<T extends object>(
  Component: ComponentType<T>
): FC<T & Props3> {
  return function HOC({
    onClose,
    onHome,
    className = "bg-black/50 left-0 top-0",
    ...props
  }: Props3) {
    return (
      <div
        className={`fixed h-screen w-screen flex z-50 pb-[150px] ${className}`}
      >
        <Component {...(props as T)} />
        <div className="absolute  z-50 right-[20px] bottom-[20px] flex flex-row space-x-[10px]">
          <PrimaryNormalButton
            className="w-[208px] h-[66px] text-[24px]"
            title="홈"
            onClick={() => {
              if (onHome) {
                onHome();
              }
            }}
          />
          <PrimaryNormalButton
            className="w-[208px] h-[66px] text-[24px]"
            title="닫기"
            onClick={() => {
              // console.log("---> close");
              if (onClose) {
                onClose();
              }
            }}
          />
        </div>
      </div>
    );
  };
}

export function withModal2<T extends object>(
  Component: ComponentType<T>
): FC<T & Props3> {
  return function HOC({
    onClose,
    onHome,
    className = "bg-black/50 left-0 top-0",
    ...props
  }: Props3) {
    return (
      <div
        className={`fixed h-screen w-screen flex z-50 pb-[150px] ${className}`}
      >
        <Component {...(props as T)} />
      </div>
    );
  };
}

export function withModal3<T extends object>(
  Component: ComponentType<T>
): FC<T & Props3> {
  return function HOC({
    onClose,
    onHome,
    className = "bg-black/50 left-0 top-0",
    ...props
  }: Props3) {
    return (
      <div
        className={`fixed h-screen w-screen flex z-50 pb-[150px] ${className}`}
      >
        <Component {...(props as T)} />
        <img
          className="absolute hover:opacity-70 active:scale-95 left-[50%] translate-x-[-50%] bottom-[85px] z-50 h-[74px] "
          src={closeBtnImage}
          onClick={() => {
            onClose?.();
          }}
          width={74}
          height={74}
        />
      </div>
    );
  };
}

export function withModal4<T extends object>(
  Component: ComponentType<T>
): FC<T & Props3> {
  return function HOC({
    onClose,
    className = "bg-black/50 left-0 top-0",
    ...props
  }: Props3) {
    return (
      <div
        className={`fixed h-screen w-screen flex z-50 pb-[150px] ${className}`}
      >
        <div className="relative">
          <Component {...(props as T)} />
          <img
            className="absolute hover:opacity-70 active:scale-95 left-[50%] translate-x-[-50%] bottom-[0px] translate-y-[50%] z-50 h-[74px] "
            src={closeBtnImage}
            onClick={() => {
              onClose?.();
            }}
            width={74}
            height={74}
          />
        </div>
      </div>
    );
  };
}

export function withFullModalWithCloseButton<T extends object>(
  Component: ComponentType<T>
): FC<T & Props3> {
  return function HOC({ onClose, className = "pb-[120px]", ...props }: Props3) {
    return (
      <div
        // className={`fixed h-screen w-screen flex z-50 bg-[#18211F]/95 left-0 top-0 ${className}`}
        className={`fixed h-screen w-screen bg-black/50 flex z-50 left-0 top-0 ${className}`}
      >
        <div className="relative w-full h-full bg-no-repeat bg-cover bg-center ">
          <Component {...(props as T)} />
          <img
            className="absolute hover:opacity-70 active:scale-95 left-[50%] translate-x-[-50%] bottom-[0px] translate-y-[50%] z-50 h-[74px] "
            src={closeBtnImage}
            onClick={() => {
              onClose?.();
            }}
            width={74}
            height={74}
          />
        </div>
      </div>
    );
  };
}
