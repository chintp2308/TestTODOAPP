import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TodoManage from "../TodoManage/TodoManage";

class HomePage extends Component {
  render() {
    return <TodoManage />;
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
