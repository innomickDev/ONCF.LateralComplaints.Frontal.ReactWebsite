import React, { Fragment, Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { translate } from "react-multi-lang";
import ReactTable from "react-table";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SubmitBtnLoader from "../../Common/ButtonLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  dateFormat,
  dateTimeFormat,
  INDEX_PAGE_SIZE_DEFAULT,
  INDEX_PAGE_SIZE_OPTIONS,
  showSuccess,
  showError,
  canManage,
  permissions,
  CURRENT_USER_ID,
} from "../../Helpers/utils";

// api calls
import {
  getAllUsers,
  deleteUser,
  activateUser,
  deactivateUser,
  unLockAccouont,
} from "../../../actions/accountAction";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import AddMemberModal from "./AddMemberModal";
import RoleModal from "./RolesModal";
import MainLoader from "../../Common/Loader";
import matchSorter from "match-sorter";

class MembersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      userData: null,
      loading: false,
      isShowRolesModal: false,
      isRequesting: false,
      mainLoader: true,
      filteredData: [],
      btnloading: false,
      page: 0,
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
    if (!canManage(permissions.canManageUsers)) {
      this.props.history.push("/dashboards/Welcome");
    }
  };
  componentDidMount = () => {
    // canManageUser();
    this.props.dispatch(getAllUsers());
  };

  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (nextProps.usersData && nextProps.usersData !== this.props.usersData) {
        const meta = {
          page: this.state.page,
          pageSize: nextProps.usersData.pagination.pageSize,
          pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
          pageTotal: 1,
          total:
            nextProps.usersData.pagination.total %
            nextProps.usersData.pagination.pageSize
              ? parseInt(
                  nextProps.usersData.pagination.total /
                    nextProps.usersData.pagination.pageSize
                ) + 1
              : parseInt(
                  nextProps.usersData.pagination.total /
                    nextProps.usersData.pagination.pageSize
                ),
        };

        this.setState({ mainLoader: false });
        let usersList = [];
        nextProps.usersData.userClients.map((user, key) => {
          usersList.push({
            name: user.title + " " + user.firstName + " " + user.lastName,
            //lastName: user.lastName,
            mobileNumber: user.mobileNumber,
            role: user.roles
              ? user.roles.map((role) => role.label).join(" | ")
              : "",
            roles: user.roles ? user.roles : [],
            createdDate: dateTimeFormat(user.createDate),
            code: parseInt(user.code),
            title: user.title,
            registrationNumber: user.registrationNumber,
            firstName: user.firstName,
            lastName: user.lastName,
            city: user.city,
            email: user.email,
            isActive: user.isActive,
            actions: {
              key: key,
            },
          });
        });
        this.setState({ usersList, meta });
      }
    }
    if (
      nextProps.deleteSuccess &&
      nextProps.deleteSuccess !== this.props.deleteSuccess
    ) {
      this.state.page = 0;

      this.props.dispatch(getAllUsers());

      this.setState({
        loading: false,
      });
      showSuccess(this.props.t("Common.DELETE_SUCCESS"));
    }

    //For activating account
    if (
      nextProps.activationSuccess &&
      nextProps.activationSuccess !== this.props.activationSuccess
    ) {
      this.state.page = 0;

      this.props.dispatch(getAllUsers());

      this.setState({ btnloading: false });
      showSuccess(this.props.t("Common.ACTIVATE_SUCCESS"));
    }
    //For Dectivating account
    if (
      nextProps.deactivationSuccess &&
      nextProps.deactivationSuccess !== this.props.deactivationSuccess
    ) {
      this.props.dispatch(getAllUsers());

      this.setState({ btnloading: false });
      showSuccess(this.props.t("Common.DEACTIVATE_SUCCESS"));
    }

    if (
      nextProps.isUserAdded &&
      nextProps.isUserAdded !== this.props.isUserAdded
    ) {
      this.props.dispatch(getAllUsers());
    }
    if (
      nextProps.updateMessage &&
      nextProps.updateMessage !== this.props.updateMessage
    ) {
      showSuccess(this.props.t("Common.UPDATE_SUCCESS"));
      //let queryString = `page=${1}&pageSize=${10}`;

      this.props.dispatch(getAllUsers());
    }
    if (
      nextProps.updateRoleSuccess &&
      nextProps.updateRoleSuccess !== this.props.updateRoleSuccess
    ) {
      //let queryString = `page=${1}&pageSize=${10}`;

      this.props.dispatch(getAllUsers());
    }

    // Activating account failure
    if (
      nextProps.activationError &&
      nextProps.activationError !== this.props.activationError
    ) {
      this.setState({ btnloading: false });
      showError(nextProps.activationError);
    }
    // DeActivating account failure
    if (
      nextProps.deactivationError &&
      nextProps.deactivationError !== this.props.deactivationError
    ) {
      this.setState({ btnloading: false });
      showError(nextProps.deactivationError);
    }

    //For unlocking account
    if (
      nextProps.unlockSuccess &&
      nextProps.unlockSuccess !== this.props.unlockSuccess
    ) {
      this.state.page = 0;
      this.props.dispatch(getAllUsers());

      this.setState({
        unLockBtnLoading: false,
      });
      showSuccess(this.props.t("Common.UNLOCK_SUCCESS"));
    }
    //Unlock account failure
    if (
      nextProps.unlockFail &&
      nextProps.unlockFail !== this.props.unlockFail
    ) {
      this.setState({
        unLockBtnLoading: false,
      });
      showError(nextProps.unlockFail);
    }

    if (
      nextProps.updateError &&
      nextProps.updateError !== this.props.updateError
    ) {
      showError(this.props.t("ErrorMsg.UPDATE_FAILED"));
      this.setState({ loading: false });
    }
    this.setState({
      isRequesting: nextProps.isRequesting,
    });
  }

  showAddMemberModal = (e) => {
    this.setState({
      showAddMember: !this.state.showAddMember,
      userData: null,
    });
  };
  showRolesModal = (index) => {
    if (index >= 0) {
      const userData = this.state.usersList[index];
      let roles = [];
      userData.roles.map((role) => {
        roles.push({
          label: role.label,
          value: role.code,
        });
      });

      this.setState({
        isShowRolesModal: !this.state.isShowRolesModal,
        initialValues: { code: userData.code, rolesId: roles },
      });
    } else {
      this.setState({
        isShowRolesModal: !this.state.isShowRolesModal,
        initialValues: {},
      });
    }
  };

  //For updating the user
  updateUser = (index) => {
    if (index >= 0) {
      const userData = this.state.usersList[index];
      this.setState({
        showAddMember: !this.state.showAddMember,
        userData,
      });
    }
  };

  //For activating the user
  activateUser = (index, rowKey) => {
    const confirm = window.confirm(this.props.t("Common.ACTIVATE_USER_ALERT"));
    if (confirm) {
      this.setState({
        rowKey: rowKey,
      });
      const requestData = {
        code: this.state.usersList[index].code.toString(),
      };
      this.props.dispatch(activateUser(requestData));
      this.setState({ btnloading: true });
    }
  };

  //For Deactivating the user
  deactivateUser = (index, rowKey) => {
    const confirm = window.confirm(
      this.props.t("Common.DEACTIVATE_USER_ALERT")
    );
    if (confirm) {
      this.setState({
        rowKey: rowKey,
      });
      const requestData = {
        code: this.state.usersList[index].code.toString(),
      };

      this.props.dispatch(deactivateUser(requestData));
      this.setState({ btnloading: true });
    }
  };

  //For deleting the users
  deleteUsers = (index, rowKey) => {
    const confirm = window.confirm(this.props.t("Common.ALERT_MSG"));
    if (confirm) {
      this.setState({
        rowKey: rowKey,
      });
      const id = this.state.usersList[index].code;

      this.props.dispatch(deleteUser(id));
      this.setState({ loading: true });
    }
  };

  //For unblcoking the account by admin
  unblockAccount = (index, rowKey) => {
    const confirm = window.confirm(this.props.t("Common.UNBLOCK_ALERT_MSG"));
    if (confirm) {
      this.setState({
        rowKey: rowKey,
      });
      const requestData = {
        userCode: this.state.usersList[index].code.toString(),
      };

      this.props.dispatch(unLockAccouont(requestData));
      this.setState({ unLockBtnLoading: true });
    }
  };
  render() {
    const { usersList } = this.state;
    const header = {
      name: this.props.t("Common.NAME"),
      role: this.props.t("Common.ROLE"),
      // role: this.props.t("Common.PROFILE"),
      registrationNumber: this.props.t("Common.REGISTRATION_NUM"),
      created: this.props.t("Common.DATE_CREATED"),
      actions: this.props.t("Common.ACTIONS"),
      email: this.props.t("Login.EMAIL"),
    };
    return (
      <Fragment>
        {this.state.showAddMember && (
          <AddMemberModal
            modal={this.state.showAddMember}
            showAddMemberModal={this.showAddMemberModal}
            initialValues={this.state.userData}
          />
        )}
        {this.state.isShowRolesModal && (
          <RoleModal
            modal={this.state.isShowRolesModal}
            showRolesModal={this.showRolesModal}
            initialValues={this.state.initialValues}
          />
        )}
        {/* todo */}
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
                    {this.props.t("Common.USERS_LIST")}
                    <div className="page-title-subheading">
                      {/* {this.props.t("Common.MEMBER_LIST_SUB")} */}
                      {/* {this.props.t("Common.USER_LIST_SUB")} */}
                    </div>
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
                      {/* <a href="javascript:void(0);"> */}{" "}
                      {this.props.t("Common.USERS_LIST")}
                      {/* </a> */}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>
          {/* todo */}
          {canManage(permissions.canManageUsers) && (
            <Card className="app-inner-layout__content px-4 py-3">
              <Row>
                <Col md={3} className="mr-auto">
                  <Button
                    className="mt-1 btn btn-success"
                    onClick={(e) => this.showAddMemberModal()}
                  >
                    {this.props.t("Common.ADD_USER")}
                  </Button>
                </Col>
              </Row>
            </Card>
          )}

          <br />
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody className="text-center raeactTablex">
                  <ReactTable
                    filterable
                    data={usersList}
                    defaultFilterMethod={(filter, row) =>
                      String(row[filter.id]) === filter.value
                    }
                    columns={[
                      {
                        columns: [
                          {
                            Header: header.name,
                            id: "name",
                            accessor: (d) => d.name,
                            filterMethod: (filter, rows) =>
                              matchSorter(rows, filter.value, {
                                keys: ["name"],
                              }),
                            filterAll: true,
                          },
                          {
                            Header: header.email,
                            accessor: "email",
                            filterable: false,
                          },
                          {
                            Header: header.role,
                            id: "role",
                            accessor: (d) => d.role,
                            filterMethod: (filter, rows) =>
                              matchSorter(rows, filter.value, {
                                keys: ["role"],
                              }),
                            filterAll: true,
                          },
                          {
                            Header: header.registrationNumber,
                            id: "registrationNumber",
                            accessor: (d) => d.registrationNumber,
                            filterMethod: (filter, rows) =>
                              matchSorter(rows, filter.value, {
                                keys: ["registrationNumber"],
                              }),
                            filterAll: true,
                          },
                          {
                            Header: header.created,
                            accessor: "createdDate",
                            filterable: false,
                          },
                          {
                            Header: header.actions,
                            accessor: "via",
                            sortable: false,
                            filterable: false,
                            Cell: (row) => (
                              <div>
                                <div className="widget-content p-0">
                                  <div className="widget-content-wrapper">
                                    {canManage(permissions.canManageUsers) &&
                                      row.original.role !== "Client" && (
                                        /* todo */
                                        <div className="ml-2 d-inline">
                                          <Button
                                            className="btn btn-success"
                                            title={this.props.t(
                                              "Common.CONSULT"
                                            )}
                                            onClick={(e) =>
                                              this.showRolesModal(row.index)
                                            }
                                          >
                                            <i className="fa fa-user"></i>
                                          </Button>{" "}
                                          <Button
                                            className="btn btn-warning"
                                            title={this.props.t(
                                              "Common.UPDATE"
                                            )}
                                            onClick={(e) =>
                                              this.updateUser(row.index)
                                            }
                                          >
                                            <i className="fa fa-edit"></i>
                                          </Button>{" "}
                                          {canManage(permissions.deletable) &&
                                            CURRENT_USER_ID !==
                                              row.original.code && (
                                              <SubmitBtnLoader
                                                className="btn btn-primary"
                                                title={this.props.t(
                                                  "Common.DELETE"
                                                )}
                                                onClick={(e) =>
                                                  this.deleteUsers(
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
                                            )}{" "}
                                          {row.original.isActive ? (
                                            <SubmitBtnLoader
                                              className="btn btn-primary"
                                              title={this.props.t(
                                                "Common.DEACTIVATE_USER"
                                              )}
                                              onClick={(e) =>
                                                this.deactivateUser(
                                                  row.index,
                                                  row.original.actions.key
                                                )
                                              }
                                              loading={
                                                row.original.actions.key ===
                                                  this.state.rowKey &&
                                                this.state.btnloading
                                              }
                                              label={
                                                <i className="fa fa-user-minus"></i>
                                              }
                                            />
                                          ) : (
                                            <SubmitBtnLoader
                                              className="btn btn-success"
                                              title={this.props.t(
                                                "Common.ACTIVATE_USER"
                                              )}
                                              loading={
                                                row.original.actions.key ===
                                                  this.state.rowKey &&
                                                this.state.btnloading
                                              }
                                              onClick={(e) =>
                                                this.activateUser(
                                                  row.index,
                                                  row.original.actions.key
                                                )
                                              }
                                              label={
                                                <i className="fas fa-user-plus"></i>
                                              }
                                            />
                                          )}{" "}
                                          {row.original.role !== "Admin" && (
                                            <SubmitBtnLoader
                                              className="btn btn-success"
                                              title={this.props.t(
                                                "Common.UNBLOCK"
                                              )}
                                              loading={
                                                row.original.actions.key ===
                                                  this.state.rowKey &&
                                                this.state.unLockBtnLoading
                                              }
                                              onClick={(e) =>
                                                this.unblockAccount(
                                                  row.index,
                                                  row.original.actions.key
                                                )
                                              }
                                              label={
                                                <i className="fas fa-unlock"></i>
                                              }
                                            />
                                          )}
                                          {/* {row.original.role !== "Admin" && (
                                            <Button
                                              className="btn btn-success"
                                              disabled={this.state.isRequesting}
                                              title={this.props.t(
                                                "Common.UNBLOCK"
                                              )}
                                              onClick={(e) =>
                                                this.unblockAccount(
                                                  row.index,
                                                  row.original.actions.key
                                                )
                                              }
                                            >
                                              <i className="fas fa-unlock"></i>{" "}
                                            </Button>
                                          )} */}
                                        </div>
                                      )}
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
        {/* <FooterComponent /> */}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    usersData: state.Account.usersData,
    deleteSuccess: state.Account.deleteSuccess,
    activationSuccess: state.Account.activationSuccess,
    isRequesting: state.Account.isRequesting,
    deactivationSuccess: state.Account.deactivationSuccess,
    updateRoleSuccess: state.Role.updateRoleSuccess,
    isUserAdded: state.Account.isUserAdded,
    updateError: state.Role.updateError,
    updateProfileSuccess: state.Profile.updateProfileSuccess,
    updateProfileFailure: state.Profile.updateProfileFailure,
    updateMessage: state.Account.updateMessage,
    activationError: state.Account.activationError,
    deactivationError: state.Account.deactivationError,
    unlockSuccess: state.Account.unlockSuccess,
    unlockFail: state.Account.unlockFail,
  };
}
//export default translate(MembersComponent);
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(MembersComponent);
