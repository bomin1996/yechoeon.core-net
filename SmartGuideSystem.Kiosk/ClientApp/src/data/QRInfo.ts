import 진주시청QR from "src/assets/qrcodes/진주시청.webp";
import 진주시의회QR from "src/assets/qrcodes/진주시의회.webp";
import 진주시소방서QR from "src/assets/qrcodes/진주시소방서.webp";
import 진주시경찰서QR from "src/assets/qrcodes/진주시경찰서.webp";

export const qrInfo = {
  title: "직속기관 및 사업소 QR코드",
  qrcodeItems: [
    {
      title: "진주시청",
      qrcode_url: 진주시청QR,
    },
    {
      title: "진주시의회",
      qrcode_url: 진주시의회QR,
    },
    {
      title: "진주시소방서",
      qrcode_url: 진주시소방서QR,
    },
    {
      title: "진주시경찰서",
      qrcode_url: 진주시경찰서QR,
    },
  ],
};
