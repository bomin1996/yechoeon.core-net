import { FC, ComponentType } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props extends Object {
  onClose: () => void;
  isOpen: boolean;
  outsideClose?: boolean;
}

function withModal<T extends object>(
  Component: ComponentType<T>
): FC<T & Props> {
  return function HOC({ onClose, outsideClose, isOpen, ...props }: Props) {
    if (!isOpen) {
      return null;
    }

    return (
      <div
        onClick={() => {
          if (onClose && outsideClose) {
            onClose();
          }
        }}
        className="bg-black/30 fixed h-screen w-screen flex z-[10] left-0 top-0"
      >
        <div className="fixed h-screen w-screen    z-auto "></div>

        <div
          className="m-auto z-0"
          onClick={(ev) => {
            ev.stopPropagation();
          }}
        >
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
        className={`${className} fixed h-screen w-screen flex z-[20]`}
      >
        <Component {...(props as T)} />
      </div>
    );
  };
}

export function withModalByCloseButton<T extends object>(
  Component: ComponentType<T>
): FC<T & Props2> {
  return function HOC({
    onClose,
    className = "bg-black/50 left-0 top-0",
    ...props
  }: Props2) {
    return (
      <div
        className={` fixed h-screen w-screen flex z-50 pb-[150px] ${className}`}
      >
        <Component {...(props as T)} />
        <XMarkIcon
          className="w-[114px] h-[114px] bg-[#e1358a] fill-white stroke-white p-7 rounded-full absolute right-[20px] bottom-[20px]"
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
        />
      </div>
    );
  };
}
