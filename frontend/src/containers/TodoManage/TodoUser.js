import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./TodoUser.scss";
class TodoUser extends Component {
  state = {};

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  render() {
    // console.log("check child props", this.props);
    // console.log("check child open modal", this.props.isOpen);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
      >
        <ModalHeader>Create a new Todo</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Title</label>
              <input type="text" placeholder="Enter title" />
            </div>
            <div className="input-container">
              <label>Description</label>
              <input type="text" placeholder="Enter description" />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>
            Add a new Todo
          </Button>{" "}
          <Button color="primary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoUser);
