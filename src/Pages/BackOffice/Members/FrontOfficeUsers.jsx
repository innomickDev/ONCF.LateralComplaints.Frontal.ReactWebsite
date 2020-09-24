import React, { Fragment, Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
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
} from "../../Helpers/utils";

// api calls
import { getAllCustomers } from "../../../actions/accountAction";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import AddMemberModal from "./AddMemberModal";
import RoleModal from "./RolesModal";
import MainLoader from "../../Common/Loader";
import { showError } from "../../Helpers/utils";

class FrontOfficeUsersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      userData: null,
      loading: false,
      isShowRolesModal: false,
      mainLoader: true,
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
  componentDidMount = () => {
    // canManageUser();
    //this.props.dispatch(getAllUsers());
  };
  //component will recieve props
  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.customerData &&
        nextProps.customerData !== this.props.customerData
      ) {
        const meta = {
          page: this.state.page,
          pageSize: nextProps.customerData.pagination.pageSize,
          pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
          pageTotal: 1,
          total:
            nextProps.customerData.pagination.total %
            nextProps.customerData.pagination.pageSize
              ? parseInt(
                  nextProps.customerData.pagination.total /
                    nextProps.customerData.pagination.pageSize
                ) + 1
              : parseInt(
                  nextProps.customerData.pagination.total /
                    nextProps.customerData.pagination.pageSize
                ),
        };
        this.setState({ mainLoader: false });
        let usersList = [];
        nextProps.customerData.customerClients.map((user, key) => {
          usersList.push({
            // firstName: user.title + " " + user.firstName + " " + user.lastName,
            createdDate: dateTimeFormat(user.createDate),
            lastModifiedDate: dateTimeFormat(user.lastModifiedDate),
            id: user.customerCode,
            title: user.title,
            name: user.firstName,
            lastName: user.lastName,
            email: user.email,
            actions: {
              key: key,
            },
          });
        });
        this.setState({ usersList, meta });
      }

      // customer error
      if (
        nextProps.customerFail &&
        nextProps.customerFail !== this.props.customerFail
      ) {
        showError(this.props.t("ErrorMsg.NO_CURSTOMER_DATA"));
      }
    }
  }

  // showAddMemberModal = e => {
  //   this.setState({
  //     showAddMember: !this.state.showAddMember,
  //     userData: null
  //   });
  // };
  // showRolesModal = index => {
  //   if (index >= 0) {
  //     const userData = this.state.usersList[index];
  //     let roles = [];
  //     userData.roles.map(role => {
  //       roles.push({
  //         label: role.label,
  //         value: role.id
  //       });
  //     });

  //     this.setState({
  //       isShowRolesModal: !this.state.isShowRolesModal,
  //       initialValues: { id: userData.id, rolesId: roles }
  //     });
  //   } else {
  //     this.setState({
  //       isShowRolesModal: !this.state.isShowRolesModal,
  //       initialValues: {}
  //     });
  //   }
  // };
  // updateUser = index => {
  //   // console.log("Hello from add member");
  //   if (index >= 0) {
  //     const userData = this.state.usersList[index];
  //     this.setState({
  //       showAddMember: !this.state.showAddMember,
  //       userData
  //     });
  //   }
  // };
  // deleteUsers = (index, rowKey) => {
  //   const confirm = window.confirm(this.props.t("Common.ALERT_MSG"));
  //   if (confirm) {
  //     this.setState({
  //       rowKey: rowKey
  //     });
  //     const id = this.state.usersList[index].id;
  //     this.props.dispatch(deleteUser(id));
  //     this.setState({ loading: true });
  //   }
  // };
  render() {
    const { usersList } = this.state;
    const header = {
      name: this.props.t("Common.NAME"),
      email: this.props.t("ForgotPassword.EMAIL"),
      created: this.props.t("Common.DATE_CREATED"),
      lastModifiedDate: this.props.t("Common.UPDATE_DATE"),
      actions: this.props.t("Common.ACTIONS"),
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
                    {this.props.t("Common.CUSTOMER_LIST")}
                    {/* <div className='page-title-subheading'>
                      {this.props.t("Common.MEMBER_LIST_SUB")}
                    </div> */}
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
                        {this.props.t("Common.CUSTOMER_LIST")}
                      </a>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>
          {/* todo */}
          {/* {canManage(permissions.canManageUsers) && (
            <Card className='app-inner-layout__content px-4 py-3'>
              <Row>
                <Col md={3} className='mr-auto'>
                  <Button
                    className='mt-1 btn btn-success'
                    onClick={e => this.showAddMemberModal()}
                  >
                    {this.props.t("Common.ADD_MEMBER")}
                  </Button>
                </Col>
              </Row>
            </Card>
          )} */}

          <br />
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody className="text-center">
                  <ReactTable
                    filterable
                    data={usersList}
                    columns={[
                      {
                        columns: [
                          // {
                          //   Header: header.name,
                          //   accessor: "firstName",
                          //   filterable: true
                          // },
                          {
                            Header: header.email,
                            accessor: "email",
                            filterable: true,
                          },
                          {
                            Header: header.created,
                            accessor: "createdDate",
                            filterable: false,
                          },
                          {
                            Header: header.lastModifiedDate,
                            accessor: "lastModifiedDate",
                            filterable: false,
                          },
                          // {
                          //   Header: header.actions,
                          //   accessor: "via",
                          //   sortable: false,
                          //   filterable: false,
                          //   Cell: row => (
                          //     <div>
                          //       <div className='widget-content p-0'>
                          //         <div className='widget-content-wrapper'>
                          //           {canManage(permissions.canManageUsers) &&
                          //             row.original.role !== "Client" && (
                          //               /* todo */
                          //               <div className='ml-4 d-inline'>
                          //                 <Button
                          //                   className='btn btn-success'
                          //                   title={this.props.t(
                          //                     "Common.CONSULT"
                          //                   )}
                          //                   onClick={e =>
                          //                     this.showRolesModal(row.index)
                          //                   }
                          //                 >
                          //                   <i className='fa fa-user'></i>
                          //                 </Button>{" "}
                          //                 <Button
                          //                   className='btn btn-warning'
                          //                   title={this.props.t(
                          //                     "Common.UPDATE"
                          //                   )}
                          //                   onClick={e =>
                          //                     this.updateUser(row.index)
                          //                   }
                          //                 >
                          //                   <i className='fa fa-edit'></i>
                          //                 </Button>{" "}
                          //                 {CURRENT_USER_ID !==
                          //                   row.original.id && (
                          //                   <SubmitBtnLoader
                          //                     className='btn btn-primary'
                          //                     title={this.props.t(
                          //                       "Common.DELETE"
                          //                     )}
                          //                     onClick={e =>
                          //                       this.deleteUsers(
                          //                         row.index,
                          //                         row.original.actions.key
                          //                       )
                          //                     }
                          //                     label={
                          //                       <i className='fa fa-trash-alt'></i>
                          //                     }
                          //                     loading={
                          //                       row.original.actions.key ===
                          //                         this.state.rowKey &&
                          //                       this.state.loading
                          //                     }
                          //                   />
                          //                 )}
                          //               </div>
                          //             )}
                          //         </div>
                          //       </div>
                          //     </div>
                          //   )
                          // }
                        ],
                      },
                    ]}
                    manual
                    pages={this.state.meta.total}
                    page={this.state.page}
                    onPageChange={(page) => this.setState({ page })}
                    defaultPageSize={10}
                    // defaultPageSize={this.state.meta.pageSize}
                    defaultFiltering={[
                      {
                        id: "name",
                        placeholder: this.props.t("Common.THREE_LETTER"),
                      },
                    ]}
                    onFilteredChange={(filtered) => console.log(filtered)}
                    onFetchData={(state, instance) => {
                      let queryString = {
                        page: state.page + 1,
                        pageSize: state.pageSize,
                      };
                      if (state.filtered && state.filtered.length) {
                        queryString.searchs = [];
                        if (state.filtered[0].value) {
                          queryString.searchs.push({
                            searchField: state.filtered[0].id || "firstName",
                            value: state.filtered[0].value,
                          });
                        }
                      }

                      this.props.dispatch(getAllCustomers(queryString));
                    }}
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
    customerData: state.Account.customerData,
    customerFail: state.Account.customerFail,
    // deleteSuccess: state.Account.deleteSuccess,
    // updateRoleSuccess: state.Role.updateRoleSuccess,
    // isUserAdded: state.Account.isUserAdded,
    // updateError: state.Role.updateError,
    // updateMessage: state.Account.updateMessage
  };
}
//export default translate(MembersComponent);
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(FrontOfficeUsersComponent);
