import React from "react";
import { reduxForm, Field } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { AvForm } from "availity-reactstrap-validation";

import { showSuccess, showError, required } from "../../Helpers/utils";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
} from "reactstrap";
import SubmitBtnLoader from "../../Common/ButtonLoader";
import RenderSelectMultiInput from "../../Common/renderMultipleInput";
import { getAllRoles, assignRoleToUSer } from "../../../actions/roleAction";

class RoleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loading: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount = () => {
    this.props.dispatch(getAllRoles());
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.rolesData && nextProps.rolesData !== this.props.rolesData) {
      const rolesData = nextProps.rolesData;

      let rolesList = [];
      if (
        rolesData.data &&
        rolesData.data.roleClients &&
        rolesData.data.roleClients.length
      )
        rolesData.data.roleClients.map((role, key) => {
          rolesList.push({
            value: role.code,
            label: role.label,
          });
          this.setState({ rolesList });
        });
    }
    // Error
    if (
      nextProps.updateError &&
      nextProps.updateError !== this.props.updateError
    ) {
      showError(nextProps.updateError);
      this.setState({ loading: false });
    }
    if (
      nextProps.updateRoleSuccess &&
      nextProps.updateRoleSuccess !== this.props.updateRoleSuccess
    ) {
      this.toggle();
      showSuccess(this.props.t("Common.ROLE_SUCCESS"));
      this.setState({ loading: false });
    }
  };

  toggle = () => {
    this.props.showRolesModal();
  };

  onSubmit = (formProps) => {
    if (formProps.rolesId) {
      const requestData = {
        userCode: this.props.initialValues.code.toString(),
        appRoleCodes: [],
      };

      formProps.rolesId.map((permission) => {
        requestData.appRoleCodes.push(permission.value);
      });

      this.props.dispatch(assignRoleToUSer(requestData));
    } else {
      showError(this.props.t("ErrorMsg.TEXT_ONLY"));
      return false;
    }
    this.setState({ loading: true });
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <span className="d-inline-block mb-2 mr-2">
        <Modal
          isOpen={this.props.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <h4 className="font-weight-bold">
              {this.props.t("Common.ADD_ROLE")}
            </h4>
          </ModalHeader>
          <ModalBody>
            <AvForm
              className="px-5"
              noValidate
              onSubmit={handleSubmit(this.onSubmit)}
            >
              <FormGroup>
                <Label>{this.props.t("Common.SELECT_ROLE") + "*"}</Label>
                <Field
                  component={RenderSelectMultiInput}
                  name="rolesId"
                  type="select"
                  id="selectField"
                  isMulti={true}
                  options={this.state.rolesList}
                />
              </FormGroup>
              <FormGroup>
                <SubmitBtnLoader
                  label={this.props.t("Common.ADD_ROLE")}
                  className="btn btn-success"
                  loading={this.state.loading}
                  submitting={""}
                  type="submit"
                />
              </FormGroup>
            </AvForm>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </span>
    );
  }
}
RoleModal = reduxForm({
  form: "Role",
})(RoleModal);
function mapStateToProps(state) {
  return {
    listDataSuccess: state.Profile.listDataSuccess,
    updateProfileSuccess: state.Profile.updateProfileSuccess,
    updateProfileFailure: state.Profile.updateProfileFailure,
    listDataFailure: state.Profile.listDataFailure,
    rolesData: state.Role.rolesData,
    updateError: state.Role.updateError,
    updateRoleSuccess: state.Role.updateRoleSuccess,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(RoleModal);
