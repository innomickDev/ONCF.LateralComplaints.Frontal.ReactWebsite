/**
 * @constants
 * @description  : Hold CONSTANTS and APIs.
 * @Created by   : Algo Consulting Group.
 */

export const AUTH_CONST = {
  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",
  REGISTER_RESET: "REGISTER_RESET",
  TOKEN_SUCCESS: "TOKEN_SUCCESS",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",

  LOGOUT: "LOGOUT",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",

  FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST",
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAILURE: "FORGOT_PASSWORD_FAILURE",

  RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILURE: "RESET_PASSWORD_FAILURE",
  LOGIN_REQUEST_RESET: "LOGIN_REQUEST_RESET",

  GET_HOME_CONTENT_REQUEST: "GET_HOME_CONTENT_REQUEST",
  GET_HOME_CONTENT_SUCCESS: "GET_HOME_CONTENT_SUCCESS",
  GET_HOME_CONTENT_FAILURE: "GET_HOME_CONTENT_FAILURE",

  CHANGE_PASSWORD_REQUEST: "CHANGE_PASSWORD_REQUEST",
  CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_FAILURE: "CHANGE_PASSWORD_FAILURE",
  CHANGE_PASSWORD_RESET: "CHANGE_PASSWORD_RESET",

  STATUS_UPDATE: "STATUS_UPDATE",
};

