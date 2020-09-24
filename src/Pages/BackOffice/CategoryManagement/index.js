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
  showSuccess,
  showError,
  canManage,
  permissions,
} from "../../Helpers/utils";

// api calls
import { getCategories, deleteCategory } from "../../../actions/categoryAction";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import AddCategory from "./AddCategory";

import MainLoader from "../../Common/Loader";

class MembersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      CategoryNames: null,
      loading: false,
      isShowRolesModal: false,
      mainLoader: true,
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
    this.props.dispatch(getCategories());
  };

  componentWillReceiveProps(nextProps, props) {
    if (nextProps !== props) {
      if (
        nextProps.categoryData &&
        nextProps.categoryData !== this.props.categoryData
      ) {
        this.setState({ mainLoader: false });
        let categories = [];
        if (nextProps.categoryData && nextProps.categoryData.length)
          nextProps.categoryData.map((category, key) => {
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
      // Error status
      if (
        nextProps.errorStatus &&
        nextProps.errorStatus !== this.props.errorStatus
      ) {
        showError(nextProps.errorStatus);
        this.setState({ mainLoader: false });
      }
      // Add category success
      if (
        nextProps.isAddCategorySuccess &&
        nextProps.isAddCategorySuccess !== this.props.isAddCategorySuccess
      ) {
        this.props.dispatch(getCategories());
      }
      // Update category success
      if (
        nextProps.isUpdateCategorySuccess &&
        nextProps.isUpdateCategorySuccess !== this.props.isUpdateCategorySuccess
      ) {
        this.props.dispatch(getCategories());
      }
      // Delete category success / failure
      if (
        nextProps.isDeleteSuccess &&
        nextProps.isDeleteSuccess !== this.props.isDeleteSuccess
      ) {
        showSuccess(this.props.t("Common.DELETE_SUCCESS"));
        this.setState({
          loading: false,
        });
        this.props.dispatch(getCategories());
      }
      if (
        nextProps.isDeleteFailure &&
        nextProps.isDeleteFailure !== this.props.isDeleteFailure
      ) {
        showError(nextProps.isDeleteFailure);
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

  //Function to delete category
  deleteCategory = (index, rowKey) => {
    const confirm = window.confirm(this.props.t("Common.ALERT_MSG"));
    if (confirm) {
      this.setState({
        rowKey: rowKey,
      });
      const id = this.state.categories[index].id;
      this.props.dispatch(deleteCategory(id));
      this.setState({ loading: true });
    }
  };
  render() {
    const { categories } = this.state;
    const header = {
      nameEn: this.props.t("Common.CATEGORY_EN"),
      nameFr: this.props.t("Common.CATEGORY_FR"),
      nameAr: this.props.t("Common.CATEGORY_AR"),
      actions: this.props.t("Common.ACTIONS"),
    };
    return (
      <Fragment>
        {this.state.showCategory && (
          <AddCategory
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
                    {this.props.t("Common.CATEGORY_TITLE")}
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
                      {this.props.t("Common.CATEGORY_TITLE")}
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
                  {this.props.t("Common.ADD_CATEGORY")}{" "}
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
                                      <Button
                                        className="btn btn-warning"
                                        title={this.props.t("Common.UPDATE")}
                                        onClick={(e) =>
                                          this.updateCategory(row.index)
                                        }
                                      >
                                        <i className="fa fa-edit"></i>
                                      </Button>{" "}
                                      {canManage(permissions.deletable) && (
                                        <SubmitBtnLoader
                                          className="btn btn-primary"
                                          title={this.props.t("Common.DELETE")}
                                          onClick={(e) =>
                                            this.deleteCategory(
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
                    defaultPageSize={5}
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
      : [], //TODO change getCategoryData to categoryData
    errorStatus: state.Category.errorStatus,
    isAddCategorySuccess: state.Category.isAddCategorySuccess,
    isUpdateCategorySuccess: state.Category.isUpdateCategorySuccess,
    isDeleteSuccess: state.Category.isDeleteSuccess,
    isDeleteFailure: state.Category.isDeleteFailure,
  };
}
//export default translate(MembersComponent);
export default compose(
  translate,
  withRouter,
  connect(mapStateToProps)
)(MembersComponent);
