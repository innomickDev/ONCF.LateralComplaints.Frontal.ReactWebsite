import ThemeOptions from "./ThemeOptions";
import { reducer as form } from "redux-form"; // SAYING use redux form reducer as reducer
import Login from "./LoginReducer";
import Account from "./AccountReducer";
import Station from "./StationReducer";
import Category from "./CategoriesReducer";
import Claim from "./ClaimReducer";
import Role from "./RoleReducer";
import SubCategory from "./SubCategoryReducer";
import SubSubCategory from "./SubSubCategoryReducer";
import Group from "./GroupReducer";
import Response from "./ResponseReducer";
import Email from "./EmailTemplateReducer";
import Statistics from "./StatisticsReducer";
import TimeLimitConfiguration from "./timeLimitConfigurationReducer";
import Entity from "./EntityReducer";
import Profile from "./ProfileReducer";
import Channel from "./ChannelReducer";
import Responsibility from "./ResponsibilityReducer";
import Notification from "./NotificationReducer";

export default {
  ThemeOptions,
  Login,
  Account,
  Station,
  form,
  Category,
  Claim,
  Role,
  SubCategory,
  SubSubCategory,
  Group,
  Response,
  Email,
  Statistics,
  TimeLimitConfiguration,
  Entity,
  Profile,
  Channel,
  Responsibility,
  Notification,
};
