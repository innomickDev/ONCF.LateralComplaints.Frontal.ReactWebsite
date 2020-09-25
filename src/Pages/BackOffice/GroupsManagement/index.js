import React, { Fragment, Component } from "react";
import { Row, Col, Card, CardBody, InputGroup, Button } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { translate } from "react-multi-lang";
import ReactTable from "react-table";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SubmitBtnLoader from "../../Common/ButtonLoader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  INDEX_PAGE_SIZE_DEFAULT,
  INDEX_PAGE_SIZE_OPTIONS,
  showSuccess,
  showError,
  canManage,
  permissions,
} from "../../Helpers/utils";

// api calls
import { getGroups, deleteGroup } from "../../../actions/groupsAction";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import AddGroup from "./AddGroup";
import AddUserInGroup from "./AddUserInGroup";
import DeleteUserInGroup from "./DeleteUserInGroup";

import MainLoader from "../../Common/Loader";
class GroupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      stationNames: null,
      loading: false,
      showUserInGroup: false,
      showDeleteUser: false,
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
  componentDidMount = () => {
    this.props.dispatch(getGroups());
  };

  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.groupsData &&
        nextProps.groupsData !== this.props.groupsData
      ) {
        this.setState({ mainLoader: false });
        let groups = [];
        if (nextProps.groupsData && nextProps.groupsData.length)
          nextProps.groupsData.map((group, key) => {
            groups.push({
              id: group.code ? parseInt(group.code) : null,
              label: group.groupName,
              actions: {
                key: key,
              },
            });
          });
        this.setState({ groups });
      }
      if (
        nextProps.addGroupSuccess &&
        nextProps.addGroupSuccess !== this.props.addGroupSuccess
      ) {
        this.props.dispatch(getGroups({ page: 1, pageSize: 10 }));
      }

      if (
        nextProps.isDeleteSuccess &&
        nextProps.isDeleteSuccess !== this.props.isDeleteSuccess
      ) {
        showSuccess(this.props.t("Common.DELETE_SUCCESS"));
        this.setState({
          loading: false,
        });

        this.props.dispatch(getGroups({ page: 1, pageSize: 10 }));
      }
      if (
        nextProps.isDeleteFailure &&
        nextProps.isDeleteFailure !== this.props.isDeleteFailure
      ) {
        showError(nextProps.isDeleteFailure);
        this.setState({ loading: false });
      }

      // update
      if (
        nextProps.isUpdateSuccess &&
        nextProps.isUpdateSuccess !== this.props.isUpdateSuccess
      ) {
        this.props.dispatch(getGroups({ page: 1, pageSize: 10 }));
        this.setState({ loading: false });
      }
      if (
        nextProps.isUpdateError &&
        nextProps.isUpdateError !== this.props.isUpdateError
      ) {
        showError(nextProps.isUpdateError);
        this.setState({ loading: false });
      }
      if (
        nextProps.groupsDataFail &&
        nextProps.groupsDataFail !== this.props.groupsDataFail
      ) {
        this.setState({ mainLoader: false });
      }
      if (
        nextProps.isAddUserGroupSuccess &&
        nextProps.isAddUserGroupSuccess !== this.props.isAddUserGroupSuccess
      ) {
        this.props.dispatch(getGroups({ page: 1, pageSize: 10 }));
      }
      if (
        nextProps.isDeleteUserGroupSuccess &&
        nextProps.isDeleteUserGroupSuccess !==
          this.props.isDeleteUserGroupSuccess
      ) {
        this.props.dispatch(getGroups({ page: 1, pageSize: 10 }));
      }
    }
  }

  addGroup = (index) => {
    if (index >= 0) {
      const group = this.state.groups[index];
      const initialValues = {
        code: group.id,
        groupName: group.label,
        isDefault: group.isDefault,
      };
      this.setState({
        showGroup: !this.state.showGroup,
        initialValues,
      });
    } else {
      this.setState({
        showGroup: !this.state.showGroup,
        initialValues: null,
      });
    }
  };

  deleteGroup = (index, rowKey) => {
    const confirm = window.confirm(this.props.t("Common.ALERT_MSG"));
    if (confirm) {
      this.setState({
        rowKey: rowKey,
      });
      const code = this.state.groups[index].id;

      this.props.dispatch(deleteGroup(code));
      this.setState({ loading: true });
    }
  };

  addUserInGroup = (row, rowKey) => {
    if (row) {
      const id = this.state.groups[row.index].id;
      this.setState({
        rowKey: rowKey,
        groupId: id,
      });
    }

    this.setState({
      showUserInGroup: !this.state.showUserInGroup,
    });
  };
  // delete
  deleteUserInGroup = (row, rowKey) => {
    if (row) {
      const id = this.state.groups[row.index].id;
      this.setState({
        rowKey: rowKey,
        groupId: id,
      });
    }
    this.setState({
      showDeleteUser: !this.state.showDeleteUser,
    });
  };

  render() {
    const { groups } = this.state;
    const header = {
      nameEn: this.props.t("Common.GROUP_EN"),
      nameFr: this.props.t("Common.GROUP_FR"),
      nameAr: this.props.t("Common.GROUP_AR"),
      actions: this.props.t("Common.ACTIONS"),
    };
    return (
      <Fragment>
        {canManage(permissions.canManageGroups) && this.state.showGroup && (
          <AddGroup
            modal={this.state.showGroup}
            addGroup={this.addGroup}
            initialValues={this.state.initialValues}
          />
        )}
        {canManage(permissions.canAddRemoveUsersFromGroup) &&
          this.state.showUserInGroup && (
            <AddUserInGroup
              modal={this.state.showUserInGroup}
              addUserInGroup={this.addUserInGroup}
              groupId={this.state.groupId}
            />
          )}
        {canManage(permissions.canAddRemoveUsersFromGroup) &&
          this.state.showDeleteUser && (
            <DeleteUserInGroup
              modal={this.state.showDeleteUser}
              deleteUserInGroup={this.deleteUserInGroup}
              groupId={this.state.groupId}
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
                    {this.props.t("Common.GROUP_MGMT")}
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
                      <a href="javascript:void(0);">
                        {" "}
                        {this.props.t("Common.GROUP_MGMT")}
                      </a>
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
                  onClick={(e) => this.addGroup()}
                >
                  {this.props.t("Common.ADD_GROUP")}
                </Button>
              </Col>
              <Col md={3} className="ml-auto">
                <InputGroup></InputGroup>
              </Col>
            </Row>
          </Card>
          <br />
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody className="text-center">
                  <ReactTable
                    data={groups}
                    columns={[
                      {
                        columns: [
                          {
                            Header: header.nameEn,
                            accessor: "label",
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
                                    <div className="ml-4 d-inline">
                                      <Button
                                        className="btn btn-warning"
                                        title={this.props.t("Common.UPDATE")}
                                        onClick={(e) =>
                                          this.addGroup(row.index)
                                        }
                                      >
                                        <i className="fa fa-edit"></i>
                                      </Button>{" "}
                                      <SubmitBtnLoader
                                        className="btn btn-primary"
                                        title={this.props.t("Common.DELETE")}
                                        onClick={(e) =>
                                          this.deleteGroup(
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
                                      />{" "}
                                      <Button
                                        className="btn btn-success"
                                        title={this.props.t(
                                          "Common.ADD_USER_IN_GROUP"
                                        )}
                                        onClick={(e) =>
                                          this.addUserInGroup(row)
                                        }
                                      >
                                        <i className="fa fa-plus"></i>{" "}
                                        <i className="fa fa-users"></i>
                                      </Button>{" "}
                                      {/* delete */}
                                      <Button
                                        className="btn btn-success"
                                        title={this.props.t(
                                          "Common.DELETE_USER_IN_GROUP"
                                        )}
                                        onClick={(e) =>
                                          this.deleteUserInGroup(row)
                                        }
                                      >
                                        <i className="fa fa-minus"></i>{" "}
                                        <i className="fa fa-user"></i>
                                      </Button>
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
    groupsData:
      state.Group.groupsData && state.Group.groupsData.data
        ? state.Group.groupsData.data.groupClients
        : [],
    groupsDataFail: state.Group.groupsDataFail,
    addGroupSuccess: state.Group.addGroupSuccess,
    isDeleteSuccess: state.Group.isDeleteSuccess,
    isDeleteFailure: state.Group.isDeleteFailure,
    isUpdateSuccess: state.Group.isUpdateSuccess,
    isAddUserGroupSuccess: state.Group.isAddUserGroupSuccess,
    isDeleteUserGroupSuccess: state.Group.isDeleteUserGroupSuccess,
  };
}
//export default translate(MembersComponent);
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(GroupComponent);
