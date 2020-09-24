import { ACCOUNT_CONST } from "./actionTypes";
import {
  AXIOS_INSTANCE,
  ACCOUNT_API,
  CONFIG,
  LOGIN_CONFIG,
} from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

export function forgotPassword(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.FORGOT_PASSWORD_REQUEST));
    AXIOS_INSTANCE.get(
      `${ACCOUNT_API}/ForgotPassword?email=${formData.email}&isBackOfficeUser=${formData.isBackOfficeUser}`
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.FORGOT_PASSWORD_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.FORGOT_PASSWORD_FAILURE, {
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
          base.getFailure(ACCOUNT_CONST.FORGOT_PASSWORD_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

//Confirm forgotten password
export function confirmForgottenPassword(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.CHANGE_PASSWORD_REQUEST));
    AXIOS_INSTANCE.post(
      `${ACCOUNT_API}/Account/ConfirmForgottenPassword`,
      formData
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          // AXIOS_INSTANCE.defaults.headers.common[
          //   "Authorization"
          // ] = `${result.token_type} ${result.access_token}`;
          dispatch(
            base.getSuccess(ACCOUNT_CONST.CHANGE_PASSWORD_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.CHANGE_PASSWORD_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ACCOUNT_CONST.CHANGE_PASSWORD_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Clients registration
export function clientsRegistration(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.CLIENT_REGISTRATION_REQUEST));
    AXIOS_INSTANCE.post(`${ACCOUNT_API}/Account/ClientRegistration`, formData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.CLIENT_REGISTRATION_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.CLIENT_REGISTRATION_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ACCOUNT_CONST.CLIENT_REGISTRATION_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// My Profile
export function myProfile() {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      // "Accept-Language": "fr-FR",
      Authorization: JSON.parse(localStorage.getItem("boGRCAuthToken")),
    },
  };

  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.MY_PROFILE_REQUEST));
    AXIOS_INSTANCE.get(`${ACCOUNT_API}/MyProfile`, HEADER)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result) {
          AXIOS_INSTANCE.defaults.headers.common[
            "Authorization"
          ] = `${JSON.parse(localStorage.getItem("boGRCAuthToken"))}`;

          localStorage.setItem("boGRCuserProfile", JSON.stringify(result));
          dispatch(
            base.getSuccess(ACCOUNT_CONST.MY_PROFILE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.MY_PROFILE_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ACCOUNT_CONST.MY_PROFILE_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// change password
export function changePassword(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.CHANGE_PASSWORD_REQUEST));
    AXIOS_INSTANCE.post(`${ACCOUNT_API}/Account/ChangePassword`, formData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.CHANGE_PASSWORD_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.CHANGE_PASSWORD_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ACCOUNT_CONST.CHANGE_PASSWORD_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

//action for add backOffice User
export function addUser(userParams) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.ADD_USER_REQUEST));
    AXIOS_INSTANCE.post(
      `${ACCOUNT_API}/Account/CreateBackOfficeUser`,
      userParams
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.ADD_USER_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.ADD_USER_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      // .catch(error => {
      //   error = checkHttpStatus(error.response);
      //   dispatch(
      //     base.getFailure(ACCOUNT_CONST.ADD_USER_FAILURE, {
      //       error: {
      //         data: error
      //         //formValue: formValue
      //       }
      //     })
      //   );
      // });
      .catch((error) => {
        dispatch(base.handleCatch(ACCOUNT_CONST.ADD_USER_FAILURE, error));
      });
  };
}

// Get user details by id
export function getUserById(userId) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.GET_USER_DETAILS_REQUEST));
    AXIOS_INSTANCE.get(`${ACCOUNT_API}/${userId}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.GET_USER_DETAILS_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.GET_USER_DETAILS_FAILURE, {
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
          base.getFailure(ACCOUNT_CONST.GET_USER_DETAILS_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Get Back office Users based on group id
export function getUsersByGroupId(claimId) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.GET_TICKET_ATTACHMENT_REQUEST));
    AXIOS_INSTANCE.get(`${ACCOUNT_API}/GetTicketAttachment?claimId=${claimId}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.GET_TICKET_ATTACHMENT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.GET_TICKET_ATTACHMENT_FAILURE, {
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
          base.getFailure(ACCOUNT_CONST.GET_TICKET_ATTACHMENT_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

/**
 *
 * @param {*} userData to be updated
 */
export function updateUser(userData) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.UPDATE_USER_REQUEST));
    AXIOS_INSTANCE.patch(`${ACCOUNT_API}/Account/UpdateUser`, userData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.UPDATE_USER_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.UPDATE_USER_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      // .catch(error => {
      //   checkHttpStatus(error.response);
      //   dispatch(
      //     base.getFailure(ACCOUNT_CONST.UPDATE_TICKET_ATTACHMENT_FAILURE, {
      //       error: {
      //         data: error
      //       }
      //     })
      //   );
      // });
      .catch((error) => {
        dispatch(base.handleCatch(ACCOUNT_CONST.UPDATE_USER_FAILURE, error));
      });
  };
}
/**
 *
 * @param {*} userId : id of user to be deleted
 */
