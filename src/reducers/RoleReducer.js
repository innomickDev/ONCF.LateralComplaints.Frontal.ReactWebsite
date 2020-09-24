/* eslint-disable default-case */
import { ROLE_CONST, ACCOUNT_ROLE_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    rolesData: [],
  },
  action
) {
  switch (action.type) {
    // Add role
    case ROLE_CONST.ADD_ROLE_REQUEST:
      return {
        ...state,
        addRoleSuccess: null,
        addRoleFailure: null,
        // addRoleNetworkError: null,
      };
    case ROLE_CONST.ADD_ROLE_SUCCESS:
      return {
        ...state,
        addRoleSuccess: action.payload.response.data.isSuccess ? true : false,
        addRoleFailure: null,
        // addRoleNetworkError: null,
      };
    case ROLE_CONST.ADD_ROLE_FAILURE:
      return {
        ...state,
        addRoleSuccess: false,
        addRoleFailure: action.payload.response.error.errorDescription,
        // addRoleNetworkError: action.payload.error ? true : false,
      };

    // Delete role
    case ROLE_CONST.DELETE_ROLE_REQUEST:
      return {
        ...state,
        deleteSuccess: null,
        deleteRoleError: null,
      };
    case ROLE_CONST.DELETE_ROLE_SUCCESS:
      return {
        ...state,
        deleteSuccess: action.payload.response.data.isSuccess ? true : false,
        deleteRoleError: null,
      };
    case ROLE_CONST.DELETE_ROLE_FAILURE:
      return {
        ...state,
        deleteRoleError: action.payload.response
          ? action.payload.response.error.errorDescription
          : null,
        deleteSuccess: null,
      };

    case ROLE_CONST.GET_ROLE_BY_CODE_REQUEST:
      return {
        ...state,
      };
    case ROLE_CONST.GET_ROLE_BY_CODE_SUCCESS:
      return {
        ...state,
      };
    case ROLE_CONST.GET_ROLE_BY_CODE_FAILURE:
      return {
        ...state,
      };
    //
    case ROLE_CONST.GET_ROLES_REQUEST:
      return {
        ...state,
        rolesData: [],
        rolesDataError: null,
      };
    case ROLE_CONST.GET_ROLES_SUCCESS:
      return {
        ...state,
        rolesData: action.payload.response.data,
        rolesDataError: null,
      };
    case ROLE_CONST.GET_ROLES_FAILURE:
      return {
        ...state,
        rolesData: null,
        rolesDataError: action.payload.response.error.errorDescription,
      };
    case ROLE_CONST.ASSIGN_ROLE_REQUEST:
      return {
        ...state,
        updateRoleSuccess: null,
        updateError: null,
      };
    case ROLE_CONST.ASSIGN_ROLE_SUCCESS:
      return {
        ...state,
        updateRoleSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        updateError: null,
      };
    case ROLE_CONST.ASSIGN_ROLE_FAILURE:
      return {
        ...state,
        updateRoleSuccess: null,
        updateError: action.payload.response.error ? true : false,
      };

    case ROLE_CONST.GET_PERMISSIONS_REQUEST:
      return {
        ...state,
        getPermissionsList: null,
        getPermissionsListError: null,
      };
    case ROLE_CONST.GET_PERMISSIONS_SUCCESS:
      return {
        ...state,
        getPermissionsList: action.payload.response
          ? action.payload.response.data.data.permissions
          : null,
        getPermissionsListError: null,
      };
    case ROLE_CONST.GET_PERMISSIONS_FAILURE:
      return {
        ...state,
        getPermissionsList: null,
        getPermissionsListError: action.payload.response.error.errorDescription,
      };

    // update role
    case ROLE_CONST.UPDATE_ROLE_REQUEST:
      return {
        ...state,
        updateSuccess: null,
        isUpdateError: null,
      };
    case ROLE_CONST.UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        updateSuccess: action.payload.response.data.isSuccess ? true : false,
        isUpdateError: null,
      };
    case ROLE_CONST.UPDATE_ROLE_FAILURE:
      return {
        ...state,
        updateSuccess: null,
        isUpdateError: action.payload.response
          ? action.payload.response.error.errorDescription
          : "",
      };
  }
  return state;
}
