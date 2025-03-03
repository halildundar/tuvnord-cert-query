import express from "express";
import { HomePage } from "./pages/home.js";
import { CertQueryPage } from "./pages/cert-qeury.js";
import { CtrlPanelRoutes } from "./pages/ctrl-panel/main.js";

let router = express.Router({ mergeParams: true });
import { SslStatus } from "./ssl.js";
import {initPassportLocal} from './pages/ctrl-panel/passportCtrl.js';
initPassportLocal();
export let appRoutes = (app) => {
  router.get("/", HomePage);
  router.get("/cert-query", CertQueryPage);
  router.get(
    "/.well-known/pki-validation/8EF0E148BC848A44E6EAFE8F9FADF56F.txt",
    SslStatus
  );
  CtrlPanelRoutes("/ctrl-panel", router);
  return app.use("/", router);
};
