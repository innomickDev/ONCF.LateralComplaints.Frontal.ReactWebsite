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

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.isAddCategorySuccess &&
        nextProps.isAddCategorySuccess !== this.props.isAddCategorySuccess
      ) {
        this.setState({ loading: false });
        showSuccess(this.props.t("Common.ADD_SUCCESS"));
        this.toggle();
      }
      if (
        nextProps.isAddCategoryFailure &&
        nextProps.isAddCategoryFailure !== this.props.isAddCategoryFailure
      ) {
        showError(nextProps.isAddCategoryFailure);
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
        nextProps.isAddeCategoryNetworkError &&
        nextProps.isAddeCategoryNetworkError !==
          this.props.isAddeCategoryNetworkError
      ) {
        this.setState({ loading: false });
        showError(this.props.t("Common.SOMETHING_WENT_WRONG"));
      }
    }
  }

  onSubmit = (formProps) => {
    if (
      formProps.labelEnglish.trim() &&
      formProps.labelArabic.trim() &&
      ARABIC_REGEX.test(formProps.labelArabic.trim()) &&
      ENG_REGEX.test(formProps.labelEnglish.trim()) &&
      formProps.labelFrench.trim() &&
      FRENCH_REGEX.test(formProps.labelFrench.trim())
    ) {
      this.setState({ loading: true });
      if (!this.props.initialValues) {
        this.props.dispatch(addCategory(formProps));
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
        <Modal
          isOpen={this.props.modal}
          toggle={this.toggle}
          // className="modalSize"
        >
          <ModalHeader toggle={this.toggle}>
            <h4 className="font-weight-bold">
              {this.props.initialValues
                ? `${this.props.t("Common.UPDATE_CATEGORY")}`
                : `${this.props.t("Common.ADD_CATEGORY")}`}
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
                      name="labelEnglish"
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Common.CATEGORY_EN") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.CATEGORY_REQUIRED"
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
                      name="labelFrench"
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Common.CATEGORY_FR") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.CATEGORY_NAME_REQUIRED_FR"
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
                      name="labelArabic"
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Common.CATEGORY_AR") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.CATEGORY_NAME_REQUIRED_AR"
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
                  <FormGroup>
                    <Field
                      type="checkbox"
                      name="isRequiredSubSubCategory"
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
                      ? `${this.props.t("Common.UPDATE_CATEGORY")}`
                      : `${this.props.t("Common.ADD_CATEGORY")}`
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

AddCategory = reduxForm({
  form: "AddCategory",
  //validate,
  // asyncValidate,
})(AddCategory);

function mapStateToProps(state) {
  return {
    isAddCategorySuccess: state.Category.isAddCategorySuccess,
    isAddCategoryFailure: state.Category.isAddCategoryFailure,
    isUpdateCategorySuccess: state.Category.isUpdateCategorySuccess,
    isUpdateCategoryFailure: state.Category.isUpdateCategoryFailure,
    //
    isAddeCategoryNetworkError: state.Category.isAddeCategoryNetworkError,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(AddCategory);
