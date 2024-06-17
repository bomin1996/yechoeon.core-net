import React, { useEffect, useState } from "react";

interface Props {
  className?: string;
}
export default function AirMenuLabel({ className }: Props) {
  return (
    <div className={`flex items-center text-[16px] font-normal ${className} `}>
      <Label title="미세먼지" status="좋음" />
      <Label className="ml-[33px]" title="초미세먼지" status="보통" />
    </div>
  );
}

interface LabelProps {
  title: string;
  status: string;
  className?: string;
}

function Label({ title, status, className }: LabelProps) {
  return (
    <div className={`${className} flex flex-row items-center`}>
      <span className="mr-[20px]">{title}</span>
      {/* <img className="ml-[17px]" src={iconForStatus(status)} alt="" /> */}
      {IconForStatus(status)}
      <span className="ml-[14px]">{status}</span>
    </div>
  );
}

function IconForStatus(status: string) {
  switch (status) {
    case "좋음":
      return (
        <div className="w-[10px] h-[10px] bg-[#1A7CC8] rounded-full outline outline-[3px] outline-white"></div>
      );
    case "보통":
      return (
        <div className="w-[10px] h-[10px] bg-[#37C81A] rounded-full outline outline-[3px] outline-white"></div>
      );
    case "나쁨":
      return (
        <div className="w-[10px] h-[10px] bg-[#E07900] rounded-full outline outline-[3px] outline-white"></div>
      );
    case "아주나쁨":
      return (
        <div className="w-[10px] h-[10px] bg-[#E83810] rounded-full outline outline-[3px] outline-white"></div>
      );
  }

  return (
    <div className="w-[10px] h-[10px] bg-[#37C81A] rounded-full outline outline-[3px] outline-white"></div>
  );
}
