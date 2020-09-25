import React, { Fragment, Component } from "react";
import { Container, Row, Card, CardBody, Col, FormGroup } from "reactstrap";
import { reduxForm, Field } from "redux-form";
import { translate } from "react-multi-lang";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { renderTextField } from "../../Common/RenderTextField";
import Logo from "../../../assets/img/svg/LOGO.svg";
import { forgotPassword } from "../../../actions/accountAction";
import SubmitBtnLoader from "../../Common/ButtonLoader";
import { showError, required, EMAIL_REGEX } from "../../Helpers/utils";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  componentWillReceiveProps = (nextProps, props) => {
    if (
      nextProps.forgotPasswordNetworkErrorStatus &&
      nextProps.forgotPasswordNetworkErrorStatus !==
        this.props.forgotPasswordNetworkErrorStatus
    ) {
      showError(this.props.t("Common.SOMETHING_WENT_WRONG"));
      this.setState({
        loading: false,
      });
    }
    if (
      nextProps.forgotPasswordErrorStatus &&
      nextProps.forgotPasswordErrorStatus !==
        this.props.forgotPasswordErrorStatus
    ) {
      showError(nextProps.forgotPasswordErrorStatus);
      this.setState({
        loading: false,
      });
    }
    if (
      (nextProps.emailSuccess) !==
      this.props.emailSuccess
    ) {
      setTimeout(
        function() {
          this.props.history.push("/backoffice/change-password");
        }.bind(this),
        1000
      );
      this.setState({
        loading: false,
      });
    }
  };

  onSubmit = (formProps) => {
    const reqData = {
      email: formProps.Email,
      isBackOfficeUser: true,
    };

    if (this.state.emailValidation) {
      this.props.dispatch(forgotPassword(reqData));
      this.setState({
        loading: true,
      });
    }
  };

  validateEmail = (e) => {
    if (emailRex.test(e.target.value)) {
      this.setState({
        emailValidation: true,
      });
    } else {
      this.setState({
        emailValidation: false,
      });
    }
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Fragment>
        {/* Login */}
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Container fluid className="login-block c-h">
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
                    <p className="text-center fy mb-3">
                      {this.props.t("ForgotPassword.TITLE_TEXT")}
                    </p>
                    <AvForm
                      className="px-5"
                      noValidate
                      onSubmit={handleSubmit(this.onSubmit)}
                    >
                      <FormGroup>
                        <AvField
                          name="Email"
                          tag={Field}
                          component={renderTextField}
                          label={this.props.t("ForgotPassword.EMAIL")}
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

                      <div className="text-center pt-3">

                        <SubmitBtnLoader
                          label={this.props.t("ForgotPassword.SUBMIT")}
                          className="btn btn-lg btn-primary px-5 btn-pill"
                          loading={this.state.loading}
                          submitting={""}
                          type="submit"
                        />
                      </div>
                    </AvForm>
                  </CardBody>
                  <div className="text-center text-white p-ab">
                    <p className="c-bg p-3 ">
                      <a
                        onClick={(e) =>
                          this.props.history.push("/backoffice/login")
                        }
                      >
                        <u className="fx"> {this.props.t("Login.LOGIN")}</u>
                      </a>
                    </p>
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
ForgotPassword = reduxForm({
  form: "ForgotPassword",
})(ForgotPassword);
function mapStateToProps(state) {
  return {
    forgotPasswordNetworkErrorStatus:
      state.Account.forgotPasswordNetworkErrorStatus,
    forgotPasswordErrorStatus: state.Account.forgotPasswordErrorStatus,
    emailSuccess: state.Account.emailSuccess,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ForgotPassword);
