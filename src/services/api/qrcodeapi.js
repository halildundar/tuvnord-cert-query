import QRCode from "qrcode";

export let QrCodeArea = (router) => {
  router.get("/qr", GetQR);
};

const GetQR = async (req, res) => {
  const { url } = req.query;
  const code = await QRCode.toDataURL(url);
  res.render('pages/home',{layout:"qrcode",imgData:code})
};
