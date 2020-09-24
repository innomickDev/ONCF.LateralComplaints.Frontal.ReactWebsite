import React, { Fragment, Component } from "react";
import { Row, Col, Card, CardBody, InputGroup, Button } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { translate } from "react-multi-lang";
import ReactTable from "react-table";
import compose from "compose-function";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SubmitBtnLoader from "../../Common/ButtonLoader";

//
// import FooterComponent from "./Footer";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  dateFormat,
  dateTimeFormat,
  INDEX_PAGE_SIZE_DEFAULT,
  INDEX_PAGE_SIZE_OPTIONS,
  showSuccess,
  showError,
  getLangBasedValues,
  LANG_CODES,
  canManage,
  permissions,
} from "../../Helpers/utils";

// api calls
import { getResponse, deleteResponse } from "../../../actions/responseAction";
import { getStations, deleteStation } from "../../../actions/stationAction";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import AddResponse from "./AddResponse";
import { stat } from "fs-extra";
import MainLoader from "../../Common/Loader";

class ResponseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: [],
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
  componentWillMount = () => {
    if (!canManage(permissions.canManageResponse)) {
      this.props.history.push("/dashboards/Welcome");
    }
  };
  componentDidMount = () => {
    //this.props.dispatch(getAllUsers());
    this.props.dispatch(getResponse());
  };

  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.responseData &&
        nextProps.responseData !== this.props.responseData
      ) {
        this.setState({ mainLoader: false });
        let responses = [];
        if (
          nextProps.responseData.responseClients &&
          nextProps.responseData.responseClients.length
        )
          nextProps.responseData.responseClients.map((response, key) => {
            responses.push({
              id: parseInt(response.code),
              title: response.title,
              body: response.body,
              createDate: response.createDate
                ? dateTimeFormat(response.createDate)
                : null,
              updateDate: response.lastModifiedDate
                ? dateTimeFormat(response.lastModifiedDate)
                : null,
              actions: {
                key: key,
              },
            });
          });
        this.setState({ responses });
      }
      if (
        nextProps.addResponseSuccess &&
        nextProps.addResponseSuccess !== this.props.addResponseSuccess
      ) {
        this.props.dispatch(getResponse());
      }
      if (
        nextProps.deleteResponseSuccess &&
        nextProps.deleteResponseSuccess !== this.props.deleteResponseSuccess
      ) {
        showSuccess(this.props.t("Common.DELETE_SUCCESS"));
        this.setState({
          loading: false,
        });
        // let queryString = `?page=${1}&pageSize=${10}`;
        this.props.dispatch(getResponse());
      }
      if (
        nextProps.deleteResponseFailure &&
        nextProps.deleteResponseFailure !== this.props.deleteResponseFailure
      ) {
        showError(nextProps.deleteResponseFailure);
        this.setState({ loading: false });
      }
      if (
        nextProps.responseError &&
        nextProps.responseError !== this.props.responseError
      ) {
        showError(nextProps.responseError);
      }
      if (
        nextProps.updateResponseSuccess &&
        nextProps.updateResponseSuccess !== this.props.updateResponseSuccess
      ) {
        this.props.dispatch(getResponse());
        showSuccess(this.props.t("Common.UPDATE_SUCCESS"));
      }
    }
  }

  addResponse = (index) => {
    if (index >= 0) {
      const response = this.state.responses[index];

      const initialValues = {
        code: response.id,
        title: response.title,
        body: response.body,
      };
      this.setState({
        showResponseModal: !this.state.showResponseModal,
        initialValues,
      });
    } else {
      this.setState({
        showResponseModal: !this.state.showResponseModal,
        initialValues: null,
      });
    }
  };

  deleteResponse = (index, rowKey) => {
    const confirm = window.confirm(this.props.t("Common.ALERT_MSG"));
    if (confirm) {
      this.setState({
        rowKey: rowKey,
      });
      const id = this.state.responses[index].id;

      this.props.dispatch(deleteResponse(id));
      this.setState({ loading: true });
    }
  };
  render() {
    const { responses } = this.state;
    const header = {
      title: this.props.t("Common.RESPONSE_TITLE"),
      body: this.props.t("Common.RESPONSE_BODY"),
      createDate: this.props.t("Common.CREATION_DATE"),
      updateDate: this.props.t("Common.UPDATE_DATE"),
      actions: this.props.t("Common.ACTIONS"),
    };
    return (
      <Fragment>
        {this.state.showResponseModal && (
          <AddResponse
            modal={this.state.showResponseModal}
            addResponse={this.addResponse}
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
                    {this.props.t("Common.RESPONSE_MGMT")}
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
                      {this.props.t("Common.RESPONSE_MGMT")}
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
                  onClick={(e) => this.addResponse()}
                >
                  {this.props.t("Common.ADD_RESPONSE")}
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
          <br />
          <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody className="text-center">
                  <ReactTable
                    data={responses}
                    columns={[
                      {
                        columns: [
                          {
                            Header: header.title,
                            accessor: "title",
                          },
                          // {
                          //   Header: header.body, //removed after clients remarks
                          //   accessor: "body",
                          // },
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
                                    <div className="ml-4 d-inline">
                                      {/* <Button
                                        className="btn btn-success"
                                        title={this.props.t("Common.ADD_ROLE")}
                                        onClick={e =>
                                          this.showRolesModal(row.index)
                                        }
                                      >
                                        <i className="fa fa-user"></i>
                                      </Button>{" "} */}
                                      <Button
                                        className="btn btn-warning"
                                        title={this.props.t("Common.UPDATE")}
                                        onClick={(e) =>
                                          this.addResponse(row.index)
                                        }
                                      >
                                        <i className="fa fa-edit"></i>
                                      </Button>{" "}
                                      {canManage(permissions.deletable) && (
                                        <SubmitBtnLoader
                                          className="btn btn-primary"
                                          title={this.props.t("Common.DELETE")}
                                          onClick={(e) =>
                                            this.deleteResponse(
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
        </ReactCSSTransitionGroup>
        {/* <FooterComponent /> */}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    responseData: state.Response.responseData,
    responseError: state.Response.responseError,

    addResponseSuccess: state.Response.addResponseSuccess,
    deleteResponseSuccess: state.Response.deleteResponseSuccess,
    deleteResponseFailure: state.Response.deleteResponseFailure,
    updateResponseSuccess: state.Response.updateResponseSuccess,
    updateResponseFailure: state.Response.updateResponseFailure,
  };
}
//export default translate(MembersComponent);
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ResponseComponent);
