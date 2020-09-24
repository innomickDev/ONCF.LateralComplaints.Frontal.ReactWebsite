import { TIME_LIMIT_CONFIGURATION } from "../actions/actionTypes";
export default function reducer(
  state = {
    // stationList: null,
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // GET TimeLimit
    case TIME_LIMIT_CONFIGURATION.GET_TIME_LIMIT_CONFIGURATION_REQUEST:
      return {
        ...state,

        timeLimitData: null,
        stationFailure: null,
        isLoading: true,
      };
    case TIME_LIMIT_CONFIGURATION.GET_TIME_LIMIT_CONFIGURATION_SUCCESS:
      return {
        ...state,
        stationList: action.payload ? action.payload.response.data.data : null,
        timeLimitData: action.payload
          ? action.payload.response.data.data
          : null,
        stationFailure: null,
        isLoading: false,
      };
    case TIME_LIMIT_CONFIGURATION.GET_TIME_LIMIT_CONFIGURATION_FAILURE:
      return {
        ...state,
        stationList: null,
        timeLimitData: null,
        stationFailure: action.payload.response.error.errorDescription,
        isLoading: false,
      };

    // update TimeLimit
    case TIME_LIMIT_CONFIGURATION.UPDATE_TIME_LIMIT_CONFIGURATION_REQUEST:
      return {
        ...state,
        isUpdateTimeLimitSuccess: null,
        isRequesting: true,
        isUpdateTimeLimitFailure: null,
      };
    case TIME_LIMIT_CONFIGURATION.UPDATE_TIME_LIMIT_CONFIGURATION_SUCCESS:
      return {
        ...state,
        isUpdateTimeLimitSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isRequesting: false,
        isUpdateTimeLimitFailure: null,
      };
    case TIME_LIMIT_CONFIGURATION.UPDATE_TIME_LIMIT_CONFIGURATION_FAILURE:
      return {
        ...state,
        isUpdateTimeLimitSuccess: null,
        isRequesting: false,
        isUpdateTimeLimitFailure:
          action.payload.response.error.errorDescription,
      };
  }
  return state;
}
