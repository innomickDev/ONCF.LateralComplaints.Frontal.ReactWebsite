/* eslint-disable default-case */
import { ACCOUNT_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    token: null,
    statusCode: null,
    statusText: null,
    emailSuccess: false,
    isRedirect: false,
    registerSuccess: false,
    profileData: null,
    usersData: [],
  },
  action
) {
  switch (action.type) {
    // Forgot password
    case ACCOUNT_CONST.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        emailSuccess: false,

        forgotPasswordErrorStatus: false,
      };
    case ACCOUNT_CONST.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        emailSuccess: true,

        forgotPasswordErrorStatus: false,
      };
    case ACCOUNT_CONST.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        emailSuccess: false,

        forgotPasswordErrorStatus: action.payload.response
          ? action.payload.response.data.error.errorDescription
          : false,
      };

    // Change password
    case ACCOUNT_CONST.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isRedirect: false,
        changePasswordData: null,
        errorStatus: null,
      };
    case ACCOUNT_CONST.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isRedirect: true,
        changePasswordData: action.payload
          ? action.payload.response.data.data
          : null,
        errorStatus: !action.payload.response.data.isSuccess
          ? action.payload.response.data.error.errorDescription
          : null,
      };
    case ACCOUNT_CONST.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isRedirect: false,
        changePasswordData: null,
        errorStatus: action.payload
          ? action.payload.response.error.errorDescription
          : null,
      };

    // Registration
    case ACCOUNT_CONST.CLIENT_REGISTRATION_REQUEST:
      return {
        ...state,
        registerSuccess: false,
        registerErrorStatus: null,
      };
    case ACCOUNT_CONST.CLIENT_REGISTRATION_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
        registerErrorStatus: null,
      };
    case ACCOUNT_CONST.CLIENT_REGISTRATION_FAILURE:
      return {
        ...state,
        registerSuccess: false,
        registerErrorStatus: action.payload.response
          ? action.payload.response.error.errorDescription
          : null,
      };
    // My profile
    case ACCOUNT_CONST.MY_PROFILE_REQUEST:
      return {
        ...state,
        profileData: null,
        profileDataError: null,
      };
    case ACCOUNT_CONST.MY_PROFILE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        profileData: action.payload ? action.payload.response.data : null,
        profileDataError: null,
      };
    case ACCOUNT_CONST.MY_PROFILE_FAILURE:
      return {
        ...state,
        profileData: null,
        profileDataError: action.payload.response.data.error.errorDescription,
      };
    case ACCOUNT_CONST.GET_USER_DETAILS_REQUEST:
      return {
        ...state,
        profileData: null,
      };

    case ACCOUNT_CONST.GET_USERS_REQUEST:
      return {
        ...state,
        usersData: null,
      };
    case ACCOUNT_CONST.GET_USERS_SUCCESS:
      return {
        ...state,
        usersData: action.payload.response.data.data,
      };
    case ACCOUNT_CONST.GET_USERS_FAILURE:
      return {
        ...state,
        usersData: null,
      };

    case ACCOUNT_CONST.ADD_USER_REQUEST:
      return {
        ...state,
        isUserAdded: null,
        errorMessage: null,
      };
    case ACCOUNT_CONST.ADD_USER_SUCCESS:
      return {
        ...state,
        isUserAdded: true,
        errorMessage: null,
      };
    case ACCOUNT_CONST.ADD_USER_FAILURE:
      return {
        ...state,
        isUserAdded: false,
        errorMessage: action.payload.response.data.error.errorDescription,
      };

    case ACCOUNT_CONST.DELETE_USER_REQUEST:
      return {
        ...state,
        deleteSuccess: null,
      };
    case ACCOUNT_CONST.DELETE_USER_SUCCESS:
      return {
        ...state,
        deleteSuccess: action.payload ? true : false,
      };
    case ACCOUNT_CONST.DELETE_USER_FAILURE:
      return {
        ...state,
        deleteSuccess: null,
      };

    case ACCOUNT_CONST.UPDATE_USER_REQUEST:
      return {
        ...state,
        updateMessage: null,
        updateFailure: null,
      };
    case ACCOUNT_CONST.UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateMessage: action.payload
          ? action.payload.response.data.data
          : null,
        updateFailure: null,
      };
    case ACCOUNT_CONST.UPDATE_USER_FAILURE:
      return {
        ...state,
        updateMessage: null,
        updateFailure: action.payload.response.data.error.errorDescription,
      };

    //Get agents
    case ACCOUNT_CONST.GET_AGENTS_REQUEST:
      return {
        ...state,
        agentsData: null,
      };
    case ACCOUNT_CONST.GET_AGENTS_SUCCESS:
      return {
        ...state,
        agentsData: action.payload.response
          ? action.payload.response.data
          : null,
      };
    case ACCOUNT_CONST.GET_AGENTS_FAILURE:
      return {
        ...state,
        agentsData: null,
      };
    //Activate User
    case ACCOUNT_CONST.ACTIVATE_USER_REQUEST:
      return {
        ...state,
        activationSuccess: null,
        activationError: null,
        isRequesting: true,
      };
    case ACCOUNT_CONST.ACTIVATE_USER_SUCCESS:
      return {
        ...state,
        activationSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        activationError: null,
        isRequesting: false,
      };
    case ACCOUNT_CONST.ACTIVATE_USER_FAILURE:
      return {
        ...state,
        activationSuccess: null,
        activationError: action.payload.response.data.error.errorDescription,
        isRequesting: false,
      };

    //Deactivate user
    case ACCOUNT_CONST.DEACTIVATE_USER_REQUEST:
      return {
        ...state,
        deactivationSuccess: null,
        deactivationError: null,
      };
    case ACCOUNT_CONST.DEACTIVATE_USER_SUCCESS:
      return {
        ...state,
        deactivationSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        deactivationError: null,
      };
    case ACCOUNT_CONST.DEACTIVATE_USER_FAILURE:
      return {
        ...state,
        deactivationSuccess: null,
        deactivationError: action.payload.response.data.error.errorDescription,
      };

    // Logout user
    case ACCOUNT_CONST.LOGOUT_REQUEST:
      return {
        ...state,
        logoutSuccess: null,
        logoutError: null,
      };
    case ACCOUNT_CONST.LOGOUT_SUCCESS:
      return {
        ...state,
        logoutSuccess: action.payload.response.data.isSuccess ? true : false,
        logoutError: null,
      };
    case ACCOUNT_CONST.LOGOUT_FAILURE:
      return {
        ...state,
        logoutSuccess: null,
        logoutError: action.payload.data.error.errorDescription ? true : false,
      };

    // Logout user
    case ACCOUNT_CONST.GET_FRONT_CUSTOMERS_REQUEST:
      return {
        ...state,
        customerData: null,
        customerFail: null,
      };
    case ACCOUNT_CONST.GET_FRONT_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customerData: action.payload.response.data.data,
        customerFail: null,
      };
    case ACCOUNT_CONST.GET_FRONT_CUSTOMERS_FAILURE:
      return {
        ...state,
        customerData: null,
        customerFail: action.payload.response.data.error.errorDescription,
      };
    // unlock account
    case ACCOUNT_CONST.UNLOCK_ACCOUNT_REQUEST:
      return {
        ...state,
        unlockSuccess: null,
        unlockFail: null,
        isRequesting: true,
      };
    case ACCOUNT_CONST.UNLOCK_ACCOUNT_SUCCESS:
      return {
        ...state,
        unlockSuccess: action.payload.response.data.data,
        unlockFail: null,
        isRequesting: false,
      };
    case ACCOUNT_CONST.UNLOCK_ACCOUNT_FAILURE:
      return {
        ...state,
        unlockSuccess: null,
        unlockFail: action.payload.response.data.error.errorDescription,
        isRequesting: false,
      };
  }
  return state;
}