export const ACCOUNT_CONST = {
  // Logout
  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILURE: "LOGOUT_FAILURE",
  // Forgot password
  FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST",
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAILURE: "FORGOT_PASSWORD_FAILURE",
  // For change password
  CHANGE_PASSWORD_REQUEST: "CHANGE_PASSWORD_REQUEST",
  CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_FAILURE: "CHANGE_PASSWORD_FAILURE",
  // For registration
  CLIENT_REGISTRATION_REQUEST: "CLIENT_REGISTRATION_REQUEST",
  CLIENT_REGISTRATION_SUCCESS: "CLIENT_REGISTRATION_SUCCESS",
  CLIENT_REGISTRATION_FAILURE: "CLIENT_REGISTRATION_FAILURE",
  // For my profile
  MY_PROFILE_REQUEST: "MY_PROFILE_REQUEST",
  MY_PROFILE_SUCCESS: "MY_PROFILE_SUCCESS",
  MY_PROFILE_FAILURE: "MY_PROFILE_FAILURE",
  //confirm forgotten code
  CONFIRM_FORGOTTEN_CODE_REQUEST: "CONFIRM_FORGOTTEN_CODE_REQUEST",
  CONFIRM_FORGOTTEN_CODE_SUCCESS: "CONFIRM_FORGOTTEN_CODE_SUCCESS",
  CONFIRM_FORGOTTEN_CODE_FAILURE: "CONFIRM_FORGOTTEN_CODE_FAILURE",

  //delete user types
  DELETE_USER_REQUEST: "DELETE_USER_REQUEST",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILURE: "DELETE_USER_FAILURE",

  GET_USER_DETAILS_FAILURE: "GET_USER_DETAILS_FAILURE",
  GET_USER_DETAILS_SUCCESS: "GET_USER_DETAILS_SUCCESS",
  GET_USER_DETAILS_REQUEST: "GET_USER_DETAILS_REQUEST",
  // add user action types
  ADD_USER_REQUEST: "ADD_USER_REQUEST",
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  ADD_USER_FAILURE: "ADD_USER_FAILURE",

  GET_USERS_REQUEST: "GET_USERS_REQUEST",
  GET_USERS_SUCCESS: "GET_USERS_SUCCESS",
  GET_USERS_FAILURE: "GET_USERS_FAILURE",

  UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAILURE: "UPDATE_USER_FAILURE",

  GET_AGENTS_REQUEST: "GET_AGENTS_REQUEST",
  GET_AGENTS_SUCCESS: "GET_AGENTS_SUCCESS",
  GET_AGENTS_FAILURE: "GET_AGENTS_FAILURE",

  ACTIVATE_USER_REQUEST: "ACTIVATE_USER_REQUEST",
  ACTIVATE_USER_SUCCESS: "ACTIVATE_USER_SUCCESS",
  ACTIVATE_USER_FAILURE: "ACTIVATE_USER_FAILURE",

  DEACTIVATE_USER_REQUEST: "DEACTIVATE_USER_REQUEST",
  DEACTIVATE_USER_SUCCESS: "DEACTIVATE_USER_SUCCESS",
  DEACTIVATE_USER_FAILURE: "DEACTIVATE_USER_FAILURE",

  GET_FRONT_CUSTOMERS_REQUEST: "GET_FRONT_CUSTOMERS_REQUEST",
  GET_FRONT_CUSTOMERS_SUCCESS: "GET_FRONT_CUSTOMERS_SUCCESS",
  GET_FRONT_CUSTOMERS_FAILURE: "GET_FRONT_CUSTOMERS_FAILURE",

  UNLOCK_ACCOUNT_REQUEST: "UNLOCK_ACCOUNT_REQUEST",
  UNLOCK_ACCOUNT_SUCCESS: "UNLOCK_ACCOUNT_SUCCESS",
  UNLOCK_ACCOUNT_FAILURE: "UNLOCK_ACCOUNT_FAILURE",
};
// category
export const CATEGORY_CONST = {
  GET_CATEGORY_REQUEST: "GET_CATEGORY_REQUEST",
  GET_CATEGORY_SUCCESS: "GET_CATEGORY_SUCCESS",
  GET_CATEGORY_FAILURE: "GET_CATEGORY_FAILURE",

  ADD_CATEGORY_REQUEST: "ADD_CATEGORY_REQUEST",
  ADD_CATEGORY_FAILURE: "ADD_CATEGORY_FAILURE",
  ADD_CATEGORY_SUCCESS: "ADD_CATEGORY_SUCCESS",

  UPDATE_CATEGORY_REQUEST: "UPDATE_CATEGORY_REQUEST",
  UPDATE_CATEGORY_FAILURE: "UPDATE_CATEGORY_FAILURE",
  UPDATE_CATEGORY_SUCCESS: "UPDATE_CATEGORY_SUCCESS",

  DELETE_CATEGORY_REQUEST: "DELETE_CATEGORY_REQUEST",
  DELETE_CATEGORY_FAILURE: "DELETE_CATEGORY_FAILURE",
  DELETE_CATEGORY_SUCCESS: "DELETE_CATEGORY_SUCCESS",
};
// Station
export const STATION_CONST = {
  GET_STATIONS_REQUEST: "GET_STATIONS_REQUEST",
  GET_STATIONS_SUCCESS: "GET_STATIONS_SUCCESS",
  GET_STATIONS_FAILURE: "GET_STATIONS_FAILURE",

  ADD_STATION_REQUEST: "ADD_STATION_REQUEST",
  ADD_STATION_SUCCESS: "ADD_STATION_SUCCESS",
  ADD_STATION_FAILURE: "ADD_STATION_FAILURE",

  UPDATE_STATION_REQUEST: "UPDATE_STATION_REQUEST",
  UPDATE_STATION_SUCCESS: "UPDATE_STATION_SUCCESS",
  UPDATE_STATION_FAILURE: "UPDATE_STATION_FAILURE",

  DELETE_STATION_REQUEST: "DELETE_STATION_REQUEST",
  DELETE_STATION_SUCCESS: "DELETE_STATION_SUCCESS",
  DELETE_STATION_FAILURE: "DELETE_STATION_FAILURE",

  GET_STATION_BY_ID_REQUEST: "GET_STATION_BY_ID_REQUEST",
  GET_STATION_BY_ID_SUCCESS: "GET_STATION_BY_ID_SUCCESS",
  GET_STATION_BY_ID_FAILURE: "GET_STATION_BY_ID_FAILURE",
};
// Sub category
export const SUB_CATEGORY_CONST = {
  GET_SUB_CATEGORY_BY_CATEGORY_ID_REQUEST:
    "GET_SUB_CATEGORY_BY_CATEGORY_ID_REQUEST",
  GET_SUB_CATEGORY_BY_CATEGORY_ID_SUCCESS:
    "GET_SUB_CATEGORY_BY_CATEGORY_ID_SUCCESS",
  GET_SUB_CATEGORY_BY_CATEGORY_ID_FAILURE:
    "GET_SUB_CATEGORY_BY_CATEGORY_ID_FAILURE",

  ADD_SUB_CATEGORY_REQUEST: "ADD_SUB_CATEGORY_REQUEST",
  ADD_SUB_CATEGORY_SUCCESS: "ADD_SUB_CATEGORY_SUCCESS",
  ADD_SUB_CATEGORY_FAILURE: "ADD_SUB_CATEGORY_FAILURE",

  UPDATE_SUB_CATEGORY_REQUEST: "UPDATE_SUB_CATEGORY_REQUEST",
  UPDATE_SUB_CATEGORY_SUCCESS: "UPDATE_SUB_CATEGORY_SUCCESS",
  UPDATE_SUB_CATEGORY_FAILURE: "UPDATE_SUB_CATEGORY_FAILURE",

  DELETE_SUB_CATEGORY_REQUEST: "DELETE_SUB_CATEGORY_REQUEST",
  DELETE_SUB_CATEGORY_SUCCESS: "DELETE_SUB_CATEGORY_SUCCESS",
  DELETE_SUB_CATEGORY_FAILURE: "DELETE_SUB_CATEGORY_FAILURE",

  GET_ALL_SUB_CATEGORIES_REQUEST: "GET_ALL_SUB_CATEGORIES_REQUEST",
  GET_ALL_SUB_CATEGORIES_SUCCESS: "GET_ALL_SUB_CATEGORIES_SUCCESS",
  GET_ALL_SUB_CATEGORIES_FAILURE: "GET_ALL_SUB_CATEGORIES_FAILURE",

  GET_SUB_CATEGORY_BY_ID_REQUEST: "GET_SUB_CATEGORY_BY__ID_REQUEST",
  GET_SUB_CATEGORY_BY_ID_SUCCESS: "GET_SUB_CATEGORY_BY__ID_SUCCESS",
  GET_SUB_CATEGORY_BY_ID_FAILURE: "GET_SUB_CATEGORY_BY_ID_FAILURE",
};
// Sub sub categories
export const SUB_SUB_CATEGORIES_CONST = {
  GET_SUB_SUB_CATEGORY_BY_SUB_CATEGORY_ID_REQUEST:
    "GET_SUB_SUB_CATEGORY_BY_SUB_CATEGORY_ID_REQUEST",
  GET_SUB_SUB_CATEGORY_BY_SUB_CATEGORY_ID_SUCCESS:
    "GET_SUB_SUB_CATEGORY_BY_SUB_CATEGORY_ID_SUCCESS",
  GET_SUB_SUB_CATEGORY_BY_SUB_CATEGORY_ID_FAILURE:
    "GET_SUB_SUB_CATEGORY_BY_SUB_CATEGORY_ID_FAILURE",

  ADD_SUB_SUB_CATEGORY_REQUEST: "ADD_SUB_SUB_CATEGORY_REQUEST",
  ADD_SUB_SUB_CATEGORY_SUCCESS: "ADD_SUB_SUB_CATEGORY_SUCCESS",
  ADD_SUB_SUB_CATEGORY_FAILURE: "ADD_SUB_SUB_CATEGORY_FAILURE",

  UPDATE_SUB_SUB_CATEGORY_REQUEST: "UPDATE_SUB_SUB_CATEGORY_REQUEST",
  UPDATE_SUB_SUB_CATEGORY_SUCCESS: "UPDATE_SUB_SUB_CATEGORY_SUCCESS",
  UPDATE_SUB_SUB_CATEGORY_FAILURE: "UPDATE_SUB_SUB_CATEGORY_FAILURE",

  DELETE_SUB_SUB_CATEGORY_REQUEST: "DELETE_SUB_SUB_CATEGORY_REQUEST",
  DELETE_SUB_SUB_CATEGORY_SUCCESS: "DELETE_SUB_SUB_CATEGORY_SUCCESS",
  DELETE_SUB_SUB_CATEGORY_FAILURE: "DELETE_SUB_SUB_CATEGORY_FAILURE",

  GET_ALL_SUB_SUB_CATEGORIES_REQUEST: "GET_ALL_SUB_SUB_CATEGORIES_REQUEST",
  GET_ALL_SUB_SUB_CATEGORIES_SUCCESS: "GET_ALL_SUB_SUB_CATEGORIES_SUCCESS",
  GET_ALL_SUB_SUB_CATEGORIES_FAILURE: "GET_ALL_SUB_SUB_CATEGORIES_FAILURE",
};
// Claim
export const CLAIM_CONST = {
  //my claims
  GET_MY_CLAIM_REQUEST: "GET_MY_CLAIM_REQUEST",
  GET_MY_CLAIM_SUCCESS: "GET_MY_CLAIM_SUCCESS",
  GET_MY_CLAIM_FAILURE: "GET_MY_CLAIM_FAILURE",
  //add claim
  ADD_CLAIM_REQUEST: "ADD_CLAIM_REQUEST",
  ADD_CLAIM_SUCCESS: "ADD_CLAIM_SUCCESS",
  ADD_CLAIM_FAILURE: "ADD_CLAIM_FAILURE",
  //get claim details
  GET_CLAIM_DETAILS_REQUEST: "GET_CLAIM_DETAILS_REQUEST",
  GET_CLAIM_DETAILS_SUCCESS: "GET_CLAIM_DETAILS_SUCCESS",
  GET_CLAIM_DETAILS_FAILURE: "GET_CLAIM_DETAILS_FAILURE",
  //get ticket attachment
  GET_TICKET_ATTACHMENT_REQUEST: "GET_TICKET_ATTACHMENT_REQUEST",
  GET_TICKET_ATTACHMENT_SUCCESS: "GET_TICKET_ATTACHMENT_SUCCESS",
  GET_TICKET_ATTACHMENT_FAILURE: "GET_TICKET_ATTACHMENT_FAILURE",
  //get ticket attachment
  GET_CLAIM_ATTACHMENT_REQUEST: "GET_CLAIM_ATTACHMENT_REQUEST",
  GET_CLAIM_ATTACHMENT_SUCCESS: "GET_CLAIM_ATTACHMENT_SUCCESS",
  GET_CLAIM_ATTACHMENT_FAILURE: "GET_CLAIM_ATTACHMENT_FAILURE",
  //update ticket atachment
  UPDATE_TICKET_ATTACHMENT_REQUEST: "UPDATE_TICKET_ATTACHMENT_REQUEST",
  UPDATE_TICKET_ATTACHMENT_SUCCESS: "UPDATE_TICKET_ATTACHMENT_SUCCESS",
  UPDATE_TICKET_ATTACHMENT_FAILURE: "UPDATE_TICKET_ATTACHMENT_FAILURE",
  // add claim by agent
  ADD_CLAIM_BY_AGENT_REQUEST: "ADD_CLAIM_BY_AGENT_REQUEST",
  ADD_CLAIM_BY_AGENT_SUCCESS: "ADD_CLAIM_BY_AGENT_SUCCESS",
  ADD_CLAIM_BY_AGENT_FAILURE: "ADD_CLAIM_BY_AGENT_FAILURE",
  // get all claims
  GET_ALL_CLAIM_DETAILS_REQUEST: "GET_ALL_CLAIM_DETAILS_REQUEST",
  GET_ALL_CLAIM_DETAILS_SUCCESS: "GET_ALL_CLAIM_DETAILS_SUCCESS",
  GET_ALL_CLAIM_DETAILS_FAILURE: "GET_ALL_CLAIM_DETAILS_FAILURE",
  // Answer claim
  ANSWER_CLAIM_REQUEST: "ANSWER_CLAIM_REQUEST",
  ANSWER_CLAIM_SUCCESS: "ANSWER_CLAIM_SUCCESS",
  ANSWER_CLAIM_FAILURE: "ANSWER_CLAIM_FAILURE",
  // Assign claim to agent
  ASSIGN_CLAIM_TO_AGENT_REQUEST: "ASSIGN_CLAIM_TO_AGENT_REQUEST",
  ASSIGN_CLAIM_TO_AGENT_SUCCESS: "ASSIGN_CLAIM_TO_AGENT_SUCCESS",
  ASSIGN_CLAIM_TO_AGENT_FAILURE: "ASSIGN_CLAIM_TO_AGENT_FAILURE",
  // Assign claim to Entity
  ASSIGN_CLAIM_TO_ENTITY_REQUEST: "ASSIGN_CLAIM_TO_ENTITY_REQUEST",
  ASSIGN_CLAIM_TO_ENTITY_SUCCESS: "ASSIGN_CLAIM_TO_ENTITY_SUCCESS",
  ASSIGN_CLAIM_TO_ENTITY_FAILURE: "ASSIGN_CLAIM_TO_ENTITY_FAILURE",
  // Get claim by agent
  GET_CLAIM_BY_AGENT_REQUEST: "GET_CLAIM_BY_AGENT_REQUEST",
  GET_CLAIM_BY_AGENT_SUCCESS: "GET_CLAIM_BY_AGENT_SUCCESS",
  GET_CLAIM_BY_AGENT_FAILURE: "GET_CLAIM_BY_AGENT_FAILURE",
  // Get List Claim
  GET_LIST_CLAIM_REQUEST: "GET_LIST_CLAIM_REQUEST",
  GET_LIST_CLAIM_SUCCESS: "GET_LIST_CLAIM_SUCCESS",
  GET_LIST_CLAIM_FAILURE: "GET_LIST_CLAIM_FAILURE",
  // Get List Claim By Agent
  GET_LIST_CLAIM_BY_AGENT_REQUEST: "GET_LIST_CLAIM_BY_AGENT_REQUEST",
  GET_LIST_CLAIM_BY_AGENT_SUCCESS: "GET_LIST_CLAIM_BY_AGENT_SUCCESS",
  GET_LIST_CLAIM_BY_AGENT_FAILURE: "GET_LIST_CLAIM_BY_AGENT_FAILURE",

  TEMPORARY_APPROVE_CLAIM_REQUEST: "TEMPORARY_APPROVE_CLAIM_REQUEST",
  TEMPORARY_APPROVE_CLAIM_SUCCESS: "TEMPORARY_APPROVE_CLAIM_SUCCESS",
  TEMPORARY_APPROVE_CLAIM_FAILURE: "TEMPORARY_APPROVE_CLAIM_FAILURE",

  GET_LIST_CLAIM_REPORTS_REQUEST: "GET_LIST_CLAIM_REPORTS_REQUEST",
  GET_LIST_CLAIM_REPORTS_SUCCESS: "GET_LIST_CLAIM_REPORTS_SUCCESS",
  GET_LIST_CLAIM_REPORTS_FAILURE: "GET_LIST_CLAIM_REPORTS_FAILURE",

  EXPORT_LIST_CLAIM_REPORTS_REQUEST: "EXPORT_LIST_CLAIM_REPORTS_REQUEST",
  EXPORT_LIST_CLAIM_REPORTS_SUCCESS: "EXPORT_LIST_CLAIM_REPORTS_SUCCESS",
  EXPORT_LIST_CLAIM_REPORTS_FAILURE: "EXPORT_LIST_CLAIM_REPORTS_FAILURE",

  APPROVE_CLAIM_REQUEST: "APPROVE_CLAIM_REQUEST",
  APPROVE_CLAIM_SUCCESS: "APPROVE_CLAIM_SUCCESS",
  APPROVE_CLAIM_FAILURE: "APPROVE_CLAIM_FAILURE",

  REJECT_CLAIM_REQUEST: "REJECT_CLAIM_REQUEST",
  REJECT_CLAIM_SUCCESS: "REJECT_CLAIM_SUCCESS",
  REJECT_CLAIM_FAILURE: "REJECT_CLAIM_FAILURE",

  PROGRESS_CLAIM_REQUEST: "PROGRESS_CLAIM_REQUEST",
  PROGRESS_CLAIM_SUCCESS: "PROGRESS_CLAIM_SUCCESS",
  PROGRESS_CLAIM_FAILURE: "PROGRESS_CLAIM_FAILURE",
  // Get claim by Entity Staistics
  GET_CLAIM_BY_ENTITY_STATISTICS_REQUEST:
    "GET_CLAIM_BY_ENTITY_STATISTICS_REQUEST",
  GET_CLAIM_BY_ENTITY_STATISTICS_SUCCESS:
    "GET_CLAIM_BY_ENTITY_STATISTICS_SUCCESS",
  GET_CLAIM_BY_ENTITY_STATISTICS_FAILURE:
    "GET_CLAIM_BY_ENTITY_STATISTICS_FAILURE",

  // Get claim by Category statistics
  GET_CLAIM_BY_CATEGORY_STATISTICS_REQUEST:
    "GET_CLAIM_BY_CATEGORY_STATISTICS_REQUEST",
  GET_CLAIM_BY_CATEGORY_STATISTICS_SUCCESS:
    "GET_CLAIM_BY_CATEGORY_STATISTICS_SUCCESS",
  GET_CLAIM_BY_CATEGORY_STATISTICS_FAILURE:
    "GET_CLAIM_BY_CATEGORY_STATISTICS_FAILURE",
};
/*export const USER_CONST = {
  GET_USERS_REQUEST: "GET_STATIONS_REQUEST",
  GET_USERS_SUCCESS: "GET_STATIONS_SUCCESS",
  GET_USERS_FAILURE: "GET_STATIONS_FAILURE",
  ADD_USER_REQUEST: "ADD_USER_REQUEST",
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  ADD_USER_FAILURE: "ADD_USER_FAILURE",

};*/