export function deleteUser(userId) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.DELETE_USER_REQUEST));
    AXIOS_INSTANCE.delete(
      `${ACCOUNT_API}/Account/${userId}`
      // formData,
      // HEADER
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.DELETE_USER_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.DELETE_USER_FAILURE, {
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
          base.getFailure(ACCOUNT_CONST.DELETE_USER_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

export function getAllUsers(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.GET_USERS_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.post(
        `${ACCOUNT_API}/GetUsers`,
        queryParams,
        CONFIG
      );
    } else {
      apiPromise = AXIOS_INSTANCE.post(`${ACCOUNT_API}/GetUsers`, CONFIG);
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.GET_USERS_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.GET_USERS_FAILURE, {
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
          base.getFailure(ACCOUNT_CONST.GET_USERS_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Get agents
export function getAgents() {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.GET_AGENTS_REQUEST));
    AXIOS_INSTANCE.get(`${ACCOUNT_API}/GetAgents`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.GET_AGENTS_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.GET_AGENTS_FAILURE, {
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
          base.getFailure(ACCOUNT_CONST.GET_AGENTS_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Activate User
export function activateUser(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.ACTIVATE_USER_REQUEST));
    AXIOS_INSTANCE.post(`${ACCOUNT_API}/ActivateUser`, formData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.ACTIVATE_USER_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.ACTIVATE_USER_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ACCOUNT_CONST.ACTIVATE_USER_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Deactivate User
export function deactivateUser(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.DEACTIVATE_USER_REQUEST));

    AXIOS_INSTANCE.post(`${ACCOUNT_API}/DeactivateUser`, formData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.DEACTIVATE_USER_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.DEACTIVATE_USER_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ACCOUNT_CONST.DEACTIVATE_USER_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Logout
export function userLogout(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.LOGOUT_REQUEST));
    AXIOS_INSTANCE.post(`${ACCOUNT_API}/Account/LogOut`, formData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.LOGOUT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.LOGOUT_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ACCOUNT_CONST.LOGOUT_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

//All Customers

export function getAllCustomers(queryParams) {
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.GET_FRONT_CUSTOMERS_REQUEST));
    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.post(
        `${ACCOUNT_API}/GetCustomers`,
        queryParams
      );
    } else {
      apiPromise = AXIOS_INSTANCE.post(`${ACCOUNT_API}/GetCustomers`);
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.GET_FRONT_CUSTOMERS_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.GET_FRONT_CUSTOMERS_FAILURE, {
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
          base.getFailure(ACCOUNT_CONST.GET_FRONT_CUSTOMERS_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}
// Logout
export function unLockAccouont(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(ACCOUNT_CONST.UNLOCK_ACCOUNT_REQUEST));
    AXIOS_INSTANCE.post(`${ACCOUNT_API}/UnLockAccouont`, formData)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(ACCOUNT_CONST.UNLOCK_ACCOUNT_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(ACCOUNT_CONST.UNLOCK_ACCOUNT_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(ACCOUNT_CONST.UNLOCK_ACCOUNT_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}
