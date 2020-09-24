import React, { Fragment, Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  InputGroup,
  Button,
  CardHeader,
} from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { translate } from "react-multi-lang";
import ReactTable from "react-table";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SubmitBtnLoader from "../../Common/ButtonLoader";

//
// import FooterComponent from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  dateTimeFormat,
  INDEX_PAGE_SIZE_DEFAULT,
  INDEX_PAGE_SIZE_OPTIONS,
  showError,
  canManage,
  permissions,
} from "../../Helpers/utils";

// api calls

import {
  getListClaimReports,
  exportListClaimReports,
} from "../../../actions/claimAction";

import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Filtercomponent from "./FilterComponent";

import { stat } from "fs-extra";
import MainLoader from "../../Common/Loader";

class ReportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      dis: true,
      reportData: [],
      stationNames: null,
      isLoading: false,
      loading: false,
      isShowRolesModal: false,
      mainLoader: true,
      doc_files: [],
      data: [],

      meta: {
        page: 1,
        pageSize: INDEX_PAGE_SIZE_DEFAULT,
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        pageTotal: 1,
        total: 0,
      },
    };
    this.translations = {
      previousText: this.props.t("ReactTable.PREVIOUS"),
      pageText: this.props.t("ReactTable.PAGE"),
      rowsText: this.props.t("ReactTable.ROWS"),
      nextText: this.props.t("ReactTable.NEXT"),
      ofText: this.props.t("ReactTable.OF"),
      loadingText: "LOADING...",
      noDataText: this.props.t("ReactTable.NO_RECORD_FOUND"),
    };
    this.filterFormProps = {};
  }

  //for access cntrl
  componentWillMount = () => {
    if (!canManage(permissions.canGenerateReports)) {
      this.props.history.push("/dashboards/Welcome");
    }
  };
  componentDidMount = () => {
    this.props.dispatch(getListClaimReports());
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.reportData &&
      nextProps.reportData !== null &&
      nextProps.reportData !== this.props.reportData
    ) {
      let reportData = [];
      nextProps.reportData.claimClientsReports &&
        nextProps.reportData.claimClientsReports.map((unique, key) => {
          reportData.push({
            actionTaken: unique ? unique.actionTaken : "",
            createDate: unique ? dateTimeFormat(unique.createDate) : "",
            EventLocation: unique ? unique.eventLocation : "",
            agentName: unique ? unique.agentName : "",
            ClaimStatus: unique ? unique.ClaimStatus : "",
            client: unique ? unique.userCode : "",
            reception: unique ? unique.claimChannel : "",
            claimCategory: unique ? unique.categoryCode : "",
            claimStatus: unique ? unique.claimStatus : "",
          });
        });
      this.setState({
        reportData: reportData,
      });
    }

    this.setState({
      isRequest: nextProps.isRequest,
    });

    //for Loader
    this.setState({
      isLoading: nextProps.isLoading,
    });

    if (
      nextProps.exportData &&
      nextProps.exportData !== this.props.exportData
    ) {
      if (nextProps.exportData && nextProps.exportData !== "") {
        this.setState({
          exportData: nextProps.exportData,
        });
        setTimeout(
          function() {
            document.getElementById("claimId") &&
              document.getElementById("claimId").click();
            this.setState({
              exportData: null,
            });
          }.bind(this),
          1000
        );
      } else {
        showError("No document Found");
      }
    }
  }

  filteredData = (formProps) => {
    let data;
    if (formProps.claimReportsEnum === "1") {
      data = `?claimReportsEnum=${1}`;
    } else if (formProps.claimReportsEnum === "2") {
      data = `?claimReportsEnum=${2}`;
    } else if (formProps.claimReportsEnum === "3") {
      data = `?claimReportsEnum=${3}`;
    } else if (formProps.claimReportsEnum === "4") {
      data = `?claimReportsEnum=${4}&startDate=${formProps.startDate}&endDate=${
        formProps.endDate
      }`;
    }
    this.setState({
      formData: data,
    });
  };

  // claimReportsExcel

  onFilterSubmit = (formProps) => {
    if (formProps.claimReportsEnum === "0") {
      delete formProps.claimReportsEnum;
    }

    if (formProps) {
      let data;
      if (formProps.claimReportsEnum === "1") {
        data = `?claimReportsEnum=${1}`;
        const queryString = `?claimReportsEnum=${1}`;
        this.props.dispatch(getListClaimReports(queryString));
      } else if (formProps.claimReportsEnum === "2") {
        const queryString = `?claimReportsEnum=${2}`;
        data = `?claimReportsEnum=${2}`;
        this.props.dispatch(getListClaimReports(queryString));
      } else if (formProps.claimReportsEnum === "3") {
        const queryString = `?claimReportsEnum=${3}`;
        data = `?claimReportsEnum=${3}`;
        this.props.dispatch(getListClaimReports(queryString));
      } else if (formProps.claimReportsEnum === "4") {
        const queryString = `?claimReportsEnum=${4}&startDate=${
          formProps.startDate
        }&endDate=${formProps.endDate}`;
        data = `?claimReportsEnum=${4}&startDate=${
          formProps.startDate
        }&endDate=${formProps.endDate}`;
        this.props.dispatch(getListClaimReports(queryString));
      } else if (formProps.claimReportsEnum === "0") {
        this.props.dispatch(getListClaimReports());
      }
      this.setState({
        data: data,
      });
    }
  };
  // for download excel file
  exportData = (e) => {
    this.props.dispatch(exportListClaimReports(e));
  };

  render() {
    const enumData = this.state.data;

    const { reportData } = this.state;

    const header = {
      createDate: this.props.t("Common.CREATION_DATE"),
      client: this.props.t("Common.CLIENT"),
      eventLocation: this.props.t("Common.EVENT_LOCATION"),
      receptionChannel: this.props.t("Common.RECEPTION_CHANNEL"),
      agentName: this.props.t("Common.ENTITY_AGENT"),
      actionsTaken: this.props.t("Common.ACTIONS_TAKEN"),
      claimStatus: this.props.t("Common.CLAIM_STATUS"),
      claimCategory: this.props.t("Common.TIME_TAKEN_TO_PROCESS"),
      body: this.props.t("Common.EMAIL_BODY"),
      updateDate: this.props.t("Common.UPDATE_DATE"),
      actions: this.props.t("Common.ACTIONS"),
    };
    return (
      <Fragment>
        <MainLoader className="text-center" loading={this.state.isLoading} />
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
                  <div>
                    {this.props.t("Sidebar.REPORT")}
                    <div className="page-title-subheading"></div>
                  </div>
                </div>
                <div className="page-title-actions">
                  <Breadcrumb>
                    <BreadcrumbItem>
                      <a href="javascript:void(0);">
                        <FontAwesomeIcon icon={faHome} />
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      {/* <a href="javascript:void(0);"> */}{" "}
                      {this.props.t("Sidebar.REPORT")}
                      {/* </a> */}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Filtercomponent
              hideSelector={true}
              filterData={this.state.filterData}
              onFilterSubmit={this.onFilterSubmit}
              defaultSiteValue={this.id}
            />
          </Row>
          <br />

          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardHeader>
                  <Row className="w-100">
                    <Col lg={8} sm={8}>
                      <div className="my-3 text-left"></div>
                    </Col>
                    <Col lg={4}>
                    <SubmitBtnLoader
                                  label={this.props.t("Common.EXPORT_IN_EXCEL")}
                                  className="btn btn-primary float-right mt-2"
                                  loading={this.state.isRequest}
                                  submitting={""}
                                  onClick={(e) => this.exportData(enumData)}
                                />
                      {/* <button
                        className="btn btn-primary float-right mt-2"
                        onClick={(e) => this.exportData(enumData)}
                        disabled={this.state.isRequest}
                      >
                        {this.props.t("Common.EXPORT_IN_EXCEL")}
                      </button>
                      */}
                      <br />
                      <a
                        id="claimId"
                        href={
                          this.state.exportData
                            ? `data:application/vnd.ms-excel;base64,${this.state.exportData}`
                            : "#"
                        }
                        target={"_blank"}
                        download={"Rapport réclamations.xlsx"}
                      ></a>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="">
                  <ReactTable
                    data={reportData}
                    columns={[
                      {
                        columns: [
                          {
                            Header: header.createDate,
                            accessor: "createDate",
                          },

                          {
                            Header: header.eventLocation,
                            accessor: "EventLocation",
                            Cell: (row) => (
                              <div>
                                {row.value && row.value ? row.value : "Aucun"}
                              </div>
                            ),
                          },

                          {
                            Header: header.receptionChannel,
                            accessor: "reception",
                          },
                          {
                            Header: header.agentName,
                            accessor: "agentName",
                          },
                          {
                            Header: header.actionsTaken,
                            accessor: "actionTaken",
                            Cell: (row) => (
                              <div>
                                {row.value && row.value ? row.value : "Aucune"}
                              </div>
                            ),
                          },
                          {
                            Header: header.claimStatus,
                            accessor: "claimStatus",
                            Cell: (row) => (
                              <div>
                                <div className="widget-content p-0">
                                  <div className="widget-content-wrapper">
                                    <div className="d-inline">
                                      {row.value
                                        ? row.value === "1" && (
                                            <span>
                                              <i className="fas fa-circle text-primary"></i>{" "}
                                              {this.props.t("Common.SUBMITTED")}
                                            </span>
                                          )
                                        : null}
                                      {row.value
                                        ? row.value === "2" && (
                                            <span>
                                              <i className="fas fa-circle text-warning"></i>{" "}
                                              {this.props.t("Common.PROGRESS")}
                                            </span>
                                          )
                                        : null}
                                      {row.value
                                        ? row.value === "3" && (
                                            <span>
                                              <i className="fas fa-circle text-success"></i>{" "}
                                              {this.props.t("Common.APPROVE")}
                                            </span>
                                          )
                                        : null}
                                      {row.value
                                        ? row.value === "4" && (
                                            <span>
                                              <i className="fas fa-circle text-danger"></i>{" "}
                                              {this.props.t("Common.REJECT_S")}
                                            </span>
                                          )
                                        : null}
                                      {row.value
                                        ? row.value === "5" && (
                                            <span>
                                              <i className="fas fa-circle text-success"></i>{" "}
                                              {this.props.t(
                                                "Common.TEMPORARY_APPROVE"
                                              )}
                                            </span>
                                          )
                                        : null}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ),
                          },
                        ],
                      },
                    ]}
                    defaultPageSize={10}
                    className="-highlight"
                    {...this.translations}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    exportData: state.Claim.exportData,
    isRequest:state.Claim.isRequest,
    isLoading: state.Claim.isLoading,
    exportDataError: state.Claim.exportDataError,
    emailData: state.Email.emailData
      ? state.Email.emailData.emailTemplateClients
      : [],
    reportData: state.Claim.reportData,

    updateEmailData: state.Email.updateEmailData,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ReportComponent);
