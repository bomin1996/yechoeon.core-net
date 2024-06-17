import React, { PropsWithChildren } from "react";
import topShape from "src/assets/frame/top_shape.svg";
interface Props extends PropsWithChildren {
  title: string;
  className?: string;
}

export default function RightTitleLayout({
  children,
  title,
  className,
}: Props) {
  return (
    <div
      className={`${className} bg-left bg-no-repeat bg-cover bg-[url('assets/frame/white_right_title.webp')]`}>
      {children}
      <p className="absolute w-[527px]  top-[62px] right-[60px] font-[600] text-[40px] text-white text-center">
        {title}
      </p>
    </div>
  );
}

interface Props2 extends PropsWithChildren {
  title: string;
  className?: string;
}

export function BlackRightTitleLayout({ children, title, className }: Props2) {
  return (
    <div
      className={`${className} bg-no-repeat bg-center bg-contain bg-[url('assets/frame/right_title.png')]`}>
      {children}
      <p className="absolute w-[527px]  top-[40px] right-[70px] font-[600] text-[40px] text-white text-center">
        {title}
      </p>
    </div>
  );
}

export function RightTitleLayout2NoImage({
  children,
  title,
  className,
}: Props) {
  return (
    <div
      className={`relative w-full h-full bg-white max-2xl:rounded-[100px] 2xl:rounded-tr-[100px] ${className} `}>
      {/* <div
        className={`absolute right-[-1px] top-[-1px] top-text-center flex text-white h-[170px] rounded-tr-[100px] rounded-bl-[100px] text-[23px] font-[500] w-[528px] flex-col`}
      >
        <div className="bg-[#131834] h-[100px] w-full absolute right-0 top-0 rounded-tr-full rounded-bl-full"></div>
        <div className="absolute h-[50%] top-0 right-0 w-full flex">
          <span className="m-auto">{title}</span>
        </div>

        <img
          src={topShape}
          width={96}
          height={70}
          className="absolute right-0 top-[100px] "
        />
      </div> */}

      {children}

      <CurvedRightTitleLabel
        className="absolute right-[-1px] top-[-1px] text-white h-[170px] text-[40px] font-[500] w-[528px] "
        title={title}
      />
    </div>
  );
}

interface CurvedRightTitleLabelProps {
  className?: string;
  title?: string;
  // titleColor?: string;
  classNameForTitle?: string;
}

function CurvedRightTitleLabel({
  className,
  title,
  classNameForTitle,
}: // titleColor = "#131834",
CurvedRightTitleLabelProps) {
  return (
    <div className={`${className}  flex  pointer-events-none`}>
      {/* <div className="bg-[#131834] h-[100px] w-full absolute right-0 top-0 rounded-tr-full rounded-bl-full"></div>


      <svg
        width="97"
        height="71"
        viewBox="0 0 97 71"
        fill="none"
        className="absolute right-[0px] top-[100px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Vector"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 0C0 0 96.04 2.54001 96.04 70.49V0H0Z"
          fill="#131834"
        />
      </svg> */}

      {/* <svg
        viewBox="0 0 524 170"
        className="absolute w-full h-full left-0 bottom-0 right-[0px] top-[0px]"
        fill={titleColor}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="nonzero"
          clipRule="evenodd"
          d="M427 100C427 100 523.04 102.54 523.04 170V100H427Z"
          
        />
        <path
          d="M0 0H423C478.228 0 523 44.7715 523 100V100H100C44.7715 100 0 55.2285 0 0V0Z"
          
        />
      </svg> */}

      <svg
        viewBox="0 0 520 170"
        className="absolute fill-accent-title w-full h-full left-0 bottom-0 right-[0px] top-[0px]"
        xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_651_2)">
          <path
            fillRule="nonzero"
            clipRule="evenodd"
            d="M523.14 99.78C523.02 44.65 478.3 0 423.14 0H0C0 55.23 44.77 100 100 100H430.96C448.86 101.34 523.14 110.51 523.14 170.27V100V99.78Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_651_2">
            <rect width="523.14" height="170.27" />
          </clipPath>
        </defs>
      </svg>

      <div className="absolute h-[100px] top-0 right-0 w-full flex">
        <span className={`m-auto ${classNameForTitle}`}>{title}</span>
      </div>
    </div>
  );
}

