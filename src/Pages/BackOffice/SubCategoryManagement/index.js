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
import { showSuccess, showError } from "../../Helpers/utils";

// api calls
import {
  getAllSubCategories,
  deleteSubCategory,
} from "../../../actions/subCategoryAction";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import AddSubCategory from "./AddSubCategory";
import {
  getLangBasedDataLabel,
  canManage,
  permissions,
} from "../../Helpers/utils";
import MainLoader from "../../Common/Loader";

class SubCategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategories: [],
      CategoryNames: null,
      loading: false,
      isShowRolesModal: false,
      mainLoader: true,
      page: 0,
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
    if (!canManage(permissions.canManageClaimCategories)) {
      this.props.history.push("/dashboards/Welcome");
    }
  };
  componentDidMount = () => {
    this.props.dispatch(getAllSubCategories());
  };

  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.subCategoryData &&
        nextProps.subCategoryData !== this.props.subCategoryData
      ) {
        this.setState({ mainLoader: false, page: 0 });

        let subCategories = [];
        if (nextProps.subCategoryData && nextProps.subCategoryData.length)
          nextProps.subCategoryData.map((subCategory, key) => {
            subCategories.push({
              id: subCategory ? parseInt(subCategory.code) : null,
              nameFrench: subCategory.labelFr,
              nameArabic: subCategory.labelAr,
              nameEng: subCategory.labelEn,
              categoryId: subCategory.category
                ? parseInt(subCategory.category.code)
                : null,
              category: subCategory.category
                ? getLangBasedDataLabel(subCategory.category)
                : "",
              actions: {
                key: key,
              },
            });
          });
        this.setState({ subCategories });
      }
      if (
        nextProps.isAddSubCategorySuccess &&
        nextProps.isAddSubCategorySuccess !== this.props.isAddSubCategorySuccess
      ) {
        this.props.dispatch(getAllSubCategories());
      }
      if (
        nextProps.isUpdateSubCategorySuccess &&
        nextProps.isUpdateSubCategorySuccess !==
          this.props.isUpdateSubCategorySuccess
      ) {
        this.props.dispatch(getAllSubCategories());
        showSuccess(this.props.t("Common.UPDATE_SUCCESS"));
      }
      if (
        nextProps.isDeleteSubCategorySuccess &&
        nextProps.isDeleteSubCategorySuccess !==
          this.props.isDeleteSubCategorySuccess
      ) {
        showSuccess(this.props.t("Common.DELETE_SUCCESS"));
        this.setState({
          loading: false,
        });

        this.props.dispatch(getAllSubCategories());
      }
      if (
        nextProps.isDeleteSubCategoryFailure &&
        nextProps.isDeleteSubCategoryFailure !==
          this.props.isDeleteSubCategoryFailure
      ) {
        showError(nextProps.isDeleteSubCategoryFailure);
        this.setState({ loading: false });
      }
      if (
        nextProps.subCategoryDataFail &&
        nextProps.subCategoryDataFail !== this.props.subCategoryDataFail
      ) {
        showError(nextProps.subCategoryDataFail);
      }
    }
  }

  updateSubCategory = (index) => {
    if (index >= 0) {
      const Category = this.state.subCategories[index];

      const initialValues = {
        code: Category.id,
        labelEnglish: Category.nameEng,
        labelFrench: Category.nameFrench,
        labelArabic: Category.nameArabic,
        categoryId: { label: Category.category, value: Category.categoryId },
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

  //this function is used to delete subCategory
  deleteSubCategory = (index, rowKey) => {
    const confirm = window.confirm(this.props.t("Common.ALERT_MSG"));
    if (confirm) {
      this.setState({
        rowKey: rowKey,
      });
      const code = this.state.subCategories[index].id;

      this.props.dispatch(deleteSubCategory(code));
      this.setState({ loading: true });
    }
  };
  render() {
    const { subCategories } = this.state;
    const header = {
      categoryName: this.props.t("Common.CATEGORY_NAME"),
      nameEn: this.props.t("Common.SUB_CATEGORY_EN"),
      nameFr: this.props.t("Common.SUB_CATEGORY_FR"),
      nameAr: this.props.t("Common.SUB_CATEGORY_AR"),
      actions: this.props.t("Common.ACTIONS"),
    };
    return (
      <Fragment>
        {this.state.showCategory && (
          <AddSubCategory
            modal={this.state.showCategory}
            updateSubCategory={this.updateSubCategory}
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
                    {this.props.t("Common.SUB_CATEGORY_MGMT")}
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
                      {this.props.t("Common.SUB_CATEGORY_MGMT")}
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
                  onClick={(e) => this.updateSubCategory()}
                >
                  {this.props.t("Common.ADD_SUB_CATEGORY")}
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
                    data={subCategories}
                    columns={[
                      {
                        columns: [
                          {
                            Header: header.categoryName,
                            accessor: "category",
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
                                      <Button
                                        className="btn btn-warning"
                                        title={this.props.t("Common.UPDATE")}
                                        onClick={(e) =>
                                          this.updateSubCategory(row.index)
                                        }
                                      >
                                        <i className="fa fa-edit"></i>
                                      </Button>{" "}
                                      {canManage(permissions.deletable) && (
                                        <SubmitBtnLoader
                                          className="btn btn-primary"
                                          title={this.props.t("Common.DELETE")}
                                          onClick={(e) =>
                                            this.deleteSubCategory(
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
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    subCategoryData: state.SubCategory.subCategoryData
      ? state.SubCategory.subCategoryData.subCategoryClients
      : [], //TODO change getCategoryData to subCategoryData
    subCategoryDataFail: state.SubCategory.subCategoryDataFail,
    isAddSubCategorySuccess: state.SubCategory.isAddSubCategorySuccess,
    isUpdateSubCategorySuccess: state.SubCategory.isUpdateSubCategorySuccess,
    isDeleteSubCategorySuccess: state.SubCategory.isDeleteSubCategorySuccess,
    isDeleteSubCategoryFailure: state.SubCategory.isDeleteSubCategoryFailure,
  };
}
//export default translate(SubCategoryComponent);
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(SubCategoryComponent);
