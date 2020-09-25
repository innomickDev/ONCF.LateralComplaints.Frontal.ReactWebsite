import React, { Fragment, Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { translate } from "react-multi-lang";
import ReactTable from "react-table";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  dateTimeFormat,
  INDEX_PAGE_SIZE_DEFAULT,
  INDEX_PAGE_SIZE_OPTIONS,
  canManage,
  permissions,
} from "../../Helpers/utils";

// api calls
import { deleteResponse } from "../../../actions/responseAction";
import { getEmailTemplates } from "../../../actions/emailTemplateAction";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import UpdateEmail from "./updateEmail";

import MainLoader from "../../Common/Loader";

class ResponseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      stationNames: null,
      loading: false,
      isShowRolesModal: false,
      mainLoader: true,
      meta: {
        page: 1,
        pageSize: INDEX_PAGE_SIZE_DEFAULT,
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        pageTotal: 1,
        total: 0,
      },
    };
    this.translations = {
      previousText: this.props.t("ReactTable.PREVIOUS"),
      pageText: this.props.t("ReactTable.PAGE"),
      rowsText: this.props.t("ReactTable.ROWS"),
      nextText: this.props.t("ReactTable.NEXT"),
      ofText: this.props.t("ReactTable.OF"),
      loadingText: "LOADING...",
      noDataText: this.props.t("ReactTable.NO_RECORD_FOUND"),
    };
  }

  //for access cntrl
  componentWillMount = () => {
    if (!canManage(permissions.canManageEmailTemplate)) {
      this.props.history.push("/dashboards/Welcome");
    }
  };
  componentDidMount = () => {
    this.props.dispatch(getEmailTemplates());
  };

  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (nextProps.emailData && nextProps.emailData !== this.props.emailData) {
        this.setState({ mainLoader: false });
        let emails = [];
        if (nextProps.emailData && nextProps.emailData.length)
          nextProps.emailData.map((email, key) => {
            emails.push({
              id: parseInt(email.code),
              title: email.title,
              body: email.body,
              emailTemplateKey: email.emailTemplateKey,
              createDate: email.createDate
                ? dateTimeFormat(email.createDate)
                : null,
              updateDate: email.lastModifiedDate
                ? dateTimeFormat(email.lastModifiedDate)
                : null,
              actions: {
                key: key,
              },
            });
          });
        this.setState({ emails });
      }

      if (
        nextProps.updateEmailData &&
        nextProps.updateEmailData !== this.props.updateEmailData
      ) {
        this.props.dispatch(getEmailTemplates());
      }
    }
  }

  updateEmailBody = (index) => {
    if (index >= 0) {
      const email = this.state.emails[index];
      const initialValues = {
        id: email.id,
        title: email.title,
        body: email.body,
        emailTemplateKey: email.emailTemplateKey,
      };
      this.setState({
        showUpdateEmailModal: !this.state.showUpdateEmailModal,
        initialValues,
      });
    } else {
      this.setState({
        showUpdateEmailModal: !this.state.showUpdateEmailModal,
        initialValues: null,
      });
    }
  };

  deleteEmailBody = (index, rowKey) => {
    const confirm = window.confirm(this.props.t("Common.ALERT_MSG"));
    if (confirm) {
      this.setState({
        rowKey: rowKey,
      });
      const code = this.state.emails[index].id;

      this.props.dispatch(deleteResponse(code));
      this.setState({ loading: true });
    }
  };
  render() {
    const { emails } = this.state;
    const header = {
      title: this.props.t("Common.EMAIL_TITLE"),
      body: this.props.t("Common.EMAIL_BODY"),
      createDate: this.props.t("Common.CREATION_DATE"),
      updateDate: this.props.t("Common.UPDATE_DATE"),
      actions: this.props.t("Common.ACTIONS"),
    };
    return (
      <Fragment>
        {this.state.showUpdateEmailModal && (
          <UpdateEmail
            modal={this.state.showUpdateEmailModal}
            updateEmailBody={this.updateEmailBody}
            initialValues={this.state.initialValues}
          />
        )}
        <MainLoader className="text-center" loading={this.state.mainLoader} />
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
                  <div>
                    {this.props.t("Common.EMAIL_MGMT")}
                    <div className="page-title-subheading"></div>
                  </div>
                </div>
                <div className="page-title-actions">
                  <Breadcrumb>
                    <BreadcrumbItem>
                      <a href="javascript:void(0);">
                        <FontAwesomeIcon icon={faHome} />
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      {" "}
                      {this.props.t("Common.EMAIL_MGMT")}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>

          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody className="text-center">
                  <ReactTable
                    data={emails}
                    columns={[
                      {
                        columns: [
                          {
                            Header: header.title,
                            accessor: "title",
                          },

                          {
                            Header: header.createDate,
                            accessor: "createDate",
                          },

                          {
                            Header: header.updateDate,
                            accessor: "updateDate",
                            filterable: false,
                          },
                          {
                            Header: header.actions,
                            accessor: "action",
                            sortable: false,
                            filterable: false,
                            Cell: (row) => (
                              <div>
                                <div className="widget-content p-0">
                                  <div className="widget-content-wrapper">
                                    <div className="d-inline">
                                      <Button
                                        className="btn btn-warning"
                                        title={this.props.t(
                                          "Common.UPDATE_GROUP_BTN"
                                        )}
                                        onClick={(e) =>
                                          this.updateEmailBody(row.index)
                                        }
                                      >
                                        <i className="fa fa-edit"></i>
                                      </Button>{" "}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ),
                          },
                        ],
                      },
                    ]}
                    defaultPageSize={10}
                    className="-highlight"
                    {...this.translations}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    emailData: state.Email.emailData
      ? state.Email.emailData.emailTemplateClients
      : [],
    emailError: state.Email.emailError,

    updateEmailData: state.Email.updateEmailData,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ResponseComponent);
