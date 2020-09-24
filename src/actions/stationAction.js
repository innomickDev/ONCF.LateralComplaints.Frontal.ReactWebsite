import { STATION_CONST } from "./actionTypes";
import { AXIOS_INSTANCE, STATION_API, CONFIG } from "./apiEndPoints";
import { checkHttpStatus, parseJSON, handleLogoutRedirect } from "../utils";
import * as base from "./baseAction";
import { Header } from "react-bootstrap/lib/Modal";

export function getStations(queryParams) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("boGRCAuthToken")),
    },
  };

  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(STATION_CONST.GET_STATIONS_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.post(
        `${STATION_API}/GetStations`,
        queryParams
      );
    } else {
      apiPromise = AXIOS_INSTANCE.post(`${STATION_API}/GetStations`, HEADER);
    }
    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(STATION_CONST.GET_STATIONS_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(STATION_CONST.GET_STATIONS_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })

      .catch((error) => {
        dispatch(base.handleCatch(STATION_CONST.GET_STATIONS_FAILURE, error));
      });
  };
}

export function getStationById(stationIdParam) {
  return (dispatch) => {
    dispatch(base.getRequest(STATION_CONST.GET_STATION_REQUEST));
    AXIOS_INSTANCE.get(`${STATION_API}/${stationIdParam}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(STATION_CONST.GET_STATION_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(STATION_CONST.GET_STATION_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })

      .catch((error) => {
        dispatch(base.handleCatch(STATION_CONST.GET_STATION_FAILURE, error));
      });
  };
}

export function addStation(stationParam) {
  return (dispatch) => {
    dispatch(base.getRequest(STATION_CONST.ADD_STATION_REQUEST));
    AXIOS_INSTANCE.post(`${STATION_API}/CreateStation`, stationParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(STATION_CONST.ADD_STATION_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(STATION_CONST.ADD_STATION_FAILURE, {
              response: result,
            })
          );
        }
      })

      .catch((error) => {
        dispatch(base.handleCatch(STATION_CONST.ADD_STATION_FAILURE, error));
      });
  };
}
// update Role
export function updateStation(stationParam) {
  return (dispatch) => {
    dispatch(base.getRequest(STATION_CONST.UPDATE_STATION_REQUEST));
    AXIOS_INSTANCE.patch(`${STATION_API}/UpdateStation`, stationParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(STATION_CONST.UPDATE_STATION_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(STATION_CONST.UPDATE_STATION_FAILURE, {
              response: result,
            })
          );
        }
      })

      .catch((error) => {
        dispatch(base.handleCatch(STATION_CONST.UPDATE_STATION_FAILURE, error));
      });
  };
}

// delete role
export function deleteStation(stationParam) {
  return (dispatch) => {
    dispatch(base.getRequest(STATION_CONST.DELETE_STATION_REQUEST));
    AXIOS_INSTANCE.delete(`${STATION_API}/${stationParam}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(STATION_CONST.DELETE_STATION_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(STATION_CONST.DELETE_STATION_FAILURE, {
              response: result,
            })
          );
        }
      })

      .catch((error) => {
        dispatch(base.handleCatch(STATION_CONST.DELETE_STATION_FAILURE, error));
      });
  };
}
