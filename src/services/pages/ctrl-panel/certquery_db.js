import { Query } from "../../mysql.js";
import { QrCodeToBase64 } from "./qr.js";
import cryptojs from "crypto-js";
export let getCerts = async () => {
  try {
    const rows = await Query("SELECT * FROM `certs`");
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export let updateCert = async (id, queryData) => {
  try {
    // console.log(cryptojs.MD5(queryData.cert_no));
    const hashDigest = cryptojs.enc.Hex.stringify(
      cryptojs.MD5(queryData.cert_no + "tüvartdoksan")
    );
    queryData = { ...queryData, cert_id: hashDigest };
    const rows = await Query("UPDATE `certs` SET ? WHERE id = ?", [
      queryData,
      id,
    ]);
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export let saveCert = async (queryData) => {
  try {
    const hashDigest = cryptojs.enc.Hex.stringify(
      cryptojs.MD5(queryData.cert_no + "tüvartdoksan")
    );
    queryData = [...queryData, hashDigest];
    const rows = await Query("INSERT INTO `certs` VALUES (0,?)", [queryData]);
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export let deleteCert = async (id) => {
  try {
    console.log(id);
    const rows = await Query("DELETE FROM `certs` WHERE id = ?", [id]);
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export let getCertByNo = async (cert_no) => {
  try {
    const rows = await Query("SELECT * FROM `certs` where cert_no= ?",[cert_no]);
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export let getCertByCertId = async (cert_id) => {
  try {
    const rows = await Query("SELECT * FROM `certs` where cert_id= ?",[cert_id]);
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
};

