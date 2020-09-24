import React, { Fragment, Component } from "react";
import {
  Row,
  Col,
  Card,
  FormGroup,
  Button,
  Container,
  CardHeader,
  Label,
} from "reactstrap";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { translate } from "react-multi-lang";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { renderTextField } from "../../Common/RenderTextField";

import {
  getTimeLimitConfiguration,
  updateTimeLimitConfiguration,
} from "../../../actions/timeLimitConfigurationAction";
import {
  getBase64,
  showError,
  showSuccess,
  PHONE_REGEX,
  canManage,
  permissions,
} from "../../Helpers/utils";

import { v1 as uuidv1 } from "uuid";

class TimeLimitConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequesting: false,
      showAddMember: false,
      isLoading: false,
    };
  }

  //for access cntrl
  componentWillMount = () => {
    if (!canManage(permissions.canManageTimeLimit)) {
      this.props.history.push("/dashboards/Welcome");
    }
  };
  componentDidMount = () => {
    this.props.dispatch(getTimeLimitConfiguration());
  };
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.timeLimitData &&
      nextProps.timeLimitData !== this.props.timeLimitData
    ) {
      this.setState({
        timeLimitData: nextProps.timeLimitData,
      });
    }

    this.setState({
      isLoading: nextProps.isLoading,
    });

    if (
      nextProps.isUpdateTimeLimitSuccess &&
      nextProps.isUpdateTimeLimitSuccess !== this.props.isUpdateTimeLimitSuccess
    ) {
      showSuccess(this.props.t("Common.UPDATE_SUCCESS"));
      this.props.dispatch(getTimeLimitConfiguration());
      this.setState({
        isUpdateTimeLimitSuccess: nextProps.isUpdateTimeLimitSuccess,
      });
    }

    this.setState({
      isRequesting: nextProps.isRequesting,
    });
    if (
      nextProps.isUpdateTimeLimitFailure &&
      nextProps.isUpdateTimeLimitFailure !== this.props.isUpdateTimeLimitFailure
    ) {
      showError(this.props.t("Some thing went wrong please try again later"));
    }
  };

  onSubmit = (formProps) => {
    const formData = {
      entitiesTimeLimit: formProps.entitiesTimeLimit,
      revivalTimeLimit: formProps.revivalTimeLimit,
    };
    if (formProps.entitiesTimeLimit && formProps.revivalTimeLimit) {
      this.props.dispatch(updateTimeLimitConfiguration(formData));
    } else {
      showError(this.props.t("Common.REQUIRED_FIELDS"));
    }
  };
  render() {
    const { handleSubmit } = this.props;
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
                  <div>{this.props.t("TimeLimitConfiguration.TIME_LIMIT")}</div>
                </div>
                <div className="page-title-actions">
                  <Breadcrumb>
                    <BreadcrumbItem>
                      <a href="javascript:void(0);">
                        <FontAwesomeIcon icon={faHome} />
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      {/* <a href="javascript:void(0);"> */}
                      {this.props.t("TimeLimitConfiguration.TIME_LIMIT")}
                      {/* </a> */}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>
          <Container fluid className="claim-block c-h">
            <Row className="">
              <Col md={12}>
                <Card className="main-card ">
                  <CardHeader className="c-header">
                    <Row className="text-center w-100 text-light">
                      <Col md={12} className="mx-auto">
                        <h5 className=" text-canter py-3  font-weight-bold rounded">
                          {this.props.t("TimeLimitConfiguration.TIME_LIMIT")}
                        </h5>
                      </Col>
                    </Row>
                  </CardHeader>

                  <AvForm
                    className=" px-5 py-5 login-av"
                    noValidate
                    onSubmit={handleSubmit(this.onSubmit)}
                    model={this.props.initialValues}
                  >
                    <Row className="mx-auto w-50">
                      <Label
                        className={
                          "ml-5 font-weight-bold  filter-labels d-inline"
                        }
                        for="examplePassword"
                      >
                        {this.props.t(
                          "TimeLimitConfiguration.ENTITIES_TIME_LIMIT"
                        )}
                        * :
                      </Label>
                      <Col md={6}>
                        <FormGroup>
                          <AvField
                            name="entitiesTimeLimit"
                            tag={Field}
                            component={renderTextField}
                            type="number"
                            validate={{
                              pattern: {
                                value: PHONE_REGEX,
                                errorMessage: this.props.t("Common.ONLY_NUM"),
                              },
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    {/*------------------------------------------------------------------------*/}
                    <Row className="mx-auto p-2 w-50">
                      <Label
                        className={
                          "ml-5 font-weight-bold  filter-labels d-inline"
                        }
                        for="examplePassword"
                      >
                        {this.props.t(
                          "TimeLimitConfiguration.REMINDER_TIME_LIMIT"
                        )}
                        * :
                      </Label>
                      <Col md={6}>
                        <FormGroup>
                          <AvField
                            name="revivalTimeLimit"
                            tag={Field}
                            component={renderTextField}
                            type="number"
                            validate={{
                              pattern: {
                                value: PHONE_REGEX,
                                errorMessage: this.props.t("Common.ONLY_NUM"),
                              },
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Col md={12}>
                      <div className="text-center">
                        <Button
                          color="btn btn-lg btn-primary px-5 btn-pill"
                          className="mt-1"
                          type="submit"
                          disabled={this.state.isRequesting}
                        >
                          {this.props.t("Common.UPDATE")}
                        </Button>
                        <br />
                      </div>
                    </Col>
                  </AvForm>
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

TimeLimitConfiguration = reduxForm({
  form: "RegisterForm",
})(TimeLimitConfiguration);
function mapStateToProps(state) {
  return {
    initialValues: state.TimeLimitConfiguration.timeLimitData,
    timeLimitData: state.TimeLimitConfiguration.timeLimitData,
    isUpdateTimeLimitFailure:
      state.TimeLimitConfiguration.isUpdateTimeLimitFailure,
    isUpdateTimeLimitSuccess:
      state.TimeLimitConfiguration.isUpdateTimeLimitSuccess,
    isRequesting: state.TimeLimitConfiguration.isRequesting,

    isLoading: state.TimeLimitConfiguration.isLoading,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(TimeLimitConfiguration);
