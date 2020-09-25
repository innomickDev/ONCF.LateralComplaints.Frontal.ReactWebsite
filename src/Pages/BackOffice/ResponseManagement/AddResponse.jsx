import React, { Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { renderTextField } from "../../Common/RenderTextField";
import { showSuccess, showError, required } from "../../Helpers/utils";
import SubmitBtnLoader from "../../Common/ButtonLoader";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Row,
  Col,
} from "reactstrap";

import { addResponse, updateResponse } from "../../../actions/responseAction";
import EditorFieldComponent from "../../Common/RenderTextEditior";
class AddResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.addResponseSuccess &&
        nextProps.addResponseSuccess !== this.props.addResponseSuccess
      ) {
        showSuccess(this.props.t("Common.ADD_SUCCESS"));
        this.toggle();
      }

      if (
        nextProps.addResponseFailure &&
        nextProps.addResponseFailure !== this.props.addResponseFailure
      ) {
        this.setState({
          loading: false,
        });
        showError(nextProps.addResponseFailure);
      }
      // update
      if (
        nextProps.updateResponseSuccess &&
        nextProps.updateResponseSuccess !== this.props.updateResponseSuccess
      ) {
        this.toggle();
      }
      if (
        nextProps.updateResponseFailure &&
        nextProps.updateResponseFailure !== this.props.updateResponseFailure
      ) {
        this.setState({
          loading: false,
        });
        showError(nextProps.updateResponseFailure);
      }
    }
  }

  inputChange = (value) => {};

  onSubmit = (formProps) => {
    if (formProps.title.trim() && formProps.body.trim() != "<p></p>") {
      this.setState({ loading: true });
      if (!this.props.initialValues) {
        this.props.dispatch(addResponse(formProps));
      } else {
        formProps.code = this.props.initialValues.code;
        this.props.dispatch(updateResponse(formProps));
      }
    } else {
      showError(this.props.t("Common.REQUIRED_FIELDS"));
      return false;
    }
  };

  toggle = () => {
    this.props.addResponse();
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Fragment>
        <Modal
          isOpen={this.props.modal}
          toggle={this.toggle}
          className="modalSize-l"
        >
          <ModalHeader toggle={this.toggle}>
            <h4 className="font-weight-bold">
              {this.props.initialValues
                ? `${this.props.t("Common.UPDATE_RESPONSE")}`
                : `${this.props.t("Common.ADD_RESPONSE")}`}
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
                      name="title"
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Common.RESPONSE_TITLE") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.RESPONSE_REQUIRED"
                          ),
                        },
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      label="jobDescription"
                      name="body"
                      component={EditorFieldComponent}
                      value={
                        this.props.initialValues &&
                        this.props.initialValues.body
                          ? this.props.initialValues.body
                          : "<p></p>"
                      }
                      validate={[required]}
                      onChange={this.inputChange()}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="">
                <SubmitBtnLoader
                  label={
                    this.props.initialValues
                      ? `${this.props.t("Common.UPDATE_RESPONSE")}`
                      : `${this.props.t("Common.ADD_RESPONSE")}`
                  }
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

AddResponse = reduxForm({
  form: "AddResponse",
})(AddResponse);
function mapStateToProps(state) {
  return {
    addResponseSuccess: state.Response.addResponseSuccess,
    addResponseFailure: state.Response.addResponseFailure,
    updateResponseSuccess: state.Response.updateResponseSuccess,
    updateResponseFailure: state.Response.updateResponseFailure,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(AddResponse);
