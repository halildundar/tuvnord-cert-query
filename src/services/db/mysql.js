import mysql from "mysql";
import { config } from "dotenv";
config({ path: ["const.env"] });

let dbConfig = {
  connectionLimit: 10, // default 10
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  connectionLimit: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};
export const pool = mysql.createPool(dbConfig);
export const Connection = () => {
  return new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    if (err) reject(err);
    console.log("MySQL pool connected: threadId " + connection.threadId);
    const query = (sql, binding) => {
      return new Promise((resolve, reject) => {
         connection.query(sql, binding, (err, result) => {
           if (err) reject(err);
           resolve(result);
           });
         });
       };
       const release = () => {
         return new Promise((resolve, reject) => {
           if (err) reject(err);
           console.log("MySQL pool released: threadId " + connection.threadId);
           resolve(connection.release());
         });
       };
       resolve({ query, release });
     });
   });
 };
export const Query = (sql, binding) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, binding, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

let dbConfigGenel = {
  connectionLimit: 10, // default 10
  host: process.env.MYSQL_GeneralDB_HOST,
  user: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_GeneralDB_NAME,
  connectionLimit: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};
export const poolGeneral = mysql.createPool(dbConfigGenel);
export const ConnectionGeneral = () => {
  return new Promise((resolve, reject) => {
    poolGeneral.getConnection((err, connection) => {
    if (err) reject(err);
    console.log("MySQL pool connected: threadId " + connection.threadId);
    const query = (sql, binding) => {
      return new Promise((resolve, reject) => {
         connection.query(sql, binding, (err, result) => {
           if (err) reject(err);
           resolve(result);
           });
         });
       };
       const release = () => {
         return new Promise((resolve, reject) => {
           if (err) reject(err);
           console.log("MySQL pool released: threadId " + connection.threadId);
           resolve(connection.release());
         });
       };
       resolve({ query, release });
     });
   });
 };
export const QueryGeneral = (sql, binding) => {
  return new Promise((resolve, reject) => {
    poolGeneral.query(sql, binding, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};