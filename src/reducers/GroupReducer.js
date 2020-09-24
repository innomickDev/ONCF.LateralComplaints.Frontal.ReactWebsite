import { GROUPS_CONST } from "../actions/actionTypes";
export default function reducer(
  state = {
    groupsData: [],
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // get-group
    case GROUPS_CONST.GET_GROUPS_REQUEST:
      return {
        ...state,
        groupsData: null,
        groupsDataFail: null,
      };
    case GROUPS_CONST.GET_GROUPS_SUCCESS:
      return {
        ...state,
        groupsData: action.payload ? action.payload.response.data : null,
        groupsDataFail: null,
      };
    case GROUPS_CONST.GET_GROUPS_FAILURE:
      return {
        ...state,
        groupsData: null,
        groupsDataFail: action.payload.response.data.error.errorDescription,
      };

    // add group
    case GROUPS_CONST.ADD_GROUP_REQUEST:
      return {
        ...state,
        addGroupSuccess: null,
        isAddFailure: null,
      };
    case GROUPS_CONST.ADD_GROUP_SUCCESS:
      return {
        ...state,
        addGroupSuccess: action.payload.response.data.isSuccess ? true : false,
        isAddFailure: null,
      };
    case GROUPS_CONST.ADD_GROUP_FAILURE:
      return {
        ...state,
        addGroupSuccess: null,
        isAddFailure: action.payload.response.error.errorDescription,
      };

    //update group
    case GROUPS_CONST.UPDATE_GROUP_REQUEST:
      return {
        ...state,
        isUpdateSuccess: null,
        isUpdateError: null,
      };
    case GROUPS_CONST.UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        isUpdateSuccess: action.payload.response.data.isSuccess ? true : false,
        isUpdateError: null,
      };
    case GROUPS_CONST.UPDATE_GROUP_FAILURE:
      return {
        ...state,
        isUpdateSuccess: null,
        isUpdateError: action.payload.response.error.errorDescription,
      };

    //delete group
    case GROUPS_CONST.DELETE_GROUP_REQUEST:
      return {
        ...state,
        isDeleteSuccess: null,
        isDeleteFailure: null,
      };
    case GROUPS_CONST.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        isDeleteSuccess: action.payload.response.data.isSuccess ? true : false,
        isDeleteFailure: null,
      };
    case GROUPS_CONST.DELETE_GROUP_FAILURE:
      return {
        ...state,
        isDeleteSuccess: null,
        isDeleteFailure: action.payload.response.error.errorDescription,
      };

    // add user in group
    case GROUPS_CONST.ADD_USER_IN_GROUP_REQUEST:
      return {
        ...state,
        isAddUserGroupSuccess: null,
        isAddUserGroupFailure: null,
      };
    case GROUPS_CONST.ADD_USER_IN_GROUP_SUCCESS:
      return {
        ...state,
        isAddUserGroupSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isAddUserGroupFailure: null,
      };
    case GROUPS_CONST.ADD_USER_IN_GROUP_FAILURE:
      return {
        ...state,
        isAddUserGroupSuccess: null,
        isAddUserGroupFailure: action.payload.response.error.errorDescription,
      };

    // add user in group
    case GROUPS_CONST.GET_USERS_BY_GROUP_ID_REQUEST:
      return {
        ...state,
        userInGroup: null,
      };
    case GROUPS_CONST.GET_USERS_BY_GROUP_ID_SUCCESS:
      return {
        ...state,
        userInGroup: action.payload.response.data,
      };
    case GROUPS_CONST.GET_USERS_BY_GROUP_ID_FAILURE:
      return {
        ...state,
      };

    // delete user in group
    case GROUPS_CONST.DELETE_USER_IN_GROUP_REQUEST:
      return {
        ...state,
        isDeleteUserGroupSuccess: null,
        isDeleteUserGroupFailure: null,
      };
    case GROUPS_CONST.DELETE_USER_IN_GROUP_SUCCESS:
      return {
        ...state,
        isDeleteUserGroupSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isDeleteUserGroupFailure: null,
      };
    case GROUPS_CONST.DELETE_USER_IN_GROUP_FAILURE:
      return {
        ...state,
        isDeleteUserGroupSuccess: null,
        isDeleteUserGroupFailure:
          action.payload.response.error.errorDescription,
      };
  }
  return state;
}
