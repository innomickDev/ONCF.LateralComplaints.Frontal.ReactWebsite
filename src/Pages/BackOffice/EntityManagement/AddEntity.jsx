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

import { addEntity, updateEntity } from "../../../actions/entityAction";

class AddEntity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.addEntityData &&
        nextProps.addEntityData !== this.props.addEntityData //--->for entity
      ) {
        showSuccess(this.props.t("Common.ADD_SUCCESS"));
        this.toggle();
        this.setState({
          loading: false,
        });
      }

      if (
        nextProps.isAddEntityDataFail &&
        nextProps.isAddEntityDataFail !== this.props.isAddEntityDataFail //-->for entites
      ) {
        this.setState({
          loading: false,
        });
        showError(nextProps.isAddEntityDataFail);
      }

      // update
      if (
        nextProps.isUpdateEntitySuccess &&
        nextProps.isUpdateEntitySuccess !== this.props.isUpdateEntitySuccess //-->for entities
      ) {
        this.setState({
          loading: false,
        });
        showSuccess(this.props.t("Common.UPDATE_SUCCESS"));
        this.toggle();
      }

      if (
        nextProps.isUpdateEntityError &&
        nextProps.isUpdateEntityError !== this.props.isUpdateEntityError //-->for entities
      ) {
        this.setState({
          loading: false,
        });
        showError(nextProps.isUpdateEntityError);
      }
    }
  }

  onSubmit = (formProps) => {
    const formData = {
      isDefault: formProps.isDefault ? true : false,
      entityName: formProps.entityName,
      code: formProps.code,
    };
    if (formProps.entityName.trim()) {
      this.setState({ loading: true });
      if (!this.props.initialValues) {
        this.props.dispatch(addEntity(formData));
      } else {
        this.props.dispatch(updateEntity(formData));
      }
    } else {
      showError(this.props.t("Common.REQUIRED_FIELDS"));
      return false;
    }
  };

  toggle = () => {
    this.props.addEntity();
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
                ? `${this.props.t("Common.UPDATE_ENTITIY")}`
                : `${this.props.t("Common.ADD_ENTITIY")}`}
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
                      name="entityName"
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Common.ENTITY_NAME") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.ENTITY_NAME_REQUIRED"
                          ),
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
                  {/* <FormGroup>
                    <Field
                      label={this.props.t("Common.DEFAULT")}
                      type="checkbox"
                      value="1"
                      name="isDefault"
                      component={Checkbox}
                    />
                  </FormGroup> */}
                </Col>
              </Row>
              <div className="">
                <SubmitBtnLoader
                  label={
                    this.props.initialValues
                      ? `${this.props.t("Common.UPDATE_GROUP_BTN")}`
                      : `${this.props.t("Common.ADD_ENTITIY")}`
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

AddEntity = reduxForm({
  form: "AddStations",
  //validate,
  // asyncValidate,
})(AddEntity);
function mapStateToProps(state) {
  return {
    addEntityData: state.Entity.addEntityData,
    isAddEntityDataFail: state.Entity.isAddEntityDataFail,
    isUpdateEntitySuccess: state.Entity.isUpdateEntitySuccess,
    isUpdateEntityError: state.Entity.isUpdateEntityError,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(AddEntity);
