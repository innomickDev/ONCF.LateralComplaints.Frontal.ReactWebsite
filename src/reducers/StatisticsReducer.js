import { STATISTICS_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    subCategoryDataByCategory: null,
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // Users statistics
    case STATISTICS_CONST.GET_USERS_STATISTICS_REQUEST:
      return {
        ...state,
        userStat: null,
      };
    case STATISTICS_CONST.GET_USERS_STATISTICS_SUCCESS:
      return {
        ...state,
        userStat: action.payload.response.data.data,
      };
    case STATISTICS_CONST.GET_USERS_STATISTICS_FAILURE:
      return {
        ...state,
        userStat: null,
      };
    // Get all sub-category
    case STATISTICS_CONST.GET_CLAIM_STATISTICS_REQUEST:
      return {
        ...state,
        claimStat: null,
      };
    case STATISTICS_CONST.GET_CLAIM_STATISTICS_SUCCESS:
      return {
        ...state,
        claimStat: action.payload.response.data.data,
      };
    case STATISTICS_CONST.GET_CLAIM_STATISTICS_FAILURE:
      return {
        ...state,
        claimStat: null,
      };
    case STATISTICS_CONST.GET_CLAIM_STATISTICS_REPORT_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        claimReportData: null,
      };
    case STATISTICS_CONST.GET_CLAIM_STATISTICS_REPORT_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        claimReportData: action.payload.response
            ? action.payload.response.data.data
            : null,
      };
    case STATISTICS_CONST.GET_CLAIM_STATISTICS_REPORT_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        claimReportData: null,
      };

    case STATISTICS_CONST.GET_USERS_STATISTICS_REPORT_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        userReportData: null,
      };
    case STATISTICS_CONST.GET_USERS_STATISTICS_REPORT_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        userReportData: action.payload.response
            ? action.payload.response.data.data
            : null,
      };
    case STATISTICS_CONST.GET_USERS_STATISTICS_REPORT_FAILURE:
      // console.log(action.payload);
      return {
        ...state,
        userReportData: null,
      };


  }
  return state;
}
