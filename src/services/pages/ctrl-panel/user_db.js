import { compare } from "bcryptjs";
import { Query } from "../../mysql.js";

export let handleLogin = async (email, passw) => {
  let user = await findUserByEmail(email);
  const isMatch = await compare(passw, user.passw);
  if (isMatch) {
    return isMatch;
  }
  return `The password that you've entered is incorrect`;
};
export let findUserByEmail = async (email) => {
  try {
    const rows = await Query("SELECT * FROM `users` WHERE `email` = ? ", email);
    return rows[0];
  } catch (error) {
    console.log(error);
    return false;
  }
};
export let findUserById = async (id) => {
  try {
    const rows = await Query("SELECT * FROM `users` WHERE `id` = ? ", id);
    return rows[0];
  } catch (error) {
    console.log(error);
    return false;
  }
};
export let comparePassword = (passw, userObject) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const isMatch = await compare(passw, userObject.passw);
      const isMatch = passw === userObject.passw;
      if (isMatch) {
        resolve(true);
      }else{
        resolve(`The password that you've entered is incorrect`);
      }
    } catch (e) {
      reject(e);
    }
  });
};

export let getUsers = async ()=>{
  try {
    const rows = await Query("SELECT * FROM `users`");
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export let updateUser = async (id,queryData)=>{
  try {
    console.log(id,queryData);
    const rows = await Query("UPDATE `users` SET ? WHERE id = ?",[queryData,id]);
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export let saveUser = async (queryData)=>{
  try {
    console.log(queryData);
    const rows = await Query("INSERT INTO `users` VALUES (0,?)",[queryData]);
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export let deleteUser = async (id)=>{
  try {
    console.log(id);
    const rows = await Query("DELETE FROM `users` WHERE id = ?",[id]);
    return rows;
  } catch (error) {
    console.log(error);
    return false;
  }
}

