import express from "express";
import {HomePage} from './pages/home.js';
import { apiRoutes } from "./api/api.js";
let router = express.Router({ mergeParams: true });
// import { SslStatus } from "./ssl.js";

export let appRoutes = (app) => {
  router.get("/", HomePage);
  apiRoutes(app);

  return app.use("/", router);
};
