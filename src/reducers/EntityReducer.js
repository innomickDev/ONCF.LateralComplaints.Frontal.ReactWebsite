import { ENTITY } from "../actions/actionTypes";
export default function reducer(
  state = {
    groupsData: [],
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // create Entity
    case ENTITY.CREATE_ENTITY_REQUEST:
      return {
        ...state,
        addEntityData: null,
        isAddEntityDataFail: null,
      };
    case ENTITY.CREATE_ENTITY_SUCCESS:
      return {
        ...state,
        addEntityData: action.payload ? action.payload.response.data : null,
        isAddEntityDataFail: null,
      };
    case ENTITY.CREATE_ENTITY_FAILURE:
      return {
        ...state,
        addEntityData: null,
        isAddEntityDataFail: action.payload.response.error.errorDescription,
      };

    //update entity
    case ENTITY.UPDATE_ENTITY_REQUEST:
      return {
        ...state,
        isUpdateEntitySuccess: null,
        isUpdateEntityError: null,
      };
    case ENTITY.UPDATE_ENTITY_SUCCESS:
      return {
        ...state,
        isUpdateEntitySuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isUpdateEntityError: null,
      };
    case ENTITY.UPDATE_ENTITY_FAILURE:
      return {
        ...state,
        isUpdateEntitySuccess: null,
        isUpdateEntityError: action.payload.error.data ? true : false,
      };

    //delete entity
    case ENTITY.DELETE_ENTITY_REQUEST:
      return {
        ...state,
        isEntityDeleteSuccess: null,
        isEntityDeleteFailure: null,
      };
    case ENTITY.DELETE_ENTITY_SUCCESS:
      return {
        ...state,

        isEntityDeleteSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isEntityDeleteFailure: null,
      };
    case ENTITY.DELETE_ENTITY_FAILURE:
      return {
        ...state,
        isEntityDeleteSuccess: null,
        isEntityDeleteFailure: action.payload.error.data ? true : false,
      };

    //get list entity
    case ENTITY.GET_LIST_ENTITY_REQUEST:
      return {
        ...state,
        listDataSuccess: null,
        listDataFailure: null,
        isLoading: true,
      };
    case ENTITY.GET_LIST_ENTITY_SUCCESS:
      return {
        ...state,
        listDataSuccess: action.payload ? action.payload.response.data : null,
        listDataFailure: null,
        isLoading: false,
      };
    case ENTITY.GET_LIST_ENTITY_FAILURE:
      return {
        ...state,
        listDataSuccess: null,
        listDataFailure: action.payload.response.error.errorDescription,
        isLoading: false,
      };

    //get entity by code
    case ENTITY.GET_ENTITY_BY_CODE_REQUEST:
      return {
        ...state,
        isEntityCodeSuccess: null,
      };
    case ENTITY.GET_ENTITY_BY_CODE_SUCCESS:
      return {
        ...state,
        isEntityCodeSuccess: action.payload.response.data,
      };
    case ENTITY.GET_ENTITY_BY_CODE_FAILURE:
      return {
        ...state,
        isEntityCodeSuccess: null,
      };

    // add user in entity
    case ENTITY.ADD_USER_IN_ENTITY_REQUEST:
      return {
        ...state,
        isAddUserEntitySuccess: null,
        isAddUserEntityFailure: null,
      };
    case ENTITY.ADD_USER_IN_ENTITY_SUCCESS:
      return {
        ...state,
        isAddUserEntitySuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isAddUserEntityFailure: null,
      };
    case ENTITY.ADD_USER_IN_ENTITY_FAILURE:
      return {
        ...state,
        isAddUserEntitySuccess: null,
        isAddUserEntityFailure: action.payload.response.error.errorDescription,
      };

    // remove user in entity
    case ENTITY.REMOVE_USER_IN_ENTITY_REQUEST:
      return {
        ...state,
        isDeleteUserEntitySuccess: null,
        isDeleteUserEntityFailure: null,
      };
    case ENTITY.REMOVE_USER_IN_ENTITY_SUCCESS:
      return {
        ...state,
        isDeleteUserEntitySuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isDeleteUserEntityFailure: null,
      };
    case ENTITY.REMOVE_USER_IN_ENTITY_FAILURE:
      return {
        ...state,
        isDeleteUserEntitySuccess: null,
        isDeleteUserEntityFailure:
          action.payload.response.error.errorDescription,
      };

    // remove user in entity
    case ENTITY.GET_LIST_ENTITY_BY_RESPONSIBILITY_REQUEST:
      return {
        ...state,
        isEntityResponsibilitySuccess: null,
        isEntityResponsibilityFailure: null,
      };
    case ENTITY.GET_LIST_ENTITY_BY_RESPONSIBILITY_SUCCESS:
      return {
        ...state,
        isEntityResponsibilitySuccess: action.payload
          ? action.payload.response.data
          : null,
        isEntityResponsibilityFailure: null,
      };
    case ENTITY.GET_LIST_ENTITY_BY_RESPONSIBILITY_FAILURE:
      return {
        ...state,
        isEntityResponsibilitySuccess: null,
        isEntityResponsibilityFailure:
          action.payload.response.error.errorDescription,
      };
  }
  return state;
}
