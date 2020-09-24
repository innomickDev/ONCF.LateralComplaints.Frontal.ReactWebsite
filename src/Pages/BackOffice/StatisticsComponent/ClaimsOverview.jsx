import React, { Fragment, Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { translate } from "react-multi-lang";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  INDEX_PAGE_SIZE_DEFAULT,
  INDEX_PAGE_SIZE_OPTIONS,
  canManage,
  permissions,
  showError,
} from "../../Helpers/utils";
import ReactApexChart from "react-apexcharts";
import { Row, Col, Card, CardBody } from "reactstrap";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Circle from "react-circle";
import GraphOne from "./Graphs/ClaimGraph";
// api calls
import {
  GetClaimStatistics,
  getClaimStatisticsReport,
} from "../../../actions/staticticsAction";
class ClaimsOverviewStat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      stationNames: null,
      loading: false,
      isShowRolesModal: false,
      mainLoader: true,
      monthData: [],
      monthName: [],
      meta: {
        page: 1,
        pageSize: INDEX_PAGE_SIZE_DEFAULT,
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        pageTotal: 1,
        total: 0,
      },
    };
  }

  //for access cntrl
  componentWillMount = () => {
    if (!canManage(permissions.canViewComplaintOverview)) {
      this.props.history.push("/dashboards/Welcome");
    }
  };
  componentDidMount = () => {
    this.props.dispatch(GetClaimStatistics());
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.claimStat && nextProps.claimStat !== this.props.claimStat) {
      let monthName = [];
      let countData = [];
      nextProps.claimStat.map((claimSatistic, key) => {
        monthName.push(this.props.t(claimSatistic.monthName));
        countData.push(claimSatistic.count);
      });
      this.setState({
        monthName: monthName,
        monthData: countData,
      });
    }
    if (
      nextProps.claimsDetail &&
      nextProps.claimsDetail !== this.props.claimsDetail
    ) {
      this.setState({
        claimsDetail: nextProps.claimsDetail,
      });
    }
    //For downloading excel document data
    if (
      nextProps.claimReportData &&
      nextProps.claimReportData !== this.props.claimReportData
    ) {
      console.log(nextProps.claimReportData);
      if (
        nextProps.claimReportData.claimStaticsReports &&
        nextProps.claimReportData.claimStaticsReports !== ""
      ) {
        this.setState({
          claimReportData: nextProps.claimReportData.claimStaticsReports,
        });
        setTimeout(
          function() {
            document.getElementById("claimId") &&
              document.getElementById("claimId").click();
            this.setState({
              claimReportData: null,
            });
          }.bind(this),
          1000
        );
      } else {
        showError("Aucun document trouvé");
      }
    }
  };

  render() {
    const claimStat = this.state.claimStat;
    const claimsDetail = this.state.claimsDetail;
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
          <Row>
            <Col lg={8} sm={8}>
              <div className="my-3 text-left"></div>
            </Col>
            <Col lg={4}>
              <button
                className="btn btn-primary float-right mt-3"
                onClick={(e) => this.props.dispatch(getClaimStatisticsReport())}
              >
                {this.props.t("Common.EXPORT_IN_EXCEL")}
              </button>
              <br />
              <br />
              <a
                id="claimId"
                href={
                  this.state.claimReportData
                    ? `data:application/vnd.ms-excel;base64,${this.state.claimReportData}`
                    : "#"
                }
                target={"_blank"}
                download={"ClaimOverviewStatistics.xlsx"}
              ></a>
              <br />
            </Col>
            <Col md="6" lg="4">
              <Card className="widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-primary border-primary">
                <div className="widget-chat-wrapper-outer">
                  <div className="widget-chart-content">
                    <div className="widget-title opacity-5 text-uppercase">
                      {this.props.t("Statistics.TOTAL_CLAIMS")}
                    </div>
                    <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                      <div className="widget-chart-flex align-items-center">
                        <div>
                          <span className="opacity-10 text-success pr-2">
                            <FontAwesomeIcon icon={faAngleUp} />
                          </span>
                          {claimsDetail ? claimsDetail.totalClaimsCount : ""}
                          {/* <small className="opacity-5 pl-1">%</small> */}
                        </div>
                        <div className="widget-title ml-auto font-size-lg font-weight-normal text-muted">
                          <div className="ml-auto">
                            <Circle
                              animate={true} // Boolean: Animated/Static progress
                              animationDuration="10s" // String: Length of animation
                              responsive={false} // Boolean: Make SVG adapt to parent size
                              size="46" // String: Defines the size of the circle.
                              lineWidth="30" // String: Defines the thickness of the circle's stroke.
                              progress={
                                claimsDetail
                                  ? claimsDetail.totalClaimsCount
                                  : ""
                              } // String: Update to change the progress and percentage.
                              progressColor="var(--primary)" // String: Color of "progress" portion of circle.
                              bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                              textColor="#6b778c" // String: Color of percentage text color.
                              textStyle={{
                                fontSize: "6rem", // CSSProperties: Custom styling for percentage.
                              }}
                              percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                              roundedStroke={true} // Boolean: Rounded/Flat line ends
                              showPercentage={true} // Boolean: Show/hide percentage.
                              showPercentageSymbol={false} // Boolean: Show/hide only the "%" symbol.
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md="6" lg="4">
              <Card className="widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-warning border-warning">
                <div className="widget-chat-wrapper-outer">
                  <div className="widget-chart-content">
                    <div className="widget-title opacity-5 text-uppercase">
                      {this.props.t("Statistics.NEW_CLAIMS")}
                    </div>
                    <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                      <div className="widget-chart-flex align-items-center">
                        <div>
                          <small className="opacity-5 pr-1 text-warning font-weight-bold">
                            $
                          </small>
                          {claimsDetail ? claimsDetail.newClaimsCount : ""}
                        </div>
                        <div className="ml-auto">
                          <Circle
                            animate={true} // Boolean: Animated/Static progress
                            animationDuration="10s" // String: Length of animation
                            responsive={false} // Boolean: Make SVG adapt to parent size
                            size="46" // String: Defines the size of the circle.
                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                            progress={
                              claimsDetail ? claimsDetail.newClaimsCount : ""
                            } // String: Update to change the progress and percentage.
                            progressColor="var(--warning)" // String: Color of "progress" portion of circle.
                            bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                            textColor="#6b778c" // String: Color of percentage text color.
                            textStyle={{
                              fontSize: "6rem", // CSSProperties: Custom styling for percentage.
                            }}
                            percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                            roundedStroke={true} // Boolean: Rounded/Flat line ends
                            showPercentage={true} // Boolean: Show/hide percentage.
                            showPercentageSymbol={false} // Boolean: Show/hide only the "%" symbol.
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md="6" lg="4">
              <Card className="widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-success border-success">
                <div className="widget-chat-wrapper-outer">
                  <div className="widget-chart-content">
                    <div className="widget-title opacity-5 text-uppercase">
                      {this.props.t("Statistics.ONLINE_USERS")}
                    </div>
                    <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                      <div className="widget-chart-flex align-items-center">
                        <div>
                          <small className="text-success fonr-weight-bold pr-1">
                            +
                          </small>
                          {claimsDetail ? claimsDetail.onlineUsersCount : ""}
                          {/* <small className='opacity-5 pl-1'></small> */}
                        </div>
                        <div className="ml-auto">
                          <Circle
                            animate={true} // Boolean: Animated/Static progress
                            animationDuration="10s" // String: Length of animation
                            responsive={false} // Boolean: Make SVG adapt to parent size
                            size="46" // String: Defines the size of the circle.
                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                            progress={
                              claimsDetail ? claimsDetail.onlineUsersCount : ""
                            } // String: Update to change the progress and percentage.
                            progressColor="var(--success)" // String: Color of "progress" portion of circle.
                            bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                            textColor="#6b778c" // String: Color of percentage text color.
                            textStyle={{
                              fontSize: "6rem", // CSSProperties: Custom styling for percentage.
                            }}
                            percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                            roundedStroke={true} // Boolean: Rounded/Flat line ends
                            showPercentage={true} // Boolean: Show/hide percentage.
                            showPercentageSymbol={false} // Boolean: Show/hide only the "%" symbol.
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          {this.state.monthName.length ? (
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody className="text-center">
                    <span>{this.props.t("Statistics.CLAIM_OVERVIEW")}</span>
                    <div id="chart">
                      <GraphOne
                        monthName={this.state.monthName}
                        monthData={this.state.monthData}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ) : (
            ""
          )}
        </ReactCSSTransitionGroup>
        {/* <FooterComponent /> */}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    claimStat: state.Statistics.claimStat
      ? state.Statistics.claimStat.months
      : [],
    claimsDetail: state.Statistics.claimStat,
    claimReportData: state.Statistics.claimReportData,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ClaimsOverviewStat);
