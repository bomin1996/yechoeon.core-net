import React, { memo } from "react";
import { QRCodeItemInfo, QRCodeListInfo } from "src/types/QRCodeListInfo";
interface Props {
  qrinfo: QRCodeListInfo;
  className?: string;
  onClickItem: (qrItem: QRCodeItemInfo) => void;
}
function QRCodeListBody({ className, qrinfo, onClickItem }: Props) {
  return (
    <div className={`flex flex-col items-center  ${className}`}>
      <p className="font-bold text-[24px] mb-[14px]">{qrinfo.title}</p>
      <div className="flex flex-row space-x-[20px]">
        {qrinfo.qrcodeItems.map((item, index) => (
          <QRCodeItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

function QRCodeItem({ item }: { item: QRCodeItemInfo }) {
  return (
    <div className="flex flex-col items-center ">
      <img
        className="p-[10px] box-content shadow bg-white  rounded-[10px] cursor-pointer"
        src={item.qrcode_url}
        width={100}
        height={100}
        alt="dummyQrCode"
      />
      <p className="text-[16px] font-bold leading-10">{item.title}</p>
    </div>
  );
}

const QRCodeList = memo(QRCodeListBody);
export default QRCodeList;
