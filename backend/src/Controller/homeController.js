import CRUDService from "../Service/CRUDService";

let handleGetAllUser = async (req, res) => {
  //   let id = req.query.id;
  let users = await CRUDService.getAllUser();
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllUser: handleGetAllUser,
  handleCreateNewUser: handleCreateNewUser,
};
