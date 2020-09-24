import React, { Fragment, Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { translate } from "react-multi-lang";
import { AvForm } from "availity-reactstrap-validation";
import _ from "lodash";
import RenderSelectMultiInput from "../../../Common/renderMultipleInput";
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  FormGroup,
  Breadcrumb,
  Label,
  BreadcrumbItem,
  Button,
  Collapse,
} from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  getFileExtension,
  showError,
  showSuccess,
  getLangBasedDataLabel,
  dateTimeFormat,
  simpleDateFormat,
  canManage,
  permissions,
  getLangBasedStationLabel,
} from "../../../Helpers/utils";
import {
  getClaimsDetailsById,
  rejectClaim,
  getTicketAttachment,
  getClaimAttachment,
  progressClaim,
  approveClaim,
} from "../../../../actions/claimAction";
import {
  getResponse,
  customizedResponse,
} from "../../../../actions/responseAction";
import qString from "query-string";
import SubmitBtnLoader from "../../../Common/ButtonLoader";
import { required } from "../../../../utils";

import MainLoader from "../../../Common/Loader";
import EditorFieldComponent from "../../../Common/RenderTextEditior";

const boGRCuserDetails = JSON.parse(localStorage.getItem("boGRCuserDetails"));

class ProcessAgentClaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddMember: false,
      loading: false,
      loadingApprove: false,
      loadingProgress: false,
      loadingReject: false,
      showSubSubCategory: false,
      showResponse: null,
      showTicketAttchment: false,
      mainLoader: true,
      getTicketAttachment: null,
      attachments: [],
      claimStatus: 2, //todo
      hideRejectbtn: true,
      hideBtn: true,
      hideApprove: true,
    };
    this.params = qString.parse(this.props.location.search);
  }

  componentDidUpdate(prevState) {
    const params = qString.parse(this.props.location.search);

    if (this.state.claimId !== params.claimcode) {
      this.setState({
        claimId: params.claimcode,
      });
      this.props.dispatch(getClaimsDetailsById(params.claimcode));
    }
  }
  // hgetting categories
  componentDidMount = () => {
    const params = qString.parse(this.props.location.search);
    this.setState({
      claimId: params.claimcode,
    });
    if (params && params.claimId) {
      this.props.dispatch(getClaimsDetailsById(params.claimId));
      // response data
      this.props.dispatch(getResponse());
    } else if (params && params.claimcode) {
      this.props.dispatch(getClaimsDetailsById(params.claimcode));
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.customResponseData &&
      nextProps.customResponseData !== this.props.customResponseData
    ) {
      this.props.change("body", nextProps.customResponseData.body);
      this.setState({
        customResponseData: nextProps.customResponseData,
        mainLoader: false,
      });
    }
    if (
      nextProps.getClaimsDataById &&
      nextProps.getClaimsDataById !== this.props.getClaimsDataById
    ) {
      this.setState({
        getCategoriesData: nextProps.getClaimsDataById,
        mainLoader: false,
      });
    }
    if (
      nextProps.getTicketAttachmentData &&
      nextProps.getTicketAttachmentData !== this.props.getTicketAttachmentData
    ) {
      this.setState({
        getTicketAttachment: nextProps.getTicketAttachmentData.attachment
          ? getFileExtension(
              nextProps.getTicketAttachmentData.attachment.slice(0, 5)
            ) + nextProps.getTicketAttachmentData.attachment
          : "",
        // showTicketAttchment: true,
        mainLoader: false,
      });
      setTimeout(
        function() {
          document.getElementById("ticket") &&
            document.getElementById("ticket").click();
          this.setState({
            getTicketAttachment: null,
          });
        }.bind(this),
        1000
      );
    }
    if (
      nextProps.ClaimAttachmentData &&
      nextProps.ClaimAttachmentData !== this.props.ClaimAttachmentData
    ) {
      if (
        nextProps.ClaimAttachmentData.attachment &&
        nextProps.ClaimAttachmentData.attachment !== ""
      ) {
        this.setState({
          ClaimAttachmentData: nextProps.ClaimAttachmentData.attachment
            ? getFileExtension(
                nextProps.ClaimAttachmentData.attachment.slice(0, 5)
              ) + nextProps.ClaimAttachmentData.attachment
            : false,
        });
        setTimeout(
          function() {
            document.getElementById("claimId") &&
              document.getElementById("claimId").click();
            this.setState({
              ClaimAttachmentData: null,
            });
          }.bind(this),
          1000
        );
      } else {
        showError(this.props.t("ErrorMsg.NO_CLAIM_ATTACHMENT"));
      }
    }
    if (
      nextProps.responseData &&
      nextProps.responseData !== this.props.responseData
    ) {
      this.setState({
        loadingReject: false,
        // showResponse: false,
        // hideBtn: false,
      });

      let responses = [];
      if (
        nextProps.responseData.responseClients &&
        nextProps.responseData.responseClients.length
      )
        nextProps.responseData.responseClients.map((response, key) => {
          responses.push({
            value: response.code,
            label: response.title,
          });
        });
      responses.push({
        value: 0,
        label: "Other",
      });

      this.setState({ responses });
    }
    if (
      nextProps.isAnswerSuccess &&
      nextProps.isAnswerSuccess !== this.props.isAnswerSuccess
    ) {
      showSuccess(this.props.t("ErrorMsg.ANSWERED_CLAIM"));
      this.setState({
        loading: false,
      });
      this.props.history.push("/dashboards/claim-lists");
    }
    if (
      nextProps.isAnswerError &&
      nextProps.isAnswerError !== this.props.isAnswerError
    ) {
      showError(this.props.t("Common.SOMETHING_WENT_WRONG"));
      this.setState({
        loading: false,
      });
    }

    if (
      nextProps.responseError &&
      nextProps.responseError !== this.props.responseError
    ) {
      showError(this.props.t("Common.SOMETHING_WENT_WRONG"));
    }

    if (
      nextProps.getClaimAttachment &&
      nextProps.getClaimAttachment !== this.props.getClaimAttachment
    ) {
      this.setState({ getClaimAttachment: nextProps.getClaimAttachment });
    }
    // claim progress status
    if (
      nextProps.isClaimProgressSuccess &&
      nextProps.isClaimProgressSuccess !== this.props.isClaimProgressSuccess
    ) {
      this.setState({ loadingProgress: false });

      // when success
      const params = qString.parse(this.props.location.search);
      this.props.dispatch(getClaimsDetailsById(params.claimId));
      // response data
      this.props.dispatch(getResponse());
    }
    if (
      nextProps.isClaimProgressError &&
      nextProps.isClaimProgressError !== this.props.isClaimProgressError
    ) {
      this.setState({ loadingProgress: false });
      showError(nextProps.isClaimProgressError);
    }
    // claim approval status
    if (
      nextProps.isApproveClaimSuccess &&
      nextProps.isApproveClaimSuccess !== this.props.isApproveClaimSuccess
    ) {
      this.props.history.push("/dashboards/claim-lists");
      this.setState({ loadingApprove: false });
      showSuccess(this.props.t("ErrorMsg.CLAIM_APPROVED"));
      // when success
      const params = qString.parse(this.props.location.search);
      this.props.dispatch(getClaimsDetailsById(params.claimId));
    }
    if (
      nextProps.isApproveClaimError &&
      nextProps.isApproveClaimError !== this.props.isApproveClaimError
    ) {
      this.setState({ loadingApprove: false });
      showError(nextProps.isApproveClaimError);
    }
    // customized response

    if (
      nextProps.customResponseFailure &&
      nextProps.customResponseFailure !== this.props.customResponseFailure
    ) {
      showError(nextProps.customResponseFailure);
    }
  };

  responseClaim = () => {
    this.props.dispatch(getResponse());
    this.setState({
      loadingReject: true,
      showResponse: !this.state.showResponse, // response block
      hideApprove: false,
      hideRejectbtn: false,
    });
  };

  showClaimCommunication = (communicationData) => {
    return (
      communicationData &&
      communicationData.map((data, key) => {
        return (
          <Col md={12} className="mt-2">
            <Card className="mb-1 p-2">
              <span>
                <strong>{this.props.t("ClaimStatus.DATE")}</strong>:
                {data ? dateTimeFormat(data.date) : ""}
              </span>
              <span>
                <strong>{this.props.t("ClaimStatus.SENT_MESSAGE")}</strong>:
                <div
                  dangerouslySetInnerHTML={{
                    __html: data ? data.sentMessage : "",
                  }}
                />
              </span>
            </Card>
          </Col>
        );
      })
    );
  };
  getTicket = () => {
    this.setState({ mainLoader: true });
    const params = qString.parse(this.props.location.search);
    this.props.dispatch(getTicketAttachment(params.claimId));
  };

  // getting custom response
  getCustomizedResponse = (e) => {
    const requestData = {
      claimCode: parseInt(this.state.getCategoriesData.code),
      responseCode: String(e.value),
    };

    this.props.dispatch(customizedResponse(requestData));
  };

  inputChange = (value) => {};

  onSubmit = (formProps) => {
    const requestData = {
      claimCode: parseInt(this.state.getCategoriesData.code),
      responseCode: String(formProps.response.value),
      otherResponseMessage: formProps ? formProps.body : "",
    };

    // if (formProps.body.trim() != "<p></p>") {
    this.props.dispatch(rejectClaim(requestData));
    // }
    this.setState({
      loading: true,
    });
  };
  // Claim progress function
  claimProgress = () => {
    const requestData = {
      claimCode: parseInt(this.state.getCategoriesData.code),
      provisinalClosingDate: "",
    };
    this.props.dispatch(progressClaim(requestData));
    this.setState({ loadingProgress: true });
  };
  // Claim approval function
  claimApproval = () => {
    const requestData = {
      claimCode: parseInt(this.state.getCategoriesData.code),
    };

    this.props.dispatch(approveClaim(requestData));
    this.setState({ loadingApprove: true });
  };

  // For back
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    const categoriesData = this.state.getCategoriesData;
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
                  <div>{this.props.t("Common.PROCESS_CLAIM")}</div>
                </div>
                <div className="page-title-actions">
                  <Breadcrumb>
                    <BreadcrumbItem>
                      <a href="javascript:void(0);">
                        <FontAwesomeIcon icon={faHome} />
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <a
                        href="javascript:void(0);"
                        onClick={(e) => this.goBack()}
                      >
                        {this.props.t("Common.CLAIM_LIST")}
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      {/* <a href="javascript:void(0);"> */}
                      {this.props.t("Common.PROCESS_CLAIM")}
                      {/* </a> */}
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
                  <CardBody>
                    <h4>{this.props.t("Common.PROCESS_CLAIM_DETAIL")}</h4>
                    <Row>
                      <Col md={6}>
                        <ul className="list-group">
                          <li className="list-group-item">
                            {this.props.t("Common.COMPLAINT_CHANNEL")} :{" "}
                            <b>
                              {categoriesData && categoriesData
                                ? categoriesData.claimChannel
                                : "none"}
                            </b>
                          </li>
                          <li class="list-group-item">
                            {this.props.t("Common.REF_NUM")} :{" "}
                            <b>
                              {categoriesData ? categoriesData.referenceNo : ""}
                            </b>
                          </li>
                          <li class="list-group-item">
                            {this.props.t("Common.TRAIN_NUMBER")} :{" "}
                            <b>
                              {categoriesData ? categoriesData.trainNumber : ""}
                            </b>
                          </li>
                          <li class="list-group-item">
                            {this.props.t("Common.CLAIM_SUBJECT")} :{" "}
                            <b>
                              {categoriesData
                                ? categoriesData.claimSubject
                                : ""}
                            </b>
                          </li>
                          <li class="list-group-item">
                            {" "}
                            {this.props.t("Common.CATEGORY")} :{" "}
                            <b>
                              {categoriesData && categoriesData
                                ? getLangBasedDataLabel(categoriesData.category)
                                : "none"}
                            </b>
                          </li>
                          <li className="list-group-item">
                            {this.props.t("Common.SUB_CATEGORY")} :{" "}
                            <b>
                              {categoriesData && categoriesData
                                ? getLangBasedDataLabel(
                                    categoriesData.subCategory
                                  )
                                : "none"}
                            </b>
                          </li>
                          <li class="list-group-item">
                            {" "}
                            {this.props.t("Common.SUB_SUB_CATEGORY")} :{" "}
                            <b>
                              {categoriesData &&
                              categoriesData.subSubCategoryCode
                                ? getLangBasedDataLabel(
                                    categoriesData.subSubCategory
                                  )
                                : "none"}
                            </b>
                          </li>
                        </ul>
                      </Col>
                      <Col md={6}>
                        <ul className="list-group">
                          <li className="list-group-item">
                            {this.props.t("Common.DEPATURE_STN")} :{" "}
                            <b>
                              {categoriesData && categoriesData
                                ? getLangBasedStationLabel(
                                    categoriesData.departureStation
                                  )
                                : "none"}
                            </b>
                          </li>
                          <li className="list-group-item">
                            {this.props.t("Common.ARRIVAL_STN")} :{" "}
                            <b>
                              {categoriesData && categoriesData
                                ? getLangBasedStationLabel(
                                    categoriesData.arrivalStation
                                  )
                                : "none"}
                            </b>
                          </li>
                          <li className="list-group-item">
                            {this.props.t("Common.CREATION_DATE")} :{" "}
                            <b>
                              {categoriesData && categoriesData.createDate
                                ? simpleDateFormat(categoriesData.createDate)
                                : "none"}
                            </b>
                          </li>
                          <li className="list-group-item">
                            {this.props.t("Common.UPDATE_DATE")} :{" "}
                            <b>
                              {categoriesData && categoriesData.lastModifiedDate
                                ? simpleDateFormat(
                                    categoriesData.lastModifiedDate
                                  )
                                : "none"}
                            </b>
                          </li>
                          <li className="list-group-item">
                            {this.props.t("Common.CLAIM_DETAILS")} :{" "}
                            <b>
                              {categoriesData
                                ? categoriesData.claimDetails
                                : "none"}
                            </b>
                          </li>

                          <li className="list-group-item">
                            <a
                              href="javscript:void(0)"
                              onClick={() =>
                                this.props.dispatch(
                                  getTicketAttachment(categoriesData.code)
                                )
                              }
                            >
                              <i class="fas fa-file-download text-success"></i>
                              {"  "}
                              <b>
                                {this.props.t("Common.DOWNLOAD_ATTACHMENT")}
                              </b>
                            </a>
                            <br />
                            <a
                              id="ticket"
                              href={
                                this.state.getTicketAttachment
                                  ? this.state.getTicketAttachment
                                  : "#"
                              }
                              target={"_blank"}
                              download={"Ticket_Attachment"}
                            ></a>
                          </li>

                          <li className="list-group-item">
                            <a
                              href="javscript:void(0)"
                              onClick={() =>
                                this.props.dispatch(
                                  getClaimAttachment(categoriesData.code)
                                )
                              }
                            >
                              <i class="fas fa-file-download text-success"></i>{" "}
                              <b>
                                {this.props.t(
                                  "Common.DOWNLOAD_CLAIM_ATTACHMENT"
                                )}
                              </b>
                            </a>
                            <br />
                            <a
                              id="claimId"
                              href={
                                this.state.ClaimAttachmentData
                                  ? this.state.ClaimAttachmentData
                                  : "#"
                              }
                              target={"_blank"}
                              download={"Claim_Attachment"}
                            ></a>
                          </li>
                          {/* )} */}
                        </ul>
                      </Col>
                    </Row>
                    <br />
                    {canManage(permissions.canChangeClaimStatus) && (
                      //todo
                      <div>
                        <Row>
                          {categoriesData &&
                            categoriesData.claimStatus === "1" && (
                              <Col className="col-md-auto">
                                <SubmitBtnLoader
                                  label={this.props.t("Common.PROGRESS_BTN")}
                                  className="btn btn-progress flaot-left"
                                  loading={this.state.loadingProgress}
                                  submitting={""}
                                  onClick={(e) => this.claimProgress()}
                                />
                              </Col>
                            )}{" "}
                          {/* todo */}
                          {this.state.hideRejectbtn &&
                            categoriesData &&
                            categoriesData.claimStatus === "2" && (
                              <Col className="col-md-auto">
                                <SubmitBtnLoader
                                  label={this.props.t("Common.REJECT_S")}
                                  className="btn btn-rejected flaot-left"
                                  loading={this.state.loadingReject}
                                  submitting={""}
                                  onClick={(e) => this.responseClaim()}
                                />
                              </Col>
                            )}
                          {this.state.hideApprove &&
                            categoriesData &&
                            categoriesData.claimStatus === "2" && (
                              <Col className="col-md-auto">
                                <SubmitBtnLoader
                                  label={this.props.t("Common.APPROVE")}
                                  className="btn btn-accepted flaot-left"
                                  loading={this.state.loadingApprove}
                                  submitting={""}
                                  onClick={(e) => this.claimApproval()}
                                />
                              </Col>
                            )}
                        </Row>
                        <AvForm
                          noValidate
                          onSubmit={handleSubmit(this.onSubmit)}
                          //model={this.props.initialValues}
                        >
                          {this.state.showResponse && (
                            <ReactCSSTransitionGroup
                              component="div"
                              transitionName="TabsAnimation"
                              transitionAppear={true}
                              transitionAppearTimeout={0}
                              transitionEnter={false}
                              transitionLeave={false}
                            >
                              <Row>
                                <Col md={12} className="mt-3">
                                  <FormGroup>
                                    <Label>
                                      {this.props.t("Common.SELECT_RESPONSE")}
                                    </Label>
                                    <Field
                                      component={RenderSelectMultiInput}
                                      isMulti={false}
                                      name="response"
                                      type="select"
                                      id="selectField"
                                      options={this.state.responses}
                                      validate={[required]}
                                      required
                                      onChange={(e) =>
                                        this.getCustomizedResponse(e)
                                      }
                                    />
                                  </FormGroup>

                                  <Label>
                                    {this.props.t("Common.CUSTOM_RESPONSE")}
                                  </Label>
                                  <FormGroup>
                                    <Field
                                      id="richtexteditor"
                                      label="response"
                                      name="body"
                                      component={EditorFieldComponent}
                                      value={
                                        this.state.customResponseData &&
                                        this.state.customResponseData.body
                                          ? this.state.customResponseData.body
                                          : "<p></p>"
                                      }
                                      validate={[required]}
                                      onChange={this.inputChange()}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md={4}>
                                  <SubmitBtnLoader
                                    label={this.props.t("Common.SUBMIT")}
                                    className="btn btn-rejected"
                                    loading={this.state.loading}
                                    submitting={""}
                                    type="submit"
                                  />
                                </Col>
                              </Row>
                            </ReactCSSTransitionGroup>
                          )}
                        </AvForm>
                      </div>
                    )}
                    <br />
                    <Row>
                      {" "}
                      {categoriesData && (
                        <Col md={12} className="mt-2">
                          <Card className="mb-1 p-2">
                            <strong>
                              {this.props.t("ClaimStatus.CLAIM_COMMUNICATION")}
                            </strong>
                          </Card>
                        </Col>
                      )}
                      {categoriesData &&
                        this.showClaimCommunication(
                          categoriesData.claimCommunication
                        )}
                    </Row>
                  </CardBody>
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

ProcessAgentClaim = reduxForm({
  form: "ProcessAgentClaim",
})(ProcessAgentClaim);

function mapStateToProps(state) {
  return {
    getClaimsDataById: state.Claim.getClaimsDataById,

    customResponseData: state.Response.customResponseData
      ? state.Response.customResponseData
      : null,

    responseData: state.Response.responseData,
    responseError: state.Response.responseError,
    // answer claim
    isAnswerSuccess: state.Claim.isAnswerSuccess,
    isAnswerError: state.Claim.isAnswerError,
    // claim attachments
    getTicketAttachmentData: state.Claim.getTicketAttachmentData,
    getClaimAttachment: state.Claim.getClaimAttachment,
    ClaimAttachmentData: state.Claim.ClaimAttachmentData,
    // claim progress
    isClaimProgressSuccess: state.Claim.isClaimProgressSuccess,
    isClaimProgressError: state.Claim.isClaimProgressError,
    // Approve claims
    isApproveClaimSuccess: state.Claim.isApproveClaimSuccess,
    isApproveClaimError: state.Claim.isApproveClaimError,
    customResponseFailure: state.Response.customResponseFailure,
    notificationData: state.Notification.notificationData,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ProcessAgentClaim);
