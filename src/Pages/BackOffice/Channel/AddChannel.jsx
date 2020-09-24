import React, { Fragment, Component } from "react";
import { reduxForm, Field, change } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { renderTextField } from "../../Common/RenderTextField";
import {
  showSuccess,
  showError,
  // required,
  ENG_REGEX,
  FRENCH_REGEX,
  ARABIC_REGEX,
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

import { addCategory, updateCategory } from "../../../actions/categoryAction";
import { addChannel } from "../../../actions/channelAction";

class AddChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.addChannelData &&
        nextProps.addChannelData !== this.props.addChannelData
      ) {
        this.setState({ loading: false });
        showSuccess(this.props.t("Common.ADD_SUCCESS"));
        this.toggle();
      }
      if (
        nextProps.isAddChannelDataFail &&
        nextProps.isAddChannelDataFail !== this.props.isAddChannelDataFail
      ) {
        showError(nextProps.isAddChannelDataFail);
        this.setState({ loading: false });
      }

      if (
        nextProps.isUpdateCategorySuccess &&
        nextProps.isUpdateCategorySuccess !== this.props.isUpdateCategorySuccess
      ) {
        showSuccess(this.props.t("Common.UPDATE_SUCCESS"));
        this.setState({ loading: false });
        this.toggle();
      }
      if (
        nextProps.isUpdateCategoryFailure &&
        nextProps.isUpdateCategoryFailure !== this.props.isUpdateCategoryFailure
      ) {
        this.setState({ loading: false });
        showError(nextProps.isUpdateCategoryFailure);
      }
      if (
        nextProps.isAddChannelNetworkError &&
        nextProps.isAddChannelNetworkError !==
          this.props.isAddChannelNetworkError
      ) {
        this.setState({ loading: false });
        showError(this.props.t("Common.SOMETHING_WENT_WRONG"));
      }
    }
  }

  onSubmit = (formProps) => {
    if (
      formProps.labelEn.trim() &&
      formProps.labelAr.trim() &&
      ARABIC_REGEX.test(formProps.labelAr.trim()) &&
      ENG_REGEX.test(formProps.labelEn.trim()) &&
      formProps.labelFr.trim() &&
      FRENCH_REGEX.test(formProps.labelFr.trim())
    ) {
      this.setState({ loading: true });
      if (!this.props.initialValues) {
        this.props.dispatch(addChannel(formProps));
      } else {
        this.props.dispatch(updateCategory(formProps));
      }
    } else {
      showError(this.props.t("ErrorMsg.TEXT_ONLY"));
      return false;
    }
  };

  toggle = () => {
    this.props.updateCategory();
  };

  render() {
    const { handleSubmit } = this.props;

    const Checkbox = ({ input, meta: { touched, error } }) => (
      <div style={{ border: touched && error ? "1px solid red" : "none" }}>
        <input type="checkbox" {...input} />
        <label>{this.props.t("Common.IS_SUB_SUB_CATEGORY")}</label>
      </div>
    );
    return (
      <Fragment>
        <Modal isOpen={this.props.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <h4 className="font-weight-bold">
              {this.props.initialValues
                ? `${this.props.t("Common.UPDATE_CHANNEL")}`
                : `${this.props.t("Common.ADD_CHANNEL")}`}
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
                      name="labelEn"
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Common.CHANNEL_EN") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.CHANNEL_REQUIRED"
                          ),
                        },
                        pattern: {
                          value: ENG_REGEX,
                          errorMessage: this.props.t("Common.ONLY_TEXT"),
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
                      name="labelFr"
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Common.CHANNEL_FR") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.CHANNEL_REQUIRED_FR"
                          ),
                        },
                        maxLength: {
                          value: 100,
                        },
                        minLength: {
                          value: 3,
                          errorMessage: this.props.t("Common.MIN_LENGTH"),
                        },
                        pattern: {
                          value: FRENCH_REGEX,
                          errorMessage: this.props.t("Common.ACCEPT_FRENCH"),
                        },
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <AvField
                      name="labelAr"
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Common.CHANNEL_AR") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.CHANNEL_REQUIRED_AR"
                          ),
                        },
                        maxLength: {
                          value: 100,
                        },
                        minLength: {
                          value: 3,
                          errorMessage: this.props.t("Common.MIN_LENGTH"),
                        },
                        pattern: {
                          value: ARABIC_REGEX,
                          errorMessage: this.props.t("Common.ACCEPT_ARABIC"),
                        },
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="">
                <SubmitBtnLoader
                  label={
                    this.props.initialValues
                      ? `${this.props.t("Common.UPDATE_CHANNEL")}`
                      : `${this.props.t("Common.ADD_CHANNEL")}`
                  }
                  className="btn btn-success"
                  loading={this.state.loading}
                  submitting={""}
                  type="submit"
                  validate={{
                    maxLength: {
                      value: 20,
                    },
                    minLength: {
                      value: 3,
                      errorMessage: this.props.t("Common.MIN_LENGTH"),
                    },
                  }}
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

AddChannel = reduxForm({
  form: "AddCategory",
  //validate,
  // asyncValidate,
})(AddChannel);

function mapStateToProps(state) {
  return {
    addChannelData: state.Channel.addChannelData,
    isAddChannelDataFail: state.Channel.isAddChannelDataFail,

    isAddChannelNetworkError: state.Channel.isAddChannelNetworkError,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(AddChannel);
