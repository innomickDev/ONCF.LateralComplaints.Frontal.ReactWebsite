import React, { Fragment, Component } from "react";
import { reduxForm, Field, change } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {
  renderTextField,
  renderSelectField,
} from "../../Common/RenderTextField";
import { showSuccess, showError, required } from "../../Helpers/utils";
import SubmitBtnLoader from "../../Common/ButtonLoader";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Row,
  Col,
  Label,
} from "reactstrap";
import RenderSelectMultiInput from "../../Common/renderMultipleInput";
import { getAllUsers } from "../../../actions/accountAction";
import {
  getUserByGroupId,
  deleteUserInGroup,
} from "../../../actions/groupsAction";

class DeleteUserInGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    //this.toggle = this.toggle.bind(this);
  }
  componentDidMount = () => {
    this.props.dispatch(getUserByGroupId(this.props.groupId));
  };

  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.userInGroup &&
        nextProps.userInGroup !== this.props.userInGroup
      ) {
        const userInGroup = nextProps.userInGroup;
        let groupUser = [];
        if (userInGroup.data.userClients && userInGroup.data.userClients.length)
          userInGroup.data.userClients.map((userDetail, key) => {
            groupUser.push({
              value: parseInt(userDetail.code),
              label: userDetail.email,
              email: userDetail.email,
            });
            this.setState({ groupUser });
          });
      }

      if (
        nextProps.isDeleteUserGroupSuccess &&
        nextProps.isDeleteUserGroupSuccess !==
          this.props.isDeleteUserGroupSuccess
      ) {
        this.toggle();
        this.setState({
          loading: false,
        });
        showSuccess(this.props.t("Common.DELETE_SUCCESS"));
      }

      if (
        nextProps.isDeleteUserGroupFailure &&
        nextProps.isDeleteUserGroupFailure !==
          this.props.isDeleteUserGroupFailure
      ) {
        this.setState({
          loading: false,
        });
        showError(nextProps.isDeleteUserGroupFailure);
      }
    }
  }

  // deleteUserInGroup = () => {};

  onSubmit = (formProps) => {
    if (formProps.userName) {
      const requestData = {
        groupCode: this.props.groupId,
        userCode: formProps.userName.value, //id
      };
      this.props.dispatch(deleteUserInGroup(requestData));
    } else {
      showError(this.props.t("ErrorMsg.TEXT_ONLY"));
      return;
    }
    this.setState({ loading: true });
  };

  toggle = () => {
    this.props.deleteUserInGroup();
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Fragment>
        <Modal
          isOpen={this.props.modal}
          toggle={this.toggle}
          // className="modalSize"
        >
          <ModalHeader toggle={this.toggle}>
            <h4 className="font-weight-bold">
              {this.props.t("Common.DELETE_USER_IN_GROUP")}
            </h4>
          </ModalHeader>
          <ModalBody>
            <AvForm
              className="px-5"
              noValidate
              onSubmit={handleSubmit(this.onSubmit)}
              model={this.props.initialValues}
            >
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>
                      {this.props.t("Common.SELECT_USER_NAMES") + "*"}
                    </Label>
                    <Field
                      component={RenderSelectMultiInput}
                      isMulti={false}
                      name="userName"
                      type="select"
                      id="selectField"
                      options={this.state.groupUser}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="">
                <SubmitBtnLoader
                  label={this.props.t("Common.DELETE_USER_IN_GROUP")}
                  className="btn btn-success"
                  loading={this.state.loading}
                  submitting={""}
                  type="submit"
                />
              </div>
            </AvForm>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

DeleteUserInGroup = reduxForm({
  form: "AddUserInGroup",
  //validate,
  // asyncValidate,
})(DeleteUserInGroup);
function mapStateToProps(state) {
  return {
    usersData: state.Account.usersData,
    userInGroup: state.Group.userInGroup,
    isDeleteUserGroupSuccess: state.Group.isDeleteUserGroupSuccess,
    isDeleteUserGroupFailure: state.Group.isDeleteUserGroupFailure,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(DeleteUserInGroup);
