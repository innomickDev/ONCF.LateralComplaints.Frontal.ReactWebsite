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

import { addGroup, updateGroup } from "../../../actions/groupsAction";
const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class AddGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.addGroupSuccess &&
        nextProps.addGroupSuccess !== this.props.addGroupSuccess
      ) {
        showSuccess(this.props.t("Common.ADD_SUCCESS"));
        this.toggle();
        this.setState({
          loading: false,
        });
      }

      if (
        nextProps.isAddFailure &&
        nextProps.isAddFailure !== this.props.isAddFailure
      ) {
        this.setState({
          loading: false,
        });
        showError(nextProps.isAddFailure);
      }

      // update
      if (
        nextProps.isUpdateSuccess &&
        nextProps.isUpdateSuccess !== this.props.isUpdateSuccess
      ) {
        this.setState({
          loading: false,
        });
        showSuccess(this.props.t("Common.UPDATE_SUCCESS"));
        this.toggle();
      }
      if (
        nextProps.isUpdateError &&
        nextProps.isUpdateError !== this.props.isUpdateError
      ) {
        this.setState({
          loading: false,
        });
        showError(nextProps.isUpdateError);
      }
    }
  }

  onSubmit = (formProps) => {
    if (formProps.groupName.trim()) {
      this.setState({ loading: true });
      if (!this.props.initialValues) {
        this.props.dispatch(addGroup(formProps));
      } else {
        this.props.dispatch(updateGroup(formProps));
      }
    } else {
      showError(this.props.t("Common.REQUIRED_FIELDS"));
      return false;
    }
  };

  toggle = () => {
    this.props.addGroup();
  };

  render() {
    const { handleSubmit } = this.props;
    const Checkbox = ({ input, meta: { touched, error } }) => (
      <div style={{ border: touched && error ? "1px solid red" : "none" }}>
        <input type="checkbox" {...input} />
        <label>{this.props.t("Common.DEFAULT")}</label>
      </div>
    );

    return (
      <Fragment>
        <Modal
          isOpen={this.props.modal}
          toggle={this.toggle}
          // className="modalSize"
        >
          <ModalHeader toggle={this.toggle}>
            <h4 className="font-weight-bold">
              {this.props.initialValues
                ? `${this.props.t("Common.UPDATE_GROUP")}`
                : `${this.props.t("Common.ADD_GROUP")}`}
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
                    <AvField
                      name="groupName"
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Common.GROUP_NAME") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.GROUP_NAME_REQUIRED"
                          ),
                        },
                        // pattern: {
                        //   value: "^[a-zA-Z ]*$",
                        //   errorMessage: this.props.t("Common.ONLY_TEXT")
                        // },
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
                    <Field
                      label={this.props.t("Common.DEFAULT")}
                      type="checkbox"
                      name="isDefault"
                      component={Checkbox}
                    />
                    {/* </AvCheckboxGroup> */}
                  </FormGroup>
                </Col>
              </Row>
              <div className="">
                <SubmitBtnLoader
                  label={
                    this.props.initialValues
                      ? `${this.props.t("Common.UPDATE_GROUP_BTN")}`
                      : `${this.props.t("Common.ADD_GROUP")}`
                  }
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

AddGroup = reduxForm({
  form: "AddStations",
  //validate,
  // asyncValidate,
})(AddGroup);
function mapStateToProps(state) {
 
  return {
    addGroupSuccess: state.Group.addGroupSuccess,
    isAddFailure: state.Group.isAddFailure,
    isUpdateSuccess: state.Group.isUpdateSuccess,
    isUpdateError: state.Group.isUpdateError,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(AddGroup);
