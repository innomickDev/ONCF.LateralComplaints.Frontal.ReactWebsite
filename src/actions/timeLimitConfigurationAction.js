import { TIME_LIMIT_CONFIGURATION } from "./actionTypes";
import {
  AXIOS_INSTANCE,
  TIME_LIMIT_CONFIGURATION_API,
  CONFIG,
} from "./apiEndPoints";
import { checkHttpStatus, parseJSON, handleLogoutRedirect } from "../utils";
import * as base from "./baseAction";
import { Header } from "react-bootstrap/lib/Modal";

export function getTimeLimitConfiguration() {
  return (dispatch) => {
    dispatch(
      base.getRequest(
        TIME_LIMIT_CONFIGURATION.GET_TIME_LIMIT_CONFIGURATION_REQUEST
      )
    );
    AXIOS_INSTANCE.get(
      `${TIME_LIMIT_CONFIGURATION_API}/GetTimeLimitConfiguration`
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        dispatch(
          base.getSuccess(
            TIME_LIMIT_CONFIGURATION.GET_TIME_LIMIT_CONFIGURATION_SUCCESS,
            {
              response: {
                data: result,
              },
            }
          )
        );
      })
      .catch((error) => {
        dispatch(
          base.getFailure(
            TIME_LIMIT_CONFIGURATION.GET_TIME_LIMIT_CONFIGURATION_FAILURE,
            {
              error: {
                data: error,
              },
            }
          )
        );
      });
  };
}

// update Role
export function updateTimeLimitConfiguration(stationParam) {
  return (dispatch) => {
    dispatch(
      base.getRequest(
        TIME_LIMIT_CONFIGURATION.UPDATE_TIME_LIMIT_CONFIGURATION_REQUEST
      )
    );
    AXIOS_INSTANCE.put(
      `${TIME_LIMIT_CONFIGURATION_API}/UpdateTimeLimitConfiguration`,
      stationParam
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(
              TIME_LIMIT_CONFIGURATION.UPDATE_TIME_LIMIT_CONFIGURATION_SUCCESS,
              {
                response: {
                  data: result,
                },
              }
            )
          );
        } else {
          dispatch(
            base.getFailure(
              TIME_LIMIT_CONFIGURATION.UPDATE_TIME_LIMIT_CONFIGURATION_FAILURE,
              {
                response: result,
              }
            )
          );
        }
      })

      .catch((error) => {
        dispatch(
          base.handleCatch(
            TIME_LIMIT_CONFIGURATION.UPDATE_TIME_LIMIT_CONFIGURATION_FAILURE,
            error
          )
        );
      });
  };
}
