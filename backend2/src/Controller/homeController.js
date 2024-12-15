import CRUDService from "../Service/CRUDService";

let handleGetAllTodo = async (req, res) => {
  try {
    let data = await CRUDService.getAllTodo();
    return res.status(200).json({
      errCode: 0,
      errMessage: "ok",
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error server",
    });
  }
};

let handleCreateNewTodo = async (req, res) => {
  try {
    let data = await CRUDService.createNewTodo(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error server",
    });
  }
};

let handleDeleteTodo = async (req, res) => {
  try {
    let data = await CRUDService.deleteTodo(req.body.id);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error server",
    });
  }
};

let handleUpdateTodo = async (req, res) => {
  try {
    let data = await CRUDService.updateTodo(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error server",
    });
  }
};
module.exports = {
  handleGetAllTodo,
  handleCreateNewTodo,
  handleDeleteTodo,
  handleUpdateTodo,
};
