import React, { Fragment, Component } from "react";
import { Row, Col, Card, Container, CardBody } from "reactstrap";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { translate } from "react-multi-lang";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { getClaimsDetailsById } from "../../../actions/claimAction";
import qString from "query-string";
import {
  dateTimeFormat,
  simpleDateFormat,
  getLangBasedStationLabel,
  getLangBasedDataLabel,
} from "../../Helpers/utils";
const claimCode = JSON.parse(localStorage.getItem("claimId"));
class ClaimsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddMember: false,
    };
    this.params = qString.parse(this.props.location.search);
  }
  componentDidMount = () => {
    const params = qString.parse(this.props.location.search);
    this.props.dispatch(getClaimsDetailsById(params.code));
  };
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.getClaimsDataById &&
      nextProps.getClaimsDataById !== this.props.getClaimsDataById
    ) {
      this.setState({
        getClaimsDataById: nextProps.getClaimsDataById,
      });
    }
  };

  render() {
    const getClaimsDataById = this.state.getClaimsDataById
      ? this.state.getClaimsDataById
      : null;
    return (
      <Fragment>
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
                  <div>{this.props.t("Common.PROCESS_CLAIM_DETAIL")}</div>
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
                        {this.props.t("Common.PROCESS_CLAIM_DETAIL")}
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
                  <CardBody>
                    <h4>{this.props.t("Common.PROCESS_CLAIM_DETAIL")}</h4>
                    <Row>
                      <Col md={6}>
                        <ul className="list-group">
                          {/* <li className="list-group-item">
                            {" "}
                            {this.props.t("Common.NAME")} :{" "}
                            <b>
                              {getClaimsDataById
                                ? getClaimsDataById.userFullName
                                : ""}
                            </b>
                          </li> */}
                          {/* <li class='list-group-item'>
                            {this.props.t("Common.LAST_NAME")} :{" "}
                            <b>
                              {getClaimsDataById ? getClaimsDataById.lastName : ""}
                            </b>
                          </li> */}
                          <li className="list-group-item">
                            {this.props.t("Common.COMPLAINT_CHANNEL")} :{" "}
                            <b>
                              {getClaimsDataById && getClaimsDataById
                                ? getClaimsDataById.claimChannel
                                : "none"}
                            </b>
                          </li>
                          <li class="list-group-item">
                            {this.props.t("Common.REF_NUM")} :{" "}
                            <b>
                              {getClaimsDataById
                                ? getClaimsDataById.referenceNo
                                : ""}
                            </b>
                          </li>
                          <li class="list-group-item">
                            {this.props.t("Common.TRAIN_NUMBER")} :{" "}
                            <b>
                              {getClaimsDataById
                                ? getClaimsDataById.trainNumber
                                : ""}
                            </b>
                          </li>
                          <li class="list-group-item">
                            {this.props.t("Common.CLAIM_SUBJECT")} :{" "}
                            <b>
                              {getClaimsDataById
                                ? getClaimsDataById.claimSubject
                                : ""}
                            </b>
                          </li>
                          <li class="list-group-item">
                            {" "}
                            {this.props.t("Common.CATEGORY")} :{" "}
                            <b>
                              {getClaimsDataById && getClaimsDataById
                                ? getLangBasedDataLabel(
                                    getClaimsDataById.category
                                  )
                                : "none"}
                            </b>
                          </li>
                          <li className="list-group-item">
                            {this.props.t("Common.SUB_CATEGORY")} :{" "}
                            <b>
                              {getClaimsDataById && getClaimsDataById
                                ? getLangBasedDataLabel(
                                    getClaimsDataById.subCategory
                                  )
                                : "none"}
                            </b>
                          </li>
                        </ul>
                      </Col>
                      <Col md={6}>
                        <ul className="list-group">
                          <li class="list-group-item">
                            {" "}
                            {this.props.t("Common.SUB_SUB_CATEGORY")} :{" "}
                            <b>
                              {getClaimsDataById &&
                              getClaimsDataById.subSubCategory
                                ? getLangBasedDataLabel(
                                    getClaimsDataById.subSubCategory
                                  )
                                : "none"}
                            </b>
                          </li>
                          <li className="list-group-item">
                            {this.props.t("Common.DEPATURE_STN")} :{" "}
                            <b>
                              {getClaimsDataById && getClaimsDataById
                                ? getLangBasedStationLabel(
                                    getClaimsDataById.departureStation
                                  )
                                : "none"}
                            </b>
                          </li>
                          <li className="list-group-item">
                            {this.props.t("Common.ARRIVAL_STN")} :{" "}
                            <b>
                              {getClaimsDataById && getClaimsDataById
                                ? getLangBasedStationLabel(
                                    getClaimsDataById.arrivalStation
                                  )
                                : "none"}
                            </b>
                          </li>
                          <li className="list-group-item">
                            {this.props.t("Common.CREATION_DATE")} :{" "}
                            <b>
                              {getClaimsDataById && getClaimsDataById
                                ? simpleDateFormat(getClaimsDataById.createDate)
                                : ""}
                            </b>
                          </li>
                          <li className="list-group-item">
                            {this.props.t("Common.UPDATE_DATE")} :{" "}
                            <b>
                              {getClaimsDataById && getClaimsDataById
                                ? simpleDateFormat(
                                    getClaimsDataById.lastModifiedDate
                                  )
                                : ""}
                            </b>
                          </li>
                          <li className="list-group-item">
                            {this.props.t("Common.CLAIM_DETAILS")} :{" "}
                            <b>
                              {getClaimsDataById
                                ? getClaimsDataById.claimDetails
                                : ""}
                            </b>
                          </li>
                        </ul>
                      </Col>
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

// ClaimsManagement = reduxForm({
//   form: "RegisterForm",
// })(ClaimsManagement);
function mapStateToProps(state) {
  return {
    getClaimsDataById: state.Claim.getClaimsDataById,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ClaimsDetails);
