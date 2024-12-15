import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./TodoManage.scss";
import TodoUser from "./TodoUser";

class TodoManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModalUser: false,
    };
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  render() {
    return (
      <body>
        <div className="container">
          <TodoUser
            isOpen={this.state.isOpenModalUser}
            toggleFromParent={this.toggleUserModal}
          />
          <header className="text-center text-light my-4">
            <h1 className="mb-4">Todo List</h1>
          </header>

          <ul className="list-group todos mx-auto text-light delete">
            <li className="list-group-item d-flex justify-content-between align-items-center font-weight-bold">
              <span className="col">Title</span>
              <span className="col">Description</span>
              <span className="col">Actions</span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span className="col">Go to the grocery</span>
              <span className="col">Buy essentials</span>
              <div className="icon-group">
                <i className="fas fa-pencil-alt edit"></i>
                <i className="far fa-trash-alt delete"></i>
              </div>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span className="col">Do the Laundry</span>
              <span className="col">Wash clothes</span>
              <div className="icon-group">
                <i className="fas fa-pencil-alt edit"></i>
                <i className="far fa-trash-alt delete"></i>
              </div>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span className="col">Walk the dog</span>
              <span className="col">Take the dog for a walk</span>
              <div className="icon-group">
                <i className="fas fa-pencil-alt edit"></i>
                <i className="far fa-trash-alt delete"></i>
              </div>
            </li>
          </ul>

          <button className="btn" onClick={() => this.handleAddNewUser()}>
            Add a new todo
          </button>
        </div>
      </body>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.admin.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoManage);
