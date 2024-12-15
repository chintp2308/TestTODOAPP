import CRUDService from "../Service/CRUDService";
let handleGetAllTodo = async (req, res) => {
  try {
    let data = await CRUDService.getAllTodo();
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleCreateNewTodo = async (req, res) => {
  try {
    let data = await CRUDService.CreateNewTodo(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleDeleteTodo = async (req, res) => {
  try {
    let data = await CRUDService.DeleteTodo(req.body.id);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleUpdateTodo = async (req, res) => {
  try {
    let data = await CRUDService.UpdateTodo(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  handleGetAllTodo,
  handleCreateNewTodo,
  handleDeleteTodo,
  handleUpdateTodo,
};
