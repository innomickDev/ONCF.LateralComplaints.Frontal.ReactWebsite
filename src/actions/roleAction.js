import { ROLE_CONST, ACCOUNT_ROLE_CONST } from "./actionTypes";
import {
  AXIOS_INSTANCE,
  ROLE_API,
  CONFIG,
  ACCOUNT_ROLE_API,
} from "./apiEndPoints";
import { checkHttpStatus, parseJSON, handleLogoutRedirect } from "../utils";
import * as base from "./baseAction";
import { actions } from "react-redux-form";

export function addRole(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(ROLE_CONST.ADD_ROLE_REQUEST));
    AXIOS_INSTANCE.post(`${ROLE_API}/CreateRole`, roleParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ROLE_CONST.ADD_ROLE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ROLE_CONST.ADD_ROLE_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ROLE_CONST.ADD_ROLE_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// update Role
export function updateRole(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(ROLE_CONST.UPDATE_ROLE_REQUEST));
    AXIOS_INSTANCE.put(`${ROLE_API}/UpdateRole`, roleParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ROLE_CONST.UPDATE_ROLE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ROLE_CONST.UPDATE_ROLE_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ROLE_CONST.UPDATE_ROLE_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

export function getAllRoles(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(ROLE_CONST.GET_ROLES_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.get(
        `${ROLE_API}/GetListRole`,
        queryParams,
        CONFIG
      );
    } else {
      apiPromise = AXIOS_INSTANCE.get(`${ROLE_API}/GetListRole`, CONFIG);
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ROLE_CONST.GET_ROLES_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ROLE_CONST.GET_ROLES_FAILURE, {
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
          base.getFailure(ROLE_CONST.GET_ROLES_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// update Assign Profile to user
export function assignRoleToUSer(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(ROLE_CONST.ASSIGN_ROLE_REQUEST));
    AXIOS_INSTANCE.put(`${ROLE_API}/UpdateAssignRoleToUser`, roleParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ROLE_CONST.ASSIGN_ROLE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ROLE_CONST.ASSIGN_ROLE_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ROLE_CONST.ASSIGN_ROLE_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}
// //Confirm forgotten password
// export function assignRoleToUSer(requestParam) {
//   return (dispatch) => {
//     dispatch(base.getRequest(ROLE_CONST.ASSIGN_ROLE_REQUEST));
//     AXIOS_INSTANCE.post(`${ROLE_API}/UpdateAssignRoleToUser`, requestParam)
//       .then(checkHttpStatus)
//       .then(parseJSON)
//       .then((result) => {
//         if (result.isSuccess) {
//           dispatch(
//             base.getSuccess(ROLE_CONST.ASSIGN_ROLE_SUCCESS, {
//               response: {
//                 data: result,
//               },
//             })
//           );
//         } else {
//           dispatch(
//             base.getFailure(ROLE_CONST.ASSIGN_ROLE_FAILURE, {
//               response: result,
//             })
//           );
//         }
//       })
//       .catch((error) => {
//         dispatch(base.handleCatch(ROLE_CONST.ASSIGN_ROLE_FAILURE, error));
//       });
//   };
// }

// delete role
export function deleteRole(roleIdParam) {
  return (dispatch) => {
    dispatch(base.getRequest(ROLE_CONST.DELETE_ROLE_REQUEST));
    AXIOS_INSTANCE.delete(`${ROLE_API}/DeleteRole?code=${roleIdParam}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ROLE_CONST.DELETE_ROLE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ROLE_CONST.DELETE_ROLE_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ROLE_CONST.DELETE_ROLE_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Get Role By Code
export function getRoleByCode(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(ROLE_CONST.GET_ROLE_BY_CODE_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.get(
        `${ROLE_API}/GetProfileByCode`,
        queryParams,
        CONFIG
      );
    } else {
      apiPromise = AXIOS_INSTANCE.get(`${ROLE_API}/GetProfileByCode`, CONFIG);
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ROLE_CONST.GET_ROLE_BY_CODE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ROLE_CONST.GET_ROLE_BY_CODE_FAILURE, {
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
          base.getFailure(ROLE_CONST.GET_ROLE_BY_CODE_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Get List Permission
export function getPermissions(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(ROLE_CONST.GET_PERMISSIONS_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.get(
        `${ROLE_API}/GetListPermission`,
        queryParams,
        CONFIG
      );
    } else {
      apiPromise = AXIOS_INSTANCE.get(`${ROLE_API}/GetListPermission`, CONFIG);
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ROLE_CONST.GET_PERMISSIONS_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ROLE_CONST.GET_PERMISSIONS_FAILURE, {
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
          base.getFailure(ROLE_CONST.GET_PERMISSIONS_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}
