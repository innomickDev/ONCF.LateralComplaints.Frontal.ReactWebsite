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
} from "../../Helpers/utils";
// api calls
import {
  getAllSubSubCategories,
  deleteSubSubCategory,
} from "../../../actions/subSubCategoryAction";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import AddSubSubCategory from "./AddSubSubCategory";
import {
  getLangBasedValues,
  getLangBasedDataLabel,
  LANG_CODES,
  getLangBasedItem,
  canManage,
  permissions,
} from "../../Helpers/utils";
import MainLoader from "../../Common/Loader";
class SubSubCategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subSubCategories: [],
      CategoryNames: null,
      loading: false,
      mainLoader: true,
      isShowRolesModal: false,
      page: 0,
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
  //for access cntrl
  componentWillMount = () => {
    if (!canManage(permissions.canManageClaimCategories)) {
      this.props.history.push("/dashboards/Welcome");
    }
  };
  componentDidMount = () => {
    //this.props.dispatch(getAllUsers());
    this.props.dispatch(getAllSubSubCategories());
  };

  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.subSubCategoryData &&
        nextProps.subSubCategoryData !== this.props.subSubCategoryData
      ) {
        this.setState({ mainLoader: false, page: 0 });

        let subSubCategories = [];
        if (nextProps.subSubCategoryData && nextProps.subSubCategoryData.length)
          nextProps.subSubCategoryData.map((subSubCategory, key) => {
            // console.log(subSubCategory);
            subSubCategories.push({
              id: parseInt(subSubCategory.code),
              nameFrench: subSubCategory.labelFr,
              nameArabic: subSubCategory.labelAr,
              nameEng: subSubCategory.labelEn,
              subCategoryId: subSubCategory.subCategory
                ? parseInt(subSubCategory.subCategory.code)
                : null,
              subCategory: subSubCategory.subCategory
                ? getLangBasedDataLabel(subSubCategory.subCategory)
                : null,
              actions: {
                key: key,
              },
            });
          });
        this.setState({ subSubCategories });
      }
      // updating table on add on delete and on update
      if (
        nextProps.isAddSubSubCategorySuccess &&
        nextProps.isAddSubSubCategorySuccess !==
          this.props.isAddSubSubCategorySuccess
      ) {
        // let queryString = `?page=${1}&pageSize=${10}`;
        this.props.dispatch(getAllSubSubCategories());
      }
      if (
        nextProps.isUpdateSubSubCategorySuccess &&
        nextProps.isUpdateSubSubCategorySuccess !==
          this.props.isUpdateSubSubCategorySuccess
      ) {
        this.props.dispatch(getAllSubSubCategories());
        showSuccess(this.props.t("Common.UPDATE_SUCCESS"));
      }
      if (
        nextProps.isDeleteSubSubCategorySuccess &&
        nextProps.isDeleteSubSubCategorySuccess !==
          this.props.isDeleteSubSubCategorySuccess
      ) {
        showSuccess(this.props.t("Common.DELETE_SUCCESS"));
        this.setState({ loading: false });

        this.props.dispatch(getAllSubSubCategories());
      }
      if (
        nextProps.isDeleteSubSubCategoryFailure &&
        nextProps.isDeleteSubSubCategoryFailure !==
          this.props.isDeleteSubSubCategoryFailure
      ) {
        showError(nextProps.isDeleteSubSubCategoryFailure);
        this.setState({ loading: false });
      }
      if (
        nextProps.subSubCategoryFailure &&
        nextProps.subSubCategoryFailure !== this.props.subSubCategoryFailure
      ) {
        showError(nextProps.subSubCategoryFailure);
      }
    }
  }

  updateSubSubCategory = (index) => {
    if (index >= 0) {
      const Category = this.state.subSubCategories[index];

      const initialValues = {
        code: Category.id,
        labelEnglish: Category.nameEng,
        labelFrench: Category.nameFrench,
        labelArabic: Category.nameArabic,
        subCategoryId: {
          label: Category.subCategory,
          value: Category.subCategoryId,
        },
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

  deleteSubSubCategory = (index, rowKey) => {
    const confirm = window.confirm(this.props.t("Common.ALERT_MSG"));
    if (confirm) {
      this.setState({
        rowKey: rowKey,
      });
      const code = this.state.subSubCategories[index].id;

      this.props.dispatch(deleteSubSubCategory(code));
      this.setState({ loading: true });
    }
  };
  render() {
    const { subSubCategories } = this.state;
    const header = {
      nameEn: this.props.t("Common.SUB_SUB_CATEGORY_EN"),
      nameFr: this.props.t("Common.SUB_SUB_CATEGORY_FR"),
      nameAr: this.props.t("Common.SUB_SUB_CATEGORY_AR"),
      subCategory: this.props.t("Common.SUB_CATEGORY"),
      actions: this.props.t("Common.ACTIONS"),
    };
    return (
      <Fragment>
        {this.state.showCategory && (
          <AddSubSubCategory
            modal={this.state.showCategory}
            updateSubSubCategory={this.updateSubSubCategory}
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
                    {this.props.t("Common.SUB_SUB_CATEGORY_MGMT")}
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
                      {this.props.t("Common.SUB_SUB_CATEGORY_MGMT")}
                      {/* </a> */}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>
          <Card className="app-inner-layout__content px-4 py-3">
            <Row>
              <Col md={4} className="mr-auto">
                <Button
                  className="mt-1 btn btn-success"
                  onClick={(e) => this.updateSubSubCategory()}
                >
                  {this.props.t("Common.ADD_SUB_SUB_CATEGORY")}
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
                    data={subSubCategories}
                    columns={[
                      {
                        columns: [
                          {
                            Header: header.subCategory,
                            accessor: "subCategory",
                            filterable: false,
                          },
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
                                          this.updateSubSubCategory(row.index)
                                        }
                                      >
                                        <i className="fa fa-edit"></i>
                                      </Button>{" "}
                                      {canManage(permissions.deletable) && (
                                        <SubmitBtnLoader
                                          className="btn btn-primary"
                                          title={this.props.t("Common.DELETE")}
                                          onClick={(e) =>
                                            this.deleteSubSubCategory(
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
                    page={this.state.page}
                    onPageChange={(page) => this.setState({ page })}
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
    subSubCategoryData: state.SubSubCategory.subSubCategoryData
      ? state.SubSubCategory.subSubCategoryData.subSubCategoryClients
      : [], //TODO change getCategoryData to subSubCategoryData
    subSubCategoryFailure: state.SubSubCategory.subSubCategoryFailure,
    isAddSubSubCategorySuccess: state.SubSubCategory.isAddSubSubCategorySuccess,
    isUpdateSubSubCategorySuccess:
      state.SubSubCategory.isUpdateSubSubCategorySuccess,
    isUpdateSubSubCategoryFailure:
      state.SubSubCategory.isUpdateSubSubCategoryFailure,
    isDeleteSubSubCategorySuccess:
      state.SubSubCategory.isDeleteSubSubCategorySuccess,
    isDeleteSubSubCategoryFailure:
      state.SubSubCategory.isDeleteSubSubCategoryFailure,
  };
}
//export default translate(SubCategoryComponent);
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(SubSubCategoryComponent);
