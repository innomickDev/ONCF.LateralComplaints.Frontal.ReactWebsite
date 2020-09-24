import React, { Fragment, Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { translate } from "react-multi-lang";
import { AvForm } from "availity-reactstrap-validation";
import _ from "lodash";
import RenderSelectMultiInput from "../../../Common/renderMultipleInput";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  FormGroup,
  Breadcrumb,
  Label,
  Form,
  Input,
  BreadcrumbItem,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import DatePicker from "react-datepicker";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  getFileExtension,
  showError,
  showSuccess,
  getLangBasedItem,
  getLangBasedDataLabel,
  dateTimeFormat,
  simpleDateFormat,
  canManage,
  permissions,
  getTarifLabel,
  getLangBasedStationLabel,
  defaultDateFormat,
  timeFormat,
} from "../../../Helpers/utils";
import {
  getClaimsDetailsById,
  getTicketAttachment,
  getClaimAttachment,
  progressClaim,
  temporaryApproveClaim,
  approveClaim,
} from "../../../../actions/claimAction";
import {
  getResponse,
  customizedResponse,
} from "../../../../actions/responseAction";
import { getCustomizedApprovedClaim } from "../../../../actions/emailTemplateAction";
import qString from "query-string";
import SubmitBtnLoader from "../../../Common/ButtonLoader";
import { required } from "../../../../utils";

import EditorFieldComponent from "../../../Common/RenderTextEditior";

