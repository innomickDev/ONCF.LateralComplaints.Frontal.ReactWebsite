import React, { Fragment, Component } from "react";
import Ionicon from "react-ionicons";
import {
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  ButtonDropdown,
  Dropdown,
  Nav,
  Col,
  Row,
  Button,
  NavItem,
  DropdownItem,
  Collapse,
} from "reactstrap";
import { connect } from "react-redux";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { translate } from "react-multi-lang";
import bg4 from "../../../assets/utils/images/dropdown-header/abstract4.jpg";
import city2 from "../../../assets/utils/images/dropdown-header/city2.jpg";
import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";
import Flag from "react-flagkit";
import Tabs from "react-responsive-tabs";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import PerfectScrollbar from "react-perfect-scrollbar";
// Dropdown Tabs Content
import ChatExample from "./TabsContent/ChatExample";
import TimelineEx from "./TabsContent/TimelineExample";
import SysErrEx from "./TabsContent/SystemExample";
import {
  getNotificationByUserCode,
  markNotificationAsSeen,
  markAllNotificationAsRead,
} from "../../../actions/notificationAction";

import {
  showSuccess,
  showError,
  required,
  canManage,
  permissions,
} from "../../../Pages/Helpers/utils";
const tabsContent = [
  {
    title: "Notifications",
  },
];
function getTabs() {
  return tabsContent.map((tab, index) => ({
    title: tab.title,
    getContent: () => tab.content,
    key: index,
  }));
}
class HeaderDots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequesting: false,
      collapse: false,
      active: false,
    };
  }

  componentDidMount = () => {
    setInterval(() => {
      this.props.dispatch(getNotificationByUserCode());
    }, Number(`${process.env.REACT_APP_NOTIFICATION_TIMEOUT}`));
    this.props.dispatch(getNotificationByUserCode());
  };
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.notificationData ||
      (nextProps.notificationData === null &&
        nextProps.notificationData !== this.props.notificationData)
    ) {
      let notificationData = [];
      const notifications = nextProps.notificationData;
      notifications &&
        notifications.map((notification) => {
          notificationData.push({
            title: notification && notification.notificationTitle,
            isSeen: notification && notification.isSeen,
            code: notification && notification.code,
            claimCode: notification && notification.claimCode,
          });
        });
      this.setState({ notificationData: notificationData });
    }
    if (
      nextProps.allNotificationData &&
      nextProps.allNotificationData !== this.props.allNotificationData
    ) {
      showSuccess(this.props.t("Common.ALL_NOTIFICATIONS_READ"));
      this.props.dispatch(getNotificationByUserCode());
      this.setState({});
    }
    if (
      nextProps.singleNotificationData &&
      nextProps.singleNotificationData !== this.props.singleNotificationData
    ) {
    }
    this.setState({
      isRequesting: nextProps.isRequesting,
    });
  };
  //This function is used to redirect to claim list screen
  showAllNotifications = (data) => {
    let requestData = {};
    requestData.notificationCode = data && parseInt(data.code);

    this.props.dispatch(markNotificationAsSeen(requestData));

    const notificationCode = data.claimCode;
    // this.props.history.push(
    //   `/dashboards/process-claims?claimcode=${notificationCode}`
    // );
    this.props.history.push(
      `/dashboards/process-claims-grc?claimId=${notificationCode}`
    );

    this.props.dispatch(getNotificationByUserCode());
  };
  //this function is used to call the getNotifications data
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
                    onClick={(e) => this.showAllNotifications(notificationData)}
                  >
                    {notificationData && notificationData !== null
                      ? notificationData.title
                      : ""}
                  </a>
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
                    onClick={(e) => this.showAllNotifications(notificationData)}
                  >
                    {notificationData && notificationData !== null
                      ? notificationData.title
                      : ""}
                  </a>
                </h4>
              </VerticalTimelineElement>
            );
          }
        })
      );
    }
  };
  /*---------call this function to show  modal--------*/
  showNotificationModal = () => {
    this.setState({
      isNotificationModal: !this.state.isNotificationModal,
    });
  };
  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };
  onSubmit = () => {
    this.props.dispatch(markAllNotificationAsRead());
  };
  render() {
    const notificationData = this.state.notificationData;

    return (
      <Fragment>
        <div className="header-dots">
          {canManage(permissions.canNotify) && (
            <UncontrolledDropdown>
              <DropdownToggle caret className="p-0 mr-2" color="link">
                <button className="mb-1 mr-2 btn-icon btn-icon-only btn btn-link btn-sm">
                  <i className="fas fa-bell fa-2x text-light notification-size">
                    {" "}
                  </i>
                  <span className="badge badge-pill badge-warning">
                    {notificationData && notificationData.length !== 0
                      ? notificationData.length
                      : ""}
                  </span>
                </button>
              </DropdownToggle>
              <DropdownMenu right className="dropdown-menu-xl rm-pointers">
                <div className="dropdown-menu-header mb-0">
                  <div className="dropdown-menu-header-inner bg-deep-blue">
                    <div
                      className="menu-header-image opacity-1"
                      style={{
                        backgroundImage: "url(" + city3 + ")",
                      }}
                    />
                    <div className="menu-header-content text-dark">
                      <h5 className="menu-header-title">
                        {this.props.t("Login.NOTIFICATION")}
                      </h5>
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
                      {this.props.t("Common.MARK_ALL_AS_READ")}
                    </Button>
                  </NavItem>
                </Nav>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </div>
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    notificationData: state.Notification.notificationData
      ? state.Notification.notificationData.notificationClients
      : [],
    allNotificationData: state.Notification.allNotificationData,
    isRequesting: state.Notification.isRequesting,
    singleNotificationData: state.Notification.singleNotificationData,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(HeaderDots);
