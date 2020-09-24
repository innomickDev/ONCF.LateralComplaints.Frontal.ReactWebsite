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
  getLangBasedItem,
  getLangBasedDataLabel,
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
import RenderSelectMultiInput from "../../Common/renderMultipleInput";
import {
  addSubSubCategory,
  updateSubSubCategory,
} from "../../../actions/subSubCategoryAction";
import { getCategories } from "../../../actions/categoryAction";
import { getAllSubCategories } from "../../../actions/subCategoryAction";

class AddSubSubCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectField: false,
    };

    //this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getAllSubCategories());
  }
  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.subCategoryData &&
        nextProps.subCategoryData !== this.props.subCategoryData
      ) {
        const subCategoryData = nextProps.subCategoryData;
        let subCategoryList = [];
        if (
          subCategoryData.subCategoryClients &&
          subCategoryData.subCategoryClients.length
        )
          subCategoryData.subCategoryClients.map((subCategory, key) => {
            subCategoryList.push({
              label: getLangBasedDataLabel(subCategory),
              value: subCategory.code,
              key: key,
            });
            this.setState({ subCategoryList });
          });
      }

      if (
        nextProps.isAddSubSubCategorySuccess &&
        nextProps.isAddSubSubCategorySuccess !==
          this.props.isAddSubSubCategorySuccess
      ) {
        showSuccess(this.props.t("Common.ADD_SUCCESS"));
        this.toggle();
      }
      if (
        nextProps.isAddSubSubCategoryFailure &&
        nextProps.isAddSubSubCategoryFailure !==
          this.props.isAddSubSubCategoryFailure
      ) {
        showError(nextProps.isAddSubSubCategoryFailure);
        this.setState({ loading: false });
      }
      if (
        nextProps.isUpdateSubSubCategorySuccess &&
        nextProps.isUpdateSubSubCategorySuccess !==
          this.props.isUpdateSubSubCategorySuccess
      ) {
        this.setState({ loading: false });
        this.toggle();
      }
      if (
        nextProps.isUpdateSubSubCategoryFailure &&
        nextProps.isUpdateSubSubCategoryFailure !==
          this.props.isUpdateSubSubCategoryFailure
      ) {
        showError(nextProps.isUpdateSubSubCategoryFailure);
        this.setState({ loading: false });
      }
    }
  }

  onSubmit = (formProps) => {
    if (
      formProps.subCategoryId &&
      formProps.labelArabic &&
      ARABIC_REGEX.test(formProps.labelArabic.trim()) &&
      formProps.labelEnglish.trim() &&
      ENG_REGEX.test(formProps.labelEnglish.trim()) &&
      formProps.labelFrench.trim() &&
      FRENCH_REGEX.test(formProps.labelFrench.trim())
    ) {
      const requestData = {
        labelEnglish: formProps.labelEnglish,
        labelFrench: formProps.labelFrench,
        labelArabic: formProps.labelArabic,
        subCategoryCode: parseInt(formProps.subCategoryId.value),
      };
      this.setState({ loading: true });
      if (!this.props.initialValues) {
        this.props.dispatch(addSubSubCategory(requestData));
      } else {
        requestData.code = this.props.initialValues.code;
        this.props.dispatch(updateSubSubCategory(requestData));
      }
    } else {
      showError(this.props.t("ErrorMsg.TEXT_ONLY"));
      return false;
    }
  };

  toggle = () => {
    this.props.updateSubSubCategory();
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
              {this.props.initialValues
                ? `${this.props.t("Common.UPDATE_SUB_SUB_CATEGORY")}`
                : `${this.props.t("Common.ADD_SUB_SUB_CATEGORY")}`}
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
                    <Label>{this.props.t("Common.SUB_CATEGORY") + "*"}</Label>
                    <Field
                      component={RenderSelectMultiInput}
                      name="subCategoryId"
                      type="select"
                      id="selectField"
                      isMulti={false}
                      options={this.state.subCategoryList}
                      required
                    />
                    {/* {this.state.selectField && (
                      <p className="text-danger">Alert msg</p>
                    )} */}
                  </FormGroup>
                  <FormGroup>
                    <AvField
                      name="labelEnglish"
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Common.SUB_SUB_CATEGORY_EN") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.SUB_SUB_CATEGORY_REQUIRED"
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
                      label={this.props.t("Common.SUB_SUB_CATEGORY_FR") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.SUB_SUB_CATEGORY_NAME_REQUIRED_FR"
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
                      label={this.props.t("Common.SUB_SUB_CATEGORY_AR") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.SUB_SUB_CATEGORY_NAME_REQUIRED_AR"
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
                      ? `${this.props.t("Common.UPDATE_SUB_SUB_CATEGORY")}`
                      : `${this.props.t("Common.ADD_SUB_SUB_CATEGORY")}`
                  }
                  // label="Add SubCategories"
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

AddSubSubCategories = reduxForm({
  form: "AddSubCategories",
  //validate,
  // asyncValidate,
})(AddSubSubCategories);
function mapStateToProps(state) {
  return {
    subCategoryData: state.SubCategory.subCategoryData,
    isAddSubSubCategorySuccess: state.SubSubCategory.isAddSubSubCategorySuccess,
    isAddSubSubCategoryFailure: state.SubSubCategory.isAddSubSubCategoryFailure,
    isUpdateSubSubCategorySuccess:
      state.SubSubCategory.isUpdateSubSubCategorySuccess,
    isUpdateSubSubCategoryFailure:
      state.SubSubCategory.isUpdateSubSubCategoryFailure,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(AddSubSubCategories);
