import React, { Fragment, Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import ReactTable from "react-table";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { translate } from "react-multi-lang";
import PageTitle from "../../../../Layout/AppMain/PageTitle";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  makeData,
  INDEX_PAGE_SIZE_OPTIONS,
  INDEX_PAGE_SIZE_DEFAULT,
  showSuccess,
  newDateFormat,
  showError,
  canManage,
  permissions,
} from "../../../Helpers/utils";
import UserRoleModal from "./UserRoleModal";
import { getAllRoles, deleteRole } from "../../../../actions/roleAction";
import compose from "compose-function";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SubmitBtnLoader from "../../../Common/ButtonLoader";
import MainLoader from "../../../Common/Loader";
import moment from "moment";

class UserRolesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: makeData(),
      showUserRole: false,
      rolesList: [],
      loading: false,
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
  componentWillMount = () => {
    if (!canManage(permissions.canManageRoles)) {
      this.props.history.push("/dashboards/Welcome");
    }
  };
  componentDidMount = () => {
    this.props.dispatch(getAllRoles());
  };
  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.deleteSuccess &&
        nextProps.deleteSuccess !== this.props.deleteSuccess
      ) {
        showSuccess(this.props.t("Common.DELETE_SUCCESS"));
        this.setState({
          loading: false,
        });

        this.props.dispatch(getAllRoles());
      }

      if (
        nextProps.deleteRoleError &&
        nextProps.deleteRoleError !== this.props.deleteRoleError
      ) {
        showError(nextProps.deleteRoleError);
        this.setState({
          loading: false,
        });

        this.props.dispatch(getAllRoles());
      }

      if (nextProps.rolesData && nextProps.rolesData.data) {
        this.setState({ mainLoader: false });
        let rolesList = [];
        nextProps.rolesData.data.roleClients.map((role, key) => {
          rolesList.push({
            roleName: role.label,
            permissions: role.permission,
            description: role.description,
            validityFrom:
              role && role.validityFrom ? newDateFormat(role.validityFrom) : "",
            validityTo:
              role && role.validityTo ? newDateFormat(role.validityTo) : "",
            disPlaypermissions: role.permission
              ? role.permission
                  .map((permission) => this.props.t(permission))
                  .join(" | ")
              : "",
            id: parseInt(role.code),
            actions: {
              key: key,
            },
          });
        });
        this.setState({ rolesList });
      }
    }
    if (
      nextProps.updateSuccess &&
      nextProps.updateSuccess !== this.props.updateSuccess
    ) {
      this.props.dispatch(getAllRoles());
    }
    if (
      nextProps.addRoleSuccess &&
      nextProps.addRoleSuccess !== this.props.addRoleSuccess
    ) {
      this.props.dispatch(getAllRoles());
    }

    if (
      nextProps.rolesDataError &&
      nextProps.rolesDataError !== this.props.rolesDataError
    ) {
      showError(nextProps.rolesDataError);
    }
  }
  userRoleModal = () => {
    this.setState({
      showUserRole: !this.state.showUserRole,
    });
  };
  updateRole = (index) => {
    if (index >= 0) {
      const roleData = this.state.rolesList[index];
      console.log(roleData);
      let permissionList = [];
      roleData.permissions.map((permission) => {
        permissionList.push({
          label: this.props.t(permission),
          value: permission,
        });
      });
      console.log(roleData);
      this.setState({
        showUserRole: !this.state.showUserRole,
        initialValues: {
          code: roleData.id,
          description: roleData.description,

          startDate: roleData.validityFrom
            ? new Date(roleData.validityFrom)
            : null,
          endDate: roleData.validityTo ? new Date(roleData.validityTo) : null,
          label: roleData.roleName,
          selectedPermission: permissionList,
        },
      });
    } else {
      this.setState({
        showUserRole: !this.state.showUserRole,
        initialValues: null,
      });
    }
  };

  // Delete role
  deleteRole = (index, rowKey) => {
    const confirm = window.confirm(this.props.t("Common.ALERT_MSG"));
    if (confirm) {
      this.setState({
        rowKey: rowKey,
      });
      const code = this.state.rolesList[index].id;

      this.props.dispatch(deleteRole(code));
      this.setState({ loading: true });
    }
  };
  render() {
    const header = {
      roleName: this.props.t("Common.ROLE_NAME"),
      description: this.props.t("Common.DESCRIPTION"),
      validFrom: this.props.t("Common.VALIDITY_FROM"),
      validTo: this.props.t("Common.VALIDITY_TO"),
      action: this.props.t("Common.ACTIONS"),
      permissions: this.props.t("Common.PERMISSION"),
    };
    const { rolesList } = this.state;
    console.log(rolesList);
    return (
      <Fragment>
        {this.state.showUserRole && (
          <UserRoleModal
            modal={this.state.showUserRole}
            updateRole={this.updateRole}
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
                    {this.props.t("Common.USER_ROLE")}
                    {/* <div className="page-title-subheading">text</div> */}
                  </div>
                </div>
                <div className="page-title-actions">
                  <Breadcrumb>
                    <BreadcrumbItem>
                      <a href="javascript:void(0);">
                        <FontAwesomeIcon icon={faHome} />
                      </a>
                    </BreadcrumbItem>
                    {/* <BreadcrumbItem>
                      <a href="javascript:void(0);">
                        {this.props.t("Common.ADMIN_PANEL")}
                      </a>
                    </BreadcrumbItem> */}
                    <BreadcrumbItem>
                      {/* <a href="javascript:void(0);"> */}
                      {this.props.t("Common.USER_ROLE")}
                      {/* </a> */}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>

          <Card className="app-inner-layout__content px-4 py-3">
            <Row>
              <Col md={3} className="mr-auto">
                <Button
                  className="mt-1 btn btn-success"
                  onClick={(e) => this.userRoleModal()}
                >
                  {this.props.t("Common.ADD_USER_ROLE")}
                </Button>
              </Col>
            </Row>
          </Card>
          <br />
        </ReactCSSTransitionGroup>
        {/* <FooterComponent /> */}
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardBody className="text-center">
                <ReactTable
                  data={rolesList}
                  columns={[
                    {
                      columns: [
                        {
                          Header: header.roleName,
                          accessor: "roleName",
                        },
                        {
                          Header: header.description,
                          accessor: "description",
                        },
                        {
                          Header: header.validFrom,
                          accessor: "validityFrom",
                        },
                        {
                          Header: header.validTo,
                          accessor: "validityTo",
                        },

                        {
                          Header: header.permissions,
                          id: "disPlaypermissions",
                          accessor: "disPlaypermissions",
                        },
                        {
                          Header: header.action,
                          accessor: "action",
                          Cell: (row) => (
                            <div>
                              <div className="widget-content p-0">
                                <div className="widget-content-wrapper">
                                  <div className="ml-4 d-inline">
                                    <Button
                                      className="btn btn-warning"
                                      title={this.props.t("Common.UPDATE")}
                                      onClick={(e) =>
                                        this.updateRole(row.index)
                                      }
                                    >
                                      <i className="fa fa-edit"></i>
                                    </Button>{" "}
                                    {canManage(permissions.deletable) && (
                                      <SubmitBtnLoader
                                        className="btn btn-primary"
                                        title={this.props.t("Common.DELETE")}
                                        onClick={(e) =>
                                          this.deleteRole(
                                            row.index,
                                            row.original.actions.key
                                          )
                                        }
                                        label={
                                          <i className="fa fa-trash-alt"></i>
                                        }
                                        loading={
                                          row.original.actions.key ===
                                            this.state.rowKey &&
                                          this.state.loading
                                        }
                                      />
                                    )}
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
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    rolesData: state.Role.rolesData,
    rolesDataError: state.Role.rolesDataError,
    updateSuccess: state.Role.updateSuccess,
    deleteSuccess: state.Role.deleteSuccess,
    addRoleSuccess: state.Role.addRoleSuccess,
    addRoleFailure: state.Role.addRoleFailure,
    deleteRoleError: state.Role.deleteRoleError,
  };
}
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(UserRolesComponent);
