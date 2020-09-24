import { EMAIL_TEMPLATE_CONST } from "./actionTypes";
import { AXIOS_INSTANCE, EMAIL_TEMPLATE_API, CONFIG } from "./apiEndPoints";
import { checkHttpStatus, parseJSON } from "../utils";
import * as base from "./baseAction";

//action for get all sub categories
export function getEmailTemplates(quryParam) {
  let ApiUrl = "";
  if (quryParam) {
    ApiUrl = AXIOS_INSTANCE.post(
      `${EMAIL_TEMPLATE_API}/GetEmailTemplates`,
      quryParam,
      CONFIG
    );
  } else {
    ApiUrl = AXIOS_INSTANCE.post(
      `${EMAIL_TEMPLATE_API}/GetEmailTemplates`,
      CONFIG
    );
  }
  return (dispatch) => {
    dispatch(base.getRequest(EMAIL_TEMPLATE_CONST.GET_EMAIL_TEMPLATE_REQUEST));
    ApiUrl.then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(EMAIL_TEMPLATE_CONST.GET_EMAIL_TEMPLATE_SUCCESS, {
              response: {
                data: result,
              },
            })
          );
        } else {
          dispatch(
            base.getFailure(EMAIL_TEMPLATE_CONST.GET_EMAIL_TEMPLATE_FAILURE, {
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
            EMAIL_TEMPLATE_CONST.GET_EMAIL_TEMPLATE_FAILURE,
            error
          )
        );
      });
  };
}

// update Group
export function updateEmailTemplate(formData) {
  return (dispatch) => {
    dispatch(
      base.getRequest(EMAIL_TEMPLATE_CONST.UPDATE_EMAIL_TEMPLATE_BY_ID_REQUEST)
    );
    AXIOS_INSTANCE.patch(
      `${EMAIL_TEMPLATE_API}/UpdateEmailTemplateByCode`,
      formData
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result) {
          dispatch(
            base.getSuccess(
              EMAIL_TEMPLATE_CONST.UPDATE_EMAIL_TEMPLATE_BY_ID_SUCCESS,
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
              EMAIL_TEMPLATE_CONST.UPDATE_EMAIL_TEMPLATE_BY_ID_FAILURE,
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
            EMAIL_TEMPLATE_CONST.UPDATE_EMAIL_TEMPLATE_BY_ID_FAILURE,
            error
          )
        );
      });
  };
}

// Customized response
export function getCustomizedApprovedClaim(responseData) {
  return (dispatch) => {
    dispatch(
      base.getRequest(
        EMAIL_TEMPLATE_CONST.GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_REQUEST
      )
    );
    AXIOS_INSTANCE.post(
      `${EMAIL_TEMPLATE_API}/GetCustomizedApprovedClaimEmail`,
      responseData
    )
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((result) => {
        if (result.isSuccess) {
          dispatch(
            base.getSuccess(
              EMAIL_TEMPLATE_CONST.GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_SUCCESS,
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
              EMAIL_TEMPLATE_CONST.GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_FAILURE,
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
            EMAIL_TEMPLATE_CONST.GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_FAILURE,
            error
          )
        );
      });
  };
}

// export function getCustomizedApprovedClaim(roleParam) {
//   return (dispatch) => {
//     dispatch(
//       base.getRequest(
//         EMAIL_TEMPLATE_CONST.GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_REQUEST
//       )
//     );
//     AXIOS_INSTANCE.post(
//       `${EMAIL_TEMPLATE_API}/GetCustomizedApprovedClaimEmail`,
//       roleParam
//     )
//       .then(checkHttpStatus)
//       .then(parseJSON)
//       .then((result) => {
//         if (result.isSuccess) {
//           dispatch(
//             base.getSuccess(
//               EMAIL_TEMPLATE_CONST.GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_SUCCESS,
//               {
//                 response: {
//                   data: result,
//                 },
//               }
//             )
//           );
//         } else {
//           dispatch(
//             base.getFailure(
//               EMAIL_TEMPLATE_CONST.GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_FAILURE,
//               {
//                 response: result,
//               }
//             )
//           );
//         }
//       })
//       .catch((error) => {
//         checkHttpStatus(error.response);
//         dispatch(
//           base.getFailure(
//             EMAIL_TEMPLATE_CONST.GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_FAILURE,
//             {
//               error: {
//                 data: error,
//               },
//             }
//           )
//         );
//       });
//   };
// }
