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
import { addUserInGroup } from "../../../actions/groupsAction";

class AddUserInGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    //this.toggle = this.toggle.bind(this);
  }
  componentDidMount = () => {
    this.props.dispatch(getAllUsers());
  };

  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (nextProps.usersData && nextProps.usersData !== this.props.usersData) {
        const usersData = nextProps.usersData;
        let users = [];
        usersData.userClients.map((user, key) => {
          users.push({
            value: parseInt(user.code),
            label: user.title + " " + user.firstName + " " + user.lastName,
          });
          this.setState({ users });
        });
      }

      // success
      if (
        nextProps.isAddUserGroupSuccess &&
        nextProps.isAddUserGroupSuccess !== this.props.isAddUserGroupSuccess
      ) {
        showSuccess(this.props.t("Common.ADD_SUCCESS"));
        this.setState({ loading: false });
        this.toggle();
      }
      // error
      if (
        nextProps.isAddUserGroupFailure &&
        nextProps.isAddUserGroupFailure !== this.props.isAddUserGroupFailure
      ) {
        showError(nextProps.isAddUserGroupFailure);
        this.setState({ loading: false });
      }
    }
  }

  onSubmit = (formProps) => {
    if (formProps.userId) {
      const requestData = {
        groupCode: this.props.groupId,
        userCode: formProps.userId.value,
      };
      this.props.dispatch(addUserInGroup(requestData));
    } else {
      showError(this.props.t("ErrorMsg.TEXT_ONLY"));
      return;
    }
    this.setState({ loading: true });
  };
  toggle = () => {
    this.props.addUserInGroup();
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
              {this.props.t("Common.ADD_USER_IN_GROUP")}
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
                      name="userId"
                      type="select"
                      id="selectField"
                      options={this.state.users}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="">
                <SubmitBtnLoader
                  label={this.props.t("Common.ADD_USER_IN_GROUP")}
                  // {
                  //   this.props.initialValues
                  //     ? `${this.props.t("Common.UPDATE_GROUP")}`
                  //     : `${this.props.t("Common.ADD_GROUP")}`
                  // }

                  // label="Add station"
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

AddUserInGroup = reduxForm({
  form: "AddUserInGroup",
  //validate,
  // asyncValidate,
})(AddUserInGroup);
function mapStateToProps(state) {
  return {
    usersData: state.Account.usersData,
    isAddUserGroupSuccess: state.Group.isAddUserGroupSuccess,
    isAddUserGroupFailure: state.Group.isAddUserGroupFailure,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(AddUserInGroup);
