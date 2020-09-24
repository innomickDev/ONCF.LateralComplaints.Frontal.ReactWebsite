import { CHANNEL } from "./actionTypes";
import { AXIOS_INSTANCE, CHANNEL_API, LOGIN_CONFIG } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import { canManage, permissions } from "../Pages/Helpers/utils";
import * as base from "./baseAction";

export function addChannel(roleParam) {
  return (dispatch) => {
    dispatch(base.getRequest(CHANNEL.CREATE_CHANNEL_REQUEST));
    AXIOS_INSTANCE.post(`${CHANNEL_API}/CreateChannel`, roleParam)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CHANNEL.CREATE_CHANNEL_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CHANNEL.CREATE_CHANNEL_FAILURE, {
              response: result,
            })
          );
        }
      })
      // .catch((error) => {
      //   checkHttpStatus(error.response);
      //   dispatch(
      //     base.getFailure(CHANNEL.CREATE_CHANNEL_FAILURE, {
      //       error: {
      //         data: error,
      //       },
      //     })
      //   );
      // });
      .catch((error) => {
        dispatch(base.handleCatch(CHANNEL.CREATE_CHANNEL_FAILURE, error));
      });
  };
}
// //action for get categories
// export function getListChannel(quryParam) {
//   const HEADER = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: JSON.parse(localStorage.getItem("boGRCAuthToken")),
//     },
//   };
//   let ApiUrl = "";
//   if (quryParam) {
//     ApiUrl = AXIOS_INSTANCE.get(
//       `${CHANNEL_API}/GetListChannel${quryParam}`,
//       HEADER
//     );
//   } else {
//     ApiUrl = AXIOS_INSTANCE.get(`${CHANNEL_API}/GetListChannel`, HEADER);
//   }
//   return (dispatch) => {
//     dispatch(base.getRequest(CHANNEL.GET_LIST_CHANNEL_REQUEST));
//     ApiUrl.then(checkHttpStatus)
//       .then(parseJSON)
//       .then((result) => {
//         if (result.isSuccess) {
//           dispatch(
//             base.getSuccess(CHANNEL.GET_LIST_CHANNEL_SUCCESS, {
//               response: {
//                 data: result,
//               },
//             })
//           );
//         } else {
//           dispatch(
//             base.getFailure(CHANNEL.GET_LIST_CHANNEL_FAILURE, {
//               response: {
//                 data: result,
//               },
//             })
//           );
//         }
//       })

//       .catch((error) => {
//         dispatch(base.handleCatch(CHANNEL.GET_LIST_CHANNEL_FAILURE, error));
//       });
//   };
// }
export function getListChannel(queryParams) {
  const boGRCuserDetails = JSON.parse(localStorage.getItem("boGRCuserDetails"));
  let apiPromise = "";
  return (dispatch) => {
    dispatch(base.getRequest(CHANNEL.GET_LIST_CHANNEL_REQUEST));

    if (queryParams) {
      apiPromise = AXIOS_INSTANCE.post(
        `${CHANNEL_API}/GetListChannel`,
        queryParams,
        LOGIN_CONFIG
      );
    } else {
      apiPromise = AXIOS_INSTANCE.post(
        `${CHANNEL_API}/GetListChannel`,
        LOGIN_CONFIG
      );
    }

    apiPromise
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CHANNEL.GET_LIST_CHANNEL_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CHANNEL.GET_LIST_CHANNEL_FAILURE, {
              response: {
                data: result,
              },
            })
          );
        }
      })

      .catch((error) => {
        dispatch(base.handleCatch(CHANNEL.GET_LIST_CHANNEL_FAILURE, error));
      });
  };
}

// Delete Channel
export function deleteChannel(groupIdParam) {
  return (dispatch) => {
    dispatch(base.getRequest(CHANNEL.DELETE_CHANNEL_REQUEST));
    AXIOS_INSTANCE.delete(`${CHANNEL_API}/DeleteChannel?code=${groupIdParam}`)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(CHANNEL.DELETE_CHANNEL_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(CHANNEL.DELETE_CHANNEL_FAILURE, {
              response: result,
            })
          );
        }
      })
      .catch((error) => {
        checkHttpStatus(error.response);
        dispatch(
          base.getFailure(CHANNEL.DELETE_CHANNEL_FAILURE, {
            error: {
              data: error,
            },
          })
        );
      });
  };
}
