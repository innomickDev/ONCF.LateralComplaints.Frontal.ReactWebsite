import { PROFILE } from "../actions/actionTypes";
export default function reducer(
  state = {
    groupsData: [],
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // create Profile
    case PROFILE.CREATE_PROFILE_REQUEST:
      return {
        ...state,
        addProfileData: null,
        isAddProfileDataFail: null,
        addProfileNetworkError: null,
      };
    case PROFILE.CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        addProfileData: action.payload.response.data.isSuccess ? true : false,
        isAddProfileDataFail: null,
        addProfileNetworkError: null,
      };
    case PROFILE.CREATE_PROFILE_FAILURE:
      return {
        ...state,
        addProfileData: null,
        isAddProfileDataFail: action.payload.response.error.errorDescription,
        addProfileNetworkError: action.payload.error ? true : false,
      };

    //update profile
    case PROFILE.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isUpdateProfileSuccess: null,
        isUpdateProfileError: null,
      };
    case PROFILE.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isUpdateProfileSuccess: action.payload.response.data ? true : false,
        isUpdateProfileError: null,
      };
    case PROFILE.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isUpdateProfileSuccess: null,
        isUpdateProfileError: action.payload.error.data ? true : false,
      };

    //delete profile
    case PROFILE.DELETE_PROFILE_REQUEST:
      return {
        ...state,
        isProfileDeleteSuccess: null,
        isProfileDeleteFailure: null,
      };
    case PROFILE.DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        isProfileDeleteSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isProfileDeleteFailure: null,
      };
    case PROFILE.DELETE_PROFILE_FAILURE:
      return {
        ...state,
        isProfileDeleteSuccess: null,
        isProfileDeleteFailure: action.payload.error.data ? true : false,
      };

    //get list profile
    case PROFILE.GET_LIST_PROFILE_REQUEST:
      return {
        ...state,
        listDataSuccess: null,
        listDataFailure: null,
      };
    case PROFILE.GET_LIST_PROFILE_SUCCESS:
      return {
        ...state,
        listDataSuccess: action.payload.response.data,
        listDataFailure: null,
      };
    case PROFILE.GET_LIST_PROFILE_FAILURE:
      return {
        ...state,
        listDataSuccess: null,
        listDataFailure: action.payload.response.error.errorDescription,
      };

    //get profile by code
    case PROFILE.GET_PROFILE_BY_CODE_REQUEST:
      return {
        ...state,
        isDeleteSuccess: null,
        isDeleteFailure: null,
      };
    case PROFILE.GET_PROFILE_BY_CODE_SUCCESS:
      return {
        ...state,
        isDeleteSuccess: action.payload.response.data.isSuccess ? true : false,
        isDeleteFailure: null,
      };
    case PROFILE.GET_PROFILE_BY_CODE_FAILURE:
      return {
        ...state,
        isDeleteSuccess: null,
        isDeleteFailure: action.payload.response.error.errorDescription,
      };
    //get list permission
    case PROFILE.GET_LIST_PERMISSION_REQUEST:
      return {
        ...state,
        getProfilePermissionsList: null,
        getProfilePermissionsError: null,
      };
    case PROFILE.GET_LIST_PERMISSION_SUCCESS:
      return {
        ...state,
        getProfilePermissionsList: action.payload.response
          ? action.payload.response.data.data.permissions
          : null,
        getProfilePermissionsError: null,
      };
    case PROFILE.GET_LIST_PERMISSION_FAILURE:
      return {
        ...state,
        getProfilePermissionsList: null,
        getProfilePermissionsError:
          action.payload.response.error.errorDescription,
      };

    // update Assign Profile to user
    case PROFILE.UPDATE_ASSIGN_PROFILE_TO_USER_REQUEST:
      return {
        ...state,
        updateProfileSuccess: null,
        updateProfileFailure: null,
      };
    case PROFILE.UPDATE_ASSIGN_PROFILE_TO_USER_SUCCESS:
      return {
        ...state,
        updateProfileSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        updateProfileFailure: null,
      };
    case PROFILE.UPDATE_ASSIGN_PROFILE_TO_USER_FAILURE:
      return {
        ...state,
        updateProfileSuccess: null,
        updateProfileFailure: action.payload.response.error ? true : false,
      };
  }
  return state;
}