export const ROLE_CONST = {
  // get role consts
  GET_ROLE_BY_CODE_REQUEST: "GET_ROLE_BY_CODE_REQUEST",
  GET_ROLE_BY_CODE_SUCCESS: "GET_ROLE_BY_CODE_SUCCESS",
  GET_ROLE_BY_CODE_FAILURE: "GET_ROLE_BY_CODE_FAILURE",

  //add role consts
  ADD_ROLE_REQUEST: "ADD_ROLE_REQUEST",
  ADD_ROLE_SUCCESS: "ADD_ROLE_SUCCESS",
  ADD_ROLE_FAILURE: "ADD_ROLE_FAILURE",

  //delete role consts
  DELETE_ROLE_REQUEST: "DELETE_ROLE_REQUEST",
  DELETE_ROLE_SUCCESS: "DELETE_ROLE_SUCCESS",
  DELETE_ROLE_FAILURE: "DELETE_ROLE_FAILURE",
  //update role consts

  UPDATE_ROLE_REQUEST: "UPDATE_ROLE_REQUEST",
  UPDATE_ROLE_SUCCESS: "UPDATE_ROLE_SUCCESS",
  UPDATE_ROLE_FAILURE: "UPDATE_ROLE_FAILURE",
  // get all roles consts
  GET_ROLES_REQUEST: "GET_ROLES_REQUEST",
  GET_ROLES_SUCCESS: "GET_ROLES_SUCCESS",
  GET_ROLES_FAILURE: "GET_ROLES_FAILURE",
  // assign role consts
  ASSIGN_ROLE_REQUEST: "ASSIGN_ROLE_REQUEST",
  ASSIGN_ROLE_SUCCESS: "ASSIGN_ROLE_SUCCESS",
  ASSIGN_ROLE_FAILURE: "ASSIGN_ROLE_FAILURE",

  GET_PERMISSIONS_REQUEST: "GET_PERMISSIONS_REQUEST",
  GET_PERMISSIONS_SUCCESS: "GET_PERMISSIONS_SUCCESS",
  GET_PERMISSIONS_FAILURE: "GET_PERMISSIONS_FAILURE",
};

