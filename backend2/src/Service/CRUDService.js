import db from "../models/index";

let getAllTodo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewTodo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data || !data.Title || !data.Description) {
        resolve({
          errCode: 1,
          errMessage: "Missing require parameter",
        });
      } else {
        let title = await checkValidateTitle(data.Title);
        if (title === false) {
          await db.User.create({
            Title: data.Title,
            Description: data.Description,
          });
          resolve({
            errCode: 0,
            errMessage: "create Todo succeed!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Todo already Exist",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteTodo = (TodoId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!TodoId) {
        resolve({
          errCode: 1,
          errMessage: "Missing require parameter",
        });
      } else {
        let todo = await db.User.findOne({
          where: { id: TodoId },
        });
        if (!todo) {
          resolve({
            errCode: 2,
            errMessage: "TodoId is not exist",
          });
        } else {
          await db.User.destroy({
            where: { id: TodoId },
          });
          resolve({
            errCode: 0,
            errMessage: "delete succeed!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateTodo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data || !data.Title || !data.Description) {
        resolve({
          errCode: 1,
          errMessage: " Missing require parameter",
        });
      } else {
        let todo = await db.User.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (!todo) {
          resolve({
            errCode: 2,
            errMessage: "Title is not exist",
          });
        } else {
          (todo.Title = data.Title),
            (todo.Description = data.Description),
            await todo.save();
          resolve({
            errCode: 0,
            errMessage: "Update Todo succeed!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkValidateTitle = (titleTodo) => {
  return new Promise(async (resolve, reject) => {
    try {
      let todo = await db.User.findOne({
        where: { Title: titleTodo },
      });

      if (todo) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllTodo: getAllTodo,
  createNewTodo: createNewTodo,
  deleteTodo: deleteTodo,
  updateTodo: updateTodo,
};
