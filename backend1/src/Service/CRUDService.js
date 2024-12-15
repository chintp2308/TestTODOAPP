import db from "../models/index";

let getAllTodo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let todoAll = await db.User.findAll();
      resolve(todoAll);
    } catch (e) {
      reject(e);
    }
  });
};

let CreateNewTodo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data || !data.Title || !data.Description) {
        resolve({
          errCode: 1,
          errMessage: "Missing require parameter",
        });
      } else {
        let title = await checkValidateTodo(data.Title);
        if (title === true) {
          resolve({
            errCode: 2,
            errMessage: "Todo Adready Exist",
          });
        } else {
          await db.User.create({
            Title: data.Title,
            Description: data.Description,
          });
          resolve({
            errCode: 0,
            errMessage: "create Todo succeed!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let DeleteTodo = (todoId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!todoId) {
        resolve({
          errCode: 1,
          errMessage: "Missing todoId",
        });
      } else {
        let todo = await db.User.findOne({
          where: { id: todoId },
        });
        if (!todo) {
          resolve({
            errCode: 2,
            errMessage: "Todo is not exist",
          });
        } else {
          await db.User.destroy({
            where: { id: todoId },
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

let UpdateTodo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data || !data.Title || !data.Description) {
        resolve({
          errCode: 1,
          errMessage: "Missing require paramater",
        });
      } else {
        let todo = await db.User.findOne({
          where: {
            id: data.id,
          },
        });
        if (todo) {
          (todo.Title = data.Title), (todo.Description = data.Description);

          await todo.save();
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Todo is not exist",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkValidateTodo = (titleTodo) => {
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
  CreateNewTodo: CreateNewTodo,
  DeleteTodo: DeleteTodo,
  UpdateTodo: UpdateTodo,
};