function CurvedRightTitleLabel2({
  className,
  title,
  classNameForTitle,
}: // titleColor = "#131834",
CurvedRightTitleLabelProps) {
  return (
    <div className={`${className}  flex `}>
      {/* <svg
        viewBox="0 0 520 170"
        className="absolute fill-accent-title w-full h-full left-0 bottom-0 right-[0px] top-[0px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_651_2)">
          <path
            fillRule="nonzero"
            clipRule="evenodd"
            d="M523.14 99.78C523.02 44.65 478.3 0 423.14 0H0C0 55.23 44.77 100 100 100H430.96C448.86 101.34 523.14 110.51 523.14 170.27V100V99.78Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_651_2">
            <rect width="523.14" height="170.27" />
          </clipPath>
        </defs>
      </svg> */}

      <svg
        width="396"
        height="171"
        viewBox="0 0 396 171"
        className=" fill-accent-title "
        xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_651_4)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M395.06 99.78C394.94 44.65 350.22 0 295.06 0H0C0 55.23 44.77 100 100 100H302.89C320.79 101.34 395.07 110.51 395.07 170.27V100V99.78H395.06Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_651_4">
            <rect width="395.06" height="170.27" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <div className="absolute h-[100px] top-0 right-0 w-full flex">
        <span className={`m-auto ${classNameForTitle}`}>{title}</span>
      </div>
    </div>
  );
}

export function RightTitleLayout3NoImage({
  children,
  title,
  className,
}: Props) {
  return (
    <div
      className={`relative w-full h-full bg-white max-2xl:rounded-[100px] 2xl:rounded-tr-[100px] ${className} `}>
      {children}
      <CurvedRightTitleLabel2
        className="absolute  right-[-1px] top-[-1px] text-white h-[170px] text-[40px] font-[500] w-[395px] "
        title={title}
      />
    </div>
  );
}

export function RightTitleAdaptiveLayout({
  children,
  title,
  className,
}: Props) {
  return (
    <div
      className={`w-full h-full 
      2xl:pr-mainSecondRightSpacing 2xl:pb-horizontal-bottombar-height 2xl:pt-mainTopSpacing
       max-2xl:pt-vertical-topbar-height max-2xl:pb-vertical-bottombar-height  ${className}`}>
      <RightTitleLayout2NoImage className="w-full h-full" title={title}>
        {children}
      </RightTitleLayout2NoImage>
    </div>
  );
}

export function RightTitleLayoutSeatChartPos({
  children,
  title,
  className,
}: Props) {
  return (
    <div
      className={`relative w-full h-full bg-white max-2xl:rounded-[100px] 2xl:rounded-tr-[100px] ${className} `}>
      <div className="relative overflow-auto w-full h-full scrollbar">
        {children}
      </div>

      <CurvedRightTitleLabel3
        className="absolute right-[0px] top-[0px] text-white bg-[#FF3F5E] h-[100px] text-[40px] font-[600] w-[528px] "
        title={title}
      />
    </div>
  );
}

function CurvedRightTitleLabel3({
  className,
  title,
  classNameForTitle,
}: // titleColor = "#131834",
CurvedRightTitleLabelProps) {
  return (
    <div
      className={`${className} rounded-bl-[100px] rounded-tr-[100px] flex shadow-[0_4px_4px_4px_rgba(0,0,0,0.25)] `}>
      <span className={`m-auto ${classNameForTitle}`}>{title}</span>
    </div>
  );
}
