import { AUTH_CONST } from "./actionTypes";

import {
  AXIOS_INSTANCE,
  LOGIN_API,
  LOGIN_CONFIG,
} from "./apiEndPoints";
import { checkHttpStatus, parseJSON, handleLoginRedirect } from "../utils";
import * as base from "./baseAction";

export function BackOffice(formData) {
  return (dispatch) => {
    dispatch(base.getRequest(AUTH_CONST.LOGIN_REQUEST));
    formData.grant_type = "password";
    formData.scope = "BackOffice";
    AXIOS_INSTANCE.post(`${LOGIN_API}`, formData, LOGIN_CONFIG)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          AXIOS_INSTANCE.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${result.data.token}`;
          handleLoginRedirect(`${result.data.token}`, result);
          dispatch(
            base.getSuccess(AUTH_CONST.LOGIN_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(AUTH_CONST.LOGIN_FAILURE, {
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
          base.getFailure(AUTH_CONST.LOGIN_FAILURE, {
            error: {
              data: error.response ? error.response.data : null,
            },
          })
        );
      });
   
  };
}
