/* eslint-disable default-case */
import { AUTH_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusCode: null,
    statusText: null,
    email: null,
    // loginNetworkError: null,
    loginErrorStatus: null,
  },
  action
) {
  switch (action.type) {
    case AUTH_CONST.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
        isAuthenticated: false,
        networkError: false,
        loginData: null,
        loginNetworkError: false,
        loginErrorStatus: null,
      };
    case AUTH_CONST.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loginData: action.payload.response.data.isSuccess
          ? action.payload.response.data.data
          : null,
        isAuthenticating: false,
        networkError: false,
        loginErrorStatus: null,
      };
    case AUTH_CONST.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticating: false,
        loginData: null,
        loginErrorStatus: action.payload.response.data.error.errorDescription,
      };
  }
  return state;
}
