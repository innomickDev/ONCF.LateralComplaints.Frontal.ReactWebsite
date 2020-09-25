import { SUB_SUB_CATEGORIES_CONST } from "./actionTypes";
import { AXIOS_INSTANCE, SUB_SUB_CATEGORY_API } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

//action for get all sub categories
export function getAllSubSubCategories(quryParam) {
  let ApiUrl = "";
  if (quryParam) {
    ApiUrl = AXIOS_INSTANCE.get(
      `${SUB_SUB_CATEGORY_API}/GetSubSubCategories${quryParam}`
    );
  } else {
    ApiUrl = AXIOS_INSTANCE.get(`${SUB_SUB_CATEGORY_API}/GetSubSubCategories`);
  }
  return (dispatch) => {
    dispatch(
      base.getRequest(
        SUB_SUB_CATEGORIES_CONST.GET_ALL_SUB_SUB_CATEGORIES_REQUEST
      )
    );
    ApiUrl.then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(
              SUB_SUB_CATEGORIES_CONST.GET_ALL_SUB_SUB_CATEGORIES_SUCCESS,
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
              SUB_SUB_CATEGORIES_CONST.GET_ALL_SUB_SUB_CATEGORIES_FAILURE,
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
            SUB_SUB_CATEGORIES_CONST.GET_ALL_SUB_SUB_CATEGORIES_FAILURE,
            error
          )
        );
      });
  };
}
//action for get categories
export function getSubSubCategories(subCategoryCode, formValue) {
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem("boGRCAuthToken")),
    },
  };
  return (dispatch) => {
    dispatch(
      base.getRequest(
        SUB_SUB_CATEGORIES_CONST.GET_SUB_SUB_CATEGORY_BY_SUB_CATEGORY_ID_REQUEST
      )
    );
    AXIOS_INSTANCE.get(
      `${SUB_SUB_CATEGORY_API}/GetSubSubCategoryBySubCategoryCode?subCategoryCode=${subCategoryCode}`,
      HEADER
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(
              SUB_SUB_CATEGORIES_CONST.GET_SUB_SUB_CATEGORY_BY_SUB_CATEGORY_ID_SUCCESS,
              {
                response: {
                  data: result,
                  formValue: formValue,
                },
              }
            )
          );
        } else {
          dispatch(
            base.getFailure(
              SUB_SUB_CATEGORIES_CONST.GET_SUB_SUB_CATEGORY_BY_SUB_CATEGORY_ID_FAILURE,
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
            SUB_SUB_CATEGORIES_CONST.GET_SUB_SUB_CATEGORY_BY_SUB_CATEGORY_ID_FAILURE,
            error
          )
        );
      });
  };
}
export function addSubSubCategory(subSubCategoryParam) {
  return (dispatch) => {
    dispatch(
      base.getRequest(SUB_SUB_CATEGORIES_CONST.ADD_SUB_SUB_CATEGORY_REQUEST)
    );
    AXIOS_INSTANCE.post(
      `${SUB_SUB_CATEGORY_API}/CreateSubSubCategory`,
      subSubCategoryParam
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(
              SUB_SUB_CATEGORIES_CONST.ADD_SUB_SUB_CATEGORY_SUCCESS,
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
              SUB_SUB_CATEGORIES_CONST.ADD_SUB_SUB_CATEGORY_FAILURE,
              {
                response: result,
              }
            )
          );
        }
      })

      .catch((error) => {
        dispatch(
          base.handleCatch(
            SUB_SUB_CATEGORIES_CONST.ADD_SUB_SUB_CATEGORY_FAILURE,
            error
          )
        );
      });
  };
}
export function updateSubSubCategory(categoryParam) {
  return (dispatch) => {
    dispatch(
      base.getRequest(SUB_SUB_CATEGORIES_CONST.UPDATE_SUB_SUB_CATEGORY_REQUEST)
    );
    AXIOS_INSTANCE.patch(
      `${SUB_SUB_CATEGORY_API}/UpdateSubSubCategory`,
      categoryParam
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(
              SUB_SUB_CATEGORIES_CONST.UPDATE_SUB_SUB_CATEGORY_SUCCESS,
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
              SUB_SUB_CATEGORIES_CONST.UPDATE_SUB_SUB_CATEGORY_FAILURE,
              {
                response: result,
              }
            )
          );
        }
      })

      .catch((error) => {
        dispatch(
          base.handleCatch(
            SUB_SUB_CATEGORIES_CONST.UPDATE_SUB_SUB_CATEGORY_FAILURE,
            error
          )
        );
      });
  };
}
export function deleteSubSubCategory(categoryIdParam) {
  return (dispatch) => {
    dispatch(
      base.getRequest(SUB_SUB_CATEGORIES_CONST.DELETE_SUB_SUB_CATEGORY_REQUEST)
    );
    AXIOS_INSTANCE.delete(`${SUB_SUB_CATEGORY_API}/${categoryIdParam}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(
              SUB_SUB_CATEGORIES_CONST.DELETE_SUB_SUB_CATEGORY_SUCCESS,
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
              SUB_SUB_CATEGORIES_CONST.DELETE_SUB_SUB_CATEGORY_FAILURE,
              {
                response: result,
              }
            )
          );
        }
      })

      .catch((error) => {
        dispatch(
          base.handleCatch(
            SUB_SUB_CATEGORIES_CONST.DELETE_SUB_SUB_CATEGORY_FAILURE,
            error
          )
        );
      });
  };
}