// AccountRole consts
export const ACCOUNT_ROLE_CONST = {
  // delete account role
  DELETE_ACCOUNT_ROLE_REQUEST: "DELETE_ACCOUNT_ROLE_REQUEST",
  DELETE_ACCOUNT_ROLE_SUCCESS: "DELETE_ACCOUNT_ROLE_SUCCESS",
  DELETE_ACCOUNT_ROLE_FAILURE: "DELETE_ACCOUNT_ROLE_FAILURE",
};

// Groups
export const GROUPS_CONST = {
  //get
  GET_GROUPS_REQUEST: "GET_GROUPS_REQUEST",
  GET_GROUPS_SUCCESS: "GET_GROUPS_SUCCESS",
  GET_GROUPS_FAILURE: "GET_GROUPS_FAILURE",

  ADD_GROUP_REQUEST: "ADD_GROUP_REQUEST",
  ADD_GROUP_SUCCESS: "ADD_GROUP_SUCCESS",
  ADD_GROUP_FAILURE: "ADD_GROUP_FAILURE",

  UPDATE_GROUP_REQUEST: "UPDATE_GROUP_REQUEST",
  UPDATE_GROUP_SUCCESS: "UPDATE_GROUP_SUCCESS",
  UPDATE_GROUP_FAILURE: "UPDATE_GROUP_FAILURE",

  DELETE_GROUP_REQUEST: "DELETE_GROUP_REQUEST",
  DELETE_GROUP_SUCCESS: "DELETE_GROUP_SUCCESS",
  DELETE_GROUP_FAILURE: "DELETE_GROUP_FAILURE",

  ADD_USER_IN_GROUP_REQUEST: "ADD_USER_IN_GROUP_REQUEST",
  ADD_USER_IN_GROUP_SUCCESS: "ADD_USER_IN_GROUP_SUCCESS",
  ADD_USER_IN_GROUP_FAILURE: "ADD_USER_IN_GROUP_FAILURE",

  DELETE_USER_IN_GROUP_REQUEST: "DELETE_USER_IN_GROUP_REQUEST",
  DELETE_USER_IN_GROUP_SUCCESS: "DELETE_USER_IN_GROUP_SUCCESS",
  DELETE_USER_IN_GROUP_FAILURE: "DELETE_USER_IN_GROUP_FAILURE",

  GET_USERS_BY_GROUP_ID_REQUEST: "GET_USERS_BY_GROUP_ID_REQUEST",
  GET_USERS_BY_GROUP_ID_SUCCESS: "GET_USERS_BY_GROUP_ID_SUCCESS",
  GET_USERS_BY_GROUP_ID_FAILURE: "GET_USERS_BY_GROUP_ID_FAILURE",
};

