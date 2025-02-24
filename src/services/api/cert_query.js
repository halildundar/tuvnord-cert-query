// import { QueryGeneral } from "../mysql.js";
const certificates = [
  {
    id: "0",
    trade_name: "ÖZATEŞ ASANSÖR DOĞALGAZ GAZ TİC. VE SAN. LTD. ŞTİ.",
    legislation: "2014/33/EU Lifts Directive",
    product_range: "Lifts",
    module: "EU-Type Examınatıon For Lıfts And Safety Components For Lıfts",
    status: "Active",
    standarts: "EN81-20:2020,EN81-50:2020",
    product_features: "Class-I 2:1",
    effective_start_date: "16/12/2021",
    expiration_date: "16/12/2026",
    release_date: "16/12/2021",
    registration_deadline: "16/12/2021",
    cert_no: "LF/A-C-2656/21",
    cert_id: "tvnrd-0233-23927-2355",
  },
  {
    id: "1",
    trade_name: "Bor Asansor-Fatih Kirazci ve Ortagi Ferdi Ozdogan",
    legislation: "2014/33/EU Lifts Directive",
    product_range: "Lifts",
    module: "Unit Verification-Annex VIII-Module G",
    status: "Active",
    standarts: "EN81-20:2020,EN81-50:2020",
    product_features: "Class-I Electric",
    effective_start_date: "01/02/2025",
    expiration_date: "-",
    release_date: "01/02/2025",
    registration_deadline: "01/02/2025",
    cert_no: "357.22722/357.22722/UF-VIII/2025",
    cert_id: "tvnrd-0233-23927-243",
  },
  {
    id: "2",
    trade_name: "ASMAKER ASANSOR TICARET VE SANAYI LIMITED SIRKETI",
    legislation: "2014/33/EU Lifts Directive",
    product_range: "Lifts",
    module: "Unit Verification-Annex VIII-Module G",
    status: "Active",
    standarts: "EN81-20:2020,EN81-50:2020",
    product_features: "Class-I Electric",
    effective_start_date: "08/02/2025",
    expiration_date: "-",
    release_date: "08/02/2025",
    registration_deadline: "08/02/2025",
    cert_no: "357.22731/357.22731/UF-VIII/2025",
    cert_id: "tvnrd-0233-23927-243",
  },
  {
    id: "3",
    trade_name: "ASMAKER ASANSOR TICARET VE SANAYI LIMITED SIRKETI",
    legislation: "2014/33/EU Lifts Directive",
    product_range: "Lifts",
    module: "Unit Verification-Annex VIII-Module G",
    status: "Active",
    standarts: "EN81-20:2020,EN81-50:2020",
    product_features: "Class-I Electric",
    effective_start_date: "08/02/2025",
    expiration_date: "-",
    release_date: "08/02/2025",
    registration_deadline: "08/02/2025",
    cert_no: "357.22730/357.22730/UF-VIII/2025",
    cert_id: "tvnrd-0233-23927-243",
  },
];

export let CertQueryTuv = (router) => {
  router.post("/cq", GetCert);
};

const GetCert = async (req, res) => {
  // const sql = `Select * from iller`;
  const data = req.body;
  if (!data) {
    return res.status(404).json({
      err: "Error!",
    });
  }
  console.log(data);
  const { legislation, cert_no } = data;
  const findedEl = certificates.filter((item) => {
    return item.legislation.includes(legislation) && item.cert_no === cert_no;
  });
  if (!!findedEl && findedEl.length > 0) {
    return res.json({
      msg: "Finded",
      ...findedEl[0]
    });
  }
  res.json({
    msg: "Not Founded",
  });
};
