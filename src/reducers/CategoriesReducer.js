import { CATEGORY_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    getCategoriesData: null,
    // isAddeCategoryNetworkError: null,
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // Get category
    case CATEGORY_CONST.GET_CATEGORY_REQUEST:
      return {
        ...state,
        getCategoriesData: null,
        errorStatus: null,
      };
    case CATEGORY_CONST.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        getCategoriesData: action.payload.response.data.isSuccess
          ? action.payload.response.data.data
          : null,
        errorStatus: null,
      };
    case CATEGORY_CONST.GET_CATEGORY_FAILURE:
      return {
        ...state,
        getCategoriesData: null,
        errorStatus: action.payload.response.error.errorDescription,
      };

    // Delete category
    case CATEGORY_CONST.DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        isDeleteSuccess: null,
        isDeleteFailure: null,
      };
    case CATEGORY_CONST.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        isDeleteSuccess: action.payload.response.data.isSuccess ? true : false,
        isDeleteFailure: null,
      };
    case CATEGORY_CONST.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        isDeleteSuccess: null,
        isDeleteFailure: action.payload.response.error.errorDescription,
      };
    // Add category
    case CATEGORY_CONST.ADD_CATEGORY_REQUEST:
      return {
        ...state,
        isAddCategorySuccess: null,
        isAddCategoryFailure: null,
      };
    case CATEGORY_CONST.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        isAddCategorySuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isAddCategoryFailure: null,
      };
    case CATEGORY_CONST.ADD_CATEGORY_FAILURE:
      return {
        ...state,
        isAddCategorySuccess: null,
        isAddCategoryFailure: action.payload.response.error.errorDescription,
      };
    // Update category
    case CATEGORY_CONST.UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        isUpdateCategorySuccess: null,
        isUpdateCategoryFailure: null,
      };
    case CATEGORY_CONST.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        isUpdateCategorySuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isUpdateCategoryFailure: null,
      };
    case CATEGORY_CONST.UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        isUpdateCategorySuccess: null,
        isUpdateCategoryFailure: action.payload.response.error.errorDescription,
      };
  }

  return state;
}
