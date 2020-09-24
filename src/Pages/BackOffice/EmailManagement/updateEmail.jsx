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
import { updateEmailTemplate } from "../../../actions/emailTemplateAction";
import EditorFieldComponent from "../../Common/RenderTextEditior";

class UpdateEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.updateEmailData &&
        nextProps.updateEmailData !== this.props.updateEmailData
      ) {
        showSuccess(this.props.t("Common.UPDATE_SUCCESS"));
        this.toggle();
        this.setState({
          loading: false,
        });
      }

      if (
        nextProps.updateEmailError &&
        nextProps.updateEmailError !== this.props.updateEmailError
      ) {
        this.setState({
          loading: false,
        });
        showError(nextProps.updateEmailError);
      }
    }
  }
  inputChange = (value) => {
  
  };
  onSubmit = (formProps) => {
    this.setState({ loading: true });

    //return false;
    const requestData = {
      code: this.props.initialValues.id,
      title: formProps.title,
      body: formProps.body,
    };
   
    if (formProps.body.trim() != "<p></p>" && formProps.title.trim()) {
      if (this.props.initialValues) {
        this.props.dispatch(updateEmailTemplate(requestData));
      }
    } else {
      showError(this.props.t("Common.REQUIRED_FIELDS"));
      this.setState({ loading: false });
      return false;
    }
  };

  toggle = () => {
    this.props.updateEmailBody();
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
              {this.props.t("Common.UPDATE_EMAIL")}
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
                      label={this.props.t("Common.EMAIL_TITLE") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t("ErrorMsg.TITLE_ERROR"),
                        },
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Field
                      label="jobDescription"
                      name="body"
                      component={EditorFieldComponent}
                      value={this.props.initialValues.body || ""}
                      validate={[required]}
                      onChange={this.inputChange()}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="">
                <SubmitBtnLoader
                  label={this.props.t("Common.UPDATE_GROUP_BTN")}
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

UpdateEmail = reduxForm({
  form: "AddResponse",
  //validate,
  // asyncValidate,
})(UpdateEmail);
function mapStateToProps(state) {
  
  return {
    updateEmailData: state.Email.updateEmailData,
    updateEmailError: state.Email.updateEmailError,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(UpdateEmail);
