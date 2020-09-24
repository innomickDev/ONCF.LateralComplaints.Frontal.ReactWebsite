import { PROFILE } from "./actionTypes";
import { AXIOS_INSTANCE, PROFILE_API, CONFIG } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

export function addProfile(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(PROFILE.CREATE_PROFILE_REQUEST));
    AXIOS_INSTANCE.post(`${PROFILE_API}/CreateProfile`, roleParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(PROFILE.CREATE_PROFILE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(PROFILE.CREATE_PROFILE_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(PROFILE.CREATE_PROFILE_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// update Profile
export function updateProfile(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(PROFILE.UPDATE_PROFILE_REQUEST));
    AXIOS_INSTANCE.put(`${PROFILE_API}/UpdateProfile`, roleParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(PROFILE.UPDATE_PROFILE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(PROFILE.UPDATE_PROFILE_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(PROFILE.UPDATE_PROFILE_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Get List Profile
export function getListProfile(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(PROFILE.GET_LIST_PROFILE_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.get(
        `${PROFILE_API}/GetListProfile`,
        queryParams,
        CONFIG
      );
    } else {
      apiPromise = AXIOS_INSTANCE.get(`${PROFILE_API}/GetListProfile`, CONFIG);
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(PROFILE.GET_LIST_PROFILE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(PROFILE.GET_LIST_PROFILE_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(PROFILE.GET_LIST_PROFILE_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Get Profile By Code
export function getProfileByCode(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(PROFILE.GET_PROFILE_BY_CODE_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.get(
        `${PROFILE_API}/GetProfileByCode`,
        queryParams,
        CONFIG
      );
    } else {
      apiPromise = AXIOS_INSTANCE.get(
        `${PROFILE_API}/GetProfileByCode`,
        CONFIG
      );
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(PROFILE.GET_PROFILE_BY_CODE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(PROFILE.GET_PROFILE_BY_CODE_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(PROFILE.GET_PROFILE_BY_CODE_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Delete Profile
export function deleteProfile(groupIdParam) {
  return (dispatch) => {
    dispatch(base.getRequest(PROFILE.DELETE_PROFILE_REQUEST));
    AXIOS_INSTANCE.delete(`${PROFILE_API}/DeleteProfile?code=${groupIdParam}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(PROFILE.DELETE_PROFILE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(PROFILE.DELETE_PROFILE_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(PROFILE.DELETE_PROFILE_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Get List Permission
export function getListPermission(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(PROFILE.GET_LIST_PERMISSION_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.get(
        `${PROFILE_API}/GetListPermission`,
        queryParams,
        CONFIG
      );
    } else {
      apiPromise = AXIOS_INSTANCE.get(
        `${PROFILE_API}/GetListPermission`,
        CONFIG
      );
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(PROFILE.GET_LIST_PERMISSION_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(PROFILE.GET_LIST_PERMISSION_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(PROFILE.GET_LIST_PERMISSION_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// update Assign Profile to user
export function updateAssignProfileTouser(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(PROFILE.UPDATE_ASSIGN_PROFILE_TO_USER_REQUEST));
    AXIOS_INSTANCE.put(`${PROFILE_API}/UpdateAssignProfileToUser`, roleParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(PROFILE.UPDATE_ASSIGN_PROFILE_TO_USER_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(PROFILE.UPDATE_ASSIGN_PROFILE_TO_USER_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(PROFILE.UPDATE_ASSIGN_PROFILE_TO_USER_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}
