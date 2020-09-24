import { STATION_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    stationList: null,
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // GET Station
    case STATION_CONST.GET_STATIONS_REQUEST:
      return {
        ...state,
        stationList: null,
        stationData: null,
        stationFailure: null,
      };
    case STATION_CONST.GET_STATIONS_SUCCESS:
      return {
        ...state,
        stationList: action.payload ? action.payload.response.data.data : null,
        stationData: action.payload ? action.payload.response.data.data : null,
        stationFailure: null,
      };
    case STATION_CONST.GET_STATIONS_FAILURE:
      return {
        ...state,
        stationList: null,
        stationData: null,
        stationFailure: action.payload.response.error.errorDescription,
      };

    // Add station
    case STATION_CONST.ADD_STATION_REQUEST:
      return {
        ...state,
        isStationSuccess: null,
        isStationError: null,
      };
    case STATION_CONST.ADD_STATION_SUCCESS:
      return {
        ...state,
        isStationSuccess: action.payload.response
          ? action.payload.response.data.isSuccess
          : null,
        isStationError: null,
      };
    case STATION_CONST.ADD_STATION_FAILURE:
      return {
        ...state,
        isStationSuccess: null,
        isStationError: action.payload.response.error.errorDescription,
      };

    // update station
    case STATION_CONST.UPDATE_STATION_REQUEST:
      return {
        ...state,
        isUpdateStationSuccess: null,
        isUpdateStationFailure: null,
      };
    case STATION_CONST.UPDATE_STATION_SUCCESS:
      return {
        ...state,
        isUpdateStationSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isUpdateStationFailure: null,
      };
    case STATION_CONST.UPDATE_STATION_FAILURE:
      return {
        ...state,
        isUpdateStationSuccess: null,
        isUpdateStationFailure: action.payload.response.error.errorDescription,
      };

    // Delete station
    case STATION_CONST.DELETE_STATION_REQUEST:
      return {
        ...state,
        isDeleteSuccess: null,
        isDeleteError: null,
      };
    case STATION_CONST.DELETE_STATION_SUCCESS:
      return {
        ...state,
        isDeleteSuccess: action.payload.response.data.isSuccess ? true : false,
        isDeleteError: null,
      };
    case STATION_CONST.DELETE_STATION_FAILURE:
      return {
        ...state,
        isDeleteSuccess: null,
        isDeleteError: action.payload.response.error.errorDescription,
      };
  }
  return state;
}