// Response
export const RESPONSE_CONST = {
  GET_RESPONSE_REQUEST: "GET_RESPONSE_REQUEST",
  GET_RESPONSE_SUCCESS: "GET_RESPONSE_SUCCESS",
  GET_RESPONSE_FAILURE: "GET_RESPONSE_FAILURE",

  ADD_RESPONSE_REQUEST: "ADD_RESPONSE_REQUEST",
  ADD_RESPONSE_SUCCESS: "ADD_RESPONSE_SUCCESS",
  ADD_RESPONSE_FAILURE: "ADD_RESPONSE_FAILURE",

  UPDATE_RESPONSE_REQUEST: "UPDATE_RESPONSE_REQUEST",
  UPDATE_RESPONSE_SUCCESS: "UPDATE_RESPONSE_SUCCESS",
  UPDATE_RESPONSE_FAILURE: "UPDATE_RESPONSE_FAILURE",

  DELETE_RESPONSE_BY_ID_REQUEST: "DELETE_RESPONSE_BY_ID_REQUEST",
  DELETE_RESPONSE_BY_ID_SUCCESS: "DELETE_RESPONSE_BY_ID_SUCCESS",
  DELETE_RESPONSE_BY_ID_FAILURE: "DELETE_RESPONSE_BY_ID_FAILURE",

  GET_RESPONSE_BY_ID_REQUEST: "GET_RESPONSE_BY_ID_REQUEST",
  GET_RESPONSE_BY_ID_SUCCESS: "GET_RESPONSE_BY_ID_SUCCESS",
  GET_RESPONSE_BY_ID_FAILURE: "GET_RESPONSE_BY_ID_FAILURE",

  CUSTOMIZED_RESPONSE_REQUEST: "CUSTOMIZED_RESPONSE_REQUEST",
  CUSTOMIZED_RESPONSE_SUCCESS: "CUSTOMIZED_RESPONSE_SUCCESS",
  CUSTOMIZED_RESPONSE_FAILURE: "CUSTOMIZED_RESPONSE_FAILURE",
};
// Email template
export const EMAIL_TEMPLATE_CONST = {
  GET_EMAIL_TEMPLATE_REQUEST: "GET_EMAIL_TEMPLATE_REQUEST",
  GET_EMAIL_TEMPLATE_SUCCESS: "GET_EMAIL_TEMPLATE_SUCCESS",
  GET_EMAIL_TEMPLATE_FAILURE: "GET_EMAIL_TEMPLATE_FAILURE",

  UPDATE_EMAIL_TEMPLATE_BY_ID_REQUEST: "UPDATE_EMAIL_TEMPLATE_BY_ID_REQUEST",
  UPDATE_EMAIL_TEMPLATE_BY_ID_SUCCESS: "UPDATE_EMAIL_TEMPLATE_BY_ID_SUCCESS",
  UPDATE_EMAIL_TEMPLATE_BY_ID_FAILURE: "UPDATE_EMAIL_TEMPLATE_BY_ID_FAILURE",

  GET_EMAIL_TEMPLATE_BY_ID_REQUEST: "GET_EMAIL_TEMPLATE_BY_ID_REQUEST",
  GET_EMAIL_TEMPLATE_BY_ID_SUCCESS: "GET_EMAIL_TEMPLATE_BY_ID_SUCCESS",
  GET_EMAIL_TEMPLATE_BY_ID_FAILURE: "GET_EMAIL_TEMPLATE_BY_ID_FAILURE",

  GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_REQUEST:
    "GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_REQUEST",
  GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_SUCCESS:
    "GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_SUCCESS",
  GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_FAILURE:
    "GET_CUSTOMIZED_APPROVED_CLAIM_EMAIL_FAILURE",
};

