import { NOTIFICATION } from "../actions/actionTypes";
export default function reducer(
  state = {
    groupsData: [],
  },
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    // create Entity

    //get entity by code
    case NOTIFICATION.GET_NOTIFICATION_BY_USER_CODE_REQUEST:
      return {
        ...state,
        notificationData: null,
      };
    case NOTIFICATION.GET_NOTIFICATION_BY_USER_CODE_SUCCESS:
      return {
        ...state,
        notificationData: action.payload.response.data
          ? action.payload.response.data.data
          : null,
      };
    case NOTIFICATION.GET_NOTIFICATION_BY_USER_CODE_FAILURE:
      return {
        ...state,
        notificationData: null,
      };

    case NOTIFICATION.MARK_NOTIFICATION_AS_SEEN_REQUEST:
      return {
        ...state,
        singleNotificationData: null,
      };
    case NOTIFICATION.MARK_NOTIFICATION_AS_SEEN_SUCCESS:
      return {
        ...state,
        singleNotificationData: action.payload.response.data.isSuccess
          ? true
          : false,
      };
    case NOTIFICATION.MARK_NOTIFICATION_AS_SEEN_FAILURE:
      return {
        ...state,
        singleNotificationData: null,
      };

    case NOTIFICATION.MARK_ALL_NOTIFICATIONS_READ_REQUEST:
      return {
        ...state,
        allNotificationData: null,
        allNotificationDataFail: null,
        isRequesting: true,
      };
    case NOTIFICATION.MARK_ALL_NOTIFICATIONS_READ_SUCCESS:
      return {
        ...state,
        allNotificationData: action.payload.response.data.data ? true : false,
        isRequesting: false,
        allNotificationDataFail: null,
      };
    case NOTIFICATION.MARK_ALL_NOTIFICATIONS_READ_FAILURE:
      return {
        ...state,
        allNotificationData: null,
        isRequesting: false,
        allNotificationDataFail: action.payload.response.error.errorDescription,
      };
  }
  return state;
}
