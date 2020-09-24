import { RESPONSE_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    subSubCategoryDataBySubCategory: null,
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case RESPONSE_CONST.GET_RESPONSE_REQUEST:
      return {
        ...state,
        responseData: null,
        responseError: null,
      };
    case RESPONSE_CONST.GET_RESPONSE_SUCCESS:
      return {
        ...state,
        responseData: action.payload.response
          ? action.payload.response.data.data
          : null,
        responseError: null,
      };
    case RESPONSE_CONST.GET_RESPONSE_FAILURE:
      return {
        ...state,
        responseData: null,
        responseError: action.payload.response.error.errorDescription,
      };
    // add response
    case RESPONSE_CONST.ADD_RESPONSE_REQUEST:
      return {
        ...state,
        addResponseSuccess: null,
        addResponseFailure: null,
      };
    case RESPONSE_CONST.ADD_RESPONSE_SUCCESS:
      return {
        ...state,
        addResponseSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        addResponseFailure: null,
      };
    case RESPONSE_CONST.ADD_RESPONSE_FAILURE:
      return {
        ...state,
        addResponseSuccess: null,
        addResponseFailure: action.payload.response.error.errorDescription,
      };
    // add response
    case RESPONSE_CONST.DELETE_RESPONSE_BY_ID_REQUEST:
      return {
        ...state,
        deleteResponseSuccess: null,
        deleteResponseFailure: null,
      };
    case RESPONSE_CONST.DELETE_RESPONSE_BY_ID_SUCCESS:
      return {
        ...state,
        deleteResponseSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        deleteResponseFailure: null,
      };
    case RESPONSE_CONST.DELETE_RESPONSE_BY_ID_FAILURE:
      return {
        ...state,
        deleteResponseSuccess: null,
        deleteResponseFailure: action.payload.response.error.errorDescription,
      };
    // add response
    case RESPONSE_CONST.UPDATE_RESPONSE_REQUEST:
      return {
        ...state,
        updateResponseSuccess: null,
        updateResponseFailure: null,
      };
    case RESPONSE_CONST.UPDATE_RESPONSE_SUCCESS:
      return {
        ...state,
        updateResponseSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        updateResponseFailure: null,
      };
    case RESPONSE_CONST.UPDATE_RESPONSE_FAILURE:
      return {
        ...state,
        updateResponseSuccess: null,
        updateResponseFailure: action.payload.response.error.errorDescription,
      };

    // customized response
    case RESPONSE_CONST.CUSTOMIZED_RESPONSE_REQUEST:
      return {
        ...state,
        customResponseData: null,
        customResponseFailure: null,
      };
    case RESPONSE_CONST.CUSTOMIZED_RESPONSE_SUCCESS:
      return {
        ...state,
        customResponseData: action.payload.response
          ? action.payload.response.data.data
          : null,

        customResponseFailure: null,
      };
    case RESPONSE_CONST.CUSTOMIZED_RESPONSE_FAILURE:
      return {
        ...state,
        customResponseData: null,
        customResponseFailure:
          action.payload.response.data.error.errorDescription,
      };
  }
  return state;
}
