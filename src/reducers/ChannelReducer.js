import { CHANNEL } from "../actions/actionTypes";
export default function reducer(
  state = {
    listDataSuccess: [],
    isAddChannelNetworkError: null,
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // create Channel
    case CHANNEL.CREATE_CHANNEL_REQUEST:
      return {
        ...state,
        addChannelData: null,
        isAddChannelDataFail: null,
      };
    case CHANNEL.CREATE_CHANNEL_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        addChannelData: action.payload.response.data.isSuccess ? true : false,
        isAddChannelDataFail: null,
      };
    case CHANNEL.CREATE_CHANNEL_FAILURE:
      return {
        ...state,
        addChannelData: null,
        isAddChannelDataFail: action.payload.response.error.errorDescription,
      };

    //delete Channel
    case CHANNEL.DELETE_CHANNEL_REQUEST:
      return {
        ...state,
        isChannelDeleteSuccess: null,
        isChannelDeleteFailure: null,
      };
    case CHANNEL.DELETE_CHANNEL_SUCCESS:
      return {
        ...state,
        // isEntityDeleteSuccess: action.payload.response.data,
        isChannelDeleteSuccess: action.payload.response.data.isSuccess
          ? true
          : false,
        isChannelDeleteFailure: null,
      };
    case CHANNEL.DELETE_CHANNEL_FAILURE:
      return {
        ...state,
        isChannelDeleteSuccess: null,
        isChannelDeleteFailure:
          action.payload.response.data.error.errorDescription,
      };

    //get list Channel
    case CHANNEL.GET_LIST_CHANNEL_REQUEST:
      return {
        ...state,
        listDataSuccess: null,
        listDataFailure: null,
      };
    case CHANNEL.GET_LIST_CHANNEL_SUCCESS:
      return {
        ...state,
        listDataSuccess: action.payload.response.data.data,
        listDataFailure: null,
      };
    case CHANNEL.GET_LIST_CHANNEL_FAILURE:
      return {
        ...state,
        listDataSuccess: null,
        listDataFailure: action.payload.response.data.error.errorDescription,
      };
  }
  return state;
}