// Statictics
export const STATISTICS_CONST = {
  GET_USERS_STATISTICS_REQUEST: "GET_USERS_STATISTICS_REQUEST",
  GET_USERS_STATISTICS_SUCCESS: "GET_USERS_STATISTICS_SUCCESS",
  GET_USERS_STATISTICS_FAILURE: "GET_USERS_STATISTICS_FAILURE",

  GET_CLAIM_STATISTICS_REQUEST: "GET_CLAIM_STATISTICS_REQUEST",
  GET_CLAIM_STATISTICS_SUCCESS: "GET_CLAIM_STATISTICS_SUCCESS",
  GET_CLAIM_STATISTICS_FAILURE: "GET_CLAIM_STATISTICS_FAILURE",

    GET_CLAIM_STATISTICS_REPORT_REQUEST: "GET_CLAIM_STATISTICS_REPORT_REQUEST",
    GET_CLAIM_STATISTICS_REPORT_SUCCESS: "GET_CLAIM_STATISTICS_REPORT_SUCCESS",
    GET_CLAIM_STATISTICS_REPORT_FAILURE: "GET_CLAIM_STATISTICS_REPORT_FAILURE",

  GET_USERS_STATISTICS_REPORT_REQUEST: "GET_USERS_STATISTICS_REPORT_REQUEST",
  GET_USERS_STATISTICS_REPORT_SUCCESS: "GET_USERS_STATISTICS_REPORT_SUCCESS",
  GET_USERS_STATISTICS_REPORT_FAILURE: "GET_USERS_STATISTICS_REPORT_FAILURE",

};

