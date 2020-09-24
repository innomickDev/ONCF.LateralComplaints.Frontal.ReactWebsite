import { SUB_CATEGORY_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    subCategoryDataByCategory: null,
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_CATEGORY_ID_REQUEST:
      return {
        ...state,
        subCategoryDataByCategory: null,
        subCategoryDataByCategoryError: null,
      };
    case SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_CATEGORY_ID_SUCCESS:
      return {
        ...state,
        subCategoryDataByCategory: action.payload.response.data.isSuccess
          ? action.payload.response.data.data
          : null,
        subCategoryDataByCategoryError: null,
      };
    case SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_CATEGORY_ID_FAILURE:
      return {
        ...state,
        subCategoryDataByCategory: null,
        subCategoryDataByCategoryError: action.payload.response.data.error
          ? true
          : false,
      };
    // Add sub-category
    case SUB_CATEGORY_CONST.ADD_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        isAddSubCategorySuccess: null,
        isAddSubCategoryFailure: null,
      };
    case SUB_CATEGORY_CONST.ADD_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        isAddSubCategorySuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isAddSubCategoryFailure: null,
      };
    case SUB_CATEGORY_CONST.ADD_SUB_CATEGORY_FAILURE:
      return {
        ...state,
        isAddSubCategorySuccess: null,
        isAddSubCategoryFailure:
          action.payload.response.data.error.errorDescription,
      };
    // Update sub-category
    case SUB_CATEGORY_CONST.UPDATE_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        isUpdateSubCategorySuccess: null,
        isUpdateSubCategoryFailure: null,
      };
    case SUB_CATEGORY_CONST.UPDATE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        isUpdateSubCategorySuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isUpdateSubCategoryFailure: null,
      };
    case SUB_CATEGORY_CONST.UPDATE_SUB_CATEGORY_FAILURE:
      return {
        ...state,
        isUpdateSubCategorySuccess: null,
        isUpdateSubCategoryFailure:
          action.payload.response.error.errorDescription,
      };
    // Delete sub-category
    case SUB_CATEGORY_CONST.DELETE_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        isDeleteSubCategorySuccess: null,
        isDeleteSubCategoryFailure: null,
      };
    case SUB_CATEGORY_CONST.DELETE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        isDeleteSubCategorySuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isDeleteSubCategoryFailure: null,
      };
    case SUB_CATEGORY_CONST.DELETE_SUB_CATEGORY_FAILURE:
      return {
        ...state,
        isDeleteSubCategorySuccess: null,
        isDeleteSubCategoryFailure:
          action.payload.response.error.errorDescription,
      };
    // Get all sub-category
    case SUB_CATEGORY_CONST.GET_ALL_SUB_CATEGORIES_REQUEST:
      return {
        ...state,
        subCategoryData: null,
        subCategoryDataFail: null,
      };
    case SUB_CATEGORY_CONST.GET_ALL_SUB_CATEGORIES_SUCCESS:
      return {
        ...state,
        subCategoryData: action.payload.response.data.isSuccess
          ? action.payload.response.data.data
          : null,
        subCategoryDataFail: null,
      };
    case SUB_CATEGORY_CONST.GET_ALL_SUB_CATEGORIES_FAILURE:
      return {
        ...state,
        subCategoryData: null,
        subCategoryDataFail: action.payload.response.error.errorDescription,
      };
  }
  return state;
}
