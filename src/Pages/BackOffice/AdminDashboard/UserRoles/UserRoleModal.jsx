import React, { Fragment, Component } from "react";
import { reduxForm, Field, change } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { renderTextField } from "../../../Common/RenderTextField";
import {
  showSuccess,
  showError,
  defaultDateFormat,
} from "../../../Helpers/utils";
import SubmitBtnLoader from "../../../Common/ButtonLoader";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Label,
} from "reactstrap";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import RenderSelectMultiInput from "../../../Common/renderMultipleInput";
import {
  getPermissions,
  addRole,
  updateRole,
} from "../../../../actions/roleAction";
class UserRoleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loading: false,
      startDates: this.props.initialValues
        ? this.props.initialValues.startDate
        : null,
      endDates: this.props.initialValues
        ? this.props.initialValues.endDate
        : null,
    };

    this.toggle = this.toggle.bind(this);
  }
  // This function is used to handle startDateChange
  handleStartDateChange = (date) => {
    this.setState({ startDates: date });
  };
  // This function is used to handle EndDateChange
  handleEndDateChange = (date) => {
    this.setState({ endDates: date });
  };
  componentDidMount = () => {
    this.props.dispatch(getPermissions());
  };
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.getPermissionsList &&
      nextProps.getPermissionsList !== this.props.getPermissionsList
    ) {
      const getPermissionsList = nextProps.getPermissionsList;
      let PermissionsList = [];
      getPermissionsList.map((permission, key) => {
        PermissionsList.push({
          value: permission,
          label: this.props.t(permission),
        });
        this.setState({ PermissionsList });
      });
    }
    if (
      nextProps.updateSuccess &&
      nextProps.updateSuccess !== this.props.updateSuccess
    ) {
      this.toggle();
      showSuccess(this.props.t("Common.UPDATE_SUCCESS"));
    }

    if (
      nextProps.isUpdateError &&
      nextProps.isUpdateError !== this.props.isUpdateError
    ) {
      this.setState({ loading: false });
      showError(nextProps.isUpdateError);
    }
    if (
      nextProps.addRoleSuccess &&
      nextProps.addRoleSuccess !== this.props.addRoleSuccess
    ) {
      this.toggle();
      this.setState({ loading: false });
      showSuccess(this.props.t("Common.ADD_SUCCESS"));
    }
    if (
      nextProps.addRoleFailure &&
      nextProps.addRoleFailure !== this.props.addRoleFailure
    ) {
      this.setState({ loading: false });
      showError(nextProps.addRoleFailure);
    }
    if (
      nextProps.getPermissionsListError &&
      nextProps.getPermissionsListError !== this.props.getPermissionsListError
    ) {
      showError(this.props.t("ErroMsg.SOTHING_WENT_WRONG"));
    }
  };

  toggle = () => {
    this.props.updateRole();
  };
  onSubmit = (formProps) => {
    if (this.state.startDates) {
      this.state.startDates = new Date(this.state.startDates).getTime();
    }
    if (this.state.endDates) {
      this.state.endDates = new Date(this.state.endDates).getTime();
    }
    if (
      formProps.label.trim() &&
      formProps.selectedPermission &&
      formProps.description &&
      this.state.startDates &&
      this.state.endDates
    ) {
      let requestData = {
        label: formProps.label.trim(),
        description: formProps.description,
        validityFrom: String(new Date(this.state.startDates).getTime()),
        validityTo: String(new Date(this.state.endDates).getTime()),
      };
      formProps.selectedPermission.map((permission) => {
        requestData[
          permission.value.charAt(0).toLowerCase() + permission.value.slice(1) //todo
        ] = true;
      });
      if (!this.props.initialValues) {
        this.props.dispatch(addRole(requestData));
      } else {
        requestData.code = this.props.initialValues.code.toString();
        this.props.dispatch(updateRole(requestData));
      }
    } else {
      showError(this.props.t("Common.REQUIRED_FIELDS"));
      return false;
    }
    this.setState({ loading: true });
  };
  render() {
    const { handleSubmit } = this.props;
    const { startDate, endDate } = this.state;
    return (
      <span className="d-inline-block mb-2 mr-2">
        <Modal
          isOpen={this.props.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <h4 className="font-weight-bold">
              {this.props.initialValues
                ? `${this.props.t("Common.UPDATE_USER_ROLE")}`
                : `${this.props.t("Common.ADD_USER_ROLE")}`}
            </h4>
          </ModalHeader>
          <ModalBody>
            <AvForm
              className="px-5"
              noValidate
              onSubmit={handleSubmit(this.onSubmit)}
              model={this.props.initialValues}
            >
              <FormGroup>
                <AvField
                  name="label"
                  tag={Field}
                  component={renderTextField}
                  label={this.props.t("Common.ROLE_NAME_M")}
                  type="text"
                  required
                  validate={{
                    required: {
                      value: true,
                      errorMessage: this.props.t("ErrorMsg.ROLE_NAME_REQUIRED"),
                    },

                    maxLength: {
                      value: 100,
                    },
                    minLength: {
                      value: 3,
                      errorMessage: this.props.t("Common.MIN_LENGTH"),
                    },
                  }}
                />
              </FormGroup>
              <FormGroup>
                <AvField
                  name="description"
                  tag={Field}
                  component={renderTextField}
                  label={this.props.t("Common.DESCRIPTION")}
                  type="text"
                  required
                  validate={{
                    required: {
                      value: true,
                      errorMessage: this.props.t(
                        "ErrorMsg.DESCRIPTION_NAME_REQUIRED"
                      ),
                    },

                    maxLength: {
                      value: 100,
                    },
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword" name="startDate">
                  {this.props.t("Common.DATE_BEGIN")}
                </Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <div className="input-group-text">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </div>
                  </InputGroupAddon>
                  <DatePicker
                    className="form-control"
                    dateFormat={defaultDateFormat}
                    selected={
                      startDate ? new Date(startDate) : this.state.startDates
                    }
                    onChange={this.handleStartDateChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword" name="endDate">
                  {" "}
                  {this.props.t("Common.DATE_END")}
                </Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <div className="input-group-text">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </div>
                  </InputGroupAddon>
                  <DatePicker
                    className="form-control"
                    dateFormat={defaultDateFormat}
                    selected={
                      endDate ? new Date(startDate) : this.state.endDates
                    }
                    onChange={this.handleEndDateChange}
                    minDate={this.state.startDates}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label>{this.props.t("Common.SELECT_PERMISSION") + "*"}</Label>
                <Field
                  component={RenderSelectMultiInput}
                  isMulti={true}
                  name="selectedPermission"
                  type="select"
                  id="selectField"
                  options={this.state.PermissionsList}
                />
              </FormGroup>
              <FormGroup>
                <SubmitBtnLoader
                  label={
                    this.props.initialValues
                      ? `${this.props.t("Common.UPDATE_USER_ROLE")}`
                      : `${this.props.t("Common.ADD_USER_ROLE")}`
                  }
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
UserRoleModal = reduxForm({
  form: "Permission",
})(UserRoleModal);
function mapStateToProps(state) {
  return {
    getPermissionsList: state.Role.getPermissionsList,
    getPermissionsListError: state.Role.getPermissionsListError,
    updateSuccess: state.Role.updateSuccess,
    isUpdateError: state.Role.isUpdateError,
    addRoleSuccess: state.Role.addRoleSuccess,
    addRoleFailure: state.Role.addRoleFailure,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(UserRoleModal);
