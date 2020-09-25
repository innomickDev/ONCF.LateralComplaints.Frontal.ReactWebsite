import { SUB_CATEGORY_CONST } from "./actionTypes";
import { AXIOS_INSTANCE, SUB_CATEGORY_API } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

//action for get all sub categories
export function getAllSubCategories(quryParam) {
  let ApiUrl = "";
  if (quryParam) {
    ApiUrl = AXIOS_INSTANCE.get(
      `${SUB_CATEGORY_API}/GetSubCategories${quryParam}`
    );
  } else {
    ApiUrl = AXIOS_INSTANCE.get(`${SUB_CATEGORY_API}/GetSubCategories`);
  }
  return (dispatch) => {
    dispatch(
      base.getRequest(SUB_CATEGORY_CONST.GET_ALL_SUB_CATEGORIES_REQUEST)
    );
    ApiUrl.then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(SUB_CATEGORY_CONST.GET_ALL_SUB_CATEGORIES_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(SUB_CATEGORY_CONST.GET_ALL_SUB_CATEGORIES_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })

      .catch((error) => {
        dispatch(
          base.handleCatch(
            SUB_CATEGORY_CONST.GET_ALL_SUB_CATEGORIES_FAILURE,
            error
          )
        );
      });
  };
}

//action for get categories
export function getSubCategories(categoryCode) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("boGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(
      base.getRequest(
        SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_CATEGORY_ID_REQUEST
      )
    );
    AXIOS_INSTANCE.get(
      `${SUB_CATEGORY_API}/GetSubCategoryByCategoryCode?categoryCode=${categoryCode}`,
      HEADER
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(
              SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_CATEGORY_ID_SUCCESS,
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
              SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_CATEGORY_ID_FAILURE,
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
            SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_CATEGORY_ID_FAILURE,
            error
          )
        );
      });
  };
}
// Add sub-category
export function addSubCategory(subCategoryParam) {
  return (dispatch) => {
    dispatch(base.getRequest(SUB_CATEGORY_CONST.ADD_SUB_CATEGORY_REQUEST));
    AXIOS_INSTANCE.post(
      `${SUB_CATEGORY_API}/CreateSubCategory`,
      subCategoryParam
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(SUB_CATEGORY_CONST.ADD_SUB_CATEGORY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(SUB_CATEGORY_CONST.ADD_SUB_CATEGORY_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })

      .catch((error) => {
        dispatch(
          base.handleCatch(SUB_CATEGORY_CONST.ADD_SUB_CATEGORY_FAILURE, error)
        );
      });
  };
}
// Update sub-category
export function updateSubCategory(subCategoryParam) {
  return (dispatch) => {
    dispatch(base.getRequest(SUB_CATEGORY_CONST.UPDATE_SUB_CATEGORY_REQUEST));
    AXIOS_INSTANCE.patch(
      `${SUB_CATEGORY_API}/UpdateSubCategory`,
      subCategoryParam
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(SUB_CATEGORY_CONST.UPDATE_SUB_CATEGORY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(SUB_CATEGORY_CONST.UPDATE_SUB_CATEGORY_FAILURE, {
              response: result,
            })
          );
        }
      })

      .catch((error) => {
        dispatch(
          base.handleCatch(
            SUB_CATEGORY_CONST.UPDATE_SUB_CATEGORY_FAILURE,
            error
          )
        );
      });
  };
}
// Delete sub-category
export function deleteSubCategory(subCategoryIdParam) {
  return (dispatch) => {
    dispatch(base.getRequest(SUB_CATEGORY_CONST.DELETE_SUB_CATEGORY_REQUEST));
    AXIOS_INSTANCE.delete(`${SUB_CATEGORY_API}/${subCategoryIdParam}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(SUB_CATEGORY_CONST.DELETE_SUB_CATEGORY_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(SUB_CATEGORY_CONST.DELETE_SUB_CATEGORY_FAILURE, {
              response: result,
            })
          );
        }
      })

      .catch((error) => {
        dispatch(
          base.handleCatch(
            SUB_CATEGORY_CONST.DELETE_SUB_CATEGORY_FAILURE,
            error
          )
        );
      });
  };
}

// get user by group id
export function getSubCategoryById(groupId) {
  return (dispatch) => {
    dispatch(
      base.getRequest(SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_ID_REQUEST)
    );
    AXIOS_INSTANCE.get(`${SUB_CATEGORY_API}/${groupId}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_ID_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_ID_FAILURE, {
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
          base.getFailure(SUB_CATEGORY_CONST.GET_SUB_CATEGORY_BY_ID_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}
