import React, { Component } from "react";
import { connect } from "react-redux";
import "./TodoManage.scss";
import {
  getAllTodoApp,
  postCreateNewTodo,
  deleteTodo,
  putUpdateTodo,
} from "../../services/todoService";
import TodoUser from "./TodoUser";
import { emitter } from "../../utils/emitter";
import TodoEdit from "./TodoEdit";

class TodoManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTodo: [],
      isOpenModalTodo: false,
      isOpenModalEditTodo: false,
      dataEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllTodoAppFromReact();
  }
  getAllTodoAppFromReact = async () => {
    let response = await getAllTodoApp("ALL");

    if (response && response.errCode === 0) {
      this.setState({ arrTodo: response.data });
    }
  };

  handleAddNewTodo = () => {
    this.setState({
      isOpenModalTodo: true,
    });
  };

  handleEditTodo = (data) => {
    console.log("check edit user", data);
    this.setState({
      isOpenModalEditTodo: true,
      dataEdit: data,
    });
  };

  toggleTodoModal = () => {
    this.setState({
      isOpenModalTodo: !this.state.isOpenModalTodo,
    });
  };

  toggleEditTodoModal = () => {
    this.setState({
      isOpenModalEditTodo: !this.state.isOpenModalEditTodo,
    });
  };

  putCreateNewTodoFromReact = async (data) => {
    try {
      let response = await postCreateNewTodo(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllTodoAppFromReact(data);
        this.setState({
          isOpenModalTodo: false,
        });
        emitter.emit("EVEN_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteTodo = async (user) => {
    try {
      let res = await deleteTodo(user.id);
      if (res && res.errCode === 0) {
        await this.getAllTodoAppFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  postEditFromReact = async (data) => {
    try {
      let res = await putUpdateTodo(data);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditTodo: false,
        });
        await this.getAllTodoAppFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrTodo1 = this.state.arrTodo;
    return (
      <div className="container">
        <TodoUser
          isOpen={this.state.isOpenModalTodo}
          toggleFromParent={this.toggleTodoModal}
          putCreateNewTodoFromReact={this.putCreateNewTodoFromReact}
        />
        {this.state.isOpenModalEditTodo && (
          <TodoEdit
            isOpen={this.state.isOpenModalEditTodo}
            toggleEditFromParent={this.toggleEditTodoModal}
            currentData={this.state.dataEdit}
            postEditFromReact={this.postEditFromReact}
          />
        )}

        <header className="text-center text-light my-4">
          <h1 className="mb-4">Todo List</h1>
        </header>

        <ul className="list-group todos mx-auto text-light delete">
          <li className="list-group-item d-flex justify-content-between align-items-center font-weight-bold">
            <span className="col">Title</span>
            <span className="col">Description</span>
            <span className="col">Actions</span>
          </li>

          {arrTodo1 &&
            arrTodo1.map((item, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span className="col">{item.Title}</span>
                  <span className="col">{item.Description}</span>
                  <div className="icon-group">
                    <i
                      className="fas fa-pencil-alt edit"
                      onClick={() => this.handleEditTodo(item)}
                    ></i>
                    <i
                      className="far fa-trash-alt delete"
                      onClick={() => this.handleDeleteTodo(item)}
                    ></i>
                  </div>
                </li>
              );
            })}
        </ul>

        <button className="btn" onClick={() => this.handleAddNewTodo()}>
          Add a new todo
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.admin.isLoggedIn,
  };
};

export default connect(mapStateToProps)(TodoManage);
