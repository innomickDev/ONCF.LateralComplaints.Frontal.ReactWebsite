import { NOTIFICATION } from "./actionTypes";
import { AXIOS_INSTANCE, NOTIFICATION_API, LOGIN_CONFIG } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import { canManage, permissions } from "../Pages/Helpers/utils";
import * as base from "./baseAction";

// Get Notification By user code
export function getNotificationByUserCode() {
  return (dispatch) => {
    dispatch(
      base.getRequest(NOTIFICATION.GET_NOTIFICATION_BY_USER_CODE_REQUEST)
    );
    AXIOS_INSTANCE.get(`${NOTIFICATION_API}/GetNotificationsByUserCode`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        dispatch(
          base.getSuccess(NOTIFICATION.GET_NOTIFICATION_BY_USER_CODE_SUCCESS, {
            response: {
              data: result,
            },
          })
        );
      })
      .catch((error) => {
        dispatch(
          base.getFailure(NOTIFICATION.GET_NOTIFICATION_BY_USER_CODE_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

export function markNotificationAsSeen(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(NOTIFICATION.MARK_NOTIFICATION_AS_SEEN_REQUEST));
    AXIOS_INSTANCE.post(
      `${NOTIFICATION_API}/MarkNotificatitonAsSeen`,
      roleParam
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(NOTIFICATION.MARK_NOTIFICATION_AS_SEEN_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(NOTIFICATION.MARK_NOTIFICATION_AS_SEEN_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(NOTIFICATION.MARK_NOTIFICATION_AS_SEEN_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

export function markAllNotificationAsRead(groupId) {
  return (dispatch) => {
    dispatch(base.getRequest(NOTIFICATION.MARK_ALL_NOTIFICATIONS_READ_REQUEST));
    AXIOS_INSTANCE.get(`${NOTIFICATION_API}/MarkAllNotificationAsRead`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(NOTIFICATION.MARK_ALL_NOTIFICATIONS_READ_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(NOTIFICATION.MARK_ALL_NOTIFICATIONS_READ_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(NOTIFICATION.MARK_ALL_NOTIFICATIONS_READ_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}
