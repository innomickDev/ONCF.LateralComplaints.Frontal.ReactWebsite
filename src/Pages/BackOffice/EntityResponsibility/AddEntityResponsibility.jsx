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
  getLangBasedItem,
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
import { AddResponsabilityInEntity } from "../../../actions/responsibilityAction";
import { getCategories } from "../../../actions/categoryAction";
import { formatRelativeWithOptions } from "date-fns/fp";

class AddEntityResponsibility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      categoryList: [],
    };

    //this.toggle = this.toggle.bind(this);
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
        nextProps.addResponsibilityData &&
        nextProps.addResponsibilityData !== this.props.addResponsibilityData
      ) {
        showSuccess(this.props.t("Common.ADD_SUCCESS"));
        this.setState({ loading: false });
        this.toggle();
      }
      if (
        nextProps.isAddResponsibilityDataFail &&
        nextProps.isAddResponsibilityDataFail !==
          this.props.isAddResponsibilityDataFail
      ) {
        showError(nextProps.isAddResponsibilityDataFail);
        this.setState({ loading: false });
      }
    }
  }

  onSubmit = (formProps) => {
    if (formProps.subcategory && formProps.entity) {
      const requestData = {
        labelEnglish: formProps.labelEnglish,
        labelFrench: formProps.labelFrench,
        labelArabic: formProps.labelArabic,
        categoryCode: parseInt(formProps.categoryId.value),
      };
      this.setState({ loading: true });
      if (!this.props.initialValues) {
        this.props.dispatch(AddResponsabilityInEntity(requestData));
      } else {
        requestData.code = this.props.initialValues.code;
        this.props.dispatch(updateSubCategory(requestData));
      }
    } else {
      showError(this.props.t("ErrorMsg.TEXT_ONLY"));
    }
  };

  toggle = () => {
    this.props.updateSubCategory();
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
                    <Label>{this.props.t("Sidebar.SUB_CATEGORY") + "*"}</Label>
                    <Field
                      component={RenderSelectMultiInput}
                      name="subcategory"
                      type="select"
                      id="selectField"
                      isMulti={false}
                      options={this.state.categoryList}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>{this.props.t("Common.ENTITY") + "*"}</Label>
                    <Field
                      component={RenderSelectMultiInput}
                      name="entity"
                      type="select"
                      id="selectField"
                      isMulti={false}
                      options={this.state.categoryList}
                      required
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

AddEntityResponsibility = reduxForm({
  form: "AddEntityResponsibility",
  //validate,
  // asyncValidate,
})(AddEntityResponsibility);
function mapStateToProps(state) {
  return {
    isAddSubCategorySuccess: state.SubCategory.isAddSubCategorySuccess,
    addResponsibilityData: state.Responsibility.addResponsibilityData,
    isAddResponsibilityDataFail:
      state.Responsibility.isAddResponsibilityDataFail,
    isAddSubCategoryFailure: state.SubCategory.isAddSubCategoryFailure,
    subCategoryNetworkError: state.SubCategory.subCategoryNetworkError,
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
)(AddEntityResponsibility);
