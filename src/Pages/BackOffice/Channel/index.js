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

import { getListChannel, deleteChannel } from "../../../actions/channelAction";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import AddChannel from "./AddChannel";

import MainLoader from "../../Common/Loader";

class ChannelComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      CategoryNames: null,
      loading: false,
      isShowRolesModal: false,
      mainLoader: true,
      // meta: {
      //   page: 1,
      //   pageSize: INDEX_PAGE_SIZE_DEFAULT,
      //   pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
      //   pageTotal: 1,
      //   total: 0,
      // },
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
    if (!canManage(permissions.canManageComplaintsChannels)) {
      this.props.history.push("/dashboards/Welcome");
    }
  };
  componentDidMount = () => {
    this.props.dispatch(getListChannel());
  };

  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.listDataSuccess &&
        nextProps.listDataSuccess !== this.props.listDataSuccess
      ) {
        console.log(nextProps.listDataSuccess);
        // const meta = {
        //   page: nextProps.listDataSuccess.pagination.page,
        //   pageSize: nextProps.listDataSuccess.pagination.pageSize,
        //   pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        //   pageTotal: 1,
        //   total:
        //     nextProps.listDataSuccess.pagination.total %
        //     nextProps.listDataSuccess.pagination.pageSize
        //       ? parseInt(
        //           nextProps.listDataSuccess.pagination.total /
        //             nextProps.listDataSuccess.pagination.pageSize
        //         ) + 1
        //       : parseInt(
        //           nextProps.listDataSuccess.pagination.total /
        //             nextProps.listDataSuccess.pagination.pageSize
        //         ),
        // };
        this.setState({ mainLoader: false });
        let categories = [];
        if (nextProps.listDataSuccess && nextProps.listDataSuccess.length)
          nextProps.listDataSuccess.map((category, key) => {
            categories.push({
              id: category.code ? parseInt(category.code) : null,
              nameFrench: category.labelFr,
              nameArabic: category.labelAr,
              nameEng: category.labelEn,
              isRequiredSubSubCategory: category.isRequiredSubSubCategory,
              actions: {
                key: key,
              },
            });
          });
        this.setState({ categories });
      }

      if (
        nextProps.listDataFailure &&
        nextProps.listDataFailure !== this.props.listDataFailure
      ) {
        showError(this.props.t("Common.NO_CLAIMS"));

        this.setState({
          mainLoader: false,
        });
      }

      // Add category success
      if (
        nextProps.addChannelData &&
        nextProps.addChannelData !== this.props.addChannelData
      ) {
        // this.props.dispatch(getListChannel({ page: 1, pageSize: 10 }));
        this.props.dispatch(getListChannel());
      }

      // Delete category success / failure
      if (
        nextProps.isChannelDeleteSuccess &&
        nextProps.isChannelDeleteSuccess !== this.props.isChannelDeleteSuccess
      ) {
        showSuccess(this.props.t("Common.DELETE_SUCCESS"));
        this.setState({
          loading: false,
        });

        this.props.dispatch(getListChannel());
      }
      if (
        nextProps.isChannelDeleteFailure &&
        nextProps.isChannelDeleteFailure !== this.props.isChannelDeleteFailure
      ) {
        showError(nextProps.isChannelDeleteFailure);
        this.setState({
          loading: false,
        });
      }
    }
  }

  //Function to update category
  updateCategory = (index) => {
    if (index >= 0) {
      const Category = this.state.categories[index];
      const initialValues = {
        code: Category.id,
        labelEnglish: Category.nameEng,
        labelFrench: Category.nameFrench,
        labelArabic: Category.nameArabic,
        isRequiredSubSubCategory: Category.isRequiredSubSubCategory,
      };

      this.setState({
        showCategory: !this.state.showCategory,
        initialValues,
      });
    } else {
      this.setState({
        showCategory: !this.state.showCategory,
        initialValues: null,
      });
    }
  };

  //Function to delete channel
  deleteChannel = (index, rowKey) => {
    const confirm = window.confirm(this.props.t("Common.ALERT_MSG"));
    if (confirm) {
      this.setState({
        rowKey: rowKey,
      });
      const id = this.state.categories[index].id;
      this.props.dispatch(deleteChannel(id));
      this.setState({ loading: true });
    }
  };
  render() {
    const { categories } = this.state;
    const header = {
      nameEn: this.props.t("Common.CHANNEL_EN"),
      nameFr: this.props.t("Common.CHANNEL_FR"),
      nameAr: this.props.t("Common.CHANNEL_AR"),
      actions: this.props.t("Common.ACTIONS"),
    };
    return (
      <Fragment>
        {this.state.showCategory && (
          <AddChannel
            modal={this.state.showCategory}
            updateCategory={this.updateCategory}
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
                    {this.props.t("Common.CHANNEL_MGMT")}
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
                      {/* <a href="javascript:void(0);"> */}{" "}
                      {this.props.t("Common.CHANNEL_MGMT")}
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
                  onClick={(e) => this.updateCategory()}
                >
                  {this.props.t("Common.ADD_CHANNEL")}{" "}
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
                    data={categories}
                    columns={[
                      {
                        columns: [
                          {
                            Header: header.nameEn,
                            accessor: "nameEng",
                          },
                          {
                            Header: header.nameFr,
                            accessor: "nameFrench",
                          },
                          {
                            Header: header.nameAr,
                            accessor: "nameArabic",
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
                                      {canManage(permissions.deletable) && (
                                        <SubmitBtnLoader
                                          className="btn btn-primary"
                                          title={this.props.t("Common.DELETE")}
                                          onClick={(e) =>
                                            this.deleteChannel(
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
                    // manual
                    // pages={this.state.meta.pageTotal}
                    defaultPageSize={5}
                    // onFilteredChange={(filtered) => console.log(filtered)}
                    // onFetchData={(state, instance) => {
                    //   let queryString = {
                    //     page: state.page + 1,
                    //     pageSize: state.pageSize,
                    //   };
                    //   if (
                    //     state.filtered &&
                    //     state.filtered.length &&
                    //     state.filtered[0].value.length > 4
                    //   ) {
                    //     console.log(state.filtered);
                    //     queryString.searchs = [
                    //       {
                    //         searchField: "referenceNo",
                    //         value: state.filtered[0].value,
                    //       },
                    //     ];
                    //   }

                    //   this.props.dispatch(getListChannel(queryString));
                    // }}
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
    categoryData: state.Category.getCategoriesData
      ? state.Category.getCategoriesData.categoryClients
      : [],
    addChannelData: state.Channel.addChannelData,

    listDataSuccess: state.Channel.listDataSuccess
      ? state.Channel.listDataSuccess.channelClients
      : [],

    listDataFailure: state.Channel.listDataFailure,

    isChannelDeleteSuccess: state.Channel.isChannelDeleteSuccess,
    isChannelDeleteFailure: state.Channel.isChannelDeleteFailure,
  };
}
//export default translate(MembersComponent);
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(ChannelComponent);
