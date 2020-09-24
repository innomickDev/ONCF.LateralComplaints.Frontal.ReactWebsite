import { SUB_SUB_CATEGORIES_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    subSubCategoryDataBySubCategory: null,
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SUB_SUB_CATEGORIES_CONST.GET_SUB_SUB_CATEGORY_BY_SUB_CATEGORY_ID_REQUEST:
      return {
        ...state,
        subSubCategoryDataBySubCategory: null,
        subSubCategoryError: null,
      };
    case SUB_SUB_CATEGORIES_CONST.GET_SUB_SUB_CATEGORY_BY_SUB_CATEGORY_ID_SUCCESS:
      return {
        ...state,
        subSubCategoryDataBySubCategory: action.payload.response.data.isSuccess
          ? action.payload.response.data.data
          : null,
        formValue: action.payload.response.formValue,
        subSubCategoryError: null,
      };
    case SUB_SUB_CATEGORIES_CONST.GET_SUB_SUB_CATEGORY_BY_SUB_CATEGORY_ID_FAILURE:
      return {
        ...state,
        subSubCategoryDataBySubCategory: null,
        subSubCategoryError: action.payload.response.data.error ? true : false,
      };

    // Add
    case SUB_SUB_CATEGORIES_CONST.ADD_SUB_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        isAddSubSubCategorySuccess: null,
        isAddSubSubCategoryFailure: null,
      };
    case SUB_SUB_CATEGORIES_CONST.ADD_SUB_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        isAddSubSubCategorySuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isAddSubSubCategoryFailure: null,
      };
    case SUB_SUB_CATEGORIES_CONST.ADD_SUB_SUB_CATEGORY_FAILURE:
      return {
        ...state,
        isAddSubSubCategorySuccess: null,
        isAddSubSubCategoryFailure:
          action.payload.response.error.errorDescription,
      };

    // update
    case SUB_SUB_CATEGORIES_CONST.UPDATE_SUB_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        isUpdateSubSubCategorySuccess: null,
        isUpdateSubSubCategoryFailure: null,
      };
    case SUB_SUB_CATEGORIES_CONST.UPDATE_SUB_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        isUpdateSubSubCategorySuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isUpdateSubSubCategoryFailure: null,
      };
    case SUB_SUB_CATEGORIES_CONST.UPDATE_SUB_SUB_CATEGORY_FAILURE:
      return {
        ...state,
        isUpdateSubSubCategorySuccess: null,
        isUpdateSubSubCategoryFailure:
          action.payload.response.error.errorDescription,
      };

    // delete
    case SUB_SUB_CATEGORIES_CONST.DELETE_SUB_SUB_CATEGORY_REQUEST:
      return {
        ...state,
        isDeleteSubSubCategorySuccess: null,
        isDeleteSubSubCategoryFailure: null,
      };
    case SUB_SUB_CATEGORIES_CONST.DELETE_SUB_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        isDeleteSubSubCategorySuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isDeleteSubSubCategoryFailure: null,
      };
    case SUB_SUB_CATEGORIES_CONST.DELETE_SUB_SUB_CATEGORY_FAILURE:
      return {
        ...state,
        isDeleteSubSubCategorySuccess: null,
        isDeleteSubSubCategoryFailure:
          action.payload.response.error.errorDescription,
      };
    // getAll
    case SUB_SUB_CATEGORIES_CONST.GET_ALL_SUB_SUB_CATEGORIES_REQUEST:
      return {
        ...state,
        subSubCategoryData: null,
        subSubCategoryFailure: null,
      };
    case SUB_SUB_CATEGORIES_CONST.GET_ALL_SUB_SUB_CATEGORIES_SUCCESS:
      return {
        ...state,
        subSubCategoryData: action.payload.response.data.isSuccess
          ? action.payload.response.data.data
          : null,
        subSubCategoryFailure: null,
      };
    case SUB_SUB_CATEGORIES_CONST.GET_ALL_SUB_SUB_CATEGORIES_FAILURE:
      return {
        ...state,
        subSubCategoryData: null,
        subSubCategoryFailure: action.payload.response.error.errorDescription,
      };
  }
  return state;
}
