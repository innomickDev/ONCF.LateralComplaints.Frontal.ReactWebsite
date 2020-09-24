import { EMAIL_TEMPLATE_CONST } from "../actions/actionTypes";
export default function reducer(state = {}, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case EMAIL_TEMPLATE_CONST.GET_EMAIL_TEMPLATE_REQUEST:
      return {
        ...state,
        emailData: null,
        emailError: null,
      };
    case EMAIL_TEMPLATE_CONST.GET_EMAIL_TEMPLATE_SUCCESS:
      return {
        ...state,
        emailData: action.payload.response
          ? action.payload.response.data.data
          : null,
        emailError: null,
      };
    case EMAIL_TEMPLATE_CONST.GET_EMAIL_TEMPLATE_FAILURE:
      return {
        ...state,
        emailData: null,
        emailError: action.payload.response.error.errorDescription,
      };
    // Update
    case EMAIL_TEMPLATE_CONST.UPDATE_EMAIL_TEMPLATE_BY_ID_REQUEST:
      return {
        ...state,
        updateEmailData: null,
        updateEmailError: null,
      };
    case EMAIL_TEMPLATE_CONST.UPDATE_EMAIL_TEMPLATE_BY_ID_SUCCESS:
      return {
        ...state,
        updateEmailData: action.payload.response.data.isSuccess ? true : false,
        updateEmailError: null,
      };
    case EMAIL_TEMPLATE_CONST.UPDATE_EMAIL_TEMPLATE_BY_ID_FAILURE:
      return {
        ...state,
        updateEmailData: null,
        updateEmailError: action.payload.response.error.errorDescription,
      };

    case EMAIL_TEMPLATE_CONST.GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_REQUEST:
      return {
        ...state,
        customizedEmailData: null,
        customizedEmailError: null,
      };
    case EMAIL_TEMPLATE_CONST.GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_SUCCESS:
      return {
        ...state,
        customizedEmailData: action.payload.response
          ? action.payload.response.data.data
          : null,
        customizedEmailError: null,
      };
    case EMAIL_TEMPLATE_CONST.GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_FAILURE:
      return {
        ...state,
        customizedEmailData: null,
        customizedEmailError: action.payload.response.error.errorDescription,
      };
  }
  return state;
}
