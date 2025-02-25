import express from "express";
import {
  AdresRoutes
} from "./il_ilce.js";
import {
  CertQueryTuv
} from "./cert_query.js";
import {
  QrCodeArea
} from "./qrcodeapi.js";
let router = express.Router({ mergeParams: true });
export let apiRoutes = (app) => {
  AdresRoutes(router);
  CertQueryTuv(router);
  QrCodeArea(router);
  app.use("/api", router);
};
