import db from "../models/index";

let getAllUser = (todoId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.create({
        Title: data.Title,
        Description: data.Description,
      });

      resolve({
        errCode: 0,
        errMessage: "ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllUser: getAllUser,
  createNewUser: createNewUser,
};
