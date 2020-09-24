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
  getLangBasedDataLabel,
  canManage,
  permissions,
} from "../../Helpers/utils";
import ReactApexChart from "react-apexcharts";
import { Row, Col, Card, CardBody } from "reactstrap";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Circle from "react-circle";
import CategoryGraph from "../StatisticsComponent/Graphs/categoryGraph";
import EntityBarGraph from "../StatisticsComponent/Graphs/entityBarGraph";
import EntityPercentageGraph from "../StatisticsComponent/Graphs/entityPercentageGraph";
// api calls
import {
  getClaimByCategoryStatistics,
  getClaimByEntityStatistics,
} from "../../../actions/claimAction";

class claimStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      stationNames: null,
      loading: false,
      isShowRolesModal: false,
      mainLoader: true,
      monthData: [],
      countData: [],
      monthName: [],
      entityName: [],
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
    if (!canManage(permissions.canViewClaimDashboard)) {
      this.props.history.push("/dashboards/Welcome");
    }
  };

  componentDidMount = () => {
    this.props.dispatch(getClaimByCategoryStatistics());
    this.props.dispatch(getClaimByEntityStatistics());
  };
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.graphEntityData &&
      nextProps.graphEntityData !== this.props.graphEntityData
    ) {
      let entityName = [];
      let percentageRate = [];
      let totalCount = [];

      nextProps.graphEntityData.map((entitySatistic, key) => {
        entityName.push(entitySatistic.enitityName);
        percentageRate.push(entitySatistic && entitySatistic.percentageRate);

        totalCount.push(entitySatistic.totalCount);
      });
      this.setState({
        entityName: entityName,
        percentageRate: percentageRate,

        totalCount: totalCount,
      });
    }

    if (
      nextProps.graphCategoryData &&
      nextProps.graphCategoryData !== this.props.graphCategoryData
    ) {
      let categoryName = [];
      let countData = [];
      nextProps.graphCategoryData.map((categorySatistic, key) => {
        categoryName.push(
          categorySatistic ? getLangBasedDataLabel(categorySatistic) : ""
        );
        countData.push(categorySatistic.totalCount);
      });
      this.setState({
        categoryName: categoryName,
        countData: countData,
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
  };

  render() {
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
          <Row></Row>
          {this.state.categoryName && this.state.categoryName.length ? (
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody className="text-center">
                    <span>{this.props.t("Statistics.CLAIM_CATEGORIES")}</span>
                    <div id="chart">
                      <CategoryGraph
                        categoryName={this.state.categoryName}
                        countData={this.state.countData}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody className="text-center">
                    <span>{this.props.t("Statistics.CLAIM_CATEGORIES")}</span>
                    No data
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}

          {this.state.entityName && this.state.entityName.length ? (
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody className="text-center">
                    <span>{this.props.t("Statistics.CLAIM_ENTITIES")}</span>
                    <div id="chart">
                      <EntityBarGraph
                        entityName={this.state.entityName}
                        percentageRate={this.state.percentageRate}
                        totalCount={this.state.totalCount}
                        // lessPercentageRate={this.state.lessPercentageRate}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody className="text-center">
                    <span>{this.props.t("Statistics.CLAIM_ENTITIES")}</span>
                    <div id="chart">
                      {/* <EntityBarGraph
                        entityName={this.state.entityName}
                        percentageRate={this.state.percentageRate}
                        totalCount={this.state.totalCount}
                        // lessPercentageRate={this.state.lessPercentageRate}
                      /> */}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}

          {this.state.entityName && this.state.entityName.length ? (
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody className="text-center">
                    <span>{this.props.t("Statistics.PERCENTAGE_RATE")}</span>
                    <div id="chart">
                      <EntityPercentageGraph
                        entityName={this.state.entityName}
                        percentageRate={this.state.percentageRate}
                        totalCount={this.state.totalCount}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardBody className="text-center">
                    <span>{this.props.t("Statistics.PERCENTAGE_RATE")}</span>
                    <div id="chart">
                      {/* <EntityPercentageGraph
                        entityName={this.state.entityName}
                        percentageRate={this.state.percentageRate}
                        totalCount={this.state.totalCount}
                      /> */}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </ReactCSSTransitionGroup>
        {/* <FooterComponent /> */}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    graphEntityData: state.Claim.graphEntityData
      ? state.Claim.graphEntityData.entities
      : [],
    graphCategoryData: state.Claim.graphCategoryData
      ? state.Claim.graphCategoryData.catagories
      : [],
    claimStat: state.Statistics.claimStat
      ? state.Statistics.claimStat.months
      : [],
    claimsDetail: state.Statistics.claimStat,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(claimStatistics);
