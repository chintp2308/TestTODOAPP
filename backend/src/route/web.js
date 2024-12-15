import express from "express";
import homeController from "../Controller/homeController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/api/get-all-users", homeController.handleGetAllUser);
  router.post("api/create-new-user", homeController.handleCreateNewUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