// TimeLimit Configuration
export const TIME_LIMIT_CONFIGURATION = {
  GET_TIME_LIMIT_CONFIGURATION_REQUEST: "GET_TIME_LIMIT_CONFIGURATION_REQUEST",
  GET_TIME_LIMIT_CONFIGURATION_SUCCESS: "GET_TIME_LIMIT_CONFIGURATION_SUCCESS",
  GET_TIME_LIMIT_CONFIGURATION_FAILURE: "GET_TIME_LIMIT_CONFIGURATION_FAILURE",

  UPDATE_TIME_LIMIT_CONFIGURATION_REQUEST:
    "UPDATE_TIME_LIMIT_CONFIGURATION_REQUEST",
  UPDATE_TIME_LIMIT_CONFIGURATION_SUCCESS:
    "UPDATE_TIME_LIMIT_CONFIGURATION_SUCCESS",
  UPDATE_TIME_LIMIT_CONFIGURATION_FAILURE:
    "UPDATE_TIME_LIMIT_CONFIGURATION_FAILURE",
};

//Entity
export const ENTITY = {
  CREATE_ENTITY_REQUEST: "CREATE_ENTITY_REQUEST",
  CREATE_ENTITY_SUCCESS: "CREATE_ENTITY_SUCCESS",
  CREATE_ENTITY_FAILURE: "CREATE_ENTITY_FAILURE",

  UPDATE_ENTITY_REQUEST: "UPDATE_ENTITY_REQUEST",
  UPDATE_ENTITY_SUCCESS: "UPDATE_ENTITY_SUCCESS",
  UPDATE_ENTITY_FAILURE: "UPDATE_ENTITY_FAILURE",

  GET_LIST_ENTITY_REQUEST: "GET_LIST_ENTITY_REQUEST",
  GET_LIST_ENTITY_SUCCESS: "GET_LIST_ENTITY_SUCCESS",
  GET_LIST_ENTITY_FAILURE: "GET_LIST_ENTITY_FAILURE",

  GET_LIST_ENTITY_BY_RESPONSIBILITY_REQUEST:
    "GET_LIST_ENTITY_BY_RESPONSIBILITY_REQUEST",
  GET_LIST_ENTITY_BY_RESPONSIBILITY_SUCCESS:
    "GET_LIST_ENTITY_BY_RESPONSIBILITY_SUCCESS",
  GET_LIST_ENTITY_BY_RESPONSIBILITY_FAILURE:
    "GET_LIST_ENTITY_BY_RESPONSIBILITY_FAILURE",

  GET_ENTITY_BY_CODE_REQUEST: "GET_ENTITY_BY_CODE_REQUEST",
  GET_ENTITY_BY_CODE_SUCCESS: "GET_ENTITY_BY_CODE_SUCCESS",
  GET_ENTITY_BY_CODE_FAILURE: "GET_ENTITY_BY_CODE_FAILURE",

  DELETE_ENTITY_REQUEST: "DELETE_ENTITY_REQUEST",
  DELETE_ENTITY_SUCCESS: "DELETE_ENTITY_SUCCESS",
  DELETE_ENTITY_FAILURE: "DELETE_ENTITY_FAILURE",

  ADD_USER_IN_ENTITY_REQUEST: "ADD_USER_IN_ENTITY_REQUEST",
  ADD_USER_IN_ENTITY_SUCCESS: "ADD_USER_IN_ENTITY_SUCCESS",
  ADD_USER_IN_ENTITY_FAILURE: "ADD_USER_IN_ENTITY_FAILURE",

  REMOVE_USER_IN_ENTITY_REQUEST: "REMOVE_USER_IN_ENTITY_REQUEST",
  REMOVE_USER_IN_ENTITY_SUCCESS: "REMOVE_USER_IN_ENTITY_SUCCESS",
  REMOVE_USER_IN_ENTITY_FAILURE: "REMOVE_USER_IN_ENTITY_FAILURE",
};

