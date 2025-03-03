import express from "express";
import {
  AdresRoutes
} from "./il_ilce.js";

let router = express.Router({ mergeParams: true });
export let apiRoutes = (app) => {
  AdresRoutes(router);
  app.use("/api", router);
};
