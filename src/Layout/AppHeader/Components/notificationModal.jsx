import React, { Component } from "react";
import {
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Nav,
  NavItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Form,
} from "reactstrap";
import { Col, Row, Container } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";

import Flag from "react-flagkit";

import Tabs from "react-responsive-tabs";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { reduxForm, Field } from "redux-form";

class NotificationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      disabled: false,
      isRequesting: false,
    };
  }
  toggle = () => {
    this.props.handleModal();
  };
  getNotification = () => {
    if (this.state.notificationData) {
      return (
        this.state.notificationData &&
        this.state.notificationData.map((notificationData, key) => {
          if (notificationData && notificationData.isSeen) {
            return (
              <VerticalTimelineElement className="vertical-timeline-item">
                <h4 className="timeline-title">
                  <a
                    href="javascript:void(0);"
                    onClick={(e) => this.showAllNotifications()}
                  // onClick={(e) => this.toggle()}
                  >
                    {notificationData ? notificationData.title : ""}
                  </a>
                  {/* {notificationData ? notificationData.notificationTitle : ""} */}
                </h4>
              </VerticalTimelineElement>
            );
          } else {
            return (
              <VerticalTimelineElement className="vertical-timeline-item">
                <h4 className="timeline-title">
                  <a
                    href="javascript:void(0);"
                    className="text-warning"
                    // onClick={(e) => this.toggle()}
                    onClick={(e) => this.showAllNotifications()}
                  >
                    {notificationData ? notificationData.title : ""}
                  </a>
                  {/* {notificationData ? notificationData.notificationTitle : ""} */}
                </h4>
              </VerticalTimelineElement>
            );
          }
        })
      );
    }
  };

  /*-----------on modal submit -----------*/
  onSubmit = (formProps) => { };
  componentWillReceiveProps(nextProps) { }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="d-inline-block mb-2 mr-2">
        <Modal
          isOpen={this.props.modal}
          toggle={this.state.isRequesting ? "" : this.toggle}
          className="addUser_modal"
        >
          {this.props.initialValues ? (
            <ModalHeader
              toggle={this.state.isRequesting ? "" : this.toggle}
              className="text-uppercase"
            >
              {this.props.t("TransportManagement.UPDATE_TITLE")}
            </ModalHeader>
          ) : (
              <ModalHeader toggle={this.toggle} className="text-uppercase">
                {this.props.t("TransportManagement.MODAL_TITLE")}
              </ModalHeader>
            )}
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <ModalBody className="boGRCuserDetails">
              <Container fluid={true}>
                <div className="header-dots">
                  <UncontrolledDropdown>
                    <DropdownToggle caret className="p-0 mr-2" color="link">
                      <button className="mb-1 mr-2 btn-icon btn-icon-only btn btn-link btn-sm">
                        <i className="fas fa-bell fa-3x text-light notification-size">
                          {" "}
                        </i>
                        <span className="badge badge-pill badge-warning">
                          {this.props.notificationData
                            ? this.props.notificationData.length
                            : ""}
                        </span>
                      </button>
                    </DropdownToggle>

                    <DropdownMenu
                      right
                      className="dropdown-menu-xl rm-pointers"
                    >
                      <div className="dropdown-menu-header mb-0">
                        <div className="dropdown-menu-header-inner bg-deep-blue">
                          <div
                            className="menu-header-image opacity-1"
                            style={{
                              backgroundImage: "url(" + city3 + ")",
                            }}
                          />
                          <div className="menu-header-content text-dark">
                            <h5 className="menu-header-title">Notifications</h5>
                            <h6 className="menu-header-subtitle"></h6>
                          </div>
                        </div>
                      </div>

                      <div className="scroll-area-sm">
                        <Tabs
                          tabsWrapperClass="body-tabs body-tabs-alt"
                          transform={false}
                          showInkBar={true}
                        />
                        <PerfectScrollbar>
                          <div className="p-3">
                            <VerticalTimeline
                              className="vertical-time-simple vertical-without-time"
                              layout="1-column"
                            >
                              {this.getNotification()}
                            </VerticalTimeline>
                          </div>
                        </PerfectScrollbar>
                      </div>

                      <Nav vertical>
                        <NavItem className="nav-item-divider" />
                        <NavItem className="nav-item-btn text-center">
                          <Button
                            size="sm"
                            className="btn-shadow btn-wide btn-pill"
                            color="focus"
                            type="submit"
                            onClick={this.onSubmit}
                            disabled={this.state.isRequesting}
                          >
                            Mark all as Read
                          </Button>
                        </NavItem>
                      </Nav>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
                {/* <Row className="mt-1">
                  <Col md="12"></Col>
                </Row> */}
              </Container>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                color="primary"
                disabled={this.state.isRequesting}
              >
                {this.props.t("Modal.TO_SEND")}{" "}
              </Button>
              <Button color="secondary" onClick={this.toggle}>
                {this.props.t("Modal.CLOSE")}{" "}
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}
export default compose(
  withRouter,
  translate,
  reduxForm({
    form: "NotificationComponent",
  }),
  connect(mapStateToProps)
)(NotificationComponent);
