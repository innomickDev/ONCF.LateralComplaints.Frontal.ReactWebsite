import { RESPONSE_CONST } from "./actionTypes";
import { AXIOS_INSTANCE, RESPONSE_API } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

export function getResponse(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(RESPONSE_CONST.GET_RESPONSE_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.get(
        `${RESPONSE_API}/GetResponses${queryParams}`
      );
    } else {
      apiPromise = AXIOS_INSTANCE.get(`${RESPONSE_API}/GetResponses`);
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(RESPONSE_CONST.GET_RESPONSE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(RESPONSE_CONST.GET_RESPONSE_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })

      .catch((error) => {
        dispatch(base.handleCatch(RESPONSE_CONST.GET_RESPONSE_FAILURE, error));
      });
  };
}

// Add group
export function addResponse(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(RESPONSE_CONST.ADD_RESPONSE_REQUEST));
    AXIOS_INSTANCE.post(`${RESPONSE_API}/CreateResponse`, roleParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(RESPONSE_CONST.ADD_RESPONSE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(RESPONSE_CONST.ADD_RESPONSE_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(base.handleCatch(RESPONSE_CONST.ADD_RESPONSE_FAILURE, error));
      });
  };
}

// // update Group
export function updateResponse(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(RESPONSE_CONST.UPDATE_RESPONSE_REQUEST));
    AXIOS_INSTANCE.patch(`${RESPONSE_API}/UpdateResponse`, roleParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result) {
          dispatch(
            base.getSuccess(RESPONSE_CONST.UPDATE_RESPONSE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(RESPONSE_CONST.UPDATE_RESPONSE_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          base.handleCatch(RESPONSE_CONST.UPDATE_RESPONSE_FAILURE, error)
        );
      });
  };
}

// delete response
export function deleteResponse(responseIdParam) {
  return (dispatch) => {
    dispatch(base.getRequest(RESPONSE_CONST.DELETE_RESPONSE_BY_ID_REQUEST));
    AXIOS_INSTANCE.delete(`${RESPONSE_API}/${responseIdParam}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(RESPONSE_CONST.DELETE_RESPONSE_BY_ID_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(RESPONSE_CONST.DELETE_RESPONSE_BY_ID_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          base.handleCatch(RESPONSE_CONST.DELETE_RESPONSE_BY_ID_FAILURE, error)
        );
      });
  };
}

// Customized response
export function customizedResponse(responseData) {
  return (dispatch) => {
    dispatch(base.getRequest(RESPONSE_CONST.CUSTOMIZED_RESPONSE_REQUEST));
    AXIOS_INSTANCE.post(
      `${RESPONSE_API}/GetCustomizedResponseByCode`,
      responseData
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(RESPONSE_CONST.CUSTOMIZED_RESPONSE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(RESPONSE_CONST.CUSTOMIZED_RESPONSE_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          base.handleCatch(RESPONSE_CONST.CUSTOMIZED_RESPONSE_FAILURE, error)
        );
      });
  };
}
