import express from "express";
import homeController from "../Controller/homeController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/api/all-todo", homeController.handleGetAllTodo);
  router.post("/api/create-new-todo", homeController.handleCreateNewTodo);
  router.delete("/api/delete-todo", homeController.handleDeleteTodo);
  router.put("/api/update-todo", homeController.handleUpdateTodo);

  return app.use("/", router);
};

module.exports = initWebRoutes;
