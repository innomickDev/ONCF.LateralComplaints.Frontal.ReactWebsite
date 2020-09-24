import React, { Fragment } from "react";

import Ionicon from "react-ionicons";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
  DropdownToggle,
  DropdownMenu,
  Nav,
  Col,
  Row,
  Button,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown,
} from "reactstrap";
import { connect } from "react-redux";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IdleTimer from "react-idle-timer";
import { showError } from "../../../Pages/Helpers/utils";
import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";

class UserBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      userData: JSON.parse(localStorage.getItem("user")),
    };
    this.idleTimer = null;
  }

  notify2 = () =>
    (this.toastId = toast(
      "You don't have any new items in your calendar for today! Go out and play!",
      {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: "bottom-center",
        type: "success",
      }
    ));
  onActive = () => {};
  onAction = () => {};
  onIdle = (e) => {
    console.log("logout");
    showError(this.props.t("Common.SESSION_TIMEOUT"));
    this.logOut();
  };
  logOut = () => {
    localStorage.removeItem("boGRCuserDetails");
    localStorage.removeItem("boGRCAuthToken");
    localStorage.removeItem("boGRCuserProfile");
    localStorage.removeItem("trainDetails");
    localStorage.removeItem("claimData");
    localStorage.removeItem("claimId");
    this.props.history.push("/backoffice/login");
    window.location.reload();
  };

  render() {
    const boGRCuserProfile = JSON.parse(
      localStorage.getItem("boGRCuserDetails")
    );

    return (
      <Fragment>
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={1000 * 60 * 5}
        />
        <div className="header-btn-lg pr-0">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left" id="backoffice-nav">
                <UncontrolledButtonDropdown>
                  <DropdownToggle color="link" className="p-0">
                    {boGRCuserProfile.data
                      ? boGRCuserProfile.data.userName
                      : ""}
                    <FontAwesomeIcon
                      className="ml-2 opacity-8"
                      icon={faAngleDown}
                    />
                  </DropdownToggle>

                  <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                    <div className="dropdown-menu-header">
                      <div className="dropdown-menu-header-inner bg-info">
                        <div
                          className="menu-header-image opacity-2"
                          style={{
                            backgroundImage: "url(" + city3 + ")",
                          }}
                        />
                        <div className="menu-header-content text-left">
                          <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left">
                                <div className="widget-heading c-text-m">
                                  {/* User name */}
                                  {boGRCuserProfile.data
                                    ? boGRCuserProfile.data.userName
                                    : ""}
                                </div>
                                <div className="widget-subheading opacity-8"></div>
                              </div>
                              <div className="widget-content-right mr-2">
                                <Button
                                  className="btn-pill btn-shadow btn-shine"
                                  onClick={(e) => {
                                    this.logOut();
                                  }}
                                  color="focus"
                                >
                                  {this.props.t("Common.LOGOUT")}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <PerfectScrollbar>
                        <Nav vertical>
                          <NavItem>
                            <NavLink
                              onClick={(e) =>
                                this.props.history.push(
                                  "/dashboards/change-password-backoffice"
                                )
                              }
                              className="pull-right"
                            >
                              {this.props.t("Common.CHANGE_PASSWORD")}
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </PerfectScrollbar>
                    </div>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              <div className="widget-content-left  ml-3 header-user-info">
                <div className="widget-heading"></div>
                <div className="widget-subheading"></div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
UserBox = reduxForm({
  form: "UserBox",

  //validate,
  // asyncValidate,
})(UserBox);

const mapStateToProps = (state) => {
  return {
    user: state.Login.user,
  };
};

export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(UserBox);
