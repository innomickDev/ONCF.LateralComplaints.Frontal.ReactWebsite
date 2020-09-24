import { GROUPS_CONST } from "./actionTypes";
import { AXIOS_INSTANCE, GROUPS_API, CONFIG } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

export function getGroups(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(GROUPS_CONST.GET_GROUPS_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.post(
        `${GROUPS_API}/GetGroups`,
        queryParams,
        CONFIG
      );
    } else {
      apiPromise = AXIOS_INSTANCE.post(`${GROUPS_API}/GetGroups`, CONFIG);
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(GROUPS_CONST.GET_GROUPS_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(GROUPS_CONST.GET_GROUPS_FAILURE, {
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
          base.getFailure(GROUPS_CONST.GET_GROUPS_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Add group
export function addGroup(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(GROUPS_CONST.ADD_GROUP_REQUEST));
    AXIOS_INSTANCE.post(`${GROUPS_API}/CreateGroup`, roleParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(GROUPS_CONST.ADD_GROUP_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(GROUPS_CONST.ADD_GROUP_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(GROUPS_CONST.ADD_GROUP_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// update Group
export function updateGroup(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(GROUPS_CONST.UPDATE_GROUP_REQUEST));
    AXIOS_INSTANCE.patch(`${GROUPS_API}/UpdateGroup`, roleParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(GROUPS_CONST.UPDATE_GROUP_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(GROUPS_CONST.UPDATE_GROUP_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(GROUPS_CONST.UPDATE_GROUP_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// delete role
export function deleteGroup(groupIdParam) {
  return (dispatch) => {
    dispatch(base.getRequest(GROUPS_CONST.DELETE_GROUP_REQUEST));
    AXIOS_INSTANCE.delete(`${GROUPS_API}/${groupIdParam}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(GROUPS_CONST.DELETE_GROUP_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(GROUPS_CONST.DELETE_GROUP_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(GROUPS_CONST.DELETE_GROUP_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Add user in groups
export function addUserInGroup(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(GROUPS_CONST.ADD_USER_IN_GROUP_REQUEST));
    AXIOS_INSTANCE.post(`${GROUPS_API}/AddUserInGroup`, roleParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(GROUPS_CONST.ADD_USER_IN_GROUP_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(GROUPS_CONST.ADD_USER_IN_GROUP_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(GROUPS_CONST.ADD_USER_IN_GROUP_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Delete user in group
export function deleteUserInGroup(groupIdParam) {
  return (dispatch) => {
    dispatch(base.getRequest(GROUPS_CONST.DELETE_USER_IN_GROUP_REQUEST));
    AXIOS_INSTANCE.delete(
      `${GROUPS_API}/RemoveUserInGroup?groupCode=${groupIdParam.groupCode}&userCode=${groupIdParam.userCode}`
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(GROUPS_CONST.DELETE_USER_IN_GROUP_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(GROUPS_CONST.DELETE_USER_IN_GROUP_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(GROUPS_CONST.DELETE_USER_IN_GROUP_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// get user by group id
export function getUserByGroupId(groupId) {
  return (dispatch) => {
    dispatch(base.getRequest(GROUPS_CONST.GET_USERS_BY_GROUP_ID_REQUEST));
    AXIOS_INSTANCE.get(`${GROUPS_API}/${groupId}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(GROUPS_CONST.GET_USERS_BY_GROUP_ID_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(GROUPS_CONST.GET_USERS_BY_GROUP_ID_FAILURE, {
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
          base.getFailure(GROUPS_CONST.GET_USERS_BY_GROUP_ID_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}