//Profile
export const PROFILE = {
  CREATE_PROFILE_REQUEST: "CREATE_PROFILE_REQUEST",
  CREATE_PROFILE_SUCCESS: "CREATE_PROFILE_SUCCESS",
  CREATE_PROFILE_FAILURE: "CREATE_PROFILE_FAILURE",

  UPDATE_PROFILE_REQUEST: "UPDATE_PROFILE_REQUEST",
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_FAILURE: "UPDATE_PROFILE_FAILURE",

  GET_LIST_PROFILE_REQUEST: "GET_LIST_PROFILE_REQUEST",
  GET_LIST_PROFILE_SUCCESS: "GET_LIST_PROFILE_SUCCESS",
  GET_LIST_PROFILE_FAILURE: "GET_LIST_PROFILE_FAILURE",

  GET_PROFILE_BY_CODE_REQUEST: "GET_PROFILE_BY_CODE_REQUEST",
  GET_PROFILE_BY_CODE_SUCCESS: "GET_PROFILE_BY_CODE_SUCCESS",
  GET_PROFILE_BY_CODE_FAILURE: "GET_PROFILE_BY_CODE_FAILURE",

  DELETE_PROFILE_REQUEST: "DELETE_PROFILE_REQUEST",
  DELETE_PROFILE_SUCCESS: "DELETE_PROFILE_SUCCESS",
  DELETE_PROFILE_FAILURE: "DELETE_PROFILE_FAILURE",

  GET_LIST_PERMISSION_REQUEST: "GET_LIST_PERMISSION_REQUEST",
  GET_LIST_PERMISSION_SUCCESS: "GET_LIST_PERMISSION_SUCCESS",
  GET_LIST_PERMISSION_FAILURE: "GET_LIST_PERMISSION_FAILURE",

  UPDATE_ASSIGN_PROFILE_TO_USER_REQUEST:
    "UPDATE_ASSIGN_PROFILE_TO_USER_REQUEST",
  UPDATE_ASSIGN_PROFILE_TO_USER_SUCCESS:
    "UPDATE_ASSIGN_PROFILE_TO_USER_SUCCESS",
  UPDATE_ASSIGN_PROFILE_TO_USER_FAILURE:
    "UPDATE_ASSIGN_PROFILE_TO_USER_FAILURE",
};

//Channel
export const CHANNEL = {
  CREATE_CHANNEL_REQUEST: "CREATE_CHANNEL_REQUEST",
  CREATE_CHANNEL_SUCCESS: "CREATE_CHANNEL_SUCCESS",
  CREATE_CHANNEL_FAILURE: "CREATE_CHANNEL_FAILURE",

  GET_LIST_CHANNEL_REQUEST: "GET_LIST_CHANNEL_REQUEST",
  GET_LIST_CHANNEL_SUCCESS: "GET_LIST_CHANNEL_SUCCESS",
  GET_LIST_CHANNEL_FAILURE: "GET_LIST_CHANNEL_FAILURE",

  DELETE_CHANNEL_REQUEST: "DELETE_CHANNEL_REQUEST",
  DELETE_CHANNEL_SUCCESS: "DELETE_CHANNEL_SUCCESS",
  DELETE_CHANNEL_FAILURE: "DELETE_CHANNEL_FAILURE",
};

//Responsibility
export const RESPONSIBILITY = {
  ADD_RESPONSIBILITY_IN_ENTITY_REQUEST: "ADD_RESPONSIBILITY_IN_ENTITY_REQUEST",
  ADD_RESPONSIBILITY_IN_ENTITY_SUCCESS: "ADD_RESPONSIBILITY_IN_ENTITY_SUCCESS",
  ADD_RESPONSIBILITY_IN_ENTITY_FAILURE: "ADD_RESPONSIBILITY_IN_ENTITY_FAILURE",

  REMOVE_RESPONSIBILITY_IN_ENTITY_REQUEST:
    "REMOVE_RESPONSIBILITY_IN_ENTITY_REQUEST",
  REMOVE_RESPONSIBILITY_IN_ENTITY_SUCCESS:
    "REMOVE_RESPONSIBILITY_IN_ENTITY_SUCCESS",
  REMOVE_RESPONSIBILITY_IN_ENTITY_FAILURE:
    "REMOVE_RESPONSIBILITY_IN_ENTITY_FAILURE",
};

//Notification
export const NOTIFICATION = {
  GET_NOTIFICATION_BY_USER_CODE_REQUEST:
    "GET_NOTIFICATION_BY_USER_CODE_REQUEST",
  GET_NOTIFICATION_BY_USER_CODE_SUCCESS:
    "GET_NOTIFICATION_BY_USER_CODE_SUCCESS",
  GET_NOTIFICATION_BY_USER_CODE_FAILURE:
    "GET_NOTIFICATION_BY_USER_CODE_FAILURE",

  MARK_NOTIFICATION_AS_SEEN_REQUEST: "MARK_NOTIFICATION_AS_SEEN_REQUEST",
  MARK_NOTIFICATION_AS_SEEN_SUCCESS: "MARK_NOTIFICATION_AS_SEEN_SUCCESS",
  MARK_NOTIFICATION_AS_SEEN_FAILURE: "MARK_NOTIFICATION_AS_SEEN_FAILURE",

  MARK_ALL_NOTIFICATIONS_READ_REQUEST: "MARK_ALL_NOTIFICATIONS_READ_REQUEST",
  MARK_ALL_NOTIFICATIONS_READ_SUCCESS: "MARK_ALL_NOTIFICATIONS_READ_SUCCESS",
  MARK_ALL_NOTIFICATIONS_READ_FAILURE: "MARK_ALL_NOTIFICATIONS_READ_FAILURE",
};
