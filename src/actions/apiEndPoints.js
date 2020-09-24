// import Swagger from 'swagger-client'
import { LANG_CODES } from "../Pages/Helpers/utils";
import axios from "axios";

// creating global instance for the axios to call apis
export const AXIOS_INSTANCE = axios.create();
//AXIOS_INSTANCE.defaults.timeout = 100000;
AXIOS_INSTANCE.defaults.headers.common["Accept-Language"] = LANG_CODES.french;
//  export const  SWAGGER_INSTANCE = Swagger({ spec:specJson }
if (
  localStorage.getItem("boGRCAuthToken") !== null &&
  localStorage.getItem("boGRCAuthToken") !== undefined
) {
  const token = JSON.parse(localStorage.getItem("boGRCAuthToken"));
  AXIOS_INSTANCE.defaults.headers.common["Authorization"] = token;
}
if (
  localStorage.getItem("lang") !== null &&
  localStorage.getItem("lang") !== undefined
) {
  const lang = localStorage.getItem("lang");
  AXIOS_INSTANCE.defaults.headers.common["Accept-Language"] = `${lang}`;
}

export const LOGIN_CONFIG = {
  // headers: {
  //   "Content-Type": "application/x-www-form-urlencoded",
  // },
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Accept-Language": "fr-FR",
  },
};
export const CONFIG = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // "Accept-Language": "fr-FR",
  },
};
// base url
const BASE_URL = `${process.env.REACT_APP_SERVER_URL}`;
// // base url
// const REACT_APP_NOTIFICATION_TIMEOUT = `${process.env.REACT_APP_NOTIFICATION_TIMEOUT}`;

// Login
export const LOGIN_API = `${BASE_URL}/token`;
// Account todo
export const ACCOUNT_API = `${BASE_URL}`;
// Category
export const CATEGORY_API = `${BASE_URL}/Category`;
// Stations
export const STATION_API = `${BASE_URL}/Station`;
// Sub category
export const SUB_CATEGORY_API = `${BASE_URL}/SubCategory`;
// Sub sub category
export const SUB_SUB_CATEGORY_API = `${BASE_URL}/SubSubCategory`;
// Claims
export const CLAIM_API = `${BASE_URL}/Claim`;
// Role
export const ROLE_API = `${BASE_URL}/Role`;
// Account role
export const ACCOUNT_ROLE_API = `${BASE_URL}/AccountRole`;
// Group
export const GROUPS_API = `${BASE_URL}/Group`;
// Response
export const RESPONSE_API = `${BASE_URL}/Response`;
// Email temolate
export const EMAIL_TEMPLATE_API = `${BASE_URL}/EmailTemplate`;
// Statistics
export const STATISTICS_API = `${BASE_URL}/Statistics`;
//TimeLimitConfiguration
export const TIME_LIMIT_CONFIGURATION_API = `${BASE_URL}`;
//Entity
export const ENTITY_API = `${BASE_URL}/Enitity`;
//Profile
export const PROFILE_API = `${BASE_URL}/Profile`;
//Channel
export const CHANNEL_API = `${BASE_URL}/Channel`;
//Responsibility
export const RESPONSIBILITY_API = `${BASE_URL}/Responsibility`;
//Notification
export const NOTIFICATION_API = `${BASE_URL}`;
