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

import {
  removeUserInEntity,
  getEntityByCode,
} from "../../../actions/entityAction";

class DeleteUserInEntity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  componentDidMount = () => {
    this.props.dispatch(getEntityByCode(this.props.entityId));
  };

  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.isEntityCodeSuccess &&
        nextProps.isEntityCodeSuccess !== this.props.isEntityCodeSuccess
      ) {
        const isEntityCodeSuccess = nextProps.isEntityCodeSuccess;
        let groupUser = [];
        if (
          isEntityCodeSuccess.data.userClients &&
          isEntityCodeSuccess.data.userClients.length
        )
          isEntityCodeSuccess.data.userClients.map((userDetail, key) => {
            groupUser.push({
              value: parseInt(userDetail.code),
              label: userDetail.email,
              email: userDetail.email,
            });
            this.setState({ groupUser });
          });
      }

      if (
        nextProps.isDeleteUserEntitySuccess &&
        nextProps.isDeleteUserEntitySuccess !==
          this.props.isDeleteUserEntitySuccess //->for entities
      ) {
        this.toggle();
        this.setState({
          loading: false,
        });
        showSuccess(this.props.t("Common.DELETE_SUCCESS"));
      }

      if (
        nextProps.isDeleteUserEntityFailure &&
        nextProps.isDeleteUserEntityFailure !==
          this.props.isDeleteUserEntityFailure //->for entities
      ) {
        this.setState({
          loading: false,
        });
        showError(nextProps.isDeleteUserEntityFailure);
      }
    }
  }

  onSubmit = (formProps) => {
    if (formProps.userName) {
      const requestData = {
        entityCode: this.props.entityId,
        userCode: formProps.userName.value, //id
      };

      this.props.dispatch(removeUserInEntity(requestData));
    } else {
      showError(this.props.t("ErrorMsg.TEXT_ONLY"));
      return;
    }
    this.setState({ loading: true });
  };

  toggle = () => {
    this.props.deleteUserInEntity();
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
              {this.props.t("Common.DELETE_USER_IN_ENTITIY")}
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
                  label={this.props.t("Common.DELETE_SER_IN_ENTITY_BUTTON")}
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

DeleteUserInEntity = reduxForm({
  form: "AddUserInGroup",
  //validate,
  // asyncValidate,
})(DeleteUserInEntity);
function mapStateToProps(state) {
  return {
    usersData: state.Account.usersData,
    userInGroup: state.Group.userInGroup,
    isEntityCodeSuccess: state.Entity.isEntityCodeSuccess,
    isDeleteUserGroupSuccess: state.Group.isDeleteUserGroupSuccess,
    isDeleteUserEntitySuccess: state.Entity.isDeleteUserEntitySuccess,
    isDeleteUserEntityFailure: state.Entity.isDeleteUserEntityFailure,
    isDeleteUserGroupFailure: state.Group.isDeleteUserGroupFailure,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(DeleteUserInEntity);
