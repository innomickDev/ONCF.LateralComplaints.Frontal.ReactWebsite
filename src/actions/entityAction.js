import { ENTITY } from "./actionTypes";
import { AXIOS_INSTANCE, ENTITY_API, CONFIG } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

export function addEntity(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(ENTITY.CREATE_ENTITY_REQUEST));
    AXIOS_INSTANCE.post(`${ENTITY_API}/CreateEntity`, roleParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ENTITY.CREATE_ENTITY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ENTITY.CREATE_ENTITY_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ENTITY.CREATE_ENTITY_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// update entity
export function updateEntity(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(ENTITY.UPDATE_ENTITY_REQUEST));
    AXIOS_INSTANCE.put(`${ENTITY_API}/UpdateEntity`, roleParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ENTITY.UPDATE_ENTITY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ENTITY.UPDATE_ENTITY_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ENTITY.UPDATE_ENTITY_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

//Get List Entity
export function getListEntity(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(ENTITY.GET_LIST_ENTITY_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.post(
        `${ENTITY_API}/getListEntity`,
        queryParams,
        CONFIG
      );
    } else {
      apiPromise = AXIOS_INSTANCE.post(`${ENTITY_API}/getListEntity`, CONFIG);
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ENTITY.GET_LIST_ENTITY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ENTITY.GET_LIST_ENTITY_FAILURE, {
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
          base.getFailure(ENTITY.GET_LIST_ENTITY_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

export function getListEntityByResponsibility(queryParams) {
  return (dispatch) => {
    dispatch(base.getRequest(ENTITY.GET_LIST_ENTITY_BY_RESPONSIBILITY_REQUEST));
    AXIOS_INSTANCE.get(
      `${ENTITY_API}/GetListEntityByResponsibility?responsibilityCode=${queryParams.responsibilityCode}`
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ENTITY.GET_LIST_ENTITY_BY_RESPONSIBILITY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ENTITY.GET_LIST_ENTITY_BY_RESPONSIBILITY_FAILURE, {
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
          base.getFailure(ENTITY.GET_LIST_ENTITY_BY_RESPONSIBILITY_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}
// //Get List Entity
// export function getListEntityByResponsibility(queryParams) {
//   let apiPromise = "";
//   return (dispatch) => {
//     dispatch(base.getRequest(ENTITY.GET_LIST_ENTITY_BY_RESPONSIBILITY_REQUEST));

//     apiPromise = AXIOS_INSTANCE.post(
//       `${ENTITY_API}/GetListEntityByResponsibility`,
//       queryParams,
//       CONFIG
//     );

//     apiPromise
//       .then(checkHttpStatus)
//       .then(parseJSON)
//       .then((result) => {
//         if (result.isSuccess) {
//           dispatch(
//             base.getSuccess(ENTITY.GET_LIST_ENTITY_BY_RESPONSIBILITY_SUCCESS, {
//               response: {
//                 data: result,
//               },
//             })
//           );
//         } else {
//           dispatch(
//             base.getFailure(ENTITY.GET_LIST_ENTITY_BY_RESPONSIBILITY_FAILURE, {
//               response: {
//                 data: result,
//               },
//             })
//           );
//         }
//       })
//       .catch((error) => {
//         checkHttpStatus(error.response);
//         dispatch(
//           base.getFailure(ENTITY.GET_LIST_ENTITY_BY_RESPONSIBILITY_FAILURE, {
//             error: {
//               data: error,
//             },
//           })
//         );
//       });
//   };
// }

// Get Entity By Code
export function getEntityByCode(groupId) {
  return (dispatch) => {
    dispatch(base.getRequest(ENTITY.GET_ENTITY_BY_CODE_REQUEST));
    AXIOS_INSTANCE.get(`${ENTITY_API}/GetEntityByCode?code=${groupId}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ENTITY.GET_ENTITY_BY_CODE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ENTITY.GET_ENTITY_BY_CODE_FAILURE, {
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
          base.getFailure(ENTITY.GET_ENTITY_BY_CODE_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Delete Entity
export function deleteEntity(groupIdParam) {
  return (dispatch) => {
    dispatch(base.getRequest(ENTITY.DELETE_ENTITY_REQUEST));
    AXIOS_INSTANCE.delete(`${ENTITY_API}/DeleteEntity?code=${groupIdParam}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ENTITY.DELETE_ENTITY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ENTITY.DELETE_ENTITY_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ENTITY.DELETE_ENTITY_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Add user in Entity
export function addUserInEntity(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(ENTITY.ADD_USER_IN_ENTITY_REQUEST));
    AXIOS_INSTANCE.put(`${ENTITY_API}/AddUserInEntity`, roleParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ENTITY.ADD_USER_IN_ENTITY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ENTITY.ADD_USER_IN_ENTITY_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ENTITY.ADD_USER_IN_ENTITY_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}
// Remove user in Entity
export function removeUserInEntity(groupIdParam) {
  return (dispatch) => {
    dispatch(base.getRequest(ENTITY.REMOVE_USER_IN_ENTITY_REQUEST));
    AXIOS_INSTANCE.delete(
      `${ENTITY_API}/RemoveUserInEntity?entityCode=${groupIdParam.entityCode}&userCode=${groupIdParam.userCode}`
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ENTITY.REMOVE_USER_IN_ENTITY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ENTITY.REMOVE_USER_IN_ENTITY_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ENTITY.REMOVE_USER_IN_ENTITYFAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}
