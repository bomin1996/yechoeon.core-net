import React from "react";
import titleLogImage from "src/assets/logo/city_council_text.png";

import qrImage_경찰서 from "src/assets/qrcodes/진주시경찰서.webp";
import qrImage_소방서 from "src/assets/qrcodes/진주시소방서.webp";
import qrImage_시의회 from "src/assets/qrcodes/진주시의회.webp";
import qrImage_시청 from "src/assets/qrcodes/진주시청.webp";
interface Props {
  className?: string;
}

export default function TitleAndQRPanel({ className }: Props) {
  return (
    <div className={`${className} flex flex-col items-center justify-center`}>
      <img src={titleLogImage} height={155} className="h-[155px]" />

      <div className="mt-[113px] grid grid-cols-3 gap-y-[50px] gap-x-[35px]">
        <QRItem
          className="col-start-2 "
          className2="w-[150px] h-[150px]"
          title="진주시의회"
          src={qrImage_시의회}
        />
        <QRItem className="row-start-2" title="진주시청" src={qrImage_시청} />
        <QRItem
          className="row-start-2"
          title="진주소방서"
          src={qrImage_소방서}
        />
        <QRItem
          className="row-start-2"
          title="진주경찰서"
          src={qrImage_경찰서}
        />
      </div>
    </div>
  );
}

function QRItem({
  className,
  className2 = "w-[100px] h-[100px]",
  title,
  src,
}: {
  className?: string;
  className2?: string;
  title: string;
  src: string;
}) {
  return (
    <div
      className={`${className} text-white text=[20px] font-[500] leading-[24px] flex flex-col items-center `}>
      <div className={`flex ${className2}  bg-white rounded-[20px] p-2`}>
        <img className="m-auto" src={src} />
      </div>
      <p className="mt-[6px]">{title}</p>
    </div>
  );
}
