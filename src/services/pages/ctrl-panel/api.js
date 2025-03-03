import { getUsers, updateUser, deleteUser, saveUser } from "./user_db.js";
import { getCerts, updateCert, saveCert, deleteCert,getCertByNo,getCertByCertId } from "./certquery_db.js";
// USERS
export const GetUsers = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.json({ msg: "Error" });
  }
  const users = await getUsers();
  return res.json({ users: users });
};
export const UpdateUser = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.json({ msg: "Error" });
  }
  const { id, queryData } = data;
  await updateUser(id, queryData);
  return res.json({ msg: "Ok" });
};
export const SaveUser = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.json({ msg: "Error" });
  }
  const { queryData } = data;
  await saveUser(queryData);
  return res.json({ msg: "Ok" });
};
export const DeleteUser = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.json({ msg: "Error" });
  }
  const { id } = data;
  await deleteUser(id);
  return res.json({ msg: "Ok" });
};

// Sertifikalar
export const GetCerts = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.json({ msg: "Error" });
  }
  const certs = await getCerts();
  return res.json({ certs: certs });
};
export const UpdateCert = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.json({ msg: "Error" });
  }
  const { id, queryData } = data;
  await updateCert(id, queryData);
  return res.json({ msg: "Ok" });
};
export const SaveCert = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.json({ msg: "Error" });
  }
  const { queryData } = data;
  await saveCert(queryData);
  return res.json({ msg: "Ok" });
};
export const DeleteCert = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.json({ msg: "Error" });
  }
  const { id } = data;
  await deleteCert(id);
  return res.json({ msg: "Ok" });
};


//Site Sertifika sorgu
export const GetCertFromNoORId = async (req, res) => {
  // const sql = `Select * from iller`;
  const data = req.body;
  if (!data) {
    return res.status(404).json({
      err: "Error!",
    });
  }
  const { cert_no,cert_id } = data;
  let certificate;
  if(!!cert_no){
    certificate = await getCertByNo(cert_no);
  }else if(!!cert_id){
    certificate = await getCertByCertId(cert_id);
  }
  if (!!certificate && certificate.length > 0) {
    return res.json({
      msg: "Finded",
      ...certificate[0],
    });
  }
  res.json({
    msg: "Not Founded",
  });
};