class ProcessClaimGrc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDates: null,
      endDates: null,
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
      showActionTaken: false,
      hideBtn: true,
      hideApprove: true,
    };
    this.params = qString.parse(this.props.location.search);
  }
  // This function is used to handle startDateChange
  handleStartDateChange = (date) => {
    this.setState({ startDates: date });
  };
  // This function is used to handle EndDateChange
  handleEndDateChange = (date) => {
    this.setState({ endDates: date });
  };

  componentDidUpdate(prevState) {
    const params = qString.parse(this.props.location.search);

    if (this.state.claimId !== params.claimId) {
      this.setState({
        claimId: params.claimId,
      });
      this.props.dispatch(getClaimsDetailsById(params.claimId));
    }
  }

  componentDidMount = () => {
    const params = qString.parse(this.props.location.search);
    this.setState({
      claimId: params.claimId,
    });
    if (params && params.claimId) {
      this.props.dispatch(getClaimsDetailsById(params.claimId));
      // response data
      this.props.dispatch(getResponse());
    } else if (params && params.claimId) {
      this.props.dispatch(getClaimsDetailsById(params.claimId));
    }
  };
  // // hgetting categories
  // componentDidMount = () => {
  //   const params = qString.parse(this.props.location.search);
  //   this.props.dispatch(getClaimsDetailsById(params.claimId));
  //   // response data
  // };

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

    //For customized email data in the text editor
    if (
      nextProps.customizedEmailData &&
      nextProps.customizedEmailData !== this.props.customizedEmailData
    ) {
      this.props.change("body", nextProps.customizedEmailData.body);
      this.setState({
        customizedEmailData: nextProps.customizedEmailData,
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
          ClaimAttachmentData:
            // nextProps.ClaimAttachmentData.attachment !== "" &&
            nextProps.ClaimAttachmentData.attachment
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

    //claim approval status-- >for GRC functionality
    if (
      nextProps.isApproveClaimSuccess &&
      nextProps.isApproveClaimSuccess !== this.props.isApproveClaimSuccess
    ) {
      this.setState({ loadingApprove: false });
      showSuccess(this.props.t("ErrorMsg.CLAIM_APPROVED"));
      this.props.history.push("/dashboards/claim-lists");
      this.setState({ loadingApprove: false });
      // showSuccess(this.props.t("ErrorMsg.CLAIM_TEMPORARY_APPROVED"));
      // when success
      const params = qString.parse(this.props.location.search);
      this.props.dispatch(getClaimsDetailsById(params.claimId));
    }

    // temporary claim approval status
    if (
      nextProps.temporaryApproveSuccess &&
      nextProps.temporaryApproveSuccess !== this.props.temporaryApproveSuccess
    ) {
      const boGRCuserDetails = JSON.parse(
        localStorage.getItem("boGRCuserProfile")
      );

      const userData =
        boGRCuserDetails &&
        boGRCuserDetails.data &&
        boGRCuserDetails.data.roles[0];
      const requestData = {
        claimCode: parseInt(this.state.getCategoriesData.code),
        customizedEmail: this.state.customizedEmail,
      };
      if (
        canManage(permissions.canApproveGRCClaim)
        // canManage(permissions.canCreateGRCClaim)
      ) {
        this.props.dispatch(approveClaim(requestData));
      } else {
        this.props.history.push("/dashboards/claim-lists");
        this.setState({ loadingApprove: false });
        showSuccess(this.props.t("ErrorMsg.CLAIM_TEMPORARY_APPROVED"));
        // when success
        const params = qString.parse(this.props.location.search);
        this.props.dispatch(getClaimsDetailsById(params.claimId));
      }
    }

    if (
      nextProps.isApproveClaimError &&
      nextProps.isApproveClaimError !== this.props.isApproveClaimError
    ) {
      this.setState({ loadingApprove: false });
      showError(nextProps.isApproveClaimError);
    }
    if (
      nextProps.temporaryApproveError &&
      nextProps.temporaryApproveError !== this.props.temporaryApproveError
    ) {
      this.setState({ loadingApprove: false });
      showError(nextProps.temporaryApproveError);
    }
    // customized response

    if (
      nextProps.customResponseFailure &&
      nextProps.customResponseFailure !== this.props.customResponseFailure
    ) {
      showError(nextProps.customResponseFailure);
    }

    if (
      nextProps.customizedEmailError &&
      nextProps.customizedEmailError !== this.props.customizedEmailError
    ) {
      showError(nextProps.customizedEmailError);
    }
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
                {/* {data ? data.sentMessage : ""} */}
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

  // Claim progress function
  claimProgress = (formProps) => {
    if (this.state.startDates) {
      this.state.startDates = new Date(this.state.startDates).getTime();
    }

    if (this.state.startDates) {
      const requestData = {
        claimCode: parseInt(this.state.getCategoriesData.code),
        provisinalClosingDate: String(
          new Date(this.state.startDates).getTime()
        ),
      };

      this.props.dispatch(progressClaim(requestData));
      this.setState({ loadingProgress: true });
    } else {
      showError(this.props.t("ErrorMsg.SELECT_DATE_PICKER"));
    }
  };

  // This function is called when the status is temporary approved
  TempStatusClaimApproval = () => {
    const cutomizedEmailData = {
      claimCode: parseInt(this.state.getCategoriesData.code),
    };

    this.props.dispatch(getCustomizedApprovedClaim(cutomizedEmailData));

    this.setState({
      hideApprove: false,
      showResponse: !this.state.showResponse,
      // showActionTaken: true,
    });
  };

  //This function is called when status is inprogess
  claimApproval = () => {
    const cutomizedEmailData = {
      claimCode: parseInt(this.state.getCategoriesData.code),
    };

    this.props.dispatch(getCustomizedApprovedClaim(cutomizedEmailData));

    this.setState({
      hideApprove: false,
      showActionTaken: true,
      showResponse: !this.state.showResponse,
    });
  };

  //This is called onClick of temporary claim approval button when we login through agent
  temporaryClaimApproval = () => {
    const cutomizedEmailData = {
      claimCode: parseInt(this.state.getCategoriesData.code),
    };

    // this.props.dispatch(getCustomizedApprovedClaim(cutomizedEmailData));
    this.setState({
      loadingApprove: true,
      showActionTaken: true,
      hideApprove: false,
    });
  };

  //this is used to check condition based on permissions
  showButtons = (categoriesData) => {
    if (
      this.state.hideApprove &&
      canManage(permissions.canApproveGRCClaim) &&
      // canManage(permissions.canCreateGRCClaim) &&
      categoriesData &&
      categoriesData.claimStatus === "2"
    ) {
      return (
        <Col className="col-md-auto">
          <SubmitBtnLoader
            label={this.props.t("Common.APPROVE")}
            className="btn btn-accepted flaot-left"
            loading={this.state.loadingApprove}
            submitting={""}
            onClick={(e) => this.claimApproval()}
          />
        </Col>
      );
    } else if (
      this.state.hideApprove &&
      canManage(permissions.canTemporaryApprovedGRCClaim) && //-->new permissions change
      categoriesData &&
      categoriesData.claimStatus === "2"
    ) {
      return (
        <Col className="col-md-auto">
          <SubmitBtnLoader
            label={this.props.t("Common.TEMPORARY_APPROVE")}
            className="btn btn-accepted flaot-left"
            loading={this.state.loadingApprove}
            submitting={""}
            onClick={(e) => this.temporaryClaimApproval()}
          />
        </Col>
      );
    }
  };

  //This function is called onSubmit
  onSubmit = (formProps) => {
    const claimStatusData =
      this.state.getCategoriesData && this.state.getCategoriesData;
    const tempApproveData = {
      claimCode: parseInt(claimStatusData.code),
      actionTaken: formProps.actionTaken,
    };
    const boGRCuserDetails = JSON.parse(
      localStorage.getItem("boGRCuserProfile")
    );

    const userData =
      boGRCuserDetails &&
      boGRCuserDetails.data &&
      boGRCuserDetails.data.roles[0];
    if (!canManage(permissions.canApproveGRCClaim)) {
      this.props.dispatch(temporaryApproveClaim(tempApproveData));
    }

    const requestData = {
      claimCode: parseInt(claimStatusData.code),
      customizedEmail: formProps ? formProps.body : "",
    };
    if (
      canManage(permissions.canApproveGRCClaim) &&
      // canManage(permissions.canCreateGRCClaim) &&
      claimStatusData.claimStatus === "5"
    ) {
      this.props.dispatch(approveClaim(requestData));
    }

    if (
      canManage(permissions.canApproveGRCClaim) &&
      // canManage(permissions.canCreateGRCClaim) &&
      claimStatusData.claimStatus === "2"
    ) {
      this.props.dispatch(temporaryApproveClaim(tempApproveData));
    }

    this.setState({
      loadingApprove: true,
      customizedEmail: formProps.body,
    });
  };
  // For back
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    console.log(this.props.getClaimsDataById);
    const { startDate } = this.state;

    const categoriesData = this.state.getCategoriesData;
    const { handleSubmit } = this.props;

    return (
      <Fragment>
        {/* <MainLoader className="text-center" loading={this.state.mainLoader} /> */}
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
                          <li class="list-group-item">
                            {this.props.t("Common.AGENT_NAME")} :{" "}
                            <b>
                              {categoriesData
                                ? categoriesData.createdByAgent
                                : "none"}
                            </b>
                          </li>
                          <li class="list-group-item">
                            {this.props.t("Common.CLAIM_ID")} :{" "}
                            <b>
                              {categoriesData ? categoriesData.claimCode : ""}
                            </b>
                          </li>
                          <li className="list-group-item">
                            {this.props.t("Common.COMPLAINT_CHANNEL")} :{" "}
                            <b>
                              {categoriesData && categoriesData
                                ? getLangBasedDataLabel(
                                    categoriesData.claimSource
                                  )
                                : "none"}
                            </b>
                          </li>
                          <li class="list-group-item">
                            {this.props.t("Common.REF_NUM")} :{" "}
                            <b>
                              {categoriesData ? categoriesData.referenceNo : ""}
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
                          <li class="list-group-item">
                            {this.props.t("Common.CLAIM_SUBJECT")} :{" "}
                            <b>
                              {categoriesData
                                ? categoriesData.claimSubject
                                : ""}
                            </b>
                          </li>
                          <li className="list-group-item">
                            {this.props.t("Common.CLAIM_DETAILS_NEW")} :{" "}
                            <b>
                              {categoriesData
                                ? categoriesData.claimDetails
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
                          <li className="list-group-item">
                            {this.props.t("Common.EVENT_DATE")} :{" "}
                            <b>
                              {categoriesData && categoriesData.eventDate
                                ? simpleDateFormat(categoriesData.eventDate)
                                : "none"}
                              {/* {categoriesData && categoriesData
                                ? dateTimeFormat(categoriesData.EventDate)
                                : ""} */}
                            </b>
                          </li>
                          <li class="list-group-item">
                            {this.props.t("Common.EVENT_LOCATION")} :{" "}
                            <b>
                              {categoriesData
                                ? categoriesData.eventLocation
                                : ""}
                            </b>
                          </li>

                          {categoriesData &&
                            categoriesData.claimStatus === "1" && (
                              <li class="list-group-item">
                                {this.props.t("Common.CLAIM_STATUS")} :{" "}
                                <b>{this.props.t("Common.SUBMITTED")}</b>
                              </li>
                            )}
                          {categoriesData &&
                            categoriesData.claimStatus === "2" && (
                              <li class="list-group-item">
                                {this.props.t("Common.CLAIM_STATUS")} :{" "}
                                <b> {this.props.t("Common.PROGRESS")}</b>
                              </li>
                            )}
                          {categoriesData &&
                            categoriesData.claimStatus === "3" && (
                              <li class="list-group-item">
                                {this.props.t("Common.CLAIM_STATUS")} :{" "}
                                <b>{this.props.t("Common.APPROVE")}</b>
                              </li>
                            )}
                          {categoriesData &&
                            categoriesData.claimStatus === "4" && (
                              <li class="list-group-item">
                                {this.props.t("Common.CLAIM_STATUS")} :{" "}
                                <b>{this.props.t("Common.REJECT_S")}</b>
                              </li>
                            )}
                          {categoriesData &&
                            categoriesData.claimStatus === "5" && (
                              <li class="list-group-item">
                                {this.props.t("Common.CLAIM_STATUS")} :{" "}
                                <b>
                                  {this.props.t("Common.TEMPORARY_APPROVE")}
                                </b>
                              </li>
                            )}
                          <li className="list-group-item">
                            {this.props.t("Common.CLAIM_SOURCE")} :{" "}
                            <b>
                              {categoriesData && categoriesData
                                ? getLangBasedStationLabel(
                                    categoriesData.claimStation
                                  )
                                : "none"}
                            </b>
                          </li>
                        </ul>
                      </Col>
                      <Col md={6}>
                        <ul className="list-group">
                          <li className="list-group-item">
                            {this.props.t("Common.PROVISIONAL_CLOSING_DATE")} :{" "}
                            <b>
                              {categoriesData &&
                              categoriesData.provisinalClosingDate
                                ? simpleDateFormat(
                                    categoriesData.provisinalClosingDate
                                  )
                                : "none"}
                            </b>
                          </li>
                          {/* <li className="list-group-item">
                            {this.props.t("Common.ASSIGNED_DATE")} :{" "}
                            <b>
                              {categoriesData && categoriesData.assignedDate
                                ? simpleDateFormat(categoriesData.assignedDate)
                                : "none"}
                            </b>
                          </li> */}
                          {/* <li className="list-group-item">
                            {this.props.t("Common.CLOSING_DATE")} :{" "}
                            <b>
                              {categoriesData && categoriesData.respondDate
                                ? simpleDateFormat(categoriesData.respondDate)
                                : "none"}
                            </b>
                          </li> */}
                          <li className="list-group-item">
                            {this.props.t("Common.NEW_TRAVEL_DATE_TIME")} :{" "}
                            <b>
                              {categoriesData && categoriesData.travelDate
                                ? simpleDateFormat(categoriesData.travelDate)
                                : "none"}
                            </b>
                          </li>
                          {categoriesData &&
                            categoriesData.eventLocation === "Gare" && (
                              <li className="list-group-item">
                                {this.props.t("Common.EVENT_STATION")} :{" "}
                                <b>
                                  {categoriesData && categoriesData
                                    ? getLangBasedStationLabel(
                                        categoriesData.eventStation
                                      )
                                    : "none"}
                                </b>
                              </li>
                            )}
                          {categoriesData &&
                            categoriesData.eventLocation === "Gare" && (
                              <li className="list-group-item">
                                {this.props.t("Common.NEW_TRAVEL_DATE_TIME")} :{" "}
                                <b>
                                  {categoriesData && categoriesData.travelDate
                                    ? simpleDateFormat(
                                        categoriesData.travelDate
                                      )
                                    : "none"}
                                </b>
                              </li>
                            )}
                          {categoriesData && categoriesData.actionTaken && (
                            <li className="list-group-item">
                              {this.props.t("Common.ACTIONS_TAKEN")} :{" "}
                              <b>
                                {categoriesData
                                  ? categoriesData.actionTaken
                                  : ""}
                              </b>
                            </li>
                          )}
                          {/* For train */}
                          {categoriesData &&
                            categoriesData.eventLocation === "Train" && (
                              <li className="list-group-item">
                                {this.props.t("Common.DEPARTURE_HOUR")} :{" "}
                                <b>
                                  {categoriesData
                                    ? categoriesData.departureHour
                                    : // ? timeFormat(categoriesData.departureHour)
                                      "none"}
                                </b>
                              </li>
                            )}
                          {categoriesData &&
                            categoriesData.eventLocation === "Train" && (
                              <li className="list-group-item">
                                {this.props.t("Common.ARRIVING_TIME")} :{" "}
                                <b>
                                  {categoriesData
                                    ? categoriesData.arrivalHour
                                    : // ? timeFormat(categoriesData.arrivalHour)
                                      "none"}
                                </b>
                              </li>
                            )}

                          {categoriesData &&
                            categoriesData.eventLocation === "Train" && (
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
                            )}

                          {categoriesData &&
                            categoriesData.eventLocation === "Train" && (
                              <li className="list-group-item">
                                {this.props.t("Common.ARRIVAL_STATION")} :{" "}
                                <b>
                                  {categoriesData && categoriesData
                                    ? getLangBasedStationLabel(
                                        categoriesData.arrivalStation
                                      )
                                    : "none"}
                                </b>
                              </li>
                            )}

                          {categoriesData &&
                            categoriesData.eventLocation === "Train" && (
                              <li className="list-group-item">
                                {this.props.t("Common.TRAIN_NUMBER")} :{" "}
                                <b>
                                  {categoriesData
                                    ? categoriesData.trainNumber
                                    : ""}
                                </b>
                              </li>
                            )}

                          {categoriesData &&
                            categoriesData.eventLocation === "Train" && (
                              <li className="list-group-item">
                                {this.props.t("Common.TYPE_OF_TRAIN")} :{" "}
                                <b>
                                  {categoriesData && categoriesData
                                    ? categoriesData.trainClassificationCode
                                    : "none"}
                                </b>
                              </li>
                            )}
                          {categoriesData &&
                            categoriesData.eventLocation === "Train" && (
                              <li className="list-group-item">
                                {this.props.t("Common.NEW_TRAVEL_DATE_TIME")} :{" "}
                                <b>
                                  {categoriesData && categoriesData.travelDate
                                    ? simpleDateFormat(
                                        categoriesData.travelDate
                                      )
                                    : "none"}
                                </b>
                              </li>
                            )}
                          {categoriesData &&
                            categoriesData.eventLocation === "Train" && (
                              <li className="list-group-item">
                                {this.props.t("Common.TARIF")} :{" "}
                                <b>
                                  {categoriesData && categoriesData
                                    ? getTarifLabel(categoriesData.tarif)
                                    : "none"}
                                </b>
                              </li>
                            )}
                          {categoriesData &&
                            categoriesData.eventLocation === "Train" && (
                              <li className="list-group-item">
                                {this.props.t("Common.UPDATED_DATE")} :{" "}
                                <b>
                                  {categoriesData && categoriesData
                                    ? simpleDateFormat(
                                        categoriesData.lastModifiedDate
                                      )
                                    : ""}
                                </b>
                              </li>
                            )}

                          {/* {this.state.showTicketAttchment && ( */}
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

                          {/* )} */}
                          {/* {this.state.ClaimAttachmentData && ( */}
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
                      <div>
                        <Form
                          noValidate
                          // modal={this.props.initialValues}
                          onSubmit={handleSubmit(this.onSubmit)}
                        >
                          <Row>
                            {categoriesData &&
                              categoriesData.claimStatus === "1" && (
                                <Col className="col-md-auto">
                                  {" "}
                                  <FormGroup>
                                    <Label
                                      for="examplePassword"
                                      name="startDate"
                                    >
                                      {this.props.t(
                                        "Common.PROVISIONAL_CLOSING_DATE"
                                      )}
                                    </Label>
                                    <InputGroup>
                                      <InputGroupAddon addonType="prepend">
                                        <div className="input-group-text">
                                          <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                          />
                                        </div>
                                      </InputGroupAddon>
                                      <DatePicker
                                        className="form-control"
                                        dateFormat={defaultDateFormat}
                                        selected={
                                          startDate
                                            ? new Date(startDate)
                                            : this.state.startDates
                                        }
                                        onChange={this.handleStartDateChange}
                                      />
                                    </InputGroup>
                                  </FormGroup>
                                </Col>
                              )}
                            {categoriesData &&
                              categoriesData.claimStatus === "1" && (
                                <Col className="col-md-auto mt-4 p-1">
                                  <SubmitBtnLoader
                                    label={this.props.t("Common.PROGRESS_BTN")}
                                    className="btn btn-progress flaot-left"
                                    loading={this.state.loadingProgress}
                                    submitting={""}
                                    onClick={(e) => this.claimProgress()}
                                  />
                                </Col>
                              )}{" "}
                            {categoriesData &&
                              categoriesData.claimStatus === "5" &&
                              canManage(permissions.canApproveGRCClaim) &&
                              // canManage(permissions.canCreateGRCClaim) &&
                              this.state.hideApprove && (
                                <Col className="col-md-auto">
                                  <SubmitBtnLoader
                                    label={this.props.t("Common.APPROVE")}
                                    className="btn btn-accepted flaot-left"
                                    loading={this.state.loadingProgress}
                                    submitting={""}
                                    onClick={(e) =>
                                      this.TempStatusClaimApproval()
                                    }
                                  />
                                </Col>
                              )}{" "}
                            {/*Here we call show Buttons function to show or hide buttons */}
                            {this.showButtons(categoriesData)}
                          </Row>
                          {console.log(
                            categoriesData ? categoriesData.actionTaken : ""
                          )}

                          {this.state.showActionTaken && (
                            <FormGroup>
                              <Field
                                component="textarea"
                                name="actionTaken"
                                className={"form-control mt-3 mb-3 w-100"}
                                id="exampleText"
                                placeholder="Actions entretenues"
                              />
                            </FormGroup>
                          )}

                          {this.state.showResponse &&
                            canManage(permissions.canApproveGRCClaim) && (
                              // canManage(permissions.canCreateGRCClaim) && (
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
                                          this.state.customizedEmailData &&
                                          this.state.customizedEmailData.body
                                            ? this.state.customizedEmailData
                                                .body
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
                          {this.state.showActionTaken &&
                            // canManage(permissions.canCreateGRCClaim) &&
                            !canManage(permissions.canApproveGRCClaim) && (
                              <Row>
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
                            )}
                        </Form>
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

ProcessClaimGrc = reduxForm({
  form: "ProcessClaimGrc",
  // enableReinitialize: true,
})(ProcessClaimGrc);

function mapStateToProps(state) {
  return {
    // initialValues: state.Claim.getClaimsDataById,
    getClaimsDataById: state.Claim.getClaimsDataById,

    customResponseData: state.Response.customResponseData
      ? state.Response.customResponseData
      : null,
    customizedEmailData: state.Email.customizedEmailData
      ? state.Email.customizedEmailData
      : null,
    customizedEmailError: state.Email.customizedEmailError,

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
    //temporaryAPproveClaims
    temporaryApproveSuccess: state.Claim.temporaryApproveSuccess,
    temporaryApproveError: state.Claim.temporaryApproveError,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ProcessClaimGrc);
