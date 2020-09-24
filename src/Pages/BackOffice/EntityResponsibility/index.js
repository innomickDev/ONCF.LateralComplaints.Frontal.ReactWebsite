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
  getAllSubCategories,
  deleteSubCategory,
} from "../../../actions/subCategoryAction";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import AddEntityResponsibility from "./AddEntityResponsibility";
import {
  getLangBasedValues,
  getLangBasedDataLabel,
  LANG_CODES,
  getLangBasedItem,
} from "../../Helpers/utils";
import MainLoader from "../../Common/Loader";

class EntityResponsibilityComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategories: [],
      CategoryNames: null,
      loading: false,
      isShowRolesModal: false,
      mainLoader: true,
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
  componentDidMount = () => {
    //this.props.dispatch(getAllUsers());
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
        // let queryString = `?page=${1}&pageSize=${10}`;
        this.props.dispatch(getAllSubCategories());
      }
      if (
        nextProps.isUpdateSubCategorySuccess &&
        nextProps.isUpdateSubCategorySuccess !==
          this.props.isUpdateSubCategorySuccess
      ) {
        // let queryString = `?page=${1}&pageSize=${10}`;
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
        // let queryString = `?page=${1}&pageSize=${10}`;
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
      subCategoryName: this.props.t("Sidebar.SUB_CATEGORY"),
      entity: this.props.t("Common.ENTITY"),
    };
    return (
      <Fragment>
        {this.state.showCategory && (
          <AddEntityResponsibility
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
                        {this.props.t("Common.SUB_CATEGORY_MGMT")}
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
                  onClick={(e) => this.updateSubCategory()}
                >
                  {this.props.t("Common.ADD_SUB_CATEGORY")}
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
                    data={subCategories}
                    columns={[
                      {
                        columns: [
                          {
                            Header: header.subCategoryName,
                            accessor: "category",
                            filterable: false,
                          },
                          {
                            Header: header.entity,
                            accessor: "nameEng",
                          },
                        ],
                      },
                    ]}
                    // manual
                    // pages={this.state.meta.total}
                    defaultPageSize={10}
                    page={this.state.page}
                    onPageChange={(page) => this.setState({ page })}
                    // defaultPageSize={this.state.meta.pageSize}
                    // onFetchData={(state, instance) => {
                    //   let queryString = `?page=${state.page + 1}&pageSize=${
                    //     state.pageSize
                    //   }`;
                    //   this.props.dispatch(getAllSubCategories(queryString));
                    // }}
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
    subCategoryData: state.SubCategory.subCategoryData
      ? state.SubCategory.subCategoryData.subCategoryClients
      : [], //TODO change getCategoryData to subCategoryData
    subCategoryDataFail: state.SubCategory.subCategoryDataFail,
    isAddSubCategorySuccess: state.SubCategory.isAddSubCategorySuccess,
    addResponsibilityData: state.Responsibility.addResponsibilityData,
    isAddResponsibilityDataFail:
      state.Responsibility.isAddResponsibilityDataFail,
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
)(EntityResponsibilityComponent);
