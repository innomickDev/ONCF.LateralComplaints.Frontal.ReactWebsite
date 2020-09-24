import { RESPONSIBILITY } from "../actions/actionTypes";
export default function reducer(
  state = {
    groupsData: [],
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // create Channel
    case RESPONSIBILITY.ADD_RESPONSIBILITY_IN_ENTITY_REQUEST:
      return {
        ...state,
        addResponsibilityData: null,
        isAddResponsibilityDataFail: null,
      };
    case RESPONSIBILITY.ADD_RESPONSIBILITY_IN_ENTITY_SUCCESS:
      return {
        ...state,
        addResponsibilityData: action.payload
          ? action.payload.response.data
          : null,
        isAddResponsibilityDataFail: null,
      };
    case RESPONSIBILITY.ADD_RESPONSIBILITY_IN_ENTITY_FAILURE:
      return {
        ...state,
        addResponsibilityData: null,
        isAddResponsibilityDataFail:
          action.payload.response.error.errorDescription,
      };

    //delete Channel
    case RESPONSIBILITY.REMOVE_RESPONSIBILITY_IN_ENTITY_REQUEST:
      return {
        ...state,
        deleteResponsibilityData: null,

        deleteResponsibilityDataFailure: null,
      };
    case RESPONSIBILITY.REMOVE_RESPONSIBILITY_IN_ENTITY_SUCCESS:
      return {
        ...state,
        // isEntityDeleteSuccess: action.payload.response.data,
        deleteResponsibilityData: action.payload.response.data.isSuccess
          ? true
          : false,

        deleteResponsibilityDataFailure: null,
      };
    case RESPONSIBILITY.REMOVE_RESPONSIBILITY_IN_ENTITY_FAILURE:
      return {
        ...state,
        deleteResponsibilityData: null,

        deleteResponsibilityDataFailure:
          action.payload.response.error.errorDescription,
      };
  }
  return state;
}
