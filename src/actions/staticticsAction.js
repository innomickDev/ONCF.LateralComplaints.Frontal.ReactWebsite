import { STATISTICS_CONST } from "./actionTypes";
import { AXIOS_INSTANCE, STATISTICS_API } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

// Users statistics
export function getUsersStatistics() {
  return dispatch => {
    dispatch(base.getRequest(STATISTICS_CONST.GET_USERS_STATISTICS_REQUEST));
    AXIOS_INSTANCE.get(`${STATISTICS_API}/GetUsersStatistics`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(result => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(STATISTICS_CONST.GET_USERS_STATISTICS_SUCCESS, {
              response: {
                data: result
              }
            })
          );
        } else {
          dispatch(
            base.getFailure(STATISTICS_CONST.GET_USERS_STATISTICS_FAILURE, {
              response: {
                data: result
              }
            })
          );
        }
      })

      .catch(error => {
        dispatch(
          base.handleCatch(STATISTICS_CONST.GET_USERS_STATISTICS_FAILURE, error)
        );
      });
  };
}

// Claims statistics
export function GetClaimStatistics() {
  return dispatch => {
    dispatch(base.getRequest(STATISTICS_CONST.GET_CLAIM_STATISTICS_REQUEST));
    AXIOS_INSTANCE.get(`${STATISTICS_API}/GetClaimStatistics`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(result => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(STATISTICS_CONST.GET_CLAIM_STATISTICS_SUCCESS, {
              response: {
                data: result
              }
            })
          );
        } else {
          dispatch(
            base.getFailure(STATISTICS_CONST.GET_CLAIM_STATISTICS_FAILURE, {
              response: {
                data: result
              }
            })
          );
        }
      })

      .catch(error => {
        dispatch(
          base.handleCatch(STATISTICS_CONST.GET_CLAIM_STATISTICS_FAILURE, error)
        );
      });
  };
}

// Claims statistics
export function getClaimStatisticsReport() {
    return (dispatch) => {
        dispatch(
            base.getRequest(STATISTICS_CONST.GET_CLAIM_STATISTICS_REPORT_REQUEST)
        );
        AXIOS_INSTANCE.get(`${STATISTICS_API}/GetClaimStatisticsReport`)
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((result) => {
                if (result.isSuccess) {
                    dispatch(
                        base.getSuccess(
                            STATISTICS_CONST.GET_CLAIM_STATISTICS_REPORT_SUCCESS,
                            {
                                response: {
                                    data: result,
                                },
                            }
                        )
                    );
                } else {
                    dispatch(
                        base.getFailure(
                            STATISTICS_CONST.GET_CLAIM_STATISTICS_REPORT_FAILURE,
                            {
                                response: {
                                    data: result,
                                },
                            }
                        )
                    );
                }
            })

            .catch((error) => {
                dispatch(
                    base.handleCatch(
                        STATISTICS_CONST.GET_CLAIM_STATISTICS_REPORT_FAILURE,
                        error
                    )
                );
            });
    };
}

// Users statistics
export function getUsersStatisticsReport() {
    return (dispatch) => {
        dispatch(
            base.getRequest(STATISTICS_CONST.GET_USERS_STATISTICS_REPORT_REQUEST)
        );
        AXIOS_INSTANCE.get(`${STATISTICS_API}/GetUsersStatisticsReport`)
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((result) => {
                if (result.isSuccess) {
                    dispatch(
                        base.getSuccess(
                            STATISTICS_CONST.GET_USERS_STATISTICS_REPORT_SUCCESS,
                            {
                                response: {
                                    data: result,
                                },
                            }
                        )
                    );
                } else {
                    dispatch(
                        base.getFailure(
                            STATISTICS_CONST.GET_USERS_STATISTICS_REPORT_FAILURE,
                            {
                                response: {
                                    data: result,
                                },
                            }
                        )
                    );
                }
            })

            .catch((error) => {
                dispatch(
                    base.handleCatch(
                        STATISTICS_CONST.GET_USERS_STATISTICS_REPORT_FAILURE,
                        error
                    )
                );
            });
    };
}

