import QRCode from "qrcode";
export const QrCodeToBase64 = async (text) => {
  return await QRCode.toDataURL(text);
};

export const GetQRCode = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.json({ msg: "Error" });
  }
  const { text,name } = data;
  const qrImageString = await QrCodeToBase64(text);
  return res.json({
    src: qrImageString,
    imgEl: `<a href="${qrImageString}" target="_blank" download="${name}.png">
        <img src="${qrImageString}" style='width:150px;height:150px;' alt="">
    </a>`,
  });
};
