import React, { Fragment, Component } from "react";
import { Row, Col, Card, CardBody, Button, DropdownMenu ,DropdownItem,UncontrolledButtonDropdown, DropdownToggle,InputGroup,
  InputGroupAddon} from "reactstrap";
import { translate } from "react-multi-lang";
import ReactTable from "react-table";
import compose from "compose-function";
import DatePicker from "react-datepicker";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SubmitBtnLoader from "../../../Common/ButtonLoader";

//
// import FooterComponent from "./Footer";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import {
  INDEX_PAGE_SIZE_DEFAULT,
  INDEX_PAGE_SIZE_OPTIONS,
  showSuccess,
  showError,
  getLangBasedItem,
  getLangBasedDataLabel,
  dateFormat,
  dateTimeFormat,
  canManage,
  permissions,
  defaultDateFormat,
  normalDateFormat
  
} from "../../../Helpers/utils";
import moment from "moment";

// api calls

import { getAllClaims } from "../../../../actions/claimAction";

import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import MainLoader from "../../../Common/Loader";
import ClaimUserList from "./ClaimUserList";
import ClaimEntityList from "./ClaimEntityList";
class ClaimListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      claims: [],
      stationNames: null,
      loading: false,
      isShowRolesModal: false,
      dobStartDate: null,
    dobEndDate: null,
      startDates:null,
      endDates: null,
      isClaimUsers: false,
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
  handleStartDateChange = (date) => {
    console.log(date)
    this.setState({ startDates: date });
  };
  // This function is used to handle EndDateChange
  // handleEndDateChange = (date) => {
  //   this.setState({ endDates: date });
  // };
  componentWillMount = () => {
    if (
      !canManage(permissions.canViewCustomerGRCClaims) &&
      !canManage(permissions.canViewCustomer2255Claims)
    ) {
      this.props.history.push("/dashboards/Welcome");
    }
  };

  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.getAllClaimsData &&
        nextProps.getAllClaimsData !== this.props.getAllClaimsData
      ) {
        const meta = {
          page: nextProps.getAllClaimsData.pagination.page,
          pageSize: nextProps.getAllClaimsData.pagination.pageSize,
          pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
          pageTotal: 1,
          total:
            nextProps.getAllClaimsData.pagination.total %
            nextProps.getAllClaimsData.pagination.pageSize
              ? parseInt(
                  nextProps.getAllClaimsData.pagination.total /
                    nextProps.getAllClaimsData.pagination.pageSize
                ) + 1
              : parseInt(
                  nextProps.getAllClaimsData.pagination.total /
                    nextProps.getAllClaimsData.pagination.pageSize
                ),
        };

        this.setState({ mainLoader: false });
        let claims = [];
        if (
          nextProps.getAllClaimsData.claimClients &&
          nextProps.getAllClaimsData.claimClients.length
        )
          nextProps.getAllClaimsData.claimClients.map((claim, key) => {
            claims.push({
              id: claim.code,
              Name: claim.userFullName,
              // Name: claim.firstName
              //   ? claim.firstName + "  " + claim.lastName
              //   : "",
              departureStation: claim.departureStation
                ? getLangBasedDataLabel(claim.departureStation)
                : "",
              arrivalStation: claim.arrivalStation
                ? getLangBasedDataLabel(claim.arrivalStation)
                : "",
              category: claim.category
                ? getLangBasedDataLabel(claim.category)
                : "",
              subCategory: claim.subCategory
                ? getLangBasedDataLabel(claim.subCategory)
                : "",
              subSubCategory: claim.subSubCategory
                ? getLangBasedDataLabel(claim.subSubCategory)
                : "",
              createDate: dateTimeFormat(claim.createDate),
              referenceNo: claim.referenceNo,
              isAnswered: claim.isAnswered,


              assignedTo: claim.agentName ? claim.agentName : "",
              claimStatus: claim ? claim.claimStatus : null, //todo
              claimChannel: claim.claimChannel ? claim.claimChannel : "",
              agentCode: claim.agentCode ? claim.agentCode : "",
              entityCode: claim.entityCode ? claim.entityCode : "",
              subCategoryCode: claim.subCategoryCode
                ? claim.subCategoryCode
                : "",
              actions: {
                key: key,
              },
            });
          });
        this.setState({ claims, meta });
      }
      // assigned success
      if (
        nextProps.isAgentSuccess &&
        nextProps.isAgentSuccess !== this.props.isAgentSuccess
      ) {
        this.props.dispatch(getAllClaims({ page: 1, pageSize: 10 }));
      }
      // assigned  entity success
      if (
        nextProps.isAssignEntitySuccess &&
        nextProps.isAssignEntitySuccess !== this.props.isAssignEntitySuccess
      ) {
        this.props.dispatch(getAllClaims({ page: 1, pageSize: 10 }));
      }
      if (
        nextProps.getAllClaimsDataFail &&
        nextProps.getAllClaimsDataFail !== this.props.getAllClaimsDataFail
      ) {this.setState({
        claims:[]
      })
        showError(this.props.t("Common.NO_CLAIMS"));

        this.setState({
          mainLoader: false,
        });
      }
      if (
        nextProps.errorStatus &&
        nextProps.errorStatus !== this.props.errorStatus
      ) {
        showError(nextProps.errorStatus);
        this.setState({ mainLoader: false });
      }
    }
  }

  //this function is used to check conditions b/w grc and 2255 and hide show userList links

  showUserList = (row) => {
    if (
      (row.row.claimStatus === "1" ||
        row.row.claimStatus === "2" ||
        row.row.claimStatus === "4") &&
      row.original.claimChannel === "ONCF2255"
    ) {
      return (
        <a
          className="text-blue text-underline"
          title={this.props.t("Common.ASSIGN")}
          onClick={(e) => this.usersList(row.index)}
        >
          {this.props.t("Common.ASSIGN")} |
        </a>
      );
    } else if (
      (row.row.claimStatus === "1" ||
        row.row.claimStatus === "2" ||
        row.row.claimStatus === "4") &&
      row.original.claimChannel === "GRC"
    ) {
      return (
        <a
          className="text-blue text-underline"
          title={this.props.t("Common.ASSIGN")}
          onClick={(e) => this.usersListGrc(row.index)}
        >
          {this.props.t("Common.ASSIGN")} |
        </a>
      );
    }
  };

  //this function is used when the claim channel is 2255
  usersList = (index) => {
    if (index >= 0) {
      const claimId = this.state.claims[index].id;

      this.setState({
        claimId: claimId,
      });
    }
    // for modal
    this.setState({
      isClaimUsers: !this.state.isClaimUsers,
    });
  };

  //this function is used when the claim channel is Grc
  usersListGrc = (index) => {
    if (index >= 0) {
      const subCategoryCode = this.state.claims[index].subCategoryCode;

      const claimId = this.state.claims[index].id;

      this.setState({
        claimId: claimId,
        subCategoryCode: subCategoryCode,
      });
    }
    // for modal
    this.setState({
      isClaimEntities: !this.state.isClaimEntities,
    });
  };

  // process claim for 2255
  respondClaim = (row) => {
    const claim = this.state.claims[row.index];

    this.props.history.push(
      `/dashboards/process-claims?claimId=${claim.id}&isAnswered=${row.original.isAnswered}`
    );
  };

  // process claim for Grc
  respondClaimGrc = (row) => {
    const claim = this.state.claims[row.index];

    this.props.history.push(
      `/dashboards/process-claims-grc?claimId=${claim.id}&isAnswered=${row.original.isAnswered}`
    );
  };
  getHeader = () => {
    const dropDown = (
      <UncontrolledButtonDropdown>
      <DropdownToggle caret className="btn-icon btn-icon-only btn btn-link" color="link">
         status
      </DropdownToggle>
      <DropdownMenu>    
          <DropdownItem>  
              <span>Menus</span>
          </DropdownItem>
          <DropdownItem>
              <span>Settings</span>
          </DropdownItem>
          <DropdownItem>
              <span>Actions</span>
          </DropdownItem>  
      </DropdownMenu>
  </UncontrolledButtonDropdown>
    );
    return <div> {this.props.t("Common.STATUS")}, {dropDown} </div>;
  };

  render() {
    // const  selected=
    //   startDate
    //     ? new Date(startDate)
    //     : this.state.startDates;
    
    const { startDate } = this.state;  
    console.log(this.state.startDates)
    const { claims } = this.state;
  
    const header = {
      name: this.props.t("Common.NAME"),
      referanceNo: this.props.t("Common.REF_NUM"),
      claimStatus: this.props.t("Common.STATUS"),
      assign: this.props.t("Common.ASSIGN"),
      actions: this.props.t("Common.ACTIONS"),
      created: this.props.t("Common.DATE_CREATED"),
      assignedTo: this.props.t("Common.ASSIGNED_TO"),
    };

    return (
      <Fragment>
        {this.state.isClaimUsers && (
          <ClaimUserList
            modal={this.state.isClaimUsers}
            usersList={this.usersList}
            claimId={this.state.claimId}
          />
        )}
        {this.state.isClaimEntities && (
          <ClaimEntityList
            modal={this.state.isClaimEntities}
            usersListGrc={this.usersListGrc}
            claimId={this.state.claimId}
            subCategoryCode={this.state.subCategoryCode}
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
                    {this.props.t("Common.CLAIM_LIST")}
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
                      <a href="javascript:void(0);">
                        {" "}
                        {this.props.t("Common.CLAIM_LIST")}
                      </a>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>

          <br />
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody className="text-center">
                  <ReactTable
                    filterable
                   
                      
                    data={claims}  
                    
                    columns={[
                      {
                        
                        columns: [
                          {
                            
                            Header: header.referanceNo,
                            accessor: "referenceNo",
                           
                          },
                          {
                            Header: header.claimStatus,
                            accessor: "claimStatus",
                            id: "claimStatus",
                            Cell: (row) => ( <div>
                              <div className="widget-content p-0">
                                <div className="widget-content-wrapper">
                                  <div className="d-inline">
                                
                                    {row.value
                                      ? row.value === "1" && (
                                          <span>
                                            <i className="fas fa-circle text-primary"></i>{" "}
                                            {this.props.t("Common.SUBMITTED")}
                                          </span>
                                        )
                                      : null}
                                    {row.value
                                      ? row.value === "2" && (
                                          <span>
                                            <i className="fas fa-circle text-warning"></i>{" "}
                                            {this.props.t("Common.PROGRESS")}
                                          </span>
                                        )
                                      : null}
                                    {row.value
                                      ? row.value === "3" && (
                                          <span>
                                            <i className="fas fa-circle text-success"></i>{" "}
                                            {this.props.t("Common.APPROVE")}
                                          </span>
                                        )
                                      : null}
                                    {row.value
                                      ? row.value === "4" && (
                                          <span>
                                            <i className="fas fa-circle text-danger"></i>{" "}
                                            {this.props.t("Common.REJECT_S")}
                                          </span>
                                        )
                                      : null}
                                    {row.value
                                      ? row.value === "5" && (
                                          <span>
                                            <i className="fas fa-circle text-success"></i>{" "}
                                            {this.props.t(
                                              "Common.TEMPORARY_APPROVE"
                                            )}
                                          </span>
                                        )
                                      : null}
                                  </div>
                                </div>
                              </div>
                            </div>),
                            filterMethod: (filter, row) => {
                              console.log(filter)
                              if (filter.value === "0") {
                                console.log()
                                return true;
                              }
                              if (filter.value === "1") {
                                return (
                                 row[filter.id]==="1"
                                ) 
                              }
                              if (filter.value === "2") {
                                return (
                                 row[filter.id]==="2"
                                ) 
                              }
                              if (filter.value === "3") {
                                return (
                                 row[filter.id]==="3"
                                ) 
                              }
                              if (filter.value === "4") {
                                return (
                                 row[filter.id]==="4"
                                ) 
                              }
                              if (filter.value === "5") {
                                return (
                                 row[filter.id]==="5"
                                ) 
                              }
                              
                            },
                            Filter: ({ filter, onChange }) =>
                              <select
                                onChange={event => onChange(event.target.value)}
                                style={{ width: "100%" }}
                                value={filter ? filter.value : "0"}
                              >
                                <option value="">{this.props.t("ClaimStatus.SELECT_STATUS")}</option>
                                <option value="1"> {this.props.t("Common.SUBMITTED")}</option>
                                <option value="2">{this.props.t("Common.PROGRESS")}</option>
                                <option value="3">{this.props.t("Common.APPROVE")}</option>
                                <option value="4">{this.props.t("Common.REJECT_S")}</option>
                                <option value="5">{this.props.t("Common.TEMPORARY_APPROVE")}</option>
                              </select>
                          },
                          {
                            Header: header.created,
                            accessor: "createDate",
                            id: "createDate",
                            value:this.state.startDates ? this.state.startDates: "",
                            render: row => (
                             
                              <div>
                               
                                {moment(row.value).format("DD.MM.YYYY")}
                              </div>
                            ),
                            Filter: ({filter, onChange}) => (
                              
                              <DatePicker
                              popperPlacement="bottom"
                              popperModifiers={{
                                flip: {
                                    behavior: ["bottom"] // don't allow it to flip to be above
                                },
                                preventOverflow: {
                                    enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                                },
                                hide: {
                                    enabled: false // turn off since needs preventOverflow to be enabled
                                }
                            }}
                              className="form-control"
                              dateFormat="yyyy/MM/dd"
                             
                              selected={
                                this.state.startDates
                              
                              }
                              onChange={event => onChange(this.setState({
                                startDates:event
                              }))}
                              />
                            
                            ),
                           
                          },
                       
                          {
                            Header: header.assignedTo,
                            accessor: "assignedTo",
                            filterable: false,
                            Cell: (row) => <div>{row.original.assignedTo}</div>,
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
                                    <div className=" d-inline">
                                      {}

                                      {canManage(
                                        permissions.canChangeClaimAssignment
                                      ) && this.showUserList(row)}

                                      {row.original.claimChannel ===
                                      "ONCF2255" ? (
                                        <a
                                          className="text-blue text-underline"
                                          title={this.props.t(
                                            "Common.VIEW_CLAIM"
                                          )}
                                          onClick={(e) =>
                                            this.respondClaim(row)
                                          }
                                        >
                                          {this.props.t("Common.VIEW_CLAIM")}{" "}
                                        </a>
                                      ) : (
                                        <a
                                          className="text-blue text-underline"
                                          title={this.props.t(
                                            "Common.VIEW_CLAIM"
                                          )}
                                          onClick={(e) =>
                                            this.respondClaimGrc(row)
                                          }
                                        >
                                          {this.props.t("Common.VIEW_CLAIM")}{" "}
                                        </a>
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
                    manual
                    pages={this.state.meta.total}
                    defaultPageSize={10}
                    defaultFiltering={[
                      {
                        id: "referenceNo",
                        placeholder: this.props.t("Common.THREE_LETTER"),
                      },
                      {
                        id:"claimStatus"
                      },
                      {
                        id:"createDate"
                      }
                    ]}
              
                    onFilteredChange={(filtered) => console.log(filtered)}
                    onFetchData={(state, instance) => {
                      let queryString = {
                        page: state.page + 1,
                        pageSize: state.pageSize,
                      };
                      console.log(state.filtered)
                      if (
                        state.filtered &&
                        state.filtered.length===2  
                        // state.filtered.length===3
                        // state.filtered[0].value && state.filtered[0].value.length > 4 && state.filtered[1].value
                      ) {
                        if(state.filtered[0].id==="referenceNo"){

                          queryString.searchs = [
                            {
                              searchField: "referenceNo",
                              value:state.filtered[0].value
                            },
                            {
                              searchField: "claimStatus",
                              value:state.filtered[1].value
                            },
                            
                          
                          ] ;
                        }
                        else if(state.filtered[0].id==="claimStatus") {
                          queryString.searchs = [
                            {
                              searchField: "claimStatus",
                              value:state.filtered[0].value
                            },
                            {
                              searchField: "referenceNo",
                              value:state.filtered[1].value
                            },
                          ];
                        }      
                      }
                      else if(state.filtered &&
                        state.filtered.length===1 && this.state.startDates){
                          if(state.filtered[0].id==="referenceNo" && this.state.startDates)
                          {

                            queryString.searchs = [
                              {
                                searchField: "referenceNo",
                                value:state.filtered[0].value
                              },
                             
                              {
                                searchField: "createDate",
                                value:moment(new Date(this.state.startDates)).format("YYYY-MM-DD")
                              },
                            
                            ] ;
                          }
                          else if(state.filtered[0].id==="claimStatus" && this.state.startDates) {
                            queryString.searchs = [
                              {
                                searchField: "claimStatus",
                                value:state.filtered[0].value
                              },
                              {
                                searchField: "createDate",
                                value:moment(new Date(this.state.startDates)).format("YYYY-MM-DD")
                              }, 
                            ];
                          }     
                         
                      }
                      else if (
                        state.filtered &&
                        state.filtered.length===2 && this.state.startDates
                      ) {
                         if(state.filtered[0].id==="referenceNo" && this.state.startDates) {
                          queryString.searchs = [
                            {
                              searchField: "referenceNo",
                              value:state.filtered[0].value
                            },
                            {
                              searchField: "claimStatus",
                              value:state.filtered[1].value
                            },
                            {
                              searchField: "createDate",
                              value:moment(new Date(this.state.startDates)).format("YYYY-MM-DD")
                            },  
                          ] ;
                        }
                        else if(state.filtered[0].id==="claimStatus" && this.state.startDates) {
                          queryString.searchs = [
                            {
                              searchField: "claimStatus",
                              value:state.filtered[0].value
                            },
                            {
                              searchField: "referenceNo",
                              value:state.filtered[1].value
                            },
                            {
                              searchField: "createDate",
                              value:moment(new Date(this.state.startDates)).format("YYYY-MM-DD")
                            },   
                          ];
                        }
                        else if (this.state.startDates) {
                          queryString.searchs = [
                            {
                              searchField: "createDate",
                              value: moment(new Date(this.state.startDates)).format("YYYY-MM-DD")
                            },
                            {
                              searchField: "referenceNo",
                              value:state.filtered[0].value
                            },
                            {
                              searchField: "claimStatus",
                              value:state.filtered[1].value
                            },
                          ];
                        }
                      }
                       
                      else if (state.filtered &&
                        state.filtered.length && 
                        state.filtered[0].value && state.filtered[0].id==="referenceNo" && state.filtered[0].value.length > 4) 
                       {
                        queryString.searchs = [ 
                          {
                            searchField: "referenceNo",
                            value:state.filtered[0].value
                          }
                        ];
                      }
                      else if (state.filtered &&
                        state.filtered.length && state.filtered[0].value && state.filtered[0].id==="claimStatus")   
                       {
                        queryString.searchs = [
                         
                          {
                            searchField: "claimStatus",
                            value:state.filtered[0].value
                          }
                        ];
                      }
                      else if(this.state.startDates!==null)
                      
                     
                       {
                        queryString.searchs = [
                         
                          {
                            searchField: "createDate",
                            value: moment(new Date(this.state.startDates)).format("YYYY-MM-DD")
                            
                          }
                        ];
                      }
                     
                     
                      console.log(queryString)
                      this.props.dispatch(getAllClaims(queryString));
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
    getAllClaimsData: state.Claim.getAllClaimsData,
    errorStatus: state.Claim.errorStatus,
    getAllClaimsDataFail: state.Claim.getAllClaimsDataFail,
    isAssignEntitySuccess: state.Claim.isAssignEntitySuccess,
    isAgentSuccess: state.Claim.isAgentSuccess,
    // isAnswerSuccess: state.CLaim.isAnswerSuccess,
  };
}
//export default translate(MembersComponent);
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ClaimListComponent);
