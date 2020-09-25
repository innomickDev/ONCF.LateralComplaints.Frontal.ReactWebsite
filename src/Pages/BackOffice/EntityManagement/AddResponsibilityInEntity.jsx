import React, { Fragment } from "react";
import { reduxForm, Field } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { AvForm } from "availity-reactstrap-validation";
import {
  showSuccess,
  showError,
  getLangBasedDataLabel,
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
import { getAllSubCategories } from "../../../actions/subCategoryAction";
import { AddResponsabilityInEntity } from "../../../actions/responsibilityAction";

class AddResponsibilityInEntity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  componentDidMount = () => {
    this.props.dispatch(getAllSubCategories());
  };

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
        nextProps.addResponsibilityData &&
        nextProps.addResponsibilityData !== this.props.addResponsibilityData //-->for entities
      ) {
        showSuccess(this.props.t("Common.ADD_SUCCESS"));
        this.setState({ loading: false });
        this.toggle();
      }

      if (
        nextProps.isAddResponsibilityDataFail &&
        nextProps.isAddResponsibilityDataFail !==
          this.props.isAddResponsibilityDataFail //->for entities
      ) {
        showError(nextProps.isAddResponsibilityDataFail);
        this.setState({ loading: false });
      }
    }
  }

  onSubmit = (formProps) => {
    if (formProps.subCategoryId) {
      const requestData = {
        entityCode: this.props.entityId.toString(),
        subCategoryCode: formProps.subCategoryId.value.toString(),
      };

      this.props.dispatch(AddResponsabilityInEntity(requestData));
    } else {
      showError(this.props.t("ErrorMsg.TEXT_ONLY"));
      return;
    }
    this.setState({ loading: true });
  };
  toggle = () => {
    this.props.addResponsibilityInEntity();
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Fragment>
        <Modal isOpen={this.props.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <h4 className="font-weight-bold">
              {this.props.t("Common.ADD_RESPOSIBILITY_IN_ENTITY")}
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
                    <Label>
                      {this.props.t("Common.SELECT_RESPONSIBILITY_NAMES") + "*"}
                    </Label>
                    <Field
                      component={RenderSelectMultiInput}
                      isMulti={false}
                      name="subCategoryId"
                      type="select"
                      id="selectField"
                      options={this.state.subCategoryList}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="">
                <SubmitBtnLoader
                  label={this.props.t("Common.ADD_RESPOSIBILITY_IN_ENTITY")}
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

AddResponsibilityInEntity = reduxForm({
  form: "AddResponsibilityInEntity",
})(AddResponsibilityInEntity);
function mapStateToProps(state) {
  return {
    usersData: state.Account.usersData,
    subCategoryData: state.SubCategory.subCategoryData,
    addResponsibilityData: state.Responsibility.addResponsibilityData,
    isAddUserEntitySuccess: state.Entity.isAddUserEntitySuccess,
    isAddResponsibilityDataFail:
      state.Responsibility.isAddResponsibilityDataFail,
    isAddUserEntityFailure: state.Entity.isAddUserEntityFailure,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(AddResponsibilityInEntity);
