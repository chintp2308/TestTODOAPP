import axios from "../axios";

const getAllTodoApp = (data) => {
  return axios.get("/api/all-todo", { params: { data } });
};
const postCreateNewTodo = (data) => {
  return axios.post("/api/create-new-todo", data);
};

const deleteTodo = (userId) => {
  return axios.delete("/api/delete-todo", {
    data: {
      id: userId,
    },
  });
};

const putUpdateTodo = (data) => {
  return axios.put("/api/update-todo", data);
};
export { getAllTodoApp, postCreateNewTodo, deleteTodo, putUpdateTodo };
