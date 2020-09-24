import { RESPONSIBILITY } from "./actionTypes";
import { AXIOS_INSTANCE, RESPONSIBILITY_API, CONFIG } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

export function AddResponsabilityInEntity(roleParam) {
  return (dispatch) => {
    dispatch(
      base.getRequest(RESPONSIBILITY.ADD_RESPONSIBILITY_IN_ENTITY_REQUEST)
    );
    AXIOS_INSTANCE.post(
      `${RESPONSIBILITY_API}/AddResponsabilityInEntity`,
      roleParam
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(
              RESPONSIBILITY.ADD_RESPONSIBILITY_IN_ENTITY_SUCCESS,
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
              RESPONSIBILITY.ADD_RESPONSIBILITY_IN_ENTITY_FAILURE,
              {
                response: result,
              }
            )
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(RESPONSIBILITY.ADD_RESPONSIBILITY_IN_ENTITY_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}

// Remove Responsability In Entity
export function RemoveResponsabilityInEntity(groupIdParam) {
  return (dispatch) => {
    dispatch(
      base.getRequest(RESPONSIBILITY.REMOVE_RESPONSIBILITY_IN_ENTITY_REQUEST)
    );
    AXIOS_INSTANCE.delete(
      `${RESPONSIBILITY_API}/RemoveResponsabilityInEntity?entityCode=${groupIdParam.entityCode}&subCategoryCode=${groupIdParam.userCode}`
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(
              RESPONSIBILITY.REMOVE_RESPONSIBILITY_IN_ENTITY_SUCCESS,
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
              RESPONSIBILITY.REMOVE_RESPONSIBILITY_IN_ENTITY_FAILURE,
              {
                response: result,
              }
            )
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(
            RESPONSIBILITY.REMOVE_RESPONSIBILITY_IN_ENTITY_FAILURE,
            {
              error: {
                data: error,
              },
            }
          )
        );
      });
  };
}
