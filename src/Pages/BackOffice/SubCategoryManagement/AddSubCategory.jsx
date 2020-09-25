import React, { Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { renderTextField } from "../../Common/RenderTextField";
import {
  showSuccess,
  showError,
  getLangBasedDataLabel,
  ENG_REGEX,
  FRENCH_REGEX,
  ARABIC_REGEX,
} from "../../Helpers/utils";
import SubmitBtnLoader from "../../Common/ButtonLoader";
import {
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
  addSubCategory,
  updateSubCategory,
} from "../../../actions/subCategoryAction";
import { getCategories } from "../../../actions/categoryAction";
import { formatRelativeWithOptions } from "date-fns/fp";

class AddSubCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      categoryList: [],
    };
  }

  componentDidMount = () => {
    this.props.dispatch(getCategories());
  };
  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.getCategoriesData &&
        nextProps.getCategoriesData !== this.props.getCategoriesDatag
      ) {
        const getCategoriesData = nextProps.getCategoriesData;
        let categoryList = [];
        if (
          getCategoriesData.categoryClients &&
          getCategoriesData.categoryClients.length
        )
          getCategoriesData.categoryClients.map((category, key) => {
            categoryList.push({
              label: getLangBasedDataLabel(category),
              value: category.code,
              key: key,
            });
            this.setState({ categoryList });
          });
      }

      if (
        nextProps.isAddSubCategorySuccess &&
        nextProps.isAddSubCategorySuccess !== this.props.isAddSubCategorySuccess
      ) {
        showSuccess(this.props.t("Common.ADD_SUCCESS"));
        this.setState({ loading: false });
        this.toggle();
      }
      if (
        nextProps.isAddSubCategoryFailure &&
        nextProps.isAddSubCategoryFailure !== this.props.isAddSubCategoryFailure
      ) {
        showError(nextProps.isAddSubCategoryFailure);
        this.setState({ loading: false });
      }
      if (
        nextProps.isUpdateSubCategorySuccess &&
        nextProps.isUpdateSubCategorySuccess !==
          this.props.isUpdateSubCategorySuccess
      ) {
        this.setState({ loading: false });
        this.toggle();
      }
      if (
        nextProps.isUpdateSubCategoryFailure &&
        nextProps.isUpdateSubCategoryFailure !==
          this.props.isUpdateSubCategoryFailure
      ) {
        showError(nextProps.isUpdateSubCategoryFailure);
        this.setState({ loading: false });
      }
    }
  }

  onSubmit = (formProps) => {
    if (
      formProps.categoryId &&
      formProps.labelArabic &&
      ARABIC_REGEX.test(formProps.labelArabic.trim()) &&
      formProps.labelEnglish.trim() &&
      ENG_REGEX.test(formProps.labelEnglish.trim()) &&
      formProps.labelFrench.trim() &&
      FRENCH_REGEX.test(formProps.labelFrench.trim() && formProps.labelFrench)
    ) {
      const requestData = {
        labelEnglish: formProps.labelEnglish,
        labelFrench: formProps.labelFrench,
        labelArabic: formProps.labelArabic,
        categoryCode: parseInt(formProps.categoryId.value),
      };
      this.setState({ loading: true });
      if (!this.props.initialValues) {
        this.props.dispatch(addSubCategory(requestData));
      } else {
        requestData.code = this.props.initialValues.code;
        this.props.dispatch(updateSubCategory(requestData));
      }
    } else {
      showError(this.props.t("ErrorMsg.TEXT_ONLY"));
      return formatRelativeWithOptions;
    }
  };

  toggle = () => {
    this.props.updateSubCategory();
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Fragment>
        <Modal isOpen={this.props.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <h4 className="font-weight-bold">
              {this.props.initialValues
                ? `${this.props.t("Common.UPDATE_SUB_CATEGORY")}`
                : `${this.props.t("Common.ADD_SUB_CATEGORY")}`}
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
                    <Label>{this.props.t("Common.CATEGORY_NAME") + "*"}</Label>
                    <Field
                      component={RenderSelectMultiInput}
                      name="categoryId"
                      type="select"
                      id="selectField"
                      isMulti={false}
                      options={this.state.categoryList}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <AvField
                      name="labelEnglish"
                      tag={Field}
                      component={renderTextField}
                      label={this.props.t("Common.SUB_CATEGORY_EN") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.SUB_CATEGORY_REQUIRED"
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
                      label={this.props.t("Common.SUB_CATEGORY_FR") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.SUB_CATEGORY_NAME_REQUIRED_FR"
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
                      label={this.props.t("Common.SUB_CATEGORY_AR") + "*"}
                      type="text"
                      validate={{
                        required: {
                          value: true,
                          errorMessage: this.props.t(
                            "ErrorMsg.SUB_CATEGORY_NAME_REQUIRED_AR"
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
                      ? `${this.props.t("Common.UPDATE_SUB_CATEGORY")}`
                      : `${this.props.t("Common.ADD_SUB_CATEGORY")}`
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

AddSubCategories = reduxForm({
  form: "AddSubCategories",
})(AddSubCategories);
function mapStateToProps(state) {
  return {
    isAddSubCategorySuccess: state.SubCategory.isAddSubCategorySuccess,
    isAddSubCategoryFailure: state.SubCategory.isAddSubCategoryFailure,
    // update
    isUpdateSubCategorySuccess: state.SubCategory.isUpdateSubCategorySuccess,
    isUpdateSubCategoryFailure: state.SubCategory.isUpdateSubCategoryFailure,
    getCategoriesData: state.Category.getCategoriesData,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(AddSubCategories);
