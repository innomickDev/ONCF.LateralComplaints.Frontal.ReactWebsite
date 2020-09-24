import React, { Fragment, Component } from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  Col,
  Button,
  FormGroup,
} from "reactstrap";
import { reduxForm, Field } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { BackOffice } from "../../../actions/loginAction";
import { myProfile } from "../../../actions/accountAction";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { renderTextField } from "../../Common/RenderTextField";
import Logo from "../../../assets/img/svg/LOGO.svg";
import SubmitBtnLoader from "../../Common/ButtonLoader";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  showError,
  EMAIL_REGEX,
  canManage,
  permissions,
} from "../../Helpers/utils";

class BackOfficeLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {},
      isAuthenticating: false,
      loading: false,
    };
  }

  componentWillMount = () => {
    if (this.props.location.search === "?isExpired=1") {
      return false;
    } else {
      localStorage.setItem("lang", "fr-FR"); //todo

      if (localStorage.getItem("boGRCuserDetails")) {
        this.props.history.push("/dashboards/claim-lists");
        // this.props.history.push("/backoffice/login");
      }
    }
  };
  componentWillReceiveProps = (nextProps, props) => {
    if (
      nextProps.isAuthenticated &&
      nextProps.isAuthenticated !== this.props.isAuthenticated
    ) {
      this.setState({
        isShowLoader: false,
        errorText: null,
        isShowError: false,
        loading: false,
      });

      if (nextProps.loginData && nextProps.loginData !== this.props.loginData) {
        this.props.dispatch(myProfile());
      }
    }

    console.log(nextProps.profileData);
    if (
      nextProps.profileData &&
      nextProps.profileData !== this.props.profileData
    ) {
      console.log(nextProps.profileData);
      if (
        !canManage(permissions.canViewCustomerGRCClaims) &&
        !canManage(permissions.canViewCustomer2255Claims)
      ) {
        setTimeout(() => {
          this.props.history.push("/dashboards/Welcome");
        }, 2000);
      } else {
        setTimeout(() => {
          this.props.history.push("/dashboards/claim-lists");
          // window.location.reload();
        }, 2000);
      }
    }

    // this.props.dispatch(myProfile());
    // setTimeout(() => {
    //   this.props.history.push("/dashboards/claim-lists");
    //   // window.location.reload();
    // }, 2000);

    // TODO remove settime out from backoffice loading

    if (
      nextProps.loginErrorStatus &&
      nextProps.loginErrorStatus !== this.props.loginErrorStatus
    ) {
      this.setState({ isAuthenticating: false });
      showError(nextProps.loginErrorStatus);
      this.setState({
        loading: false,
      });
    }
    if (
      nextProps.loginNetworkErrorStatus &&
      nextProps.loginNetworkErrorStatus !== this.props.loginNetworkErrorStatus
    ) {
      showError(nextProps.loginNetworkErrorStatus);
      this.setState({
        loading: false,
      });
    }
  };

  onSubmit = (formProps) => {
    if (this.state.emailValidation && this.state.passwordValidation) {
      this.props.dispatch(BackOffice(formProps));

      this.setState({
        loading: true,
      });
    }
  };

  validateEmail = (e) => {
    if (EMAIL_REGEX.test(e.target.value)) {
      this.setState({
        emailValidation: true,
      });
    } else {
      this.setState({
        emailValidation: false,
      });
    }
  };
  /**
   * call this function to validate password
   */
  validatePassword = (e) => {
    if (e.target.value) {
      this.setState({
        passwordValidation: true,
      });
    } else {
      this.setState({
        passwordValidation: false,
      });
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
          {/* Login */}
          <Container fluid className="login-block">
            <Row className="">
              <Col md={4} className="mx-auto">
                <Card className="main-card mb-3">
                  <CardBody>
                    <div className="text-center p-2">
                      <a
                        href="javascript:void(0);"
                        onClick={(e) =>
                          this.props.history.push("/backoffice/home")
                        }
                      >
                        <img
                          src={Logo}
                          alt="logo"
                          className="img-fluid"
                          width="30%"
                        />
                      </a>
                    </div>
                    <br />
                    <div className="text-center">
                      <h6 className="text-danger font-weight-bold">
                        {this.props.t("Common.BACKOFFICE_LOGIN")}
                      </h6>
                    </div>
                    <AvForm
                      className="px-5"
                      noValidate
                      onSubmit={handleSubmit(this.onSubmit)}
                    >
                      <FormGroup>
                        <AvField
                          name="email"
                          tag={Field}
                          component={renderTextField}
                          label={this.props.t("Login.EMAIL")}
                          type="text"
                          validate={{ email: true }}
                          onChange={(e) => this.validateEmail(e)}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: this.props.t(
                                "ErrorMsg.EMAIL_ERROR"
                              ),
                            },
                            pattern: {
                              value: EMAIL_REGEX,
                              errorMessage: this.props.t("Common.WRONG_EMAIL"),
                            },
                          }}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <AvField
                          name="password"
                          tag={Field}
                          component={renderTextField}
                          label={this.props.t("Login.PASSWORD")}
                          type="password"
                          maxLength={14}
                          onChange={(e) => this.validatePassword(e)}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: this.props.t(
                                "ErrorMsg.PASSWORD_ERROR"
                              ),
                            },
                          }}
                          required
                        />
                      </FormGroup>
                      <div className="text-center">
                        <SubmitBtnLoader
                          label={this.props.t("Login.SUBMIT")}
                          className="btn btn-lg btn-primary px-5 btn-pill"
                          loading={this.state.loading}
                          submitting={""}
                          type="submit"
                        />
                      </div>
                    </AvForm>
                    <div className="text-center mt-4 font-weight-bold">
                      <a
                        href="javascript:void(0);"
                        onClick={(e) =>
                          this.props.history.push("/backoffice/forgot-password")
                        }
                      >
                        <span className="c-text text-underline">
                          <u> {this.props.t("Login.FORGOT_PASS")}</u>
                        </span>
                      </a>
                    </div>
                  </CardBody>
                  <div className="text-center text-white p-ab">
                    <p className="c-bg p-3 "></p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
BackOfficeLogin = reduxForm({
  form: "LoginPage",
  //validate,
  // asyncValidate,
})(BackOfficeLogin);
function mapStateToProps(state) {
  console.log(state.Account.profileData);
  return {
    success: true,
    isAuthenticated: state.Login.isAuthenticated,
    isAuthenticating: state.Login.isAuthenticating,
    loginErrorText: state.Login.statusText,
    user: state.Login.user,
    loginData: state.Login.loginData,
    loginNetworkError: state.Login.loginNetworkError,
    loginErrorStatus: state.Login.loginErrorStatus,
    profileData: state.Account.profileData,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(BackOfficeLogin);
