import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./TodoUser.scss";
import { emitter } from "../../utils/emitter";

class TodoUser extends Component {
  constructor(props) {
    super(props);
    // state: quản lý giá trị biến
    this.state = {
      Title: "",
      Description: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVEN_CLEAR_MODAL_DATA", () => {
      //hứng event(nghe event) : emitter.on
      //reset state
      this.setState({
        Title: "",
        Description: "",
      });
    });
  }
  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValue = true;
    let arrInput = ["Title", "Description"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValue = false;
        alert("Missing parameter" + arrInput[i]);
        break;
      }
    }
    return isValue;
  };
  handleAddNewTodo = () => {
    let isValue = this.checkValidateInput();
    if (isValue === true) {
      this.props.putCreateNewTodoFromReact(this.state);
    }
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
              <input
                type="text"
                placeholder="Enter title"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "Title");
                }}
              />
            </div>
            <div className="input-container">
              <label>Description</label>
              <input
                type="text"
                placeholder="Enter description"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "Description");
                }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.handleAddNewTodo();
            }}
          >
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
