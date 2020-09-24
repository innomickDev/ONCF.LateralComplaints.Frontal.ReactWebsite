import React, { Fragment, Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { translate } from "react-multi-lang";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import FooterComponent from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  INDEX_PAGE_SIZE_DEFAULT,
  INDEX_PAGE_SIZE_OPTIONS,
  canManage,
  permissions,
  showError,
} from "../../Helpers/utils";
import ReactApexChart from "react-apexcharts";
// api calls
import { Row, Col, Card, CardBody } from "reactstrap";
// import MainLoader from "../../Common/Loader";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Circle from "react-circle";
// import avatar1 from "../../../assets/utils/images/avatars/1.jpg";
import {
  getUsersStatistics,
  getUsersStatisticsReport,
} from "../../../actions/staticticsAction";
import MembersGraph from "./Graphs/MemberGraph";
class MembersStat extends Component {
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
    if (!canManage(permissions.canViewUserStatistics)) {
      this.props.history.push("/dashboards/Welcome");
    }
  };
  componentDidMount = () => {
    this.props.dispatch(getUsersStatistics());
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.userStat && nextProps.userStat !== this.props.userStat) {
      this.setState({
        userStat: nextProps.userStat,
      });
    }
    // for graph
    if (nextProps.userGraph && nextProps.userGraph !== this.props.userGraph) {
      // mappping new users

      let monthName = [];
      let countData = [];
      nextProps.userGraph.map((userSatistic, key) => {
        monthName.push(this.props.t(userSatistic.monthName));
        countData.push(userSatistic.count);
      });
      this.setState({
        monthName: monthName,
        monthData: countData,
      });
    }

    // for online users
    if (
      nextProps.onlineUsers &&
      nextProps.onlineUsers !== this.props.onlineUsers
    ) {
      let newUsersEmail = [];
      nextProps.onlineUsers.map((boGRCuserDetails, key) => {
        return newUsersEmail.push(
          <li className="list-unstyled">
            <i className="fas fa-circle text-success"></i>&nbsp;{" "}
            {boGRCuserDetails.email}
          </li>
        );
      });
      this.setState({ newUsersEmail });
    }
    if (
      nextProps.userReportData &&
      nextProps.userReportData !== this.props.userReportData
    ) {
      console.log(nextProps.userReportData);
      if (
        nextProps.userReportData.userStaticsReports &&
        nextProps.userReportData.userStaticsReports !== ""
      ) {
        this.setState({
          userReportData: nextProps.userReportData.userStaticsReports,
        });
        setTimeout(
          function() {
            document.getElementById("claimId") &&
              document.getElementById("claimId").click();
            this.setState({
              userReportData: null,
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
    const userStat = this.state.userStat;

    const newUsersEmail = this.state.newUsersEmail;

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
                onClick={(e) => this.props.dispatch(getUsersStatisticsReport())}
              >
                {this.props.t("Common.EXPORT_IN_EXCEL")}
              </button>
              <br />
              <br />
              <a
                id="claimId"
                href={
                  this.state.userReportData
                    ? `data:application/vnd.ms-excel;base64,${this.state.userReportData}`
                    : "#"
                }
                target={"_blank"}
                download={"UserStatStatistics.xlsx"}
              ></a>
              <br />
            </Col>
            <Col md="6" lg="3">
              <Card className="widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-primary border-primary">
                <div className="widget-chat-wrapper-outer">
                  <div className="widget-chart-content">
                    <div className="widget-title opacity-5 text-uppercase">
                      {this.props.t("Statistics.TOTAL_MEMBER")}
                    </div>
                    <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                      <div className="widget-chart-flex align-items-center">
                        <div>
                          <span className="opacity-10 text-success pr-2">
                            <FontAwesomeIcon icon={faAngleUp} />
                          </span>
                          {userStat ? userStat.totalUsersCount : ""}
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
                                userStat ? userStat.totalUsersCount : ""
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
            <Col md="6" lg="3">
              <Card className="widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-danger border-danger">
                <div className="widget-chat-wrapper-outer">
                  <div className="widget-chart-content">
                    <div className="widget-title opacity-5 text-uppercase">
                      {this.props.t("Statistics.NEW_MEMBER")}
                    </div>
                    <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                      <div className="widget-chart-flex align-items-center">
                        <div>
                          <span className="opacity-10 text-danger pr-2">
                            <FontAwesomeIcon icon={faAngleDown} />
                          </span>
                          {userStat ? userStat.newUsersCount : ""}
                          {/* <small className="opacity-5 pl-1">%</small> */}
                        </div>
                        <div className="ml-auto">
                          <Circle
                            animate={true} // Boolean: Animated/Static progress
                            animationDuration="10s" // String: Length of animation
                            responsive={false} // Boolean: Make SVG adapt to parent size
                            size="46" // String: Defines the size of the circle.
                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                            progress={userStat ? userStat.newUsersCount : ""} // String: Update to change the progress and percentage.
                            progressColor="var(--danger)" // String: Color of "progress" portion of circle.
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
            <Col md="6" lg="3">
              <Card className="widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-warning border-warning">
                <div className="widget-chat-wrapper-outer">
                  <div className="widget-chart-content">
                    <div className="widget-title opacity-5 text-uppercase">
                      {this.props.t("Statistics.ACTIVE_MEMBER")}
                    </div>
                    <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                      <div className="widget-chart-flex align-items-center">
                        <div>
                          <small className="opacity-5 pr-1 text-warning font-weight-bold">
                            $
                          </small>
                          {userStat ? userStat.onlineUsersCount : ""}
                        </div>
                        <div className="ml-auto">
                          <Circle
                            animate={true} // Boolean: Animated/Static progress
                            animationDuration="10s" // String: Length of animation
                            responsive={false} // Boolean: Make SVG adapt to parent size
                            size="46" // String: Defines the size of the circle.
                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                            progress={userStat ? userStat.onlineUsersCount : ""} // String: Update to change the progress and percentage.
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
            <Col md="6" lg="3">
              <Card className="widget-chart widget-chart2 text-left mb-3 card-btm-border card-shadow-success border-success">
                <div className="widget-chat-wrapper-outer">
                  <div className="widget-chart-content">
                    <div className="widget-title opacity-5 text-uppercase">
                      {this.props.t("Statistics.ONLINE_MEMBER")}
                    </div>
                    <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                      <div className="widget-chart-flex align-items-center">
                        <div>
                          <small className="text-success fonr-weight-bold pr-1">
                            +
                          </small>
                          {userStat ? userStat.activeUsersCount : ""}
                          <small className="opacity-5 pl-1">
                            {this.props.t("Statistics.ONLINE")}
                          </small>
                        </div>
                        <div className="ml-auto">
                          <Circle
                            animate={true} // Boolean: Animated/Static progress
                            animationDuration="10s" // String: Length of animation
                            responsive={false} // Boolean: Make SVG adapt to parent size
                            size="46" // String: Defines the size of the circle.
                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                            progress={userStat ? userStat.activeUsersCount : ""} // String: Update to change the progress and percentage.
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
          <Row>
            <Col md="9">
              {this.state.monthName.length ? (
                <Card className="main-card mb-3 text-center">
                  <span className="px-4 py-3 ">
                    {this.props.t("Statistics.RECENT_MEMBER")}
                  </span>
                  <CardBody className="text-center">
                    <div id="chart">
                      <MembersGraph
                        monthName={this.state.monthName}
                        monthData={this.state.monthData}
                      />
                    </div>
                  </CardBody>
                </Card>
              ) : (
                ""
              )}
            </Col>
            <Col md="3">
              <Card className="main-card card-height">
                <CardBody className>
                  <ul className="list-unstyled">{this.state.newUsersEmail}</ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
        {/* <FooterComponent /> */}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    userStat: state.Statistics.userStat,
    // for graph
    userGraph: state.Statistics.userStat ? state.Statistics.userStat.month : [],
    // for online users
    onlineUsers: state.Statistics.userStat
      ? state.Statistics.userStat.newUsers
      : [],
    userReportData: state.Statistics.userReportData,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(MembersStat);
