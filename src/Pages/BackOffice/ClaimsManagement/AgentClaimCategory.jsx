import React, { Fragment, Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { translate } from "react-multi-lang";
import moment from "moment";
import _ from "lodash";
import {
  Row,
  Col,
  Card,
  FormGroup,
  Container,
  CardHeader,
  Label,
  Breadcrumb,
  BreadcrumbItem,
  FormText,
} from "reactstrap";
import TrainStImg from "../../../assets/img/svg/train-station.svg";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {
  renderTextField,
  renderSelectField,
} from "../../Common/RenderTextField";
import {
  getBase64,
  showError,
  showSuccess,
  getLangBasedItems,
} from "../../Helpers/utils";
import { getCategories } from "../../../actions/categoryAction";
import { getSubCategories } from "../../../actions/subCategoryAction";
import { getSubSubCategories } from "../../../actions/subSubCategoryAction";
import { addClaimByAgent } from "../../../actions/claimAction";
import SubmitBtnLoader from "../../Common/ButtonLoader";
import MainLoader from "../../Common/Loader";
// import _ from "lodash";
class ClaimsCategoryAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddMember: false,
      loading: false,
      showSubSubCategory: false,
      mainLoader: true,
    };
  }
  // hgetting categories
  componentDidMount = () => {
    this.props.dispatch(getCategories());
  };

  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.getCategoriesData &&
      nextProps.getCategoriesData !== this.props.getCategoriesData
    ) {
      this.setState({
        getCategoriesData: nextProps.getCategoriesData,
        mainLoader: false,
      });
    }
    if (
      nextProps.subCategoryDataByCategory &&
      nextProps.subCategoryDataByCategory !==
        this.props.subCategoryDataByCategory
    ) {
      this.setState({
        subCategoryDataByCategory: nextProps.subCategoryDataByCategory,
        mainLoader: false,
      });
    }
    if (
      nextProps.subSubCategoryDataBySubCategory &&
      nextProps.subSubCategoryDataBySubCategory !==
        this.props.subSubCategoryDataBySubCategory
    ) {
      this.setState({
        subSubCategoryDataBySubCategory:
          nextProps.subSubCategoryDataBySubCategory,
        mainLoader: false,
      });
    }
    if (
      nextProps.addAgentClaimData &&
      nextProps.addAgentClaimData !== this.props.addAgentClaimData
    ) {
      this.props.history.push(
        `/dashboards/claim-details?code=${nextProps.addAgentClaimData.code}`
      );
      showSuccess(this.props.t("Common.ADD_SUCCESS"));
      this.setState({
        loading: false,
      });
    }
    if (
      nextProps.addAgentClaimDataError &&
      nextProps.addAgentClaimDataError !== this.props.addAgentClaimDataError
    ) {
      showError(nextProps.addAgentClaimDataError);
      this.setState({
        loading: false,
      });
    }
    if (
      nextProps.subCategoryDataByCategoryError &&
      nextProps.subCategoryDataByCategoryError !==
        this.props.subCategoryDataByCategoryError
    ) {
      this.setState({
        loading: false,
      });
    }
    if (
      nextProps.subSubCategoryError &&
      nextProps.subSubCategoryError !== this.props.subSubCategoryError
    ) {
      this.setState({
        loading: false,
      });
    }
  };

  /*common function to show categories */
  showOptions = (data) => {
    if (data && data.length) {
      return data.map((categories, key) => {
        return (
          <option value={categories.value} key={key}>
            {categories.label}
          </option>
        );
      });
    }
  };
  // get sub category by categoryID
  getSubCategoriesByCategory = (e) => {
    if (e.target.value !== "0") {
      const category = _.find(this.state.getCategoriesData.categoryClients, {
        code: e.target.value,
      });

      this.setState({ showSubSubCategory: category.isRequiredSubSubCategory });
      this.props.dispatch(getSubCategories(e.target.value));
    } else {
      this.setState({
        getSubCategoriesByCategory: [],
      });
    }
  };
  //get Sub Sub-Category BY SubCategoryID
  getSubSubCategoryBYSubCategory = (e) => {
    this.props.dispatch(getSubSubCategories(e.target.value));
  };

  handleClick = () => {
    this.refs.fileInput.click();
  };
  /**call this function to select file (upload file) */
  handleFileChange = (e) => {
    this.currentFile = e.target.files[0].name;
    const extensions = ["jpg", "jpeg", "bmp", "gif", "png", "pdf"];
    const fileExtension = e.target.files[0].name.split(".").pop();
    const fileSize = e.target.files[0].size;
    if (
      fileSize < 1000000 &&
      extensions.includes(fileExtension.toLowerCase())
    ) {
      getBase64(e.target.files[0], (result) => {
        this.setState({ currentPath: result });
      });
    } else {
      showError(this.props.t("Common.FILE_ERROR"));
    }
  };
  // submit form
  onSubmit = (formProps) => {
    if (
      formProps.categoryId &&
      formProps.subcategory &&
      formProps.objectOfClaim
    ) {
      const trainDetails = JSON.parse(localStorage.getItem("trainDetails"));
      const boGRCuserDetails = JSON.parse(
        localStorage.getItem("boGRCuserDetails")
      );
      this.setState({ loading: true });
      const claimData = {
        departureStationCode: trainDetails.departureStation,
        arrivalStationCode: trainDetails.arrivalStation,
        trainNumber: trainDetails.trainNumber,
        travelDate: `${moment(new Date(trainDetails.selectedDate).getTime())}`,
        userEmail: trainDetails.email,
        categoryCode: formProps.categoryId,
        subCategoryCode: formProps.subcategory,

        claimSubject: formProps.objectOfClaim,
        claimDetails: formProps.bodyOfClaim,
        ticketAttachment: trainDetails.currentPath.split(",")[1],
        claimAttachment: this.state.currentPath
          ? this.state.currentPath.split(",")[1]
          : "",

        isONCFUser: false,
        isAttachmentUpdate: true,
      };
      if (formProps.subSubCategory) {
        claimData.subSubCategoryCode = formProps.subSubCategory;
      }

      this.props.dispatch(addClaimByAgent(claimData, this.formValue));
    } else {
      showError(this.props.t("Common.REQUIRED_FIELDS"));
      this.setState({ loading: false });
    }
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <Fragment>
        <MainLoader className="text-center" loading={this.state.mainLoader} />
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div className="">
            <div className="app-page-title">
              <div className="page-title-wrapper">
                <div className="page-title-heading">
                  <div className="page-title-icon">
                    <i className="pe-7s-medal icon-gradient bg-tempting-azure"></i>
                  </div>
                  <div>{this.props.t("Common.CLAIM_MGMT")}</div>
                </div>
                <div className="page-title-actions">
                  <Breadcrumb>
                    <BreadcrumbItem>
                      <a href="javascript:void(0);">
                        <FontAwesomeIcon icon={faHome} />
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <a href="javascript:void(0);">
                        {this.props.t("Common.CLAIM_MGMT")}
                      </a>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>
          <Container fluid className="claim-block c-h">
            <Row className="">
              <Col md={12} className="mx-auto">
                <Card className="main-card mb-3">
                  <CardHeader className="c-header">
                    <Row className="text-center w-100 text-light">
                      {/* <Col md={3} className="">
                        <i
                          className="float-left fas fa-arrow-circle-left fa-2x py-3"
                          title="Back"
                          onClick={(e) => this.props.history.goBack()}
                        ></i>
                        &nbsp;
                      </Col> */}
                      <Col md={12}>
                        <h5 className=" text-canter py-3  font-weight-bold rounded">
                          {this.props.t("Category.CHOOSE_CATEGORY")}
                        </h5>
                      </Col>
                    </Row>
                  </CardHeader>
                  {/* <CardBody> */}
                  <Card className="pt-2">
                    {/* <Nav pills fill>
                      {this.getCategories(this.state.getCategoriesData)}
                    </Nav> */}
                    <AvForm
                      className="px-5 my-3"
                      noValidate
                      onSubmit={handleSubmit(this.onSubmit)}
                    >
                      <Row>
                        <Col md={10} className="mx-auto">
                          <div>
                            <FormGroup>
                              <Label>
                                {this.props.t("Common.CATEGORY") + "*"}
                              </Label>
                              <Field
                                component={renderSelectField}
                                className="form-control"
                                name="categoryId"
                                type="select"
                                id="selectField"
                                required
                                onChange={(e) =>
                                  this.getSubCategoriesByCategory(e)
                                }
                              >
                                <option value="0">
                                  {this.props.t("Category.CATEGORY")}
                                </option>
                                {this.showOptions(
                                  this.state.getCategoriesData
                                    ? getLangBasedItems(
                                        this.state.getCategoriesData
                                          .categoryClients
                                      )
                                    : null
                                )}
                              </Field>
                            </FormGroup>
                            <FormGroup>
                              <Label for="examplePassword">
                                {this.props.t("Category.CHOOSE_CATEGORY")}
                              </Label>
                              <Field
                                name="subcategory"
                                type="select"
                                component={renderSelectField}
                                placeholder={""}
                                className="form-control"
                                id="subCategoryId"
                                onChange={(e) =>
                                  this.getSubSubCategoryBYSubCategory(e)
                                }
                              >
                                <option value="0">
                                  {this.props.t("Category.S_SUB_CATEGORY")}
                                </option>
                                {this.showOptions(
                                  this.state.subCategoryDataByCategory
                                    ? getLangBasedItems(
                                        this.state.subCategoryDataByCategory
                                          .subCategoryClients
                                      )
                                    : null
                                )}
                              </Field>
                            </FormGroup>
                            {this.state.showSubSubCategory && (
                              <FormGroup>
                                <Label for="examplePassword">
                                  {this.props.t("Category.SUB_SUB_CATEGORY")}
                                </Label>
                                <Field
                                  name="subSubCategory"
                                  type="select"
                                  component={renderSelectField}
                                  placeholder={""}
                                  className="form-control"
                                >
                                  <option value="0">
                                    {this.props.t(
                                      "Category.S_SUB_SUB_CATEGORY"
                                    )}
                                  </option>
                                  {this.showOptions(
                                    this.state.subSubCategoryDataBySubCategory
                                      ? getLangBasedItems(
                                          this.state
                                            .subSubCategoryDataBySubCategory
                                            .subSubCategoryClients
                                        )
                                      : null
                                  )}
                                </Field>
                              </FormGroup>
                            )}

                            <FormGroup>
                              <AvField
                                name="objectOfClaim"
                                tag={Field}
                                component={renderTextField}
                                label={this.props.t("Category.CLAIM_OBJECT")}
                                type="text"
                                validate={{
                                  required: {
                                    value: true,
                                    errorMessage: this.props.t(
                                      "ErrorMsg.CLAIM_SUBJECT_ERROR"
                                    ),
                                  },
                                }}
                              />
                            </FormGroup>
                            <FormGroup>
                              <AvField
                                name="bodyOfClaim"
                                tag={Field}
                                component={"textarea"}
                                label={this.props.t("Category.CLAIM_BODY")}
                                type="textarea"
                                className="form-control"
                              />
                            </FormGroup>
                            <FormGroup>
                              <div>
                                <label
                                  className="file-upload__label"
                                  onClick={() => this.handleClick()}
                                >
                                  <i className="fa fa-paperclip text-dark"></i>
                                  <span className=" text-dark">
                                    &nbsp; {this.props.t("Claim.FILE_ATTACH")}
                                  </span>
                                </label>
                                <input
                                  type="file"
                                  name="file"
                                  id="file"
                                  ref="fileInput"
                                  multiple
                                  className="CiList-inputs form-control-file"
                                  onChange={(e) => this.handleFileChange(e)}
                                  style={{ display: "none" }}
                                />{" "}
                              </div>
                              <span>{this.currentFile}</span>
                            </FormGroup>
                            <br />
                            <FormText color="muted text-center">
                              {this.props.t("Claim.MAX_SIZE")}
                            </FormText>
                            <div className="text-center">
                              <SubmitBtnLoader
                                label={this.props.t("Claim.SEND")}
                                className="btn btn-lg btn-primary px-5 btn-pill"
                                loading={this.state.loading}
                                submitting={""}
                                type="submit"
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </AvForm>
                  </Card>
                  {/* </CardBody> */}
                </Card>
              </Col>
            </Row>
          </Container>
        </ReactCSSTransitionGroup>
        {/* <FooterComponent /> */}
      </Fragment>
    );
  }
}

ClaimsCategoryAgent = reduxForm({
  form: "ClaimsCategoryAgent",
})(ClaimsCategoryAgent);

function mapStateToProps(state) {
  return {
    getCategoriesData: state.Category.getCategoriesData,
    subCategoryDataByCategory: state.SubCategory.subCategoryDataByCategory,
    subSubCategoryDataBySubCategory:
      state.SubSubCategory.subSubCategoryDataBySubCategory,
    // addClaimData: state.Claim.addClaimData,
    // add claim
    addAgentClaimDataError: state.Claim.addAgentClaimDataError,
    addAgentClaimData: state.Claim.addAgentClaimData,
    subCategoryDataByCategoryError:
      state.SubCategory.subCategoryDataByCategoryError,
    subSubCategoryError: state.SubSubCategory.subSubCategoryError,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ClaimsCategoryAgent);
