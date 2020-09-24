import React, { Fragment, Component } from "react";
import { Row, Col, Card, CardBody, InputGroup, Button } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { translate } from "react-multi-lang";
import ReactTable from "react-table";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SubmitBtnLoader from "../../Common/ButtonLoader";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  dateFormat,
  INDEX_PAGE_SIZE_DEFAULT,
  INDEX_PAGE_SIZE_OPTIONS,
  showSuccess,
  showError,
  canManage,
  permissions,
} from "../../Helpers/utils";

// api calls

import { getListEntity, deleteEntity } from "../../../actions/entityAction";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import AddEntity from "./AddEntity";
import AddUserInEntity from "./AddUserInEntity";
import AddResponsibilityInEntity from "./AddResponsibilityInEntity";
import DeleteUserInEntity from "./DeleteUserInEntity";
import DeleteResponsibilityInEntity from "./DeleteResponsibilityInEntity";
import { getLangBasedValues, LANG_CODES } from "../../Helpers/utils";
import MainLoader from "../../Common/Loader";
class GroupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      entities: [],
      stationNames: null,
      loading: false,
      showUserInGroup: false,
      showResponsibilityInEntity: false,
      showDeleteUser: false,
      showDeleteResponsibility: false,

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
    if (!canManage(permissions.canManageGroups)) {
      this.props.history.push("/dashboards/Welcome");
    }
  };
  componentDidMount = () => {
    this.props.dispatch(getListEntity());
  };

  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.listDataSuccess &&
        nextProps.listDataSuccess !== this.props.listDataSuccess
      ) {
        this.setState({ mainLoader: false });
        let entities = [];
        if (nextProps.listDataSuccess && nextProps.listDataSuccess.length)
          nextProps.listDataSuccess.map((entity, key) => {
            entities.push({
              id: entity.code ? parseInt(entity.code) : null,
              label: entity.entityName,
              actions: {
                key: key,
              },
            });
          });
        this.setState({ entities });
      }

      if (
        nextProps.addEntityData &&
        nextProps.addEntityData !== this.props.addEntityData //--->for entities
      ) {
        this.props.dispatch(getListEntity({ page: 1, pageSize: 10 }));
      }

      if (
        nextProps.isEntityDeleteSuccess &&
        nextProps.isEntityDeleteSuccess !== this.props.isEntityDeleteSuccess //-->for entities
      ) {
        showSuccess(this.props.t("Common.DELETE_SUCCESS"));
        this.setState({
          loading: false,
        });

        this.props.dispatch(getListEntity({ page: 1, pageSize: 10 }));
      }

      if (
        nextProps.isEntityDeleteFailure &&
        nextProps.isEntityDeleteFailure !== this.props.isEntityDeleteFailure // -->for entities
      ) {
        showError("Some thing went wrong please try again later");
        this.setState({ loading: false });
      }

      if (
        nextProps.isUpdateEntitySuccess &&
        nextProps.isUpdateEntitySuccess !== this.props.isUpdateEntitySuccess //-->for entities
      ) {
        // let queryString = `?page=${1}&pageSize=${10}`;
        this.props.dispatch(getListEntity({ page: 1, pageSize: 10 }));
        this.setState({ loading: false });
      }

      if (
        nextProps.isUpdateEntityError &&
        nextProps.isUpdateEntityError !== this.props.isUpdateEntityError //->for entites
      ) {
        showError("Some thing went wrong please try again later");
        this.setState({ loading: false });
      }

      if (
        nextProps.listDataFailure &&
        nextProps.listDataFailure !== this.props.listDataFailure //->For entites
      ) {
        this.setState({ mainLoader: false });
      }

      if (
        nextProps.isAddUserEntitySuccess &&
        nextProps.isAddUserEntitySuccess !== this.props.isAddUserEntitySuccess //-->for entities
      ) {
        this.props.dispatch(getListEntity({ page: 1, pageSize: 10 }));
      }

      if (
        nextProps.isDeleteUserEntitySuccess &&
        nextProps.isDeleteUserEntitySuccess !== //-->for entites
          this.props.isDeleteUserEntitySuccess
      ) {
        this.props.dispatch(getListEntity({ page: 1, pageSize: 10 }));
      }
    }
  }

  addEntity = (index) => {
    if (index >= 0) {
      const entity = this.state.entities[index];

      const initialValues = {
        code: entity.id,
        entityName: entity.label,
        isDefault: entity.isDefault,
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

  deleteEntity = (index, rowKey) => {
    const confirm = window.confirm(this.props.t("Common.ALERT_MSG"));
    if (confirm) {
      this.setState({
        rowKey: rowKey,
      });
      const code = this.state.entities[index].id;

      this.props.dispatch(deleteEntity(code));
      this.setState({ loading: true });
    }
  };

  addUserInEntity = (row, rowKey) => {
    if (row) {
      const id = this.state.entities[row.index].id;
      this.setState({
        rowKey: rowKey,
        entityId: id,
      });
    }

    this.setState({
      showUserInGroup: !this.state.showUserInGroup,
    });
  };

  //Add Responsibility In Entity
  addResponsibilityInEntity = (row, rowKey) => {
    if (row) {
      const id = this.state.entities[row.index].id;
      this.setState({
        rowKey: rowKey,
        entityId: id,
      });
    }

    this.setState({
      showResponsibilityInEntity: !this.state.showResponsibilityInEntity,
    });
  };
  // delete
  deleteUserInEntity = (row, rowKey) => {
    if (row) {
      const id = this.state.entities[row.index].id;
      this.setState({
        rowKey: rowKey,
        entityId: id,
      });
    }
    this.setState({
      showDeleteUser: !this.state.showDeleteUser,
    });
  };
  // delete responsibility
  deleteResponsibilityInEntity = (row, rowKey) => {
    if (row) {
      const id = this.state.entities[row.index].id;
      this.setState({
        rowKey: rowKey,
        entityId: id,
      });
    }
    this.setState({
      showDeleteResponsibility: !this.state.showDeleteResponsibility,
    });
  };

  render() {
    const { entities } = this.state;
    const header = {
      nameEn: this.props.t("Common.ENTITIY_EN"),
      nameFr: this.props.t("Common.ENTITIY_FR"),
      nameAr: this.props.t("Common.ENTITIY_AR"),
      actions: this.props.t("Common.ACTIONS"),
    };
    return (
      <Fragment>
        {canManage(permissions.canManageGroups) && this.state.showGroup && (
          <AddEntity
            modal={this.state.showGroup}
            addEntity={this.addEntity}
            initialValues={this.state.initialValues}
          />
        )}
        {canManage(permissions.canAddRemoveUsersFromGroup) &&
          this.state.showUserInGroup && (
            <AddUserInEntity
              modal={this.state.showUserInGroup}
              addUserInEntity={this.addUserInEntity}
              entityId={this.state.entityId}
            />
          )}
        {canManage(permissions.canAddRemoveUsersFromGroup) &&
          this.state.showResponsibilityInEntity && (
            <AddResponsibilityInEntity
              modal={this.state.showResponsibilityInEntity}
              addResponsibilityInEntity={this.addResponsibilityInEntity}
              entityId={this.state.entityId}
            />
          )}
        {canManage(permissions.canAddRemoveUsersFromGroup) &&
          this.state.showDeleteUser && (
            <DeleteUserInEntity
              modal={this.state.showDeleteUser}
              deleteUserInEntity={this.deleteUserInEntity}
              entityId={this.state.entityId}
            />
          )}
        {canManage(permissions.canAddRemoveUsersFromGroup) &&
          this.state.showDeleteResponsibility && (
            <DeleteResponsibilityInEntity
              modal={this.state.showDeleteResponsibility}
              deleteResponsibilityInEntity={this.deleteResponsibilityInEntity}
              entityId={this.state.entityId}
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
                    {this.props.t("Common.ENTITIY_MGMT")}
                    <div className="page-title-subheading">
                      {/* {this.props.t("Common.MEMBER_LIST_SUB")} */}
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
                      {this.props.t("Common.ENTITIY_MGMT")}
                      {/* </a> */}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>
          {canManage(permissions.canAddRemoveUsersFromGroup) && (
            <Card className="app-inner-layout__content px-4 py-3">
              <Row>
                <Col md={3} className="mr-auto">
                  <Button
                    className="mt-1 btn btn-success"
                    onClick={(e) => this.addEntity()}
                  >
                    {this.props.t("Common.ADD_ENTITIY")}
                  </Button>
                </Col>
                <Col md={3} className="ml-auto">
                  <InputGroup>
                    {/* <InputGroupAddon addonType="prepend">
                    <div className="input-group-text">
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                  </InputGroupAddon>
                  <Input placeholder="Search..." /> */}
                  </InputGroup>
                </Col>
              </Row>
            </Card>
          )}
          <br />
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody className="text-center">
                  <ReactTable
                    data={entities}
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
                                    {canManage(
                                      permissions.canAddRemoveUsersFromGroup
                                    ) && (
                                      <div className="ml-4 d-inline">
                                        <Button
                                          className="btn btn-warning"
                                          title={this.props.t("Common.UPDATE")}
                                          onClick={(e) =>
                                            this.addEntity(row.index)
                                          }
                                        >
                                          <i className="fa fa-edit"></i>
                                        </Button>{" "}
                                        {canManage(permissions.deletable) && (
                                          <SubmitBtnLoader
                                            className="btn btn-primary"
                                            title={this.props.t(
                                              "Common.DELETE"
                                            )}
                                            onClick={(e) =>
                                              this.deleteEntity(
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
                                        <Button
                                          className="btn btn-success"
                                          title={this.props.t(
                                            "Common.ADD_USER_IN_ENTITIY"
                                          )}
                                          onClick={(e) =>
                                            this.addUserInEntity(row)
                                          }
                                        >
                                          <i className="fa fa-plus"></i>{" "}
                                          <i className="fa fa-users"></i>
                                        </Button>{" "}
                                        {/* {canManage(permissions.deletable) && ( */}
                                        <Button
                                          className="btn btn-success"
                                          title={this.props.t(
                                            "Common.DELETE_USER_IN_ENTITIY"
                                          )}
                                          onClick={(e) =>
                                            this.deleteUserInEntity(row)
                                          }
                                        >
                                          <i className="fa fa-minus"></i>{" "}
                                          <i className="fa fa-user"></i>
                                        </Button>
                                        {/* )} */}{" "}
                                        <Button
                                          className="btn btn-warning"
                                          title={this.props.t(
                                            "Common.ADD_RESPOSIBILITY_IN_ENTITY"
                                          )}
                                          onClick={(e) =>
                                            this.addResponsibilityInEntity(row)
                                          }
                                        >
                                          <i className="fa fa-plus"></i>{" "}
                                          <i className="fas fa-users-cog"></i>
                                        </Button>{" "}
                                        {/* {canManage(permissions.deletable) && ( */}
                                        <Button
                                          className="btn btn-warning"
                                          title={this.props.t(
                                            "Common.DELETE_RESPOSIBILITY_IN_ENTITY"
                                          )}
                                          onClick={(e) =>
                                            this.deleteResponsibilityInEntity(
                                              row
                                            )
                                          }
                                        >
                                          <i className="fa fa-minus"></i>{" "}
                                          <i className="fas fa-users-cog"></i>
                                        </Button>
                                        {/* )} */}
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
                    // manual
                    // pages={this.state.meta.total}
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
    listDataSuccess:
      state.Entity.listDataSuccess && state.Entity.listDataSuccess.data
        ? state.Entity.listDataSuccess.data.entityClients
        : [],

    listDataFailure: state.Entity.listDataFailure,

    isAddUserEntitySuccess: state.Entity.addEntityData,
    addResponsibilityData: state.Responsibility.addResponsibilityData,
    addEntityData: state.Entity.addEntityData,

    isEntityDeleteSuccess: state.Entity.isEntityDeleteSuccess,
    isEntityDeleteFailure: state.Entity.isEntityDeleteFailure,

    isUpdateEntityError: state.Entity.isUpdateEntityError,
    isUpdateEntitySuccess: state.Entity.isUpdateEntitySuccess,

    isDeleteUserEntitySuccess: state.Entity.isDeleteUserEntitySuccess,
  };
}
//export default translate(MembersComponent);
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(GroupComponent);
