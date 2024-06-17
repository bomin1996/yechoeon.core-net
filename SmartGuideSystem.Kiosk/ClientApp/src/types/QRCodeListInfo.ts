export type QRCodeListInfo = {
    title:string;
    qrcodeItems: QRCodeItemInfo[];
}

export type QRCodeItemInfo = {
    title:string;
    qrcode_url:string;
}