import { CATEGORY_CONST } from "./actionTypes";
import { AXIOS_INSTANCE, CATEGORY_API } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";
//action for get categories
export function getCategories(quryParam) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("boGRCAuthToken")),
    },
  };
  let ApiUrl = "";
  if (quryParam) {
    ApiUrl = AXIOS_INSTANCE.get(
      `${CATEGORY_API}/GetCategories${quryParam}`,
      HEADER
    );
  } else {
    ApiUrl = AXIOS_INSTANCE.get(`${CATEGORY_API}/GetCategories`, HEADER);
  }
  return (dispatch) => {
    dispatch(base.getRequest(CATEGORY_CONST.GET_CATEGORY_REQUEST));
    ApiUrl.then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CATEGORY_CONST.GET_CATEGORY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CATEGORY_CONST.GET_CATEGORY_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })
      // .catch(error => {
      //   checkHttpStatus(error.response);
      //   dispatch(
      //     base.getFailure(CATEGORY_CONST.GET_CATEGORY_FAILURE, {
      //       error: {
      //         data: error
      //       }
      //     })
      //   );
      // });
      .catch((error) => {
        dispatch(base.handleCatch(CATEGORY_CONST.GET_CATEGORY_FAILURE, error));
      });
  };
}
export function addCategory(categoryParam) {
  return (dispatch) => {
    dispatch(base.getRequest(CATEGORY_CONST.ADD_CATEGORY_REQUEST));
    AXIOS_INSTANCE.post(`${CATEGORY_API}/CreateCategory`, categoryParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CATEGORY_CONST.ADD_CATEGORY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CATEGORY_CONST.ADD_CATEGORY_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(base.handleCatch(CATEGORY_CONST.ADD_CATEGORY_FAILURE, error));
      });
  };
}
export function updateCategory(categoryParam) {
  return (dispatch) => {
    dispatch(base.getRequest(CATEGORY_CONST.UPDATE_CATEGORY_REQUEST));
    AXIOS_INSTANCE.patch(`${CATEGORY_API}/UpdateCategory`, categoryParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CATEGORY_CONST.UPDATE_CATEGORY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CATEGORY_CONST.UPDATE_CATEGORY_FAILURE, {
              response: result,
            })
          );
        }
      })
      // .catch(error => {
      //   error = checkHttpStatus(error.response);
      //   dispatch(
      //     base.getFailure(CATEGORY_CONST.UPDATE_CATEGORY_FAILURE, {
      //       error: {
      //         data: error
      //       }
      //     })
      //   );
      // });
      .catch((error) => {
        dispatch(
          base.handleCatch(CATEGORY_CONST.UPDATE_CATEGORY_FAILURE, error)
        );
      });
  };
}
export function deleteCategory(categoryIdParam) {
  return (dispatch) => {
    dispatch(base.getRequest(CATEGORY_CONST.DELETE_CATEGORY_REQUEST));
    AXIOS_INSTANCE.delete(`${CATEGORY_API}/${categoryIdParam}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CATEGORY_CONST.DELETE_CATEGORY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CATEGORY_CONST.DELETE_CATEGORY_FAILURE, {
              response: result,
            })
          );
        }
      })
      // .catch(error => {
      //   checkHttpStatus(error.response);
      //   dispatch(
      //     base.getFailure(CATEGORY_CONST.DELETE_CATEGORY_FAILURE, {
      //       error: {
      //         data: error
      //       }
      //     })
      //   );
      // });
      .catch((error) => {
        dispatch(
          base.handleCatch(CATEGORY_CONST.DELETE_CATEGORY_FAILURE, error)
        );
      });
  };
}
