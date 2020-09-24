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
import {
  showSuccess,
  showError,
  required,
  EMAIL_REGEX,
} from "../../Helpers/utils";
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

import { addUser, updateUser } from "../../../actions/accountAction";

class AddMemberModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.isUserAdded &&
        nextProps.isUserAdded !== this.props.isUserAdded
      ) {
        showSuccess(this.props.t("Common.ADD_SUCCESS"));
        this.toggle();
      }
      if (
        nextProps.errorMessage &&
        nextProps.errorMessage !== this.props.errorMessage
      ) {
        showError(nextProps.errorMessage);
        this.setState({ loading: false });
      }
      if (
        nextProps.updateFailure &&
        nextProps.updateFailure !== this.props.updateFailure
      ) {
        showError(nextProps.updateFailure);
        this.setState({ loading: false });
      }
    }
    if (
      nextProps.updateMessage &&
      nextProps.updateMessage !== this.props.updateMessage
    ) {
      // showSuccess(nextProps.updateMessage);
      this.toggle();
      this.setState({
        loading: false,
      });
    }
  }

  onSubmit = (formProps) => {
    if (
      formProps.firstName &&
      formProps.lastName &&
      this.state.passwordValidation &&
      formProps.title &&
      formProps.mobileNumber &&
      formProps.email &&
      formProps.city &&
      formProps.registrationNumber
    ) {
      this.setState({ loading: true });
      if (!this.props.initialValues) {
        this.props.dispatch(addUser(formProps));
      } else {
        this.props.dispatch(updateUser(formProps));
      }
    } else {
      showError(this.props.t("Common.REQUIRED_FIELDS"));
    }
  };
  validateLength = (e) => {
    if (e.target.value.length == 10) {
      this.setState({
        passwordValidation: true,
      });
    } else {
      this.setState({
        passwordValidation: false,
      });
    }
  };
  toggle = () => {
    this.props.showAddMemberModal();
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Fragment>
        <Modal
          isOpen={this.props.modal}
          toggle={this.toggle}
          className="modalSize"
        >
          <ModalHeader toggle={this.toggle}>
            <h4 className="font-weight-bold">
              {this.props.initialValues
                ? `${this.props.t("Common.UPDATE_USER")}`
                : `${this.props.t("Common.ADD_USER")}`}
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
                <Col md={6}>
                  <FormGroup>
                    <Label>{this.props.t("Registration.TITLE")}</Label>
                    <Field
                      type="select"
                      name="title"
                      component={renderSelectField}
                      label={this.props.t("Registration.TITLE")}
                      required
                      // validate={[required]}
                      className="form-control"
                    >
                      <option value="">
                        {this.props.t("Registration.SELECT")}
                      </option>
                      <option value={this.props.t("Registration.MR")}>
                        {this.props.t("Registration.MR")}
                      </option>
                      <option value={this.props.t("Registration.MS")}>
                        {this.props.t("Registration.MS")}
                      </option>
                    </Field>
                  </FormGroup>
                  <FormGroup>
                    <AvField
                      name="firstName"
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Registration.F_NAME")}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.FIRST_NAME_ERROR"
                          ),
                        },
                        // pattern: {
                        //   value: "^[a-zA-Z]+$",
                        //   errorMessage: this.props.t("Common.ONLY_TEXT")
                        // },
                        maxLength: {
                          value: 100,
                        },
                        // minLength: {
                        //   value: 3,
                        //   errorMessage: this.props.t("Common.MIN_LENGTH")
                        // }
                      }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <AvField
                      name="lastName"
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Registration.L_NAME")}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.LAST_NAME_ERROR"
                          ),
                        },
                        // pattern: {
                        //   value: "^[a-zA-Z]+$",
                        //   errorMessage: this.props.t("Common.ONLY_TEXT")
                        // },
                        maxLength: {
                          value: 100,
                        },
                        // minLength: {
                        //   value: 3,
                        //   errorMessage: this.props.t("Common.MIN_LENGTH")
                        // }
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <AvField
                      name="mobileNumber"
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Registration.MOBILE")}
                      type="text"
                      onChange={(e) => this.validateLength(e)}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t("ErrorMsg.MOBILE_ERROR"),
                        },
                        pattern: {
                          value: "^[0-9]+$",
                          errorMessage: this.props.t("Common.ONLY_NUM"),
                        },
                        maxLength: {
                          value: 10,
                        },
                        minLength: {
                          // required: {
                          value: 10,
                          errorMessage: this.props.t("ErrorMsg.ACCEPT_NUM"),
                          // },
                        },
                      }}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <AvField
                      name="email"
                      readOnly={this.props.initialValues ? true : false}
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Registration.EMAIL")}
                      type="email"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t("ErrorMsg.EMAIL_ERROR"),
                        },
                        pattern: {
                          value: EMAIL_REGEX,
                          errorMessage: this.props.t("Common.WRONG_EMAIL"),
                        },
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <AvField
                      name="registrationNumber"
                      // readOnly={this.props.initialValues ? true : false}
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Common.REGISTRATION_NUMBER")}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.REGISTRATION_NUMBER_ERROR"
                          ),
                        },
                        minLength: {
                          value: 3,
                          errorMessage: this.props.t("Common.MIN_LENGTH"),
                        },
                        // pattern: {
                        //   value: EMAIL_REGEX,
                        //   errorMessage: this.props.t("Common.WRONG_EMAIL"),
                        // },
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <AvField
                      name="city"
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Registration.CITY")}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t("ErrorMsg.CITY_ERROR"),
                        },
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center">
                <SubmitBtnLoader
                  label={
                    this.props.initialValues
                      ? `${this.props.t("Common.UPDATE_USER")}`
                      : `${this.props.t("Common.ADD_USER")}`
                  }
                  className="btn btn-lg btn-primary px-5 btn-pill mt-1"
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

AddMemberModal = reduxForm({
  form: "AddMemberModal",
  //validate,
  // asyncValidate,
})(AddMemberModal);
function mapStateToProps(state) {
  return {
    isUserAdded: state.Account.isUserAdded,
    errorMessage: state.Account.errorMessage,
    updateMessage: state.Account.updateMessage,
    updateFailure: state.Account.updateFailure,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(AddMemberModal);
